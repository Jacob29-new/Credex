import { useState, useEffect } from "react";
import openedNavbar from "../assets/sidebar_open.svg";
import closedNavbar from "../assets/sidebar_closed.svg";
import home from "../assets/home.svg";
import tasks from "../assets/tasks.svg";
import credits from "../assets/credits.svg";
import chat from "../assets/chat.svg";
import settings from "../assets/settings.svg";
import notifications from "../assets/notifications.svg";
import arrowDown from "../assets/arrow_down.svg";
import profile from "../assets/profile.svg";
import logout from "../assets/logout.svg";
import logoutFunction from "../functions/logout.js";
import getInfo from "../functions/getInfoFromJWT.js";
import arrowUp from "../assets/arrow_up.svg";
import { useNavigate } from "react-router-dom";
function BigScreenNavbar() {

    const [isOpen, setIsOpen] = useState(true);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userFirstName = await getInfo("username"); 
            setUser(userFirstName); 
        };
        fetchUserInfo(); 
    }, []);

    const navigate = useNavigate();

    return (
        <>
            <div className={`relative hidden xl:flex lg:flex md:flex flex-col h-full left-0 top-0 bg-[hsl(30,3.33%,11.76%)] items-center transition-all duration-300 ${isOpen && location.pathname === "/user/home" ? "w-77" : ""}  ${isOpen ? "w-64" : "w-12 flex flex-col items-center"} shadow-right-4xl`}>
                <div className="items-center flex h-10 w-9/10 mt-3">
                    <img onClick={() => { setIsOpen(prevState => {const newState = !prevState; if (!newState) {setIsPopupVisible(false); }return newState;});}} src={closedNavbar} className={`absolute w-6 h-6 m-2 transition-all duration-200  ${isOpen ? "opacity-0" : "opacity-100"}`} />
                    <img onClick={() => { setIsOpen(prevState => {const newState = !prevState; if (!newState) {setIsPopupVisible(false); }return newState;});}} src={openedNavbar} className={`absolute w-6 h-6 m-2 transition-all duration-200  ${isOpen ? "opacity-100" : "opacity-0"}`} />
                    
                </div>
                <div onClick={() => {navigate("/user/home") ;}} className={`cursor-pointer items-center flex flex-row h-10 w-9/10 mt-10 transition-all duration-100 rounded-xl hover:bg-black ${window.location.pathname === "/user/home" ? "bg-gray-700 hover:bg-gray-700" : ""}`}>
                    <img src={home} className={` w-6 h-6 m-2 transition-all duration-200`} />
                    <p className={`text-sm font-medium text-gray-200 tracking-wide transition-all duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`}>Home</p>
                </div>
                <div onClick={() => {navigate("/user/tasks") ;}} className={`cursor-pointer items-center flex flex-row h-10 w-9/10 mt-2 transition-all duration-100 rounded-xl hover:bg-black ${window.location.pathname === "/user/tasks" ? "bg-gray-700 hover:bg-gray-700" : ""}`}>
                    <img src={tasks} className={` w-6 h-6 m-2 transition-all duration-200`} />
                    <p className={`text-sm font-medium text-gray-200 tracking-wide transition-all duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`}>Tasks</p>
                </div>
                <div onClick={() => {navigate("/user/credits") ;}} className={`cursor-pointer items-center flex flex-row h-10 w-9/10 mt-2 transition-all duration-100 rounded-xl hover:bg-black ${window.location.pathname === "/user/credits" ? "bg-gray-700 hover:bg-gray-700" : ""}`}>
                    <img src={credits} className={` w-6 h-6 m-2 transition-all duration-200`} />
                    <p className={`text-sm font-medium text-gray-200 tracking-wide transition-all duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`}>Credits</p>
                </div>
                <div onClick={() => {navigate("/user/messages") ;}} className={`cursor-pointer items-center flex flex-row h-10 w-9/10 mt-2 transition-all duration-100 rounded-xl hover:bg-black ${window.location.pathname === "/user/messages" ? "bg-gray-700 hover:bg-gray-700" : ""}`}>
                    <img src={chat} className={` w-6 h-6 m-2 transition-all duration-200`} />
                    <p className={`text-sm font-medium text-gray-200 tracking-wide transition-all duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`}>Messages</p>
                </div>
                <div onClick={() => {navigate("/user/notifications") ;}} className={`cursor-pointer items-center relative flex flex-row h-10 w-9/10 mt-2 transition-all duration-100 rounded-xl hover:bg-black ${window.location.pathname === "/user/notifications" ? "bg-gray-700 hover:bg-gray-700" : ""}`}>
                    <img src={notifications} className={` w-6 h-6 m-2 transition-all duration-200`} />
                    <p className={`text-sm font-medium text-gray-200 tracking-wide transition-all duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`}>Notifications</p>
                    {/* <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">1</div> */}
                </div>
                <div onClick={() => {navigate("/user/settings") ;}} className={`cursor-pointer items-center flex flex-row h-10 w-9/10 mt-2 transition-all duration-100 rounded-xl hover:bg-black ${window.location.pathname === "/user/settings" ? "bg-gray-700 hover:bg-gray-700" : ""}`}>
                    <img src={settings} className={` w-6 h-6 m-2 transition-all duration-200`} />
                    <p className={`text-sm font-medium text-gray-200 tracking-wide transition-all duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`}>Settings</p>
                </div>
                
                <div className={`absolute flex flex-row items-center ml-2 h-15 w-full bottom-0 transition-all duration-300 hover:cursor-pointer`}>
                    <div className="items-center flex flex-row h-10 w-9/10 transition-all duration-100 rounded-xl hover:bg-black" onClick={() => setIsPopupVisible(!isPopupVisible)}>
                        <img src={profile} className={` w-6 h-6 m-2 transition-all duration-200`} />
                        <div className="flex flex-col ml-2">
                            <p className={`text-sm font-medium text-gray-400 tracking-wide transition-all duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`}>{user}</p>
                            <p className={`text-sm font-medium text-gray-500 tracking-wide transition-all duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`}>user</p>
                        </div>
                        <img src={isPopupVisible ? arrowDown : arrowUp} className={`select-none ml-auto mr-2 w-6 h-6 transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`}/>
                       
                    </div>
                </div>

                <div className={`absolute bottom-16 left-0 w-54 bg-gray-800 text-white rounded-lg shadow-lg z-50 p-4  ${isOpen && isPopupVisible? "opacity-100" : "opacity-0"}`}>

                    <p className="text-sm font-medium">Profile Options</p>
                    <div className="items-center flex flex-row h-10 w-9/10 mt-2 transition-all duration-100 rounded-xl hover:bg-red-600" onClick={() => logoutFunction()}>
                        <p className={`ml-2 cursor-pointer text-sm font-medium text-gray-200 tracking-wide transition-all duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`}>logout</p>
                        <img src={logout} className={` w-6 h-6 m-2 transition-all duration-200 hover:opacity-50`} />
                    </div>

                </div>
                
            </div>
        </>
    );
    
}

