import React, { createContext, useContext, useState } from 'react';

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

        const { email } = credentials;

        if (email === 'troy@mail.com') {
            setRole('admin');
            setGuestId(1); 
            setGuestName('Troy'); 
        } else {
            setRole('guest');
            setGuestId(2); 
            setGuestName('Other User'); 
        }

        setIsLoggedIn(true);
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
    