import type { Metadata } from 'next'
import PremiumLanding from '@/components/landing/PremiumLanding'

export const metadata: Metadata = {
  title: 'ZAPRINT – Print & Create | Premium Printing Services',
  description: 'Transform your ideas into stunning prints with our modern studio-quality equipment and creative expertise. From concept to creation, we make printing effortless.',
}

export default function PremiumLandingPage() {
  return <PremiumLanding />
}