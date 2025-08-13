'use client'

import { useState } from 'react'
import Image from 'next/image'

interface FeatureCard {
  id: string
  title: string
  description: string
  icon: string
  gradient: string
  features: string[]
}

const featureCards: FeatureCard[] = [
  {
    id: 'create',
    title: 'Create Undead',
    description: 'Summon and animate the dead with powerful necromantic rituals',
    icon: '🧟',
    gradient: 'from-sickly-600 to-necrotic-600',
    features: ['Zombie Hordes', 'Skeleton Warriors', 'Ghostly Apparitions', 'Vampiric Thralls']
  },
  {
    id: 'control',
    title: 'Control Undead',
    description: 'Command and direct your undead minions with precision',
    icon: '🎭',
    gradient: 'from-undead-600 to-corpse-600',
    features: ['Mental Domination', 'Group Coordination', 'Tactical Formation', 'Behavioral Programming']
  },
  {
    id: 'catalog',
    title: 'Undead Catalog',
    description: 'Comprehensive bestiary of undead creatures across all systems',
    icon: '📚',
    gradient: 'from-necrotic-600 to-undead-600',
    features: ['Creature Types', 'Abilities & Powers', 'Weaknesses', 'Creation Methods']
  },
  {
    id: 'research',
    title: 'Necromantic Research',
    description: 'Study and improve your dark arts through experimentation',
    icon: '🔬',
    gradient: 'from-corpse-600 to-sickly-600',
    features: ['Ritual Development', 'Power Enhancement', 'New Techniques', 'Ancient Knowledge']
  }
]

export default function NecroticArcanumWelcome() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative mb-8">
        <div className="relative h-64 lg:h-80 rounded-xl overflow-hidden">
          <Image
            src="/NecroticArcanum_HeroBanner.png"
            alt="Necrotic Arcanum - Master of the Undead Arts"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-corpse-950/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="text-3xl lg:text-4xl font-bold text-sickly-100 text-shadow-necrotic mb-2">
              Necrotic Arcanum
            </h1>
            <p className="text-lg lg:text-xl text-sickly-200 text-shadow-corpse max-w-2xl">
              Master the art of undead creation, control, and cataloging. Everything undead across all systems and genres.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid - Following our responsive design standards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {featureCards.map((card) => (
          <div
            key={card.id}
            onClick={() => setSelectedFeature(selectedFeature === card.id ? null : card.id)}
            className={`bg-gradient-to-br from-undead-800/50 to-corpse-900/50 rounded-xl p-6 border border-undead-700/50 cursor-pointer transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl ${
              selectedFeature === card.id
                ? 'ring-2 ring-sickly-500 shadow-2xl'
                : 'hover:shadow-lg'
            }`}
          >
            {/* Card Header */}
            <div className="text-center mb-4">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${card.gradient} mb-3 text-3xl`}>
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-sickly-100 text-shadow-necrotic mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-sickly-300 text-shadow-corpse">
                {card.description}
              </p>
            </div>

            {/* Card Features */}
            <div className="space-y-2">
              {card.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-sm text-sickly-200"
                >
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${card.gradient}`} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <div className="mt-6 text-center">
              <button className={`px-4 py-2 rounded-lg bg-gradient-to-r ${card.gradient} text-white font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105`}>
                Explore {card.title}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-sickly-100 text-shadow-necrotic mb-6 text-center">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 bg-gradient-to-r from-sickly-700 to-necrotic-700 rounded-lg text-white font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            🧟 Create New Undead
          </button>
          <button className="p-4 bg-gradient-to-r from-undead-700 to-corpse-700 rounded-lg text-white font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            📚 Browse Catalog
          </button>
          <button className="p-4 bg-gradient-to-r from-necrotic-700 to-undead-700 rounded-lg text-white font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            ⚰️ Perform Ritual
          </button>
          <button className="p-4 bg-gradient-to-r from-corpse-700 to-sickly-700 rounded-lg text-white font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            🔬 Research
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-12 bg-gradient-to-r from-undead-800/30 to-necrotic-800/30 rounded-xl p-6 border border-undead-700/30">
        <h2 className="text-2xl font-bold text-sickly-100 text-shadow-necrotic mb-6 text-center">
          Your Necromantic Progress
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-sickly-400 mb-2">47</div>
            <div className="text-sm text-sickly-300">Undead Created</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-necrotic-400 mb-2">23</div>
            <div className="text-sm text-sickly-300">Souls Collected</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-undead-400 mb-2">12</div>
            <div className="text-sm text-sickly-300">Rituals Performed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-corpse-400 mb-2">8</div>
            <div className="text-sm text-sickly-300">New Techniques</div>
          </div>
        </div>
      </div>
    </div>
  )
}
