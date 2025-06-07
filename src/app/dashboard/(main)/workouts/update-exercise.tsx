"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
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
import { ExerciseSchema, type Workout } from "~/lib/shared/types/workout";
import { api } from "~/trpc/react";

export default function UpdateExercise({
  exercise
} : {
  exercise: Workout["exercises"][number]
}) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(ExerciseSchema),
    defaultValues: exercise ? exercise : {} as z.infer<typeof ExerciseSchema>
  });

  const router = useRouter();

  const updateExerciseMutation = api.workout.updateExercise.useMutation({
    onSuccess: () => {
      setOpen(false);
      router.refresh();
      form.reset();
      toast.success("Упражение обновлено");
    },
    onError: (error) => {
      toast.error("Ошибка", {
        description: error.message,
      });
    },
  });

  const onSubmit = (data: z.infer<typeof ExerciseSchema>) => {
    updateExerciseMutation.mutate({
      ...data,
      id: exercise.id,
    });
  } 

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          className="size-8 p-0 flex items-center justify-center rounded-full"
          variant="secondary"
        >
          <Pen className="size-4" />
        </Button>  
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Обновить</DialogTitle>
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

              <FormField
                control={form.control}
                name="setRepeatWeight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black text-base font-medium">Подходы, повторения, вес</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="3x12x56"/>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button>
                Обновить
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}