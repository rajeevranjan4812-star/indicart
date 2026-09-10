import { createSelector } from '@reduxjs/toolkit';
import { productsAdapter } from './productsSlice';
import { applyFilterPipeline, extractAvailableBrands } from './productFilters';

// Select the normalized products slice from root state
const selectProductsState = (state) => state.products;

// Export adapter-generated selectors for normalized entities
export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductIds,
  selectTotal: selectProductCount,
} = productsAdapter.getSelectors(selectProductsState);

// Memoized derived selector for filtering and sorting product entities
export const selectFilteredProducts = createSelector(
  [selectAllProducts, (_state, filterParams) => filterParams],
  (allProducts, filterParams) => {
    if (!filterParams) return allProducts;
    return applyFilterPipeline(allProducts, filterParams);
  }
);

// Memoized derived selector for extracting unique available brands
export const selectAvailableBrands = createSelector(
  [selectAllProducts],
  (allProducts) => extractAvailableBrands(allProducts)
);
