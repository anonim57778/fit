"use client";
import { FormField, FormItem, FormLabel } from "~/components/ui/form";
import { type Control } from "react-hook-form";
import { RegisterSchema } from "~/lib/shared/types/user";
import { type z } from "zod";
import { SelectUi, SelectUiItem } from "~/components/select";
import { genderUserEnum } from "~/server/db/schema";
import { genederToString } from "~/lib/enums";
import { Button } from "~/components/ui/button";


export default function GenderForm({
    control,
    onCLick,
    back
} : {
    control: Control<z.infer<typeof RegisterSchema>>,
    onCLick: () => void,
    back?: () => void
}) {
    return (
        <FormField
            control={control}
            name="gender"
            render={({ field }) => (
                <FormItem className="space-y-6 flex flex-col items-center">
                    <FormLabel className="text-black text-base font-medium">Выберите свой пол</FormLabel>
                    
                    <SelectUi value={field.value} onValueChange={field.onChange}>
                        {genderUserEnum.enumValues.map((item, index) => (
                            <SelectUiItem key={index} value={item}>
                                {genederToString(item)}
                            </SelectUiItem>
                        ))}
                    </SelectUi>

                    <div className="grid grid-cols-2 gap-4 w-full">
                        <Button variant={"outline"} onClick={back}>Назад</Button>
                        <Button type="submit" onClick={onCLick}>Продолжить</Button>
                    </div>
                </FormItem>
            )}
        />
    )
}