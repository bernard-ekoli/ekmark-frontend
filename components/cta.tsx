'use client'
import { useState } from "react"
export default function CTA() {
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
    <section id="lastWaitlist" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
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
            <p className="text-sm text-muted-foreground mt-6">
              No spam, no compromises. We'll only email you when we launch.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
