'use client'

import { useState } from 'react'

interface NavItem {
  id: string
  label: string
  icon: string
  description: string
  color: string
}

const navItems: NavItem[] = [
  {
    id: 'build',
    label: 'Build Economy',
    icon: '🏗️',
    description: 'Create economic structures',
    color: 'from-gold-600 to-wealth-600'
  },
  {
    id: 'manage',
    label: 'Manage Systems',
    icon: '⚙️',
    description: 'Control economic flows',
    color: 'from-wealth-600 to-commerce-600'
  },
  {
    id: 'trade',
    label: 'Trade Networks',
    icon: '🔄',
    description: 'Establish trade routes',
    color: 'from-commerce-600 to-economy-600'
  },
  {
    id: 'analyze',
    label: 'Economic Analysis',
    icon: '📊',
    description: 'Data and insights',
    color: 'from-economy-600 to-gold-600'
  },
  {
    id: 'resources',
    label: 'Resource Management',
    icon: '💎',
    description: 'Manage commodities',
    color: 'from-gold-700 to-wealth-700'
  },
  {
    id: 'markets',
    label: 'Market Systems',
    icon: '🏪',
    description: 'Create marketplaces',
    color: 'from-wealth-700 to-commerce-700'
  }
]

export default function LeftSidebar() {
  const [activeItem, setActiveItem] = useState<string | null>(null)

  return (
    <div className="h-full bg-gradient-to-b from-economy-900 via-gold-900 to-wealth-900 border-r border-economy-700/50 p-4">
      {/* App Title */}
      <div className="mb-6 text-center">
        <h2 className="text-lg font-bold text-gold-100 text-shadow-gold mb-1">
          Mercatrix
        </h2>
        <p className="text-xs text-gold-300 text-shadow-wealth">
          Economy Mastery
        </p>
      </div>

      {/* Navigation Items */}
      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveItem(activeItem === item.id ? null : item.id)}
            className={`w-full text-left p-3 rounded-lg transition-all duration-200 group ${
              activeItem === item.id
                ? 'bg-gradient-to-r ' + item.color + ' shadow-lg transform scale-105'
                : 'bg-economy-800/50 hover:bg-economy-700/70 hover:transform hover:scale-102'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <div className={`font-medium ${
                  activeItem === item.id ? 'text-white' : 'text-gold-200'
                }`}>
                  {item.label}
                </div>
                <div className={`text-xs ${
                  activeItem === item.id ? 'text-gold-100' : 'text-gold-400'
                }`}>
                  {item.description}
                </div>
              </div>
            </div>
          </button>
        ))}
      </nav>


    </div>
  )
}
