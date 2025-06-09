import { type inferProcedureOutput } from "@trpc/server";
import { z } from "zod";
import { type AppRouter } from "~/server/api/root";
import { mealEnum } from "~/server/db/schema";


export const FoodSchema = z.object({
    name: z.string({
        message: "Название обязательно"
    }).min(1, "Название должно быть не короче 1 символа").max(255, "Название должно быть не больше 255 символов"),
    fats: z.coerce.number({
        message: "Жиры обязательны"
    }).positive("Жиры должны быть положительными"),
    сarbohydrates: z.coerce.number({
        message: "Углеводы обязательны"
    }).positive("Углеводы должны быть положительными"),
    squirrels: z.coerce.number({
        message: "Белки обязательны"
    }).positive("Белки должны быть положительными"),
    meal: z.enum(mealEnum.enumValues, {
        message: "Тип питания обязательно"
    }),
    grams: z.coerce.number({
        message: "Граммы обязательны"
    }).positive("Граммы должны быть положительными"),
});

export type Food = inferProcedureOutput<AppRouter["food"]["getAll"]>[number];