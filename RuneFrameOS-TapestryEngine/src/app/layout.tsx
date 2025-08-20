import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TapestryEngine - Campaign & Story Builder',
  description: 'Powerful campaign and story building engine for creating immersive narratives that keep players engaged for hours.',
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
