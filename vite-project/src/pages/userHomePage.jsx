import { BigScreenNavbar } from "../components/userPageNavbars";
import { SmallScreenNavbar } from "../components/userPageNavbars";

function UserHomePage() {
    return (
        <div className="h-full w-full flex flex-row">
            <BigScreenNavbar />
            <SmallScreenNavbar />
            <h1>User Home Page</h1>
            <p>Welcome to the user home page!</p>
        </div>
    );
}

export default UserHomePage