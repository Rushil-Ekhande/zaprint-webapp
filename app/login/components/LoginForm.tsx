'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import TopNavigationBar from '@/components/common/TopNavigationBar';

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

const MOCK_CREDENTIALS = {
  email: 'demo@zaprint.com',
  password: 'Print@2025',
};

export default function LoginForm() {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (
      formData.email === MOCK_CREDENTIALS.email &&
      formData.password === MOCK_CREDENTIALS.password
    ) {
      if (isHydrated && typeof window !== 'undefined') {
        localStorage.setItem('zaprint_auth', 'true');
        localStorage.setItem('zaprint_user', JSON.stringify({
          name: 'Demo User',
          email: formData.email,
        }));
      }
      router.push('/document-upload');
    } else {
      setErrors({
        general: `Invalid credentials. Please use email: ${MOCK_CREDENTIALS.email} and password: ${MOCK_CREDENTIALS.password}`,
      });
      setIsLoading(false);
    }
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <TopNavigationBar isAuthenticated={false} />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-8 md:px-6 sm:px-4 py-16 md:py-12 sm:py-8">
          <div className="w-full max-w-md bg-card rounded-2xl shadow-warm-lg p-8 md:p-6 sm:p-4">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-3/4 mx-auto" />
              <div className="h-4 bg-muted rounded w-1/2 mx-auto" />
              <div className="space-y-4">
                <div className="h-12 bg-muted rounded" />
                <div className="h-12 bg-muted rounded" />
                <div className="h-12 bg-muted rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNavigationBar isAuthenticated={false} />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-8 md:px-6 sm:px-4 py-16 md:py-12 sm:py-8">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl shadow-warm-lg p-8 md:p-6 sm:p-4">
            <div className="text-center mb-8 md:mb-6 sm:mb-4">
              <h1 className="text-3xl md:text-2xl sm:text-xl font-heading font-semibold text-foreground mb-2">
                Welcome Back
              </h1>
              <p className="text-base md:text-sm sm:text-sm text-muted-foreground">
                Sign in to access your printing dashboard
              </p>
            </div>

            {errors.general && (
              <div className="mb-6 md:mb-4 sm:mb-4 p-4 md:p-3 sm:p-3 bg-error/10 border border-error/20 rounded-lg flex items-start space-x-3">
                <Icon name="ExclamationCircleIcon" size={20} className="text-error flex-shrink-0 mt-0.5" />
                <p className="text-sm text-error flex-1">{errors.general}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-4 sm:space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Icon name="EnvelopeIcon" size={20} className="text-muted-foreground" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 md:py-2.5 sm:py-2.5 bg-background border rounded-lg text-base md:text-sm sm:text-sm text-foreground placeholder:text-muted-foreground transition-all duration-250 ease-out focus:outline-none focus:ring-3 focus:ring-ring focus:border-primary ${
                      errors.email ? 'border-error' : 'border-input'
                    }`}
                    placeholder="you@example.com"
                    disabled={isLoading}
                    autoComplete="email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-error flex items-center space-x-1">
                    <Icon name="ExclamationCircleIcon" size={16} />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Icon name="LockClosedIcon" size={20} className="text-muted-foreground" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`w-full pl-12 pr-12 py-3 md:py-2.5 sm:py-2.5 bg-background border rounded-lg text-base md:text-sm sm:text-sm text-foreground placeholder:text-muted-foreground transition-all duration-250 ease-out focus:outline-none focus:ring-3 focus:ring-ring focus:border-primary ${
                      errors.password ? 'border-error' : 'border-input'
                    }`}
                    placeholder="Enter your password"
                    disabled={isLoading}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center transition-all duration-250 ease-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                    disabled={isLoading}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <Icon
                      name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'}
                      size={20}
                      className="text-muted-foreground"
                    />
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-error flex items-center space-x-1">
                    <Icon name="ExclamationCircleIcon" size={16} />
                    <span>{errors.password}</span>
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                    className="w-4 h-4 rounded border-input text-primary focus:ring-3 focus:ring-ring focus:ring-offset-2 transition-all duration-250 ease-out cursor-pointer"
                    disabled={isLoading}
                  />
                  <span className="text-sm text-foreground select-none">Remember me</span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:text-primary/80 transition-all duration-250 ease-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground py-3 md:py-2.5 sm:py-2.5 rounded-lg font-medium text-base md:text-sm sm:text-sm transition-all duration-250 ease-out hover:-translate-y-px hover:shadow-warm-md focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none active:scale-97"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center space-x-2">
                    <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
                    <span>Signing In...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center space-x-2">
                    <span>Sign In</span>
                    <Icon name="ArrowRightIcon" size={20} />
                  </span>
                )}
              </button>
            </form>

            <div className="mt-6 md:mt-4 sm:mt-4 pt-6 md:pt-4 sm:pt-4 border-t border-border">
              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link
                  href="/signup"
                  className="text-primary font-medium hover:text-primary/80 transition-all duration-250 ease-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-8 md:mt-6 sm:mt-4 flex items-center justify-center space-x-4 md:space-x-3 sm:space-x-2">
            <div className="flex items-center space-x-2">
              <Icon name="ShieldCheckIcon" size={20} className="text-success" />
              <span className="text-sm text-muted-foreground">SSL Secured</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center space-x-2">
              <Icon name="LockClosedIcon" size={20} className="text-success" />
              <span className="text-sm text-muted-foreground">256-bit Encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}