'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '../contexts/ThemeContext';
import { useMemo, useState } from 'react';
import { allCollections } from '../data/collections';
import { allProducts } from '../data/products';

// Collection category images
const collectionCategoryImages: Record<string, string> = {
  "Men's T-Shirt": 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop',
  "Men's Shorts": 'https://images.unsplash.com/photo-1591195853828-11b59e3b3c02?w=600&h=600&fit=crop',
  "Women's Blouse": 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=600&h=600&fit=crop',
  "Women's Dress": 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop',
  "Men's Pants": 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=600&fit=crop',
};

// Collection category descriptions
const collectionCategoryDescriptions: Record<string, string> = {
  "Men's T-Shirt": 'Classic and modern styles',
  "Men's Shorts": 'Comfortable and versatile',
  "Women's Blouse": 'Elegant and sophisticated',
  "Women's Dress": 'Timeless elegance',
  "Men's Pants": 'Premium quality fit',
};

// Product category images
const productCategoryImages: Record<string, string> = {
  'Lip Tint': 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&h=600&fit=crop',
  'Perfume': 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=600&fit=crop',
  'Serum': 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop',
  'Makeup': 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&h=600&fit=crop',
};

// Product category descriptions
const productCategoryDescriptions: Record<string, string> = {
  'Lip Tint': 'Long-lasting colors',
  'Perfume': 'Luxury fragrances',
  'Serum': 'Skincare essentials',
  'Makeup': 'Complete looks',
};

export default function CategoriesSection() {
  const { theme } = useTheme();
  const [showCollections, setShowCollections] = useState(true);

  // Get unique collection categories with counts
  const collectionCategories = useMemo(() => {
    const categoryMap = new Map<string, number>();
    
    allCollections.forEach(collection => {
      if (collection.category) {
        const count = categoryMap.get(collection.category) || 0;
        categoryMap.set(collection.category, count + 1);
      }
    });

    return Array.from(categoryMap.entries()).map(([category, count], index) => ({
      id: index + 1,
      name: category,
      description: collectionCategoryDescriptions[category] || 'Curated collection',
      href: `/collections?category=${encodeURIComponent(category)}`,
      image: collectionCategoryImages[category] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop',
      count: `${count} ${count === 1 ? 'Item' : 'Items'}`,
    }));
  }, []);

  // Get unique product categories with counts
  const productCategories = useMemo(() => {
    const categoryMap = new Map<string, number>();
    
    allProducts.forEach(product => {
      if (product.category) {
        const count = categoryMap.get(product.category) || 0;
        categoryMap.set(product.category, count + 1);
      }
    });

    return Array.from(categoryMap.entries()).map(([category, count], index) => ({
      id: index + 1,
      name: category,
      description: productCategoryDescriptions[category] || 'Premium products',
      href: `/products?category=${encodeURIComponent(category)}`,
      image: productCategoryImages[category] || 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&h=600&fit=crop',
      count: `${count} ${count === 1 ? 'Product' : 'Products'}`,
    }));
  }, []);

  const categories = showCollections ? collectionCategories : productCategories;

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
              Shop by Category
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
            </span>
          </div>
          
          {/* Toggle Switch */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={() => setShowCollections(false)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                !showCollections
                  ? `bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] text-[#0B0B0B] shadow-lg`
                  : theme === 'dark'
                    ? 'bg-[#1A1A1A] border border-[#2A2A2A] text-[#F5F3EE]/60 hover:text-[#F5F3EE] hover:border-[#D4AF37]/50'
                    : 'bg-white border border-gray-200 text-[#0B0B0B]/60 hover:text-[#0B0B0B] hover:border-[#D4AF37]/50'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setShowCollections(true)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                showCollections
                  ? `bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] text-[#0B0B0B] shadow-lg`
                  : theme === 'dark'
                    ? 'bg-[#1A1A1A] border border-[#2A2A2A] text-[#F5F3EE]/60 hover:text-[#F5F3EE] hover:border-[#D4AF37]/50'
                    : 'bg-white border border-gray-200 text-[#0B0B0B]/60 hover:text-[#0B0B0B] hover:border-[#D4AF37]/50'
              }`}
            >
              Collections
            </button>
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-[1.1]">
            <span className={`block ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
              Explore Our
            </span>
            <span className="block bg-gradient-to-r from-[#D4AF37] via-[#E6C77A] to-[#D4AF37] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              {showCollections ? 'Collections' : 'Products'}
            </span>
          </h2>
          <p className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-[#F5F3EE]/60' : 'text-[#0B0B0B]/60'
            }`}>
            {showCollections
              ? 'Discover curated collections designed to elevate your beauty routine and personal style.'
              : 'Browse our complete range of premium beauty products, from luxurious lip tints and perfumes to effective serums.'}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={category.href}
              className={`group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${theme === 'dark'
                ? 'bg-gradient-to-br from-[#0F0F0F] to-[#1A1A1A] border border-[#E6C77A]/15 hover:border-[#D4AF37]/40 shadow-xl'
                : 'bg-white border border-gray-100 hover:border-[#D4AF37]/40 shadow-xl'
                }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Category Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${theme === 'dark'
                  ? 'from-[#0B0B0B]/60 via-[#0F0F0F]/70 to-[#1A1A1A]/80'
                  : 'from-white/40 via-[#F5F3EE]/60 to-white/80'
                  }`}></div>
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 via-transparent to-[#E6C77A]/10 pointer-events-none"></div>
              </div>

              {/* Category Info */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`text-3xl md:text-4xl font-extrabold ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'
                    }`}>
                    {category.name}
                  </h3>
                  <svg
                    className="w-8 h-8 text-[#D4AF37] transform transition-transform duration-300 group-hover:translate-x-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
                <p className={`text-base mb-2 ${theme === 'dark' ? 'text-[#F5F3EE]/70' : 'text-[#0B0B0B]/70'
                  }`}>
                  {category.description}
                </p>
                <span className={`inline-flex items-center text-sm font-semibold ${theme === 'dark'
                  ? 'text-[#D4AF37]'
                  : 'text-[#8B6914]'
                  }`}>
                  {category.count}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

