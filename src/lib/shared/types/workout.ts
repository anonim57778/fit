import { type inferProcedureOutput } from "@trpc/server";
import { z } from "zod";
import { type AppRouter } from "~/server/api/root";

export const WorkoutSchema = z.object({
    name: z.string({
        message: "Название обязательно"
    }).min(1, "Название должно быть длиной не менее 1 символа").max(255, "Название должно быть длиной не более 255 символов"),
    exercises: z.array(z.object({
        name: z.string({
            message: "Название обязательно"
        }).min(1, "Название должно быть длиной не менее 1 символа").max(255, "Название должно быть длиной не более 255 символов"),
        setRepeatWeight: z.string({
            message: "Подходы, повторения, вес обязательны"
        }).min(1, "Подходы, повторения, вес должно быть длиной не менее 1 символа").max(255, "Подходы, повторения, вес должно быть длиной не более 255 символов"),
    })),
})

export const ExerciseSchema = z.object({
    name: z.string({
        message: "Название обязательно"
    }).min(1, "Название должно быть длиной не менее 1 символа").max(255, "Название должно быть длиной не более 255 символов"),
    setRepeatWeight: z.string({
        message: "Подходы, повторения, вес обязательны"
    }).min(1, "Подходы, повторения, вес должно быть длиной не менее 1 символа").max(255, "Подходы, повторения, вес должно быть длиной не более 255 символов"),
})

export type Workout = inferProcedureOutput<AppRouter["workout"]["getAll"]>[number];