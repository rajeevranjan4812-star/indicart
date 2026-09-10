import React from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from '../common/BrandLogo';

const Footer = () => {
  return (
    <footer className="bg-[#000000] text-neutral-400 border-t border-neutral-900 mt-auto relative overflow-hidden">
      {/* Background Ambient Glow Effects */}
      <div aria-hidden="true" className="absolute -top-32 -left-32 w-96 h-96 bg-[#84CC16]/10 rounded-full blur-3xl pointer-events-none" />
      <div aria-hidden="true" className="absolute -bottom-32 right-0 w-96 h-96 bg-[#A6E527]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="lg" />
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed font-medium">
              POWER YOUR AMBITION WITH INDIA'S BEST DEALS. Indicart is your premier destination for quality products, electronics, fashion, and lifestyle essentials.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4 pt-2 text-neutral-400">
              <a href="#twitter" aria-label="Twitter" className="hover:text-[#84CC16] transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#facebook" aria-label="Facebook" className="hover:text-[#84CC16] transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/></svg>
              </a>
              <a href="#instagram" aria-label="Instagram" className="hover:text-[#84CC16] transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>

          {/* Company Col */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4">Company</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><a href="#about" className="hover:text-[#84CC16] transition">About Us</a></li>
              <li><a href="#careers" className="hover:text-[#84CC16] transition">Careers</a></li>
              <li><a href="#press" className="hover:text-[#84CC16] transition">Press & Media</a></li>
              <li><a href="#contact" className="hover:text-[#84CC16] transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Customer Service Col */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4">Customer Care</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><a href="#help" className="hover:text-[#84CC16] transition">Help Center</a></li>
              <li><a href="#returns" className="hover:text-[#84CC16] transition">Returns & Exchanges</a></li>
              <li><a href="#shipping" className="hover:text-[#84CC16] transition">Shipping Info</a></li>
              <li><a href="#track" className="hover:text-[#84CC16] transition">Track Order</a></li>
            </ul>
          </div>

          {/* Quick Links Col */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><Link to="/products" className="hover:text-[#84CC16] transition">All Products</Link></li>
              <li><Link to="/cart" className="hover:text-[#84CC16] transition">My Cart</Link></li>
              <li><Link to="/wishlist" className="hover:text-[#84CC16] transition">My Wishlist</Link></li>
              <li><Link to="/orders" className="hover:text-[#84CC16] transition">My Orders</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 font-medium">
          <p>&copy; 2026 Indicart. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#privacy" className="hover:text-neutral-400">Privacy Policy</a>
            <a href="#terms" className="hover:text-neutral-400">Terms of Service</a>
            <a href="#cookies" className="hover:text-neutral-400">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
