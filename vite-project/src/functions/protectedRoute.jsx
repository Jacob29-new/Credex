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
      
      if (data) {
        setIsAuthenticated(true);
        return true;
      } else {
        setIsAuthenticated(false);
        return false;
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
      setIsAuthenticated(false);
      return false;
    }
  };

  useEffect(() => {
    const checkAuthenticationStatus = async () => {
      const isAuth = await checkAuth();
      if (!isAuth) {
        if (location.pathname.startsWith('/user')) {
          navigate('/unauthorized');
        } else if (location.pathname === "/admin") {
          navigate('/forbidden');
        } else {
          navigate('/login');
        }
      }
    };

    checkAuthenticationStatus(); 

    const tokenExpiryTimer = setInterval(async () => {
      if (isAuthenticated === false) {
        clearInterval(tokenExpiryTimer); 
        return;
      }
      await checkAuthenticationStatus(); 
    }, 1000 * 60);

    return () => clearInterval(tokenExpiryTimer);
  }, [location.pathname, isAuthenticated, navigate]);

  if (isAuthenticated === null) {
    return <LoadingPage />;
  }

  if (isAuthenticated) {
    return children;
  }

  return null;
}

export default ProtectedRoute;
