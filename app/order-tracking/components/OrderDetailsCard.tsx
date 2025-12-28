'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface OrderDetails {
  orderId: string;
  documentName: string;
  documentPreview: string;
  documentPreviewAlt: string;
  pageCount: number;
  printShop: {
    name: string;
    address: string;
    phone: string;
    email: string;
    image: string;
    imageAlt: string;
  };
  printConfig: {
    paperSize: string;
    colorMode: string;
    sides: string;
    copies: number;
  };
  pricing: {
    subtotal: number;
    tax: number;
    total: number;
  };
  orderDate: string;
}

interface OrderDetailsCardProps {
  orderDetails: OrderDetails;
}

export default function OrderDetailsCard({ orderDetails }: OrderDetailsCardProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="w-full bg-card rounded-xl shadow-warm-md p-8 md:p-6 sm:p-4">
        <div className="h-6 bg-muted rounded w-1/3 mb-6 animate-pulse" />
        <div className="space-y-4">
          <div className="h-32 bg-muted rounded animate-pulse" />
          <div className="h-24 bg-muted rounded animate-pulse" />
          <div className="h-24 bg-muted rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-card rounded-xl shadow-warm-md p-8 md:p-6 sm:p-4">
      <h2 className="text-2xl md:text-xl sm:text-lg font-heading font-semibold text-foreground mb-6 md:mb-5 sm:mb-4">
        Order Details
      </h2>

      {/* Order ID */}
      <div className="mb-6 md:mb-5 sm:mb-4 pb-6 md:pb-5 sm:pb-4 border-b border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-caption text-muted-foreground">Order ID</span>
          <span className="text-sm text-mono font-medium text-foreground whitespace-nowrap">
            {orderDetails.orderId}
          </span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-caption text-muted-foreground">Order Date</span>
          <span className="text-sm text-foreground whitespace-nowrap">{orderDetails.orderDate}</span>
        </div>
      </div>

      {/* Document Info */}
      <div className="mb-6 md:mb-5 sm:mb-4 pb-6 md:pb-5 sm:pb-4 border-b border-border">
        <h3 className="text-base md:text-sm font-medium text-foreground mb-4 md:mb-3 sm:mb-2">
          Document Information
        </h3>
        <div className="flex items-start space-x-4 md:space-x-3 sm:space-x-2">
          <div className="w-16 h-20 md:w-14 md:h-18 sm:w-12 sm:h-16 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
            <AppImage
              src={orderDetails.documentPreview}
              alt={orderDetails.documentPreviewAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm md:text-xs font-medium text-foreground mb-1 line-clamp-2">
              {orderDetails.documentName}
            </p>
            <p className="text-xs text-caption text-muted-foreground">
              {orderDetails.pageCount} {orderDetails.pageCount === 1 ? 'page' : 'pages'}
            </p>
          </div>
        </div>
      </div>

      {/* Print Shop Info */}
      <div className="mb-6 md:mb-5 sm:mb-4 pb-6 md:pb-5 sm:pb-4 border-b border-border">
        <h3 className="text-base md:text-sm font-medium text-foreground mb-4 md:mb-3 sm:mb-2">
          Print Shop
        </h3>
        <div className="flex items-start space-x-4 md:space-x-3 sm:space-x-2 mb-4 md:mb-3 sm:mb-2">
          <div className="w-12 h-12 md:w-10 md:h-10 sm:w-10 sm:h-10 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
            <AppImage
              src={orderDetails.printShop.image}
              alt={orderDetails.printShop.imageAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm md:text-xs font-medium text-foreground mb-1 line-clamp-1">
              {orderDetails.printShop.name}
            </p>
            <p className="text-xs text-caption text-muted-foreground line-clamp-2">
              {orderDetails.printShop.address}
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <a
            href={`tel:${orderDetails.printShop.phone}`}
            className="flex items-center space-x-2 text-sm md:text-xs text-primary hover:text-primary/80 transition-all duration-250 ease-out"
          >
            <Icon name="PhoneIcon" size={16} />
            <span className="whitespace-nowrap">{orderDetails.printShop.phone}</span>
          </a>
          <a
            href={`mailto:${orderDetails.printShop.email}`}
            className="flex items-center space-x-2 text-sm md:text-xs text-primary hover:text-primary/80 transition-all duration-250 ease-out"
          >
            <Icon name="EnvelopeIcon" size={16} />
            <span className="truncate">{orderDetails.printShop.email}</span>
          </a>
        </div>
      </div>

      {/* Print Configuration */}
      <div className="mb-6 md:mb-5 sm:mb-4 pb-6 md:pb-5 sm:pb-4 border-b border-border">
        <h3 className="text-base md:text-sm font-medium text-foreground mb-4 md:mb-3 sm:mb-2">
          Print Configuration
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-2">
          <div className="flex items-center justify-between sm:flex-col sm:items-start">
            <span className="text-sm md:text-xs text-caption text-muted-foreground">Paper Size</span>
            <span className="text-sm md:text-xs font-medium text-foreground whitespace-nowrap">
              {orderDetails.printConfig.paperSize}
            </span>
          </div>
          <div className="flex items-center justify-between sm:flex-col sm:items-start">
            <span className="text-sm md:text-xs text-caption text-muted-foreground">Color Mode</span>
            <span className="text-sm md:text-xs font-medium text-foreground whitespace-nowrap">
              {orderDetails.printConfig.colorMode}
            </span>
          </div>
          <div className="flex items-center justify-between sm:flex-col sm:items-start">
            <span className="text-sm md:text-xs text-caption text-muted-foreground">Sides</span>
            <span className="text-sm md:text-xs font-medium text-foreground whitespace-nowrap">
              {orderDetails.printConfig.sides}
            </span>
          </div>
          <div className="flex items-center justify-between sm:flex-col sm:items-start">
            <span className="text-sm md:text-xs text-caption text-muted-foreground">Copies</span>
            <span className="text-sm md:text-xs font-medium text-foreground whitespace-nowrap">
              {orderDetails.printConfig.copies}
            </span>
          </div>
        </div>
      </div>

      {/* Pricing Summary */}
      <div>
        <h3 className="text-base md:text-sm font-medium text-foreground mb-4 md:mb-3 sm:mb-2">
          Pricing Summary
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm md:text-xs text-muted-foreground">Subtotal</span>
            <span className="text-sm md:text-xs font-medium text-foreground whitespace-nowrap">
              ${orderDetails.pricing.subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm md:text-xs text-muted-foreground">Tax</span>
            <span className="text-sm md:text-xs font-medium text-foreground whitespace-nowrap">
              ${orderDetails.pricing.tax.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <span className="text-base md:text-sm font-semibold text-foreground">Total</span>
            <span className="text-base md:text-sm font-semibold text-primary whitespace-nowrap">
              ${orderDetails.pricing.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}