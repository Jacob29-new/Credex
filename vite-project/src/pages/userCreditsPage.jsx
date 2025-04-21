import { BigScreenNavbar, SmallScreenNavbar } from "../components/userPageNavbars";


function UserCreditsPage() {
  return (
    <div className="h-full w-full flex flex-row">
      <BigScreenNavbar />
      <SmallScreenNavbar />
      <h1>User credits Page</h1>
      <p>This is the user credits page.</p>
    </div>
  );
}   

export default UserCreditsPage