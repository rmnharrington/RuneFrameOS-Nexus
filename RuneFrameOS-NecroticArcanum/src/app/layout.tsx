import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Necrotic Arcanum - RuneFrameOS',
  description: 'Master the art of undead creation, control, and cataloging. Everything undead across all systems and genres.',
  keywords: 'undead, necromancy, zombies, skeletons, vampires, gaming, RPG, tabletop',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-corpse-950">
        {children}
      </body>
    </html>
  )
}
