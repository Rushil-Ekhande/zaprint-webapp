import type { Metadata } from 'next';
import LoginForm from './components/LoginForm';

export const metadata: Metadata = {
  title: 'Login - Zaprint',
  description: 'Sign in to your Zaprint account to access cloud-based printing services and manage your print orders.',
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background">
      <LoginForm />
    </main>
  );
}