'use client';

import { useState, useEffect } from 'react';

interface PrintShop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  distance: number;
  isAvailable: boolean;
}

interface MapContainerProps {
  shops: PrintShop[];
  selectedShopId: string | null;
  onShopSelect: (shopId: string) => void;
}

const MapContainer = ({ shops, selectedShopId, onShopSelect }: MapContainerProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="w-full h-full bg-muted animate-pulse rounded-xl flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground text-sm">Loading map...</p>
        </div>
      </div>
    );
  }

  const handleMarkerClick = (shopId: string) => {
    onShopSelect(shopId);
    const shop = shops.find(s => s.id === shopId);
    if (shop) {
      setMapCenter({ lat: shop.lat, lng: shop.lng });
    }
  };

  return (
    <div className="w-full h-full rounded-xl overflow-hidden shadow-warm-md relative">
      <iframe
        width="100%"
        height="100%"
        loading="lazy"
        title="Print Shops Map"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}&z=13&output=embed`}
        className="border-0"
      />
      
      <div className="absolute top-4 left-4 right-4 bg-card/95 backdrop-blur-sm rounded-lg shadow-warm-lg p-4 md:p-3 sm:p-2">
        <div className="flex items-center justify-between flex-wrap gap-4 md:gap-3 sm:gap-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-sm md:text-xs sm:text-xs text-foreground">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span className="text-sm md:text-xs sm:text-xs text-foreground">Busy</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full ring-4 ring-primary/20"></div>
            <span className="text-sm md:text-xs sm:text-xs text-foreground">Selected</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 max-h-48 overflow-y-auto bg-card/95 backdrop-blur-sm rounded-lg shadow-warm-lg p-4 md:p-3 sm:p-2 space-y-2">
        <p className="text-xs font-caption font-medium text-muted-foreground mb-2">
          {shops.length} print shops nearby
        </p>
        {shops.map((shop) => (
          <button
            key={shop.id}
            onClick={() => handleMarkerClick(shop.id)}
            className={`w-full text-left p-3 md:p-2 sm:p-2 rounded-lg transition-all duration-250 ease-out hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring ${
              selectedShopId === shop.id ? 'bg-primary/10 ring-2 ring-primary' : 'bg-card'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{shop.name}</p>
                <p className="text-xs text-muted-foreground">{shop.distance} km away</p>
              </div>
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ml-2 ${
                shop.isAvailable ? 'bg-success' : 'bg-error'
              }`}></div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MapContainer;