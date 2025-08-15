import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mercatrix - RuneFrameOS',
  description: 'Master economy management and building across all genres and gaming systems. Build, manage, and optimize entire economic structures.',
  keywords: 'economy, management, gaming, RPG, tabletop, economic systems, trade, commerce, wealth',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-economy-950">
        {children}
      </body>
    </html>
  )
}
