export default function Features() {
  const features = [
    {
      icon: '📤',
      title: 'Bulk Upload',
      description: 'Upload up to 10 images at once and watermark them simultaneously'
    },
    {
      icon: '✍️',
      title: 'Custom Text',
      description: 'Add your own text watermarks with full customization options'
    },
    {
      icon: '📍',
      title: 'Flexible Positioning',
      description: 'Place watermarks top, center, bottom, or anywhere you want'
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Process images instantly with our optimized engine'
    },
    {
      icon: '🔓',
      title: '100% Free',
      description: 'No subscriptions, no paywalls, no limits ever'
    },
    {
      icon: '🔒',
      title: 'Private & Secure',
      description: 'Your images are processed locally and never stored'
    }
  ]

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Everything You Need
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional watermarking features, completely free. No compromises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-background border border-border/50 rounded-xl p-8 hover:border-border/80 transition duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative">
                <div className="text-4xl mb-4 block">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
