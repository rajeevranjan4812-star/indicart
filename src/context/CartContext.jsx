import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { STORAGE_KEYS, getStorageItem, setStorageItem, removeStorageItem } from '../utils/localStorage';
import { calculateCartTotals } from '../utils/cartCalculations';
import { validateCoupon } from '../utils/coupons';
import { useToast } from './ToastContext';
import { useWishlist } from './WishlistContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { showToast } = useToast();
  const { addToWishlist } = useWishlist();

  const [cartItems, setCartItems] = useState(() => getStorageItem(STORAGE_KEYS.CART, []));
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.CART, cartItems);
  }, [cartItems]);

  const totals = useMemo(
    () => calculateCartTotals(cartItems, appliedCoupon),
    [cartItems, appliedCoupon]
  );

  const addToCart = (product, quantity = 1) => {
    if (!product || !product.id) return;

    const maxStock = product.stock !== undefined ? product.stock : 99;
    if (maxStock <= 0) {
      showToast('Sorry, this product is currently out of stock.');
      return;
    }

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => String(item.id) === String(product.id));

      if (existingIndex > -1) {
        const existingItem = prevItems[existingIndex];
        const newQty = existingItem.quantity + quantity;

        if (newQty > maxStock) {
          showToast(`Maximum available stock is ${maxStock} items.`);
          return prevItems;
        }

        const updated = [...prevItems];
        updated[existingIndex] = {
          ...existingItem,
          quantity: newQty,
        };
        showToast('Cart quantity updated!');
        return updated;
      } else {
        const newItem = {
          id: product.id,
          title: product.title || product.name,
          brand: product.brand || 'Indicart',
          category: product.category || '',
          price: typeof product.price === 'number' ? product.price : 0,
          discountPercentage: product.discountPercentage || 0,
          thumbnail: product.thumbnail || (product.images && product.images[0]) || '',
          stock: maxStock,
          quantity: Math.min(quantity, maxStock),
        };
        showToast('Added to cart!');
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => String(item.id) !== String(productId)));
    showToast('Removed from cart');
  };

  const increaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (String(item.id) === String(productId)) {
          const maxStock = item.stock !== undefined ? item.stock : 99;
          if (item.quantity >= maxStock) {
            showToast(`Maximum stock limit of ${maxStock} reached.`);
            return item;
          }
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (String(item.id) === String(productId)) {
          if (item.quantity <= 1) {
            return item;
          }
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
  };

  const moveToWishlist = (productId) => {
    const itemToMove = cartItems.find((i) => String(i.id) === String(productId));
    if (itemToMove) {
      addToWishlist(itemToMove);
      removeFromCart(productId);
    }
  };

  const applyCouponCode = (code) => {
    const result = validateCoupon(code, totals.subtotal);
    if (result.valid) {
      setAppliedCoupon(result.coupon);
      showToast(result.message);
    } else {
      showToast(result.message);
    }
    return result;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed');
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
    removeStorageItem(STORAGE_KEYS.CART);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItemCount: totals.totalItemCount,
        totals,
        appliedCoupon,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        moveToWishlist,
        applyCouponCode,
        removeCoupon,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
