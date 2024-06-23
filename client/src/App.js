// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import GuestsList from './pages/GuestsList';
import HotelsList from './pages/HotelsList';
import AddHotel from './pages/AddHotel';
import AmendHotel from './pages/AmendHotel';
import DeleteHotel from './pages/DeleteHotel';
import BookingDetails from './components/BookingDetails';
import { AuthProvider, useAuth } from './contexts/AuthContext'; // Adjust the path as per your file structure
import './App.css';

const App = () => {
    const { isLoggedIn, userRole } = useAuth(); // Ensure useAuth is imported correctly

    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/booking">Booking</Link></li>
                    {!isLoggedIn ? (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>
                    ) : (
                        <>
                            {userRole === 'admin' && (
                                <li><Link to="/admin">Admin Dashboard</Link></li>
                            )}
                        </>
                    )}
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {isLoggedIn && (
                    <Route path="/admin/*" element={<AdminProtectedRoutes />} />
                )}
                {/* Add other routes as needed */}
                <Route path="*" element={<Navigate to="/" />} /> {/* Fallback for unknown routes */}
            </Routes>
        </Router>
    );
};

const AdminProtectedRoutes = () => {
    const { userRole } = useAuth();

    if (userRole !== 'admin') {
        return <Navigate to="/" />;
    }

    return (
        <>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/list" element={<BookingDetails />} />
            <Route path="/guests" element={<GuestsList />} />
            <Route path="/hotels" element={<HotelsList />} />
            <Route path="/add-hotel" element={<AddHotel />} />
            <Route path="/amend-hotel" element={<AmendHotel />} />
            <Route path="/delete-hotel" element={<DeleteHotel />} />
        </>
    );
};

export default App;
