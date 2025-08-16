import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LoreForge - RuneFrameOS',
  description: 'LoreForge - Comprehensive world-building system for all gaming genres and systems. Create entire worlds, countries, races, POIs, and manage everything from galaxy-scale to street-level details.',
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
