import Image from "next/image";
import Link from "next/link";
import imageHero1 from "../../../public/images/hero1.svg";
import imageHero2 from "../../../public/images/hero2.svg";
import imageHero3 from "../../../public/images/hero3.svg";
import mobileImageHero from "../../../public/images/mobile-hero.svg";
import { Button } from "~/components/ui/button";


export default function Hero() {

    return (
        <section className="flex items-center flex-col gap-10 py-16 container lg:py-20 min-h-screen">
            <div className="hidden lg:flex justify-between items-end gap-4">
                <Image
                    src={imageHero1 as string}
                    alt="hero"
                    width={407}
                    height={467}
                />

                <Image
                    src={imageHero2 as string}
                    alt="hero"
                    width={298}
                    height={483}
                />

                <Image
                    src={imageHero3 as string}
                    alt="hero"
                    width={480}
                    height={415}
                />
            </div>

            <div className="flex flex-col gap-6 items-center w-full lg:w-[902px]">
                <h1 className="font-bold text-accent text-2xl lg:text-5xl text-center">Удобный журнал ваших тренировок</h1>

                <p className="text-base text-accent/60 font-normal text-center">FitLog помогает вам легко записывать и отслеживать ваши тренировки. Кроме того, приложение учитывает и анализирует ваше питание, позволяя вам управлять своим здоровьем комплексно. Начните вести учет своих достижений и питания сегодня.</p>

                <Link href="/dashboard">
                    <Button>
                        Вход на платформу
                    </Button>
                </Link>
            </div>

            <Image 
                src={mobileImageHero as string}
                alt="hero"
                width={1000}
                height={1000}
                className="w-full block lg:hidden"
            />
        </section>
    )
}