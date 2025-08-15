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
    id: 'worlds',
    label: 'Worlds',
    icon: '🌍',
    description: 'Manage campaign worlds',
    color: 'from-tapestry-600 to-world-600'
  },
  {
    id: 'campaigns',
    label: 'Campaigns',
    icon: '📚',
    description: 'Story management',
    color: 'from-world-600 to-story-600'
  },
  {
    id: 'npcs',
    label: 'NPCs',
    icon: '👥',
    description: 'Character creation',
    color: 'from-story-600 to-campaign-600'
  },
  {
    id: 'locations',
    label: 'Locations',
    icon: '🏰',
    description: 'World geography',
    color: 'from-campaign-600 to-tapestry-600'
  },
  {
    id: 'events',
    label: 'Events',
    icon: '⚡',
    description: 'Timeline management',
    color: 'from-tapestry-700 to-world-700'
  },
  {
    id: 'lore',
    label: 'Lore',
    icon: '📖',
    description: 'World knowledge',
    color: 'from-world-700 to-story-700'
  }
]

export default function LeftSidebar() {
  const [activeItem, setActiveItem] = useState<string | null>(null)

  return (
    <div className="h-full bg-gradient-to-b from-tapestry-900 via-world-900 to-story-900 border-r border-world-700/50 p-4">
      {/* App Title */}
      <div className="mb-6 text-center">
        <h2 className="text-lg font-bold text-tapestry-100 text-shadow-tapestry mb-1">
          Tapestry Engine
        </h2>
        <p className="text-xs text-world-300 text-shadow-world">
          World Building Mastery
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
                : 'bg-world-800/50 hover:bg-world-700/70 hover:transform hover:scale-102'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <div className={`font-medium ${
                  activeItem === item.id ? 'text-white' : 'text-tapestry-200'
                }`}>
                  {item.label}
                </div>
                <div className={`text-xs ${
                  activeItem === item.id ? 'text-tapestry-100' : 'text-tapestry-400'
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

