// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// export const AuthContext = createContext();

// const API_URL = 'http://localhost:5000/api';

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem('token'));
//   const [loading, setLoading] = useState(true);

//   // Set axios default header
//   useEffect(() => {
//     if (token) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       // Decode token to get user info
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       setUser(payload);
//     } else {
//       delete axios.defaults.headers.common['Authorization'];
//       setUser(null);
//     }
//     setLoading(false);
//   }, [token]);

//   const login = async (email, password) => {
//     try {
//       const response = await axios.post(`${API_URL}/auth/login`, { email, password });
//       const { token, ...userData } = response.data;
//       localStorage.setItem('token', token);
//       setToken(token);
//       setUser(userData);
//       return { success: true };
//     } catch (error) {
//       return { 
//         success: false, 
//         message: error.response?.data?.message || 'Login failed' 
//       };
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setToken(null);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout, loading, API_URL }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const API_URL = 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Set axios default header and decode token
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      try {
        // Decode token to get user info
        const payload = JSON.parse(atob(token.split('.')[1]));
        
        // Get stored user data or use token payload
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          // If no stored user, use token payload
          setUser(payload);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        // Clear invalid token
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
      }
    } else {
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token, ...userData } = response.data;
      
      // Store both token and user data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setToken(token);
      setUser(userData);
      
      console.log('Login successful:', userData); // Debug log
      return { success: true, user: userData };
    } catch (error) {
      console.error('Login error:', error.response?.data); // Debug log
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const logout = () => {
    // Clear everything
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
    console.log('Logout successful'); // Debug log
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, API_URL }}>
      {children}
    </AuthContext.Provider>
  );
};