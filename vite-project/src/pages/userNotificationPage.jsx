import { BigScreenNavbar, SmallScreenNavbar } from "../components/userPageNavbars";


function UserNotificationPage() {
  return (
    <div className="h-full w-full flex flex-row">
      <BigScreenNavbar />
      <SmallScreenNavbar />
      <h1>User notification Page</h1>
      <p>This is the user notification page.</p>
    </div>
  );
}   

export default UserNotificationPage