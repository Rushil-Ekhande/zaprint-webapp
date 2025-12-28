'use client';

import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface WorkflowStep {
  label: string;
  path: string;
  icon: string;
}

interface WorkflowProgressIndicatorProps {
  variant?: 'horizontal' | 'vertical';
}

const workflowSteps: WorkflowStep[] = [
  {
    label: 'Upload Document',
    path: '/document-upload',
    icon: 'DocumentArrowUpIcon',
  },
  {
    label: 'Select Print Shop',
    path: '/print-shop-selection',
    icon: 'BuildingStorefrontIcon',
  },
  {
    label: 'Order Summary',
    path: '/order-summary-checkout',
    icon: 'ShoppingCartIcon',
  },
  {
    label: 'Track Order',
    path: '/order-tracking',
    icon: 'TruckIcon',
  },
];

const WorkflowProgressIndicator = ({ variant = 'horizontal' }: WorkflowProgressIndicatorProps) => {
  const pathname = usePathname();

  const currentStepIndex = workflowSteps.findIndex((step) => step.path === pathname);
  const isStepCompleted = (index: number) => currentStepIndex > index;
  const isStepCurrent = (index: number) => currentStepIndex === index;

  if (pathname === '/login') {
    return null;
  }

  if (variant === 'vertical') {
    return (
      <div className="w-full max-w-xs mx-auto py-6">
        <div className="space-y-4">
          {workflowSteps.map((step, index) => {
            const completed = isStepCompleted(index);
            const current = isStepCurrent(index);
            const isLast = index === workflowSteps.length - 1;

            return (
              <div key={step.path} className="relative">
                <div className="flex items-start space-x-4">
                  <div className="relative flex flex-col items-center">
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-250 ease-out ${
                        completed
                          ? 'bg-success text-success-foreground'
                          : current
                          ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {completed ? (
                        <Icon name="CheckIcon" size={24} />
                      ) : (
                        <Icon name={step.icon as any} size={24} />
                      )}
                    </div>
                    {!isLast && (
                      <div
                        className={`w-0.5 h-12 mt-2 transition-all duration-250 ease-out ${
                          completed ? 'bg-success' : 'bg-border'
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1 pt-2">
                    <p
                      className={`text-sm font-medium transition-all duration-250 ease-out ${
                        current ? 'text-foreground' : completed ? 'text-success' : 'text-muted-foreground'
                      }`}
                    >
                      {step.label}
                    </p>
                    {current && (
                      <p className="text-xs text-muted-foreground mt-1">Current step</p>
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

  return (
    <div className="w-full bg-card border-b border-border py-4 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="hidden md:flex items-center justify-between">
          {workflowSteps.map((step, index) => {
            const completed = isStepCompleted(index);
            const current = isStepCurrent(index);
            const isLast = index === workflowSteps.length - 1;

            return (
              <div key={step.path} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-250 ease-out ${
                      completed
                        ? 'bg-success text-success-foreground'
                        : current
                        ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {completed ? (
                      <Icon name="CheckIcon" size={24} />
                    ) : (
                      <Icon name={step.icon as any} size={24} />
                    )}
                  </div>
                  <p
                    className={`text-sm font-caption font-medium mt-2 text-center transition-all duration-250 ease-out ${
                      current ? 'text-foreground' : completed ? 'text-success' : 'text-muted-foreground'
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
                {!isLast && (
                  <div className="flex-1 h-0.5 mx-4 transition-all duration-250 ease-out" style={{
                    background: completed ? 'var(--color-success)' : 'var(--color-border)'
                  }} />
                )}
              </div>
            );
          })}
        </div>

        <div className="md:hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-250 ease-out ${
                  currentStepIndex >= 0
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {currentStepIndex >= 0 ? (
                  <Icon name={workflowSteps[currentStepIndex].icon as any} size={20} />
                ) : (
                  <Icon name="DocumentArrowUpIcon" size={20} />
                )}
              </div>
              <div>
                <p className="text-xs text-caption text-muted-foreground">
                  Step {currentStepIndex + 1} of {workflowSteps.length}
                </p>
                <p className="text-sm font-medium text-foreground">
                  {currentStepIndex >= 0 ? workflowSteps[currentStepIndex].label : 'Get Started'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            {workflowSteps.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-all duration-250 ease-out ${
                  index <= currentStepIndex ? 'bg-primary' : 'bg-border'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowProgressIndicator;