'use client';

import { useTheme } from '../contexts/ThemeContext';

export default function TrustBadgesSection() {
  const { theme } = useTheme();

  const badges = [
    {
      id: 1,
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Secure Payment',
      description: '100% secure transactions',
    },
    {
      id: 2,
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Authentic Products',
      description: 'Certified authenticity',
    },
    {
      id: 3,
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Free Shipping',
      description: 'On orders over ₱2,500',
    },
    {
      id: 4,
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: 'Easy Returns',
      description: '30-day return policy',
    },
    {
      id: 5,
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: '24/7 Support',
      description: 'Always here to help',
    },
    {
      id: 6,
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Money Back',
      description: 'Satisfaction guaranteed',
    },
  ];

  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '500+', label: 'Premium Products' },
    { number: '100+', label: 'Countries Served' },
    { number: '4.9/5', label: 'Average Rating' },
  ];

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
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center"
            >
              <div className="mb-3">
                <span className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] bg-clip-text text-transparent">
                  {stat.number}
                </span>
              </div>
              <p className={`text-sm md:text-base font-semibold ${theme === 'dark' ? 'text-[#F5F3EE]/70' : 'text-[#0B0B0B]/70'
                }`}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {badges.map((badge, index) => (
            <div
              key={badge.id}
              className={`text-center p-6 md:p-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 ${theme === 'dark'
                ? 'bg-gradient-to-br from-[#0F0F0F] to-[#1A1A1A] border border-[#E6C77A]/15 hover:border-[#D4AF37]/40'
                : 'bg-white border border-gray-100 hover:border-[#D4AF37]/40 shadow-lg'
                }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl mb-4 ${theme === 'dark'
                ? 'bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30'
                : 'bg-gradient-to-br from-[#D4AF37]/25 to-[#E6C77A]/25 text-[#D4AF37] border border-[#D4AF37]/40'
                }`}>
                {badge.icon}
              </div>
              <h3 className={`text-base md:text-lg font-bold mb-2 ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'
                }`}>
                {badge.title}
              </h3>
              <p className={`text-xs md:text-sm leading-relaxed ${theme === 'dark' ? 'text-[#F5F3EE]/60' : 'text-[#0B0B0B]/60'
                }`}>
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

