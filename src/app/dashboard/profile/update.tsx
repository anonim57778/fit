"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { OnError } from "~/lib/client/on-error";
import { activityToString, genederToString } from "~/lib/enums";
import { UpdateSchema } from "~/lib/shared/types/user";
import { activityUserEnum, genderUserEnum } from "~/server/db/schema";
import { api } from "~/trpc/react";
import Diet from "./diet";


export default function UpdateProdile({
    session
} : {
    session: Session
}) {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(UpdateSchema),
        defaultValues: session.user as z.infer<typeof UpdateSchema>
    })

    const updateUserMutation = api.user.update.useMutation({
        onSuccess: () => {
            toast.success("Профиль обновлен");
            router.refresh();
        },
        onError: (error) => {
            toast.error("Ошибка", {
                description: error.message,
            });
        },
    });

    const onSubmit = (data: z.infer<typeof UpdateSchema>) => {
        updateUserMutation.mutate(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, OnError)} className="flex flex-col gap-y-10 w-full">
                <div className="flex flex-col gap-y-6 w-full lg:w-[398px]">
                    <h1 className="text-base text-popover font-semibold">Личная информация</h1>

                    <div className="flex flex-col gap-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-black text-base font-medium">Имя</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Ваше имя"/>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
							control={form.control}
							name="gender"
							render={({ field }) => (
								<FormItem className="space-y-2">
									<FormLabel>Пол</FormLabel>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="bg-muted border-0 text-accent/50">
                                                <SelectValue placeholder="Выберите пол" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {genderUserEnum.enumValues.map((item) => (
                                                    <SelectItem value={item} key={item}>{genederToString(item)}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
								</FormItem>
							)}
						/>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="flex flex-col gap-y-6 w-full lg:w-[398px]">
                        <h1 className="text-base text-popover font-semibold">Показатели</h1>

                        <div className="flex flex-col gap-y-6">
                            <FormField
                                control={form.control}
                                name="age"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-black text-base font-medium">Возраст</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Возраст"/>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
            
                            <FormField
                                control={form.control}
                                name="weight"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-black text-base font-medium">Вес</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Вес"/>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                
                            <FormField
                                control={form.control}
                                name="height"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-black text-base font-medium">Рост</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Рост"/>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
        
                            <FormField
                                control={form.control}
                                name="activity"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-black text-base font-medium">Активность</FormLabel>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="bg-muted border-0 text-accent/50">
                                                    <SelectValue placeholder="Выберите активность" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {activityUserEnum.enumValues.map((item) => (
                                                        <SelectItem value={item} key={item}>{activityToString(item)}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <Diet session={session}/>
                </div>

                <Button disabled={updateUserMutation.isPending} className="w-full lg:w-[398px]">Сохранить</Button>
            </form>
        </Form>
    )
}