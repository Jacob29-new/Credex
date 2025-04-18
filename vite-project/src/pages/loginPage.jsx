import { useState, useEffect } from "react";
import loadingImage from "../assets/loading.webp";
import Navbar from "../components/navbar";
import { Link, useNavigate } from "react-router-dom";
import { FaGithub, FaGoogle, FaFacebook } from "react-icons/fa";
import loginImage from "../assets/login.png"; 
import login from "../functions/loginUser.js";
import theme from "../assets/theme2.png"; 

function LoginPage() {

    const navigate = useNavigate(); 

    const [usermail, setUsermail] = useState("")
    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const [message, setMessage] = useState("")

    const [loading, setLoading] = useState(false)
    const [loadingMsg, setLoadingMsg] = useState("")
    const loadingMessages = [
        "Please wait while we log you in...",
        "Checking your credentials, just a moment...",
        "Logging you in, hang tight...",
        "We’re verifying your account, one second...",
        "Almost there, just confirming your login...",
        "Getting everything ready for you, please wait...",
        "We’re almost done, verifying your login...",
        "Please hold on, logging you in...",
        "Just a moment, we’re confirming your details...",
        "Hang tight, preparing your account...",
        "Verifying your login, just a second...",
        "We’re processing your login, thank you for your patience...",
        "Your login is in progress, please wait...",
        "Confirming your account, one last check...",
        "Almost done, finalizing your login...",
    ];

    //error states
    const [usermailError, setUsermailError] = useState("")
    const [passwordError, setPasswordError] = useState("")


    async function loginUser(e) {
        e.preventDefault();

        //resets states
        setSuccess(null);
        setMessage("")
        setError(null)
        setUsermailError("")
        setPasswordError("")

        //checks if fields are empty
        if(usermail === "") {
            setUsermailError("Field cannot be empty");
            if(password === "") {
                setPasswordError("Field cannot be empty");
            }
            return
        }
        if(password === "") {
            setPasswordError("Field cannot be empty");
            if(usermail === "") {
                setUsermailError("Field cannot be empty");
            }
            return
        }

        //verificiation functionality
        setLoading(true)
        const result = await login(usermail, password);
        setLoading(false)
        if(result.success === true) { 
            setSuccess(true)
            navigate("/user")
        } else {
            setSuccess(false)
            setMessage(result.message)
        }
        
    }

    useEffect(() => {
        if (!loading) {
            setLoadingMsg("")
            return;
        } else {
            let i = 0;
            setInterval(() => {
                if (i === loadingMessages.length + 1) {
                    i = 0
                }
                setLoadingMsg(loadingMessages[i]);
                i = (i + 1)
            }, 4000);
        }

        return;
    }, [loading])



    return (
        <div className="min-h-screen w-full h-full">
            <Navbar />
            <div className="flex flex-col md:flex-row w-full h-full">
                {/* Left part - Login Form */}
                <div className="w-full md:w-1/2 flex items-center justify-center py-8">
                    <div className="w-11/12 max-w-md px-6 py-8 bg-white rounded-lg shadow-md mx-4">

                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-4">
                                <img src={loadingImage} alt="" />
                                <p className="mt-4 text-gray-600 font-medium">{loadingMsg}</p>
                            </div>
                        ) : ( 
                        <>
                        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-gray-800">Login</h2>

                        {/* Error and success messages */}
                        {success === false && (<div className="text-red-500 text-center my-2 text-xs md:text-sm">Signing in failed. {message}</div>)}
                        {success === true && (<div className="text-green-500 text-center my-2 text-xs md:text-sm">Signing in successful.</div>)}
                        
                        <form className="space-y-5 md:space-y-6">
                            {/* Email or Username */}
                            <div>
                                <label className="block text-sm md:text-base font-medium text-gray-700 mb-1 md:mb-2">Email or Username</label>
                                <input type="text"  placeholder="Enter your email or username" value={usermail} onChange={(e) => setUsermail(e.target.value)} className={`w-full p-2 md:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base ${usermailError !== "" ? "border-red-500" : ""}`} />
                               {usermailError !== "" && (<div className="text-red-500 text-xs md:text-sm mt-1">{usermailError}</div>)} 
                            </div>


                            {/* Password */}
                            <div>   
                                <label className="block text-sm md:text-base font-medium text-gray-700 mb-1 md:mb-2">Password</label>
                                <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className={`w-full p-2 md:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base ${passwordError !== "" ? "border-red-500" : ""}`} />
                                {passwordError !== "" && (<div className="text-red-500 text-xs md:text-sm mt-1">{passwordError}</div>)}
                            </div>

                            {/* Login Button */}
                            <button onClick={loginUser} className="w-full py-2 md:py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm md:text-base font-medium transition-colors duration-200">Login</button>
                        </form>

                        {/* Register Link */}
                        <div className="text-center mt-4 md:mt-6">
                            <Link to="/register" className="text-sm md:text-base text-gray-600 flex flex-row justify-center">
                                <div>Don't have an account?</div>
                                <div className="text-blue-500 hover:underline ml-1">Register for free</div>
                            </Link>
                        </div>

                        {/* Or Login with Text */}
                        <div className="flex items-center my-4 md:my-6">
                            <div className="flex-grow h-px bg-gray-200"></div>
                            <span className="px-3 md:px-4 text-xs md:text-sm text-gray-500">Or login with</span>
                            <div className="flex-grow h-px bg-gray-200"></div>
                        </div>

                        {/* Social Media Login buttons */}
                        <div className="flex justify-center gap-4 md:gap-6 mt-4 md:mt-6">
                            <button className="w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center hover:bg-gray-100 border border-gray-200 transition-colors duration-200">
                                <FaGithub className="w-5 h-5 md:w-6 md:h-6" />
                            </button>
                            <button className="w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center hover:bg-gray-100 border border-gray-200 transition-colors duration-200">
                                <FaGoogle className="w-5 h-5 md:w-6 md:h-6" />
                            </button>
                            <button className="w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center hover:bg-gray-100 border border-gray-200 transition-colors duration-200">
                                <FaFacebook className="w-5 h-5 md:w-6 md:h-6" />
                            </button>
                        </div>
                        </>
                        )}
                    </div>
                    
                </div>
                

                {/* Right part*/}
                <div style={{ backgroundImage: `url(${theme})` }} className="hidden md:flex w-1/2 bg-[#fffbfb] items-center justify-center h-full">
                </div>

            </div>
        </div>
    );

}

export default LoginPage;