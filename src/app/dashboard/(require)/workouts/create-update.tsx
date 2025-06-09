"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pen, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
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
import { type Workout, WorkoutSchema } from "~/lib/shared/types/workout";
import { api } from "~/trpc/react";

export default function CreateUpdateWorkout({
    workout
} : {
    workout?: Workout
}) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(WorkoutSchema),
    defaultValues: workout ? workout : {} as z.infer<typeof WorkoutSchema>
  });

  const router = useRouter();

  const createWorkoutMutation = api.workout.create.useMutation({
    onSuccess: () => {
      setOpen(false);
      router.refresh();
      form.reset();
      toast.success("Тренировка создана");
    },
    onError: (error) => {
      toast.error("Ошибка", {
        description: error.message,
      });
    },
  });

  const updateWorkoutMutation = api.workout.update.useMutation({
    onSuccess: () => {
      setOpen(false);
      router.refresh();
      form.reset();
      toast.success("Тренировка обновлена");
    },
    onError: (error) => {
      toast.error("Ошибка", {
        description: error.message,
      });
    },
  });

  const onSubmit = (data: z.infer<typeof WorkoutSchema>) => {
    if (workout) {
      updateWorkoutMutation.mutate({
        ...data,
        id: workout.id,
      });
      return
    } 

    createWorkoutMutation.mutate(data);
  };

  const excercises = useFieldArray({
    control: form.control,
    name: "exercises",
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {workout ? (
            <Button
                className="size-8 p-0 flex items-center justify-center rounded-full"
                variant="secondary"
            >
                <Pen className="size-4" />
            </Button>  
        ) : (
            <div className="flex flex-row justify-between items-center bg-white rounded-3xl p-6">
                <p className="font-semibold">Добавить</p>
                <Button
                    className="size-8 p-0 flex items-center justify-center rounded-full"
                    variant="secondary"
                >
                    <Plus className="size-4" />
                </Button>
            </div>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{workout ? "Редактирование" : "Добавление"}</DialogTitle>
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
                            <Input {...field} placeholder="Название тренировки"/>
                        </FormControl>
                        </FormItem>
                    )}
                />
                {excercises.fields.map((excercise, index) => (
                    <div className="space-y-4" key={excercise.id}>
                        <FormField
                            control={form.control}
                            name={`exercises.${index}.name`}
                            render={({ field }) => (
                                <>
                                    <p className="w-full text-center font-medium">
                                        {field.value !== ""
                                        ? field.value
                                        : `Упражнение ${index + 1}`}
                                    </p>

                                    <FormItem>
                                        <FormLabel className="text-black text-base font-medium">Название</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Название упражнения"/>
                                        </FormControl>
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`exercises.${index}.setRepeatWeight`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-black text-base font-medium">Подходы x Повторения x Вес</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="4X12X100"/>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                ))}
                <Button
                    className="w-full flex justify-between items-center h-fit"
                    variant="secondary"
                    type="button"
                    onClick={() =>
                        excercises.append({ name: "", setRepeatWeight: "" })
                    }
                >
                    Добавить
                    <div className="rounded-full size-8 p-0 flex items-center justify-center bg-white">
                        <Plus className="size-4" />
                    </div>
                </Button>
            </div>
            <DialogFooter>
              <Button>
                {workout ? "Обновить" : "Добавить"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}