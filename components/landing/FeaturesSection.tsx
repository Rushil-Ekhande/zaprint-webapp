import { DocumentArrowUpIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline'
import { Feature } from './types'

const features: Feature[] = [
  {
    icon: DocumentArrowUpIcon,
    title: 'Easy Upload',
    description: 'Upload your documents in seconds with our simple drag-and-drop interface'
  },
  {
    icon: MapPinIcon,
    title: 'Choose Your Shop',
    description: 'Select from nearby print shops based on location, ratings, and pricing'
  },
  {
    icon: ClockIcon,
    title: 'Track Your Order',
    description: 'Monitor your order status in real-time from submission to completion'
  }
]

export function FeaturesSection() {
  return (
    <section className="py-20 px-4 bg-white" aria-labelledby="features-heading">
      <div className="max-w-6xl mx-auto">
        <h2 id="features-heading" className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
          How ZaPrint Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6" role="listitem">
              <div className="flex justify-center mb-4" aria-hidden="true">
                <feature.icon className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}