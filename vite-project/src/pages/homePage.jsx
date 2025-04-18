import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import skill from "../assets/skill.svg";
import system from "../assets/system.svg";
import credit from "../assets/credit.svg";
import collaboration from "../assets/colaboration.svg";
import currency from "../assets/currency.svg";
import redeem from "../assets/redeem.svg";
import webdevelopment from "../assets/webdevelopment.svg";
import design from "../assets/design.svg";
import camera from "../assets/camera.svg";

function HomePage() {
  return (
    <div className="h-full w-full bg-gradient-to-r from-gray-800 via-gray-500 to-orange-500">
      {/* Navbar */}
      <Navbar />

      {/* Top Section */}
      <section className="flex flex-col items-center justify-center text-center py-16 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-12">
          Trade Your Skills, Earn Credits. No Money Needed.
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white mb-6 max-w-xl mx-auto">
          Offer services, earn credits, and redeem them for other services – all in a trusted platform.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/register" className="bg-black text-orange-400 py-2 px-6 rounded-full font-semibold hover:bg-orange-400 hover:text-black transition-all duration-300 cursor-pointer">
            Start Offering Services
          </Link>
          <Link to="/services" className="transition-all duration-300 cursor-pointer hover:bg-orange-400 hover:text-black bg-transparent border-2 border-white text-white py-2 px-6 rounded-full font-semibold">
            Browse Services
          </Link>
        </div>

        <section className=" hidden xl:flex flex flex-col items-center justify-center text-center py-16 px-4 w-full mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
            {/* Item 1 */}
            <div className="flex flex-col items-center">
              <img src={collaboration} className="w-12 h-12 mb-6"></img>
              <h3 className="text-lg font-semibold mb-2">Collaborate</h3>
              <p className="text-black-600 text-sm">Connect with real people to exchange real value.</p>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col items-center">
              <img src={credit} className="w-12 h-12  mb-6"></img>              
              <h3 className="text-lg font-semibold mb-2">No Money</h3>
              <p className="text-black-600 text-sm">No money. Just earn and spend credits.</p>
            </div>
              

            {/* Item 3 */}
            <div className="flex flex-col items-center">
              <img src={skill} className="w-12 h-12-400 mb-6"></img>
              <h3 className="text-lg font-semibold mb-2">Trade Skills</h3>
              <p className="text-black-600 text-sm">Offer what you do best, get what you need most.</p>
            </div>

            {/* Item 4 */}
            <div className="flex flex-col items-center">
              <img src={system} className="w-12 h-12 mb-6"></img>
              <h3 className="text-lg font-semibold mb-2">Trusted System</h3>
              <p className="text-black-600 text-sm">Escrow, ratings, and confirmations keep it fair.</p>
            </div>
          </div>
        </section>

      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">How It Works</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="mb-4">
              <img src={skill} className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Offer a Service</h3>
            <p className="text-gray-600">Create your profile and list your services.</p>
          </div>
          <div className="text-center">
            <div className="mb-4">
              <img src={currency} className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Earn Credits</h3>
            <p className="text-gray-600">Complete tasks and earn credits based on your services.</p>
          </div>
          <div className="text-center">
            <div className="mb-4">
              <img src={redeem}  className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Redeem Credits</h3>
            <p className="text-gray-600">Use credits to request services from others or trade them.</p>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-16 bg-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Featured Services</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Example of service category */}
          <div className="group bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center flex-col ">
            <img src={webdevelopment} className="w-32 h-32 object-cover mb-4 rounded transition-transform duration-300 group-hover:scale-120" />
            <h3 className="text-xl font-semibold text-gray-800 transition-transform duration-300 group-hover:scale-95">Web Development</h3>
            <p className="text-gray-600 transition-transform duration-300 group-hover:scale-95">Build stunning websites with expert developers.</p>
          </div>
          <div className="group bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center flex-col ">
          <img src={design} className="w-32 h-32 object-cover mb-4 rounded transition-transform duration-300 group-hover:scale-120" />
            <h3 className="text-xl font-semibold text-gray-800 transition-transform duration-300 group-hover:scale-95">Graphic Design</h3>
            <p className="text-gray-600 transition-transform duration-300 group-hover:scale-95">Create eye-catching designs for your business.</p>
          </div>
          <div className="group bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center flex-col ">
          <img src={camera} className="w-32 h-32 object-cover mb-4 rounded transition-transform duration-300 group-hover:scale-120" />
            <h3 className="text-xl font-semibold text-gray-800 transition-transform duration-300 group-hover:scale-95">Photography</h3>
            <p className="text-gray-600 transition-transform duration-300 group-hover:scale-95">Capture moments with professional photographers.</p>
          </div>
        </div>
        <div className="text-center mt-8">
          <Link to="/services" className="bg-[#f97316] hover:bg-black transition-all duration-300 text-white py-2 px-6 rounded-full font-semibold">
            Browse More Services
          </Link>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Trusted by ones of people!</h2>
        </div>
        <div className="flex justify-center">
          <div className="w-full sm:w-2/3 md:w-1/3 p-6 bg-orange-300 text-black rounded-lg shadow-lg flex flex-col items-center">
            <h3 className="text-xl font-semibold">"Great Experience!"</h3>
            <p className="text-gray-600 mt-2 text-center flex items-center">
              “This platform helped me connect with incredible people. I highly recommend it.”
            </p>
            <p>-Pavel</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
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
  );
}

export default HomePage;
