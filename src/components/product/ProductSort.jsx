import React from 'react';

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Featured / Relevance' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Customer Rating: High to Low' },
  { value: 'newest', label: 'Newest Arrivals' },
];

const ProductSort = ({ currentSort = 'relevance', onSortChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="product-sort-select" className="text-xs font-semibold text-slate-500 shrink-0">
        Sort By:
      </label>
      <select
        id="product-sort-select"
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value)}
        className="bg-white border border-slate-200 text-slate-800 text-xs font-medium rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 cursor-pointer shadow-2xs"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductSort;
