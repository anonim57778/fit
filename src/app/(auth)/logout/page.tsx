"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { api } from "~/trpc/react";

export default function Page() {
	const router = useRouter();

	const utils = api.useUtils();

	useEffect(() => {
		signOut({
			redirect: true,
		}).then(() => {
			utils.user.session.invalidate();
			router.push("/");
		});
	}, []);

	return (
		<div className="h-screen w-screen flex items-center justify-center">
            <h1>Выходим...</h1>
        </div>
	);
}
