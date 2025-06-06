import Footer from "./footer";
import Navbar from "./navbar";


export default function LandingLayout({
    children,
} : Readonly<{ children: React.ReactNode }>) {

    return (
        <main>
            <Navbar/>
            {children}
            <Footer/>
        </main>
    )
}