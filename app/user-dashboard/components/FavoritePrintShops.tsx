import Image from 'next/image';
import Icon from '@/components/ui/AppIcon';

interface FavoriteShop {
  shopId: string;
  name: string;
  address: string;
  rating: number;
  totalOrders: number;
  image: string;
  imageAlt: string;
}

interface FavoritePrintShopsProps {
  favoriteShops: FavoriteShop[];
  onSelectShop: (shopId: string) => void;
}

export default function FavoritePrintShops({ favoriteShops, onSelectShop }: FavoritePrintShopsProps) {
  return (
    <div className="bg-card rounded-xl p-6 md:p-5 sm:p-4 border border-border">
      <div className="flex items-center justify-between mb-6 md:mb-4">
        <h2 className="text-2xl md:text-xl font-heading font-semibold text-foreground">
          Favorite Print Shops
        </h2>
        <Icon name="HeartIcon" size={24} className="text-error" />
      </div>

      <div className="space-y-4 md:space-y-3">
        {favoriteShops.map((shop) => (
          <button
            key={shop.shopId}
            onClick={() => onSelectShop(shop.shopId)}
            className="w-full group bg-muted/30 rounded-lg p-4 md:p-3 transition-all duration-250 ease-out hover:bg-muted/50 hover:shadow-warm-md border border-transparent hover:border-border text-left"
          >
            <div className="flex gap-3">
              {/* Shop Image */}
              <div className="relative w-16 h-16 md:w-14 md:h-14 flex-shrink-0 rounded-lg overflow-hidden bg-background">
                <Image
                  src={shop.image}
                  alt={shop.imageAlt}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Shop Details */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base md:text-sm font-medium text-foreground mb-1 group-hover:text-primary transition-colors duration-250">
                  {shop.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                  {shop.address}
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Icon name="StarIcon" size={14} className="text-warning fill-warning" />
                    {shop.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="ShoppingBagIcon" size={14} />
                    {shop.totalOrders} orders
                  </span>
                </div>
              </div>

              <Icon
                name="ChevronRightIcon"
                size={20}
                className="text-muted-foreground group-hover:text-primary transition-colors duration-250"
              />
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 md:mt-3">
        <button
          onClick={() => onSelectShop('')}
          className="w-full py-2.5 px-4 text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-250 flex items-center justify-center gap-2"
        >
          Browse All Print Shops
          <Icon name="MagnifyingGlassIcon" size={16} />
        </button>
      </div>
    </div>
  );
}