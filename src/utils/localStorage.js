/**
 * Centralized LocalStorage keys and helper functions
 */
export const STORAGE_KEYS = {
  USERS: 'indicart_users',
  CURRENT_USER: 'indicart_currentUser',
  CART: 'indicart_cart',
  WISHLIST: 'indicart_wishlist',
  ORDERS: 'indicart_orders',
};

export const getStorageItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading key "${key}" from localStorage:`, error);
    return defaultValue;
  }
};

export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing key "${key}" to localStorage:`, error);
  }
};

export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing key "${key}" from localStorage:`, error);
  }
};
