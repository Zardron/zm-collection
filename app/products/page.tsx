'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTheme } from '../contexts/ThemeContext';
import { allProducts } from '../data/products';
import { Product } from '../contexts/CartContext';
import ProductCard from '../components/ProductCard';

type SortOption = 'default' | 'price-low' | 'price-high' | 'rating' | 'newest' | 'reviews';

function ProductsContent() {
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('default');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = allProducts
      .map(p => p.category)
      .filter((cat): cat is string => cat !== undefined);
    return Array.from(new Set(cats));
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.category?.toLowerCase().includes(query)
      );
    }

    // Filter by rating
    if (selectedRating !== null) {
      filtered = filtered.filter(p => p.rating && p.rating >= selectedRating);
    }

    // Sort products
    const sorted = [...filtered];
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''));
          const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''));
          return priceA - priceB;
        });
        break;
      case 'price-high':
        sorted.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''));
          const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''));
          return priceB - priceA;
        });
        break;
      case 'rating':
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'reviews':
        sorted.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        break;
      case 'newest':
        sorted.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return sorted;
  }, [selectedCategory, searchQuery, selectedRating, sortBy]);

  // Initialize category from URL parameter
  useEffect(() => {
    setSelectedCategory(categoryParam || null);
  }, [categoryParam]);

  // Handle smooth transitions when filters change
  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery, selectedRating, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategory(null);
    setSelectedRating(null);
    setSortBy('default');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory || selectedRating !== null || sortBy !== 'default';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0B0B0B]' : 'bg-[#F5F3EE]'}`}>
      {/* Header Section */}
      <section className={`relative overflow-hidden ${theme === 'dark' ? 'bg-[#0B0B0B]' : 'bg-[#F5F3EE]'}`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${theme === 'dark' ? '#D4AF37' : '#000000'} 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12">
          {/* Page Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block mb-5">
              <span className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest ${theme === 'dark'
                ? 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30'
                : 'bg-[#D4AF37]/15 text-[#8B6914] border border-[#D4AF37]/40'
                }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                Shop All Products
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-[1.1]">
              <span className={`block ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
                Our
              </span>
              <span className="block bg-gradient-to-r from-[#D4AF37] via-[#E6C77A] to-[#D4AF37] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                Products
              </span>
            </h1>
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-[#F5F3EE]/60' : 'text-[#0B0B0B]/60'}`}>
              Discover our complete range of premium beauty products, from luxurious lip tints and perfumes to effective serums and professional makeup tools.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className={`h-5 w-5 ${theme === 'dark' ? 'text-[#F5F3EE]/40' : 'text-[#0B0B0B]/40'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all font-medium ${theme === 'dark'
                  ? 'bg-[#1A1A1A] border-[#2A2A2A] text-[#F5F3EE] placeholder-[#F5F3EE]/50'
                  : 'bg-white border-gray-200 text-[#0B0B0B] placeholder-[#0B0B0B]/50'
                  }`}
              />
            </div>
          </div>

          {/* Filter and Sort Bar */}
          <div className="max-w-7xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              {/* Filter Toggle Button (Mobile) */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`sm:hidden w-full px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${theme === 'dark'
                  ? 'bg-[#1A1A1A] border border-[#2A2A2A] text-[#F5F3EE] hover:border-[#D4AF37]/50'
                  : 'bg-white border border-gray-200 text-[#0B0B0B] hover:border-[#D4AF37]/50'
                  }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters {hasActiveFilters && `(${filteredProducts.length})`}
              </button>

              {/* Sort Dropdown */}
              <div className="w-full sm:w-auto relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className={`w-full sm:w-auto px-6 py-3 pr-10 rounded-xl font-semibold transition-all duration-300 border-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] appearance-none cursor-pointer ${theme === 'dark'
                    ? 'bg-[#1A1A1A] border-[#2A2A2A] text-[#F5F3EE] hover:border-[#D4AF37]/50'
                    : 'bg-white border-gray-200 text-[#0B0B0B] hover:border-[#D4AF37]/50'
                    }`}
                >
                  <option value="default">Sort by: Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="reviews">Most Reviews</option>
                  <option value="newest">Newest First</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg className={`w-5 h-5 ${theme === 'dark' ? 'text-[#F5F3EE]/60' : 'text-[#0B0B0B]/60'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Results Count */}
              <div className="hidden sm:block">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-[#F5F3EE]/60' : 'text-[#0B0B0B]/60'}`}>
                  Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Filters */}
      <section className={`relative ${theme === 'dark' ? 'bg-[#0B0B0B]' : 'bg-[#F5F3EE]'}`}>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Filter Sidebar */}
            <aside className={`lg:w-80 shrink-0 ${showFilters ? 'block' : 'hidden'} lg:block lg:sticky lg:top-22 lg:self-start lg:z-10`}>
              <div className={`max-h-[calc(100vh-6rem)] overflow-y-auto hide-scrollbar rounded-2xl p-6 border-2 ${theme === 'dark'
                ? 'bg-[#1A1A1A] border-[#2A2A2A]'
                : 'bg-white border-gray-200'
                }`}
              >
                {/* Filter Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
                    Filters
                  </h2>
                  {hasActiveFilters && (
                    <button
                      onClick={clearAllFilters}
                      className={`text-sm font-medium ${theme === 'dark' ? 'text-[#D4AF37] hover:text-[#E6C77A]' : 'text-[#D4AF37] hover:text-[#8B6914]'}`}
                    >
                      Clear All
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Category Filter */}
                  <div>
                    <h3 className={`text-sm font-bold uppercase tracking-wider mb-4 ${theme === 'dark' ? 'text-[#F5F3EE]/80' : 'text-[#0B0B0B]/80'}`}>
                      Category
                    </h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className={`w-full text-left px-4 py-2.5 rounded-lg font-medium transition-all ${selectedCategory === null
                          ? `bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] text-[#0B0B0B]`
                          : theme === 'dark'
                            ? 'bg-[#0F0F0F] text-[#F5F3EE] hover:bg-[#2A2A2A]'
                            : 'bg-gray-50 text-[#0B0B0B] hover:bg-gray-100'
                          }`}
                      >
                        All Categories
                      </button>
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`w-full text-left px-4 py-2.5 rounded-lg font-medium transition-all ${selectedCategory === category
                            ? `bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] text-[#0B0B0B]`
                            : theme === 'dark'
                              ? 'bg-[#0F0F0F] text-[#F5F3EE] hover:bg-[#2A2A2A]'
                              : 'bg-gray-50 text-[#0B0B0B] hover:bg-gray-100'
                            }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <h3 className={`text-sm font-bold uppercase tracking-wider mb-4 ${theme === 'dark' ? 'text-[#F5F3EE]/80' : 'text-[#0B0B0B]/80'}`}>
                      Rating
                    </h3>
                    <div className="relative">
                      <select
                        value={selectedRating || ''}
                        onChange={(e) => setSelectedRating(e.target.value ? parseFloat(e.target.value) : null)}
                        className={`w-full px-6 py-3 pr-10 rounded-xl font-semibold transition-all duration-300 border-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] appearance-none cursor-pointer ${theme === 'dark'
                          ? 'bg-[#1A1A1A] border-[#2A2A2A] text-[#F5F3EE] hover:border-[#D4AF37]/50'
                          : 'bg-white border-gray-200 text-[#0B0B0B] hover:border-[#D4AF37]/50'
                          }`}
                      >
                        <option value="">All Ratings</option>
                        <option value="4.5">★★★★★ & Up (4.5+)</option>
                        <option value="4.0">★★★★☆ & Up (4.0+)</option>
                        <option value="3.5">★★★☆☆ & Up (3.5+)</option>
                        <option value="3.0">★★☆☆☆ & Up (3.0+)</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        <svg className={`w-5 h-5 ${theme === 'dark' ? 'text-[#F5F3EE]/60' : 'text-[#0B0B0B]/60'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Results Count (Mobile) */}
              <div className="sm:hidden mb-6 text-center">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-[#F5F3EE]/60' : 'text-[#0B0B0B]/60'}`}>
                  Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                </p>
              </div>

              {filteredProducts.length > 0 ? (
                <div
                  key={`${selectedCategory || 'all'}-${searchQuery}-${selectedRating}-${sortBy}`}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <ProductCard product={product} showAddToCart={true} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="max-w-md mx-auto space-y-6">
                    <div className={`text-6xl mb-4 ${theme === 'dark' ? 'text-[#F5F3EE]/20' : 'text-[#0B0B0B]/20'}`}>
                      🔍
                    </div>
                    <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
                      No products found
                    </h2>
                    <p className={`text-lg ${theme === 'dark' ? 'text-[#F5F3EE]/60' : 'text-[#0B0B0B]/60'}`}>
                      {searchQuery
                        ? `We couldn't find any products matching "${searchQuery}". Try a different search term.`
                        : 'No products match your current filters. Try adjusting your filters.'}
                    </p>
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={clearAllFilters}
                        className="px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] text-[#0B0B0B] font-bold rounded-xl hover:scale-105 transition-all duration-300"
                      >
                        Clear Filters
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const ProductsPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#0B0B0B]">
          <div className="text-center">
            <div className="text-[#D4AF37] text-xl font-semibold">Loading products...</div>
          </div>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
};

export default ProductsPage;
