import { createSlice, createSelector } from '@reduxjs/toolkit';
import { calculateCartTotals } from '../../utils/cartCalculations';

/**
 * ARCHITECTURE EXPLANATION (Requirement 1 & 2):
 * - Cart state stores normalized cart items: [{ id, quantity, price, originalPrice, discountPercentage, title, brand, category, thumbnail, stock }]
 * - Price calculations (subtotal, tax 18% GST, shipping fee, discount, grand total) are calculated
 *   using RTK memoized derived selectors (`createSelector`).
 * - Hard browser refreshes preserve cart state via redux-persist.
 */

const initialState = {
  items: [],
  appliedCoupon: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      if (!product || !product.id) return;

      const maxStock = product.stock !== undefined ? product.stock : 99;
      if (maxStock <= 0) return;

      const existingIndex = state.items.findIndex(
        (item) => String(item.id) === String(product.id)
      );

      if (existingIndex > -1) {
        const existingItem = state.items[existingIndex];
        const newQty = existingItem.quantity + quantity;
        state.items[existingIndex].quantity = Math.min(newQty, maxStock);
      } else {
        state.items.push({
          id: product.id,
          title: product.title || product.name || 'Indicart Item',
          brand: product.brand || 'Indicart',
          category: product.category || '',
          price: typeof product.price === 'number' ? product.price : 0,
          originalPrice: product.originalPrice || product.price || 0,
          discountPercentage: product.discountPercentage || 0,
          thumbnail: product.thumbnail || (product.images && product.images[0]) || '',
          stock: maxStock,
          quantity: Math.min(quantity, maxStock),
        });
      }
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => String(item.id) !== String(productId));
    },

    increaseQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.items.find((i) => String(i.id) === String(productId));
      if (item) {
        const maxStock = item.stock !== undefined ? item.stock : 99;
        if (item.quantity < maxStock) {
          item.quantity += 1;
        }
      }
    },

    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.items.find((i) => String(i.id) === String(productId));
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((i) => String(i.id) === String(productId));
      if (item && quantity >= 1) {
        const maxStock = item.stock !== undefined ? item.stock : 99;
        item.quantity = Math.min(quantity, maxStock);
      }
    },

    setAppliedCoupon: (state, action) => {
      state.appliedCoupon = action.payload;
    },

    removeAppliedCoupon: (state) => {
      state.appliedCoupon = null;
    },

    clearCart: (state) => {
      state.items = [];
      state.appliedCoupon = null;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  updateQuantity,
  setAppliedCoupon,
  removeAppliedCoupon,
  clearCart,
} = cartSlice.actions;

// Base Selectors
export const selectCartState = (state) => state.cart;
export const selectCartItems = createSelector(
  [selectCartState],
  (cart) => cart?.items || []
);
export const selectAppliedCoupon = createSelector(
  [selectCartState],
  (cart) => cart?.appliedCoupon || null
);

// Memoized derived selectors for Price Calculations (Requirement 1 & 2)
export const selectCartTotals = createSelector(
  [selectCartItems, selectAppliedCoupon],
  (items, coupon) => calculateCartTotals(items, coupon)
);

export const selectCartItemCount = createSelector(
  [selectCartTotals],
  (totals) => totals.totalItemCount
);

export const selectCartSubtotal = createSelector(
  [selectCartTotals],
  (totals) => totals.subtotal
);

export const selectCartTax = createSelector(
  [selectCartTotals],
  (totals) => totals.tax
);

export const selectCartShipping = createSelector(
  [selectCartTotals],
  (totals) => totals.shipping
);

export const selectCartCouponDiscount = createSelector(
  [selectCartTotals],
  (totals) => totals.couponDiscount
);

export const selectCartGrandTotal = createSelector(
  [selectCartTotals],
  (totals) => totals.grandTotal
);

export default cartSlice.reducer;
