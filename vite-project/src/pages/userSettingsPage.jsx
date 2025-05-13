import { BigScreenNavbar } from "../components/userPageNavbars";
import { SmallScreenNavbar } from "../components/userPageNavbars";
import { useEffect, useState } from "react";
import getUserInfo from "../functions/getUserInfo.js";
import saveChanges from "../functions/settingsPageFunctions/saveChanges.js";
import credex from "../assets/credex_white_bg.png";
import { User, Lock, Mail, MapPin, Clock, BookOpen, Code, Save, WorkflowIcon, ClockIcon, Book } from 'lucide-react';

function UserSettingsPage() {

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [location, setLocation] = useState(null);
    const [skills, setSkills] = useState(null); 
    const [workingHours, setWorkingHours] = useState(null);
    const [bio, setBio] = useState(null);
    const [oldPassword, setOldPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [username, setUsername] = useState(null);
    const [succesful, setSuccesful] = useState(null);
    const [profilePic, setProfilePic] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userInfo = await getUserInfo();
            setFirstName(userInfo.firstName);
            setLastName(userInfo.lastName);
            setLocation(userInfo.location);
            setSkills(userInfo.skills);
            setWorkingHours(userInfo.workingHours);
            setBio(userInfo.bio);
            setUsername(userInfo.username); 
            setProfilePic(userInfo.profilePic);
            console.log("User skills:", userInfo.skills);
        };
        
        fetchUserInfo();
    }, []);

    async function handleSaveChanges() {
        setSuccesful(null);
        const response  = await saveChanges( { firstName, lastName, location, skills, workingHours, bio, profilePic, oldPassword, newPassword });
        if (!response) {
            setSuccesful(false);
        } else {
            setSuccesful(true);
        }
    }

    return (
        <div className="h-full w-full flex flex-row">
            <BigScreenNavbar />
            <SmallScreenNavbar />
            <div className="flex flex-col items-center h-full  w-full overflow-y-scroll">
                <div className="w-full flex flex-row items-center justify-end p-5">
                    <img src={credex} className="h-7 w-7" alt="" />
                    <p className="uppercase text-black text-xl font-bold">credex</p>                    
                </div>
                <h1 className="text-4xl font-bold text-center">Settings</h1>

                


                <div className="shadow-2xl w-6/10 mt-10 items-center flex flex-col py-5">

                    {/* profile picture */}
                    <div className="w-32 h-32 border border-gray-300 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 ">
                        <p>150 x 150</p>
                    </div>
                    <input type="file" className="mt-4 px-5 py-2 bg-gray-300 rounded-lg cursor-pointer hover:bg-gray-400" value={profilePic} onChange={(e) => set(e.target.value)}></input>
                    
                    <p className="text-xl font-medium w-full px-5 mt-5">Basic Information</p>

                    {/* firstName */}
                    <div className="w-10/10 flex flex-col items-center p-5 relative"> 
                        <p className="w-full font-medium text-gray-800">First Name</p>
                        <div className="flex flex-row items-center w-full">
                            <User color="gray" size={20} className="absolute left-8 bottom-8"></User>
                            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full border border-gray-300  px-10 rounded-lg p-2 mt-2" placeholder="" type="text"></input>
                        </div>
                    </div>

                    {/* lastName */}
                    <div className="w-10/10 flex flex-col items-center p-5 relative"> 
                        <p className="w-full font-medium text-gray-800">Last Name</p>
                        <div className="flex flex-row items-center w-full">
                            <User color="gray" size={20} className="absolute left-8 bottom-8"></User>
                            <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full border border-gray-300  px-10 rounded-lg p-2 mt-2" placeholder="" type="text"></input>
                        </div>
                    </div>

                    {/* username */}
                    <div className=" w-10/10 flex flex-col items-center p-5 relative"> 
                        <p className="w-full font-medium text-gray-800">Username</p>
                        <div className="flex flex-row items-center w-full">
                            <User color="gray" size={20} className="absolute left-8 bottom-8"></User>
                            <input readOnly disabled value={username} className="w-full border border-gray-300  px-10 rounded-lg p-2 mt-2" placeholder="" type="text"></input>
                        </div>
                    </div>

                   {/*   location */}
                   <div className=" w-10/10 flex flex-col items-center p-5 relative"> 
                        <p className="w-full font-medium text-gray-800">Location</p>
                        <div className="flex flex-row items-center w-full">
                            <MapPin color="gray" size={20} className="absolute left-8 bottom-8"></MapPin>
                            <input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full border border-gray-300  px-10 rounded-lg p-2 mt-2" placeholder="" type="text"></input>
                        </div>
                    </div>  

                    <p className="text-xl font-medium w-full px-5 mt-5">Additional Information</p>
                
                    {/*   skills */}
                    <div className=" w-10/10 flex flex-col items-center p-5 relative"> 
                        <p className="w-full font-medium text-gray-800">Skills</p>
                        <div className="flex flex-row items-center w-full">
                            <WorkflowIcon color="gray" size={20} className="absolute left-8 bottom-8"></WorkflowIcon>
                            <input value={skills} onChange={(e) => setSkills(e.target.value)} className="w-full border border-gray-300  px-10 rounded-lg p-2 mt-2" placeholder="" type="text"></input>
                        </div>
                    </div>  

                    {/*   working hours */}
                    <div className=" w-10/10 flex flex-col items-center p-5 relative"> 
                        <p className="w-full font-medium text-gray-800">Working hours</p>
                        <div className="flex flex-row items-center w-full">
                            <ClockIcon color="gray" size={20} className="absolute left-8 bottom-8"></ClockIcon>
                            <input value={workingHours} onChange={(e) => setWorkingHours(e.target.value)} className="w-full border border-gray-300  px-10 rounded-lg p-2 mt-2" placeholder="" type="text"></input>
                        </div>
                    </div>  

                    {/*   bio */}
                    <div className=" w-10/10 flex flex-col items-center p-5 relative"> 
                        <p className="w-full font-medium text-gray-800">Bio</p>
                        <div className="flex flex-row items-center w-full">
                            <BookOpen color="gray" size={20} className="absolute left-8 bottom-8"></BookOpen>
                            <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="w-full border border-gray-300  px-10 rounded-lg p-2 mt-2" placeholder="" type="text"></textarea>
                        </div>
                    </div>  

                    <p className="text-xl font-medium w-full px-5 mt-5">Change Password</p>

                   {/*  old password */}
                   <div className=" w-10/10 flex flex-col items-center p-5 relative"> 
                        <p className="w-full font-medium text-gray-800">Old password</p>
                        <div className="flex flex-row items-center w-full">
                            <Lock color="gray" size={20} className="absolute left-8 bottom-8"></Lock>
                            <input value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="w-full border border-gray-300  px-10 rounded-lg p-2 mt-2" placeholder="" type="text"></input>
                        </div>
                    </div>  

                    {/*  new password */}
                   <div className=" w-10/10 flex flex-col items-center p-5 relative"> 
                        <p className="w-full font-medium text-gray-800">New password</p>
                        <div className="flex flex-row items-center w-full">
                            <Lock color="gray" size={20} className="absolute left-8 bottom-8"></Lock>
                            <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full border border-gray-300  px-10 rounded-lg p-2 mt-2" placeholder="" type="text"></input>
                        </div>
                    </div>  

                    {/*  save changes */}
                    <div onClick={ () => handleSaveChanges()} className="flex items-center flex-row w-10/10 flex justify-start p-5  rounded-lg p-2 mt-2">   
                        <button className=" hover:bg-gray-200 transition duration-200 font-medium text-gray-800 cursor-pointer border border-gray-300  px-10 rounded-lg p-2">Save changes</button>
                        {succesful !== null && (
                            <p className={`ml-4 ${succesful ? "text-green-600" : "text-red-600"}`}>
                                {succesful ? "Changes saved successfully!" : "Failed to save changes"}
                            </p>
                        )}
                    </div>

 
                </div>
            </div>

        </div>
    );
}

export default UserSettingsPage