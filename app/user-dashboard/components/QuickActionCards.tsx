import Icon from '@/components/ui/AppIcon';

interface QuickActionCardsProps {
  onUploadNew: () => void;
  onViewAllOrders: () => void;
}

export default function QuickActionCards({ onUploadNew, onViewAllOrders }: QuickActionCardsProps) {
  const quickActions = [
    {
      title: 'Upload New Document',
      description: 'Start a new print job by uploading your document',
      icon: 'CloudArrowUpIcon',
      color: 'primary',
      action: onUploadNew
    },
    {
      title: 'View All Orders',
      description: 'Track and manage your printing orders',
      icon: 'ClipboardDocumentListIcon',
      color: 'accent',
      action: onViewAllOrders
    },
    {
      title: 'Quick Reorder',
      description: 'Reprint your recent documents with one click',
      icon: 'ArrowPathIcon',
      color: 'success',
      action: onUploadNew
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
      {quickActions.map((action, index) => (
        <button
          key={index}
          onClick={action.action}
          className="group bg-card rounded-xl p-6 md:p-5 sm:p-4 border border-border transition-all duration-250 ease-out hover:shadow-warm-lg hover:-translate-y-1 hover:border-primary/30 focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
        >
          <div className="flex items-start gap-4">
            <div className={`flex items-center justify-center w-14 h-14 bg-${action.color}/10 rounded-lg transition-all duration-250 group-hover:scale-110 group-hover:bg-${action.color}/20`}>
              <Icon name={action.icon as any} size={28} className={`text-${action.color}`} />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-250">
                {action.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {action.description}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}