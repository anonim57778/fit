import About from "./about";
import Advantages from "./advantages";
import Functional from "./functional";
import Hero from "./hero";
import Reviews from "./reviews";


export default function Home() {

    return (
        <div>
            <Hero/>
            <Advantages/>
            <Functional/>
            <Reviews/>
            <About/>
        </div>
    )
}