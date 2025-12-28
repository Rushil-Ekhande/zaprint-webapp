import Icon from '@/components/ui/AppIcon';

interface PriceItem {
  label: string;
  amount: number;
  description?: string;
}

interface PricingBreakdownProps {
  items: PriceItem[];
  subtotal: number;
  tax: number;
  serviceFee: number;
  total: number;
  estimatedTime: string;
}

const PricingBreakdown = ({
  items,
  subtotal,
  tax,
  serviceFee,
  total,
  estimatedTime,
}: PricingBreakdownProps) => {
  const formatCurrency = (amount: number): string => {
    return `$${amount.toFixed(2)}`;
  };

  return (
    <div className="w-full min-w-0 bg-card rounded-xl shadow-warm-md overflow-hidden">
      <div className="px-8 md:px-6 sm:px-4 py-6 border-b border-border">
        <h2 className="text-2xl md:text-xl sm:text-lg font-heading font-semibold text-foreground">
          Pricing Breakdown
        </h2>
      </div>

      <div className="px-8 md:px-6 sm:px-4 py-6 space-y-6">
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm md:text-xs sm:text-xs text-foreground line-clamp-2">
                  {item.label}
                </p>
                {item.description && (
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>
              <p className="text-sm md:text-xs sm:text-xs font-medium text-foreground ml-4 whitespace-nowrap">
                {formatCurrency(item.amount)}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm md:text-xs sm:text-xs text-muted-foreground">Subtotal</p>
            <p className="text-sm md:text-xs sm:text-xs font-medium text-foreground whitespace-nowrap">
              {formatCurrency(subtotal)}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm md:text-xs sm:text-xs text-muted-foreground">Tax (8%)</p>
            <p className="text-sm md:text-xs sm:text-xs font-medium text-foreground whitespace-nowrap">
              {formatCurrency(tax)}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm md:text-xs sm:text-xs text-muted-foreground">Service Fee</p>
            <p className="text-sm md:text-xs sm:text-xs font-medium text-foreground whitespace-nowrap">
              {formatCurrency(serviceFee)}
            </p>
          </div>
        </div>

        <div className="border-t-2 border-border pt-4">
          <div className="flex items-center justify-between">
            <p className="text-lg md:text-base sm:text-sm font-heading font-semibold text-foreground">
              Total Amount
            </p>
            <p className="text-xl md:text-lg sm:text-base font-heading font-bold text-primary whitespace-nowrap">
              {formatCurrency(total)}
            </p>
          </div>
        </div>

        <div className="bg-accent/10 rounded-lg px-6 md:px-4 sm:px-3 py-4">
          <div className="flex items-start space-x-3">
            <Icon name="ClockIcon" size={20} className="text-accent flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm md:text-xs sm:text-xs font-medium text-foreground">
                Estimated Completion Time
              </p>
              <p className="text-base md:text-sm sm:text-sm font-heading font-semibold text-accent mt-1">
                {estimatedTime}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingBreakdown;