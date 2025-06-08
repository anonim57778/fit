import { FoodSchema } from "~/lib/shared/types/food";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { foods } from "~/server/db/schema";
import { IdSchema } from "~/lib/shared/types/utils";
import { and, eq, gte, sql } from "drizzle-orm";

export function getDate(date: Date = new Date()) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export const foodRouter = createTRPCRouter({
    create: protectedProcedure
        .input(FoodSchema)
        .mutation(async ({ ctx, input }) => {

            const calories = input.fats * 9 + input.сarbohydrates * 4 + input.squirrels * 4;

            await ctx.db.insert(foods).values({
                ...input,
                userId: ctx.session.user.id,
                calories: calories
            });
        }),
    update: protectedProcedure
        .input(FoodSchema.merge(IdSchema))
        .mutation(async ({ ctx, input }) => {

            const calories = input.fats * 9 + input.сarbohydrates * 4 + input.squirrels * 4;

            const food = await ctx.db.query.foods.findFirst({
                where: and(
                    eq(foods.id, input.id),
                    eq(foods.userId, ctx.session.user.id)
                )
            })

            if (!food) {
                throw new Error("Food not found");
            }

            await ctx.db.update(foods).set({
                ...input,
                calories: calories
            }).where(and(
                eq(foods.id, food.id),
                eq(foods.userId, ctx.session.user.id)
            ))
        }),
    delete: protectedProcedure
        .input(IdSchema)
        .mutation(async ({ ctx, input }) => {
            const food = await ctx.db.query.foods.findFirst({
                where: and(
                    eq(foods.id, input.id),
                    eq(foods.userId, ctx.session.user.id)
                )
            })

            if (!food) {
                throw new Error("Food not found");
            }

            await ctx.db.delete(foods).where(and(
                eq(foods.id, food.id),
                eq(foods.userId, ctx.session.user.id)
            ))
        }),
    getAll: protectedProcedure
        .query(async ({ ctx }) => {
            const foodsUser = await ctx.db.query.foods.findMany({
                where: and(
                    eq(foods.userId, ctx.session.user.id),
                    gte(foods.createdAt, getDate())
                )
            })

            return foodsUser;
        }),
    getTotal: protectedProcedure
        .query(async ({ ctx }) => {
            const [total] = await ctx.db.select({
            fat: sql<number>`coalesce(sum(${foods.fats}), 0)`,
            carbonydrates: sql<number>`coalesce(sum(${foods.сarbohydrates}), 0)`,
            squirrels: sql<number>`coalesce(sum(${foods.squirrels}), 0)`,
            calories: sql<number>`coalesce(sum(${foods.calories}), 0)`,
            }).from(foods).where(and(
                eq(foods.userId, ctx.session.user.id),
                gte(foods.createdAt, getDate())
            )) 

            return total!;
        })
})