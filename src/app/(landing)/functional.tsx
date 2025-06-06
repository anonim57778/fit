import Image from "next/image";
import diary from "../../../public/images/diary.svg";
import analytics from "../../../public/images/analytics.svg";
import control from "../../../public/images/control.svg";
import { ReactNode } from "react";
import { Carousel, CarouselContent, CarouselItem } from "~/components/ui/carousel";

type functionalT = {
    name: string,
    icon: ReactNode
}

const functionals: functionalT[] = [
    {
        name: "Ведение дневника тренировок",
        icon: <Image src={diary} alt="diary"/>
    },
    {
        name: "Аналитика и прогресс",
        icon: <Image src={analytics} alt="analytics"/>
    },
    {
        name: "Контроль вашего питания",
        icon: <Image src={control} alt="control"/>
    },
]

function FunctionalItem({
    item
} : {
    item: functionalT
}) {

    return (
        <div className="flex flex-col items-center justify-between gap-6 p-6 shadow-md rounded-2xl">
            <div className="aspect-square flex justify-center items-center">
                {item.icon}
            </div>

            <h1 className="text-primary text-2xl font-bold text-center lg:text-4xl">{item.name}</h1>
        </div>
    )
}


export default function Functional() {

    return (
        <section id="functional" className="container py-16 lg:py-20 space-y-16">
            <div className="space-y-4 text-center lg:text-left w-full lg:w-[590px]">
                <h1 className="font-bold text-accent text-5xl">Функционал</h1>
                <p className="text-accent font-normal text-base lg:text-2xl">Наша команда предлагает удобный учет тренировок, анализ прогресса и контроль питания для ваших лучших результатов</p>
            </div>

            <div className="hidden lg:grid grid-cols-3 gap-16">
                {functionals.map((item, index) => (
                    <FunctionalItem key={index} item={item} />
                ))}
            </div>

            <Carousel className="lg:hidden">
                <CarouselContent>
                    {functionals.map((item, index) => (
                        <CarouselItem
                            key={index}
                        >
                            <FunctionalItem key={index} item={item} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </section>
    )
}