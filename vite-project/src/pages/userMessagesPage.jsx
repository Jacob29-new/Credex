import { BigScreenNavbar } from "../components/userPageNavbars";
import { SmallScreenNavbar } from "../components/userPageNavbars";
import credex from "../assets/credex_white_bg.png";
import { useState, useEffect } from "react";
import getLinks from "../functions/messagePageFunctions/getLinks.js";
import getUserInfo from "../functions/getUserInfo.js";

function UserMessagesPage() {

    const [messages, setMessages] = useState(["dadawd", "dwad", "feafaefae", "dadawd", "dwad", "feafaefae", "dadawd", "dwad", "feafaefae", "dadawd", "dwad", "feafaefae"]);
    const [links, setLinks] = useState([])
    const [userInfo, setUserInfo] = useState([])

    useEffect(() => {
        const fetchLinks = async () => {
            const links = await getLinks();
            console.log("links: ", links);
            setLinks(links);
        };

        const fetchUserInfo = async () => {
            const info = await getUserInfo();
            console.log("userInfo: ", info);
            setUserInfo(info);
        };

        fetchUserInfo();
        fetchLinks();

    }, [])

    return (
        <div className="h-full w-full flex flex-row">
            <BigScreenNavbar />
            <SmallScreenNavbar />
            <div className="flex flex-col items-center h-full  w-full">
                <div className="w-full flex flex-row items-center justify-end p-5">
                    <img src={credex} className="h-7 w-7" alt="" />
                    <p className="uppercase text-black text-xl font-bold">credex</p>                    
                </div>
                <h1 className="text-4xl font-bold text-center">Messages</h1>

                


                <div className="w-8/10 h-full mt-10 flex flex-row overflow-y-scroll">
                    <div className="flex flex-col w-full lg:w-5/10  overflow-y-scroll">
                        <div className="w-full py-3 px-5 border-b border-gray-300">
                            <p className="font-semibold text-2xl">Messages</p>
                        </div>
                            {links.length === 0 ? <p className="font-semibold text-2xl">No Messages</p> : null}
                            {links.map((link) => (
                                <div className="flex  flex-row justify-start py-3 border-b border-gray-300 hover:bg-gray-100 cursor-pointer">
                                    <div className="h-full flex  items-center px-2">
                                        <div className="h-10 w-10 border border-black bg-gray-300 rounded-full text-2xl items-center flex justify-center"></div>
                                    </div> {/* profile picture */}
                                    <div className="flex flex-col space-y-2 ml-4">
                                        <p className="font-semibold">  {String(userInfo.id)  === link.user1 ? link.username2 : link.username1}</p>
                                        <p className="font-thin">chat about task</p>
                                        <p className="font-light"></p>
                                    </div>  {/* name, taskname, last message */}
                                    <div className="ml-auto mr-5">
                                        <p className="text-gray-600">15:43</p>
                                    </div>    {/* time */}
                            </div>
                            
                            ))}

                        </div>
                        <div className="flex-col w-full h-full hidden lg:flex shadow-2xl overflow-y-scroll">
                        { messages.length > 0 ? ( 
                            <>
                                <div className="w-full h-full flex flex-col items-center justify-center flex-col">
                                    <p className="text-xl font-ultralight">No Conversation selected</p>
                                    <p className="text-lg font-light">Choose a conversation from the list to start messaging</p>
                                </div>
                            </>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center">
                                <p className="text-2xl font-semibold">No Messages</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>

        </div>
    );
}

export default UserMessagesPage