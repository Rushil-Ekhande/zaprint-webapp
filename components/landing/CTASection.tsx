import Link from 'next/link'

export function CTASection() {
  return (
    <section className="py-20 px-4 bg-gray-50" aria-labelledby="cta-heading">
      <div className="max-w-4xl mx-auto text-center">
        <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Join thousands of users who trust ZaPrint for their printing needs
        </p>
        <Link
          href="/document-upload"
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Upload your documents to get started with ZaPrint"
        >
          Upload Your Documents
        </Link>
      </div>
    </section>
  )
}