import { Session } from "next-auth";
import { Input } from "~/components/ui/input";
import { FormLabel, FormItem } from "~/components/ui/form";


export function getDiet(session: Session) {
    const {age, weight, height, activity, gender} = session.user;

    let calories = 10 * weight + 6.25 * height - 5 * age + 75 + (gender === "MALE" ? 5 : -161);

    calories *= activity === "LIGHT" ? 1.25 : activity === "AVERAGE" ? 1.3 : activity === "HIGH" ? 1.45 : 1.2;

    const protein = (calories * 0.3) / 4;
    const squirrels = (calories * 0.4) / 4;
    const fat = (calories * 0.3) / 9;

    return {
        protein: Math.round(protein),
        squirrels: Math.round(squirrels),
        fat: Math.round(fat),
        calories: Math.round(calories)
    }
}


export default function Diet({
    session
} : {
    session: Session
}) {

    const {protein, calories, fat, squirrels} = getDiet(session);

    return (
        <div className="flex flex-col gap-y-6 w-full lg:w-[398px]">
            <h1 className="text-base text-popover font-semibold">Диета</h1>

            <div className="flex flex-col gap-y-6">
                <FormItem>
                    <FormLabel className="text-black text-base font-medium">Калории</FormLabel>
                    <Input value={calories.toFixed(0)} readOnly/>
                </FormItem>

                <FormItem>
                    <FormLabel className="text-black text-base font-medium">Белки</FormLabel>
                    <Input value={squirrels.toFixed(0)} readOnly/>
                </FormItem>

                <FormItem>
                    <FormLabel className="text-black text-base font-medium">Жиры</FormLabel>
                    <Input value={fat.toFixed(0)} readOnly/>
                </FormItem>

                <FormItem>
                    <FormLabel className="text-black text-base font-medium">Углеводы</FormLabel>
                    <Input value={protein.toFixed(0)} readOnly/>
                </FormItem>
            </div>
        </div>
    )
}