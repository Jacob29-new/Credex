import Navbar from "../components/navbar.jsx";
import Image1 from "../assets/404.avif";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

function ErrorPage() {
    return (
        <div className="h-full w-full bg-green-100 flex flex-col">

          <Navbar />

          {/* Container of sides */}
          <div className="flex flex-col sm:flex-row h-full">

            {/* Left side of the page */}
            <div className="w-full sm:w-1/2 h-full bg-black flex items-center justify-center text-center min-h-[420px]">
                <div className="flex flex-col justify-between h-1/3 ">
                    <h1 className="text-6xl font-bold text-white">404 - Error</h1>
                    <h2 className="uppercase text-white">Page not found</h2>
                    <h2 className="text-gray-200">You have ventured beyond the known web</h2>
                    <Link to="/" className="mt-4 px-6 py-2 bg-black text-white rounded-2xl text-white border-2 border-blue-500 hover:bg-indigo-400">
                        Back home
                    </Link>
                </div>
            </div>

            {/* Right side of the page */}
            <div className="w-full sm:w-1/2 h-full flex items-center justify-center bg-white">
                    <img src={Image1} className="max-w-full max-h-full object-contain" />
                </div>
          </div>
        </div>
    );
}

export default ErrorPage;
