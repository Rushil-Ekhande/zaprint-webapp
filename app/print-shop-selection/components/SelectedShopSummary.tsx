'use client';

import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface PrintShop {
  id: string;
  name: string;
  address: string;
  distance: number;
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
  estimatedTime: string;
  pricePerPage: number;
  services: string[];
  image: string;
  alt: string;
}

interface SelectedShopSummaryProps {
  shop: PrintShop | null;
  onProceed: () => void;
  onChangeSelection: () => void;
}

const SelectedShopSummary = ({
  shop,
  onProceed,
  onChangeSelection,
}: SelectedShopSummaryProps) => {
  if (!shop) {
    return (
      <div className="w-full bg-card rounded-xl shadow-warm-md p-8 md:p-6 sm:p-4 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
            <Icon name="BuildingStorefrontIcon" size={40} className="text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg md:text-base sm:text-base font-heading font-semibold text-foreground mb-2">
              No Shop Selected
            </h3>
            <p className="text-sm text-muted-foreground">
              Select a print shop from the map or list to continue
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-card rounded-xl shadow-warm-md overflow-hidden">
      <div className="bg-primary/5 px-6 py-4 md:px-5 md:py-3 sm:px-4 sm:py-3 border-b border-border">
        <h3 className="text-lg md:text-base sm:text-base font-heading font-semibold text-foreground">
          Selected Print Shop
        </h3>
      </div>

      <div className="p-6 md:p-5 sm:p-4">
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
            <AppImage
              src={shop.image}
              alt={shop.alt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-base md:text-sm sm:text-sm font-heading font-semibold text-foreground line-clamp-1 mb-1">
              {shop.name}
            </h4>
            <p className="text-sm md:text-xs sm:text-xs text-muted-foreground line-clamp-2 mb-2">
              {shop.address}
            </p>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Icon name="StarIcon" variant="solid" size={14} className="text-warning" />
                <span className="text-xs font-medium text-foreground whitespace-nowrap">
                  {shop.rating.toFixed(1)}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="MapPinIcon" size={14} className="text-muted-foreground" />
                <span className="text-xs text-foreground whitespace-nowrap">
                  {shop.distance} km
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div className="flex items-center space-x-2">
              <Icon name="ClockIcon" size={20} className="text-muted-foreground" />
              <span className="text-sm text-foreground">Estimated Time</span>
            </div>
            <span className="text-sm font-medium text-foreground whitespace-nowrap">
              {shop.estimatedTime}
            </span>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-border">
            <div className="flex items-center space-x-2">
              <Icon name="CurrencyDollarIcon" size={20} className="text-muted-foreground" />
              <span className="text-sm text-foreground">Price per Page</span>
            </div>
            <span className="text-sm font-medium text-primary whitespace-nowrap">
              ${shop.pricePerPage.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircleIcon" size={20} className="text-muted-foreground" />
              <span className="text-sm text-foreground">Status</span>
            </div>
            <span
              className={`text-sm font-medium whitespace-nowrap ${
                shop.isAvailable ? 'text-success' : 'text-error'
              }`}
            >
              {shop.isAvailable ? 'Available Now' : 'Currently Busy'}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-xs font-caption font-medium text-muted-foreground mb-3">
            Available Services
          </p>
          <div className="flex flex-wrap gap-2">
            {shop.services.map((service, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-muted rounded-full text-xs text-foreground"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onProceed}
            className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-medium text-sm transition-all duration-250 ease-out hover:bg-primary/90 hover:-translate-y-px focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
          >
            Proceed to Checkout
          </button>
          <button
            onClick={onChangeSelection}
            className="w-full py-3 px-4 bg-muted text-foreground rounded-lg font-medium text-sm transition-all duration-250 ease-out hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            Change Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectedShopSummary;