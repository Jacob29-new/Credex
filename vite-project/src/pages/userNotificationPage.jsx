import { BigScreenNavbar } from "../components/userPageNavbars";
import { SmallScreenNavbar } from "../components/userPageNavbars";
import credex from "../assets/credex_white_bg.png";
import { useEffect, useState } from "react";
import { Bell, MessageSquare, Clock, AlertCircle, Search, MoreVertical, ChevronDown, CheckCircle, Trash2, Share } from 'lucide-react';
import getAllNotifications from "../functions/notificationPageFunctions/getAllNotifications.js"
import createNotification from "../functions/notificationPageFunctions/createNotification.js";
import readNotification from "../functions/notificationPageFunctions/readNotification.js";


function UserNotificationPage() {

    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        async function loadNotifications() {
            const newNotifications = await getAllNotifications()
            console.log("notifications: ", newNotifications  )
            setNotifications(newNotifications)
        }

        loadNotifications()
    }, [])

    function refreshNotifications() {
        getAllNotifications().then((newNotifications) => {
            console.log("notifications: ", newNotifications  )
            setNotifications(newNotifications)
        })
    }




    function getTimeAgo(timestamp) {
        const now = new Date();
        now.setHours(now.getHours() - 2);
        const time = new Date(timestamp).getTime();
        const timeDiff = now - time; 
    
        const seconds = Math.floor(timeDiff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
    
        if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
            return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
        }

        
    }

    



    return (
        <div className="h-full w-full flex flex-row">
            <BigScreenNavbar />
            <SmallScreenNavbar />
            <div className="flex flex-col items-center h-full w-full overflow-y-scroll">
                <div className="w-full flex flex-row items-center justify-end p-5">
                    <img src={credex} className="h-7 w-7" alt="" />
                    <p className="uppercase text-black text-xl font-bold">credex</p>                    
                </div>
                <h1 className="text-4xl font-bold text-center">Notifications</h1>
           
                


                <div className="w-8/10 mt-10 flex flex-col items-center">
                    {notifications.filter((notification) => notification.read === "false").reverse().map((notification) => (
                        <>
                        {notification.priority === "high" && (
                            <>
                                <div className="w-8/10 mt-5 bg-blue-10 p-5 border-2 border-black">
                                    <div className="bg-red-500 px-2 py-8">hi</div>
                                </div>
                            </>
                        )}
                        {notification.priority === "medium" && (
                             <>
                             <div className="w-8/10 mt-5 bg-blue-10 p-5  border-2 border-black">
                                 <div className="bg-red-500 px-2 py-8">hi</div>
                             </div>
                            </>
                        )}
                        {notification.priority === "low" && (
                             <>
                             <div className="w-8/10 mt-5 bg-blue-50 rounded-lg py-3  items-center flex">
                                 <div className="bg-green-500 h-8/10 w-1 rounded-full "></div>
                                 <div className="py-7 ml-5 px-2 rounded-2xl bg-blue-100">
                                    <MessageSquare size={22} color="black"></MessageSquare>
                                 </div>
                                 <div className="ml-5 flex flex-col">
                                    <p className="text-black font-bold text-lg">{notification.title}</p>
                                    <p className="text-black font-medium text-md">{notification.description}</p>
                                    <div className="flex flex-row text-sm">
                                        <p>{getTimeAgo(notification.time)} • {notification.category}</p>
                                    </div>
                                 </div>
                                 <div className="ml-auto mr-5">
                                    <button onClick={async () => { await readNotification({ id: notification.id }); await refreshNotifications() }}  className="group text-white font-bold py-2 px-4 rounded">
                                        <CheckCircle size={22} color="currentColor" className="text-black group-hover:text-green-500 transition-colors"/>
                                    </button>
                                 </div>
                             </div>
                            </>
                        )}
                        </>
                    ))}
                      

                </div>
            </div>

        </div>
    );
}

export default UserNotificationPage