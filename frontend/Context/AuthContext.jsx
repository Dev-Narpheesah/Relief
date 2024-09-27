

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

 const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const registerUser = async (formData) => {
        try {
            const response = await axios.post('http://localhost:4000/api/user/register-user', formData);
            const userData = response.data;
            setUser(userData); 
        } catch (error) {
            console.error('Registration Error:', error);
        }
    };

    const logout = () => {
        setUser(null); 
    };

 
    return (
        <AuthContext.Provider value={{ user, loading, registerUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext }
