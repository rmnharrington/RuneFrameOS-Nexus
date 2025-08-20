import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Scriptoria - Gaming Systems Library',
  description: 'Comprehensive gaming systems library for reading rules and implementing game mechanics across all systems.',
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
