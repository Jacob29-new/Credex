import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';


function ProtectedRoute({ children }) {
    const location = useLocation();

    const [isAuthenticated, setIsAuthenticated] = useState(null);
  
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await fetch('http://localhost:3000/authenticated', {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
          });
          const data = await response.json();
          setIsAuthenticated(data);
        } catch (error) {
          console.error('Authentication check failed:', error);
          setIsAuthenticated(false);
        } 
      };
  
      checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; 
    }
    

    if(isAuthenticated) {
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