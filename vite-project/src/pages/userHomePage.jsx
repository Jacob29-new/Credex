import { BigScreenNavbar } from "../components/userPageNavbars";
import { SmallScreenNavbar } from "../components/userPageNavbars";
import { useState } from "react";
import { useEffect } from "react";
import getInfo from "../functions/getInfoFromJWT.js";
import credex from "../assets/credex_white_bg.png";
import tasksImage from "../assets/tasks.svg";
import creditsImage from "../assets/credits.svg";
import addtaskImage from  "../assets/addtask.svg";
import getCurrentTasks from "../functions/getCurrentTasks.js";
import getMyTodoTasks from "../functions/getMyTodoTasks.js";
import { useNavigate } from "react-router-dom";
import getUserInfo from "../functions/getUserInfo.js";


function UserHomePage() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState(null);

    //for windows squares
    const [tasks, setTasks] = useState([]);
    const [credits, setCredits] = useState(0);
    const [myAcceptedTasks, setMyAcceptedTasks] = useState([]);

    async function loadMyTasks() {
        const tasks = await getCurrentTasks();
        setTasks(tasks)
        console.log(tasks);
        const myAcceptedTasks = await getMyTodoTasks(tasks);
        setMyAcceptedTasks(myAcceptedTasks);
        console.log(myAcceptedTasks);

    }
    
    useEffect(() => {
        loadMyTasks()
    }, []);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const user = await getUserInfo();
            console.log(user);
            setFirstName(user.firstName);
            setCredits(user.credits);
        };
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
                <h1 className="text-4xl font-bold text-center">Welcome back to Credex, {firstName}!</h1>
                <p className="text-center mt-2">Need help or want to help? You're in the right place.</p>

                <input type="text" placeholder="Find a task.." className="border-2 border-gray-300 rounded-2xl px-4 py-2 mt-4 w-1/2 mt-13"/>


                <div className="w-8/10 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                <div className="w-full flex flex-col items-center text-center h-30 bg-[hsl(30,3.33%,11.76%)] rounded-md overflow-y-scroll scrollbar-hide p-2">
                    <div className="flex items-center justify-center w-full mb-2">
                        <p className="text-gray-200 text-lg font-bold">Your Tasks</p>
                        <img className="w-5 h-5 ml-2" src={tasksImage} alt="Tasks" />
                    </div>

                    {myAcceptedTasks.filter(task => task.status === "accepted").length === 0 && myAcceptedTasks.filter(task => task.status === "pending").length === 0 ? (
                        <p className="text-gray-400 text-sm">You currently have no tasks</p>
                    ) : (
                        <ul className="w-full px-2 space-y-1">
                        {myAcceptedTasks.filter(task => task.status === "accepted").map((task, i) => (
                            <li key={i}
                            className="text-white bg-[hsl(30,3.33%,15%)] rounded px-2 py-1 text-sm shadow-sm">
                            • <span className="font-semibold">{task.title}</span> — {task.category}
                            </li>
                        ))}
                        </ul>
                    )}              
                    </div>


                    <div className="w-full flex flex-col items-center h-30 bg-[hsl(30,3.33%,11.76%)] rounded-md">
                        <div className="flex flex-row items-center justify-center w-full mt-5">
                            <p className="text-gray-200 text-lg font-bold">Credits</p>
                            <img className="w-7 h-7 ml-2" src={creditsImage} alt="" />
                        </div>
                        <p className="text-white text-2xl mt-3">{credits}</p>
                    </div>

                    <div className="w-full flex flex-col items-center h-30 bg-[hsl(30,3.33%,11.76%)] rounded-md">
                        <div className="flex flex-row items-center justify-center w-full mt-5">
                            <p className="text-gray-200 text-lg font-bold">Add a task</p>
                            <img className="w-7 h-7 ml-2" src={addtaskImage} alt="" />
                        </div>
                        <div onClick={() => navigate("/user/tasks/post")} className="text-white text-xl mt-3 border-dashed borer-white border-2 w-1/3 h-1/4 rounded-md flex items-center justify-center font-bold cursor-pointer hover:bg-white hover:text-black transition-all duration-300 select-none" >+</div>
                    </div>   

                </div>
            </div>

        </div>
    );
}

export default UserHomePage