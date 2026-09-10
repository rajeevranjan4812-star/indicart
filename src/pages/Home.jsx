import React, { useState } from 'react';
import HeroSection from '../components/home/HeroSection';
import CategoryCard from '../components/home/CategoryCard';
import PromoBanner from '../components/home/PromoBanner';
import FeatureCard from '../components/home/FeatureCard';
import SectionHeading from '../components/common/SectionHeading';
import ProductCard from '../components/product/ProductCard';
import ProductSkeleton from '../components/common/ProductSkeleton';
import ErrorMessage from '../components/common/ErrorMessage';
import Button from '../components/common/Button';

import { useGetProductsQuery } from '../features/products/productsApi';
import { CATEGORIES } from '../data/sampleProducts';

const Home = () => {
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState(null);

  // Fetch real featured products from DummyJSON API via RTK Query
  const { data, isLoading, isError, error, refetch } = useGetProductsQuery({ limit: 6, skip: 0 });
  const featuredProducts = data?.products || [];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setNewsletterStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }
    setNewsletterStatus({ type: 'success', message: 'Thank you for subscribing to Indicart!' });
    setEmail('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-16">
      
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. CATEGORY SECTION */}
      <section>
        <SectionHeading
          title="Shop by Category"
          subtitle="Explore our top categories for quality electronics, fashion, home decor & more."
          actionText="View All Categories"
          actionLink="/products"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* 3. PROMOTIONAL BANNER */}
      <PromoBanner />

      {/* 4. FEATURED PRODUCTS (REAL API DATA) */}
      <section>
        <SectionHeading
          title="Featured Products"
          subtitle="Handpicked bestsellers with top customer reviews and special discounts."
          actionText="Browse All Products"
          actionLink="/products"
        />

        {isLoading ? (
          <ProductSkeleton count={6} />
        ) : isError ? (
          <ErrorMessage
            title="Failed to Load Featured Products"
            message={error?.data?.message || 'Unable to fetch featured items.'}
            onRetry={refetch}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 5. WHY SHOP WITH US */}
      <section>
        <SectionHeading
          title="Why Shop With Indicart"
          subtitle="We are committed to giving you the best online shopping experience possible."
        />
        <FeatureCard />
      </section>

      {/* 6. NEWSLETTER SECTION */}
      <section className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden border border-indigo-800/40 shadow-xl my-12">
        <div className="max-w-2xl mx-auto space-y-4 relative z-10">
          <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-semibold uppercase tracking-wider border border-indigo-500/30">
            Newsletter
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Stay in the loop
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Subscribe to receive exclusive deals, weekly product drops, and special discount codes right in your inbox.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setNewsletterStatus(null);
              }}
              placeholder="Enter your email address..."
              className="w-full px-4 py-3 rounded-lg bg-slate-800/90 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full sm:w-auto px-6 py-3 shrink-0"
            >
              Subscribe
            </Button>
          </form>

          {newsletterStatus && (
            <p className={`text-xs font-medium pt-2 ${newsletterStatus.type === 'error' ? 'text-rose-400' : 'text-emerald-400'}`}>
              {newsletterStatus.message}
            </p>
          )}
        </div>
      </section>

    </div>
  );
};

export default Home;
