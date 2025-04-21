import { BigScreenNavbar, SmallScreenNavbar } from "../components/userPageNavbars";


function UserSettingsPage() {
  return (
    <div className="h-full w-full flex flex-row">
      <BigScreenNavbar />
      <SmallScreenNavbar />
      <h1>User settings Page</h1>
      <p>This is the user settings page.</p>
    </div>
  );
}   

export default UserSettingsPage