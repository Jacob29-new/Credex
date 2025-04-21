import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import LoginPage from './pages/loginPage.jsx';
import UserPage from './pages/userPage.jsx';
import ProtectedRoute from './functions/protectedRoute.jsx';
import ErrorPage from './pages/errorPage.jsx';
import HomePage from './pages/homePage.jsx';
import AboutPage from './pages/aboutPage.jsx';
import ServicesPage from './pages/servicesPage.jsx';
import RegisterPage from './pages/registerPage.jsx';
import UnauthorizedPage from './pages/unauthorizedPage.jsx';
import ForbiddenPage from './pages/forbiddenPage.jsx';
import UserHomePage from './pages/userHomePage.jsx';
import UserTaskPage from './pages/userTaskPage.jsx';


function App() {

return (
    <Router>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user" element={<Navigate to="/user/home" />} />
        <Route path="/admin" element={
            <ProtectedRoute>
            <UserPage />
            </ProtectedRoute>
        }/>
        <Route path="/user/home" element={
          <ProtectedRoute>
            <UserHomePage />
          </ProtectedRoute>
        } />
        <Route path="/user/tasks" element={
          <ProtectedRoute>
            <UserTaskPage />
          </ProtectedRoute>
        } />
        <Route path="/error" element={<ErrorPage />}></Route> 
        <Route path="/unauthorized" element={<UnauthorizedPage />}></Route> 
        <Route path="/forbidden" element={<ForbiddenPage />}></Route> 
        <Route path="/about" element={<AboutPage />}></Route> 
        <Route path="/services" element={<ServicesPage />}></Route> 
        <Route path="/register" element={<RegisterPage />}></Route> 
        <Route path="/login" element={<LoginPage />}></Route> 
        <Route path="*" element={<ErrorPage />} />

    </Routes>
    </Router>
);
}

export default App;
