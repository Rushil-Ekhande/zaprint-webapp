'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface OrderActionsPanelProps {
  currentStatus: 'uploaded' | 'queued' | 'printing' | 'completed';
  onContactShop?: () => void;
  onConfirmReceipt?: () => void;
  onDownloadReceipt?: () => void;
}

export default function OrderActionsPanel({
  currentStatus,
  onContactShop,
  onConfirmReceipt,
  onDownloadReceipt,
}: OrderActionsPanelProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="w-full bg-card rounded-xl shadow-warm-md p-8 md:p-6 sm:p-4">
        <div className="h-6 bg-muted rounded w-1/3 mb-4 animate-pulse" />
        <div className="space-y-3">
          <div className="h-12 bg-muted rounded animate-pulse" />
          <div className="h-12 bg-muted rounded animate-pulse" />
        </div>
      </div>
    );
  }

  const handleContactShop = () => {
    if (onContactShop) {
      onContactShop();
    }
  };

  const handleConfirmReceipt = () => {
    if (onConfirmReceipt) {
      onConfirmReceipt();
    }
  };

  const handleDownloadReceipt = () => {
    if (onDownloadReceipt) {
      onDownloadReceipt();
    }
  };

  return (
    <div className="w-full bg-card rounded-xl shadow-warm-md p-8 md:p-6 sm:p-4">
      <h2 className="text-2xl md:text-xl sm:text-lg font-heading font-semibold text-foreground mb-6 md:mb-5 sm:mb-4">
        Quick Actions
      </h2>

      <div className="space-y-3 md:space-y-2">
        {/* Contact Shop - Available during queued and printing */}
        {(currentStatus === 'queued' || currentStatus === 'printing') && (
          <button
            onClick={handleContactShop}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 md:py-2.5 sm:py-2 bg-primary text-primary-foreground rounded-lg font-medium text-base md:text-sm transition-all duration-250 ease-out hover:-translate-y-px hover:shadow-warm-md focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2 active:scale-97"
          >
            <Icon name="PhoneIcon" size={20} />
            <span>Contact Print Shop</span>
          </button>
        )}

        {/* Confirm Receipt - Available when completed */}
        {currentStatus === 'completed' && (
          <button
            onClick={handleConfirmReceipt}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 md:py-2.5 sm:py-2 bg-success text-success-foreground rounded-lg font-medium text-base md:text-sm transition-all duration-250 ease-out hover:-translate-y-px hover:shadow-warm-md focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2 active:scale-97"
          >
            <Icon name="CheckCircleIcon" size={20} />
            <span>Confirm Receipt</span>
          </button>
        )}

        {/* Download Receipt - Available when completed */}
        {currentStatus === 'completed' && (
          <button
            onClick={handleDownloadReceipt}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 md:py-2.5 sm:py-2 bg-secondary text-secondary-foreground rounded-lg font-medium text-base md:text-sm transition-all duration-250 ease-out hover:-translate-y-px hover:shadow-warm-md focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2 active:scale-97"
          >
            <Icon name="ArrowDownTrayIcon" size={20} />
            <span>Download Receipt</span>
          </button>
        )}

        {/* View All Orders - Always available */}
        <button
          onClick={() => {}}
          className="w-full flex items-center justify-center space-x-2 px-6 py-3 md:py-2.5 sm:py-2 bg-muted text-foreground rounded-lg font-medium text-base md:text-sm transition-all duration-250 ease-out hover:bg-muted/80 focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2 active:scale-97"
        >
          <Icon name="ClipboardDocumentListIcon" size={20} />
          <span>View All Orders</span>
        </button>
      </div>

      {/* Help Section */}
      <div className="mt-6 md:mt-5 sm:mt-4 pt-6 md:pt-5 sm:pt-4 border-t border-border">
        <h3 className="text-base md:text-sm font-medium text-foreground mb-3 md:mb-2">
          Need Help?
        </h3>
        <div className="space-y-2">
          <a
            href="mailto:support@zaprint.com"
            className="flex items-center space-x-2 text-sm md:text-xs text-primary hover:text-primary/80 transition-all duration-250 ease-out"
          >
            <Icon name="EnvelopeIcon" size={16} />
            <span>support@zaprint.com</span>
          </a>
          <a
            href="tel:+1-800-ZAPRINT"
            className="flex items-center space-x-2 text-sm md:text-xs text-primary hover:text-primary/80 transition-all duration-250 ease-out"
          >
            <Icon name="PhoneIcon" size={16} />
            <span>+1-800-ZAPRINT</span>
          </a>
        </div>
      </div>
    </div>
  );
}