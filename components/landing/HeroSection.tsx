import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-4" aria-labelledby="hero-heading">
      <div className="max-w-4xl mx-auto text-center">
        <h1 id="hero-heading" className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Print Your Documents with Ease
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Upload, select a nearby print shop, and get your documents printed quickly. 
          Join thousands of users who trust ZaPrint for their printing needs.
        </p>
        <Link
          href="/document-upload"
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Start printing your documents - Go to document upload page"
        >
          Start Printing
        </Link>
      </div>
    </section>
  )
}