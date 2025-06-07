import { getServerSession } from "next-auth";
import { MobileSidebarItem, SidebarItem, sidebarT } from "./sidebar-item";
import { Apple, BicepsFlexed, ChartSpline, WalletCards, UserRound } from "lucide-react"
import Link from "next/link";

const sidebarItems: sidebarT[] = [
    {
        name: "Статистика",
        href: "/dashboard",
        icon: <ChartSpline className="size-6"/>
    },
    {
        name: "Питание",
        href: "/dashboard/foods",
        icon: <Apple className="size-6"/>
    },
    {
        name: "Тренировки",
        href: "/dashboard/workouts",
        icon: <BicepsFlexed className="size-6"/>
    },
    {
        name: "Тарифы",
        href: "/dashboard/pricings",
        icon: <WalletCards className="size-6"/>
    },
]


export default async function Sidebar() {

    const session = await getServerSession();

    return (
        <div>
            <div className="w-[250px] bg-white h-full rounded-3xl p-6 flex-col gap-6 hidden lg:flex">
                <Link href={"/"} className="text-2xl font-bold text-primary pb-6 border-b border-b-muted text-left">FITLOG</Link>

                <div className="grow flex flex-col gap-6">
                    {sidebarItems.map((item, index) => (
                        <SidebarItem key={index} item={item} />
                    ))}
                </div>

                <Link href={"/dashboard/profile"} className="flex flex-col items-center gap-2">
                    <div className="size-12 rounded-full bg-muted flex items-center justify-center">
                        <UserRound className="size-6 text-primary"/>
                    </div>

                    <h1 className="text-base text-accent font-semibold">{session?.user?.name}</h1>
                </Link>
            </div>

            <div className="fixed bottom-2 left-0 w-full flex justify-center lg:hidden">
                <div className="rounded-full bg-white w-fit p-1 flex gap-3 border border-muted">
                    {sidebarItems.map((item, index) => (
                        <MobileSidebarItem key={index} item={item} />
                    ))}
                </div>
            </div>
        </div>
    )
}