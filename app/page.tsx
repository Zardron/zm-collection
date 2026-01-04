'use client';

import { useTheme } from './contexts/ThemeContext';
import { Product } from './contexts/CartContext';
import { allProducts } from './data/products';
import HeroSection from './components/HeroSection';
import PromoBanner from './components/PromoBanner';
import ProductCard from './components/ProductCard';
import BenefitsSection from './components/BenefitsSection';
import CategoriesSection from './components/CategoriesSection';
import NewArrivalsSection from './components/NewArrivalsSection';
import BestSellersSection from './components/BestSellersSection';
import TestimonialsSection from './components/TestimonialsSection';
import TrustBadgesSection from './components/TrustBadgesSection';
import SocialFeedSection from './components/SocialFeedSection';

export default function Page() {
  const { theme } = useTheme();

  const featuredProducts: Product[] = allProducts.filter(p => [1, 2, 3, 4].includes(p.id));
  const newArrivals: Product[] = allProducts.filter(p => [5, 6, 7, 8].includes(p.id));
  const bestSellers: Product[] = allProducts.filter(p => [1, 9, 10, 11].includes(p.id));

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0B0B0B]' : 'bg-[#F5F3EE]'
      }`}>
      {/* Hero Section */}
      <HeroSection />

      {/* Promotional Banner */}
      <PromoBanner />

      {/* Categories Section */}
      <CategoriesSection />

      {/* Featured Products Section */}
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
                Beauty Essentials
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
              </span>
            </div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-[1.1]">
              <span className={`block ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
                Featured
              </span>
              <span className="block bg-gradient-to-r from-[#D4AF37] via-[#E6C77A] to-[#D4AF37] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                Products
              </span>
            </h2>
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-[#F5F3EE]/60' : 'text-[#0B0B0B]/60'
              }`}>
              Discover premium beauty products, from luxurious lip tints and perfumes to effective serums and complete makeup collections.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {featuredProducts.map((product, index) => (
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

      {/* New Arrivals Section */}
      <NewArrivalsSection products={newArrivals} />

      {/* Best Sellers Section */}
      <BestSellersSection products={bestSellers} />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Trust Badges Section */}
      <TrustBadgesSection />

      {/* Social Feed Section */}
      <SocialFeedSection />

      {/* Newsletter CTA */}
      <section className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 ${theme === 'dark'
        ? 'bg-gradient-to-b from-[#1A1A1A] to-[#0B0B0B]'
        : 'bg-gradient-to-b from-[#F5F3EE] to-white'
        }`}>
        <div className={`relative overflow-hidden rounded-3xl p-10 md:p-14 lg:p-20 text-center border-2 ${theme === 'dark'
          ? 'bg-gradient-to-br from-[#1A1A1A] via-[#0F0F0F] to-[#0B0B0B] border-[#E6C77A]/20 shadow-2xl'
          : 'bg-gradient-to-br from-white via-[#F5F3EE] to-white border-[#E6C77A]/30 shadow-2xl'
          }`}>
          {/* Background decorative gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/5 via-[#E6C77A]/5 to-[#D4AF37]/5"></div>

          {/* Decorative circles */}
          <div className={`absolute top-10 left-10 w-32 h-32 rounded-full blur-3xl opacity-20 ${theme === 'dark' ? 'bg-[#D4AF37]' : 'bg-[#E6C77A]'
            }`}></div>
          <div className={`absolute bottom-10 right-10 w-40 h-40 rounded-full blur-3xl opacity-20 ${theme === 'dark' ? 'bg-[#E6C77A]' : 'bg-[#D4AF37]'
            }`}></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                <span className={`${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
                  Stay Updated
                </span>
              </h2>
              <p className={`text-lg md:text-xl lg:text-2xl leading-relaxed ${theme === 'dark' ? 'text-[#F5F3EE]/80' : 'text-[#0B0B0B]/70'
                }`}>
                Be the first to know about new beauty products, exclusive launches, and special offers on your favorite items.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto pt-4">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-1 px-6 py-4 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all font-medium ${theme === 'dark'
                  ? 'bg-[#0B0B0B]/50 border-[#E6C77A]/30 text-[#F5F3EE] placeholder-[#F5F3EE]/50 backdrop-blur-sm'
                  : 'bg-white/80 border-[#E6C77A]/50 text-[#0B0B0B] placeholder-[#0B0B0B]/50 backdrop-blur-sm'
                  }`}
              />
              <button className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] text-[#0B0B0B] font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#D4AF37]/50">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
