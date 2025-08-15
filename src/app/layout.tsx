import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tapestry Engine - RuneFrameOS',
  description: 'World Building & Campaign Management for RuneFrameOS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

