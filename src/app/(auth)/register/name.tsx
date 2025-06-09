"use client";
import { FormControl, FormField, FormItem, FormLabel } from "~/components/ui/form";
import { type Control } from "react-hook-form";
import { RegisterSchema } from "~/lib/shared/types/user";
import { type z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";


export default function NameForm({
    control,
    onCLick,
} : {
    control: Control<z.infer<typeof RegisterSchema>>,
    onCLick: () => void,
}) {
    return (
        <FormField
            control={control}
            name="name"
            render={({ field }) => (
                <FormItem className="space-y-6 flex flex-col items-center">
                    <FormLabel className="text-black text-base font-medium">Имя</FormLabel>

                    <FormControl>
                        <Input {...field} placeholder="Имя" />
                    </FormControl>

                    <Button type="submit" onClick={onCLick}>Продолжить</Button>
                </FormItem>
            )}
        />
    )
}