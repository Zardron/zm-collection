'use client';

import { useTheme } from '../contexts/ThemeContext';
import Image from 'next/image';

export default function AboutPage() {
  const { theme } = useTheme();

  const values = [
    {
      title: 'Quality First',
      description: 'We curate only the finest beauty products, ensuring every item meets our high standards of excellence.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Customer Care',
      description: 'Your satisfaction is our priority. We provide exceptional service and support at every step.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      title: 'Innovation',
      description: 'We stay ahead of beauty trends, bringing you the latest and most innovative products.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: 'Sustainability',
      description: 'We are committed to ethical sourcing and sustainable practices in everything we do.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 002 2h2.945M15 15v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3m14-6V9a2 2 0 00-2-2H9a2 2 0 00-2 2v3m14 0h2.945M21 15v3a2 2 0 01-2 2h-2.945M9 15H6.055M9 15v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3" />
        </svg>
      ),
    },
  ];

  const milestones = [
    { year: '2020', title: 'Founded', description: 'ZM Collection was born from a passion for premium beauty products.' },
    { year: '2021', title: 'First Collection', description: 'Launched our signature line of luxury lip tints and perfumes.' },
    { year: '2022', title: 'Expansion', description: 'Expanded to include serums, makeup collections, and fashion items.' },
    { year: '2024', title: 'Global Reach', description: 'Serving customers worldwide with curated beauty essentials.' },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0B0B0B]' : 'bg-[#F5F3EE]'}`}>
      {/* Hero Section */}
      <section className={`relative overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-b from-[#0B0B0B] to-[#1A1A1A]' : 'bg-gradient-to-b from-[#F5F3EE] to-white'}`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${theme === 'dark' ? '#D4AF37' : '#000000'} 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <div className="inline-block mb-5">
              <span className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest ${theme === 'dark'
                ? 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30'
                : 'bg-[#D4AF37]/15 text-[#8B6914] border border-[#D4AF37]/40'
                }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                Our Story
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-[1.1]">
              <span className={`block ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
                About
              </span>
              <span className="block bg-gradient-to-r from-[#D4AF37] via-[#E6C77A] to-[#D4AF37] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                ZM Collection
              </span>
            </h1>
            <p className={`text-xl md:text-2xl leading-relaxed ${theme === 'dark' ? 'text-[#F5F3EE]/70' : 'text-[#0B0B0B]/70'}`}>
              Discover the story behind ZM Collection, where luxury meets beauty and every product tells a tale of excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className={`relative overflow-hidden ${theme === 'dark' ? 'bg-[#0B0B0B]' : 'bg-[#F5F3EE]'}`}>
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${theme === 'dark' ? '#D4AF37' : '#000000'} 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
                Our Journey
              </h2>
              <div className={`space-y-4 text-lg leading-relaxed ${theme === 'dark' ? 'text-[#F5F3EE]/80' : 'text-[#0B0B0B]/80'}`}>
                <p>
                  ZM Collection was founded with a simple yet powerful vision: to bring premium beauty products to everyone who values quality and elegance. We believe that beauty is not just about appearance, but about feeling confident and expressing your unique style.
                </p>
                <p>
                  Our carefully curated selection includes luxurious lip tints, exquisite perfumes, effective serums, complete makeup collections, and fashionable clothing. Each product is chosen for its quality, innovation, and ability to enhance your natural beauty.
                </p>
                <p>
                  From our humble beginnings to becoming a trusted name in beauty and fashion, we remain committed to our core values of quality, customer care, and sustainability. Every product in our collection reflects our dedication to excellence.
                </p>
              </div>
            </div>
            <div className={`relative rounded-3xl overflow-hidden border-2 ${theme === 'dark' 
              ? 'bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-[#E6C77A]/20' 
              : 'bg-gradient-to-br from-white to-[#F5F3EE] border-[#E6C77A]/30'
            }`}>
              <div className="aspect-square flex items-center justify-center p-12">
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className={`absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-[#E6C77A]/20 rounded-full blur-3xl`}></div>
                  <Image
                    src="/ZM-logo.png"
                    alt="ZM Collection Logo"
                    width={200}
                    height={200}
                    className="relative z-10 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={`relative overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-b from-[#1A1A1A] to-[#0B0B0B]' : 'bg-gradient-to-b from-white to-[#F5F3EE]'}`}>
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${theme === 'dark' ? '#D4AF37' : '#000000'} 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-12 md:mb-16">
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
              Our Values
            </h2>
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto ${theme === 'dark' ? 'text-[#F5F3EE]/60' : 'text-[#0B0B0B]/60'}`}>
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {values.map((value, index) => (
              <div
                key={value.title}
                className={`relative rounded-3xl p-8 border-2 transition-all duration-300 hover:scale-[1.02] ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-[#E6C77A]/20 hover:border-[#E6C77A]/40'
                    : 'bg-gradient-to-br from-white to-[#F5F3EE] border-[#E6C77A]/30 hover:border-[#E6C77A]/50'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 p-3 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#E6C77A] text-[#0B0B0B]`}>
                    {value.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-2xl font-bold mb-3 ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
                      {value.title}
                    </h3>
                    <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-[#F5F3EE]/70' : 'text-[#0B0B0B]/70'}`}>
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className={`relative overflow-hidden ${theme === 'dark' ? 'bg-[#0B0B0B]' : 'bg-[#F5F3EE]'}`}>
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${theme === 'dark' ? '#D4AF37' : '#000000'} 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-12 md:mb-16">
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
              Our Journey
            </h2>
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto ${theme === 'dark' ? 'text-[#F5F3EE]/60' : 'text-[#0B0B0B]/60'}`}>
              Key moments that shaped who we are today
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className={`absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 ${theme === 'dark' ? 'bg-[#E6C77A]/30' : 'bg-[#E6C77A]/40'}`}></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#E6C77A] border-4 transform -translate-x-1/2 ${
                    theme === 'dark' ? 'border-[#0B0B0B]' : 'border-[#F5F3EE]'
                  }`}></div>

                  {/* Content */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'}`}>
                    <div className={`rounded-2xl p-6 border-2 ${
                      theme === 'dark'
                        ? 'bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-[#E6C77A]/20'
                        : 'bg-gradient-to-br from-white to-[#F5F3EE] border-[#E6C77A]/30'
                    }`}>
                      <div className={`text-3xl font-bold mb-2 bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] bg-clip-text text-transparent`}>
                        {milestone.year}
                      </div>
                      <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
                        {milestone.title}
                      </h3>
                      <p className={`text-base ${theme === 'dark' ? 'text-[#F5F3EE]/70' : 'text-[#0B0B0B]/70'}`}>
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 ${theme === 'dark'
        ? 'bg-gradient-to-b from-[#1A1A1A] to-[#0B0B0B]'
        : 'bg-gradient-to-b from-[#F5F3EE] to-white'
        }`}>
        <div className={`relative overflow-hidden rounded-3xl p-10 md:p-14 lg:p-20 text-center border-2 ${theme === 'dark'
          ? 'bg-gradient-to-br from-[#1A1A1A] via-[#0F0F0F] to-[#0B0B0B] border-[#E6C77A]/20 shadow-2xl'
          : 'bg-gradient-to-br from-white via-[#F5F3EE] to-white border-[#E6C77A]/30 shadow-2xl'
          }`}>
          <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/5 via-[#E6C77A]/5 to-[#D4AF37]/5"></div>
          <div className={`absolute top-10 left-10 w-32 h-32 rounded-full blur-3xl opacity-20 ${theme === 'dark' ? 'bg-[#D4AF37]' : 'bg-[#E6C77A]'}`}></div>
          <div className={`absolute bottom-10 right-10 w-40 h-40 rounded-full blur-3xl opacity-20 ${theme === 'dark' ? 'bg-[#E6C77A]' : 'bg-[#D4AF37]'}`}></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
              Join Our Community
            </h2>
            <p className={`text-lg md:text-xl lg:text-2xl leading-relaxed ${theme === 'dark' ? 'text-[#F5F3EE]/80' : 'text-[#0B0B0B]/70'}`}>
              Experience the beauty of premium products and become part of the ZM Collection family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href="/products"
                className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] text-[#0B0B0B] font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#D4AF37]/50"
              >
                Shop Now
              </a>
              <a
                href="/contact"
                className={`px-8 py-4 border-2 rounded-xl font-bold transition-all duration-300 hover:scale-105 ${
                  theme === 'dark'
                    ? 'border-[#E6C77A]/50 text-[#F5F3EE] hover:bg-[#E6C77A]/10'
                    : 'border-[#E6C77A]/50 text-[#0B0B0B] hover:bg-[#E6C77A]/20'
                }`}
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

