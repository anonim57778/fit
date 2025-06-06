import Link from "next/link";


export default function Footer() {

    return (
        <footer className="flex justify-between items-center gap-6 container py-16 lg:py-20 flex-col lg:flex-row border-t border-t-[#F6F6F6]">
            <Link href="/">
                <h1 className="text-2xl font-bold text-primary">FITLOG</h1>
            </Link>

            <p className="text-base text-accent/60 font-normal">© 2024  FitLog - Все права защищены </p>
        </footer>
    )
}