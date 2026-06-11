'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/header'
import Hero from '@/components/hero'
import Features from '@/components/features'
import DeveloperAPI from '@/components/developer-api'
import LaunchCountdown from '@/components/launch-countdown'
import CTA from '@/components/cta'
import Footer from '@/components/footer'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    console.log("Backend URL:", process.env.NEXT_PUBLIC_BACKEND_URL);
    const warmUpServer = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/init`)
        const resJson = await res.json()
        console.log(resJson)
      } catch (err) {
        console.error(err)
      }
    }
    warmUpServer()
  })

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Features />
      <LaunchCountdown />
      <DeveloperAPI />
      <CTA />
      <Footer />
    </main>
  )
}
