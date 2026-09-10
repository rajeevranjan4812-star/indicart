import React, { createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addToWishlist as addToWishlistAction,
  removeFromWishlist as removeFromWishlistAction,
  toggleWishlist as toggleWishlistAction,
  clearWishlist as clearWishlistAction,
  selectWishlistItems,
  selectWishlistCount,
} from '../features/wishlist/wishlistSlice';
import { useToast } from './ToastContext';

/**
 * WishlistContext Bridge Hook:
 * Connects components using `useWishlist()` directly to Redux Toolkit wishlistSlice.
 */
const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const wishlistItems = useSelector(selectWishlistItems);
  const wishlistCount = useSelector(selectWishlistCount);

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => String(item.id) === String(productId));
  };

  const addToWishlist = (product) => {
    if (!product || !product.id) return;
    dispatch(addToWishlistAction(product));
    showToast('Saved to wishlist!');
  };

  const removeFromWishlist = (productId) => {
    dispatch(removeFromWishlistAction(productId));
    showToast('Removed from wishlist');
  };

  const toggleWishlist = (product) => {
    if (!product || !product.id) return;
    const exists = isInWishlist(product.id);
    dispatch(toggleWishlistAction(product));
    showToast(exists ? 'Removed from wishlist' : 'Saved to wishlist!');
  };

  const clearWishlist = () => {
    dispatch(clearWishlistAction());
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
