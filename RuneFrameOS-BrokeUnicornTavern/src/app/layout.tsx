import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BrokeUnicorn Tavern - RuneFrameOS',
  description: 'Social hub & in-game gathering place for Travelers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-wood-50 via-tavern-50 to-wood-100">
        {children}
      </body>
    </html>
  )
}

