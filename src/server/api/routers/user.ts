import { createTRPCRouter, publicProcedure } from "../trpc";
import { users } from "~/server/db/schema";
import { env } from "~/env";
import bcrypt from "bcrypt";
import { RegisterSchema } from "~/lib/shared/types/user";

export const userRouter = createTRPCRouter({
    session: publicProcedure.query(async ({ ctx }) => {
		return {
			session: ctx.session,
		};
	}),
    //Регистрация пользователя
    register: publicProcedure
        .input(RegisterSchema)
        .mutation(async ({ ctx, input }) => {
            const passwordHash = await bcrypt.hash(input.password, 10);
            await ctx.db.insert(users).values({
                name: input.name,
                gender: input.gender,
                activity: input.activity,
                age: input.age,
                weight: input.weight,
                height: input.height,
                email: input.email,
                password: passwordHash,
                role: input.email == env.MAIN_ADMIN_EMAIL ? "ADMIN" : "USER",
            })
        }),
})