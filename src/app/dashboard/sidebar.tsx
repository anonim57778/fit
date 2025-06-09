import { MobileSidebarItem, SidebarItem, type sidebarT } from "./sidebar-item";
import { Apple, BicepsFlexed, ChartSpline, WalletCards } from "lucide-react"
import Link from "next/link";
import Profile from "./profile";

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


export default function Sidebar() {

    return (
        <div>
            <div className="w-[250px] bg-white h-full rounded-3xl p-6 flex-col gap-6 hidden lg:flex">
                <Link href={"/"} className="text-2xl font-bold text-primary pb-6 border-b border-b-muted text-left">FITLOG</Link>

                <div className="grow flex flex-col gap-6">
                    {sidebarItems.map((item, index) => (
                        <SidebarItem key={index} item={item} />
                    ))}
                </div>

                <Profile/>
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