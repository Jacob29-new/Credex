import { BigScreenNavbar } from "../components/userPageNavbars";
import { SmallScreenNavbar } from "../components/userPageNavbars";
import credex from "../assets/credex_white_bg.png";
import { useNavigate } from "react-router-dom";
import addTask from "../functions/addTask.js";
import addImage from "../assets/add_circle.svg";
import { useState, useEffect, use } from "react";
import { useLocation } from "react-router-dom";

function UserTaskPage() {

    const navigate = useNavigate();
    const location = useLocation();
    const [currentStep, setCurrentStep] = useState(1);


    useEffect(() => {
        resetFields();
        if (location.pathname === '/user/tasks/post') {
            setCurrentStep(1);
        }
    }, [location.pathname]);

    function resetFields() {
       setTitle('');
       setDescription('');
       setCategory('');
       setTaskLocation('');
       setTaskTime('');
       setDeadline('');
       setPrice('');
       setDuration('');
       setWorkerPreferences('');
       setWorkerProficiency('');
       setWorkerRating('');
       setTaskUrgency('');
    }    

    //post task states
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [taskLocation, setTaskLocation] = useState('')
    const [taskTime, setTaskTime] = useState("");   
    const [deadline, setDeadline] = useState("");
    const [price, setPrice] = useState("");
    const [duration, setDuration] = useState("");
    const [workerPreferences, setWorkerPreferences] = useState("");
    const [workerProficiency, setWorkerProficiency] = useState("");
    const [workerRating, setWorkerRating] = useState("");
    const [taskUrgency, setTaskUrgency] = useState("");

    const [errors, setErrors] = useState({
        title: false,
        description: false,
        category: false,
        taskLocation: false,
        taskTime: false,
        deadline: false,
        price: false,
        duration: false,
        workerPreferences: false,
        workerProficiency: false,
        workerRating: false,
        taskUrgency: false,
    });



    function checkIfEmpty() {
        const newErrors = {
            title: title === "",
            description: description === "",
            category: category === "",
            taskLocation: taskLocation === "",
            taskTime: taskTime === "",
            deadline: deadline === "",
            price: price === "",
            duration: duration === "",
        };
        setErrors(newErrors);
        if (Object.values(newErrors).some(error => error === true)) {
            return false; 
        } else {
            return true; 
        }
    }   

    async function postTask( title,
        description,
        category,
        taskLocation,
        taskTime,
        deadline,
        price,
        duration,   
        workerPreferences,
        workerProficiency,
        workerRating,
        taskUrgency 
    ) {
        if (checkIfEmpty()) {
            await addTask({
                title,
                description,
                category,
                taskLocation,
                taskTime,
                deadline,
                price,
                duration,   
                workerPreferences,
                workerProficiency,
                workerRating,
                taskUrgency,
            });}
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
                <h1 className="text-4xl font-bold text-center">Tasks</h1>

                

                <div className="flex flex-row mt-10">
                    <p onClick={() => navigate('/user/tasks/my')} className={`mr-5 text-lg cursor-pointer hover:text-gray-600  ${window.location.pathname === '/user/tasks/my' ? 'border-b-2 border-black-300' : ''} `}>My tasks</p>
                    <p onClick={() => navigate('/user/tasks/find')} className={`mr-5 text-lg cursor-pointer hover:text-gray-600  ${window.location.pathname === '/user/tasks/find' ? 'border-b-2 border-black-300' : ''} `}>Find tasks</p>
                    <p onClick={() => navigate('/user/tasks/pending')} className={`mr-5 text-lg cursor-pointer hover:text-gray-600  ${window.location.pathname === '/user/tasks/pending' ? 'border-b-2 border-black-300' : ''} `}>Pending tasks</p>
                    <p onClick={() => navigate('/user/tasks/completed')} className={`mr-5 text-lg cursor-pointer hover:text-gray-600  ${window.location.pathname === '/user/tasks/completed' ? 'border-b-2 border-black-300' : ''} `}>Completed tasks</p>
                </div>
                <div className="border-t-2 border-gray-300 w-8/10 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-3">
                    {location.pathname === '/user/tasks/my' && (
                    <div className="border-2 border-dashed rounded-md p-2 w-full h-20 flex items-center flex-col">
                        <p>Post a new a task</p>
                        <img onClick={() => {setCurrentStep(1); navigate('/user/tasks/post')}} className="w-10 h-10 cursor-pointer hover:scale-110 rounded-full" src={addImage} alt="" />
                    </div>
                    )}
                </div>
                {location.pathname === '/user/tasks/post' && (
                    <>
                    <div className="flex flex-row items-center  w-8/10">
                        <div onClick={ () => setCurrentStep(1)} className={`cursor-pointer h-8 w-17 transition duration-500 ease-in-out rounded-full border-2 border-black flex items-center justify-center font-bold text-xl ${currentStep >= 2 ? 'bg-green-500' : ''}`}>1</div>
                        <div className={`w-full h-1 bg-black transition duration-500 ease-in-out  ${currentStep >= 2 ? 'bg-green-500' : ''}`}></div>
                        <div className={`cursor-pointer h-8 w-17 rounded-full transition duration-500 ease-in-out border-2 border-black flex items-center justify-center font-bold text-xl ${currentStep >= 3 ? 'bg-green-500' : ''}`}>2</div>
                        <div className={`w-full h-1 bg-black transition duration-500 ease-in-out ${currentStep >= 3 ? 'bg-green-500' : ''}`}></div>
                        <div className={`cursor-pointer h-8 w-17 rounded-full  transition duration-500 ease-in-out border-2 border-black flex items-center ${currentStep >= 4 ? 'bg-green-500' : ''} justify-center font-bold text-xl`}>3</div>
                    </div>
                    <div className="w-8/10 justify-start">
                        <p className="ml-2 mr-auto">{currentStep}:  {currentStep === 1 ? 'Describe your task' : currentStep === 2 ? 'Add task details' : currentStep === 3 ? 'Confirm details' : currentStep === 4 ? 'Done' : ''}</p>
                    </div>
                    {currentStep === 1 && (
                       <>
                       <div className="w-8/10 mt-10">
                            <p className="text-sm font-medium text-gray-700 mb-1">Task name</p>
                            <input value={title} onChange={(e) => setTitle(e.target.value)} className={`border-b-2 focus:outline-none p-1 px-2 focus:border-green-500 transtition-all duration-300 w-2/10 ${errors.title ? 'border-red-500' : ''}`} type="text" />
                            {errors.title && <p className="text-red-500 font-medium text-xs mt-1">field must not be empty</p>}
                        </div>
                        <div className="w-8/10 mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                            <div className="">
                                <p className="text-sm font-medium text-gray-700 mb-1">Task description</p>
                                <input value={description} onChange={(e) => setDescription(e.target.value)} className={`border-b-2 focus:outline-none p-1 px-2 focus:border-green-500 transtition-all duration-300 w-8/10 ${errors.description ? 'border-red-500' : ''}`} type="text" />
                                {errors.description && <p className="text-red-500 font-medium text-xs mt-1">field must not be empty</p>}
                            </div>
                            <div className="">
                                <p className="text-sm font-medium text-gray-700 mb-1">Task category</p>
                                <input value={category} onChange={(e) => setCategory(e.target.value)}  className={`border-b-2 focus:outline-none p-1 px-2 focus:border-green-500 transtition-all duration-300 w-8/10 ${errors.category ? 'border-red-500' : ''}`} type="text" />
                                {errors.category && <p className="text-red-500 font-medium text-xs mt-1">field must not be empty</p>}
                            </div>
                            <div className="">
                                <p className="text-sm font-medium text-gray-700 mb-1">Task location</p>
                                <input value={taskLocation} onChange={(e) => setTaskLocation(e.target.value)} className={`border-b-2 focus:outline-none p-1 px-2 focus:border-green-500 transtition-all duration-300 w-8/10 ${errors.taskLocation ? 'border-red-500' : ''}`} type="text" />
                                {errors.taskLocation && <p className="text-red-500 font-medium text-xs mt-1">field must not be empty</p>}
                            </div>
                        </div>
                        <div className="w-8/10 mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                            <div className="">
                                <p className="text-sm font-medium text-gray-700 mb-1">Task time</p>
                                <input value={taskTime} onChange={(e) => setTaskTime(e.target.value)} className={`border-b-2 focus:outline-none p-1 px-2 focus:border-green-500 transtition-all duration-300 w-8/10 ${errors.taskTime ? 'border-red-500' : ''}`} type="text" />
                                {errors.taskTime && <p className="text-red-500 font-medium text-xs mt-1">field must not be empty</p>}
                            </div>
                            <div className="">
                                <p className="text-sm font-medium text-gray-700 mb-1">Task deadline</p>
                                <input value={deadline} onChange={(e) => setDeadline(e.target.value)} className={`border-b-2 focus:outline-none p-1 px-2 focus:border-green-500 transtition-all duration-300 w-8/10 ${errors.deadline ? 'border-red-500' : ''}`} type="text" />
                                {errors.deadline && <p className="text-red-500 font-medium text-xs mt-1">field must not be empty</p>}
                            </div>
                            <div className="">
                                <p className="text-sm font-medium text-gray-700 mb-1">Task reward ( in time tokens )</p>
                                <input value={price} onChange={(e) => setPrice(e.target.value)} className={`border-b-2 focus:outline-none p-1 px-2 focus:border-green-500 transtition-all duration-300 w-8/10 ${errors.price ? 'border-red-500' : ''}`} type="number" />
                                {errors.price && <p className="text-red-500 font-medium text-xs mt-1">field must not be empty</p>}
                            </div>
                        </div>
                        <div className="w-8/10 mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                            <div className="">
                                <p className="text-sm font-medium text-gray-700 mb-1">Estimated duration (in minutes)</p>
                                <input value={duration} onChange={(e) => setDuration(e.target.value)} className={`border-b-2 focus:outline-none p-1 px-2 focus:border-green-500 transtition-all duration-300 w-8/10 ${errors.duration ? 'border-red-500' : ''}`} type="number" />
                                {errors.duration && <p className="text-red-500 font-medium text-xs mt-1">field must not be empty</p>}
                            </div>
                        </div>
                        <div className="w-8/10 flex justify-end">
                            <button onClick={() => {if(checkIfEmpty()) {setCurrentStep(currentStep + 1)};}} className="flex items-center justify-center px-5 py-1 mt-5 text-lg font-medium text-white transition-all duration-300 bg-green-500 rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transform hover:scale-105 mb-3">continue</button>
                        </div>

                       </> 
                    )}
                     {currentStep === 2 && (
                        <>
                        <div className="w-8/10 mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                            <div className="">
                                <p className="text-sm font-medium text-gray-700 mb-1">Worker preferences</p>
                                <input value={workerPreferences} onChange={(e) => setWorkerPreferences(e.target.value)} className="border-b-2 focus:outline-none p-1 px-2 focus:border-green-500 transtition-all duration-300 w-8/10" type="text" />
                            </div>
                            <div className="">
                                <p className="text-sm font-medium text-gray-700 mb-1">Minimum worker proficiency 1-10</p>
                                <input value={workerProficiency} onChange={(e) => setWorkerProficiency(e.target.value)} className="border-b-2 focus:outline-none p-1 px-2 focus:border-green-500 transtition-all duration-300 w-8/10" type="number" />
                            </div>
                            <div className="">
                                <p className="text-sm font-medium text-gray-700 mb-1">Minimum worker rating</p>
                                <input value={workerRating} onChange={(e) => setWorkerRating(e.target.value)} className="border-b-2 focus:outline-none p-1 px-2 focus:border-green-500 transtition-all duration-300 w-8/10" type="number" />
                            </div>
                            <div className="">
                                <p className="text-sm font-medium text-gray-700 mb-1">Task urgency 1-3 (the most urgent is 1)</p>
                                <input value={taskUrgency} onChange={(e) => setTaskUrgency(e.target.value)} className="border-b-2 focus:outline-none p-1 px-2 focus:border-green-500 transtition-all duration-300 w-8/10" type="number" />
                            </div>
                        </div>

                        <div className="w-8/10 flex justify-end">
                            <button onClick={() => {if(checkIfEmpty()) setCurrentStep(currentStep + 1);}} className="flex items-center justify-center px-5 py-1 mt-5 text-lg font-medium text-white transition-all duration-300 bg-green-500 rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transform hover:scale-105">continue</button>
                        </div>
                        </>
                    )}
                    {currentStep === 3 && (
                        <>
                       <div className="flex flex-row w-8/10 justify-between mt-10 space-x-6">
                            <div className="w-full md:w-1/2 bg-gray-50 p-5 rounded-lg shadow-lg border border-gray-300">
                                <h3 className="text-xl font-semibold text-gray-700 mb-4">Task Details</h3>
                                <div className="space-y-2">
                                    <p className="text-gray-600"><strong>Title:</strong> {title}</p>
                                    <p className="text-gray-600"><strong>Description:</strong> {description}</p>
                                    <p className="text-gray-600"><strong>Category:</strong> {category}</p>
                                    <p className="text-gray-600"><strong>Location:</strong> {taskLocation}</p>
                                    <p className="text-gray-600"><strong>Task Urgency:</strong> {taskUrgency}</p>
                                    <p className="text-gray-600"><strong>Task Time:</strong> {taskTime}</p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 bg-gray-50 p-5 rounded-lg shadow-lg border border-gray-300">
                                <h3 className="text-xl font-semibold text-gray-700 mb-4">Additional Details</h3>
                                <div className="space-y-2">
                                    <p className="text-gray-600"><strong>Deadline:</strong> {deadline}</p>
                                    <p className="text-gray-600"><strong>Reward:</strong> {price}</p>
                                    <p className="text-gray-600"><strong>Duration:</strong> {duration}</p>
                                    <p className="text-gray-600"><strong>Worker Preferences:</strong> {workerPreferences}</p>
                                    <p className="text-gray-600"><strong>Worker Proficiency:</strong> {workerProficiency}</p>
                                    <p className="text-gray-600"><strong>Worker Rating:</strong> {workerRating}</p>
                                </div>
                            </div>
                        </div>

                        
                        <div className="w-8/10 flex justify-end">
                            <button onClick={async () => { resetFields(); await postTask(title, description, category, taskLocation, taskTime, deadline, price, duration, workerPreferences, workerProficiency, workerRating, taskUrgency); setCurrentStep(currentStep + 1);}} className="flex items-center justify-center px-5 py-1 mt-5 text-lg font-medium text-white transition-all duration-300 bg-green-500 rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transform hover:scale-105 mb-3">Post task</button>
                        </div>
                        </>
                    )}
                    {currentStep === 4 && (
                        <div className="w-8/10 mt-10 flex flex-col items-center justify-center text-center">
                            <p className="text-2xl font-bold text-green-600 mb-3">Task Posted Successfully!</p>
                            <p className="text-gray-700 mb-5">You can now view your task in <span className="font-medium">My Tasks</span> or continue posting more.</p>
                            <div className="flex gap-4">
                            <button onClick={() => navigate('/user/tasks/my')} className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition">
                                Go to My Tasks
                            </button>
                            <button onClick={() => {setTitle(''); setDescription('');setCategory(''); setTaskLocation(''); setTaskTime(''); setDeadline(''); setPrice(''); setDuration(''); setErrors({}); setCurrentStep(1);}}
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
                                Post Another Task
                            </button>
                            </div>
                        </div>
                        )}

                    
                    </>
                )}
                   

            </div>

        </div>
    );
}

export default UserTaskPage