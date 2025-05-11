import { BigScreenNavbar } from "../components/userPageNavbars";
import { SmallScreenNavbar } from "../components/userPageNavbars";
import credex from "../assets/credex_white_bg.png";
import { useState, useEffect, useRef } from "react";
import getLinks from "../functions/messagePageFunctions/getLinks.js";
import getUserInfo from "../functions/getUserInfo.js";
import { Divide, Send, ArrowLeft} from 'lucide-react';
import sendMessage from "../functions/messagePageFunctions/sendMessage.js";
import getAllMessages from "../functions/messagePageFunctions/getAllMessages.js"

function UserMessagesPage() {

    const [messages, setMessages] = useState(["dadawd", "dwad", "feafaefae", "dadawd", "dwad", "feafaefae", "dadawd", "dwad", "feafaefae", "dadawd", "dwad", "feafaefae"]);
    const [links, setLinks] = useState([])
    const [userInfo, setUserInfo] = useState([])
    const [currentChat, setCurrentChat] = useState(0)
    const [messageInput, setMessageInput] = useState("")
    const [chat, setChat] = useState([])

    const bottomRef = useRef(null);

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

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [chat]);

    async function sendMessageFunction() {
        await sendMessage({ chat_id: currentChat, message: messageInput });
    }

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
                {currentChat !== 0 ? (
                    <div className="w-8/10">
                        <button onClick={() => setCurrentChat(0)} className="p-2 rounded hover:bg-gray-200">
                            <ArrowLeft size={24} />
                        </button>
                    </div>
                ): null}
              
              


                <div className="w-8/10 h-full mt-10 flex flex-row overflow-y-scroll">
                <div className={`flex flex-col w-full lg:w-5/10 overflow-y-scroll ${currentChat !== 0 ? "hidden" : ""}`}>
                        <div className="w-full py-3 px-5 border-b border-gray-300">
                            <p className="font-semibold text-2xl">Messages</p>
                        </div>
                            {links.length === 0 ? <p className="font-semibold text-2xl">No Messages</p> : null}
                            {links.map((link) => (
                                <div  onClick={ async () => { setCurrentChat(link.id); const messages = await getAllMessages({ chatId: link.id });; setChat(messages); console.log("chat",chat)}} className={`flex flex-row justify-start py-3 border-b border-gray-300 hover:bg-gray-100 cursor-pointer ${currentChat === link.id ? "bg-gray-200 hover:bg-gray-200" : ""}`}>
                                    <div className="h-full flex  items-center px-2">
                                        <div className="h-10 w-10 border border-black bg-gray-300 rounded-full text-2xl items-center flex justify-center"></div>
                                    </div> {/* profile picture */}
                                    <div className="flex flex-col space-y-2 ml-4">
                                        <p className="font-semibold">  {String(userInfo.id)  === link.user1 ? link.username2 : link.username1}</p>
                                        <p className="font-thin">  {link.lastMessage ? link.lastMessage.length > 7 ? link.lastMessage.slice(0, 7) + "..." : link.lastMessage: ""}</p>
                                    </div>  {/* name, taskname, last message */}
                                    <div className="ml-auto mr-5">
                                        <p className="text-gray-600">{link.lastMessageTime ? link.lastMessageTime.split(" ")[1].slice(0, 5) : ""}</p>
                                    </div>    {/* time */}
                            </div>
                            
                            ))}

                        </div>
                        <div className={`flex-col w-full h-full shadow-2xl ${currentChat === 0 ? "hidden" : "flex" } lg:flex`}>
                        { currentChat ===  0 ? ( 
                            <>
                                <div className="w-full h-full flex flex-col items-center justify-center flex-col">
                                    <p className="text-xl font-ultralight">No Conversation selected</p>
                                    <p className="text-lg font-light">Choose a conversation from the list to start messaging</p>
                                </div>
                            </>
                        ) : (
                            <>
                           
                          
                            <div className="h-full flex flex-col relative">
                            <div className="h-full flex flex-col overflow-y-scroll bg-blue-100 p-3 space-y-2">
                                
                                {chat.length === 0 ? (
                                    <p className="text-gray-400">No messages yet.</p>
                                ) : (
                                    chat.map((msg) => (
                                    <div className={`w-full flex ${msg.sender_id === userInfo.id ? " justify-end" : ""}`}>
                                        <div  className={` py-3 px-2 max-w-2/3 flex flex-col ${msg.sender_id === userInfo.id ? " bg-blue-400 rounded-t-2xl rounded-bl-2xl text-end" : "bg-white rounded-t-2xl rounded-br-2xl"} `}>
                                            <span className="ml-2 font-semi-bold break-all">{msg.message}</span>
                                            <span className="ml-2 font-thin">{msg.created_at ? new Date(msg.created_at.replace(" ", "T")).toTimeString().slice(0, 5): ""}</span>
                                        </div>
                                    </div>
                                    
                                    ))
                                )}
                                <div ref={bottomRef}></div>
                            
                            </div>
                               <div className="items-center space-x-5 border-t flex border-black w-full p-5 sticky bottom-0 left-0">
                                    <input value={messageInput} onChange={e => setMessageInput(e.target.value)} onKeyDown={async (e) => { if (e.key === "Enter" && messageInput.trim() !== "") { await sendMessageFunction(); setMessageInput(""); const messages = await getAllMessages({ chatId: currentChat }); setChat(messages);}}} placeholder="Type a message..." className="py-1 px-2 w-8/10 ml-8 border border-gray-400 rounded-2xl" type="text" />
                                    <div  onClick={ async () => { sendMessageFunction(); const messages = await getAllMessages({ chatId: currentChat }); setChat(messages); setMessageInput("");} } className="w-8 h-8 flex items-center justify-center bg-blue-500 hover:bg-blue-400   rounded-full">
                                    <Send size={18} color="white" />
                                    </div>
                               </div>
                            </div>
                            </>
                        )}
                    </div>

                </div>
            </div>

        </div>
    );
}

export default UserMessagesPage