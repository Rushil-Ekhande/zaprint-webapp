import type { Metadata } from 'next'
import TopNavigationBar from '@/components/common/TopNavigationBar'
import { HeroSection } from '@/components/landing/HeroSection'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { CTASection } from '@/components/landing/CTASection'
import { Footer } from '@/components/landing/Footer'

export const metadata: Metadata = {
  title: 'ZaPrint - Print Your Documents with Ease',
  description: 'Upload, select a nearby print shop, and get your documents printed quickly. Join thousands of users who trust ZaPrint for their printing needs.',
}

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <header>
        <TopNavigationBar isAuthenticated={false} />
      </header>
      <main className="pt-20">
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}