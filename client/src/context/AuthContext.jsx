import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // ✅ correct import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) {
      try {
        jwtDecode(token); // ✅ decode safely
      } catch (err) {
        console.warn("Invalid token, clearing...");
        setToken(null);
        localStorage.removeItem('token');
      }
    }
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
