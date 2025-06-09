"use client";

import { type Control } from "react-hook-form";
import { type z } from "zod";
import { Button } from "~/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { RegisterSchema } from "~/lib/shared/types/user";

export default function DataForm({
  control,
  back,
}: {
  control: Control<z.infer<typeof RegisterSchema>>;
  back: () => void;
}) {
  return (
    <FormItem className="space-y-4 flex flex-col items-center">
      <FormLabel className="font-medium text-base">Ваши данные</FormLabel>
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Почта"/>
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="password"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Пароль</FormLabel>
            <FormControl>
                <Input {...field} placeholder="Пароль" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Повторите пароль</FormLabel>
            <FormControl>
                <Input {...field} placeholder="Повторите пароль" />
            </FormControl>
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4 w-full">
        <Button type="button" onClick={back} variant={"outline"}>
          Назад
        </Button>

        <Button>Закончить</Button>
      </div>
    </FormItem>
  );
}