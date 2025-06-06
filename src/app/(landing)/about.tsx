import Image from "next/image";
import aboutImage from "../../../public/images/about.svg";

type aboutT = {
    title: string,
    text: string
};

const about: aboutT[] = [
    {
        title: "Приложение",
        text: "Идея FitLog возникла из потребности сделать тренировки доступными для людей с сидячей работой. Мы хотели создать приложение, которое будет удобным помощником в вашем телефоне, напоминая о тренировках и помогая легко организовать их, чтобы вы могли заниматься даже в самый загруженный день."
    },
    {
        title: "Наша команда",
        text: "Наша команда состоит из людей, которые не только разрабатывают приложения, но и активно занимаются фитнесом. Мы понимаем, как важно поддерживать форму, особенно в условиях сидячей работы, и каждый из нас использует FitLog для того, чтобы оставаться в хорошей физической форме."
    },
];

function AboutItem({
    item
} : {
    item: aboutT
}) {
    return (
        <div className="space-y-4 text-left">
            <h1 className="text-accent text-xl font-bold">{item.title}</h1>
            <p className="text-accent text-base font-medium opacity-90">{item.text}</p>
        </div>
    )
}


export default function About() {

    return (
        <section id="about" className="container py-16 lg:py-20 space-y-16">
            <h1 className="font-bold text-accent text-5xl text-center lg:text-left">О нас</h1>

            <div className="flex justify-between items-center flex-col lg:flex-row gap-10">
                <Image
                    src={aboutImage}
                    alt="about"
                />

                <div className="space-y-10 w-full lg:w-[627px]">
                    {about.map((item, index) => (
                        <AboutItem key={index} item={item} />
                    ))}
                </div>
            </div>
        </section>
    )
}