import { UserRound } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";


export default async function Profile() {

    const session = await getServerSession();

    return (
        <Link href={"/dashboard/profile"} className="flex flex-col items-center gap-2">
            <div className="size-12 rounded-full bg-muted flex items-center justify-center">
                <UserRound className="size-6 text-primary"/>
            </div>

            <h1 className="text-base text-accent font-semibold">{session?.user?.name}</h1>
        </Link>
    )
}