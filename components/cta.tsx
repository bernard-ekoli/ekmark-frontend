export default function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-background border border-border/50 rounded-3xl p-12 sm:p-16 overflow-hidden text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
          
          <div className="relative">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Join Us on Launch Day
            </h2>
            <p className="text-lg text-muted-foreground mb-2 max-w-2xl mx-auto">
              Ekmark launches June 10, 2026
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Be notified when we go live. Early access for early subscribers.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                placeholder="your@email.com"
                className="px-6 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground flex-1 sm:flex-none"
              />
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition shadow-lg hover:shadow-xl">
                Join Waitlist
              </button>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              No spam, no compromises. We'll only email you when we launch.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
