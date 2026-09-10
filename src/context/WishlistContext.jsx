import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS, getStorageItem, setStorageItem } from '../utils/localStorage';
import { useToast } from './ToastContext';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const { showToast } = useToast();
  const [wishlistItems, setWishlistItems] = useState(() => getStorageItem(STORAGE_KEYS.WISHLIST, []));

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.WISHLIST, wishlistItems);
  }, [wishlistItems]);

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => String(item.id) === String(productId));
  };

  const addToWishlist = (product) => {
    if (!product || !product.id) return;

    if (isInWishlist(product.id)) {
      showToast('Item is already in your wishlist');
      return;
    }

    const wishlistItem = {
      id: product.id,
      title: product.title || product.name,
      brand: product.brand || '',
      category: product.category || '',
      price: typeof product.price === 'number' ? product.price : 0,
      discountPercentage: product.discountPercentage || 0,
      thumbnail: product.thumbnail || (product.images && product.images[0]) || '',
      stock: product.stock !== undefined ? product.stock : 10,
      rating: product.rating || 4.5,
    };

    setWishlistItems((prev) => [...prev, wishlistItem]);
    showToast('Added to wishlist!');
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter((item) => String(item.id) !== String(productId)));
    showToast('Removed from wishlist');
  };

  const toggleWishlist = (product) => {
    if (!product || !product.id) return;
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount: wishlistItems.length,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
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
