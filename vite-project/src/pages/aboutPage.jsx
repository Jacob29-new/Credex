import Navbar from "../components/navbar";
import team from "../assets/team.svg";

function AboutPage() {



    return (
        <div className="h-full w-full">
            <Navbar></Navbar>
            <section className="py-16 w-full flex items-center justify-center bg-gradient-to-r from-[#0a0a0a] to-[#333333] bg-no-repeat bg-center"
                style={{ backgroundImage: `url(${team})` }}>
                <p className="text-4xl font-bold text-white">About us</p>
            </section>

            <section className="mt-16 sm:mt-32  w-full flex items-center justify-center flex-col">
                <p className="text-3xl mt-10 font-bold text-black flex items-center justify-center text-center">Transforming lives, one task at a time</p>
                <p className="text-lg w-1/2 mt-4 text-black flex items-center justify-center text-center">
                    We bring people together. It’s at the heart of everything we do.
                    We know that for every person who needs their radiator fixed before winter,
                    the nursery set up for their newborn, or a TV mounted in time for game day,
                    there’s someone nearby who is ready, willing, and able to help, without delay.
                    When these two people come together, they help each other in a profound way
                    —they offer each other a better way of living.
                </p>
            </section>
            <footer className="bg-gray-800 text-white py-10 mt-40">
                <div className="text-center">
                <div className="mb-4">
                    <p>© 2025 Jacob Schwam. All rights reserved.</p>
                </div>
                <div className="space-x-4">
                    <a href="/about" className="hover:underline">About Us</a>
                    <a href="/contact" className="hover:underline">Contact</a>
                    <a href="/terms" className="hover:underline">Terms of Service</a>
                    <a href="/privacy" className="hover:underline">Privacy Policy</a>
                </div>
                </div>
            </footer>
        </div>
    )

}

export default AboutPage;