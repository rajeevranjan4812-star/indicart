import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  useGetProductsQuery,
  useSearchProductsQuery,
} from '../features/products/productsApi';
import {
  parseFilterParams,
  applyFilterPipeline,
  extractAvailableBrands,
  countActiveFilters,
  CATEGORY_MAP,
  getCategoryDisplayLabel,
  getCompatibleBrandsForCategory,
} from '../features/products/productFilters';

import ProductFilters from '../components/product/ProductFilters';
import ProductSort from '../components/product/ProductSort';
import ActiveFilters from '../components/product/ActiveFilters';
import ProductGrid from '../components/product/ProductGrid';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Parse filter params directly from URL parameters (single source of truth)
  const filterParams = useMemo(() => parseFilterParams(searchParams), [searchParams]);

  const isSearch = Boolean(filterParams.search);
  const isCategory = Boolean(filterParams.category);

  // Primary API query: load complete base catalog items
  const listQueryResult = useGetProductsQuery({ limit: 0, skip: 0 });

  // Optional search endpoint query
  const searchQueryResult = useSearchProductsQuery(
    { q: filterParams.search, limit: 100, skip: 0 },
    { skip: !isSearch }
  );

  const isLoading = listQueryResult.isLoading || (isSearch && searchQueryResult.isLoading);
  const isFetching = listQueryResult.isFetching || (isSearch && searchQueryResult.isFetching);
  const isError = listQueryResult.isError && (!listQueryResult.data || listQueryResult.data.products?.length === 0);

  // Combine and deduplicate products from list and search results
  const rawProducts = useMemo(() => {
    const listProds = listQueryResult.data?.products || [];
    const searchProds = isSearch ? searchQueryResult.data?.products || [] : [];

    if (!isSearch || searchProds.length === 0) {
      return listProds;
    }

    const map = new Map();
    [...listProds, ...searchProds].forEach((p) => {
      if (p && p.id) map.set(p.id, p);
    });
    return Array.from(map.values());
  }, [listQueryResult.data, searchQueryResult.data, isSearch]);

  // Category-scoped products for contextual sidebar options (category-aware brand list)
  const categoryScopedProducts = useMemo(() => {
    if (!filterParams.category) return rawProducts;
    return applyFilterPipeline(rawProducts, { category: filterParams.category });
  }, [rawProducts, filterParams.category]);

  // Extract available brands for filter options scoped to the active category
  const availableBrands = useMemo(
    () => extractAvailableBrands(categoryScopedProducts),
    [categoryScopedProducts]
  );

  // Apply pure client-side filter and sorting pipeline across dataset
  const filteredAndSortedProducts = useMemo(
    () => applyFilterPipeline(rawProducts, filterParams),
    [rawProducts, filterParams]
  );

  // Pagination calculations over filtered dataset
  const limit = 12;
  const totalFilteredCount = filteredAndSortedProducts.length;
  const totalPages = Math.ceil(totalFilteredCount / limit) || 1;
  const currentPage = Math.min(filterParams.page, totalPages);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * limit;
    return filteredAndSortedProducts.slice(start, start + limit);
  }, [filteredAndSortedProducts, currentPage, limit]);

  // Helper to update URL search parameters
  const updateUrlParams = (newParams) => {
    const params = new URLSearchParams();

    if (newParams.search) params.set('search', newParams.search);
    if (newParams.category) params.set('category', newParams.category);
    if (newParams.brand && newParams.brand.length > 0) {
      params.set('brand', newParams.brand.join(','));
    }
    if (newParams.minPrice !== null && newParams.minPrice !== undefined && newParams.minPrice !== '') {
      params.set('minPrice', newParams.minPrice.toString());
    }
    if (newParams.maxPrice !== null && newParams.maxPrice !== undefined && newParams.maxPrice !== '') {
      params.set('maxPrice', newParams.maxPrice.toString());
    }
    if (newParams.rating !== null && newParams.rating !== undefined && newParams.rating !== '') {
      params.set('rating', newParams.rating.toString());
    }
    if (newParams.sort && newParams.sort !== 'relevance') {
      params.set('sort', newParams.sort);
    }
    if (newParams.page && newParams.page > 1) {
      params.set('page', newParams.page.toString());
    }

    setSearchParams(params);
  };

  const handleFilterChange = (updatedParams) => {
    updateUrlParams(updatedParams);
  };

  const handleSortChange = (newSort) => {
    updateUrlParams({ ...filterParams, sort: newSort, page: 1 });
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    updateUrlParams({ ...filterParams, page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearAllFilters = () => {
    // Preserve search query if active while clearing other filters
    updateUrlParams({
      search: filterParams.search,
      category: '',
      brand: [],
      minPrice: null,
      maxPrice: null,
      rating: null,
      sort: 'relevance',
      page: 1,
    });
  };

  const activeFilterCount = countActiveFilters(filterParams);

  // Auto-clear incompatible brand filters when category changes (Bug 2 Fix)
  useEffect(() => {
    if (filterParams.category && filterParams.brand && filterParams.brand.length > 0 && rawProducts.length > 0) {
      const compatibleBrands = getCompatibleBrandsForCategory(rawProducts, filterParams.category, filterParams.brand);
      if (compatibleBrands.length !== filterParams.brand.length) {
        updateUrlParams({
          ...filterParams,
          brand: compatibleBrands,
          page: 1,
        });
      }
    }
  }, [filterParams.category, rawProducts]);

  // Check if Books category is selected (DummyJSON has no books data)
  const isBooksCategory = filterParams.category?.toLowerCase() === 'books';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Catalog Title & Header Bar (Scrudix Glass Hero Panel) */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        {/* Subtle decorative purple glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#5B3DF5]/10 to-[#F4D44D]/10 blur-3xl pointer-events-none rounded-full" />
        
        <div className="space-y-1 relative z-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#151827] capitalize">
            {filterParams.search
              ? `Search Results for "${filterParams.search}"`
              : filterParams.category
              ? `${getCategoryDisplayLabel(filterParams.category)} Products`
              : 'Product Discovery'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            {filterParams.search
              ? `Showing results matching "${filterParams.search}"`
              : 'Find products you\'ll love with delivered simplicity.'}
          </p>
          <div className="pt-2 text-xs font-semibold text-slate-400">
            {isLoading || isFetching
              ? 'Loading products...'
              : `Showing ${totalFilteredCount > 0 ? (currentPage - 1) * limit + 1 : 0} - ${Math.min(
                  currentPage * limit,
                  totalFilteredCount
                )} of ${totalFilteredCount} products`}
          </div>
        </div>

        {/* Desktop & Mobile Sort Controls */}
        <div className="flex items-center space-x-3 relative z-10 shrink-0">
          {/* Mobile Filter Drawer Button */}
          <button
            type="button"
            onClick={() => setIsMobileFiltersOpen(true)}
            className="lg:hidden px-4 py-2.5 bg-slate-900 text-white rounded-full text-xs font-bold flex items-center space-x-2 transition shadow-sm"
          >
            <svg className="w-4 h-4 text-[#F4D44D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="px-1.5 py-0.5 bg-[#5B3DF5] text-white rounded-full text-[10px]">
                {activeFilterCount}
              </span>
            )}
          </button>

          <ProductSort currentSort={filterParams.sort} onSortChange={handleSortChange} />
        </div>
      </div>

      {/* Main Catalog Layout (2 Columns on Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Sidebar (Left Column) */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-24">
          <ProductFilters
            filterParams={filterParams}
            availableBrands={availableBrands}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearAllFilters}
          />
        </aside>

        {/* Catalog Main Content (Right Column) */}
        <main className="lg:col-span-9 space-y-6">
          {/* Active Filter Chips */}
          <ActiveFilters
            filterParams={filterParams}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearAllFilters}
          />

          {/* Special EmptyState Handling for Books Category */}
          {isBooksCategory ? (
            <EmptyState
              title="Books & Stationeries has no corresponding DummyJSON category/data."
              message="DummyJSON API does not provide a native books or stationery category in its product dataset. Please explore Electronics, Fashion, Beauty, or Home categories."
              actionText="Clear Category Filter"
              onAction={() => handleFilterChange({ ...filterParams, category: '', page: 1 })}
            />
          ) : (
            /* Product Grid Container */
            <ProductGrid
              products={paginatedProducts}
              isLoading={isLoading || isFetching}
              isError={isError}
              error={listQueryResult.error}
              onRetry={listQueryResult.refetch}
              onClearFilters={handleClearAllFilters}
              searchQuery={filterParams.search}
            />
          )}

          {/* Pagination Controls */}
          {!isLoading && !isFetching && !isError && !isBooksCategory && totalPages > 1 && (
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between mt-8">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                &larr; Previous
              </Button>

              <div className="flex items-center space-x-1 sm:space-x-2 text-xs font-semibold text-slate-700">
                <span>Page</span>
                <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 font-bold rounded-md border border-indigo-100">
                  {currentPage}
                </span>
                <span>of {totalPages}</span>
              </div>

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage >= totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next &rarr;
              </Button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Slide-Over Filter Drawer Modal */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end lg:hidden">
          <div className="w-full max-w-xs bg-white h-full shadow-2xl p-4 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-900">Filters & Options</h3>
                <button
                  type="button"
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-700"
                >
                  ✕
                </button>
              </div>

              <ProductFilters
                filterParams={filterParams}
                availableBrands={availableBrands}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearAllFilters}
                isMobile={true}
                onCloseMobile={() => setIsMobileFiltersOpen(false)}
              />
            </div>

            <div className="pt-4 border-t border-slate-200 mt-4">
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => setIsMobileFiltersOpen(false)}
              >
                Apply & Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
