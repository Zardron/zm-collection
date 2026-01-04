'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '../contexts/ThemeContext';

export default function Footer() {
  const { theme } = useTheme();

  const footerLinks = {
    shop: [
      { name: 'All Products', href: '/products' },
      { name: 'Lip Tints', href: '/products?category=lip-tint' },
      { name: 'Perfumes', href: '/products?category=perfume' },
      { name: 'Serums', href: '/products?category=serum' },
      { name: 'Fashion', href: '/products?category=fashion' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Story', href: '/about#story' },
      { name: 'Collections', href: '/collections' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '/careers' },
    ],
    support: [
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  };

  const socialLinks = [
    {
      name: 'Instagram',
      href: '#',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: '#',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: '#',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
    },
    {
      name: 'Pinterest',
      href: '#',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
        </svg>
      ),
    },
  ];

  return (
    <footer className={`relative overflow-hidden border-t transition-colors duration-300 ${
      theme === 'dark'
        ? 'bg-gradient-to-b from-[#0B0B0B] via-[#1A1A1A] to-[#0B0B0B] border-[#E6C77A]/20'
        : 'bg-gradient-to-b from-[#F5F3EE] via-white to-[#F5F3EE] border-[#E6C77A]/30'
    }`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${theme === 'dark' ? '#D4AF37' : '#000000'} 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Decorative gradient orbs */}
      <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-5 ${
        theme === 'dark' ? 'bg-[#D4AF37]' : 'bg-[#E6C77A]'
      }`} />
      <div className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-5 ${
        theme === 'dark' ? 'bg-[#E6C77A]' : 'bg-[#D4AF37]'
      }`} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-6">
              <Link href="/" className="flex items-center space-x-3 group transition-transform hover:scale-105">
                <div className="relative">
                  <Image
                    src="/ZM-logo.png"
                    alt="ZM Collection Logo"
                    width={48}
                    height={48}
                    className="h-12 w-12 object-contain transition-transform group-hover:rotate-3"
                  />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] bg-clip-text text-transparent">
                  ZM Collection
                </span>
              </Link>
              <p className={`text-base leading-relaxed max-w-md ${
                theme === 'dark' ? 'text-[#F5F3EE]/70' : 'text-[#0B0B0B]/70'
              }`}>
                Discover premium beauty products and fashionable collections. Curated with care for your complete beauty and style journey.
              </p>
              
              {/* Social Media Links */}
              <div className="flex items-center space-x-4 pt-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2.5 rounded-lg transition-all duration-200 hover:scale-110 hover:text-[#D4AF37] ${
                      theme === 'dark'
                        ? 'text-[#F5F3EE]/60 hover:bg-[#1A1A1A]'
                        : 'text-[#0B0B0B]/60 hover:bg-[#E6C77A]/20'
                    }`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Shop Links */}
            <div className="space-y-4">
              <h3 className={`text-lg font-bold mb-6 ${
                theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'
              }`}>
                Shop
              </h3>
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`text-sm transition-all duration-200 hover:text-[#D4AF37] hover:translate-x-1 inline-block ${
                        theme === 'dark' ? 'text-[#F5F3EE]/70' : 'text-[#0B0B0B]/70'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div className="space-y-4">
              <h3 className={`text-lg font-bold mb-6 ${
                theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'
              }`}>
                Company
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`text-sm transition-all duration-200 hover:text-[#D4AF37] hover:translate-x-1 inline-block ${
                        theme === 'dark' ? 'text-[#F5F3EE]/70' : 'text-[#0B0B0B]/70'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div className="space-y-4">
              <h3 className={`text-lg font-bold mb-6 ${
                theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'
              }`}>
                Support
              </h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`text-sm transition-all duration-200 hover:text-[#D4AF37] hover:translate-x-1 inline-block ${
                        theme === 'dark' ? 'text-[#F5F3EE]/70' : 'text-[#0B0B0B]/70'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t py-8 ${
          theme === 'dark' ? 'border-[#E6C77A]/20' : 'border-[#E6C77A]/30'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className={`text-sm ${
              theme === 'dark' ? 'text-[#F5F3EE]/50' : 'text-[#0B0B0B]/50'
            }`}>
              © {new Date().getFullYear()} ZM Collection. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link
                href="/privacy"
                className={`text-sm transition-all duration-200 hover:text-[#D4AF37] ${
                  theme === 'dark' ? 'text-[#F5F3EE]/50' : 'text-[#0B0B0B]/50'
                }`}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className={`text-sm transition-all duration-200 hover:text-[#D4AF37] ${
                  theme === 'dark' ? 'text-[#F5F3EE]/50' : 'text-[#0B0B0B]/50'
                }`}
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className={`text-sm transition-all duration-200 hover:text-[#D4AF37] ${
                  theme === 'dark' ? 'text-[#F5F3EE]/50' : 'text-[#0B0B0B]/50'
                }`}
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

