import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mercatrix - RuneFrameOS',
  description: 'Mercatrix - Comprehensive economy management system for all gaming genres and systems. Build entire economies from macro-world scale down to individual vendor inventories, manage trade routes, currency systems, and economic policies.',
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
