'use client'

export default function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-background border border-border/50 rounded-3xl p-12 sm:p-16 overflow-hidden text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>

          <div className="relative">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Ready to Watermark Your Images?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              No account needed. Just upload, watermark, and download. Free forever.
            </p>

            <div className="flex justify-center">
              <a href="/watermark">
                <button className="cursor-pointer px-10 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary/90 transition shadow-lg hover:shadow-xl">
                  Upload Image
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}