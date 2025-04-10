import { Link } from "react-router-dom";
function Navbar() {
    return (
        <div className="flex items-center justify-between min-h-16 sm:min-h-16 w-full border-b-2 border-black bg-indigo-900 sticky top-0 z-50 px-4 text-white">
            {/* Left side content (Logo or Home Link) */}
            <div className="text-2xl font-semibold">
                Logo
            </div>

            {/* Right side content (Navigation Links) */}
            <div className="hidden sm:flex space-x-6 text-white">
                <Link to="/" className="hover:text-gray-600">Home</Link>
                <Link to="/about" className="hover:text-gray-600">About</Link>
                <Link to="/services" className="hover:text-gray-600">Services</Link>
                <Link to="/register" className="hover:text-gray-600">Register</Link>
                <Link to="/login" className="hover:text-gray-600">Login</Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden text-white">
                <button className="text-gray-800 text-white text-2xl">
                    ☰
                </button>
            </div>
        </div>
    );
}

export default Navbar;
