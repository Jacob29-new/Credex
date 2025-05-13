import getUserInfo from "../functions/getUserInfo"
import {useState, useEffect} from "react"
import {User, CircleX, MapPin, Clock, Star, Calendar} from "lucide-react"
function AboutUser({userId, isOpen, onClose}) {

    if (!isOpen) return null

    const [userInfo, setUserInfo] = useState({})

    useEffect( () => {
        const fetchUserInfo = async () => {
            const userInfo = await getUserInfo(userId)
            setUserInfo(userInfo)
        }
        fetchUserInfo()
    }, [])

    const formatJoinDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      };

    

    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50">
          <div
            className="absolute top-0 left-0 w-full h-full bg-black opacity-70"
            onClick={onClose}
          ></div>
      
          <div className="relative z-10 bg-white p-8 rounded-lg shadow-xl w-[90%] max-w-md">
            <CircleX size={30}  color="red" className="absolute top-4 right-4 cursor-pointer hover:bg-gray-100 rounded-full" onClick={onClose}></CircleX>
             
            <div className="flex flex-col items-center space-y-0">
              {/* Profile picture */}
              <User className="w-24 h-24 rounded-full" />
              
              {/* Name & username */}
              <h2 className="text-2xl font-bold">{userInfo.firstName} {userInfo.lastName}</h2>
              <p className="text-blue-500 font-medium">@{userInfo.username}</p>
      
              <div className="flex flex-row items-center space-x-2 mt-3">
                <MapPin color="gray" size={18}></MapPin>
                <p className="text-gray-600">{userInfo.location || "N/A"}</p>
                <Clock color="gray" size={18}></Clock>
                <p className="text-gray-600">{userInfo.workingHours || "N/A"}</p>
              </div>
              <div className="w-full h-[1px] bg-gray-300 mt-4"></div>
             
               {/* Bio */}
              <div className="mb-6 w-full mt-4 break-all">
                <h3 className="text-sm uppercase tracking-wider text-gray-500 font-medium mb-2">About</h3>
                <p className="text-gray-700 ">{userInfo.bio || "No bio available."}</p>
              </div>
      
              {/* Skills */}
              <div className="mb-6 w-full">
                <h3 className="text-sm uppercase tracking-wider text-gray-500  font-medium mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                {userInfo.skills ? ( userInfo.skills.split(',').map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100  text-blue-900 text-sm rounded-full">
                        {skill.trim()}
                    </span>
                    ))
                ) : (
                    <p className="text-gray-500">No skills available.</p>
                )}
                </div>
              </div>
      
      
              {/* Ratings */}
              <div className="grid grid-cols-2 gap-4 pt-2 w-full">
                    <div className="flex flex-col">
                        <h3 className="text-sm uppercase tracking-wider text-gray-500  font-medium mb-1">Rating</h3>
                        <div className="flex items-center">
                            <Star size={18} className="text-yellow-400 fill-current mr-1" />
                            <span className="text-gray-800  font-medium">{userInfo.rating || "N/A"}</span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                    <h3 className="text-sm uppercase tracking-wider text-gray-500  font-medium mb-1">Joined</h3>
                    <div className="flex items-center">
                        <Calendar size={18} className="text-gray-500 mr-1" />
                        <span className="text-gray-800 ">{userInfo.created_at ? formatJoinDate(userInfo.created_at) : "N/A"}</span>
                    </div>
                    </div>
              </div>
            </div>
          </div>
        </div>
      )
      
      
}

export default AboutUser