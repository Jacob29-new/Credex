import { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import LoadingPage from '../pages/loadingPage';


function ProtectedRoute({ children }) {
    const location = useLocation();
    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(null);
  
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
          return data;
        } catch (error) {
          console.error('Authentication check failed:', error);
          setIsAuthenticated(false);
          return false;
        }
    };
  
    useEffect(() => {
      checkAuth();
      
      const tokenExpiryTimer = setInterval(async () => {
        const isAuth = await checkAuth();
        if (!isAuth) {
          if (location.pathname === "/user") {
            navigate('/unauthorized');
          } else if(location.pathname === "/admin") {
            navigate('/forbidden');
          } else {
            navigate('/login');
          }
        }
      }, 1000); 
      
      return () => clearTimeout(tokenExpiryTimer);
    }, [location.pathname, navigate]);



    if (isAuthenticated === null) {
        return <LoadingPage />; 
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