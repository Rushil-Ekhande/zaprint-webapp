import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface PrintPreferences {
  paperSize: string;
  colorMode: string;
  sides: string;
  copies: number;
}

interface PrintShop {
  id: string;
  name: string;
  address: string;
  distance: string;
  image: string;
  alt: string;
}

interface DocumentDetails {
  fileName: string;
  fileSize: string;
  pageCount: number;
  uploadedAt: string;
}

interface OrderSummaryCardProps {
  documentDetails: DocumentDetails;
  printPreferences: PrintPreferences;
  printShop: PrintShop;
  onEdit: (section: 'document' | 'preferences' | 'shop') => void;
}

const OrderSummaryCard = ({
  documentDetails,
  printPreferences,
  printShop,
  onEdit,
}: OrderSummaryCardProps) => {
  return (
    <div className="w-full min-w-0 bg-card rounded-xl shadow-warm-md overflow-hidden">
      <div className="px-8 md:px-6 sm:px-4 py-6 border-b border-border">
        <h2 className="text-2xl md:text-xl sm:text-lg font-heading font-semibold text-foreground">
          Order Summary
        </h2>
      </div>

      <div className="px-8 md:px-6 sm:px-4 py-6 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg md:text-base sm:text-sm font-heading font-semibold text-foreground">
              Document Details
            </h3>
            <button
              onClick={() => onEdit('document')}
              className="flex items-center space-x-2 px-4 md:px-3 sm:px-2 py-2 text-sm md:text-xs sm:text-xs text-primary hover:text-primary/80 transition-all duration-250 ease-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg"
              aria-label="Edit document"
            >
              <Icon name="PencilIcon" size={16} />
              <span>Edit</span>
            </button>
          </div>
          <div className="bg-muted rounded-lg px-6 md:px-4 sm:px-3 py-4 space-y-3">
            <div className="flex items-start space-x-3">
              <Icon name="DocumentTextIcon" size={20} className="text-muted-foreground flex-shrink-0 mt-1" />
              <div className="flex-1 min-w-0">
                <p className="text-sm md:text-xs sm:text-xs font-medium text-foreground line-clamp-2">
                  {documentDetails.fileName}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {documentDetails.fileSize} • {documentDetails.pageCount} pages
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg md:text-base sm:text-sm font-heading font-semibold text-foreground">
              Print Preferences
            </h3>
            <button
              onClick={() => onEdit('preferences')}
              className="flex items-center space-x-2 px-4 md:px-3 sm:px-2 py-2 text-sm md:text-xs sm:text-xs text-primary hover:text-primary/80 transition-all duration-250 ease-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg"
              aria-label="Edit print preferences"
            >
              <Icon name="PencilIcon" size={16} />
              <span>Edit</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-3 sm:gap-2">
            <div className="bg-muted rounded-lg px-6 md:px-4 sm:px-3 py-4">
              <p className="text-xs text-caption text-muted-foreground mb-1">Paper Size</p>
              <p className="text-sm md:text-xs sm:text-xs font-medium text-foreground">
                {printPreferences.paperSize}
              </p>
            </div>
            <div className="bg-muted rounded-lg px-6 md:px-4 sm:px-3 py-4">
              <p className="text-xs text-caption text-muted-foreground mb-1">Color Mode</p>
              <p className="text-sm md:text-xs sm:text-xs font-medium text-foreground">
                {printPreferences.colorMode}
              </p>
            </div>
            <div className="bg-muted rounded-lg px-6 md:px-4 sm:px-3 py-4">
              <p className="text-xs text-caption text-muted-foreground mb-1">Print Sides</p>
              <p className="text-sm md:text-xs sm:text-xs font-medium text-foreground">
                {printPreferences.sides}
              </p>
            </div>
            <div className="bg-muted rounded-lg px-6 md:px-4 sm:px-3 py-4">
              <p className="text-xs text-caption text-muted-foreground mb-1">Copies</p>
              <p className="text-sm md:text-xs sm:text-xs font-medium text-foreground whitespace-nowrap">
                {printPreferences.copies}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg md:text-base sm:text-sm font-heading font-semibold text-foreground">
              Selected Print Shop
            </h3>
            <button
              onClick={() => onEdit('shop')}
              className="flex items-center space-x-2 px-4 md:px-3 sm:px-2 py-2 text-sm md:text-xs sm:text-xs text-primary hover:text-primary/80 transition-all duration-250 ease-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg"
              aria-label="Edit print shop selection"
            >
              <Icon name="PencilIcon" size={16} />
              <span>Edit</span>
            </button>
          </div>
          <div className="bg-muted rounded-lg overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              <div className="w-full sm:w-32 h-32 sm:h-auto flex-shrink-0 overflow-hidden">
                <AppImage
                  src={printShop.image}
                  alt={printShop.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0 px-6 md:px-4 sm:px-3 py-4">
                <h4 className="text-base md:text-sm sm:text-sm font-heading font-semibold text-foreground line-clamp-2">
                  {printShop.name}
                </h4>
                <div className="flex items-start space-x-2 mt-2">
                  <Icon name="MapPinIcon" size={16} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                  <p className="text-sm md:text-xs sm:text-xs text-muted-foreground line-clamp-2">
                    {printShop.address}
                  </p>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Icon name="TruckIcon" size={16} className="text-muted-foreground" />
                  <p className="text-sm md:text-xs sm:text-xs text-muted-foreground whitespace-nowrap">
                    {printShop.distance} away
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryCard;