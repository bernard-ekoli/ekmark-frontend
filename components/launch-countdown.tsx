'use client'

import { useState, useEffect } from 'react'

export default function LaunchCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 30,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date('2026-06-10T00:00:00').getTime()
    
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const CountdownBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative mb-2">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg blur-md"></div>
        <div className="relative bg-background border border-border/50 rounded-lg px-6 py-4 min-w-20 text-center backdrop-blur-sm">
          <span className="text-3xl sm:text-4xl font-bold text-foreground block">
            {String(value).padStart(2, '0')}
          </span>
        </div>
      </div>
      <span className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
    </div>
  )

  return (
    <section id="launch" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
          Launching Soon
        </h2>
        <p className="text-lg text-muted-foreground mb-12">
          Join thousands waiting for Ekmark's free watermarking power
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <CountdownBox value={timeLeft.days} label="Days" />
          <CountdownBox value={timeLeft.hours} label="Hours" />
          <CountdownBox value={timeLeft.minutes} label="Minutes" />
          <CountdownBox value={timeLeft.seconds} label="Seconds" />
        </div>

        <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition shadow-lg hover:shadow-xl">
          Notify Me at Launch
        </button>
      </div>
    </section>
  )
}
