import { BigScreenNavbar } from "../components/userPageNavbars";
import { SmallScreenNavbar } from "../components/userPageNavbars";
import credex from "../assets/credex_white_bg.png";
import { useNavigate } from "react-router-dom";
import addTask from "../functions/addTask.js";
import acceptTask from "../functions/acceptTask.js"
import addImage from "../assets/add_circle.svg";
import { useState, useEffect, use } from "react";
import { useLocation } from "react-router-dom";
import getCurrentTasks from "../functions/getCurrentTasks.js"
import getFindTasks from "../functions/getFindTasks.js"
import getMyTodoTasks from "../functions/getMyTodoTasks.js"
import removeMyTaskFunction from "../functions/removeMyTaskFunction.js"
import { Clock, Award, User, Calendar, MapPin, Flame, Star, Briefcase, Check, Tag, Trash2, CheckCircle, AlertTriangle, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import autoGenerateTask from "../functions/autoGenerateTask.js";

function UserTaskPage() {


    const [myTasks, setMyTasks] = useState([]);
    const [findTasks, setFindTasks] = useState([]);
    const [myTodoTasks, setMyTodoTasks] = useState([]);
    

    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState(""); 
    const [activeTab, setActiveTab] = useState("waiting");
    const [pendingFilter, setPendingFilter] = useState(false)
    const [expandedDiv, setExpandedDiv] = useState(null);
    
    const filteredTasks = findTasks.filter(task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (categoryFilter === "" || task.category.toLowerCase() === categoryFilter.toLowerCase())
    );

    const toggleExpand = (id) => {
        if (expandedDiv === id) {
          setExpandedDiv(null);
        } else {
            setExpandedDiv(id);
        }
      };

    async function loadMyTasks() {
        const tasks = await getCurrentTasks();
        setMyTasks(tasks)
        console.log("These are my tasks:",tasks);
    }

    async function loadFindTasks() {
        const tasks = await getFindTasks();
        setFindTasks(tasks)
        console.log("These are public tasks:",tasks);
    }

    async function handleAcceptTask(taskId) {
        console.log("Accept task button clicked, task id:", taskId);
        await acceptTask({ taskId });
        loadFindTasks()
        loadMyTasks()
    }

    async function loadMyTodoTasks() {
        console.log("fetching todo tasks")
        const tasks = await getMyTodoTasks()
        setMyTodoTasks(tasks)
        console.log("todo tasks:", tasks)
        loadFindTasks()

    }
    
    useEffect(() => {
        loadMyTasks()
        loadFindTasks()
        loadMyTodoTasks()
    }, []);

    async function removeMyTask(id) {
        console.log(id)
        await removeMyTaskFunction(id)
        await loadMyTasks()
    }



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
                    <div className="h-5 w-5 cursor-pointer" onClick={() => {autoGenerateTask(); loadMyTasks()}}></div>    
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
                <div className="border-t-2 border-gray-300 w-8/10 mt-10 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8 p-3">
                    {location.pathname === '/user/tasks/my' && (
                        <>
                        <div className="border-2 border-dashed rounded-md p-2 w-full h-40 flex items-center justify-center flex-col">
                            <p>Post a new a task</p>
                            <img onClick={() => {setCurrentStep(1); navigate('/user/tasks/post')}} className="w-10 h-10 cursor-pointer hover:scale-110 rounded-full" src={addImage} alt="" />
                        </div>
                        <p className="text-2xl font-bold">My to-do tasks</p>
                         {myTodoTasks.length > 0 ? (

                            <>
                            {myTodoTasks.map((task, index) => (
                                <div 
                                key={index} 
                                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200"
                                >
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-2">
                                    <h2 className="text-lg font-semibold text-gray-800 mb-2">{task.title}</h2>
                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                                        <Tag size={12} className="mr-1" />
                                        {task.category}
                                    </span>
                                    </div>
                                    
                                    <p className="text-gray-600 mb-4 text-sm">{task.description}</p>
                                    
                                    <div className="space-y-2">
                                    <div className="flex items-center text-gray-500 text-xs">
                                        <MapPin size={14} className="mr-2" />
                                        <span>{task.taskLocation}</span>
                                    </div>
                                    
                                    <div className="flex items-center text-gray-500 text-xs">
                                        <Clock size={14} className="mr-2" />
                                        <span>Due: {task.deadline}</span>
                                    </div>
                                    
                                    <div className="flex items-center text-gray-500 text-xs">
                                        <Award size={14} className="mr-2" />
                                        <span>Offer: {task.credits_offered} {task.credits_offered === 1 ? "credex" : "credexes"}</span>
                                    </div>
                                    <div className="w-full  h-8 flex justify-end">
                                        <button className="mr-2 hover:bg-green-500 hover:border-black border-none w-30 bg-green-400 rounded-md">Mark as done</button>
                                    </div>
                                    </div>
                                </div>
                                
                                {/* <div className="border-t border-gray-200 bg-gray-50 px-4 py-3 flex justify-end">
                                    <button 
                                    className="flex items-center text-sm text-red-600 hover:text-red-800 transition-colors duration-200 focus:outline-none"
                                    onClick={() => removeMyTask(task.id)}>
                                    <Trash2 size={16} className="mr-1" />
                                    Remove
                                    </button>
                                </div> */}
                                </div>
                            ))}
                            </>
                        ) : (
                            <p>No tasks found.</p>
                        )} 
                        <p className="text-2xl font-bold">My posted tasks</p>
                        {myTasks.length > 0 ? (
                            <>
                            {myTasks.map((task, index) => (
                                <div 
                                key={index} 
                                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200"
                                >
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-2">
                                    <h2 className="text-lg font-semibold text-gray-800 mb-2">{task.title}</h2>
                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                                        <Tag size={12} className="mr-1" />
                                        {task.category}
                                    </span>
                                    </div>
                                    
                                    <p className="text-gray-600 mb-4 text-sm">{task.description}</p>
                                    
                                    <div className="space-y-2">
                                    <div className="flex items-center text-gray-500 text-xs">
                                        <MapPin size={14} className="mr-2" />
                                        <span>{task.taskLocation}</span>
                                    </div>
                                    
                                    <div className="flex items-center text-gray-500 text-xs">
                                        <Clock size={14} className="mr-2" />
                                        <span>Due: {task.deadline}</span>
                                    </div>
                                    
                                    <div className="flex items-center text-gray-500 text-xs">
                                        <Award size={14} className="mr-2" />
                                        <span>Offer: {task.credits_offered} {task.credits_offered === 1 ? "credex" : "credexes"}</span>
                                    </div>
                                    </div>
                                </div>
                                
                                <div className="border-t border-gray-200 bg-gray-50 px-4 py-3 flex justify-end">
                                    <button 
                                    className="flex items-center text-sm text-red-600 hover:text-red-800 transition-colors duration-200 focus:outline-none"
                                    onClick={() => removeMyTask(task.id)}>
                                    <Trash2 size={16} className="mr-1" />
                                    Remove
                                    </button>
                                </div>
                                </div>
                            ))}
                            </>
                        ) : (
                            <div>No tasks found</div>
                        )}
                        </>
                    )}
                </div>
                    {location.pathname === '/user/tasks/find' && (
                        <>
                            <div className="w-8/10 p-5">
                                <h2 className="text-2xl font-semibold mb-5">Find a Task</h2>
                                
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        placeholder="Search tasks by name..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                            
                                <div className="mb-4">
                                    <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} 
                                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="">Select Category</option>
                                        <option value="coding">Coding</option>
                                        <option value="cleaning">Cleaning</option>
                                        <option value="design">Design</option>
                                        <option value="writing">Writing</option>
                                        <option value="marketing">Marketing</option>
                                        <option value="consulting">Consulting</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10">
                                {filteredTasks.map((task) => (
                                    <div id={task.id} className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white overflow-hidden w-full">
                                        <div className="p-4 w-full">
                                        <div className="mb-3">
                                            <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                                            <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                            {task.category}
                                            </span>
                                        </div>

                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{task.description}</p>

                                        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-500">
                                            <div className="flex items-center">
                                            <Clock className="h-4 w-4 mr-1" />
                                            Duration: {task.duration}
                                            </div>
                                            <div className="flex items-center">
                                            <Calendar className="h-4 w-4 mr-1" />
                                            Deadline: {task.deadline}
                                            </div>
                                            <div className="flex items-center">
                                            <MapPin className="h-4 w-4 mr-1" />
                                            Location: {task.taskLocation}
                                            </div>
                                            <div className="flex items-center">
                                            <Flame className="h-4 w-4 mr-1" />
                                            Urgency: {task.taskUrgency}
                                            </div>
                                            <div className="flex items-center">
                                            <Star className="h-4 w-4 mr-1" />
                                            Required Rating: {task.workerRating}
                                            </div>
                                            <div className="flex items-center">
                                            <Briefcase className="h-4 w-4 mr-1" />
                                            Status: {task.status}
                                            </div>
                                        </div>

                                        <div className="flex justify-between text-gray-700 text-sm font-medium mb-4">
                                            <div className="flex items-center gap-2">
                                            <Award className="h-4 w-4" />
                                            {task.credits_offered} credits
                                            </div>
                                            <div className="flex items-center gap-2">
                                            <User className="h-4 w-4" />
                                            {task.creator_username}
                                            </div>
                                        </div>

                                        <div className="flex justify-end">
                                            <button
                                            onClick={() => handleAcceptTask(task.id)} 
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-transform hover:scale-105 shadow-sm hover:shadow-md flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                                            <Check className="w-4 h-4" />
                                            Accept Task
                                            </button>
                                        </div>
                                        </div>
                                    </div>
                                    ))}

                                </div>

                            </div>
                        </>
                    )}

               

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
                                    <input value={taskTime} onChange={(e) => setTaskTime(e.target.value)} className={`border-b-2 focus:outline-none p-1 px-2 focus:border-green-500 transtition-all duration-300 w-8/10 ${errors.taskTime ? 'border-red-500' : ''}`} type="time" />
                                    {errors.taskTime && <p className="text-red-500 font-medium text-xs mt-1">field must not be empty</p>}
                                </div>
                                <div className="">
                                    <p className="text-sm font-medium text-gray-700 mb-1">Task deadline</p>
                                    <input value={deadline} onChange={(e) => setDeadline(e.target.value)} className={`border-b-2 focus:outline-none p-1 px-2 focus:border-green-500 transtition-all duration-300 w-8/10 ${errors.deadline ? 'border-red-500' : ''}`} type="datetime-local" />
                                    {errors.deadline && <p className="text-red-500 font-medium text-xs mt-1">field must not be empty</p>}
                                </div>
                                <div className="">
                                    <p className="text-sm font-medium text-gray-700 mb-1">Task reward ( in time tokens )</p>
                                    <input value={price} onChange={(e) => setPrice(e.target.value)} className={`border-b-2 focus:outline-none p-1 px-2 focus:border-green-500 transtition-all duration-300 w-8/10 ${errors.price ? 'border-red-500' : ''}`} type="number" max={1000} />
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
                                    <input value={workerProficiency} onChange={(e) => setWorkerProficiency(e.target.value)} className="border-b-2 focus:outline-none p-1 px-2 focus:border-green-500 transtition-all duration-300 w-8/10" type="number" max={10} />
                                </div>
                                <div className="">
                                    <p className="text-sm font-medium text-gray-700 mb-1">Minimum worker rating</p>
                                    <input value={workerRating} onChange={(e) => setWorkerRating(e.target.value)} className="border-b-2 focus:outline-none p-1 px-2 focus:border-green-500 transtition-all duration-300 w-8/10" type="number" max={10} />
                                </div>
                                <div className="">
                                    <p className="text-sm font-medium text-gray-700 mb-1">Task urgency 1-3 (the most urgent is 1)</p>
                                    <input value={taskUrgency} onChange={(e) => setTaskUrgency(e.target.value)} className="border-b-2 focus:outline-none p-1 px-2 focus:border-green-500 transtition-all duration-300 w-8/10" type="number" max={3}/>
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
                                        <p className="text-gray-600"><strong>Reward:</strong> {price} {price === 1 ? "credex" : "credexes"}</p>
                                        <p className="text-gray-600"><strong>Duration:</strong> {duration} {duration === 1 ? "minute" : "minutes"}</p>
                                        <p className="text-gray-600"><strong>Worker Preferences:</strong> {workerPreferences}</p>
                                        <p className="text-gray-600"><strong>Worker Proficiency:</strong> {workerProficiency}</p>
                                        <p className="text-gray-600"><strong>Worker Rating:</strong> {workerRating}</p>
                                    </div>
                                </div>
                            </div>

                            
                            <div className="w-8/10 flex justify-end">
                                <button onClick={async () => { resetFields(); await postTask(title, description, category, taskLocation, taskTime, deadline, price, duration, workerPreferences, workerProficiency, workerRating, taskUrgency); setCurrentStep(currentStep + 1); loadMyTasks() }} className="flex items-center justify-center px-5 py-1 mt-5 text-lg font-medium text-white transition-all duration-300 bg-green-500 rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transform hover:scale-105 mb-3">Post task</button>
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
                    {location.pathname === "/user/tasks/pending" && (
                        <>
                        <p className="font-medium w-8/10 text-2xl mb-5">Pending Tasks</p>
                        <div className="w-8/10 flex flex-row">
                            <div className={`flex flex-col space-x-5 xl:flex-row md:flex-row lg:flex-row sm:flex-col`}>
                                <button 
                                    onClick={() => setActiveTab("waiting")}
                                    className={`px-4 py-1 mt-5 text-lg rounded-md flex items-center space-x-2 ${activeTab === "waiting" ? "bg-amber-100 border border-amber-300 text-amber-800" : "border border-gray-200"}`}>
                                    <Clock size={18}></Clock>
                                    <p>Waiting</p>
                                </button>
                                <button 
                                    onClick={() => setActiveTab("completed")}
                                    className={`px-4 mt-5 py-1 text-lg rounded-md flex items-center space-x-2 ${activeTab === "completed" ? "bg-green-100 border border-green-300 text-green-800" : "border border-gray-200"}`}>
                                    <CheckCircle size={18}></CheckCircle>
                                    <p>Completed</p>
                                </button>
                                <button 
                                    onClick={() => setActiveTab("disputed")}
                                    className={`px-4 mt-5 py-1 text-lg rounded-md flex items-center space-x-2   ${activeTab === "disputed" ? "bg-red-100 border border-red-300 text-red-800" : "border border-gray-200"}`}>
                                    <AlertTriangle size={18}></AlertTriangle>
                                    <p>Disputed</p>
                                </button>
                            </div>
                            <div className="space-x-2 px-8 mt-5 py-1 max-h-10 ml-auto flex flex-row border items-center justify-center rounded-lg border-gray-200"
                                 onClick={() => setPendingFilter(!pendingFilter)}>
                                <Filter size={18}></Filter>
                                <p>Filters</p>
                                {pendingFilter ? <ChevronDown size={16}/> :  <ChevronUp size={16}/>}
                            </div>
                        </div>
                        {pendingFilter ? (
                                <>
                                <div className="flex flex-col w-8/10 p-5 space-y-5 border border-gray-300 rounded-xl mt-4">
                                    <div className="flex flex-col">
                                        <p className="font-medium">Priority</p>
                                        <select name="" id="" className="p-2 mt-1 border border-gray-500 rounded-md">
                                            <option value="">All priorities</option>
                                            <option value="high">High</option>
                                            <option value="medium">Medium</option>
                                            <option value="low">Low</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="font-medium">Category</p>
                                        <select name="" id="" className="p-2 mt-1 border border-gray-500 rounded-md">
                                            <option value="">All categories</option>
                                            <option value="high">High</option>
                                            <option value="medium">Medium</option>
                                            <option value="low">Low</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="font-medium">Sort by</p>
                                        <select name="" id="" className="p-2 mt-1 border border-gray-500 rounded-md">
                                            <option value="">Deadline (nearest)</option>
                                            <option value="high">High</option>
                                            <option value="medium">Medium</option>
                                            <option value="low">Low</option>
                                        </select>
                                    </div>
                                </div>
                                </>
                            ) : (<></>)}
                        {activeTab === "waiting" ? (<>
                            <div className="flex flex-col w-8/10 bg-amber-50 mt-5 p-5 border border-amber-300 text-amber-800 rounded-t-xl">
                                <div className="flex flex-row text-lg space-x-2 items-center">
                                    <Clock size={16}></Clock>
                                    <p>Accepted and waiting to be completed</p>
                                </div>
                                <p className="font-medium">Tasks you've posted that have been accepted and are awaiting completion</p>
                            </div>
                            {myTasks.filter(task => task.status === "accepted").map((task) => (
                                <>
                                    <div className="flex flex-row w-8/10 items-center space-x-4 p-3 border border-gray-300">
                                        <div className=" w-10 h-10 border border-gray-300 rounded-2xl flex items-center justify-center">J</div>
                                        <div className="flex flex-col justify-center ">
                                            <p className="font-medium text-lg">{task.title}</p>
                                            <p className="text-md text-gray-500">Worker: {task.worker_username} ~ Due: {task.deadline}</p>
                                        </div>
                                        <div className="flex flex-col xl:flex-row space-y-2  justify-center ml-auto space-x-5 items-center">
                                            <div className="font-medium text-blue-800 bg-blue-100 px-4 py-1 rounded-2xl">In progresss</div>
                                            <button className="text-white px-2 py-1 bg-green-600 rounded-md hover:bg-green-700">Mark as completed</button>
                                            <button onClick={() => { toggleExpand(task.id); console.log(task.id, expandedDiv); }}>
                                                {expandedDiv === task.id ? <ChevronUp size={18}></ChevronUp> : <ChevronDown size={18}></ChevronDown>}
                                            </button>
                                        </div>      
                                    </div>
                                    {expandedDiv === task.id && (
                                            <>
                                                <div className=" w-8/10 p-4 grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50">
                                                    <p><span className="font-medium">Description: </span>{task.description}</p>
                                                    <p><span className="font-medium">Deadline: </span> {task.deadline}</p>
                                                    <p><span className="font-medium">Category: </span>{task.category}</p>
                                                    <p><span className="font-medium">Priority: </span> {task.taskUrgency}</p>
                                                    <p><span className="font-medium">Task status: </span> {task.status}</p>
                                                    <p><span className="font-medium">Credits: </span> {task.credits_offered}</p>
                                                </div>
                                            </>
                                        )}

                                </>
                            ))}
                        </>) : (<></>)}
                        {activeTab === "completed" ? (<>
                            <div className="flex flex-col w-8/10 bg-green-50 mt-5 p-5 border border-green-300 text-green-800 rounded-t-xl">
                                <div className="flex flex-row text-lg space-x-2 items-center">
                                    <CheckCircle size={16}></CheckCircle>
                                    <p>Completed and waiting for confirmation</p>
                                </div>
                                <p className="font-medium">Tasks waiting for confirmation - both tasks you've completed and tasks others have completed for you</p>
                            </div>
                        </>) : (<></>)}
                        {activeTab === "disputed" ? (<>
                            <div className="flex flex-col w-8/10 bg-red-50 mt-5 p-5 border border-red-300 text-red-800 rounded-t-xl">
                                <div className="flex flex-row text-lg space-x-2 items-center">
                                    <AlertTriangle size={16}></AlertTriangle>
                                    <p>Disputed Tasks</p>
                                </div>
                                <p className="font-medium">Tasks where completion is disputed by the owner</p>
                            </div>
                        </>) : (<></>)}
                       
                        </>
                    )}
                   

            </div>

        </div>
    );
}

export default UserTaskPage