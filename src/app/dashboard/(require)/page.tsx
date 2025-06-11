import { Flame, Beef, Banana, Nut } from "lucide-react";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/server";
import { DashboardChart } from "./chart";
import { getDiet } from "../profile/diet";
import { getServerAuthSession } from "~/server/auth";
import Link from "next/link";

function StatisticCard({
    children,
    className
} : {
    children: React.ReactNode;
    className?: string;
}) {

    return (
        <div className={cn("p-6 rounded-3xl flex flex-col justify-between", className)}>
            {children}
        </div>
    )
}

function StatisticItem({
    title,
    amount,
    icon,
    normal,
    textStyle,
    isCal
} : {
    title: string;
    amount: number;
    icon: React.ReactNode;
    normal: number;
    textStyle?: string;
    isCal?: boolean;
}) {

    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className={cn("text-2xl font-bold", textStyle || "text-accent")}>{title}</h1>

                <div className="bg-muted rounded-full flex justify-center items-center size-10">
                    {icon}
                </div>
            </div>

            <DashboardChart
                norm={normal}
                amount={amount}
                title={title}
            />

            <h1 className={cn("text-2xl font-bold text-accent", textStyle ? "text-white" : "text-accent")}>
                {normal}
                <span className="opacity-60">{isCal ? "кал" : "г"}</span>
            </h1>
        </div>
    )
}

export default async function StatisticDashboardPage() {
    const session = await getServerAuthSession();
    const total = await api.food.getTotal();
    const diet = getDiet(session!);

    return (
        <div className="pb-14 lg:pb-0 text-center flex flex-col gap-6">
            <Link href="/" className="text-center text-primary text-2xl font-bold lg:hidden">FITLOG</Link>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <StatisticCard className="bg-white">
                    <StatisticItem 
                        title="Калории"
                        amount={total.calories}
                        icon={<Flame className="size-6 text-primary"/>}
                        normal={diet.calories}
                        isCal
                    />

                </StatisticCard>

                <StatisticCard className="bg-[#131313]"> 
                    <StatisticItem 
                        title="Белки"
                        amount={total.squirrels}
                        icon={<Beef className="size-6 text-primary"/>}
                        normal={diet.squirrels}
                        textStyle="text-white"
                    />
                </StatisticCard>

                <StatisticCard className="bg-primary"> 
                    <StatisticItem 
                        title="Углеводы"
                        amount={total.carbonydrates}
                        icon={<Banana className="size-6 text-primary"/>}
                        normal={diet.protein}
                        textStyle="text-white"
                    />
                </StatisticCard>

                <StatisticCard className="bg-[#B2C4F2]"> 
                    <StatisticItem 
                        title="Жиры"
                        amount={total.fat}
                        icon={<Nut className="size-6 text-primary"/>}
                        normal={diet.fat}
                    />
                </StatisticCard>
            </div>
        </div>
    )
}