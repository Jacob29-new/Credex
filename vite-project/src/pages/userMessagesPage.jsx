import { BigScreenNavbar, SmallScreenNavbar } from "../components/userPageNavbars";


function UserMessagesPage() {
  return (
    <div className="h-full w-full flex flex-row">
      <BigScreenNavbar />
      <SmallScreenNavbar />
      <h1>User messages Page</h1>
      <p>This is the user messages page.</p>
    </div>
  );
}   

export default UserMessagesPage