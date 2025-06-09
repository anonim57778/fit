import { Moon, Sun, Sunrise, Sunset } from "lucide-react";
import { mealToString } from "~/lib/enums";
import { type Food } from "~/lib/shared/types/food";
import { type Meal } from "~/server/db/schema";
import CreateUpdateFood from "./create-update";
import DeleteFood from "./delete";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/server";
import Total from "./total";
import Link from "next/link";


const foodsItems: Record<Meal, JSX.Element> = {
    BREAKFAST: <Sunrise className="text-accent size-6"/>,
    LUNCH: <Sun className="text-accent size-6"/>,
    DINNER: <Sunset className="text-accent size-6"/>,   
    SNACK: <Moon className="text-accent size-6"/>,
}

function FoodItem({
    foods,
    meal
} : {
    foods: Food[],
    meal: Meal
}) {

    return (
        <div className="bg-white rounded-3xl p-6 space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-b-muted">
                <div className="flex gap-4 items-center">
                    {foodsItems[meal]}
                    <h1 className="text-base text-accent font-semibold">{mealToString(meal)}</h1>
                </div>

                <CreateUpdateFood meal={meal}/>
            </div>

            <div className="flex flex-col gap-4">
                {foods.map((item, index) => (
                    <div key={index} className={cn("flex flex-col gap-2", index == foods.length - 1 ? "" : "border-b border-b-muted")}>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-sm text-accent font-semibold">{item.name}</h1>
                            <p className="text-xs text-accent/60 font-semibold">{item.grams} г.</p>
                        </div>

                        <div className="grid grid-cols-4">
                            <div className="space-y-2">
                                <h1 className="text-xs text-accent/60 font-medium">Жиры</h1>
                                <h1 className="text-sm text-accent font-medium">{item.fats}</h1>
                            </div>

                            <div className="space-y-2">
                                <h1 className="text-xs text-accent/60 font-medium">Углеводы</h1>
                                <h1 className="text-sm text-accent font-medium">{item.сarbohydrates}</h1>
                            </div>

                            <div className="space-y-2">
                                <h1 className="text-xs text-accent/60 font-medium">Белки</h1>
                                <h1 className="text-sm text-accent font-medium">{item.squirrels}</h1>
                            </div>

                            <div className="space-y-2">
                                <h1 className="text-xs text-accent/60 font-medium">Калории</h1>
                                <h1 className="text-sm text-accent font-medium">{item.calories}</h1>
                            </div>
                        </div>

                        <div className="flex justify-end w-full">
                            <div className="flex gap-2 items-center">
                                <CreateUpdateFood food={item} meal={meal}/>
                                <DeleteFood id={item.id}/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default async function FoodsDashboardPage() {
    const foods = await api.food.getAll();

    return (
        <div className="flex flex-col gap-6 pb-14 lg:pb-0">
            <Link href="/" className="text-center text-primary text-2xl font-bold lg:hidden">FITLOG</Link>
            
            <Total/>

            <FoodItem foods={foods.filter(item => item.meal === "BREAKFAST")} meal="BREAKFAST"/>

            <FoodItem foods={foods.filter(item => item.meal === "LUNCH")} meal="LUNCH"/>

            <FoodItem foods={foods.filter(item => item.meal === "DINNER")} meal="DINNER"/>

            <FoodItem foods={foods.filter(item => item.meal === "SNACK")} meal="SNACK"/>
        </div>
    )
}