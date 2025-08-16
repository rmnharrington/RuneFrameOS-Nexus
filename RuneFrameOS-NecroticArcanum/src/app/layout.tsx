import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Necrotic Arcanum - RuneFrameOS',
  description: 'Necrotic Arcanum - Comprehensive undead management system for all gaming genres and systems. Build, destroy, manipulate, and research undead creatures, manage necromantic powers, and control death magic across all gaming systems.',
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
