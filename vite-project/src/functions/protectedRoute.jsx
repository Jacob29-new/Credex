import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {

    const username = sessionStorage.getItem("currentUser");
    const isAuth = username && sessionStorage.getItem(username) === "true";

    return isAuth ? children : <Navigate to="/unauthorized" />;
}

export default ProtectedRoute;