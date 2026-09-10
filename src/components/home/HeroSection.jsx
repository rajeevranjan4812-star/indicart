import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden my-6">
      {/* Background Energy Backsplash */}
      <div className="absolute inset-0 bg-gradient-to-r from-lime-100/60 via-emerald-50/40 to-yellow-100/50 rounded-3xl pointer-events-none" />

      {/* Main Grid Layout */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Clean White Hero Card (GiGi Style Overlay) */}
        <div className="lg:col-span-7 bg-white/95 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-100 space-y-6 relative z-10">
          
          {/* Main Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0A0A0A] uppercase leading-[1.05]">
              POWER YOUR AMBITION <br />
              <span className="text-[#84CC16]">WITH BEST INDIAN DEALS</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl font-medium pt-2">
              Boost your everyday lifestyle with India's cleanest and most reliable e-commerce shopping platform. 100% genuine products delivered simply.
            </p>
          </div>

          {/* Feature Highlights Grid (Lime Icons) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-extrabold text-slate-800">
            <div className="flex items-center space-x-2">
              <span className="text-[#84CC16] text-base">⚡</span>
              <span>100% Genuine Brands</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[#84CC16] text-base">⚡</span>
              <span>Fast Express Shipping</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[#84CC16] text-base">⚡</span>
              <span>Best Price Guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[#84CC16] text-base">⚡</span>
              <span>Easy 30-Day Returns</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Link to="/products">
              <button
                type="button"
                className="btn-lime-gradient px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-wider text-[#0A0A0A] shadow-lg hover:shadow-xl transition cursor-pointer"
              >
                Explore Products
              </button>
            </Link>

            <Link to="/products?category=deals">
              <button
                type="button"
                className="px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-wider text-[#0A0A0A] bg-[#A6E527]/30 hover:bg-[#A6E527]/50 border border-[#84CC16]/40 transition cursor-pointer flex items-center space-x-2"
              >
                <span>Shop Deals & Offers</span>
                <span className="text-base">⚡</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Right Column: Visual Product Showcase Hero Container */}
        <div className="lg:col-span-5 relative flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-neutral-800 text-center space-y-6 overflow-hidden">
            {/* Ambient Lime Glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#84CC16]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-3 relative z-10">
              <div className="w-16 h-16 bg-[#84CC16] text-[#000000] rounded-2xl flex items-center justify-center font-black text-3xl mx-auto shadow-lg">
                ⚡
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-white">
                INDIAN BESTSELLERS
              </h3>
              <p className="text-xs text-neutral-400 font-medium">
                Top rated smartphones, fashion, audio & lifestyle goods delivered with lightning speed.
              </p>
            </div>

            <div className="pt-2 relative z-10">
              <Link to="/products">
                <button
                  type="button"
                  className="w-full btn-lime-gradient py-3 rounded-full font-black text-xs uppercase text-[#000000] shadow-md cursor-pointer"
                >
                  Browse Catalog
                </button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
