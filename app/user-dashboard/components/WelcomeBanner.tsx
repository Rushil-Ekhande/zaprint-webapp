import Icon from '@/components/ui/AppIcon';

interface UserStats {
  totalOrders: number;
  activeOrders: number;
  completedOrders: number;
  totalSpent: number;
  memberSince: string;
}

interface WelcomeBannerProps {
  userName: string;
  userStats: UserStats;
}

export default function WelcomeBanner({ userName, userStats }: WelcomeBannerProps) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background rounded-xl p-8 md:p-6 sm:p-4 border border-border">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-4">
        <div>
          <h1 className="text-4xl md:text-3xl sm:text-2xl font-heading font-semibold text-foreground mb-2">
            Welcome back, {userName}!
          </h1>
          <p className="text-base md:text-sm text-muted-foreground flex items-center gap-2">
            <Icon name="CalendarIcon" size={20} className="text-muted-foreground" />
            {currentDate}
          </p>
        </div>
        <div className="flex flex-wrap gap-6 md:gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
              <Icon name="DocumentTextIcon" size={24} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl md:text-xl font-heading font-semibold text-foreground">
                {userStats.activeOrders}
              </p>
              <p className="text-sm text-muted-foreground">Active Orders</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-success/10 rounded-full">
              <Icon name="CheckCircleIcon" size={24} className="text-success" />
            </div>
            <div>
              <p className="text-2xl md:text-xl font-heading font-semibold text-foreground">
                {userStats.completedOrders}
              </p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}