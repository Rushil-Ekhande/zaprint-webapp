import Link from 'next/link'

export function Footer() {
  const navigationLinks = [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' }
  ]

  return (
    <footer className="bg-gray-900 text-white py-12 px-4" role="contentinfo">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">ZaPrint</h3>
            <p className="text-gray-300 mb-4">
              Making document printing simple and accessible for everyone.
            </p>
            <p className="text-gray-300">
              Contact us: <a 
                href="mailto:support@zaprint.com" 
                className="text-blue-400 hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                aria-label="Send email to ZaPrint support"
              >
                support@zaprint.com
              </a>
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <nav className="space-y-2" aria-label="Footer navigation">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-gray-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Copyright */}
          <div>
            <p className="text-gray-300">
              © 2024 ZaPrint. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}