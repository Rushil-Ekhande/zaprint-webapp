'use client';

import Icon from '@/components/ui/AppIcon';

interface PrintConfiguration {
  paperSize: 'A4' | 'A3' | 'Letter';
  colorMode: 'color' | 'blackwhite';
  printSide: 'single' | 'duplex';
  copies: number;
}

interface PrintConfigurationPanelProps {
  configuration: PrintConfiguration;
  onConfigurationChange: (config: PrintConfiguration) => void;
}

const PrintConfigurationPanel = ({ configuration, onConfigurationChange }: PrintConfigurationPanelProps) => {
  const paperSizes = [
    { value: 'A4', label: 'A4 (210 × 297 mm)', icon: 'DocumentIcon' },
    { value: 'A3', label: 'A3 (297 × 420 mm)', icon: 'DocumentIcon' },
    { value: 'Letter', label: 'Letter (8.5 × 11 in)', icon: 'DocumentIcon' },
  ];

  const colorModes = [
    { value: 'color', label: 'Color', icon: 'SwatchIcon', description: 'Full color printing' },
    { value: 'blackwhite', label: 'Black & White', icon: 'AdjustmentsHorizontalIcon', description: 'Grayscale printing' },
  ];

  const printSides = [
    { value: 'single', label: 'Single Side', icon: 'DocumentIcon', description: 'Print on one side' },
    { value: 'duplex', label: 'Duplex', icon: 'DocumentDuplicateIcon', description: 'Print on both sides' },
  ];

  const handleCopiesChange = (increment: boolean) => {
    const newCopies = increment
      ? Math.min(configuration.copies + 1, 999)
      : Math.max(configuration.copies - 1, 1);
    
    onConfigurationChange({ ...configuration, copies: newCopies });
  };

  const handleCopiesInput = (value: string) => {
    const numValue = parseInt(value) || 1;
    const clampedValue = Math.max(1, Math.min(numValue, 999));
    onConfigurationChange({ ...configuration, copies: clampedValue });
  };

  return (
    <div className="w-full space-y-8 md:space-y-6 sm:space-y-4">
      <div>
        <h3 className="text-lg md:text-base sm:text-sm font-heading font-semibold text-foreground mb-4 md:mb-3 sm:mb-2">
          Paper Size
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-2 sm:gap-1.5">
          {paperSizes.map((size) => (
            <button
              key={size.value}
              onClick={() => onConfigurationChange({ ...configuration, paperSize: size.value as any })}
              className={`w-full min-w-0 p-4 md:p-3 sm:p-2.5 rounded-lg border-2 transition-all duration-250 ease-out focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2 ${
                configuration.paperSize === size.value
                  ? 'border-primary bg-primary/5 shadow-warm-sm'
                  : 'border-border bg-card hover:border-primary/30 hover:bg-muted/30'
              }`}
            >
              <div className="flex items-center gap-3 md:gap-2 sm:gap-1.5">
                <Icon
                  name={size.icon as any}
                  size={24}
                  className={`flex-shrink-0 md:w-5 md:h-5 sm:w-4 sm:h-4 ${
                    configuration.paperSize === size.value ? 'text-primary' : 'text-muted-foreground'
                  }`}
                />
                <div className="flex-1 min-w-0 text-left">
                  <p className={`text-sm md:text-xs sm:text-[11px] font-medium truncate ${
                    configuration.paperSize === size.value ? 'text-primary' : 'text-foreground'
                  }`}>
                    {size.label}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg md:text-base sm:text-sm font-heading font-semibold text-foreground mb-4 md:mb-3 sm:mb-2">
          Color Mode
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-2 sm:gap-1.5">
          {colorModes.map((mode) => (
            <button
              key={mode.value}
              onClick={() => onConfigurationChange({ ...configuration, colorMode: mode.value as any })}
              className={`w-full min-w-0 p-4 md:p-3 sm:p-2.5 rounded-lg border-2 transition-all duration-250 ease-out focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2 ${
                configuration.colorMode === mode.value
                  ? 'border-primary bg-primary/5 shadow-warm-sm'
                  : 'border-border bg-card hover:border-primary/30 hover:bg-muted/30'
              }`}
            >
              <div className="flex items-start gap-3 md:gap-2 sm:gap-1.5">
                <Icon
                  name={mode.icon as any}
                  size={24}
                  className={`flex-shrink-0 md:w-5 md:h-5 sm:w-4 sm:h-4 ${
                    configuration.colorMode === mode.value ? 'text-primary' : 'text-muted-foreground'
                  }`}
                />
                <div className="flex-1 min-w-0 text-left">
                  <p className={`text-sm md:text-xs sm:text-[11px] font-medium mb-1 md:mb-0.5 sm:mb-0.5 truncate ${
                    configuration.colorMode === mode.value ? 'text-primary' : 'text-foreground'
                  }`}>
                    {mode.label}
                  </p>
                  <p className="text-xs md:text-[11px] sm:text-[10px] text-caption text-muted-foreground line-clamp-2">
                    {mode.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg md:text-base sm:text-sm font-heading font-semibold text-foreground mb-4 md:mb-3 sm:mb-2">
          Print Side
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-2 sm:gap-1.5">
          {printSides.map((side) => (
            <button
              key={side.value}
              onClick={() => onConfigurationChange({ ...configuration, printSide: side.value as any })}
              className={`w-full min-w-0 p-4 md:p-3 sm:p-2.5 rounded-lg border-2 transition-all duration-250 ease-out focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2 ${
                configuration.printSide === side.value
                  ? 'border-primary bg-primary/5 shadow-warm-sm'
                  : 'border-border bg-card hover:border-primary/30 hover:bg-muted/30'
              }`}
            >
              <div className="flex items-start gap-3 md:gap-2 sm:gap-1.5">
                <Icon
                  name={side.icon as any}
                  size={24}
                  className={`flex-shrink-0 md:w-5 md:h-5 sm:w-4 sm:h-4 ${
                    configuration.printSide === side.value ? 'text-primary' : 'text-muted-foreground'
                  }`}
                />
                <div className="flex-1 min-w-0 text-left">
                  <p className={`text-sm md:text-xs sm:text-[11px] font-medium mb-1 md:mb-0.5 sm:mb-0.5 truncate ${
                    configuration.printSide === side.value ? 'text-primary' : 'text-foreground'
                  }`}>
                    {side.label}
                  </p>
                  <p className="text-xs md:text-[11px] sm:text-[10px] text-caption text-muted-foreground line-clamp-2">
                    {side.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg md:text-base sm:text-sm font-heading font-semibold text-foreground mb-4 md:mb-3 sm:mb-2">
          Number of Copies
        </h3>
        <div className="flex items-center gap-4 md:gap-3 sm:gap-2">
          <button
            onClick={() => handleCopiesChange(false)}
            disabled={configuration.copies <= 1}
            className="flex items-center justify-center w-12 h-12 md:w-10 md:h-10 sm:w-9 sm:h-9 rounded-lg border-2 border-border bg-card transition-all duration-250 ease-out hover:border-primary hover:bg-primary/5 focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-border disabled:hover:bg-card"
            aria-label="Decrease copies"
          >
            <Icon name="MinusIcon" size={20} className="text-foreground md:w-5 md:h-5 sm:w-4 sm:h-4" />
          </button>
          
          <input
            type="number"
            min="1"
            max="999"
            value={configuration.copies}
            onChange={(e) => handleCopiesInput(e.target.value)}
            className="flex-1 min-w-0 h-12 md:h-10 sm:h-9 px-4 md:px-3 sm:px-2.5 text-center text-lg md:text-base sm:text-sm font-medium text-foreground bg-card border-2 border-border rounded-lg transition-all duration-250 ease-out focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2 focus:border-primary"
            aria-label="Number of copies"
          />
          
          <button
            onClick={() => handleCopiesChange(true)}
            disabled={configuration.copies >= 999}
            className="flex items-center justify-center w-12 h-12 md:w-10 md:h-10 sm:w-9 sm:h-9 rounded-lg border-2 border-border bg-card transition-all duration-250 ease-out hover:border-primary hover:bg-primary/5 focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-border disabled:hover:bg-card"
            aria-label="Increase copies"
          >
            <Icon name="PlusIcon" size={20} className="text-foreground md:w-5 md:h-5 sm:w-4 sm:h-4" />
          </button>
        </div>
        <p className="text-xs md:text-[11px] sm:text-[10px] text-caption text-muted-foreground mt-2 md:mt-1.5 sm:mt-1">
          Enter a value between 1 and 999
        </p>
      </div>
    </div>
  );
};

export default PrintConfigurationPanel;