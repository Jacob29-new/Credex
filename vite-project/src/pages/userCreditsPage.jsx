import { BigScreenNavbar } from "../components/userPageNavbars";
import { SmallScreenNavbar } from "../components/userPageNavbars";
import credex from "../assets/credex_white_bg.png";
import { Wallet, CreditCard, History, ArrowUpRight, ArrowDownLeft, TrendingUp, Gift, Plus, Info, ArrowDown  } from "lucide-react"
import getUserInfo from "../functions/getUserInfo";
import { useState, useEffect } from "react";
import getCurrentTasks from "../functions/getCurrentTasks.js"
import getMyTodoTasks from "../functions/getMyTodoTasks.js"
function UserCreditsPage() {

    const [credits, setCredits] = useState(0);
    const [creditsSpent, setCreditsSpent] = useState(0);
    const [creditsEarned, setCreditsEarned] = useState(0);
    const [myCreatedTasks, setMyCreatedTasks] = useState([]);
    const [assignedTasks, setAssignedTasks] = useState([]);
    const [showAllTransactions, setShowAllTransactions] = useState(false);

    useEffect(() => {

        //gets info about user
        const fetchUserInfo = async () => {
            const user = await getUserInfo();
            console.log(user);
            setCredits(user.credits);
            setCreditsSpent(user.creditsSpent);
            setCreditsEarned(user.creditsEarned);
        };

        //gets tasks that user created
        async function loadMyCreatedTasks() {
            const tasks = await getCurrentTasks();
            const filteredTasks = tasks.filter(task => task.status === "completed-2")
            setMyCreatedTasks(filteredTasks)
            console.log("These are tasks i created: ", filteredTasks);
        }

        //gets tasks that were assigned to user
        async function loadMyAssignedTasks() {
            const tasks = await getMyTodoTasks()
            const filteredTasks = tasks.filter(task => task.status === "completed-2")
            setAssignedTasks(filteredTasks)
            console.log("Tasks assigned to me that are completed: ", filteredTasks)
        }

        loadMyCreatedTasks()
        loadMyAssignedTasks()
        fetchUserInfo();


    }, []);


    return (
        <div className="h-full w-full flex flex-row">
            <BigScreenNavbar />
            <SmallScreenNavbar />
            <div className="flex flex-col items-center h-full  w-full overflow-y-scroll">
                <div className="w-full flex flex-row items-center justify-end p-5">
                    <img src={credex} className="h-7 w-7" alt="" />
                    <p className="uppercase text-black text-xl font-bold">credex</p>                    
                </div>
                <h1 className="text-4xl font-bold text-center">Credits</h1>

                {/* card with user balance */}
                <div className="p-5 w-8/10 mt-10 bg-blue-500 space-y-4 rounded-2xl px-10 shadow-2xl">
                    <div className="flex flex-row space-x-2 items-center ">
                        <Wallet size={20} color="white"></Wallet>
                        <p className="font-bold text-xl text-white">Current balance</p>
                    </div>
                    
                    <p className="font-bold text-4xl text-white">{credits}</p>
                    <p className=" text-lg text-white">Available credits</p>                
                </div>

                {/* card with user credits earned */}
                <div className="p-5 w-8/10 mt-10 space-y-4 rounded-2xl px-10 shadow-2xl border border-gray-300">
                    <div className="flex flex-row space-x-2 items-center ">
                        <ArrowUpRight size={28} color="green"></ArrowUpRight>
                        <p className="font-bold text-xl">Earned</p>
                    </div>
                    
                    <p className="font-bold text-4xl">{creditsEarned}</p>
                    <p className=" text-lg ">Total credits earned</p>                
                </div>

                  {/* card with user credits spent */}
                  <div className="p-5 w-8/10 mt-10 space-y-4 rounded-2xl px-10 shadow-2xl border border-gray-300">
                    <div className="flex flex-row space-x-2 items-center ">
                        <ArrowDownLeft size={28} color="red"></ArrowDownLeft>
                        <p className="font-bold text-xl">Spent</p>
                    </div>
                    
                    <p className="font-bold text-4xl">{creditsSpent}</p>
                    <p className=" text-lg ">Total credits spent</p>                
                </div>

                  {/* transaction history card */}
                  <div className="flex flex-col w-8/10 mt-10 border border-gray-300 rounded-2xl shadow-2xl">
                    <div className="border-b space-x-3 border-gray-300 bg-gray-50 rounded-t-2xl font-bold text-xl   p-5 flex items-center w-full">
                        <History size={24} color="black"></History>
                        <p>Transaction History</p>
                    </div>

                    {showAllTransactions && (
                        <div className="p-5 flex flex-col space-y-5">
                                {/*  credits spent */}
                              {myCreatedTasks.map((task) => (
                                  <div className="flex flex-row space-x-2 items-center  space-x-12">
                                      <div className="rounded-full bg-gray-100 p-2">
                                          <ArrowDownLeft size={25} color="red"></ArrowDownLeft>
                                      </div>
                                     
                                      <p className="font-medium  text-lg">{task.title}</p>
                                      <p className="ml-auto font-medium text-xl text-red-500">- {task.credits_offered}</p>
                                  </div>
                              ))}
      
                            {/*   credits earned */}
                              {assignedTasks.map((task) => (
                                  <div className="flex flex-row space-x-2 items-center  space-x-12">
                                  <div className="rounded-full bg-gray-100 p-2">
                                      <ArrowUpRight size={25} color="green"></ArrowUpRight>
                                  </div>
                                 
                                  <p className="font-medium  text-lg">{task.title}</p>
                                  <p className="ml-auto font-medium text-xl text-green-500">+ {task.credits_offered}</p>
                              </div>
                              ))}
                          </div>
                    )}

                        {/* only shows 3 transactions in the beginning */}
                        {myCreatedTasks.length + assignedTasks.length > 3 && !showAllTransactions ? (
                        <>
                            <div className="p-5 flex flex-col space-y-5">
                                {myCreatedTasks.slice(0, 1).map((task) => (
                                    <div className="flex flex-row space-x-2 items-center  space-x-12">
                                        <div className="rounded-full bg-gray-100 p-2">
                                            <ArrowDownLeft size={25} color="red"></ArrowDownLeft>
                                        </div>
                                        <p className="font-medium  text-lg">{task.title}</p>
                                        <p className="ml-auto font-medium text-xl text-red-500">- {task.credits_offered}</p>
                                    </div>
                                ))}
                                {assignedTasks.slice(0, 1).map((task) => (
                                    <div className="flex flex-row space-x-2 items-center  space-x-12">
                                        <div className="rounded-full bg-gray-100 p-2">
                                            <ArrowUpRight size={25} color="green"></ArrowUpRight>
                                        </div>
                                        <p className="font-medium  text-lg">{task.title}</p>
                                        <p className="ml-auto font-medium text-xl text-green-500">+ {task.credits_offered}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-center items-center  border-t border-gray-300 py-5">
                                <p onClick={() => setShowAllTransactions(!showAllTransactions)} className="hover:underline cursor-pointer">{showAllTransactions ? "Show less" : "Show more"}</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex justify-center items-center  border-t border-gray-300 py-5">
                                <p onClick={() => setShowAllTransactions(!showAllTransactions)} className="hover:underline cursor-pointer">{showAllTransactions ? "Show less" : "Show more"}</p>
                            </div>
                        </>
                    )}
                  
              
                </div>

                {/* card with general info */}
                <div className="p-5 w-8/10 mt-15 shadow-2xl  space-x-4 rounded-xl bg-blue-50 border border-blue-200 px-5 flex flex-row">
                    <div className="flex justify-center pt-1">
                        <Info size={20} color="blue"></Info>
                    </div>
                    <div className="flex flex-col justify-start">
                        <p className="font-medium text-blue-800 mb-1">How Credits Work</p>
                        <p className="text-blue-700 text-sm">Credits are earned by completing tasks and spent when posting your own tasks. 
                            Each credit represents value in our community exchange system. The more tasks you complete,
                            the more credits you earn to request help from others.
                        </p>
                    </div>
                </div>

                {/* credit usage tips card */}
                <div className="flex flex-col mt-10 border border-gray-300 w-8/10 rounded-2xl shadow-2xl">
                    <div className="border-b border-gray-300 bg-gray-50 rounded-t-2xl font-bold text-xl   p-5 flex items-center w-full">
                        <p>Credit Usage Tips</p>
                    </div>
                    <div className="p-5 w-full space-y-3">
                        <div className="flex flex-row font-medium space-x-2 items-center">
                            <TrendingUp size={20} color="green"></TrendingUp>
                            <p>Complete small tasks to build up your credit balance quickly</p>
                        </div>
                        <div className="flex flex-row font-medium space-x-2 items-center">
                            <CreditCard size={20} color="blue"></CreditCard>
                            <p>Consider the skill level required when setting credit amounts for tasks</p>
                        </div>
                        <div className="flex flex-row font-medium space-x-2 items-center">
                            <History size={20} color="purple"></History>
                            <p>Credits don't expire, so you can save them for when you need assistance</p>
                        </div>
                    </div>
                </div>

                <div className="bg-red-100 w-8/10 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                      

                </div>
            </div>

        </div>
    );
}

export default UserCreditsPage