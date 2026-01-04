'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  return (
    <nav className={`sticky top-0 z-50 w-full border-b backdrop-blur-xl shadow-lg transition-colors duration-300 ${
      theme === 'dark' 
        ? 'border-[#E6C77A]/30 bg-[#0B0B0B]/95 supports-[backdrop-filter]:bg-[#0B0B0B]/90 shadow-[#D4AF37]/10'
        : 'border-[#E6C77A]/50 bg-[#F5F3EE]/95 supports-[backdrop-filter]:bg-[#F5F3EE]/90 shadow-[#D4AF37]/20'
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 group transition-transform hover:scale-105"
          >
            <div className="relative">
              <Image
                src="/ZM-logo.png"
                alt="ZM Collection Logo"
                width={48}
                height={48}
                className="h-12 w-12 object-contain transition-transform group-hover:rotate-3"
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] bg-clip-text text-transparent">
              ZM Collection
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            <Link
              href="/"
              className={`relative px-4 py-2 text-sm font-semibold transition-all duration-200 hover:text-[#D4AF37] group ${
                pathname === '/'
                  ? 'text-[#D4AF37]'
                  : theme === 'dark' 
                    ? 'text-[#F5F3EE]' 
                    : 'text-[#0B0B0B]'
              }`}
            >
              Home
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] transition-all duration-200 ${
                pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            <Link
              href="/products"
              className={`relative px-4 py-2 text-sm font-semibold transition-all duration-200 hover:text-[#D4AF37] group ${
                pathname.startsWith('/products')
                  ? 'text-[#D4AF37]'
                  : theme === 'dark' 
                    ? 'text-[#F5F3EE]' 
                    : 'text-[#0B0B0B]'
              }`}
            >
              Products
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] transition-all duration-200 ${
                pathname.startsWith('/products') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            <Link
              href="/collections"
              className={`relative px-4 py-2 text-sm font-semibold transition-all duration-200 hover:text-[#D4AF37] group ${
                pathname.startsWith('/collections')
                  ? 'text-[#D4AF37]'
                  : theme === 'dark' 
                    ? 'text-[#F5F3EE]' 
                    : 'text-[#0B0B0B]'
              }`}
            >
              Collections
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] transition-all duration-200 ${
                pathname.startsWith('/collections') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            <Link
              href="/about"
              className={`relative px-4 py-2 text-sm font-semibold transition-all duration-200 hover:text-[#D4AF37] group ${
                pathname === '/about'
                  ? 'text-[#D4AF37]'
                  : theme === 'dark' 
                    ? 'text-[#F5F3EE]' 
                    : 'text-[#0B0B0B]'
              }`}
            >
              About
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] transition-all duration-200 ${
                pathname === '/about' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            <Link
              href="/contact"
              className={`relative px-4 py-2 text-sm font-semibold transition-all duration-200 hover:text-[#D4AF37] group ${
                pathname === '/contact'
                  ? 'text-[#D4AF37]'
                  : theme === 'dark' 
                    ? 'text-[#F5F3EE]' 
                    : 'text-[#0B0B0B]'
              }`}
            >
              Contact
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] transition-all duration-200 ${
                pathname === '/contact' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-2">
            {/* Search Icon */}
            <button
              className={`hidden sm:flex items-center justify-center p-2.5 rounded-lg transition-all duration-200 hover:text-[#D4AF37] hover:scale-110 ${
                theme === 'dark' 
                  ? 'text-[#F5F3EE] hover:bg-[#1A1A1A]' 
                  : 'text-[#0B0B0B] hover:bg-[#E6C77A]/20'
              }`}
              aria-label="Search"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              className={`flex items-center justify-center p-2.5 rounded-lg transition-all duration-200 hover:text-[#D4AF37] hover:scale-110 ${
                theme === 'dark' 
                  ? 'text-[#F5F3EE] hover:bg-[#1A1A1A]' 
                  : 'text-[#0B0B0B] hover:bg-[#E6C77A]/20'
              }`}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg
                  className="h-5 w-5 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
            </button>

            {/* Account Icon */}
            <Link
              href="/account"
              className={`flex items-center justify-center p-2.5 rounded-lg transition-all duration-200 hover:text-[#D4AF37] hover:scale-110 ${
                theme === 'dark' 
                  ? 'text-[#F5F3EE] hover:bg-[#1A1A1A]' 
                  : 'text-[#0B0B0B] hover:bg-[#E6C77A]/20'
              }`}
              aria-label="Account"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>

            {/* Shopping Cart Icon */}
            <Link
              href="/cart"
              className={`relative flex items-center justify-center p-2.5 rounded-lg transition-all duration-200 hover:text-[#D4AF37] hover:scale-110 ${
                theme === 'dark' 
                  ? 'text-[#F5F3EE] hover:bg-[#1A1A1A]' 
                  : 'text-[#0B0B0B] hover:bg-[#E6C77A]/20'
              }`}
              aria-label="Shopping Cart"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {/* Cart badge */}
              {cartCount > 0 && (
                <span className={`absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] text-[10px] font-bold shadow-lg ring-2 ${
                  theme === 'dark' ? 'text-[#0B0B0B] ring-[#0B0B0B]' : 'text-[#0B0B0B] ring-[#F5F3EE]'
                }`}>
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className={`md:hidden flex items-center justify-center p-2.5 rounded-lg transition-all duration-200 hover:text-[#D4AF37] ${
                theme === 'dark' 
                  ? 'text-[#F5F3EE] hover:bg-[#1A1A1A]' 
                  : 'text-[#0B0B0B] hover:bg-[#E6C77A]/20'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg
                  className="h-6 w-6 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className={`md:hidden border-t animate-in slide-in-from-top-2 duration-200 ${
            theme === 'dark' ? 'border-[#E6C77A]/30' : 'border-[#E6C77A]/50'
          }`}>
            <div className="space-y-1 px-2 pb-4 pt-3">
              <Link
                href="/"
                className={`block rounded-lg px-4 py-3 text-base font-semibold transition-all duration-200 hover:text-[#D4AF37] hover:translate-x-1 ${
                  pathname === '/'
                    ? 'text-[#D4AF37] bg-gradient-to-r from-[#D4AF37]/10 to-[#E6C77A]/10'
                    : theme === 'dark' 
                      ? 'text-[#F5F3EE] hover:bg-[#1A1A1A]' 
                      : 'text-[#0B0B0B] hover:bg-[#E6C77A]/20'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className={`block rounded-lg px-4 py-3 text-base font-semibold transition-all duration-200 hover:text-[#D4AF37] hover:translate-x-1 ${
                  pathname.startsWith('/products')
                    ? 'text-[#D4AF37] bg-gradient-to-r from-[#D4AF37]/10 to-[#E6C77A]/10'
                    : theme === 'dark' 
                      ? 'text-[#F5F3EE] hover:bg-[#1A1A1A]' 
                      : 'text-[#0B0B0B] hover:bg-[#E6C77A]/20'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/collections"
                className={`block rounded-lg px-4 py-3 text-base font-semibold transition-all duration-200 hover:text-[#D4AF37] hover:translate-x-1 ${
                  pathname.startsWith('/collections')
                    ? 'text-[#D4AF37] bg-gradient-to-r from-[#D4AF37]/10 to-[#E6C77A]/10'
                    : theme === 'dark' 
                      ? 'text-[#F5F3EE] hover:bg-[#1A1A1A]' 
                      : 'text-[#0B0B0B] hover:bg-[#E6C77A]/20'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Collections
              </Link>
              <Link
                href="/about"
                className={`block rounded-lg px-4 py-3 text-base font-semibold transition-all duration-200 hover:text-[#D4AF37] hover:translate-x-1 ${
                  pathname === '/about'
                    ? 'text-[#D4AF37] bg-gradient-to-r from-[#D4AF37]/10 to-[#E6C77A]/10'
                    : theme === 'dark' 
                      ? 'text-[#F5F3EE] hover:bg-[#1A1A1A]' 
                      : 'text-[#0B0B0B] hover:bg-[#E6C77A]/20'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`block rounded-lg px-4 py-3 text-base font-semibold transition-all duration-200 hover:text-[#D4AF37] hover:translate-x-1 ${
                  pathname === '/contact'
                    ? 'text-[#D4AF37] bg-gradient-to-r from-[#D4AF37]/10 to-[#E6C77A]/10'
                    : theme === 'dark' 
                      ? 'text-[#F5F3EE] hover:bg-[#1A1A1A]' 
                      : 'text-[#0B0B0B] hover:bg-[#E6C77A]/20'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
