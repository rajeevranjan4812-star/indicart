import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      if (!product || !product.id) return;
      const exists = state.items.some((item) => String(item.id) === String(product.id));
      if (!exists) {
        state.items.push({
          id: product.id,
          title: product.title || product.name || 'Indicart Item',
          brand: product.brand || 'Indicart',
          category: product.category || '',
          price: typeof product.price === 'number' ? product.price : 0,
          originalPrice: product.originalPrice || product.price || 0,
          discountPercentage: product.discountPercentage || 0,
          thumbnail: product.thumbnail || (product.images && product.images[0]) || '',
          stock: product.stock !== undefined ? product.stock : 10,
        });
      }
    },

    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => String(item.id) !== String(productId));
    },

    toggleWishlist: (state, action) => {
      const product = action.payload;
      if (!product || !product.id) return;
      const index = state.items.findIndex((item) => String(item.id) === String(product.id));
      if (index > -1) {
        state.items.splice(index, 1);
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
          stock: product.stock !== undefined ? product.stock : 10,
        });
      }
    },

    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
} = wishlistSlice.actions;

// Selectors
export const selectWishlistState = (state) => state.wishlist;
export const selectWishlistItems = createSelector(
  [selectWishlistState],
  (wishlist) => wishlist?.items || []
);
export const selectWishlistCount = createSelector(
  [selectWishlistItems],
  (items) => items.length
);
export const selectIsInWishlist = createSelector(
  [selectWishlistItems, (_state, productId) => productId],
  (items, productId) => items.some((item) => String(item.id) === String(productId))
);

export default wishlistSlice.reducer;
