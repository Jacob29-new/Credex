import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/credex.png";
function Navbar() {
    const location = useLocation();

    const [dropdown, setDropdown] = useState(false);
    return (
        <div className="border-b-1 bg-gradient-to-r from-[#0a0a0a] to-[#333333]  border-white flex items-center justify-between min-h-16 sm:min-h-16 w-full border-b-2 border-black sticky top-0 z-50 px-4 text-white">
            {/* Left side content  */}
            <div className="flex items-center space-x-2 max-h-16 select-none">
              <img src={logo} alt="Credex Logo" className="select-none h-12 w-auto object-contain"
              />
              <span className="text-2xl font-bold tracking-wide text-white">CREDEX</span>
            </div>

            {/* Right side content  */}
            <div className="hidden sm:flex space-x-6 text-white">
                <Link to="/" className={`text-[#F97316] transition-all duration-300 transform hover:text-gray-600 hover:scale-105 ${location.pathname === "/" ? " border-b-2" : ""}`}>Home</Link>
                <Link to="/about" className={`text-[#F97316] transition-all duration-300 transform hover:text-gray-600 hover:scale-105 ${location.pathname === "/about" ? " border-b-2" : ""}`}>About</Link>
                <Link to="/services" className={`text-[#F97316] transition-all duration-300 transform hover:text-gray-600 hover:scale-105 ${location.pathname === "/services" ? " border-b-2" : ""}`}>Services</Link>
                <Link to="/register" className={`text-[#F97316] transition-all duration-300 transform hover:text-gray-600 hover:scale-105 ${location.pathname === "/register" ? " border-b-2" : ""}`}>Register</Link>
                <Link to="/login" className={`text-[#F97316] transition-all duration-300 transform hover:text-gray-600 hover:scale-105 ${location.pathname === "/login" ? " border-b-2" : ""}`}>Login</Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden text-white">
                <button onClick={() => setDropdown(!dropdown)} className="text-gray-800 text-white text-2xl">
                    ☰
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {dropdown && (
                <div className="sm:hidden absolute top-16 right-0 w-1/4 bg-[#121212] text-white p-4">
                    <Link to="/" className="block mb-2 hover:text-gray-600">Home</Link>
                    <Link to="/about" className="block mb-2 hover:text-gray-600">About</Link>
                    <Link to="/services" className="block mb-2 hover:text-gray-600">Services</Link>
                    <Link to="/register" className="block mb-2 hover:text-gray-600">Register</Link>
                    <Link to="/login" className="transition-all duration-300 transform hover:text-gray-600 hover:scale-105 hover:underline">Login</Link>
                </div>
            )}
        </div>
    );
}

export default Navbar;
