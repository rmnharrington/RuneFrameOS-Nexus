import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BrokeUnicorn Tavern - RuneFrameOS',
  description: 'The legendary BrokeUnicorn Tavern - A haven for adventurers, storytellers, and those seeking mystical brews and rare artifacts.',
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
