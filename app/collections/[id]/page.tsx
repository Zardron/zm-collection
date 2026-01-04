'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '../../contexts/ThemeContext';
import { useCart } from '../../contexts/CartContext';
import { getCollectionDetails, getRelatedCollections } from '../../data/collections';
import ProductCard from '../../components/ProductCard';
import { useState } from 'react';

export default function CollectionPage() {
  const params = useParams();
  const { theme } = useTheme();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  const collectionId = parseInt(params.id as string);
  const collection = getCollectionDetails(collectionId);
  const relatedCollections = getRelatedCollections(collectionId, 4);

  // If collection not found, show error
  if (!collection) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-[#0B0B0B]' : 'bg-[#F5F3EE]'}`}>
        <div className="text-center space-y-6">
          <h1 className={`text-4xl font-bold ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
            Collection Not Found
          </h1>
          <p className={`text-xl ${theme === 'dark' ? 'text-[#F5F3EE]/60' : 'text-[#0B0B0B]/60'}`}>
            The collection item you're looking for doesn't exist.
          </p>
          <Link
            href="/collections"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] text-[#0B0B0B] font-bold rounded-xl hover:scale-105 transition-all duration-300"
          >
            Back to Collections
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    setIsAdding(true);
    for (let i = 0; i < quantity; i++) {
      addToCart(collection);
    }
    setTimeout(() => {
      setIsAdding(false);
    }, 1500);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const getBadgeStyles = (badge?: string) => {
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

  // Create array of images
  const collectionImages = [collection.image, collection.image, collection.image];

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
          <Link
            href="/collections"
            className={`hover:text-[#D4AF37] transition-colors ${theme === 'dark' ? 'text-[#F5F3EE]/60' : 'text-[#0B0B0B]/60'}`}
          >
            Collections
          </Link>
          <span className={theme === 'dark' ? 'text-[#F5F3EE]/40' : 'text-[#0B0B0B]/40'}>/</span>
          <span className={theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}>{collection.name}</span>
        </nav>
      </div>

      {/* Collection Details Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Collection Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className={`relative aspect-square rounded-3xl overflow-hidden ${theme === 'dark'
              ? 'bg-[#1A1A1A] border border-[#2A2A2A]'
              : 'bg-white border border-gray-100'
              }`}>
              <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12">
                <Image
                  src={collectionImages[selectedImage]}
                  alt={collection.name}
                  width={600}
                  height={600}
                  className="object-contain w-full h-full"
                  priority
                  unoptimized={collectionImages[selectedImage]?.startsWith('http')}
                />
              </div>
            </div>

            {/* Thumbnail Images */}
            {collectionImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {collectionImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/50'
                        : theme === 'dark'
                        ? 'border-[#2A2A2A] hover:border-[#D4AF37]/50'
                        : 'border-gray-200 hover:border-[#D4AF37]/50'
                    }`}
                  >
                    <div className={`absolute inset-0 flex items-center justify-center p-2 ${theme === 'dark' ? 'bg-[#0F0F0F]' : 'bg-gray-50'}`}>
                      <Image
                        src={image}
                        alt={`${collection.name} view ${index + 1}`}
                        width={100}
                        height={100}
                        className="object-contain w-full h-full"
                        unoptimized={image?.startsWith('http')}
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Collection Info */}
          <div className="space-y-6">
            {/* Badge */}
            {collection.badge && (
              <div>
                <span className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider ${getBadgeStyles(collection.badge)}`}>
                  {collection.badge}
                </span>
              </div>
            )}

            {/* Category */}
            {collection.category && (
              <div>
                <span className={`inline-flex items-center text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-md ${theme === 'dark'
                  ? 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30'
                  : 'bg-[#D4AF37]/10 text-[#8B6914] border border-[#D4AF37]/30'
                  }`}>
                  {collection.category}
                </span>
              </div>
            )}

            {/* Collection Name */}
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
              {collection.name}
            </h1>

            {/* Pricing */}
            <div className="space-y-3">
              <div className="flex items-baseline gap-4 flex-wrap">
                <span className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] bg-clip-text text-transparent">
                  {collection.price}
                </span>
                {collection.originalPrice && (
                  <>
                    <span className={`text-2xl line-through font-medium ${theme === 'dark' ? 'text-[#F5F3EE]/25' : 'text-[#0B0B0B]/25'}`}>
                      {collection.originalPrice}
                    </span>
                    <span className="inline-flex items-center text-sm font-bold px-4 py-2 rounded-full bg-red-500 text-white uppercase tracking-wider">
                      Sale {(() => {
                        const current = parseFloat(collection.price.replace(/[^0-9.]/g, ''));
                        const original = parseFloat(collection.originalPrice.replace(/[^0-9.]/g, ''));
                        const savings = ((1 - current / original) * 100).toFixed(0);
                        return `${savings}% OFF`;
                      })()}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            {collection.description && (
              <div className="space-y-3">
                <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
                  Description
                </h2>
                <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-[#F5F3EE]/80' : 'text-[#0B0B0B]/80'}`}>
                  {collection.description}
                </p>
              </div>
            )}

            {/* Features */}
            {collection.features && collection.features.length > 0 && (
              <div className="space-y-3">
                <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
                  Key Features
                </h2>
                <ul className="space-y-2">
                  {collection.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={`text-lg ${theme === 'dark' ? 'text-[#F5F3EE]/80' : 'text-[#0B0B0B]/80'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Size Selection */}
            {collection.sizes && collection.sizes.length > 0 && (
              <div className="space-y-3">
                <h2 className={`text-lg font-bold ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
                  Size <span className="text-red-500">*</span>
                </h2>
                <div className="flex flex-wrap gap-3">
                  {collection.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        selectedSize === size
                          ? 'bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] text-[#0B0B0B] shadow-lg'
                          : theme === 'dark'
                          ? 'bg-[#1A1A1A] border border-[#2A2A2A] text-[#F5F3EE] hover:border-[#D4AF37]/50'
                          : 'bg-white border border-gray-200 text-[#0B0B0B] hover:border-[#D4AF37]/50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {collection.colors && collection.colors.length > 0 && (
              <div className="space-y-3">
                <h2 className={`text-lg font-bold ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
                  Color
                </h2>
                <div className="flex flex-wrap gap-3">
                  {collection.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        selectedColor === color
                          ? 'bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] text-[#0B0B0B] shadow-lg'
                          : theme === 'dark'
                          ? 'bg-[#1A1A1A] border border-[#2A2A2A] text-[#F5F3EE] hover:border-[#D4AF37]/50'
                          : 'bg-white border border-gray-200 text-[#0B0B0B] hover:border-[#D4AF37]/50'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Materials */}
            {collection.materials && collection.materials.length > 0 && (
              <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-[#1A1A1A] border border-[#2A2A2A]' : 'bg-white border border-gray-200'}`}>
                <h2 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
                  Materials
                </h2>
                <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-[#F5F3EE]/70' : 'text-[#0B0B0B]/70'}`}>
                  {collection.materials.join(', ')}
                </p>
              </div>
            )}

            {/* Stock Status */}
            <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-[#1A1A1A] border border-[#2A2A2A]' : 'bg-white border border-gray-200'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${collection.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`font-semibold ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
                  {collection.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className={`font-semibold ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
                  Quantity:
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className={`w-10 h-10 rounded-lg font-bold transition-all ${theme === 'dark'
                      ? 'bg-[#1A1A1A] border border-[#2A2A2A] text-[#F5F3EE] hover:border-[#D4AF37]'
                      : 'bg-white border border-gray-300 text-[#0B0B0B] hover:border-[#D4AF37]'
                      }`}
                  >
                    −
                  </button>
                  <span className={`w-16 text-center text-xl font-bold ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className={`w-10 h-10 rounded-lg font-bold transition-all ${theme === 'dark'
                      ? 'bg-[#1A1A1A] border border-[#2A2A2A] text-[#F5F3EE] hover:border-[#D4AF37]'
                      : 'bg-white border border-gray-300 text-[#0B0B0B] hover:border-[#D4AF37]'
                      }`}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={isAdding || !collection.inStock}
                className={`w-full py-5 px-6 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                  isAdding
                    ? 'bg-green-500 text-white scale-[0.98]'
                    : collection.inStock
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] text-[#0B0B0B] hover:scale-[1.02] hover:shadow-xl hover:shadow-[#D4AF37]/40'
                    : 'bg-gray-400 text-white cursor-not-allowed'
                } disabled:opacity-70 disabled:cursor-not-allowed`}
              >
                {isAdding ? (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Collections Section */}
      {relatedCollections.length > 0 && (
        <section className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 ${theme === 'dark' ? 'bg-[#0B0B0B]' : 'bg-[#F5F3EE]'}`}>
          <div className="text-center mb-12">
            <h2 className={`text-4xl md:text-5xl font-extrabold mb-4 ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
              Related Collections
            </h2>
            <p className={`text-lg ${theme === 'dark' ? 'text-[#F5F3EE]/60' : 'text-[#0B0B0B]/60'}`}>
              You might also like these items
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedCollections.map((relatedCollection) => (
              <ProductCard key={relatedCollection.id} product={relatedCollection} showAddToCart={true} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

