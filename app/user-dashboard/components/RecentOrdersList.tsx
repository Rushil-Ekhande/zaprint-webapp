import Image from 'next/image';
import Icon from '@/components/ui/AppIcon';

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

interface RecentOrdersListProps {
  orders: RecentOrder[];
  onViewDetails: (orderId: string) => void;
  onReorder: (orderId: string) => void;
}

export default function RecentOrdersList({ orders, onViewDetails, onReorder }: RecentOrdersListProps) {
  const getStatusConfig = (status: string) => {
    const configs = {
      uploaded: {
        label: 'Uploaded',
        color: 'bg-info/10 text-info',
        icon: 'CloudArrowUpIcon'
      },
      queued: {
        label: 'In Queue',
        color: 'bg-warning/10 text-warning',
        icon: 'ClockIcon'
      },
      printing: {
        label: 'Printing',
        color: 'bg-accent/10 text-accent',
        icon: 'PrinterIcon'
      },
      completed: {
        label: 'Completed',
        color: 'bg-success/10 text-success',
        icon: 'CheckCircleIcon'
      }
    };
    return configs[status as keyof typeof configs] || configs.uploaded;
  };

  return (
    <div className="bg-card rounded-xl p-6 md:p-5 sm:p-4 border border-border">
      <div className="flex items-center justify-between mb-6 md:mb-4">
        <h2 className="text-2xl md:text-xl font-heading font-semibold text-foreground">
          Recent Orders
        </h2>
        <button
          onClick={() => onViewDetails(orders[0]?.orderId)}
          className="text-sm text-primary hover:text-primary/80 transition-colors duration-250 flex items-center gap-2"
        >
          View All
          <Icon name="ChevronRightIcon" size={16} />
        </button>
      </div>

      <div className="space-y-4 md:space-y-3">
        {orders.map((order) => {
          const statusConfig = getStatusConfig(order.status);
          return (
            <div
              key={order.orderId}
              className="group bg-muted/30 rounded-lg p-4 md:p-3 transition-all duration-250 ease-out hover:bg-muted/50 hover:shadow-warm-md border border-transparent hover:border-border"
            >
              <div className="flex gap-4 md:gap-3">
                {/* Thumbnail */}
                <div className="relative w-20 h-20 md:w-16 md:h-16 flex-shrink-0 rounded-lg overflow-hidden bg-background">
                  <Image
                    src={order.thumbnail}
                    alt={order.thumbnailAlt}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Order Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base md:text-sm font-medium text-foreground truncate">
                        {order.documentName}
                      </h3>
                      <p className="text-sm md:text-xs text-muted-foreground truncate">
                        {order.printShop}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusConfig.color}`}>
                      <Icon name={statusConfig.icon as any} size={14} />
                      {statusConfig.label}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 mt-3">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Icon name="CalendarIcon" size={14} />
                        {order.orderDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="CurrencyDollarIcon" size={14} />
                        ${order.total.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => onViewDetails(order.orderId)}
                        className="px-3 py-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors duration-250 flex items-center gap-1"
                      >
                        Details
                        <Icon name="ArrowRightIcon" size={12} />
                      </button>
                      {order.status === 'completed' && (
                        <button
                          onClick={() => onReorder(order.orderId)}
                          className="px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-250 flex items-center gap-1"
                        >
                          <Icon name="ArrowPathIcon" size={12} />
                          Reorder
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}