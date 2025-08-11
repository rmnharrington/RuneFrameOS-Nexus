"use client"

import AppLayout from '@/components/core/AppLayout'
import TavernWelcome from '@/components/apps/TavernWelcome'

export default function Home() {
  return (
    <AppLayout
      appName="BrokeUnicorn Tavern"
      userName="Adventurer"
      appIcon="/tavern-logo.png"
      appType="Tavern"
    >
      <TavernWelcome />
    </AppLayout>
  )
}

