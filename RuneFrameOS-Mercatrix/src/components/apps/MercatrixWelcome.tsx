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
    id: 'build',
    title: 'Build Economy',
    description: 'Create complete economic structures from the ground up',
    icon: '🏗️',
    gradient: 'from-gold-600 to-wealth-600',
    features: ['Currency Systems', 'Market Structures', 'Trade Networks', 'Resource Distribution']
  },
  {
    id: 'manage',
    title: 'Manage Systems',
    description: 'Control and optimize economic flows and balances',
    icon: '⚙️',
    gradient: 'from-wealth-600 to-commerce-600',
    features: ['Supply Chains', 'Price Controls', 'Tax Systems', 'Economic Policies']
  },
  {
    id: 'trade',
    title: 'Trade Networks',
    description: 'Establish and manage complex trading relationships',
    icon: '🔄',
    gradient: 'from-commerce-600 to-economy-600',
    features: ['Route Optimization', 'Market Analysis', 'Competition Management', 'Partnership Building']
  },
  {
    id: 'analyze',
    title: 'Economic Analysis',
    description: 'Deep insights into economic performance and trends',
    icon: '📊',
    gradient: 'from-economy-600 to-gold-600',
    features: ['Performance Metrics', 'Trend Analysis', 'Risk Assessment', 'Growth Projections']
  }
]

export default function MercatrixWelcome() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative mb-8">
        <div className="relative h-64 lg:h-80 rounded-xl overflow-hidden">
          <Image
            src="/Mercatrix_HeroBanner.png"
            alt="Mercatrix - Master of Economic Systems"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-economy-950/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="text-3xl lg:text-4xl font-bold text-gold-100 text-shadow-gold mb-2">
              Mercatrix
            </h1>
            <p className="text-lg lg:text-xl text-gold-200 text-shadow-wealth max-w-2xl">
              Master economy management and building across all genres and gaming systems. Build, manage, and optimize entire economic structures.
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
            className={`bg-gradient-to-br from-economy-800/50 to-wealth-900/50 rounded-xl p-6 border border-economy-700/50 cursor-pointer transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl ${
              selectedFeature === card.id
                ? 'ring-2 ring-gold-500 shadow-2xl'
                : 'hover:shadow-lg'
            }`}
          >
            {/* Card Header */}
            <div className="text-center mb-4">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${card.gradient} mb-3 text-3xl`}>
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-gold-100 text-shadow-gold mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-gold-300 text-shadow-wealth">
                {card.description}
              </p>
            </div>

            {/* Card Features */}
            <div className="space-y-2">
              {card.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-sm text-gold-200"
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
        <h2 className="text-2xl font-bold text-gold-100 text-shadow-gold mb-6 text-center">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 bg-gradient-to-r from-gold-700 to-wealth-700 rounded-lg text-white font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            🏗️ Build New Economy
          </button>
          <button className="p-4 bg-gradient-to-r from-wealth-700 to-commerce-700 rounded-lg text-white font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            📊 Analyze Markets
          </button>
          <button className="p-4 bg-gradient-to-r from-commerce-700 to-economy-700 rounded-lg text-white font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            🔄 Create Trade Route
          </button>
          <button className="p-4 bg-gradient-to-r from-economy-700 to-gold-700 rounded-lg text-white font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            💰 Manage Currency
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-12 bg-gradient-to-r from-economy-800/30 to-wealth-800/30 rounded-xl p-6 border border-economy-700/30">
        <h2 className="text-2xl font-bold text-gold-100 text-shadow-gold mb-6 text-center">
          Your Economic Empire
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gold-400 mb-2">23</div>
            <div className="text-sm text-gold-300">Markets Created</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-wealth-400 mb-2">47</div>
            <div className="text-sm text-gold-300">Trade Routes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-commerce-400 mb-2">$2.4M</div>
            <div className="text-sm text-gold-300">GDP Managed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-economy-400 mb-2">156</div>
            <div className="text-sm text-gold-300">Economic Policies</div>
          </div>
        </div>
      </div>
    </div>
  )
}