function SmallScreenNavbar() {
    const navigate = useNavigate();
    return (
        <div className="flex xl:hidden lg:hidden md:hidden w-full fixed bottom-0 bg-[hsl(30,3.33%,11.76%)] h-13 items-center justify-center">
            <div onClick={() => {navigate("/user/home") ;}} className={`flex items-center justify-center h-10 w-10 hover:cursor-pointer hover:bg-black rounded-full mr-5 ${window.location.pathname === "/user/home" ? "bg-gray-700 hover:bg-gray-700" : ""}`}>
                <img src={home} className="h-7 w-7 " />
            </div>
            <div onClick={() => {navigate("/user/tasks") ;}} className={`flex items-center justify-center h-10 w-10 hover:cursor-pointer hover:bg-black rounded-full mr-5 ${window.location.pathname === "/user/tasks" ? "bg-gray-700 hover:bg-gray-700" : ""}`}>
                <img src={tasks} className="h-7 w-7  " />
            </div>
            <div onClick={() => {navigate("/user/credits") ;}} className={`flex items-center justify-center h-10 w-10 hover:cursor-pointer hover:bg-black rounded-full mr-5 ${window.location.pathname === "/user/credits" ? "bg-gray-700 hover:bg-gray-700" : ""}`}>
                <img src={credits} className="h-7 w-7  " />
            </div>
            <div onClick={() => {navigate("/user/messages") ;}} className={`flex items-center justify-center h-10 w-10 hover:cursor-pointer hover:bg-black rounded-full mr-5 ${window.location.pathname === "/user/messages" ? "bg-gray-700 hover:bg-gray-700" : ""}`}>
                <img src={chat} className="h-7 w-7  " />
            </div>
            <div onClick={() => {navigate("/user/notifications") ;}} className={`flex relative items-center justify-center h-10 w-10 hover:cursor-pointer hover:bg-black rounded-full mr-5 ${window.location.pathname === "/user/notifications" ? "bg-gray-700 hover:bg-gray-700" : ""}`}>
                <img src={notifications} className="h-7 w-7  " />
                {/* <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">1</div> */}
            </div>
            <div onClick={() => {navigate("/user/settings") ;}} className={`flex items-center justify-center h-10 w-10 hover:cursor-pointer hover:bg-black rounded-full mr-5 ${window.location.pathname === "/user/settings" ? "bg-gray-700 hover:bg-gray-700" : ""}`}>
                <img src={settings} className="h-7 w-7  " />
            </div>
            
        </div>
    );
}

export { BigScreenNavbar, SmallScreenNavbar };
