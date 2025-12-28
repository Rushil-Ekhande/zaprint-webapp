import type { Metadata } from 'next';
import TopNavigationBar from '@/components/common/TopNavigationBar';
import WorkflowProgressIndicator from '@/components/common/WorkflowProgressIndicator';
import OrderTrackingInteractive from './components/OrderTrackingInteractive';

export const metadata: Metadata = {
  title: 'Order Tracking - Zaprint',
  description: 'Monitor your printing progress and receive real-time status updates throughout the fulfillment process with comprehensive order tracking and print shop contact information.',
};

export default function OrderTrackingPage() {
  return (
    <>
      <TopNavigationBar
        isAuthenticated={true}
        userName="John Smith"
        userEmail="john.smith@example.com"
      />
      <WorkflowProgressIndicator variant="horizontal" />
      <OrderTrackingInteractive />
    </>
  );
}