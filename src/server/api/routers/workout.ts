import { ExerciseSchema, WorkoutSchema } from "~/lib/shared/types/workout";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { workouts, workoutsExercises } from "~/server/db/schema";
import { and, eq } from "drizzle-orm";
import { IdSchema } from "~/lib/shared/types/utils";
import { create } from "domain";


export const workoutRouter = createTRPCRouter({
    create: protectedProcedure
        .input(WorkoutSchema)
        .mutation(async ({ ctx, input }) => {
            await ctx.db.transaction(async (trx) => {
                const [workout] = await ctx.db.insert(workouts).values({
                    ...input,
                    userId: ctx.session.user.id,
                }).returning()

                await ctx.db.insert(workoutsExercises).values(
                    input.exercises.map((item) => ({
                        ...item,
                        workoutId: workout!.id,
                    })),
                )
            })
        }),
    update: protectedProcedure
        .input(WorkoutSchema.pick({name: true}).merge(IdSchema))
        .mutation(async ({ ctx, input }) => {
            await ctx.db.update(workouts).set({
                ...input,
            }).where(eq(workouts.id, input.id))
        }),
    delete: protectedProcedure
        .input(IdSchema)
        .mutation(async ({ ctx, input }) => {
            await ctx.db.transaction(async ( trx ) => {
                await trx.delete(workoutsExercises).where(
                    eq(workoutsExercises.workoutId, input.id),
                )

                await trx.delete(workouts).where(
                    and(
                        eq(workouts.id, input.id),
                        eq(workouts.userId, ctx.session.user.id),
                    )
                )
            })
        }),
    getAll: protectedProcedure
        .query(async ({ ctx }) => {
            return await ctx.db.query.workouts.findMany({
                where: eq(workouts.userId, ctx.session.user.id),
                with: {
                    exercises: true
                }
            })
        }),
    updateExercise: protectedProcedure
        .input(ExerciseSchema.merge(IdSchema))
        .mutation(async ({ ctx, input }) => {
            await ctx.db.update(workoutsExercises).set(input).where(eq(workoutsExercises.id, input.id))
        }),
    deleteExercise: protectedProcedure
        .input(IdSchema)
        .mutation(async ({ ctx, input }) => {
            await ctx.db.delete(workoutsExercises).where(eq(workoutsExercises.id, input.id))
        }),
})