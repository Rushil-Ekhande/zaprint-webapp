'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface TimelineStep {
  id: string;
  label: string;
  status: 'completed' | 'current' | 'pending';
  timestamp?: string;
  icon: string;
  description?: string;
}

interface OrderStatusTimelineProps {
  currentStatus: 'uploaded' | 'queued' | 'printing' | 'completed';
  uploadedAt?: string;
  queuedAt?: string;
  printingAt?: string;
  completedAt?: string;
  estimatedCompletion?: string;
}

export default function OrderStatusTimeline({
  currentStatus,
  uploadedAt,
  queuedAt,
  printingAt,
  completedAt,
  estimatedCompletion,
}: OrderStatusTimelineProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const getStepStatus = (stepId: string): 'completed' | 'current' | 'pending' => {
    const statusOrder = ['uploaded', 'queued', 'printing', 'completed'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const stepIndex = statusOrder.indexOf(stepId);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'pending';
  };

  const timelineSteps: TimelineStep[] = [
    {
      id: 'uploaded',
      label: 'Document Uploaded',
      status: getStepStatus('uploaded'),
      timestamp: uploadedAt,
      icon: 'DocumentArrowUpIcon',
      description: 'Your document has been successfully uploaded',
    },
    {
      id: 'queued',
      label: 'Order Queued',
      status: getStepStatus('queued'),
      timestamp: queuedAt,
      icon: 'ClockIcon',
      description: 'Your order is in the print queue',
    },
    {
      id: 'printing',
      label: 'Printing in Progress',
      status: getStepStatus('printing'),
      timestamp: printingAt,
      icon: 'PrinterIcon',
      description: 'Your document is being printed',
    },
    {
      id: 'completed',
      label: 'Order Completed',
      status: getStepStatus('completed'),
      timestamp: completedAt,
      icon: 'CheckCircleIcon',
      description: 'Your order is ready for pickup',
    },
  ];

  if (!isHydrated) {
    return (
      <div className="w-full bg-card rounded-xl shadow-warm-md p-8 md:p-6 sm:p-4">
        <h2 className="text-2xl md:text-xl sm:text-lg font-heading font-semibold text-foreground mb-8 md:mb-6 sm:mb-4">
          Order Status
        </h2>
        <div className="space-y-8 md:space-y-6 sm:space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-muted rounded-full animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-muted rounded w-1/3 animate-pulse" />
                <div className="h-4 bg-muted rounded w-1/4 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-card rounded-xl shadow-warm-md p-8 md:p-6 sm:p-4">
      <h2 className="text-2xl md:text-xl sm:text-lg font-heading font-semibold text-foreground mb-8 md:mb-6 sm:mb-4">
        Order Status
      </h2>

      {/* Desktop & Tablet Timeline */}
      <div className="hidden sm:block">
        <div className="space-y-8 md:space-y-6">
          {timelineSteps.map((step, index) => {
            const isLast = index === timelineSteps.length - 1;

            return (
              <div key={step.id} className="relative">
                <div className="flex items-start space-x-4">
                  <div className="relative flex flex-col items-center">
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-250 ease-out ${
                        step.status === 'completed'
                          ? 'bg-success text-success-foreground'
                          : step.status === 'current' ?'bg-primary text-primary-foreground ring-4 ring-primary/20' :'bg-muted text-muted-foreground'
                      }`}
                    >
                      {step.status === 'completed' ? (
                        <Icon name="CheckIcon" size={24} />
                      ) : (
                        <Icon name={step.icon as any} size={24} />
                      )}
                    </div>
                    {!isLast && (
                      <div
                        className={`w-0.5 h-16 mt-2 transition-all duration-250 ease-out ${
                          step.status === 'completed' ? 'bg-success' : 'bg-border'
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1 pt-2">
                    <div className="flex items-center justify-between mb-1">
                      <p
                        className={`text-base md:text-sm font-medium transition-all duration-250 ease-out ${
                          step.status === 'current' ?'text-foreground'
                            : step.status === 'completed' ?'text-success' :'text-muted-foreground'
                        }`}
                      >
                        {step.label}
                      </p>
                      {step.timestamp && (
                        <span className="text-xs text-caption text-muted-foreground whitespace-nowrap">
                          {step.timestamp}
                        </span>
                      )}
                    </div>
                    <p className="text-sm md:text-xs text-muted-foreground">{step.description}</p>
                    {step.status === 'current' && estimatedCompletion && (
                      <div className="mt-2 flex items-center space-x-2 text-xs text-caption text-primary">
                        <Icon name="ClockIcon" size={16} />
                        <span>Estimated completion: {estimatedCompletion}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Timeline */}
      <div className="sm:hidden space-y-4">
        {timelineSteps.map((step, index) => {
          const isLast = index === timelineSteps.length - 1;

          return (
            <div
              key={step.id}
              className={`p-4 rounded-lg border-2 transition-all duration-250 ease-out ${
                step.status === 'completed'
                  ? 'border-success bg-success/5'
                  : step.status === 'current' ?'border-primary bg-primary/5' :'border-border bg-muted/30'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0 transition-all duration-250 ease-out ${
                    step.status === 'completed'
                      ? 'bg-success text-success-foreground'
                      : step.status === 'current' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground'
                  }`}
                >
                  {step.status === 'completed' ? (
                    <Icon name="CheckIcon" size={20} />
                  ) : (
                    <Icon name={step.icon as any} size={20} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium mb-1 transition-all duration-250 ease-out ${
                      step.status === 'current' ?'text-foreground'
                        : step.status === 'completed' ?'text-success' :'text-muted-foreground'
                    }`}
                  >
                    {step.label}
                  </p>
                  {step.timestamp && (
                    <p className="text-xs text-caption text-muted-foreground mb-1">{step.timestamp}</p>
                  )}
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                  {step.status === 'current' && estimatedCompletion && (
                    <div className="mt-2 flex items-center space-x-2 text-xs text-caption text-primary">
                      <Icon name="ClockIcon" size={14} />
                      <span>Est: {estimatedCompletion}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}