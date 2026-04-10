import { createContext, useContext } from 'react';
import { useUser, useAuth as useClerkAuth, useClerk } from '@clerk/clerk-react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// 1. Setup Axios defaults completely outside of React lifecycle!
axios.defaults.baseURL = '/api';

// Global reference so interceptor can access hook-based function
let globalGetToken = null;

// Register interceptor ONCE globally. It will intercept ALL requests.
axios.interceptors.request.use(async (config) => {
  if (globalGetToken) {
    try {
      const token = await globalGetToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error fetching clerk token:", error);
    }
  }
  return config;
});

export const AuthProvider = ({ children }) => {
  const { user } = useUser();
  const { getToken } = useClerkAuth();
  const { signOut } = useClerk();

  // Continuously update the global reference to the latest getToken function
  globalGetToken = getToken;

  const login = () => {
    // Clerk handles login
  };

  const logout = () => {
    signOut();
  };

  return (
    <AuthContext.Provider value={{ user: user ? { id: user.id, name: user.fullName, role: user.publicMetadata?.role || 'patient' } : null, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};