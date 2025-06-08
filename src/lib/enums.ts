import { ActivityUser, GenderUser, Meal } from "~/server/db/schema";


export function genederToString(item: GenderUser) {
    switch (item) {
        case "MALE":
            return "Мужской";
        case "FEMALE":
            return "Женский";
    }
}

export function activityToString(item: ActivityUser) {
    switch (item) {
        case "LIGHT":
            return "Легкая активность";
        case "AVERAGE":
            return "Средняя активность";
        case "HIGH":
            return "Высокая активность";
    }
}

export function mealToString(item: Meal) {
    switch (item) {
        case "BREAKFAST":
            return "Завтрак";
        case "LUNCH":
            return "Обед";
        case "DINNER":
            return "Ужин";
        case "SNACK":
            return "Перекус";
    }
}