'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import OrderSummaryCard from './OrderSummaryCard';
import PricingBreakdown from './PricingBreakdown';
import PaymentForm from './PaymentForm';
import Icon from '@/components/ui/AppIcon';

interface DocumentDetails {
  fileName: string;
  fileSize: string;
  pageCount: number;
  uploadedAt: string;
}

interface PrintPreferences {
  paperSize: string;
  colorMode: string;
  sides: string;
  copies: number;
}

interface PrintShop {
  id: string;
  name: string;
  address: string;
  distance: string;
  image: string;
  alt: string;
}

interface PriceItem {
  label: string;
  amount: number;
  description?: string;
}

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

const OrderSummaryCheckoutInteractive = () => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const mockDocumentDetails: DocumentDetails = {
    fileName: "Business_Proposal_2025.pdf",
    fileSize: "2.4 MB",
    pageCount: 15,
    uploadedAt: "2025-12-20 05:45 PM"
  };

  const mockPrintPreferences: PrintPreferences = {
    paperSize: "A4 (8.27\" × 11.69\")",
    colorMode: "Color",
    sides: "Double-Sided (Duplex)",
    copies: 3
  };

  const mockPrintShop: PrintShop = {
    id: "shop-001",
    name: "QuickPrint Express Downtown",
    address: "456 Market Street, Suite 200, San Francisco, CA 94102",
    distance: "0.8 miles",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b4019d6b-1765093396250.png",
    alt: "Modern print shop interior with professional printing equipment and bright lighting"
  };

  const pricePerPage = 0.25;
  const colorSurcharge = 0.15;
  const duplexDiscount = 0.05;

  const basePrice = mockDocumentDetails.pageCount * pricePerPage * mockPrintPreferences.copies;
  const colorPrice = mockPrintPreferences.colorMode === "Color" ?
  mockDocumentDetails.pageCount * colorSurcharge * mockPrintPreferences.copies :
  0;
  const duplexSavings = mockPrintPreferences.sides === "Double-Sided (Duplex)" ?
  mockDocumentDetails.pageCount * duplexDiscount * mockPrintPreferences.copies :
  0;

  const subtotal = basePrice + colorPrice - duplexSavings;
  const tax = subtotal * 0.08;
  const serviceFee = 2.50;
  const total = subtotal + tax + serviceFee;

  const mockPriceItems: PriceItem[] = [
  {
    label: "Printing Cost",
    amount: basePrice,
    description: `${mockDocumentDetails.pageCount} pages × ${mockPrintPreferences.copies} copies × $${pricePerPage.toFixed(2)}/page`
  },
  ...(colorPrice > 0 ? [{
    label: "Color Printing Surcharge",
    amount: colorPrice,
    description: `${mockDocumentDetails.pageCount} pages × ${mockPrintPreferences.copies} copies × $${colorSurcharge.toFixed(2)}/page`
  }] : []),
  ...(duplexSavings > 0 ? [{
    label: "Duplex Printing Discount",
    amount: -duplexSavings,
    description: "Save paper with double-sided printing"
  }] : [])];


  const handleEditSection = (section: 'document' | 'preferences' | 'shop') => {
    if (!isHydrated) return;

    switch (section) {
      case 'document':
        router.push('/document-upload');
        break;
      case 'preferences':router.push('/document-upload');
        break;
      case 'shop':router.push('/print-shop-selection');
        break;
    }
  };

  const handlePaymentSubmit = (data: PaymentFormData) => {
    if (!isHydrated) return;

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccessModal(true);

      setTimeout(() => {
        router.push('/order-tracking');
      }, 2000);
    }, 2500);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-8 md:px-6 sm:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-6 sm:gap-4">
            <div className="lg:col-span-2 space-y-8 md:space-y-6 sm:space-y-4">
              <div className="w-full h-96 bg-muted rounded-xl animate-pulse" />
              <div className="w-full h-[600px] bg-muted rounded-xl animate-pulse" />
            </div>
            <div className="lg:col-span-1">
              <div className="w-full h-96 bg-muted rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <>
      <div className="min-h-screen bg-background pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-8 md:px-6 sm:px-4">
          <div className="mb-8 md:mb-6 sm:mb-4">
            <h1 className="text-4xl md:text-3xl sm:text-2xl font-heading font-bold text-foreground mb-2">
              Review & Checkout
            </h1>
            <p className="text-base md:text-sm sm:text-sm text-muted-foreground">
              Review your order details and complete payment to start printing
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-6 sm:gap-4">
            <div className="lg:col-span-2 space-y-8 md:space-y-6 sm:space-y-4">
              <OrderSummaryCard
                documentDetails={mockDocumentDetails}
                printPreferences={mockPrintPreferences}
                printShop={mockPrintShop}
                onEdit={handleEditSection} />


              <PaymentForm
                onSubmit={handlePaymentSubmit}
                isProcessing={isProcessing} />

            </div>

            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-32">
                <PricingBreakdown
                  items={mockPriceItems}
                  subtotal={subtotal}
                  tax={tax}
                  serviceFee={serviceFee}
                  total={total}
                  estimatedTime="30-45 minutes" />

              </div>
            </div>
          </div>
        </div>
      </div>

      {showSuccessModal &&
      <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="w-full max-w-md bg-card rounded-2xl shadow-warm-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="px-8 md:px-6 sm:px-4 py-8 md:py-6 sm:py-6 text-center">
              <div className="flex items-center justify-center w-20 h-20 mx-auto bg-success/10 rounded-full mb-6">
                <Icon name="CheckCircleIcon" size={48} className="text-success" />
              </div>
              <h2 className="text-2xl md:text-xl sm:text-lg font-heading font-bold text-foreground mb-3">
                Payment Successful!
              </h2>
              <p className="text-base md:text-sm sm:text-sm text-muted-foreground mb-6">
                Your order has been confirmed and sent to the print shop. Redirecting to order tracking...
              </p>
              <div className="flex items-center justify-center space-x-2">
                <Icon name="ArrowPathIcon" size={20} className="text-primary animate-spin" />
                <span className="text-sm text-caption text-primary font-medium">
                  Redirecting...
                </span>
              </div>
            </div>
          </div>
        </div>
      }
    </>);

};

export default OrderSummaryCheckoutInteractive;