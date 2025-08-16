import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Distillara - RuneFrameOS',
  description: 'Distillara - Master alchemist\'s workshop for crafting mystical potions and elixirs. A gamified alchemy experience across all gaming genres and systems.',
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
