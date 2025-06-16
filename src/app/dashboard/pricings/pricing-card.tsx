import { type Pricing, pricingData } from "~/lib/shared/types/pricing";
import PaymentButton from "./payment-button";
import { Session } from "next-auth";


export default function PricingCard({
    item,
    session
} : {
    item: Pricing,
    session: Session
}) {

    return (
        <div className="p-6 rounded-3xl bg-white flex flex-col justify-between gap-y-6">
            <div className="flex flex-col gap-y-4 text-left">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-accent font-semibold text-2xl">{pricingData[item].name}</h1>

                    <p className="text-accent/40 font-normal text-base">{pricingData[item].description}</p>
                </div>

                <h1 className="text-accent font-normal text-base flex items-center gap-1">₽ <span className="text-2xl font-medium">{pricingData[item].price}</span>{pricingData[item].postfix}</h1>
            </div>

            <div className="flex flex-col gap-y-4">
                {pricingData[item].advantages.map((item, index) => (
                    <div key={index} className="flex gap-2 items-center">
                        <div className="size-2 rounded-full bg-primary">
                        </div>

                        <h1 className="text-accent font-normal text-base">{item}</h1>
                    </div>
                ))}
            </div>

            <PaymentButton pricing={item} isActive={session.user.activePricing === item}/>
        </div>
    )
}