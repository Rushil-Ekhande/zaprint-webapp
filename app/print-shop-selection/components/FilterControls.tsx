'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FilterControlsProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  sortBy: 'distance' | 'rating' | 'price';
  availability: 'all' | 'available' | 'busy';
  services: string[];
}

const FilterControls = ({ onFilterChange }: FilterControlsProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    sortBy: 'distance',
    availability: 'all',
    services: [],
  });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      onFilterChange(filters);
    }
  }, [filters, isHydrated, onFilterChange]);

  if (!isHydrated) {
    return (
      <div className="w-full bg-card rounded-xl shadow-warm-md p-4 animate-pulse">
        <div className="h-10 bg-muted rounded-lg"></div>
      </div>
    );
  }

  const availableServices = [
    'Color Printing',
    'Black & White',
    'Binding',
    'Lamination',
    'Scanning',
  ];

  const handleServiceToggle = (service: string) => {
    setFilters((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  return (
    <div className="w-full bg-card rounded-xl shadow-warm-md overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 md:p-3 sm:p-3 transition-all duration-250 ease-out hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset"
      >
        <div className="flex items-center space-x-3">
          <Icon name="AdjustmentsHorizontalIcon" size={24} className="text-primary" />
          <span className="text-base md:text-sm sm:text-sm font-medium text-foreground">
            Filter & Sort
          </span>
        </div>
        <Icon
          name="ChevronDownIcon"
          size={20}
          className={`text-muted-foreground transition-transform duration-250 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isExpanded && (
        <div className="p-4 md:p-3 sm:p-3 border-t border-border space-y-6 md:space-y-5 sm:space-y-4">
          <div>
            <label className="block text-sm font-caption font-medium text-foreground mb-3">
              Sort By
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { value: 'distance', label: 'Distance', icon: 'MapPinIcon' },
                { value: 'rating', label: 'Rating', icon: 'StarIcon' },
                { value: 'price', label: 'Price', icon: 'CurrencyDollarIcon' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      sortBy: option.value as FilterState['sortBy'],
                    }))
                  }
                  className={`flex items-center justify-center space-x-2 px-4 py-3 md:py-2 sm:py-2 rounded-lg text-sm font-medium transition-all duration-250 ease-out focus:outline-none focus:ring-2 focus:ring-ring ${
                    filters.sortBy === option.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  <Icon name={option.icon as any} size={18} />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-caption font-medium text-foreground mb-3">
              Availability
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { value: 'all', label: 'All Shops' },
                { value: 'available', label: 'Available' },
                { value: 'busy', label: 'Busy' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      availability: option.value as FilterState['availability'],
                    }))
                  }
                  className={`px-4 py-3 md:py-2 sm:py-2 rounded-lg text-sm font-medium transition-all duration-250 ease-out focus:outline-none focus:ring-2 focus:ring-ring ${
                    filters.availability === option.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-caption font-medium text-foreground mb-3">
              Services
            </label>
            <div className="flex flex-wrap gap-2">
              {availableServices.map((service) => (
                <button
                  key={service}
                  onClick={() => handleServiceToggle(service)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-250 ease-out focus:outline-none focus:ring-2 focus:ring-ring ${
                    filters.services.includes(service)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() =>
              setFilters({
                sortBy: 'distance',
                availability: 'all',
                services: [],
              })
            }
            className="w-full py-3 px-4 rounded-lg bg-muted text-foreground font-medium text-sm transition-all duration-250 ease-out hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterControls;