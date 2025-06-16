import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { users } from "~/server/db/schema";
import { env } from "~/env";
import bcrypt from "bcrypt";
import { RegisterSchema, UpdateSchema } from "~/lib/shared/types/user";
import { eq } from "drizzle-orm";

export const userRouter = createTRPCRouter({
    session: publicProcedure.query(async ({ ctx }) => {
		return {
			session: ctx.session,
		};
	}),
    register: publicProcedure
        .input(RegisterSchema)
        .mutation(async ({ ctx, input }) => {
            const passwordHash = await bcrypt.hash(input.password, 10);
            await ctx.db.insert(users).values({
                ...input,
                password: passwordHash,
                role: input.email == env.MAIN_ADMIN_EMAIL ? "ADMIN" : "USER",
            })

            return {
                email: input.email,
                password: input.password,
            }
        }),
    update: protectedProcedure
        .input(UpdateSchema)
        .mutation(async ({ ctx, input }) => {
            await ctx.db.update(users).set(input).where(eq(users.id, ctx.session.user.id))
        }),
})