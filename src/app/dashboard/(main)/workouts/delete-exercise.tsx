"use client";

import { Trash, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export default function DeleteExercise({
    id,
}: {
    id: string;
}) {
    const router = useRouter();

    const deleteMutation = api.workout.deleteExercise.useMutation({
        onSuccess() {
            toast.success("Упражнение удалено");
            router.refresh();
        },
        onError(error) {
            toast.error("Ошибка удаления упражнения", {
                description: error.message
            });
        },
    });

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    className="size-8 p-0 flex items-center justify-center rounded-full"
                    variant="secondary"
                >
                    <Trash className="size-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Удалить упражнение</AlertDialogTitle>
                    <AlertDialogCancel>
                        <X className="size-6"/>
                    </AlertDialogCancel>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    Вы уверены, что хотите удалить упражнение?
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogAction className="p-3" onClick={() => deleteMutation.mutate({ id })}>
                        Удалить
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
