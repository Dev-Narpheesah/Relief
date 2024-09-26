// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
//   const [user, setUser] = useState(null);
  

//   useEffect(() => {
//     if (authToken) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
//       // Fetch user data here if needed
//     } else {
//       delete axios.defaults.headers.common['Authorization'];
//     }
//   }, [authToken]);

  


//   const signOut = () => {
//     localStorage.removeItem('authToken');
//     setAuthToken(null);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ authToken,  signOut, user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthProvider, AuthContext }


import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

 const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const registerUser = async (formData) => {
        try {
            const response = await axios.post('http://localhost:4000/api/user/register-user', formData);
            if (response.data.success) {
                setUser(response.data.user); // Store user data
            }
        } catch (error) {
            console.error('Registration Error:', error);
        }
    };

    const logout = () => {
        setUser(null); // Clear user data on logout
    };

    useEffect(() => {
        // You can also retrieve the user data on component mount (e.g., from localStorage)
        // For this example, we assume no initial user data is present
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, registerUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext }
