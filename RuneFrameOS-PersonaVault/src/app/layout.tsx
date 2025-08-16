import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PersonaVault - RuneFrameOS',
  description: 'PersonaVault - Comprehensive character sheet management system for all gaming genres and systems. Create, edit, and view character sheets with access to various templates supplied by RuneFrameOS, working seamlessly across all gaming systems.',
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
