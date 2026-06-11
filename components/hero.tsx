'use client'
import { useState } from "react"
export default function Hero() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  async function handleSubmit() {
    setLoading(true)
    setSuccess("")
    setError("")

    if (!email) {
      setError("Please enter your email address.")
      setLoading(false)
      setSuccess("") // Clear any previous success message
      return
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.")
      setLoading(false)
      setSuccess("") // Clear any previous success message
      return
    }

    const req = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/waitlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
    if (!req.ok) {
      setError("Failed to join waitlist. Please try again later.")
      setLoading(false)
      setSuccess("") // Clear any previous success message
      return
    }
    const res = await req.json()
    if (!res.success) {
      setError(res.message || "Failed to join waitlist. Please try again later.")
      setLoading(false)
      setSuccess("") // Clear any previous success message
      return
    }
    setError("")
    setSuccess("You have successfully joined the waitlist!")
    setLoading(false)
    setEmail("") // Clear the email input field
  }
  return (
    <section className="relative overflow-hidden pt-20 pb-32 px-4 sm:px-6 lg:px-8">
      {/* Background gradient effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <div id="email" className="inline-block mb-6 px-4 py-2 bg-accent text-accent-foreground border border-accent/30 rounded-full">
          <span className="text-sm font-bold">COMING SOON - June 18, 2026</span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-foreground text-balance">
          Ekmark: Watermark Your Images in Seconds
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance leading-relaxed">
          Free, fast, and beautifully simple. Watermark up to 10 images at once. Position text anywhere. No sign-up required. No limits. Forever free.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-6 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground flex-1 sm:flex-none"
          />
          <button onClick={handleSubmit} disabled={loading} className="cursor-pointer px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition shadow-lg hover:shadow-xl">
            {loading ? "Joining..." : "Join Waitlist"}
          </button>
        </div>
        <div className="pb-20">
          {/* Error div */}
          <div className="text-red-500 text-sm mt-2">
            {error}
          </div>
          {/* Success div */}
          <div className="text-green-500 text-sm mt-2">
            {success}
          </div>
        </div>
        {/* Glossy card preview */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/5 rounded-2xl blur-xl"></div>
          <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 sm:p-12 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
            <div className="relative">
              <div className="bg-primary/10 rounded-xl p-8 aspect-video flex flex-col items-center justify-center border border-border/30">
                <div className="text-4xl mb-4">🖼️</div>
                <p className="text-sm text-muted-foreground">Upload your images and add watermarks instantly</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
