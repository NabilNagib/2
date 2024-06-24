import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './pages/Footer';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AdminContainer from './pages/AdminContainer';
import GuestsList from './pages/GuestsList';
import './App.css';

const App = () => {
    return (
        <AuthProvider>
            <AppRouter />
            <Footer />
        </AuthProvider>
    );
};

const AppRouter = () => {
    const { isLoggedIn, role } = useAuth();

    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    {isLoggedIn && role === 'admin' && (
                        <>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                        </>
                    )}
                    {isLoggedIn ? (
                        <div>
                            <li><Link to="/logout">Logout</Link></li>
                        </div>
                    ) : (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>
                    )}
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<AdminProtectedRoutes component={<AdminContainer />} />} />
                <Route path="/guests" element={<AdminProtectedRoutes component={<GuestsList />} />} />
                <Route path="/dashboard" element={<AdminProtectedRoutes component={<AdminContainer />} />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

const AdminProtectedRoutes = ({ component }) => {
    const { role } = useAuth();

    if (role !== 'admin') {
        return <Navigate to="/" />;
    }

    return component;
};

const Logout = () => {
    const { logout } = useAuth();
    logout();
    return <Navigate to="/" />;
};

export default App;
