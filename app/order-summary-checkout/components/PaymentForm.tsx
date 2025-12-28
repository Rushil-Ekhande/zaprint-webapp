'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface PaymentFormData {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
  billingAddress: string;
  city: string;
  zipCode: string;
  country: string;
}

interface PaymentFormProps {
  onSubmit: (data: PaymentFormData) => void;
  isProcessing: boolean;
}

const PaymentForm = ({ onSubmit, isProcessing }: PaymentFormProps) => {
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    city: '',
    zipCode: '',
    country: 'United States',
  });

  const [errors, setErrors] = useState<Partial<PaymentFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<PaymentFormData> = {};

    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }

    if (!formData.cardName || formData.cardName.trim().length < 3) {
      newErrors.cardName = 'Please enter the name on card';
    }

    if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Please enter expiry date (MM/YY)';
    }

    if (!formData.cvv || formData.cvv.length !== 3) {
      newErrors.cvv = 'Please enter a valid 3-digit CVV';
    }

    if (!formData.billingAddress || formData.billingAddress.trim().length < 5) {
      newErrors.billingAddress = 'Please enter your billing address';
    }

    if (!formData.city || formData.city.trim().length < 2) {
      newErrors.city = 'Please enter your city';
    }

    if (!formData.zipCode || formData.zipCode.length < 5) {
      newErrors.zipCode = 'Please enter a valid ZIP code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const formatCardNumber = (value: string): string => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  const formatExpiryDate = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 16) {
      setFormData({ ...formData, cardNumber: formatCardNumber(value) });
      if (errors.cardNumber) {
        setErrors({ ...errors, cardNumber: undefined });
      }
    }
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      setFormData({ ...formData, expiryDate: formatExpiryDate(value) });
      if (errors.expiryDate) {
        setErrors({ ...errors, expiryDate: undefined });
      }
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setFormData({ ...formData, cvv: value });
      if (errors.cvv) {
        setErrors({ ...errors, cvv: undefined });
      }
    }
  };

  return (
    <div className="w-full min-w-0 bg-card rounded-xl shadow-warm-md overflow-hidden">
      <div className="px-8 md:px-6 sm:px-4 py-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-xl sm:text-lg font-heading font-semibold text-foreground">
            Payment Information
          </h2>
          <div className="flex items-center space-x-2">
            <Icon name="LockClosedIcon" size={20} className="text-success" />
            <span className="text-xs text-caption text-success font-medium">Secure Payment</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-8 md:px-6 sm:px-4 py-6 space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-sm md:text-xs sm:text-xs font-medium text-foreground mb-2">
              Card Number
            </label>
            <div className="relative">
              <input
                type="text"
                id="cardNumber"
                value={formData.cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                disabled={isProcessing}
                className={`w-full px-4 md:px-3 sm:px-3 py-3 md:py-2.5 sm:py-2.5 text-sm md:text-xs sm:text-xs bg-background border ${
                  errors.cardNumber ? 'border-error' : 'border-input'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-250 ease-out disabled:opacity-50 disabled:cursor-not-allowed`}
              />
              <Icon
                name="CreditCardIcon"
                size={20}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
            </div>
            {errors.cardNumber && (
              <p className="text-xs text-error mt-1">{errors.cardNumber}</p>
            )}
          </div>

          <div>
            <label htmlFor="cardName" className="block text-sm md:text-xs sm:text-xs font-medium text-foreground mb-2">
              Name on Card
            </label>
            <input
              type="text"
              id="cardName"
              value={formData.cardName}
              onChange={(e) => {
                setFormData({ ...formData, cardName: e.target.value });
                if (errors.cardName) {
                  setErrors({ ...errors, cardName: undefined });
                }
              }}
              placeholder="John Doe"
              disabled={isProcessing}
              className={`w-full px-4 md:px-3 sm:px-3 py-3 md:py-2.5 sm:py-2.5 text-sm md:text-xs sm:text-xs bg-background border ${
                errors.cardName ? 'border-error' : 'border-input'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-250 ease-out disabled:opacity-50 disabled:cursor-not-allowed`}
            />
            {errors.cardName && (
              <p className="text-xs text-error mt-1">{errors.cardName}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-3 sm:gap-2">
            <div>
              <label htmlFor="expiryDate" className="block text-sm md:text-xs sm:text-xs font-medium text-foreground mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                value={formData.expiryDate}
                onChange={handleExpiryDateChange}
                placeholder="MM/YY"
                disabled={isProcessing}
                className={`w-full px-4 md:px-3 sm:px-3 py-3 md:py-2.5 sm:py-2.5 text-sm md:text-xs sm:text-xs bg-background border ${
                  errors.expiryDate ? 'border-error' : 'border-input'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-250 ease-out disabled:opacity-50 disabled:cursor-not-allowed`}
              />
              {errors.expiryDate && (
                <p className="text-xs text-error mt-1">{errors.expiryDate}</p>
              )}
            </div>

            <div>
              <label htmlFor="cvv" className="block text-sm md:text-xs sm:text-xs font-medium text-foreground mb-2">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                value={formData.cvv}
                onChange={handleCvvChange}
                placeholder="123"
                disabled={isProcessing}
                className={`w-full px-4 md:px-3 sm:px-3 py-3 md:py-2.5 sm:py-2.5 text-sm md:text-xs sm:text-xs bg-background border ${
                  errors.cvv ? 'border-error' : 'border-input'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-250 ease-out disabled:opacity-50 disabled:cursor-not-allowed`}
              />
              {errors.cvv && (
                <p className="text-xs text-error mt-1">{errors.cvv}</p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 space-y-4">
          <h3 className="text-lg md:text-base sm:text-sm font-heading font-semibold text-foreground">
            Billing Address
          </h3>

          <div>
            <label htmlFor="billingAddress" className="block text-sm md:text-xs sm:text-xs font-medium text-foreground mb-2">
              Street Address
            </label>
            <input
              type="text"
              id="billingAddress"
              value={formData.billingAddress}
              onChange={(e) => {
                setFormData({ ...formData, billingAddress: e.target.value });
                if (errors.billingAddress) {
                  setErrors({ ...errors, billingAddress: undefined });
                }
              }}
              placeholder="123 Main Street"
              disabled={isProcessing}
              className={`w-full px-4 md:px-3 sm:px-3 py-3 md:py-2.5 sm:py-2.5 text-sm md:text-xs sm:text-xs bg-background border ${
                errors.billingAddress ? 'border-error' : 'border-input'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-250 ease-out disabled:opacity-50 disabled:cursor-not-allowed`}
            />
            {errors.billingAddress && (
              <p className="text-xs text-error mt-1">{errors.billingAddress}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-3 sm:gap-2">
            <div>
              <label htmlFor="city" className="block text-sm md:text-xs sm:text-xs font-medium text-foreground mb-2">
                City
              </label>
              <input
                type="text"
                id="city"
                value={formData.city}
                onChange={(e) => {
                  setFormData({ ...formData, city: e.target.value });
                  if (errors.city) {
                    setErrors({ ...errors, city: undefined });
                  }
                }}
                placeholder="New York"
                disabled={isProcessing}
                className={`w-full px-4 md:px-3 sm:px-3 py-3 md:py-2.5 sm:py-2.5 text-sm md:text-xs sm:text-xs bg-background border ${
                  errors.city ? 'border-error' : 'border-input'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-250 ease-out disabled:opacity-50 disabled:cursor-not-allowed`}
              />
              {errors.city && (
                <p className="text-xs text-error mt-1">{errors.city}</p>
              )}
            </div>

            <div>
              <label htmlFor="zipCode" className="block text-sm md:text-xs sm:text-xs font-medium text-foreground mb-2">
                ZIP Code
              </label>
              <input
                type="text"
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => {
                  setFormData({ ...formData, zipCode: e.target.value });
                  if (errors.zipCode) {
                    setErrors({ ...errors, zipCode: undefined });
                  }
                }}
                placeholder="10001"
                disabled={isProcessing}
                className={`w-full px-4 md:px-3 sm:px-3 py-3 md:py-2.5 sm:py-2.5 text-sm md:text-xs sm:text-xs bg-background border ${
                  errors.zipCode ? 'border-error' : 'border-input'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-250 ease-out disabled:opacity-50 disabled:cursor-not-allowed`}
              />
              {errors.zipCode && (
                <p className="text-xs text-error mt-1">{errors.zipCode}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="country" className="block text-sm md:text-xs sm:text-xs font-medium text-foreground mb-2">
              Country
            </label>
            <select
              id="country"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              disabled={isProcessing}
              className="w-full px-4 md:px-3 sm:px-3 py-3 md:py-2.5 sm:py-2.5 text-sm md:text-xs sm:text-xs bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-250 ease-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
            </select>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full flex items-center justify-center space-x-3 px-8 md:px-6 sm:px-4 py-4 md:py-3 sm:py-3 bg-primary text-primary-foreground rounded-lg font-medium text-base md:text-sm sm:text-sm transition-all duration-250 ease-out hover:bg-primary/90 hover:-translate-y-px focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 shadow-warm-md"
          >
            {isProcessing ? (
              <>
                <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
                <span>Processing Payment...</span>
              </>
            ) : (
              <>
                <Icon name="LockClosedIcon" size={20} />
                <span>Complete Order</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-center space-x-4 mt-4">
            <Icon name="ShieldCheckIcon" size={20} className="text-muted-foreground" />
            <p className="text-xs text-caption text-muted-foreground">
              Your payment information is encrypted and secure
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;