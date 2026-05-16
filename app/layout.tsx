import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ekmark - Free Image Watermark Generator (Coming Soon)',
  description:
    'Coming June 10, 2026. Add professional watermarks to your images for free. Bulk watermark up to 10 images with Ekmark.',
  generator: 'Ekmark Platform',
  icons: {
    icon: [
      {
        url: '/ekmark-mini-logo-dark.png',
        type: 'image/png',
      },
    ],
    apple: '/ekmark-mini-logo-dark.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-background">
      <body
        className={`${_geist.className} antialiased bg-background text-foreground`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}