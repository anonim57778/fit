import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import { pricingTypeEnum } from "~/server/db/schema";
import PricingCard from "./pricing-card";


export default async function PricingsDashboardPage() {

    const session = await getServerAuthSession();

    return (
        <div className="pb-14 lg:pb-0 text-center flex flex-col gap-6">
            <Link href="/" className="text-center text-primary text-2xl font-bold lg:hidden">FITLOG</Link>

            <h1 className="text-accent font-semibold text-2xl text-left">Тарифы</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {pricingTypeEnum.enumValues.map((item, index) => (
                    <PricingCard key={index} item={item} session={session!}/>
                ))}
            </div>
        </div>
    )
}