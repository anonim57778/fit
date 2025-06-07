"use client";
import { Menu } from "lucide-react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "~/components/ui/sheet";
import { api } from "~/trpc/react";


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

type NavbarT = {
    name: string,
    id: string,
}

const navbarItems: NavbarT[] = [
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
    item: NavbarT
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

function MobileNavbar({
    session
} : {
    session: Session
}) {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="lg:hidden">
                <Menu className="size-6 text-primary"/>
            </SheetTrigger>
            <SheetContent className="flex gap-4 flex-col">
                <SheetHeader className="flex flex-row justify-between">
                    <h1 className="text-2xl font-bold text-primary">FITLOG</h1>
                </SheetHeader>
                <div className="grow flex flex-col gap-6 items-center">
                    {navbarItems.map((item, index) => (
                        <NavbarItem key={index} item={item}/>
                    ))}
                </div>

                <SheetFooter>
                    {session?.user ? (
                        <Link href="/logout">
                            <Button>
                                Выход
                            </Button>
                        </Link>
                    ) : (
                        <Link href="/login">
                            <Button>
                                Вход
                            </Button>
                        </Link>
                    )}

                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default function Navbar() {

    const { data: session } = api.user.session.useQuery();

    return (
        <header className="shadow-md">
            <div className="flex justify-between items-center py-[18.5px] container">
                <Link href="/">
                    <h1 className="text-2xl font-bold text-primary">FITLOG</h1>
                </Link>

                <div className="hidden lg:flex gap-6">
                    {navbarItems.map((item, index) => (
                        <NavbarItem key={index} item={item} />
                    ))}
                </div>

                <div className="hidden lg:block">
                    {session?.session?.user ? (
                        <Link href="/logout">
                            <Button>
                                Выход
                            </Button>
                        </Link>
                    ) : (
                        <Link href="/login">
                            <Button>
                                Вход
                            </Button>
                        </Link>
                    )}
                </div>

                <MobileNavbar session={session?.session!} />
            </div>
        </header>
    )
}