import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { productsApi } from './productsApi';

/**
 * ARCHITECTURE EXPLANATION:
 * Why createEntityAdapter alongside RTK Query?
 * - RTK Query manages SERVER STATE (API fetching, request caching, loading & error flags).
 * - createEntityAdapter manages NORMALIZED CLIENT ENTITY STATE ({ ids: [], entities: {} }).
 * - Storing products in a normalized entity dictionary ensures each product is stored EXACTLY ONCE by ID.
 *   This avoids array duplication across UI components and enables O(1) instant entity lookup.
 * - As RTK Query endpoints fetch product payloads, extraReducers synchronizes the
 *   entities into the normalized adapter map via upsertMany / upsertOne.
 */

export const productsAdapter = createEntityAdapter({
  selectId: (product) => product.id,
});

const productsSlice = createSlice({
  name: 'products',
  initialState: productsAdapter.getInitialState({
    totalProducts: 0,
  }),
  reducers: {},
  extraReducers: (builder) => {
    // Synchronize products fetched from RTK Query into normalized entity store
    builder.addMatcher(
      productsApi.endpoints.getProducts.matchFulfilled,
      (state, action) => {
        if (action.payload?.products) {
          productsAdapter.upsertMany(state, action.payload.products);
          state.totalProducts = action.payload.total || action.payload.products.length;
        }
      }
    );
    builder.addMatcher(
      productsApi.endpoints.searchProducts.matchFulfilled,
      (state, action) => {
        if (action.payload?.products) {
          productsAdapter.upsertMany(state, action.payload.products);
          state.totalProducts = action.payload.total || action.payload.products.length;
        }
      }
    );
    builder.addMatcher(
      productsApi.endpoints.getProductsByCategory.matchFulfilled,
      (state, action) => {
        if (action.payload?.products) {
          productsAdapter.upsertMany(state, action.payload.products);
          state.totalProducts = action.payload.total || action.payload.products.length;
        }
      }
    );
    builder.addMatcher(
      productsApi.endpoints.getProductById.matchFulfilled,
      (state, action) => {
        if (action.payload) {
          productsAdapter.upsertOne(state, action.payload);
        }
      }
    );
  },
});

export default productsSlice.reducer;
