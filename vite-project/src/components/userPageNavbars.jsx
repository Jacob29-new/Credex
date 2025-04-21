import { useState } from "react";
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
function BigScreenNavbar() {

    const [isOpen, setIsOpen] = useState(true);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    return (
        <>
            <div className={`relative hidden xl:flex lg:flex md:flex flex-col h-full left-0 top-0 bg-[hsl(30,3.33%,11.76%)] items-center transition-all duration-300  ${isOpen ? "w-64" : "w-12 flex flex-col items-center"}`}>
                <div className="items-center flex h-10 w-9/10 mt-3">
                    <img onClick={() => { setIsOpen(prevState => {const newState = !prevState; if (!newState) {setIsPopupVisible(false); }return newState;});}}    src={closedNavbar} className={`absolute w-6 h-6 m-2 transition-all duration-200  ${isOpen ? "opacity-0" : "opacity-100"}`} />
                    <img onClick={() => { setIsOpen(prevState => {const newState = !prevState; if (!newState) {setIsPopupVisible(false); }return newState;});}} src={openedNavbar} className={`absolute w-6 h-6 m-2 transition-all duration-200  ${isOpen ? "opacity-100" : "opacity-0"}`} />
                </div>
                <div className="items-center flex flex-row h-10 w-9/10 mt-10 transition-all duration-100 rounded-xl hover:bg-black">
                    <img src={home} className={` w-6 h-6 m-2 transition-all duration-200`} />
                    <p className={`text-sm font-medium text-gray-200 tracking-wide transition-all duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`}>Home</p>
                </div>
                <div className="items-center flex flex-row h-10 w-9/10 mt-2 transition-all duration-100 rounded-xl hover:bg-black">
                    <img src={tasks} className={` w-6 h-6 m-2 transition-all duration-200`} />
                    <p className={`text-sm font-medium text-gray-200 tracking-wide transition-all duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`}>Tasks</p>
                </div>
                <div className="items-center flex flex-row h-10 w-9/10  mt-2 transition-all duration-100 rounded-xl hover:bg-black">
                    <img src={credits} className={` w-6 h-6 m-2 transition-all duration-200`} />
                    <p className={`text-sm font-medium text-gray-200 tracking-wide transition-all duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`}>Credits</p>
                </div>
                <div className="items-center flex flex-row h-10 w-9/10 mt-2 transition-all duration-100 rounded-xl hover:bg-black">
                    <img src={chat} className={` w-6 h-6 m-2 transition-all duration-200`} />
                    <p className={`text-sm font-medium text-gray-200 tracking-wide transition-all duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`}>Messages</p>
                </div>
                <div className="items-center flex flex-row h-10 w-9/10 mt-2 transition-all duration-100 rounded-xl hover:bg-black">
                    <img src={notifications} className={` w-6 h-6 m-2 transition-all duration-200`} />
                    <p className={`text-sm font-medium text-gray-200 tracking-wide transition-all duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`}>Notifications</p>
                </div>
                <div className="items-center flex flex-row h-10 w-9/10 mt-2 transition-all duration-100 rounded-xl hover:bg-black">
                    <img src={settings} className={` w-6 h-6 m-2 transition-all duration-200`} />
                    <p className={`text-sm font-medium text-gray-200 tracking-wide transition-all duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`}>Settings</p>
                </div>
                
                <div className={`absolute flex flex-row items-center ml-2 h-15 w-full bottom-0 transition-all duration-300 hover:cursor-pointer`}>
                    <div className="items-center flex flex-row h-10 w-9/10 transition-all duration-100 rounded-xl hover:bg-black" onClick={() => setIsPopupVisible(!isPopupVisible)}>
                        <img src={profile} className={` w-6 h-6 m-2 transition-all duration-200`} />
                        <div className="flex flex-col ml-2">
                            <p className={`text-sm font-medium text-gray-400 tracking-wide transition-all duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`}>Jacob</p>
                            <p className={`text-sm font-medium text-gray-500 tracking-wide transition-all duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`}>user</p>
                        </div>
                        <img src={arrowDown} className={`ml-auto mr-2 w-6 h-6 ${isOpen ? "opacity-100" : "opacity-0"}`} alt="" />
                       
                    </div>
                </div>

                <div className={`absolute bottom-16 left-0 w-64 bg-gray-800 text-white rounded-lg shadow-lg z-50 p-4  ${isOpen && isPopupVisible? "opacity-100" : "opacity-0"}`}>

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
    return (
        <div className="flex xl:hidden lg:hidden md:hidden w-full fixed bottom-0 bg-[hsl(30,3.33%,11.76%)] h-13 items-center justify-center">
            <img src={home} className="h-7 w-7 mr-8 hover:cursor-pointer hover:bg-black hover:rounded-full" />
            <img src={tasks} className="h-7 w-7 mr-8 hover:cursor-pointer hover:bg-black hover:rounded-full" />
            <img src={credits} className="h-7 w-7 mr-8 hover:cursor-pointer hover:bg-black hover:rounded-full" />
            <img src={chat} className="h-7 w-7 mr-8 hover:cursor-pointer hover:bg-black hover:rounded-full" />
            <img src={notifications} className="h-7 w-7 mr-8 hover:cursor-pointer hover:bg-black hover:rounded-full" />
            <img src={settings} className="h-7 w-7 mr-8 hover:cursor-pointer hover:bg-black hover:rounded-full" />
            
        </div>
    );
}

export { BigScreenNavbar, SmallScreenNavbar };
