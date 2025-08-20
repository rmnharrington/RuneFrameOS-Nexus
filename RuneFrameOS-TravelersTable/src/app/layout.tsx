import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Travelers Table - RuneFrameOS',
  description: 'GameMaster\'s Travelers Table - Manage campaigns, character sheets, inventories, XP, and blind rolls across all gaming systems and genres.',
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

