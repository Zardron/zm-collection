'use client';

import { useTheme } from '../contexts/ThemeContext';

export default function BenefitsSection() {
  const { theme } = useTheme();

  const benefits = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      title: 'Authenticity Guaranteed',
      description: 'Every item is certified and comes with a certificate of authenticity.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Free Shipping',
      description: 'Complimentary shipping on orders over ₱2,500 nationwide.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: '30-Day Returns',
      description: 'Hassle-free returns within 30 days of purchase.',
    },
  ];

  return (
    <section className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 ${
      theme === 'dark' ? 'bg-gradient-to-b from-[#0B0B0B] to-[#1A1A1A]' : 'bg-gradient-to-b from-white to-[#F5F3EE]'
    }`}>
      <div className="grid md:grid-cols-3 gap-8 md:gap-10">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className={`text-center p-8 md:p-10 rounded-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-[#0F0F0F] to-[#1A1A1A] border border-[#E6C77A]/15 hover:border-[#D4AF37]/40 shadow-xl'
                : 'bg-white border border-[#E6C77A]/20 hover:border-[#D4AF37]/40 shadow-xl'
            }`}
          >
            <div className={`inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl mb-6 shadow-lg ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30' 
                : 'bg-gradient-to-br from-[#D4AF37]/25 to-[#E6C77A]/25 text-[#D4AF37] border border-[#D4AF37]/40'
            }`}>
              {benefit.icon}
            </div>
            <h3 className={`text-xl md:text-2xl font-bold mb-3 ${
              theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'
            }`}>
              {benefit.title}
            </h3>
            <p className={`text-base leading-relaxed ${
              theme === 'dark' ? 'text-[#F5F3EE]/70' : 'text-[#0B0B0B]/70'
            }`}>
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
