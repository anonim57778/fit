"use client";
import { FormControl, FormField, FormItem, FormLabel } from "~/components/ui/form";
import { type Control } from "react-hook-form";
import { RegisterSchema } from "~/lib/shared/types/user";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";


export default function WeightForm({
    control,
    onCLick,
    back
} : {
    control: Control<z.infer<typeof RegisterSchema>>,
    onCLick: () => void,
    back: () => void
}) {
    return (
        <FormField
            control={control}
            name="weight"
            render={({ field }) => (
                <FormItem className="space-y-6 flex flex-col items-center">
                    <FormLabel className="text-black text-base font-medium">Введите свой вес</FormLabel>

                    <FormControl>
                        <Input {...field} placeholder="Вес" />
                    </FormControl>

                    <div className="grid grid-cols-2 gap-4 w-full">
                        <Button variant={"outline"} onClick={back}>Назад</Button>
                        <Button type="submit" onClick={onCLick}>Продолжить</Button>
                    </div>
                </FormItem>
            )}
        />
    )
}