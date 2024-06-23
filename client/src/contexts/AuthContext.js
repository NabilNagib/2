import React, { createContext, useContext, useState } from 'react';
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState('guest');
    const [guestId, setGuestId] = useState(null);
    const [guestName, setGuestName] = useState('');

    const login = async (credentials) => {
        if (!credentials || !credentials.email) {
            throw new Error('Login credentials are missing or invalid.');
        }
        try {
            const response = await axios.post('https://one-cb6z.onrender.com/login',credentials)
            
            
            if (response) {
                console.log(response.data)
                setIsLoggedIn(true);
                setGuestId(response.data.guestId);
                setRole(response.data.role);
                setGuestName(response.data.guestName);
                return response.data;
            } else {
                alert( 'Failed to login');
            }
        } catch (error) {
            alert('Failed to login: ' + error.message);
        }

    };

    const logout = async () => {
        setRole('guest');
        setGuestId(null);
        setGuestName('');
        setIsLoggedIn(false);
    };

    const value = {
        isLoggedIn,
        role,
        guestId,
        guestName,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
    