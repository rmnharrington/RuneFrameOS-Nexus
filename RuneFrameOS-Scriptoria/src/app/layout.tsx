import type { Metadata } from 'next'
import { Inter, Cinzel } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const cinzel = Cinzel({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Distillara - RuneFrameOS Gaming Ecosystem',
  description: 'Master the ancient art of alchemy and potion crafting in the RuneFrameOS gaming ecosystem. Discover rare ingredients, learn powerful recipes, and forge legendary elixirs.',
  keywords: 'alchemy, potions, gaming, RPG, tabletop, RuneFrameOS, Distillara',
  authors: [{ name: 'Bad Guy Gas' }],
  creator: 'Bad Guy Gas',
  publisher: 'Bad Guy Gas',
  robots: 'index, follow',
  openGraph: {
    title: 'Distillara - RuneFrameOS Gaming Ecosystem',
    description: 'Master the ancient art of alchemy and potion crafting in the RuneFrameOS gaming ecosystem.',
    type: 'website',
    locale: 'en_US',
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} ${cinzel.variable}`}>
        {children}
      </body>
    </html>
  )
}
