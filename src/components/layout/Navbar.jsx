import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../common/SearchBar';
import BrandLogo from '../common/BrandLogo';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { currentUser, isAuthenticated, logout } = useAuth();
  const { totalItemCount } = useCart();
  const { wishlistCount } = useWishlist();

  const handleLogout = () => {
    logout();
    setIsUserDropdownOpen(false);
    navigate('/');
  };

  const searchParams = new URLSearchParams(location.search);
  const currentCategorySlug = location.pathname === '/products' ? (searchParams.get('category') || '') : null;
  const isHomeActive = location.pathname === '/' && !location.search;

  const categories = [
    { label: 'HOME', path: '/', slug: null, isHome: true },
    { label: 'SHOP ALL', path: '/products', slug: '' },
    { label: 'ELECTRONICS', path: '/products?category=electronics', slug: 'electronics' },
    { label: 'FASHION', path: '/products?category=fashion', slug: 'fashion' },
    { label: 'HOME & LIVING', path: '/products?category=home-living', slug: 'home-living' },
    { label: 'BEAUTY', path: '/products?category=beauty', slug: 'beauty' },
    { label: 'SPORTS', path: '/products?category=sports', slug: 'sports' },
    { label: 'DEALS', path: '/products?category=deals', slug: 'deals' },
  ];

  return (
    <header className="bg-[#000000] text-white border-b border-neutral-800 sticky top-0 z-50 shadow-lg w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Navbar Bar */}
        <div className="flex items-center justify-between h-20 gap-3 sm:gap-4 md:gap-6 w-full">
          
          {/* 1. FAR LEFT: Custom Font Logo "Indi मार्ट" & Mobile Trigger */}
          <div className="flex items-center space-x-3 shrink-0">
            {/* Mobile Category Trigger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
              className="lg:hidden p-2 text-white hover:text-[#84CC16] focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Custom Font Logo Style */}
            <BrandLogo size="md" />
          </div>

          {/* 2. MIDDLE: Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-3 xl:space-x-4 2xl:space-x-5 text-[11px] xl:text-xs font-black tracking-wider uppercase shrink min-w-0">
            {categories.map((cat, idx) => {
              const isCatActive = cat.isHome
                ? isHomeActive
                : currentCategorySlug !== null && currentCategorySlug === cat.slug;

              return (
                <Link
                  key={idx}
                  to={cat.path}
                  className={`transition-colors duration-200 py-1 whitespace-nowrap ${
                    isCatActive
                      ? 'text-[#84CC16] font-black border-b-2 border-[#84CC16]'
                      : 'text-white hover:text-[#84CC16]'
                  }`}
                >
                  {cat.label}
                </Link>
              );
            })}
          </nav>

          {/* 3. SEARCH BAR */}
          <div className="hidden md:block flex-1 min-w-[140px] max-w-[280px] lg:max-w-[320px]">
            <SearchBar placeholder="Search products..." />
          </div>

          {/* 4. FAR RIGHT ACTIONS (Wishlist, Cart, User) */}
          <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
            
            {/* Mobile Search Toggle Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden text-white hover:text-[#84CC16] p-1.5 transition"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              aria-label="View Wishlist"
              className="relative text-white hover:text-[#84CC16] transition p-1.5 shrink-0"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-[#84CC16] text-[#000000] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link
              to="/cart"
              aria-label="View Shopping Cart"
              className="relative text-white hover:text-[#84CC16] transition p-1.5 shrink-0"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItemCount > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-[#84CC16] text-[#000000] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItemCount}
                </span>
              )}
            </Link>

            {/* User Account Controls */}
            <div className="relative shrink-0">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center space-x-1 text-white hover:text-[#84CC16] transition cursor-pointer p-1.5"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </button>

                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-48 bg-[#121212] text-white rounded-xl shadow-2xl border border-neutral-800 py-2 z-50">
                      <div className="px-4 py-2 border-b border-neutral-800">
                        <p className="text-xs font-bold truncate text-white">{currentUser?.name}</p>
                        <p className="text-[10px] text-neutral-400 truncate">{currentUser?.email}</p>
                      </div>
                      <Link
                        to="/orders"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="block px-4 py-2 text-xs font-semibold hover:bg-neutral-800 text-neutral-200"
                      >
                        My Orders
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-xs font-bold text-rose-500 hover:bg-rose-950/40 cursor-pointer"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  aria-label="User Account"
                  className="text-white hover:text-[#84CC16] transition p-1.5 block"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Expanded Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden pb-3">
            <SearchBar />
          </div>
        )}
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0A0A] border-t border-neutral-800 px-6 py-6 space-y-4 text-white shadow-2xl">
          <div className="space-y-2">
            <div className="text-[10px] font-black uppercase tracking-widest text-[#84CC16] mb-3">Category Navigation</div>
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                to={cat.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-sm font-black tracking-wider uppercase text-white hover:text-[#84CC16] border-b border-neutral-900"
              >
                {cat.label}
              </Link>
            ))}
          </div>

          {!isAuthenticated && (
            <div className="pt-4 flex flex-col space-y-2">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-xs font-extrabold rounded-full border border-neutral-700 text-white"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-xs font-black rounded-full btn-lime-gradient uppercase"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
