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

export default function DeleteFood({
	id,
}: {
	id: string;
}) {
	const router = useRouter();

	const deleteMutation = api.food.delete.useMutation({
		onSuccess() {
			toast.success("Питание удалено");
			router.refresh();
		},
		onError(error) {
			toast.error("Ошибка удаления питания", {
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
					<AlertDialogTitle>Удалить питание</AlertDialogTitle>
					<AlertDialogCancel>
                        <X className="size-6"/>
                    </AlertDialogCancel>
				</AlertDialogHeader>
				<AlertDialogDescription>
					Вы уверены, что хотите удалить питание?
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
