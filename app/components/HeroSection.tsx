'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '../contexts/ThemeContext';

export default function HeroSection() {
  const { theme } = useTheme();

  return (
    <section className={`relative overflow-hidden h-screen flex items-center ${theme === 'dark'
      ? 'bg-gradient-to-b from-[#0B0B0B] via-[#0F0F0F] to-[#0B0B0B]'
      : 'bg-gradient-to-b from-[#F5F3EE] via-white to-[#F5F3EE]'
      }`}
      style={{ minHeight: '100vh' }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20 ${theme === 'dark' ? 'bg-[#D4AF37]' : 'bg-[#E6C77A]'
          }`}></div>
        <div className={`absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20 ${theme === 'dark' ? 'bg-[#E6C77A]' : 'bg-[#D4AF37]'
          }`}></div>
      </div>

      <div className="relative w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 " style={{ minHeight: '100%' }}>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center w-full">
          {/* Hero Content */}
          <div className="space-y-4 md:space-y-5 text-center lg:text-left">
            <div className="inline-block animate-fade-in">
              <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider ${theme === 'dark'
                ? 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 backdrop-blur-sm'
                : 'bg-[#D4AF37]/15 text-[#8B6914] border border-[#D4AF37]/40 backdrop-blur-sm'
                }`}>
                <span className="text-sm">✨</span>
                Premium Beauty Collection
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
                <span className={`block ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
                  Elevate Your
                </span>
                <span className="block bg-gradient-to-r from-[#D4AF37] via-[#E6C77A] to-[#D4AF37] bg-clip-text text-transparent animate-gradient">
                  Beauty Routine
                </span>
              </h1>
            </div>

            <p className={`text-base md:text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light ${theme === 'dark' ? 'text-[#F5F3EE]/70' : 'text-[#0B0B0B]/70'
              }`}>
              Discover premium beauty products including lip tints, perfumes, serums, makeup, and fashionable clothing.
              Curated collections for your complete beauty and style journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link
                href="/products"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-[#0B0B0B] bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#D4AF37]/40"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Shop Now
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#E6C77A] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link
                href="/collections"
                className={`inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl border-2 transition-all duration-300 hover:scale-105 backdrop-blur-sm ${theme === 'dark'
                  ? 'border-[#E6C77A]/40 text-[#F5F3EE] bg-[#1A1A1A]/50 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10'
                  : 'border-[#D4AF37]/50 text-[#0B0B0B] bg-white/50 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10'
                  }`}
              >
                Explore Collections
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative lg:pl-8">
            <div className={`relative rounded-3xl overflow-hidden ${theme === 'dark'
              ? 'bg-gradient-to-br from-[#1A1A1A] via-[#0F0F0F] to-[#0B0B0B] border-2 border-[#E6C77A]/20 shadow-2xl'
              : 'bg-gradient-to-br from-white via-[#F5F3EE] to-white border-2 border-[#E6C77A]/30 shadow-2xl'
              }`}>
              <div className="aspect-square relative overflow-hidden">
                {/* Beauty products background image */}
                <Image
                  src="https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3"
                  alt="Premium Beauty Products Collection"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${theme === 'dark'
                  ? 'from-[#0B0B0B]/70 via-[#0F0F0F]/60 to-[#1A1A1A]/70'
                  : 'from-white/40 via-[#F5F3EE]/50 to-white/60'
                  }`}></div>


                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 via-transparent to-[#E6C77A]/5 pointer-events-none"></div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className={`absolute -top-6 -right-6 w-40 h-40 rounded-full blur-3xl opacity-30 ${theme === 'dark' ? 'bg-[#D4AF37]' : 'bg-[#E6C77A]'
              }`}></div>
            <div className={`absolute -bottom-6 -left-6 w-48 h-48 rounded-full blur-3xl opacity-30 ${theme === 'dark' ? 'bg-[#E6C77A]' : 'bg-[#D4AF37]'
              }`}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
