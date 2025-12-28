'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import MapContainer from './MapContainer';
import ShopCard from './ShopCard';
import FilterControls from './FilterControls';
import SelectedShopSummary from './SelectedShopSummary';
import Icon from '@/components/ui/AppIcon';

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
  lat: number;
  lng: number;
}

interface FilterState {
  sortBy: 'distance' | 'rating' | 'price';
  availability: 'all' | 'available' | 'busy';
  services: string[];
}

const mockShops: PrintShop[] = [
{
  id: '1',
  name: 'QuickPrint Express',
  address: '123 Main Street, Downtown, New York, NY 10001',
  distance: 0.8,
  rating: 4.8,
  reviewCount: 342,
  isAvailable: true,
  estimatedTime: '15-20 mins',
  pricePerPage: 0.15,
  services: ['Color Printing', 'Black & White', 'Binding', 'Lamination'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b4019d6b-1765093396250.png",
  alt: 'Modern print shop interior with professional printing equipment and bright lighting',
  lat: 40.7128,
  lng: -74.0060
},
{
  id: '2',
  name: 'PrintHub Pro',
  address: '456 Business Avenue, Midtown, New York, NY 10017',
  distance: 1.2,
  rating: 4.6,
  reviewCount: 218,
  isAvailable: true,
  estimatedTime: '20-25 mins',
  pricePerPage: 0.12,
  services: ['Color Printing', 'Black & White', 'Scanning', 'Binding'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bc635175-1764661942487.png",
  alt: 'Professional printing workspace with large format printers and organized paper supplies',
  lat: 40.7580,
  lng: -73.9855
},
{
  id: '3',
  name: 'CopyCenter Plus',
  address: '789 Commerce Road, Financial District, New York, NY 10004',
  distance: 1.5,
  rating: 4.9,
  reviewCount: 456,
  isAvailable: false,
  estimatedTime: '30-35 mins',
  pricePerPage: 0.18,
  services: ['Color Printing', 'Black & White', 'Binding', 'Lamination', 'Scanning'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_105e616cc-1765093179693.png",
  alt: 'Busy print shop with multiple customers and staff operating various printing machines',
  lat: 40.7074,
  lng: -74.0113
},
{
  id: '4',
  name: 'FastPrint Solutions',
  address: '321 Tech Boulevard, Silicon Alley, New York, NY 10013',
  distance: 2.1,
  rating: 4.5,
  reviewCount: 189,
  isAvailable: true,
  estimatedTime: '25-30 mins',
  pricePerPage: 0.14,
  services: ['Color Printing', 'Black & White', 'Lamination'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_14dd6413c-1764740104138.png",
  alt: 'Clean and organized print shop with modern digital printers and customer service counter',
  lat: 40.7205,
  lng: -74.0050
},
{
  id: '5',
  name: 'PrintMaster Studio',
  address: '654 Creative Lane, Arts District, New York, NY 10012',
  distance: 2.8,
  rating: 4.7,
  reviewCount: 298,
  isAvailable: true,
  estimatedTime: '35-40 mins',
  pricePerPage: 0.16,
  services: ['Color Printing', 'Black & White', 'Binding', 'Scanning'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f1b065c6-1764633634351.png",
  alt: 'Spacious print studio with high-end printing equipment and design workstations',
  lat: 40.7260,
  lng: -73.9980
},
{
  id: '6',
  name: 'EcoPrint Green',
  address: '987 Sustainable Street, Green District, New York, NY 10009',
  distance: 3.2,
  rating: 4.4,
  reviewCount: 167,
  isAvailable: false,
  estimatedTime: '40-45 mins',
  pricePerPage: 0.20,
  services: ['Color Printing', 'Black & White', 'Binding', 'Lamination', 'Scanning'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1411cdc7e-1765115735365.png",
  alt: 'Eco-friendly print shop with recycled paper displays and energy-efficient printing machines',
  lat: 40.7295,
  lng: -73.9810
}];


const PrintShopSelectionInteractive = () => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const [filteredShops, setFilteredShops] = useState<PrintShop[]>(mockShops);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleFilterChange = useCallback((filters: FilterState) => {
    let filtered = [...mockShops];

    if (filters.availability !== 'all') {
      filtered = filtered.filter((shop) =>
      filters.availability === 'available' ? shop.isAvailable : !shop.isAvailable
      );
    }

    if (filters.services.length > 0) {
      filtered = filtered.filter((shop) =>
      filters.services.every((service) => shop.services.includes(service))
      );
    }

    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'distance':
          return a.distance - b.distance;
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return a.pricePerPage - b.pricePerPage;
        default:
          return 0;
      }
    });

    setFilteredShops(filtered);
  }, []);

  const handleShopSelect = useCallback((shopId: string) => {
    setSelectedShopId(shopId);
  }, []);

  const handleProceed = useCallback(() => {
    if (selectedShopId) {
      router.push('/order-summary-checkout');
    }
  }, [selectedShopId, router]);

  const handleChangeSelection = useCallback(() => {
    setSelectedShopId(null);
  }, []);

  const selectedShop = filteredShops.find((shop) => shop.id === selectedShopId) || null;

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background pt-32 pb-16 px-8 md:px-6 sm:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-muted rounded-lg w-64"></div>
            <div className="h-96 bg-muted rounded-xl"></div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-16 px-8 md:px-6 sm:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-6 sm:mb-4">
          <h1 className="text-4xl md:text-3xl sm:text-2xl font-heading font-semibold text-foreground mb-3">
            Select Print Shop
          </h1>
          <p className="text-base md:text-sm sm:text-sm text-muted-foreground">
            Choose a nearby print shop to complete your order
          </p>
        </div>

        <div className="mb-6 md:mb-5 sm:mb-4">
          <FilterControls onFilterChange={handleFilterChange} />
        </div>

        <div className="flex items-center justify-between mb-6 md:mb-5 sm:mb-4">
          <p className="text-sm text-muted-foreground">
            {filteredShops.length} {filteredShops.length === 1 ? 'shop' : 'shops'} found
          </p>
          <div className="flex items-center space-x-2 bg-card rounded-lg p-1 shadow-warm-sm">
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center space-x-2 px-4 py-2 md:px-3 md:py-1.5 sm:px-3 sm:py-1.5 rounded-md text-sm font-medium transition-all duration-250 ease-out focus:outline-none focus:ring-2 focus:ring-ring ${
              viewMode === 'map' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'}`
              }>

              <Icon name="MapIcon" size={18} />
              <span className="hidden sm:inline">Map</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center space-x-2 px-4 py-2 md:px-3 md:py-1.5 sm:px-3 sm:py-1.5 rounded-md text-sm font-medium transition-all duration-250 ease-out focus:outline-none focus:ring-2 focus:ring-ring ${
              viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'}`
              }>

              <Icon name="ListBulletIcon" size={18} />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-6 sm:gap-4">
          <div className="lg:col-span-2">
            {viewMode === 'map' ?
            <div className="h-[600px] md:h-[500px] sm:h-[400px]">
                <MapContainer
                shops={filteredShops}
                selectedShopId={selectedShopId}
                onShopSelect={handleShopSelect} />

              </div> :

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-5 sm:gap-4">
                {filteredShops.map((shop) =>
              <ShopCard
                key={shop.id}
                shop={shop}
                isSelected={selectedShopId === shop.id}
                onSelect={handleShopSelect} />

              )}
              </div>
            }
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <SelectedShopSummary
                shop={selectedShop}
                onProceed={handleProceed}
                onChangeSelection={handleChangeSelection} />

            </div>
          </div>
        </div>
      </div>
    </div>);

};

export default PrintShopSelectionInteractive;