import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchJudgeDemo } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJudgeDemo();
  }, []);

  const loadJudgeDemo = async () => {
    setLoading(true);
    const data = await fetchJudgeDemo();
    if (data && data.user) {
      setUser(data.user);
    }
    setLoading(false);
  };

  const loginUser = (userData) => {
    setUser(userData);
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, loadJudgeDemo, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);