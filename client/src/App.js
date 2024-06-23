import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingDetails from './pages/BookingDetails';
import Footer from './pages/Footer';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AdminContainer from './pages/AdminContainer';
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
    const { isLoggedIn, email } = useAuth();

    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    {isLoggedIn && email === 'troy@mail.com' && (
                        <>
                            <li><Link to="/admin">Admin Dashboard</Link></li>
                            <li><Link to="/guests">Guests List</Link></li>
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
                <Route path="/admin" element={<AdminProtectedRoutes />} />
                <Route path="/guests" element={<AdminProtectedRoutes />} />
                <Route path="/dashboard" element={<AdminContainer />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

const AdminProtectedRoutes = () => {
    const { email } = useAuth();

    if (email !== 'troy@mail.com') {
        return <Navigate to="/" />;
    }

    return (
        <>
            <Route path="/admin" element={<AdminContainer />} />

        </>
    );
};

const Logout = () => {
    const { logout } = useAuth();
    logout();
    return <Navigate to="/" />;
};

export default App;
