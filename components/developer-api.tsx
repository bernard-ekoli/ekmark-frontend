'use client'
import { useState } from "react"
export default function DeveloperAPI() {
  return (
    <section id="api" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - API showcase */}
          <div>
            <div className="inline-block mb-4 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
              <span className="text-sm font-medium text-primary">For Developers</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Public API Coming Soon
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Embed our powerful watermarking engine directly into your applications. Free public API with generous rate limits.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex gap-3">
                <span className="text-2xl">🔌</span>
                <div>
                  <h3 className="font-semibold text-foreground">Easy Integration</h3>
                  <p className="text-muted-foreground text-sm">RESTful API with SDK support</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">⚙️</span>
                <div>
                  <h3 className="font-semibold text-foreground">Full Control</h3>
                  <p className="text-muted-foreground text-sm">Customize text, position, opacity, and more</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">🚀</span>
                <div>
                  <h3 className="font-semibold text-foreground">Blazing Fast</h3>
                  <p className="text-muted-foreground text-sm">Sub-second processing times</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">📚</span>
                <div>
                  <h3 className="font-semibold text-foreground">Documentation</h3>
                  <p className="text-muted-foreground text-sm">Complete docs with code examples</p>
                </div>
              </div>
            </div>

            <button disabled={true} className="cursor-not-allowed px-8 py-3 bg-primary/20 text-primary-foreground/70 rounded-lg font-semibold transition shadow-none opacity-80">
              View API Docs
            </button>
            <br />
          </div>

          {/* Right side - Code example */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl blur-xl"></div>
            <div className="relative bg-primary text-primary-foreground rounded-2xl p-8 overflow-hidden">
              {/* Blurred code overlay */}
              <div className="absolute inset-0 backdrop-blur-md bg-black/40 rounded-2xl flex items-center justify-center z-10">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white mb-2">Coming Soon</p>
                  <p className="text-sm text-white/80">API documentation launching June 10</p>
                </div>
              </div>
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 text-xs font-mono opacity-50">api.ekmark.dev</div>
              </div>
              <div className="relative font-mono text-sm leading-relaxed overflow-x-auto">
                <pre className="text-primary-foreground/90">
                  {`// POST /api/watermark
const response = await fetch(
  'https://api.ekmark.dev',
  {
    method: 'POST',
    body: JSON.stringify({
      image: imageUrl,
      text: 'Your Watermark',
      position: 'center',
      opacity: 0.8,
    }),
  }
);

const result = await response.json();
// Returns watermarked image URL`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
