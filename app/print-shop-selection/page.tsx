import type { Metadata } from 'next';
import TopNavigationBar from '@/components/common/TopNavigationBar';
import WorkflowProgressIndicator from '@/components/common/WorkflowProgressIndicator';
import PrintShopSelectionInteractive from './components/PrintShopSelectionInteractive';

export const metadata: Metadata = {
  title: 'Select Print Shop - Zaprint',
  description: 'Discover and choose nearby printing services through our interactive map. Compare print shops by distance, ratings, and available services to find the perfect match for your printing needs.',
};

export default function PrintShopSelectionPage() {
  return (
    <>
      <TopNavigationBar isAuthenticated={true} userName="John Doe" userEmail="john.doe@example.com" />
      <WorkflowProgressIndicator variant="horizontal" />
      <PrintShopSelectionInteractive />
    </>
  );
}