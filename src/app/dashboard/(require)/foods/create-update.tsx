"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pen, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { OnError } from "~/lib/client/on-error";
import { mealToString } from "~/lib/enums";
import { type Food, FoodSchema } from "~/lib/shared/types/food";
import { type Meal } from "~/server/db/schema";
import { api } from "~/trpc/react";

export default function CreateUpdateFood({
    food,
    meal
} : {
    food?: Food,
    meal: Meal
}) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(FoodSchema),
    defaultValues: food ? food : {
        meal: meal
    } as z.infer<typeof FoodSchema>
  });

  const router = useRouter();

  const createFoodMutation = api.food.create.useMutation({
    onSuccess: () => {
      setOpen(false);
      router.refresh();
      form.reset();
      toast.success("Питание создано");
    },
    onError: (error) => {
      toast.error("Ошибка", {
        description: error.message,
      });
    },
  });

  const updateFoodMutation = api.food.update.useMutation({
    onSuccess: () => {
      setOpen(false);
      router.refresh();
      form.reset();
      toast.success("Питание обновлено");
    },
    onError: (error) => {
      toast.error("Ошибка", {
        description: error.message,
      });
    },
  });

  const onSubmit = (data: z.infer<typeof FoodSchema>) => {
    if (food) {
      updateFoodMutation.mutate({
        ...data,
        id: food.id,
      });
      return
    } 

    createFoodMutation.mutate({
        ...data,
        meal: meal
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
            className="size-8 p-0 flex items-center justify-center rounded-full"
            variant="secondary"
        >
            {food ? (
                <Pen className="size-4" />
            ) : (
                <Plus className="size-4" />
            )}
        </Button>  
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{food ? "Редактирование" : "Добавление"} {mealToString(meal)}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, OnError)}
            className="space-y-6 flex flex-col grow"
          >
            <div className="space-y-6 grow">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="text-black text-base font-medium">Название</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="Название еды"/>
                        </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="grams"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="text-black text-base font-medium">Граммы</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="Гаммы"/>
                        </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="squirrels"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="text-black text-base font-medium">Белки</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="Белки"/>
                        </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="fats"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="text-black text-base font-medium">Жиры</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="Жиры"/>
                        </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="сarbohydrates"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="text-black text-base font-medium">Углеводы</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="Углеводы"/>
                        </FormControl>
                        </FormItem>
                    )}
                />
            </div>
            <DialogFooter>
              <Button>
                {food ? "Обновить" : "Добавить"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}