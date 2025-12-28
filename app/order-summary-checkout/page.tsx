import type { Metadata } from 'next';
import TopNavigationBar from '@/components/common/TopNavigationBar';
import WorkflowProgressIndicator from '@/components/common/WorkflowProgressIndicator';
import OrderSummaryCheckoutInteractive from './components/OrderSummaryCheckoutInteractive';

export const metadata: Metadata = {
  title: 'Order Summary & Checkout - Zaprint',
  description: 'Review your printing order details, configure payment information, and complete your secure checkout to start printing your documents at your selected print shop.',
};

export default function OrderSummaryCheckoutPage() {
  return (
    <>
      <TopNavigationBar
        isAuthenticated={true}
        userName="John Doe"
        userEmail="john.doe@example.com"
      />
      <WorkflowProgressIndicator variant="horizontal" />
      <OrderSummaryCheckoutInteractive />
    </>
  );
}