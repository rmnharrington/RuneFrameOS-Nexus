import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hoardwell - RuneFrameOS',
  description: 'Hoardwell - Comprehensive equipment management system for all gaming genres and systems. Buy, sell, manage durability, carry locations, and download predefined equipment lists from Mercatrix.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-stone-950 text-white">
        {children}
      </body>
    </html>
  )
}
