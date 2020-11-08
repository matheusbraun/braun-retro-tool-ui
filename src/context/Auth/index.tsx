import React, { createContext, useState, useCallback } from 'react';

type AuthContextType = {
  username: string;
  isAuthenticated: boolean;
  setNewUsername: (username: string) => void;
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

  const prevUsername =
    window.localStorage.getItem('braunretrotool:username') || '';
  const [username, setUsername] = useState(prevUsername);

  const setNewUsername = useCallback((username: string) => {
    window.localStorage.setItem('braunretrotool:username', username);
    setUsername(username);
  }, []);

  const setIsAuthenticated = useCallback(() => {
    window.localStorage.setItem('braunretrotool:isAuthenticated', 'true');
    setAuthenticated(true);
  }, []);

  const removeIsAuthenticated = useCallback(() => {
    window.localStorage.removeItem('braunretrotool:isAuthenticated');
    window.localStorage.removeItem('braunretrotool:username');
    setAuthenticated(false);
    setUsername('');
  }, []);

  const defaultValues = {
    username,
    isAuthenticated: authenticated,
    setNewUsername,
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
