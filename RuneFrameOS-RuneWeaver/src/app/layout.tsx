import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RuneWeaver - Enchantment Crafting Workshop',
  description: 'Master enchantment workshop for crafting mystical runes and powerful enchantments across all gaming systems.',
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
