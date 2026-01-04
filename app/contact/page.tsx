'use client';

import { useTheme } from '../contexts/ThemeContext';
import { useState } from 'react';

export default function ContactPage() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }, 1000);
  };

  const contactMethods = [
    {
      title: 'Email',
      value: 'hello@zmcollection.com',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Phone',
      value: '+1 (555) 123-4567',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
    {
      title: 'Address',
      value: '123 Beauty Street, Fashion District, NY 10001',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: 'Hours',
      value: 'Mon-Fri: 9AM-6PM EST',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const faqs = [
    {
      question: 'How can I track my order?',
      answer: 'Once your order ships, you\'ll receive a tracking number via email. You can use this to track your package in real-time.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy on all unused items in their original packaging. Please contact us for return authorization.',
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location.',
    },
    {
      question: 'How do I change or cancel my order?',
      answer: 'Please contact us immediately if you need to change or cancel your order. We\'ll do our best to accommodate your request.',
    },
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
                Get in Touch
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-[1.1]">
              <span className={`block ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
                Contact
              </span>
              <span className="block bg-gradient-to-r from-[#D4AF37] via-[#E6C77A] to-[#D4AF37] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                Us
              </span>
            </h1>
            <p className={`text-xl md:text-2xl leading-relaxed ${theme === 'dark' ? 'text-[#F5F3EE]/70' : 'text-[#0B0B0B]/70'}`}>
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className={`relative overflow-hidden ${theme === 'dark' ? 'bg-[#0B0B0B]' : 'bg-[#F5F3EE]'}`}>
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${theme === 'dark' ? '#D4AF37' : '#000000'} 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {contactMethods.map((method, index) => (
              <div
                key={method.title}
                className={`relative rounded-2xl p-6 border-2 transition-all duration-300 hover:scale-[1.02] ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-[#E6C77A]/20 hover:border-[#E6C77A]/40'
                    : 'bg-gradient-to-br from-white to-[#F5F3EE] border-[#E6C77A]/30 hover:border-[#E6C77A]/50'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className={`p-4 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#E6C77A] text-[#0B0B0B]`}>
                    {method.icon}
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
                      {method.title}
                    </h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-[#F5F3EE]/70' : 'text-[#0B0B0B]/70'}`}>
                      {method.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className={`relative overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-b from-[#1A1A1A] to-[#0B0B0B]' : 'bg-gradient-to-b from-white to-[#F5F3EE]'}`}>
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${theme === 'dark' ? '#D4AF37' : '#000000'} 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className={`rounded-3xl p-8 md:p-12 border-2 ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-[#E6C77A]/20'
              : 'bg-gradient-to-br from-white to-[#F5F3EE] border-[#E6C77A]/30'
          }`}>
            <div className="text-center mb-8">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
                Send us a Message
              </h2>
              <p className={`text-lg ${theme === 'dark' ? 'text-[#F5F3EE]/70' : 'text-[#0B0B0B]/70'}`}>
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all ${
                      theme === 'dark'
                        ? 'bg-[#0B0B0B]/50 border-[#E6C77A]/30 text-[#F5F3EE] placeholder-[#F5F3EE]/50'
                        : 'bg-white/80 border-[#E6C77A]/50 text-[#0B0B0B] placeholder-[#0B0B0B]/50'
                    }`}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all ${
                      theme === 'dark'
                        ? 'bg-[#0B0B0B]/50 border-[#E6C77A]/30 text-[#F5F3EE] placeholder-[#F5F3EE]/50'
                        : 'bg-white/80 border-[#E6C77A]/50 text-[#0B0B0B] placeholder-[#0B0B0B]/50'
                    }`}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all ${
                    theme === 'dark'
                      ? 'bg-[#0B0B0B]/50 border-[#E6C77A]/30 text-[#F5F3EE]'
                      : 'bg-white/80 border-[#E6C77A]/50 text-[#0B0B0B]'
                  }`}
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Question</option>
                  <option value="return">Return/Exchange</option>
                  <option value="product">Product Question</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all resize-none ${
                    theme === 'dark'
                      ? 'bg-[#0B0B0B]/50 border-[#E6C77A]/30 text-[#F5F3EE] placeholder-[#F5F3EE]/50'
                      : 'bg-white/80 border-[#E6C77A]/50 text-[#0B0B0B] placeholder-[#0B0B0B]/50'
                  }`}
                  placeholder="Tell us how we can help..."
                />
              </div>

              {submitStatus === 'success' && (
                <div className={`p-4 rounded-xl border-2 bg-green-500/10 border-green-500/50 text-green-500`}>
                  Thank you! Your message has been sent successfully. We'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className={`p-4 rounded-xl border-2 bg-red-500/10 border-red-500/50 text-red-500`}>
                  Something went wrong. Please try again later.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] text-[#0B0B0B] font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#D4AF37]/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`relative overflow-hidden ${theme === 'dark' ? 'bg-[#0B0B0B]' : 'bg-[#F5F3EE]'}`}>
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${theme === 'dark' ? '#D4AF37' : '#000000'} 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
              Frequently Asked Questions
            </h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-[#F5F3EE]/60' : 'text-[#0B0B0B]/60'}`}>
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 border-2 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-[#E6C77A]/20'
                    : 'bg-gradient-to-br from-white to-[#F5F3EE] border-[#E6C77A]/30'
                }`}
              >
                <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'}`}>
                  {faq.question}
                </h3>
                <p className={`text-base ${theme === 'dark' ? 'text-[#F5F3EE]/70' : 'text-[#0B0B0B]/70'}`}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

