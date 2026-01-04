'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import { Product } from '../contexts/CartContext';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
}

export default function ProductCard({ product, showAddToCart = true }: ProductCardProps) {
  const { theme } = useTheme();
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Determine if this is a collection (ID >= 100) or a product
  const isCollection = product.id >= 100;
  const detailUrl = isCollection ? `/collections/${product.id}` : `/products/${product.id}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product);

    setTimeout(() => {
      setIsAdding(false);
    }, 1500);
  };

  const getBadgeStyles = (badge: string) => {
    switch (badge) {
      case 'Best Seller':
        return 'bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] text-[#0B0B0B] font-bold';
      case 'New':
        return 'bg-blue-500 text-white font-bold';
      case 'Limited':
        return 'bg-purple-500 text-white font-bold';
      case 'Premium':
        return 'bg-purple-500 text-white font-bold';
      case 'Sale':
        return 'bg-green-500 text-white font-bold';
      default:
        return 'bg-gray-500 text-white font-bold';
    }
  };

  return (
    <div className={`group relative flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-500 ${theme === 'dark'
      ? 'bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#D4AF37]/50 hover:shadow-[0_20px_60px_-15px_rgba(212,175,55,0.3)]'
      : 'bg-white border border-gray-100 hover:border-[#D4AF37]/50 hover:shadow-[0_20px_60px_-15px_rgba(212,175,55,0.2)]'
      }`}>
      {/* Badge - Top Right */}
      {product.badge && (
        <div className="absolute top-3 right-3 z-20">
          <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[9px] uppercase tracking-wider shadow-lg ${getBadgeStyles(product.badge)}`}>
            {product.badge}
          </span>
        </div>
      )}

      {/* Product Image */}
      <Link href={detailUrl} className="block relative flex-shrink-0">
        <div className={`relative aspect-square ${theme === 'dark'
          ? 'bg-[#0F0F0F]'
          : 'bg-gray-50'
          }`}>
          <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8">
            <div className="relative w-full h-full flex items-center justify-center">
              {imageError ? (
                <div className="flex flex-col items-center justify-center text-center p-8 w-full h-full">
                  <div className={`w-24 h-24 rounded-lg mb-4 flex items-center justify-center ${theme === 'dark' ? 'bg-[#2A2A2A]' : 'bg-gray-200'}`}>
                    <svg className={`w-12 h-12 ${theme === 'dark' ? 'text-[#F5F3EE]/30' : 'text-[#0B0B0B]/30'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className={`text-xs font-medium px-2 ${theme === 'dark' ? 'text-[#F5F3EE]/50' : 'text-[#0B0B0B]/50'}`}>
                    Image unavailable
                  </p>
                </div>
              ) : (
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="object-contain w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
                  priority
                  unoptimized={product.image.startsWith('http')}
                  onError={() => setImageError(true)}
                />
              )}
            </div>
          </div>

          {/* Gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-${theme === 'dark' ? '[#1A1A1A]' : 'white'
            }/80 pointer-events-none`}></div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex flex-col flex-grow p-4 space-y-3">
        {/* Product Name */}
        <div className="flex-grow">
          {/* Category */}
          {product.category && (
            <div className="mb-2">
              <span className={`inline-flex items-center text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md ${theme === 'dark'
                ? 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30'
                : 'bg-[#D4AF37]/10 text-[#8B6914] border border-[#D4AF37]/30'
                }`}>
                {product.category}
              </span>
            </div>
          )}
          <Link href={detailUrl} className="block">
            <h3 className={`text-lg font-bold transition-colors duration-200 line-clamp-1 leading-tight mb-2 truncate ${theme === 'dark'
              ? 'text-[#F5F3EE] group-hover:text-[#D4AF37]'
              : 'text-[#0B0B0B] group-hover:text-[#D4AF37]'
              }`}>
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating!) ? 'text-[#D4AF37] fill-[#D4AF37]' : i < product.rating! ? 'text-[#D4AF37] fill-[#D4AF37]/30' : 'text-gray-400'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-[#F5F3EE]/80' : 'text-[#0B0B0B]/80'}`}>
                {product.rating.toFixed(1)}
              </span>
              {product.reviewCount && (
                <span className={`text-xs ${theme === 'dark' ? 'text-[#F5F3EE]/50' : 'text-[#0B0B0B]/50'}`}>
                  ({product.reviewCount.toLocaleString()})
                </span>
              )}
            </div>
          )}

          {/* Pricing */}
          <div className="space-y-1.5">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-2xl font-extrabold bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] bg-clip-text text-transparent">
                {product.price}
              </span>
              {product.originalPrice && (
                <span className={`text-base line-through font-medium ${theme === 'dark' ? 'text-[#F5F3EE]/25' : 'text-[#0B0B0B]/25'
                  }`}>
                  {product.originalPrice}
                </span>
              )}
            </div>

            {product.originalPrice && (
              <div>
                <span className={`inline-flex items-center text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md ${theme === 'dark'
                  ? 'bg-red-500 text-white'
                  : 'bg-red-500 text-white'
                  }`}>
                  Sale {(() => {
                    const current = parseFloat(product.price.replace(/[^0-9.]/g, ''));
                    const original = parseFloat(product.originalPrice.replace(/[^0-9.]/g, ''));
                    const savings = ((1 - current / original) * 100).toFixed(0);
                    return `${savings}% OFF`;
                  })()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-1">
          {showAddToCart && (
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${isAdding
                ? 'bg-green-500 text-white scale-[0.98]'
                : `bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] text-[#0B0B0B] hover:scale-[1.02] hover:shadow-xl hover:shadow-[#D4AF37]/40`
                } disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              {isAdding ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Added to Cart</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          )}
          <Link
            href={detailUrl}
            className={`w-full py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-300 border-2 text-center ${theme === 'dark'
              ? 'border-[#3A3A3A] text-[#F5F3EE] bg-transparent hover:border-[#D4AF37] hover:bg-[#D4AF37]/10'
              : 'border-gray-300 text-[#0B0B0B] bg-transparent hover:border-[#D4AF37] hover:bg-[#D4AF37]/10'
              }`}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
