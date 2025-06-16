"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { type Pricing } from "~/lib/shared/types/pricing";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

export default function PaymentButton({
    pricing,
    isActive
} : {
    pricing: Pricing,
    isActive: boolean
}) {

    const router = useRouter();

    const createPaymentMutation = api.payment.create.useMutation({
        onSuccess: (data) => {
            router.push(data.url);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    const onSubmit = (data: Pricing) => {
        createPaymentMutation.mutate(data);
    }

    return (
        <Button
            className={cn(isActive ? "bg-primary/5 text-primary hover:text-white" : "")}
            onClick={() => onSubmit(pricing)}
        >
            {isActive ? "Ваш тариф" : "Перейти"}
        </Button>
    )
}