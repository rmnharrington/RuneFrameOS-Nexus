import type { Metadata } from 'next'
import { Inter, Cinzel } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const cinzel = Cinzel({ 
  subsets: ['latin'],
  variable: '--font-cinzel',
})

export const metadata: Metadata = {
  title: 'RuneFrameOS Feastwell - Culinary Mastery Platform',
  description: 'Advanced culinary management and recipe optimization system for the RuneFrameOS ecosystem',
  keywords: ['culinary', 'recipes', 'feastwell', 'runeframeos', 'gaming', 'rpg'],
  authors: [{ name: 'RuneFrameOS Team' }],
  creator: 'RuneFrameOS',
  publisher: 'RuneFrameOS',
  robots: 'index, follow',
  openGraph: {
    title: 'RuneFrameOS Feastwell',
    description: 'Culinary Mastery Platform',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={`${inter.className} ${cinzel.variable}`}>
        {children}
      </body>
    </html>
  )
}
