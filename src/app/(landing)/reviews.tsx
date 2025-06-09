import { Star } from "lucide-react";
import person1 from "../../../public/images/person1.svg";
import person2 from "../../../public/images/person2.svg";
import Image from "next/image";
import { type ReactNode } from "react";
import { Carousel, CarouselContent, CarouselItem } from "~/components/ui/carousel";


type reviewsT = {
    name: string,
    job: string,
    comment: string,
    image: ReactNode
};

const reviews: reviewsT[] = [
    {
        name: "Игорь Соловьев",
        job: "Офисный сотрудник",
        comment: "С FitLog я наконец-то смог упорядочить свои тренировки и следить за питанием. Очень удобное приложение",
        image: <Image src={person1 as string} alt="person1" className="size-16 rounded-full object-cover"/>
    },
    {
        name: "Анна Крылова",
        job: "Любитель бега",
        comment: "Полностью изменила мой подход к тренировкам. Теперь я вижу свой прогресс и могу корректировать питание для лучших результатов",
        image: <Image src={person2 as string} alt="person2" className="size-16 rounded-full object-cover"/>
    },
];


function ReviewItem({
    item
} : {
    item: reviewsT
}) {

    return (
        <div className="p-6 space-y-6 rounded-3xl shadow-md h-auto lg:h-[285px]">
            <div className="flex justify-between items-start flex-wrap gap-4">
                <div className="flex gap-5 items-center">
                    {item.image}

                    <div className="space-y-2">
                        <h1 className="text-xl text-accent font-medium">{item.name}</h1>
                        <p className="text-sm text-accent/60 font-medium">{item.job}</p>
                    </div>
                </div>

                <div className="flex gap-1">
                    {Array.from({ length: 5 }, (_, index) => (
                        <Star key={index} className="fill-primary stroke-none size-6 border-none"/>
                    ))}
                </div>
            </div>

            <p className="text-accent/60 font-normal text-base lg:text-xl">{item.comment}</p>
        </div>
    )
};

export default function Reviews() {

    return (
        <section id="reviews" className="container py-16 lg:py-20 space-y-16">
            <div className="space-y-4 text-center lg:text-left w-full lg:w-[590px]">
                <h1 className="font-bold text-accent text-5xl">Отзывы</h1>
                <p className="text-accent font-normal text-base lg:text-2xl">Мы предлагаем полный спектр услуг, чтобы обеспечить вам удобство и качество обслуживания.</p>
            </div>

            <div className="hidden lg:grid grid-cols-2 gap-10">
                {reviews.map((item, index) => (
                    <ReviewItem key={index} item={item} />
                ))}
            </div>

            <Carousel className="lg:hidden">
                <CarouselContent>
                    {reviews.map((item, index) => (
                        <CarouselItem
                            key={index}
                        >
                            <ReviewItem key={index} item={item} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </section>
    )
}