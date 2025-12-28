'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import WelcomeBanner from './WelcomeBanner';
import QuickActionCards from './QuickActionCards';
import RecentOrdersList from './RecentOrdersList';
import AccountSummary from './AccountSummary';
import FavoritePrintShops from './FavoritePrintShops';

interface UserStats {
  totalOrders: number;
  activeOrders: number;
  completedOrders: number;
  totalSpent: number;
  memberSince: string;
}

interface RecentOrder {
  orderId: string;
  documentName: string;
  printShop: string;
  status: 'uploaded' | 'queued' | 'printing' | 'completed';
  orderDate: string;
  total: number;
  thumbnail: string;
  thumbnailAlt: string;
}

interface FavoriteShop {
  shopId: string;
  name: string;
  address: string;
  rating: number;
  totalOrders: number;
  image: string;
  imageAlt: string;
}

export default function UserDashboardInteractive() {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const mockUserStats: UserStats = {
    totalOrders: 48,
    activeOrders: 2,
    completedOrders: 46,
    totalSpent: 1247.50,
    memberSince: 'January 2024'
  };

  const mockRecentOrders: RecentOrder[] = [
  {
    orderId: 'ZP-2025-001234',
    documentName: 'Business_Proposal_Q4_2025.pdf',
    printShop: 'QuickPrint Downtown',
    status: 'printing',
    orderDate: '12/20/2025',
    total: 30.78,
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_10f0c21fc-1764637482517.png",
    thumbnailAlt: 'Preview of business proposal document with charts and graphs'
  },
  {
    orderId: 'ZP-2025-001198',
    documentName: 'Marketing_Materials_2025.pdf',
    printShop: 'PrintHub Express',
    status: 'completed',
    orderDate: '12/18/2025',
    total: 45.25,
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_15afff644-1764641554170.png",
    thumbnailAlt: 'Marketing materials with colorful graphics and product images'
  },
  {
    orderId: 'ZP-2025-001156',
    documentName: 'Annual_Report_2024.pdf',
    printShop: 'FastPrint Solutions',
    status: 'completed',
    orderDate: '12/15/2025',
    total: 89.50,
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_14c2822c2-1764930987718.png",
    thumbnailAlt: 'Annual report cover with professional corporate design'
  }];


  const mockFavoriteShops: FavoriteShop[] = [
  {
    shopId: 'shop-001',
    name: 'QuickPrint Downtown',
    address: '456 Main Street, Suite 200, New York, NY 10001',
    rating: 4.8,
    totalOrders: 18,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1aa7f4dfe-1765093327368.png",
    imageAlt: 'Modern print shop storefront with large glass windows and QuickPrint signage'
  },
  {
    shopId: 'shop-002',
    name: 'PrintHub Express',
    address: '789 Business Ave, New York, NY 10002',
    rating: 4.6,
    totalOrders: 15,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1153eaf97-1764681179487.png',
    imageAlt: 'PrintHub Express storefront with modern design and bright signage'
  }];


  const handleUploadNew = () => {
    router.push('/document-upload');
  };

  const handleViewAllOrders = () => {
    router.push('/order-tracking');
  };

  const handleSelectShop = (shopId: string) => {
    router.push('/print-shop-selection');
  };

  const handleViewOrderDetails = (orderId: string) => {
    router.push('/order-tracking');
  };

  const handleReorder = (orderId: string) => {
    router.push('/document-upload');
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background pt-24 md:pt-20 sm:pt-16">
        <div className="w-full px-8 md:px-6 sm:px-4 py-8 md:py-6 sm:py-4">
          <div className="max-w-7xl mx-auto space-y-8 md:space-y-6 sm:space-y-4">
            <div className="h-32 bg-muted rounded-xl animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
              <div className="h-32 bg-muted rounded-xl animate-pulse" />
              <div className="h-32 bg-muted rounded-xl animate-pulse" />
              <div className="h-32 bg-muted rounded-xl animate-pulse" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-6 sm:gap-4">
              <div className="lg:col-span-2 h-96 bg-muted rounded-xl animate-pulse" />
              <div className="h-96 bg-muted rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background pt-24 md:pt-20 sm:pt-16">
      <div className="w-full px-8 md:px-6 sm:px-4 py-8 md:py-6 sm:py-4">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-6 sm:space-y-4">
          {/* Welcome Banner */}
          <WelcomeBanner userName="John Smith" userStats={mockUserStats} />

          {/* Quick Action Cards */}
          <QuickActionCards onUploadNew={handleUploadNew} onViewAllOrders={handleViewAllOrders} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-6 sm:gap-4">
            {/* Left Column - Recent Orders */}
            <div className="lg:col-span-2">
              <RecentOrdersList
                orders={mockRecentOrders}
                onViewDetails={handleViewOrderDetails}
                onReorder={handleReorder} />

            </div>

            {/* Right Column - Account Summary & Favorite Shops */}
            <div className="space-y-8 md:space-y-6 sm:space-y-4">
              <AccountSummary userStats={mockUserStats} />
              <FavoritePrintShops
                favoriteShops={mockFavoriteShops}
                onSelectShop={handleSelectShop} />

            </div>
          </div>
        </div>
      </div>
    </div>);

}