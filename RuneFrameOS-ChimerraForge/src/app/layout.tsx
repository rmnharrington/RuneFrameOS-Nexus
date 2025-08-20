import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ChimerraForge - RuneFrameOS',
  description: 'ChimerraForge - Character-weaver of RuneFrameOS™. Forges richly detailed NPCs with full backgrounds, personalities, cultural idioms, and reactive behaviors.',
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


