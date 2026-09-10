import React, { createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  loginUserThunk,
  registerUserThunk,
  logoutUserThunk,
  selectCurrentUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
} from '../features/auth/authSlice';
import { useToast } from './ToastContext';

/**
 * AuthContext Bridge Hook:
 * Connects components calling `useAuth()` directly to Redux Toolkit authSlice.
 */
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const login = async (email, password) => {
    try {
      const user = await dispatch(loginUserThunk({ email, password })).unwrap();
      showToast(`Welcome back, ${user.name || 'shopper'}!`);
      return { success: true, user, message: `Welcome back, ${user.name}!` };
    } catch (errMsg) {
      const message = typeof errMsg === 'string' ? errMsg : 'Invalid email or password.';
      showToast(message);
      return { success: false, message };
    }
  };

  const register = async ({ name, email, password }) => {
    try {
      const user = await dispatch(registerUserThunk({ name, email, password })).unwrap();
      showToast('Account created successfully!');
      return { success: true, user, message: 'Account registered successfully!' };
    } catch (errMsg) {
      const message = typeof errMsg === 'string' ? errMsg : 'Registration failed.';
      showToast(message);
      return { success: false, message };
    }
  };

  const logout = async () => {
    await dispatch(logoutUserThunk());
    showToast('Logged out successfully.');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        loading,
        error,
        login,
        register,
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
