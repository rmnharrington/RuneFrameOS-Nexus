import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Feastwell - RuneFrameOS',
  description: 'Feastwell - Master chef\'s kitchen where culinary magic meets epic feasting. A gamified cooking experience across all gaming genres and systems.',
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
