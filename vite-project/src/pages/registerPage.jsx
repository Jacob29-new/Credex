import { useState } from "react";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import { FaGithub, FaGoogle, FaFacebook } from "react-icons/fa";
import registerImage from "../assets/registerImage.png"; 
import loadingImage from "../assets/loading.webp";
import { useEffect } from "react";
import register from "../functions/registerUser.js";
import checkIfValid from "../functions/checkIfValid.js";
import theme from "../assets/theme.png";
import { useNavigate } from "react-router-dom";


function RegisterPage() {

    const navigate = useNavigate();
    
    //inputs
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [loading, setLoading] = useState(false)
    const [loadingMsg, setLoadingMsg] = useState("")
    const loadingMessages = [
        "Please wait while we prepare everything for you...",
        "Your account is being set up...",
        "Almost done, just a few more steps...",
        "We’re creating your account, hang tight!",
        "Setting things up for you...",
        "This won't take long, just finishing up...",
        "We’re making sure everything is perfect for you...",
        "Your registration is in progress...",
        "Good things take time, we're almost there...",
        "Final touches on your profile, please wait...",
        "Hang in there, we’re setting up your account...",
        "Your profile is being created, just a moment...",
        "Almost there, just a few more steps to go...",
        "We're finalizing everything for you...",
        "Thank you for your patience, finishing registration..."
    ];
    

    //errors
    const [firstNameError, setFirstNameError] = useState("")
    const [lastNameError, setLastNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    //after submit
    const [success, setSuccess] = useState(null)
    const [message, setMessage] = useState("")
    


    async function registerUser(e) {
        e.preventDefault();

        //resets values
        setFirstNameError("")
        setLastNameError("")
        setEmailError("")
        setUsernameError("")
        setPasswordError("")
        setSuccess(null)
        setMessage("")

        const isValid = checkIfValid(firstName, lastName, username, email, password) 
        if(!isValid.result) {
            isValid.errors.forEach(error => {
                if(error.firstName) setFirstNameError(error.firstName)
                if(error.lastName) setLastNameError(error.lastName)
                if(error.username) setUsernameError(error.username)
                if(error.email) setEmailError(error.email)
                if(error.password) setPasswordError(error.password)
                
            });
            return
        } 

        setLoading(true)

        const result = await register(firstName, lastName, username, email, password);
        setLoading(false)
        if(result.success === true) {
            setSuccess(true)
            setTimeout(() => {
                navigate('/login')
            }, 1000);
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
            }, 5000);
        }

        return;
    }, [loading])



    return (
        <div className="min-h-screen w-full h-full">
            <Navbar />
            <div className="flex flex-col md:flex-row w-full h-full">

                {/* Right part*/}
                <div style={{ backgroundImage: `url(${theme})` }} className="hidden md:flex w-1/2 bg-[#fffbfb] items-center justify-center h-full">
                </div>

                {/* Left part - Register Form */}
                <div className={` w-full md:w-1/2 flex items-center justify-center py-8 overflow-y-auto`}>
                    <div className=" w-11/12 max-w-md px-6 py-8 rounded-lg shadow-md mx-4 mt-50">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-4">
                                <img src={loadingImage} alt="" />
                                <p className="mt-4 text-gray-600 font-medium">{loadingMsg}</p>
                            </div>
                        ) : ( 
                        <>
                        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 mt-2 md:mb-8 text-gray-800">Register</h2>

                        {/* Error and success messages */}
                        {success === false && (<div className="text-red-500 text-center my-2 text-l md:text-l">Registration failed. {message}</div>)}
                        {success === true && (<div className="text-green-500 text-center my-2 text-l md:text-l">Registration in successful.</div>)}

                        <form className="space-y-5 md:space-y-6" onSubmit={registerUser}>
                            {/* First Name  */}
                            <div>
                                <label className="block text-sm md:text-base font-medium text-gray-700 mb-1 md:mb-2">First Name</label>
                                <input type="text" placeholder="Enter your first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={`w-full p-1 md:p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base ${firstNameError !== "" ? "border-red-500" : ""}`} />
                                {firstNameError !== "" && (<div className="text-red-500 text-xs md:text-sm mt-1">{firstNameError}</div>)}
                            </div>

                            {/* Last Name */}
                            <div>
                                <label className="block text-sm md:text-base font-medium text-gray-700 mb-1 md:mb-2">Last Name</label>
                                <input type="text"  placeholder="Enter your last name" value={lastName} onChange={(e) => setLastName(e.target.value)} className={`w-full p-1 md:p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base ${lastNameError !== "" ? "border-red-500" : ""}`} />
                                {lastNameError !== "" && (<div className="text-red-500 text-xs md:text-sm mt-1">{lastNameError}</div>)}
                            </div>

                            {/* Username */}
                            <div>
                                <label className="block text-sm md:text-base font-medium text-gray-700 mb-1 md:mb-2">Username</label>
                                <input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} className={`w-full p-1 md:p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base ${usernameError !== "" ? "border-red-500" : ""}`} />
                                  {usernameError !== ""  && (<div className="text-red-500 text-xs md:text-sm mt-1">{usernameError}</div>)}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm md:text-base font-medium text-gray-700 mb-1 md:mb-2">Email</label>
                                <input type="text"  placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full p-1 md:p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base ${emailError !== "" ? "border-red-500" : ""}`} />
                                {emailError !== "" && (<div className="text-red-500 text-xs md:text-sm mt-1">{emailError}</div>)}
                            </div>

                             {/* Password */}
                             <div>
                                <label className="block text-sm md:text-base font-medium text-gray-700 mb-1 md:mb-2">Password</label>
                                <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className={`w-full p-1 md:p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base ${passwordError !== "" ? "border-red-500" : ""}`} />
                                {passwordError !== "" && (<div className="text-red-500 text-xs md:text-sm mt-1">{passwordError}</div>)}
                            </div>

                            {/* Register Button */}
                            <button type="submit" className="w-full py-2 md:py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm md:text-base active:bg-blue-700 font-medium transition-colors duration-200">
                                Register
                            </button>
                        </form>

                        {/* Register Link */}
                        <div className="text-center mt-4 md:mt-6">
                            <Link to="/login" className="text-sm md:text-base text-gray-600 flex flex-row justify-center">
                                <div>Already have an account?</div>
                                <div className="text-blue-500 hover:underline ml-1">Sign in</div>
                            </Link>
                        </div>

                        {/* Or Register with Text */}
                        <div className="flex items-center my-4 md:my-6">
                            <div className="flex-grow h-px bg-gray-200"></div>
                            <span className="px-3 md:px-4 text-xs md:text-sm text-gray-500">Or register with</span>
                            <div className="flex-grow h-px bg-gray-200"></div>
                        </div>

                        {/* Social Media Register buttons */}
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

            </div>
        </div>
    );

}

export default RegisterPage;