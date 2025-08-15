import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PersonaVault - Character Management',
  description: 'Character Sheet Binder & Dice Roller for RuneFrameOS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-grey-50 via-grey-100 to-grey-50">
        {children}
      </body>
    </html>
  )
}
