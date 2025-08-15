import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Broke Unicorn Tavern - RuneFrameOS',
  description: 'Social Hub & Game Coordination for RuneFrameOS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-brown-950 text-tan-100">
        {children}
      </body>
    </html>
  )
}
