import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';

const CategoryPlaceholder = () => {
  const { category } = useParams();

  if (category) {
    return <Navigate to={`/products?category=${encodeURIComponent(category)}`} replace />;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto text-center">
      <Link to="/products" className="text-indigo-600 font-semibold hover:underline">
        View All Products Catalog &rarr;
      </Link>
    </div>
  );
};

export default CategoryPlaceholder;
