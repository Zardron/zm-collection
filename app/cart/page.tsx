'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import { useState } from 'react';

export default function CartPage() {
  const { theme } = useTheme();
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const [removingId, setRemovingId] = useState<number | null>(null);

  const handleRemove = (productId: number) => {
    setRemovingId(productId);
    setTimeout(() => {
      removeFromCart(productId);
      setRemovingId(null);
    }, 300);
  };

  const formatPrice = (price: number) => {
    return `₱${price.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal > 1500 ? 0 : 150;
  const total = subtotal + shipping;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0B0B0B]' : 'bg-[#F5F3EE]'}`}>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex items-center space-x-2 text-sm">
          <Link
            href="/"
            className={`hover:text-[#D4AF37] transition-colors ${theme === 'dark' ? 'text-[#F5F3EE]/60' : 'text-[#0B0B0B]/60'}`}
          >
            Home
          </Link>
          <span className={theme === 'dark' ? 'text-[#F5F3EE]/40' : 'text-[#0B0B0B]/40'}>/</span>
          <span className={theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}>Shopping Cart</span>
        </nav>
      </div>

      {/* Page Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-4xl md:text-5xl font-extrabold ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
              Shopping Cart
            </h1>
            <p className={`mt-2 text-lg ${theme === 'dark' ? 'text-[#F5F3EE]/60' : 'text-[#0B0B0B]/60'}`}>
              {cart.length === 0 ? 'Your cart is empty' : `${cart.length} item${cart.length !== 1 ? 's' : ''} in your cart`}
            </p>
          </div>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105 ${
                theme === 'dark'
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
                  : 'bg-red-100 text-red-600 hover:bg-red-200 border border-red-200'
              }`}
            >
              Clear Cart
            </button>
          )}
        </div>
      </div>

      {/* Cart Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        {cart.length === 0 ? (
          /* Empty Cart State */
          <div className={`text-center py-20 rounded-3xl border-2 border-dashed ${
            theme === 'dark' 
              ? 'border-[#2A2A2A] bg-[#1A1A1A]/50' 
              : 'border-gray-300 bg-white/50'
          }`}>
            <div className="mb-8">
              <svg 
                className={`mx-auto h-32 w-32 ${theme === 'dark' ? 'text-[#F5F3EE]/20' : 'text-[#0B0B0B]/20'}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
            </div>
            <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
              Your cart is empty
            </h2>
            <p className={`mb-8 max-w-md mx-auto ${theme === 'dark' ? 'text-[#F5F3EE]/60' : 'text-[#0B0B0B]/60'}`}>
              Looks like you haven&apos;t added any products to your cart yet. Start shopping to fill it up!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] text-[#0B0B0B] font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#D4AF37]/40"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Start Shopping
            </Link>
          </div>
        ) : (
          /* Cart with Items */
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className={`flex gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl transition-all duration-300 ${
                    removingId === item.id 
                      ? 'opacity-0 scale-95 transform' 
                      : 'opacity-100 scale-100'
                  } ${
                    theme === 'dark'
                      ? 'bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#D4AF37]/30'
                      : 'bg-white border border-gray-200 hover:border-[#D4AF37]/50 shadow-sm'
                  }`}
                >
                  {/* Product Image */}
                  <Link 
                    href={`/products/${item.id}`}
                    className={`relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-xl overflow-hidden ${
                      theme === 'dark' ? 'bg-[#0F0F0F]' : 'bg-gray-50'
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                      unoptimized={item.image?.startsWith('http')}
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        {item.category && (
                          <span className={`text-xs font-semibold uppercase tracking-wider ${
                            theme === 'dark' ? 'text-[#D4AF37]' : 'text-[#8B6914]'
                          }`}>
                            {item.category}
                          </span>
                        )}
                        <Link 
                          href={`/products/${item.id}`}
                          className={`block mt-1 text-lg sm:text-xl font-bold truncate hover:text-[#D4AF37] transition-colors ${
                            theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'
                          }`}
                        >
                          {item.name}
                        </Link>
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemove(item.id)}
                        className={`p-2 rounded-lg transition-all hover:scale-110 flex-shrink-0 ${
                          theme === 'dark'
                            ? 'text-[#F5F3EE]/40 hover:text-red-400 hover:bg-red-500/20'
                            : 'text-[#0B0B0B]/40 hover:text-red-500 hover:bg-red-100'
                        }`}
                        aria-label="Remove item"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    {/* Price and Quantity */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className={`w-8 h-8 rounded-lg font-bold transition-all flex items-center justify-center ${
                            theme === 'dark'
                              ? 'bg-[#0F0F0F] border border-[#2A2A2A] text-[#F5F3EE] hover:border-[#D4AF37] hover:text-[#D4AF37]'
                              : 'bg-gray-100 border border-gray-200 text-[#0B0B0B] hover:border-[#D4AF37] hover:text-[#D4AF37]'
                          }`}
                        >
                          −
                        </button>
                        <span className={`w-10 text-center font-bold ${
                          theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'
                        }`}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className={`w-8 h-8 rounded-lg font-bold transition-all flex items-center justify-center ${
                            theme === 'dark'
                              ? 'bg-[#0F0F0F] border border-[#2A2A2A] text-[#F5F3EE] hover:border-[#D4AF37] hover:text-[#D4AF37]'
                              : 'bg-gray-100 border border-gray-200 text-[#0B0B0B] hover:border-[#D4AF37] hover:text-[#D4AF37]'
                          }`}
                        >
                          +
                        </button>
                      </div>

                      {/* Item Price */}
                      <div className="text-right">
                        <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] bg-clip-text text-transparent">
                          {item.price}
                        </p>
                        {item.quantity > 1 && (
                          <p className={`text-sm ${theme === 'dark' ? 'text-[#F5F3EE]/50' : 'text-[#0B0B0B]/50'}`}>
                            {formatPrice(parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity)} total
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className={`sticky top-28 p-6 rounded-2xl ${
                theme === 'dark'
                  ? 'bg-[#1A1A1A] border border-[#2A2A2A]'
                  : 'bg-white border border-gray-200 shadow-lg'
              }`}>
                <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className={theme === 'dark' ? 'text-[#F5F3EE]/70' : 'text-[#0B0B0B]/70'}>
                      Subtotal
                    </span>
                    <span className={`font-semibold ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className={theme === 'dark' ? 'text-[#F5F3EE]/70' : 'text-[#0B0B0B]/70'}>
                      Shipping
                    </span>
                    <span className={`font-semibold ${
                      shipping === 0 
                        ? 'text-green-500' 
                        : theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'
                    }`}>
                      {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                    </span>
                  </div>

                  {shipping > 0 && (
                    <div className={`text-xs p-3 rounded-lg ${
                      theme === 'dark' 
                        ? 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20' 
                        : 'bg-[#D4AF37]/10 text-[#8B6914] border border-[#D4AF37]/30'
                    }`}>
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Add {formatPrice(1500 - subtotal)} more for FREE shipping!
                      </span>
                    </div>
                  )}

                  <div className={`border-t pt-4 ${theme === 'dark' ? 'border-[#2A2A2A]' : 'border-gray-200'}`}>
                    <div className="flex justify-between items-center">
                      <span className={`text-lg font-bold ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
                        Total
                      </span>
                      <span className="text-2xl font-extrabold bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] bg-clip-text text-transparent">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <div className="mt-6 space-y-4">
                  <Link
                    href="/auth/signin?redirect=/checkout"
                    className="w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] text-[#0B0B0B] hover:scale-[1.02] hover:shadow-xl hover:shadow-[#D4AF37]/40"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Sign in to Checkout
                  </Link>

                  <p className={`text-center text-sm ${theme === 'dark' ? 'text-[#F5F3EE]/50' : 'text-[#0B0B0B]/50'}`}>
                    Sign in to complete your purchase
                  </p>
                </div>

                {/* Trust Badges */}
                <div className={`mt-6 pt-6 border-t ${theme === 'dark' ? 'border-[#2A2A2A]' : 'border-gray-200'}`}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span className={`text-xs ${theme === 'dark' ? 'text-[#F5F3EE]/70' : 'text-[#0B0B0B]/70'}`}>
                        Secure Checkout
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      <span className={`text-xs ${theme === 'dark' ? 'text-[#F5F3EE]/70' : 'text-[#0B0B0B]/70'}`}>
                        Fast Delivery
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span className={`text-xs ${theme === 'dark' ? 'text-[#F5F3EE]/70' : 'text-[#0B0B0B]/70'}`}>
                        Easy Returns
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      <span className={`text-xs ${theme === 'dark' ? 'text-[#F5F3EE]/70' : 'text-[#0B0B0B]/70'}`}>
                        100% Authentic
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Continue Shopping Section */}
        {cart.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              href="/products"
              className={`inline-flex items-center gap-2 text-lg font-semibold transition-all hover:text-[#D4AF37] ${
                theme === 'dark' ? 'text-[#F5F3EE]/70' : 'text-[#0B0B0B]/70'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

