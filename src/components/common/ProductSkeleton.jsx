import React from 'react';

const ProductSkeleton = ({ count = 8 }) => {
  const skeletons = Array.from({ length: count });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {skeletons.map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border border-slate-200 p-4 space-y-4 animate-pulse flex flex-col justify-between"
        >
          <div className="w-full h-48 bg-slate-200 rounded-lg" />
          <div className="space-y-2">
            <div className="h-3 bg-slate-200 rounded w-1/4" />
            <div className="h-4 bg-slate-200 rounded w-3/4" />
            <div className="h-4 bg-slate-200 rounded w-1/2" />
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="h-6 bg-slate-200 rounded w-1/3" />
            <div className="h-8 bg-slate-200 rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;
