"use client";
import { Form } from "~/components/ui/form";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "~/lib/shared/types/user";
import { type z } from "zod";
import { toast } from "sonner";
import { OnError } from "~/lib/client/on-error";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "~/lib/utils";
import ActivityForm from "./activity";
import NameForm from "./name";
import GenderForm from "./gender";
import AgeForm from "./age";
import WeightForm from "./weight";
import HeightForm from "./height";
import DataForm from "./data";

const steps = [
  "name",
  "gender",
  "age",
  "weight",
  "height",
  "activity",
  "data",
]

function Step({
  step,
} : {
  step: (typeof steps)[number];
}) {

  return (
    <div className="grid grid-cols-7 gap-2">
      {steps.map((item, index) => (
        <div key={index} className={cn("h-[3px] bg-muted", steps.findIndex((i) => i == step) >= index && "bg-primary")}></div>
      ))}
    </div>
  )
}

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState<typeof steps[number]>("name");

  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {} as z.infer<typeof RegisterSchema>
  })

  const registerMutation = api.user.register.useMutation({
    onSuccess: async (data) => {
      try {
        const res = await signIn("credentials", {
          redirect: false,
          ...data,
        });
        if (res?.error) {
          throw new Error(res.error);
        }

        router.push("/dashboard");
      } catch (error) {
        toast.error((error as Error).message);
      }
    },
    onError: (error) => {
      toast.error("Ошибка регистрации", {
        description: error.message,
      });
    },
  });

  const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col gap-6 w-full lg:w-[398px] container">
        <h1 className="text-2xl font-bold text-primary text-center">FITLOG</h1>

        <Step step={currentStep} />
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, OnError)}>
            {currentStep === "name" && (
              <NameForm control={form.control} onCLick={() => setCurrentStep("gender")} />
            )}

            {currentStep === "gender" && (
              <GenderForm control={form.control} onCLick={() => setCurrentStep("age")} back={() => setCurrentStep("name")} />
            )}

            {currentStep === "age" && (
              <AgeForm control={form.control} onCLick={() => setCurrentStep("weight")} back={() => setCurrentStep("gender")} />
            )}

            {currentStep === "weight" && (
              <WeightForm control={form.control} onCLick={() => setCurrentStep("height")} back={() => setCurrentStep("age")} />
            )}

            {currentStep === "height" && (
              <HeightForm control={form.control} onCLick={() => setCurrentStep("activity")} back={() => setCurrentStep("weight")} />
            )}

            {currentStep === "activity" && (
              <ActivityForm control={form.control} onCLick={() => setCurrentStep("data")} back={() => setCurrentStep("height")} />
            )}

            {currentStep === "data" && (
              <DataForm control={form.control} back={() => setCurrentStep("activity")} />
            )}
          </form>
        </Form>
      </div>
    </div>
  )
}