import { createContext, useEffect, useState } from 'react';
import { fetchNewToken } from '../api/authApi';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('zoho_access_token');
      const expiry = localStorage.getItem('zoho_token_expiry');


      const hasValidToken = token && expiry && Date.now() < (Number(expiry) - 60000);

      if (hasValidToken) {
        setIsAuthenticated(true);
        setLoading(false);
        return; 
      }

      try {
        
        await fetchNewToken();
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Auth initialization failed:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []); 

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};