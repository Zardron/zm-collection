'use client';

import { useTheme } from '../contexts/ThemeContext';
import { Product } from '../contexts/CartContext';
import ProductCard from './ProductCard';

interface BestSellersSectionProps {
  products: Product[];
}

export default function BestSellersSection({ products }: BestSellersSectionProps) {
  const { theme } = useTheme();

  return (
    <section className={`relative overflow-hidden ${theme === 'dark'
      ? 'bg-[#0B0B0B]'
      : 'bg-[#F5F3EE]'
      }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, ${theme === 'dark' ? '#D4AF37' : '#000000'
            } 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block mb-5">
            <span className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest ${theme === 'dark'
              ? 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30'
              : 'bg-[#D4AF37]/15 text-[#8B6914] border border-[#D4AF37]/40'
              }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
              Customer Favorites
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
            </span>
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-[1.1]">
            <span className={`block ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
              Best
            </span>
            <span className="block bg-gradient-to-r from-[#D4AF37] via-[#E6C77A] to-[#D4AF37] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Sellers
            </span>
          </h2>
          <p className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-[#F5F3EE]/60' : 'text-[#0B0B0B]/60'
            }`}>
            Discover the products our customers love most. These top-rated items are flying off the shelves!
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} showAddToCart={true} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

