import type { Metadata } from 'next';
import TopNavigationBar from '@/components/common/TopNavigationBar';
import UserDashboardInteractive from './components/UserDashboardInteractive';

export const metadata: Metadata = {
  title: 'Dashboard - Zaprint',
  description: 'Manage your printing activities, view order history, and access your account information on the Zaprint user dashboard.',
};

export default function UserDashboardPage() {
  return (
    <>
      <TopNavigationBar
        isAuthenticated={true}
        userName="John Smith"
        userEmail="john.smith@example.com"
      />
      <UserDashboardInteractive />
    </>
  );
}