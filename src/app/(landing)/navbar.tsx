"use client";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Button } from "~/components/ui/button";


const SCROLL_OFFSET = -48;

const useScrollToElement = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const onScroll = (elementId: string) => {
		if (typeof window === "undefined") return;

		if (window.location.pathname !== "/") {
			router.push(`/?scrollTo=${elementId}`);
		} else {
			scrollToElement(elementId);
		}
	};

	const scrollToElement = (elementId: string) => {
		const element = document.getElementById(elementId);
		console.log({ element });
		if (element) {
			const elementPosition = element.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.scrollY + SCROLL_OFFSET;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});
		} else {
			console.warn(`Element with ID ${elementId} not found`);
		}
	};

	useEffect(() => {
		const scrollTo = searchParams.get("scrollTo");
		console.log({ scrollTo });
		if (typeof scrollTo === "string") {
			setTimeout(() => {
				scrollToElement(scrollTo);
				router.replace(pathname);
			}, 4200);
		}
	}, [searchParams]);

	return onScroll;
};

type navbarT = {
    name: string,
    id: string,
}

const navbarItems: navbarT[] = [
    {
        name: "Преимущества",
        id: "advantages",
    },
    {
        name: "Функционал",
        id: "functional",
    },
    {
        name: "Отзывы",
        id: "reviews",
    },
    {
        name: "О нас",
        id: "about",
    }
]

function NavbarItem({
    item
} : {
    item: navbarT
}) {
    const onScroll = useScrollToElement();

    return (
        <div>
            <span className="text-accent text-base font-semibold cursor-pointer" onClick={() => onScroll(item.id)}>
                {item.name}
            </span>
        </div>
    )
}

export default function Navbar() {

    return (
        <header className="shadow-md">
            <div className="flex justify-between items-center py-[18.5px] container">
                <h1 className="text-2xl font-bold text-primary">FITLOG</h1>

                <div className="hidden lg:flex gap-6">
                    {navbarItems.map((item, index) => (
                        <NavbarItem key={index} item={item} />
                    ))}
                </div>

                <Link href="/login" className="hidden lg:block">
                    <Button>
                        Вход
                    </Button>
                </Link>
            </div>
        </header>
    )
}