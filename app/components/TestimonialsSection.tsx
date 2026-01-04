'use client';

import { useTheme } from '../contexts/ThemeContext';
import Image from 'next/image';

export default function TestimonialsSection() {
  const { theme } = useTheme();

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Santos',
      location: 'Manila, Philippines',
      rating: 5,
      text: 'Absolutely love my Velvet Lip Tint! The color stays on all day and feels so smooth. ZM Collection never disappoints!',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
      product: 'Velvet Lip Tint - Rose',
    },
    {
      id: 2,
      name: 'Maria Reyes',
      location: 'Quezon City, Philippines',
      rating: 5,
      text: 'The Hyaluronic Acid Serum has transformed my skin! I can see the difference after just one week. Highly recommend!',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      product: 'Hyaluronic Acid Serum',
    },
    {
      id: 3,
      name: 'Ana Garcia',
      location: 'Makati, Philippines',
      rating: 5,
      text: 'The Luxury Perfume is divine! The scent lasts all day and I get so many compliments. Worth every peso!',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      product: 'Luxury Perfume - Eau de Parfum',
    },
    {
      id: 4,
      name: 'Christine Cruz',
      location: 'Cebu, Philippines',
      rating: 5,
      text: 'Fast shipping, authentic products, and amazing quality. ZM Collection is now my go-to for all beauty essentials!',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      product: 'Silk Scarf Collection',
    },
  ];

  return (
    <section className={`relative overflow-hidden ${theme === 'dark'
      ? 'bg-gradient-to-b from-[#1A1A1A] to-[#0B0B0B]'
      : 'bg-gradient-to-b from-white to-[#F5F3EE]'
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
              Customer Love
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
            </span>
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-[1.1]">
            <span className={`block ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
              What Our
            </span>
            <span className="block bg-gradient-to-r from-[#D4AF37] via-[#E6C77A] to-[#D4AF37] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Customers Say
            </span>
          </h2>
          <p className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-[#F5F3EE]/60' : 'text-[#0B0B0B]/60'
            }`}>
            Join thousands of satisfied customers who trust ZM Collection for their beauty and fashion needs.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`relative p-8 rounded-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${theme === 'dark'
                ? 'bg-gradient-to-br from-[#0F0F0F] to-[#1A1A1A] border border-[#E6C77A]/15 hover:border-[#D4AF37]/40 shadow-xl'
                : 'bg-white border border-gray-100 hover:border-[#D4AF37]/40 shadow-xl'
                }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Rating Stars */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-[#D4AF37]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className={`text-base leading-relaxed mb-6 ${theme === 'dark' ? 'text-[#F5F3EE]/80' : 'text-[#0B0B0B]/80'
                }`}>
                "{testimonial.text}"
              </p>

              {/* Product Reference */}
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-6 text-xs font-semibold ${theme === 'dark'
                ? 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30'
                : 'bg-[#D4AF37]/10 text-[#8B6914] border border-[#D4AF37]/30'
                }`}>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {testimonial.product}
              </div>

              {/* Customer Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-[#E6C77A]/20">
                <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#D4AF37]/30">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className={`font-bold text-sm ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'
                    }`}>
                    {testimonial.name}
                  </h4>
                  <p className={`text-xs ${theme === 'dark' ? 'text-[#F5F3EE]/60' : 'text-[#0B0B0B]/60'
                    }`}>
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

