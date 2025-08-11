import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RuneFrameOS Nexus',
  description: 'The central hub and base framework for all RuneFrameOS applications',
  icons: {
    icon: '/images/Favicon_32x32.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-secondary-50 to-secondary-100">
        {children}
      </body>
    </html>
  )
}
