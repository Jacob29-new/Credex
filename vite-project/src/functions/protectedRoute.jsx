import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const location = useLocation();

    const username = sessionStorage.getItem("currentUser");
    const isAuth = username && sessionStorage.getItem(username) === "true";

    if(isAuth) {
        return children
    } else {
        if (location.pathname === "/user") {
            return <Navigate to="/unauthorized" />;
        } else if(location.pathname === "/admin") {
            return <Navigate to="/forbidden" />;
        }
        
    }
}

export default ProtectedRoute;