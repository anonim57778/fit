"use client";
import { Form, FormControl, FormField, FormItem, FormLabel } from "~/components/ui/form";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "~/lib/shared/types/user";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { OnError } from "~/lib/client/on-error";


export default function LoginPage() {

    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {} as z.infer<typeof LoginSchema>
    })

    const router = useRouter();

    async function onSubmit(data: z.infer<typeof LoginSchema>) {
        try {
            const result = await signIn("credentials", {
                redirect: false,
                ...data
            });

            if (result?.error) {
                throw new Error(result.error);
            }

            router.push("/");
        } catch (error) {
            console.error(error);
            toast.error("Ошибка авторизации");
        }
    }

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="flex flex-col gap-6 w-full lg:w-[398px]">
                <h1 className="text-2xl font-bold text-primary text-center">FITLOG</h1>
                <p className="text-base font-medium text-black text-center">Вход</p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, OnError)} className="flex flex-col gap-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-black text-base font-medium">Почта</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="FitLog@gmail.com"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-black text-base font-medium">Пароль</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Пароль"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <Link href="/register">
                            <Button>
                                Регистрация
                            </Button>
                        </Link>

                        <Button type="submit">
                            Войти
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}