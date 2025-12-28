'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface StatusNotificationBannerProps {
  status: 'uploaded' | 'queued' | 'printing' | 'completed';
  message: string;
  showBanner: boolean;
  onDismiss?: () => void;
}

export default function StatusNotificationBanner({
  status,
  message,
  showBanner,
  onDismiss,
}: StatusNotificationBannerProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && showBanner) {
      setIsVisible(true);
    }
  }, [isHydrated, showBanner]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      setTimeout(onDismiss, 300);
    }
  };

  if (!isHydrated || !isVisible) {
    return null;
  }

  const getBannerStyles = () => {
    switch (status) {
      case 'uploaded':
        return 'bg-primary/10 border-primary text-primary';
      case 'queued':
        return 'bg-warning/10 border-warning text-warning';
      case 'printing':
        return 'bg-accent/10 border-accent text-accent';
      case 'completed':
        return 'bg-success/10 border-success text-success';
      default:
        return 'bg-muted border-border text-foreground';
    }
  };

  const getIcon = () => {
    switch (status) {
      case 'uploaded':
        return 'DocumentArrowUpIcon';
      case 'queued':
        return 'ClockIcon';
      case 'printing':
        return 'PrinterIcon';
      case 'completed':
        return 'CheckCircleIcon';
      default:
        return 'InformationCircleIcon';
    }
  };

  return (
    <div
      className={`w-full border-2 rounded-xl p-4 md:p-3 sm:p-3 transition-all duration-250 ease-out ${getBannerStyles()} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      }`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start space-x-3">
        <Icon name={getIcon() as any} size={24} className="flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-sm md:text-xs font-medium line-clamp-2">{message}</p>
        </div>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-250 ease-out focus:outline-none focus:ring-2 focus:ring-current"
          aria-label="Dismiss notification"
        >
          <Icon name="XMarkIcon" size={20} />
        </button>
      </div>
    </div>
  );
}