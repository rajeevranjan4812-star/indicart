import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS, getStorageItem, setStorageItem, removeStorageItem } from '../utils/localStorage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => getStorageItem(STORAGE_KEYS.CURRENT_USER, null));
  const [users, setUsers] = useState(() => getStorageItem(STORAGE_KEYS.USERS, []));

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.CURRENT_USER, currentUser);
  }, [currentUser]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.USERS, users);
  }, [users]);

  const register = ({ name, email, password }) => {
    const cleanEmail = email.toLowerCase().trim();
    
    // Check if user already exists
    const existing = users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      return { success: false, message: 'An account with this email address already exists.' };
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      password, // Mock storage only
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCurrentUser(newUser);

    return { success: true, message: 'Account registered successfully!' };
  };

  const login = (email, password) => {
    const cleanEmail = email.toLowerCase().trim();
    const foundUser = users.find((u) => u.email.toLowerCase() === cleanEmail && u.password === password);

    if (!foundUser) {
      return { success: false, message: 'Invalid email or password. Please check your credentials.' };
    }

    setCurrentUser(foundUser);
    return { success: true, message: `Welcome back, ${foundUser.name}!` };
  };

  const logout = () => {
    setCurrentUser(null);
    removeStorageItem(STORAGE_KEYS.CURRENT_USER);
  };

  const isAuthenticated = Boolean(currentUser);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
