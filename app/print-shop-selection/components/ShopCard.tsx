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

interface ShopCardProps {
  shop: PrintShop;
  isSelected: boolean;
  onSelect: (shopId: string) => void;
}

const ShopCard = ({ shop, isSelected, onSelect }: ShopCardProps) => {
  return (
    <div
      className={`w-full min-w-0 bg-card rounded-xl shadow-warm-md transition-all duration-250 ease-out hover:shadow-warm-lg cursor-pointer ${
        isSelected ? 'ring-2 ring-primary shadow-warm-lg' : ''
      }`}
      onClick={() => onSelect(shop.id)}
    >
      <div className="aspect-[16/9] overflow-hidden rounded-t-xl">
        <AppImage
          src={shop.image}
          alt={shop.alt}
          className="w-full h-full object-cover transition-transform duration-250 ease-out hover:scale-105"
        />
      </div>

      <div className="p-6 md:p-5 sm:p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg md:text-base sm:text-base font-heading font-semibold text-foreground line-clamp-1 mb-1">
              {shop.name}
            </h3>
            <p className="text-sm md:text-xs sm:text-xs text-muted-foreground line-clamp-2">
              {shop.address}
            </p>
          </div>
          <div
            className={`flex-shrink-0 ml-3 px-3 py-1 rounded-full text-xs font-caption font-medium ${
              shop.isAvailable
                ? 'bg-success/10 text-success' :'bg-error/10 text-error'
            }`}
          >
            {shop.isAvailable ? 'Available' : 'Busy'}
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-1">
            <Icon name="StarIcon" variant="solid" size={16} className="text-warning" />
            <span className="text-sm font-medium text-foreground whitespace-nowrap">
              {shop.rating.toFixed(1)}
            </span>
            <span className="text-xs text-muted-foreground">
              ({shop.reviewCount})
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="MapPinIcon" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground whitespace-nowrap">
              {shop.distance} km
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="ClockIcon" size={18} className="text-muted-foreground" />
            <span className="text-sm text-foreground">{shop.estimatedTime}</span>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Starting at</p>
            <p className="text-lg font-heading font-semibold text-primary whitespace-nowrap">
              ${shop.pricePerPage.toFixed(2)}/page
            </p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs font-caption font-medium text-muted-foreground mb-2">
            Services Available
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

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(shop.id);
          }}
          className={`w-full py-3 px-4 rounded-lg font-medium text-sm transition-all duration-250 ease-out focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2 ${
            isSelected
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'bg-muted text-foreground hover:bg-muted/80'
          }`}
        >
          {isSelected ? (
            <span className="flex items-center justify-center space-x-2">
              <Icon name="CheckCircleIcon" variant="solid" size={20} />
              <span>Selected</span>
            </span>
          ) : (
            'Select Shop'
          )}
        </button>
      </div>
    </div>
  );
};

export default ShopCard;