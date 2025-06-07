import { z } from "zod";
import { activityUserEnum, genderUserEnum } from "~/server/db/schema";


export const LoginSchema = z.object({
    email: z.string({
        message: "Email обязательно"
    }).email("Неверный формат Email").min(1, "Email должен быть длиной не менее 1 символа").max(255, "Email должен быть длиной не более 255 символов"),
    password: z.string({
        message: "Пароль обязателен"
    }).min(1, "Пароль должен быть длиной не менее 1 символа"),
});

export const RegisterSchema = z.object({
    name: z.string({
        message: "Имя обязательно"
    }).min(1, "Имя должно быть длиной не менее 1 символа").max(255, "Имя должно быть длиной не более 255 символов"),
    email: z.string({
        message: "Email обязательно"
    }).email("Неверный формат Email"),
    password: z.string({
        message: "Пароль обязателен"
    }).min(1, "Пароль должен быть длиной не менее 1 символа"),
    gender: z.enum(genderUserEnum.enumValues),
    activity: z.enum(activityUserEnum.enumValues),
    age: z.coerce.number({
        message: "Возраст обязателен"
    }).positive("Возраст должен быть положительным"),
    weight: z.coerce.number({
        message: "Вес обязателен"
    }).positive("Вес должен быть положительным"),
    height: z.coerce.number({
        message: "Рост обязателен"
    }).positive("Рост должен быть положительным"),
    confirmPassword: z.string({
        message: "Подтверждение пароля обязательно"
    }).min(1, "Подтверждение пароля должно быть длиной не менее 1 символа").max(255, "Подтверждение пароля должно быть длиной не более 255 символов"),
})
.superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Пароли не совпадают",
            path: ["password"],
        })
    }
});