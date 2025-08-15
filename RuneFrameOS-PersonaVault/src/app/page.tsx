"use client"

import AppLayout from '@/components/core/AppLayout'
import CharacterDashboard from '@/components/CharacterDashboard'

export default function HomePage() {
  return (
    <AppLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative mb-8">
          <div className="relative h-64 lg:h-80 rounded-xl overflow-hidden">
            <img
              src="/PersonaVault_HeroBanner.png"
              alt="PersonaVault - Character Sheet Mastery"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-3xl lg:text-4xl font-bold text-gold-100 text-shadow-gold mb-2">
                PersonaVault
              </h1>
              <p className="text-lg lg:text-xl text-gold-200 text-shadow-stone max-w-2xl">
                Master character creation and management across all genres and gaming systems. Create, edit, and track characters with built-in dice rollers.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <CharacterDashboard />
      </div>
    </AppLayout>
  )
}
