import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Ekmark - Free Image Watermark Generator (Coming Soon)",
  description:
    "Coming June 10, 2026. Add professional watermarks to your images for free. Bulk watermark up to 10 images at once. No sign-up required. No limits. Forever free.",
  generator: "Ekmark Platform",
  keywords: ["image watermark", "watermark generator", "free watermark", "bulk watermark", "add watermark to image", "watermark photos"],
  authors: [{ name: "Bernard Edet Ekoli" }],
  creator: "Bernard Edet Ekoli",
  metadataBase: new URL("https://ekmark.ekolix.com.ng"),
  icons: {
    icon: [{ url: "/ekmark-mini-logo-dark.png", type: "image/png" }],
    apple: "/ekmark-mini-logo-dark.png",
  },
  openGraph: {
    title: "Ekmark - Free Image Watermark Generator",
    description: "Watermark up to 10 images at once. Free forever. Launching June 10, 2026.",
    url: "https://ekmark.ekolix.com.ng",
    siteName: "Ekmark",
    type: "website",
    images: [
      {
        url: "/ekmark-mini-logo-dark.png", // swap this for an og-image.png later
        width: 1200,
        height: 630,
        alt: "Ekmark - Free Image Watermark Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ekmark - Free Image Watermark Generator",
    description: "Watermark up to 10 images at once. Free forever. Launching June 10, 2026.",
    images: ["/ekmark-mini-logo-dark.png"],
  },
  robots: {
    index: true,
    follow: true,
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