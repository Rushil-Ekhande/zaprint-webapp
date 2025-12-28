import Icon from '@/components/ui/AppIcon';

interface UserStats {
  totalOrders: number;
  activeOrders: number;
  completedOrders: number;
  totalSpent: number;
  memberSince: string;
}

interface AccountSummaryProps {
  userStats: UserStats;
}

export default function AccountSummary({ userStats }: AccountSummaryProps) {
  const summaryItems = [
    {
      label: 'Total Orders',
      value: userStats.totalOrders,
      icon: 'DocumentTextIcon',
      color: 'primary'
    },
    {
      label: 'Total Spent',
      value: `$${userStats.totalSpent.toFixed(2)}`,
      icon: 'CurrencyDollarIcon',
      color: 'success'
    },
    {
      label: 'Member Since',
      value: userStats.memberSince,
      icon: 'UserCircleIcon',
      color: 'accent'
    }
  ];

  return (
    <div className="bg-card rounded-xl p-6 md:p-5 sm:p-4 border border-border">
      <h2 className="text-2xl md:text-xl font-heading font-semibold text-foreground mb-6 md:mb-4">
        Account Summary
      </h2>

      <div className="space-y-4 md:space-y-3">
        {summaryItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 md:p-3 bg-muted/30 rounded-lg transition-all duration-250 hover:bg-muted/50"
          >
            <div className="flex items-center gap-3">
              <div className={`flex items-center justify-center w-10 h-10 bg-${item.color}/10 rounded-full`}>
                <Icon name={item.icon as any} size={20} className={`text-${item.color}`} />
              </div>
              <span className="text-sm text-muted-foreground">{item.label}</span>
            </div>
            <span className="text-lg md:text-base font-heading font-semibold text-foreground">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 md:mt-4 pt-6 md:pt-4 border-t border-border">
        <button className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-medium transition-all duration-250 ease-out hover:bg-primary/90 hover:shadow-warm-md focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2 flex items-center justify-center gap-2">
          <Icon name="CogIcon" size={20} />
          Account Settings
        </button>
      </div>
    </div>
  );
}