import { useState } from "react";
import AuthenticateUser from "../functions/authenticateUser";
import Navbar from "../components/navbar";

function LoginPage() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState(null)


    function handleSubmit(e) {
        e.preventDefault();
        setSuccess(null);
        
        const result = AuthenticateUser({ username, password });
        if (result) {
            sessionStorage.setItem("currentUser", username);
            sessionStorage.setItem(username, "true");
            window.location.href = "/user"; 
        } else {
            setSuccess(false);
        }
    }



    return (
        <div>
            <Navbar></Navbar>
            <form action="">
                <input type="text" className="border" onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" className="border" onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit" onClick={handleSubmit}>Login</button>
                <p>{success === null ? "" : success ? "Login successful" : "Login failed"}</p>
            </form>
        </div>
    )

}

export default LoginPage;