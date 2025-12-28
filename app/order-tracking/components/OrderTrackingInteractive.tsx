'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import OrderStatusTimeline from './OrderStatusTimeline';
import OrderDetailsCard from './OrderDetailsCard';
import StatusNotificationBanner from './StatusNotificationBanner';
import OrderActionsPanel from './OrderActionsPanel';

interface OrderData {
  orderId: string;
  currentStatus: 'uploaded' | 'queued' | 'printing' | 'completed';
  uploadedAt: string;
  queuedAt?: string;
  printingAt?: string;
  completedAt?: string;
  estimatedCompletion?: string;
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

export default function OrderTrackingInteractive() {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const mockOrderData: OrderData = {
    orderId: 'ZP-2025-001234',
    currentStatus: 'printing',
    uploadedAt: '12/20/2025, 10:15 AM',
    queuedAt: '12/20/2025, 10:20 AM',
    printingAt: '12/20/2025, 10:45 AM',
    estimatedCompletion: '12/20/2025, 11:30 AM',
    documentName: 'Business_Proposal_Q4_2025.pdf',
    documentPreview: "https://img.rocket.new/generatedImages/rocket_gen_img_1e6a6c261-1764677438459.png",
    documentPreviewAlt: 'Preview of business proposal document with charts and graphs on white paper',
    pageCount: 24,
    printShop: {
      name: 'QuickPrint Downtown',
      address: '456 Main Street, Suite 200, Downtown District, New York, NY 10001',
      phone: '+1 (555) 123-4567',
      email: 'downtown@quickprint.com',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1153eaf97-1764681179487.png",
      imageAlt: 'Modern print shop storefront with large glass windows and QuickPrint signage'
    },
    printConfig: {
      paperSize: 'A4',
      colorMode: 'Color',
      sides: 'Double-sided',
      copies: 3
    },
    pricing: {
      subtotal: 28.50,
      tax: 2.28,
      total: 30.78
    },
    orderDate: '12/20/2025'
  };

  const getNotificationMessage = (status: string) => {
    switch (status) {
      case 'uploaded':
        return 'Your document has been successfully uploaded and is being processed.';
      case 'queued':
        return 'Your order is in the print queue. We\'ll notify you when printing begins.';
      case 'printing':
        return 'Your document is currently being printed. Estimated completion in 45 minutes.';
      case 'completed':
        return 'Your order is ready for pickup! Please bring your order ID to collect your prints.';
      default:
        return 'Order status updated.';
    }
  };

  const handleContactShop = () => {
    if (isHydrated) {
      window.location.href = `tel:${mockOrderData.printShop.phone}`;
    }
  };

  const handleConfirmReceipt = () => {
    if (isHydrated) {
      alert('Thank you for confirming receipt! We hope you enjoyed our service.');
    }
  };

  const handleDownloadReceipt = () => {
    if (isHydrated) {
      alert('Receipt download started. Check your downloads folder.');
    }
  };

  const handleLogout = () => {
    router.push('/login');
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background pt-24 md:pt-20 sm:pt-16">
        <div className="w-full px-8 md:px-6 sm:px-4 py-8 md:py-6 sm:py-4">
          <div className="max-w-7xl mx-auto">
            <div className="h-8 bg-muted rounded w-1/4 mb-8 animate-pulse" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-6 sm:gap-4">
              <div className="lg:col-span-2 space-y-8 md:space-y-6 sm:space-y-4">
                <div className="h-96 bg-muted rounded-xl animate-pulse" />
              </div>
              <div className="space-y-8 md:space-y-6 sm:space-y-4">
                <div className="h-96 bg-muted rounded-xl animate-pulse" />
                <div className="h-64 bg-muted rounded-xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background pt-24 md:pt-20 sm:pt-16">
      <div className="w-full px-8 md:px-6 sm:px-4 py-8 md:py-6 sm:py-4">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8 md:mb-6 sm:mb-4">
            <h1 className="text-4xl md:text-3xl sm:text-2xl font-heading font-semibold text-foreground mb-2">
              Track Your Order
            </h1>
            <p className="text-base md:text-sm text-muted-foreground">
              Monitor your printing progress in real-time
            </p>
          </div>

          {/* Status Notification Banner */}
          {showNotification &&
          <div className="mb-8 md:mb-6 sm:mb-4">
              <StatusNotificationBanner
              status={mockOrderData.currentStatus}
              message={getNotificationMessage(mockOrderData.currentStatus)}
              showBanner={showNotification}
              onDismiss={() => setShowNotification(false)} />

            </div>
          }

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-6 sm:gap-4">
            {/* Left Column - Timeline */}
            <div className="lg:col-span-2">
              <OrderStatusTimeline
                currentStatus={mockOrderData.currentStatus}
                uploadedAt={mockOrderData.uploadedAt}
                queuedAt={mockOrderData.queuedAt}
                printingAt={mockOrderData.printingAt}
                completedAt={mockOrderData.completedAt}
                estimatedCompletion={mockOrderData.estimatedCompletion} />

            </div>

            {/* Right Column - Details & Actions */}
            <div className="space-y-8 md:space-y-6 sm:space-y-4">
              <OrderDetailsCard
                orderDetails={{
                  orderId: mockOrderData.orderId,
                  documentName: mockOrderData.documentName,
                  documentPreview: mockOrderData.documentPreview,
                  documentPreviewAlt: mockOrderData.documentPreviewAlt,
                  pageCount: mockOrderData.pageCount,
                  printShop: mockOrderData.printShop,
                  printConfig: mockOrderData.printConfig,
                  pricing: mockOrderData.pricing,
                  orderDate: mockOrderData.orderDate
                }} />

              <OrderActionsPanel
                currentStatus={mockOrderData.currentStatus}
                onContactShop={handleContactShop}
                onConfirmReceipt={handleConfirmReceipt}
                onDownloadReceipt={handleDownloadReceipt} />

            </div>
          </div>
        </div>
      </div>
    </div>);

}