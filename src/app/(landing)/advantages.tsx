import { ScanFace, ChartSpline, Eye, Waves } from "lucide-react";
import { ReactNode } from "react";


type advantegesT = {
    name: string,
    icon: ReactNode
}

const advantages: advantegesT[] = [
    {
        name: "Простой и понятный интерфейс",
        icon: <div className="size-20 rounded-[8px] bg-muted flex items-center justify-center"><ScanFace className="size-16 text-secondary"/></div>
    },
    {
        name: "Персонализированный анализ",
        icon: <div className="size-20 rounded-[8px] bg-muted flex items-center justify-center"><ChartSpline className="size-16 text-secondary"/></div>
    },
    {
        name: "Комплексный контроль",
        icon: <div className="size-20 rounded-[8px] bg-muted flex items-center justify-center"><Eye className="size-16 text-secondary"/></div>
    },
    {
        name: "Гибкость в использовании",
        icon: <div className="size-20 rounded-[8px] bg-muted flex items-center justify-center"><Waves className="size-16 text-secondary"/></div>
    },
]

function AdvantagesItem({
    item
} : {
    item: advantegesT
}) {
    return (
        <div className="flex flex-col items-center lg:items-start gap-4 w-full lg:w-64">
            {item.icon}

            <h1 className="text-primary text-2xl font-bold text-center lg:text-left">{item.name}</h1>
        </div>
    )
}

export default function Advantages() {

    return (
        <section id="advantages" className="container py-16 lg:py-20 space-y-16">
            <h1 className="text-accent text-center font-bold text-2xl lg:text-left lg:text-5xl">Наши преимущества</h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {advantages.map((item, index) => (
                    <AdvantagesItem key={index} item={item} />
                ))}
            </div>
        </section>
    )
}