'use client';

import Link from 'next/link';
import { useTheme } from '../contexts/ThemeContext';

export default function PromoBanner() {
  const { theme } = useTheme();

  return (
    <section className={`relative border-y ${
      theme === 'dark' 
        ? 'border-[#E6C77A]/10 bg-gradient-to-r from-[#1A1A1A]/50 via-[#0F0F0F]/50 to-[#1A1A1A]/50 backdrop-blur-sm' 
        : 'border-[#E6C77A]/20 bg-gradient-to-r from-white/80 via-[#F5F3EE]/80 to-white/80 backdrop-blur-sm'
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className={`p-3.5 rounded-xl shadow-lg ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/10 border border-[#D4AF37]/30' 
                : 'bg-gradient-to-br from-[#D4AF37]/25 to-[#E6C77A]/25 border border-[#D4AF37]/40'
            }`}>
              <svg className="w-6 h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <div>
              <h3 className={`text-xl md:text-2xl font-bold mb-1 ${
                theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'
              }`}>
                Limited Time Offer
              </h3>
              <p className={`text-sm md:text-base ${
                theme === 'dark' ? 'text-[#F5F3EE]/70' : 'text-[#0B0B0B]/70'
              }`}>
                Up to 25% off on selected beauty products
              </p>
            </div>
          </div>
          <Link
            href="/products?sale=true"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] text-[#0B0B0B] font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#D4AF37]/50"
          >
            Shop Sale
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
