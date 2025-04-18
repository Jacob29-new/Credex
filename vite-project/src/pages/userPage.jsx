
import logout from "../functions/logout";
import { useNavigate } from "react-router-dom"; 
function UserPage() {
    const navigate = useNavigate();

   function logoutUser(e) {
        e.preventDefault();
        logout();
        //navigates to current page
        window.location.reload();

    }
  
  return <div>
    <h2>User Page</h2>
    <button onClick={logoutUser} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded active:bg-blue-600">logout</button>
  </div> ;
}

export default UserPage;