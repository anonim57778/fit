import { getServerAuthSession } from "~/server/auth";
import UpdateProdile from "./update";
import Link from "next/link";


export default async function ProfilePage() {

    const session = await getServerAuthSession();

    return (
        <div className="pb-14 lg:pb-0">
            <div className="bg-white rounded-3xl p-6 flex flex-col gap-4 lg:gap-0">
                <div>
                    <Link href="/" className="text-center text-primary text-2xl font-bold block lg:hidden">FITLOG</Link>
                </div>

                <UpdateProdile session={session!}/>
            </div>
        </div>
    )
}