import { BigScreenNavbar } from "../components/userPageNavbars";
import { SmallScreenNavbar } from "../components/userPageNavbars";
import { useState } from "react";
import { useEffect } from "react";
import getInfo from "../functions/getInfoFromJWT.js";

function UserHomePage() {
    const [firstName, setFirstName] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userFirstName = await getInfo("firstName"); 
            setFirstName(userFirstName); 
        };
        fetchUserInfo(); 
    }, []);

    return (
        <div className="h-full w-full flex flex-row">
            <BigScreenNavbar />
            <SmallScreenNavbar />
            <div className="flex flex-col items-center  w-full">
            <h1 className="text-4xl mt-10 font-bold">Welcome back to Credex, {firstName}!</h1>
                <p>Welcome to the user home page!</p>
            </div>

        </div>
    );
}

export default UserHomePage