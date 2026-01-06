'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export default function SignUpPage() {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeNewsletter: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    // Handle sign up logic here
    console.log('Sign up:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Password strength calculation
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#D4AF37'];

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-[#0B0B0B]' : 'bg-[#F5F3EE]'}`}>
      {/* Left Side - Sign Up Form */}
      <div className={`w-full lg:w-1/2 flex items-center justify-center p-8 ${
        theme === 'dark' ? 'bg-[#0B0B0B]' : 'bg-[#F5F3EE]'
      }`}>
        <div className="w-full max-w-md space-y-6 animate-fade-in">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-6">
            <Link href="/" className="inline-block">
              <Image
                src="/ZM-logo.png"
                alt="ZM Collection"
                width={80}
                height={80}
                className="mx-auto"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] bg-clip-text text-transparent">
                ZM Collection
              </span>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center lg:text-left">
            <h2 className={`text-3xl font-bold ${
              theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'
            }`}>
              Create Account
            </h2>
            <p className={`mt-2 ${theme === 'dark' ? 'text-[#F5F3EE]/60' : 'text-[#0B0B0B]/60'}`}>
              Join our exclusive community
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label 
                  htmlFor="firstName" 
                  className={`block text-sm font-medium ${
                    theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'
                  }`}
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-0 ${
                    theme === 'dark'
                      ? 'bg-[#1A1A1A] border-[#E6C77A]/20 text-[#F5F3EE] placeholder-[#F5F3EE]/40 focus:border-[#D4AF37]'
                      : 'bg-white border-[#E6C77A]/30 text-[#0B0B0B] placeholder-[#0B0B0B]/40 focus:border-[#D4AF37]'
                  }`}
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <label 
                  htmlFor="lastName" 
                  className={`block text-sm font-medium ${
                    theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'
                  }`}
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-0 ${
                    theme === 'dark'
                      ? 'bg-[#1A1A1A] border-[#E6C77A]/20 text-[#F5F3EE] placeholder-[#F5F3EE]/40 focus:border-[#D4AF37]'
                      : 'bg-white border-[#E6C77A]/30 text-[#0B0B0B] placeholder-[#0B0B0B]/40 focus:border-[#D4AF37]'
                  }`}
                  placeholder="Doe"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label 
                htmlFor="email" 
                className={`block text-sm font-medium ${
                  theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'
                }`}
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-0 ${
                    theme === 'dark'
                      ? 'bg-[#1A1A1A] border-[#E6C77A]/20 text-[#F5F3EE] placeholder-[#F5F3EE]/40 focus:border-[#D4AF37]'
                      : 'bg-white border-[#E6C77A]/30 text-[#0B0B0B] placeholder-[#0B0B0B]/40 focus:border-[#D4AF37]'
                  }`}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label 
                htmlFor="password" 
                className={`block text-sm font-medium ${
                  theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'
                }`}
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-12 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-0 ${
                    theme === 'dark'
                      ? 'bg-[#1A1A1A] border-[#E6C77A]/20 text-[#F5F3EE] placeholder-[#F5F3EE]/40 focus:border-[#D4AF37]'
                      : 'bg-white border-[#E6C77A]/30 text-[#0B0B0B] placeholder-[#0B0B0B]/40 focus:border-[#D4AF37]'
                  }`}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showPassword ? (
                    <svg className={`h-5 w-5 ${theme === 'dark' ? 'text-[#F5F3EE]/60' : 'text-[#0B0B0B]/60'} hover:text-[#D4AF37] transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className={`h-5 w-5 ${theme === 'dark' ? 'text-[#F5F3EE]/60' : 'text-[#0B0B0B]/60'} hover:text-[#D4AF37] transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="space-y-2 mt-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                          i < passwordStrength 
                            ? '' 
                            : theme === 'dark' ? 'bg-[#1A1A1A]' : 'bg-gray-200'
                        }`}
                        style={{ backgroundColor: i < passwordStrength ? strengthColors[passwordStrength - 1] : undefined }}
                      />
                    ))}
                  </div>
                  <p className={`text-xs ${theme === 'dark' ? 'text-[#F5F3EE]/50' : 'text-[#0B0B0B]/50'}`}>
                    Password strength: <span style={{ color: strengthColors[passwordStrength - 1] || '#6b7280' }}>{strengthLabels[passwordStrength - 1] || 'Too Short'}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label 
                htmlFor="confirmPassword" 
                className={`block text-sm font-medium ${
                  theme === 'dark' ? 'text-[#F5F3EE]' : 'text-[#0B0B0B]'
                }`}
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-12 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-0 ${
                    theme === 'dark'
                      ? 'bg-[#1A1A1A] border-[#E6C77A]/20 text-[#F5F3EE] placeholder-[#F5F3EE]/40 focus:border-[#D4AF37]'
                      : 'bg-white border-[#E6C77A]/30 text-[#0B0B0B] placeholder-[#0B0B0B]/40 focus:border-[#D4AF37]'
                  } ${
                    formData.confirmPassword && formData.password !== formData.confirmPassword
                      ? 'border-red-500 focus:border-red-500'
                      : formData.confirmPassword && formData.password === formData.confirmPassword
                      ? 'border-green-500 focus:border-green-500'
                      : ''
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showConfirmPassword ? (
                    <svg className={`h-5 w-5 ${theme === 'dark' ? 'text-[#F5F3EE]/60' : 'text-[#0B0B0B]/60'} hover:text-[#D4AF37] transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className={`h-5 w-5 ${theme === 'dark' ? 'text-[#F5F3EE]/60' : 'text-[#0B0B0B]/60'} hover:text-[#D4AF37] transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
              )}
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-0.5">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    required
                    className="sr-only peer"
                  />
                  <div className={`w-5 h-5 rounded border-2 transition-all duration-200 peer-checked:bg-[#D4AF37] peer-checked:border-[#D4AF37] ${
                    theme === 'dark' ? 'border-[#E6C77A]/30' : 'border-[#E6C77A]/50'
                  }`} />
                  <svg 
                    className="absolute inset-0 w-full h-full text-[#0B0B0B] opacity-0 peer-checked:opacity-100 transition-opacity p-0.5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className={`text-sm ${theme === 'dark' ? 'text-[#F5F3EE]/70' : 'text-[#0B0B0B]/70'}`}>
                  I agree to the{' '}
                  <Link href="/terms" className="text-[#D4AF37] hover:text-[#E6C77A] font-medium transition-colors">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-[#D4AF37] hover:text-[#E6C77A] font-medium transition-colors">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-0.5">
                  <input
                    type="checkbox"
                    name="subscribeNewsletter"
                    checked={formData.subscribeNewsletter}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className={`w-5 h-5 rounded border-2 transition-all duration-200 peer-checked:bg-[#D4AF37] peer-checked:border-[#D4AF37] ${
                    theme === 'dark' ? 'border-[#E6C77A]/30' : 'border-[#E6C77A]/50'
                  }`} />
                  <svg 
                    className="absolute inset-0 w-full h-full text-[#0B0B0B] opacity-0 peer-checked:opacity-100 transition-opacity p-0.5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className={`text-sm ${theme === 'dark' ? 'text-[#F5F3EE]/70' : 'text-[#0B0B0B]/70'}`}>
                  Subscribe to our newsletter for exclusive offers
                </span>
              </label>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={isLoading || !formData.agreeToTerms}
              className="relative w-full py-4 rounded-xl font-semibold text-[#0B0B0B] bg-gradient-to-r from-[#D4AF37] via-[#E6C77A] to-[#D4AF37] bg-[length:200%_100%] hover:bg-right transition-all duration-500 shadow-lg shadow-[#D4AF37]/25 hover:shadow-[#D4AF37]/40 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden group"
            >
              <span className={`relative z-10 flex items-center justify-center gap-2 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                Create Account
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-[#0B0B0B]/30 border-t-[#0B0B0B] rounded-full animate-spin" />
                </div>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${theme === 'dark' ? 'border-[#E6C77A]/20' : 'border-[#E6C77A]/30'}`} />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-4 ${theme === 'dark' ? 'bg-[#0B0B0B] text-[#F5F3EE]/50' : 'bg-[#F5F3EE] text-[#0B0B0B]/50'}`}>
                or sign up with
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <button className={`flex items-center justify-center gap-3 py-3 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] ${
              theme === 'dark'
                ? 'bg-[#1A1A1A] border-[#E6C77A]/20 hover:border-[#D4AF37] text-[#F5F3EE]'
                : 'bg-white border-[#E6C77A]/30 hover:border-[#D4AF37] text-[#0B0B0B]'
            }`}>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="font-medium">Google</span>
            </button>
            <button className={`flex items-center justify-center gap-3 py-3 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] ${
              theme === 'dark'
                ? 'bg-[#1A1A1A] border-[#E6C77A]/20 hover:border-[#D4AF37] text-[#F5F3EE]'
                : 'bg-white border-[#E6C77A]/30 hover:border-[#D4AF37] text-[#0B0B0B]'
            }`}>
              <svg className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-black'}`} fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span className="font-medium">Apple</span>
            </button>
          </div>

          {/* Sign In Link */}
          <p className={`text-center ${theme === 'dark' ? 'text-[#F5F3EE]/60' : 'text-[#0B0B0B]/60'}`}>
            Already have an account?{' '}
            <Link 
              href="/auth/signin" 
              className="text-[#D4AF37] hover:text-[#E6C77A] font-semibold transition-colors"
            >
              Sign in
            </Link>
          </p>

          {/* Back to Home */}
          <div className="text-center">
            <Link 
              href="/" 
              className={`inline-flex items-center gap-2 text-sm ${
                theme === 'dark' ? 'text-[#F5F3EE]/50 hover:text-[#F5F3EE]' : 'text-[#0B0B0B]/50 hover:text-[#0B0B0B]'
              } transition-colors`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Decorative Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-bl from-[#0B0B0B] via-[#1A1A1A] to-[#0B0B0B]" />
        
        {/* Animated Gold Orbs */}
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-[#D4AF37]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-32 left-16 w-96 h-96 bg-[#E6C77A]/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/2 right-1/3 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-2xl animate-pulse delay-500" />
        
        {/* Decorative Lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent" />
          <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-[#E6C77A]/20 to-transparent" />
          <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-center">
          <div className="mb-8 animate-fade-in">
            <Image
              src="/ZM-logo.png"
              alt="ZM Collection"
              width={120}
              height={120}
              className="mx-auto drop-shadow-2xl"
            />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#E6C77A] to-[#D4AF37] bg-clip-text text-transparent">
              Join the Elite
            </span>
          </h1>
          
          <p className="text-[#F5F3EE]/70 text-lg max-w-md animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Create your account and unlock exclusive access to premium beauty collections, personalized recommendations, and member-only offers.
          </p>
          
          {/* Benefits List */}
          <div className="mt-10 space-y-4 text-left animate-fade-in" style={{ animationDelay: '0.6s' }}>
            {[
              'Exclusive member discounts',
              'Early access to new arrivals',
              'Personalized recommendations',
              'Free shipping on orders over ₱2,500',
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-[#0B0B0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[#F5F3EE]/80">{benefit}</span>
              </div>
            ))}
          </div>
          
          {/* Decorative Diamond Pattern */}
          <div className="mt-12 flex items-center gap-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="w-2 h-2 rotate-45 bg-[#D4AF37]" />
            <div className="w-16 h-px bg-gradient-to-r from-[#D4AF37] to-transparent" />
            <div className="w-3 h-3 rotate-45 border border-[#E6C77A]" />
            <div className="w-16 h-px bg-gradient-to-l from-[#D4AF37] to-transparent" />
            <div className="w-2 h-2 rotate-45 bg-[#D4AF37]" />
          </div>
        </div>
      </div>
    </div>
  );
}

