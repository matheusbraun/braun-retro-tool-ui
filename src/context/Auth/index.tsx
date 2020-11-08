import React, { createContext, useState, useCallback } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: () => void;
  removeIsAuthenticated: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

const AuthProvider: React.FC = ({ children }) => {
  const prevAuth = window.localStorage.getItem(
    'braunretrotool:isAuthenticated',
  );
  const [authenticated, setAuthenticated] = useState(Boolean(prevAuth));

  const setIsAuthenticated = useCallback(() => {
    window.localStorage.setItem('braunretrotool:isAuthenticated', 'true');
    setAuthenticated(true);
  }, []);

  const removeIsAuthenticated = useCallback(() => {
    window.localStorage.removeItem('braunretrotool:isAuthenticated');
    setAuthenticated(false);
  }, []);

  const defaultValues = {
    isAuthenticated: authenticated,
    setIsAuthenticated,
    removeIsAuthenticated,
  };

  return (
    <AuthContext.Provider value={defaultValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
