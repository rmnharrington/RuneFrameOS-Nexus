import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TravelersTable - GameMaster Campaign Management',
  description: 'Manage your campaigns and track your World Travelers with built-in dice rolling and GM notes.',
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
