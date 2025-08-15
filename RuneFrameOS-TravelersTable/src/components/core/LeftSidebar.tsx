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
    id: 'campaigns',
    label: 'Campaigns',
    icon: '🗺️',
    description: 'Manage your campaigns',
    color: 'from-brown-600 to-tan-600'
  },
  {
    id: 'players',
    label: 'World Travelers',
    icon: '👥',
    description: 'Track your players',
    color: 'from-tan-600 to-campaign-600'
  },
  {
    id: 'characters',
    label: 'Character Sheets',
    icon: '📋',
    description: 'View full character sheets',
    color: 'from-campaign-600 to-dice-600'
  },
  {
    id: 'inventories',
    label: 'Inventories',
    icon: '🎒',
    description: 'Check player inventories',
    color: 'from-dice-600 to-brown-600'
  },
  {
    id: 'dice',
    label: 'Dice Roller',
    icon: '🎲',
    description: 'Roll dice for gaming',
    color: 'from-brown-700 to-tan-700'
  },
  {
    id: 'notes',
    label: 'GM Notes',
    icon: '📝',
    description: 'Campaign notes & ideas',
    color: 'from-tan-700 to-campaign-700'
  }
]

export default function LeftSidebar() {
  const [activeItem, setActiveItem] = useState<string | null>(null)

  return (
    <div className="h-full bg-gradient-to-b from-brown-900 via-tan-900 to-brown-900 border-r border-tan-700/50 p-4">
      {/* App Title */}
      <div className="mb-6 text-center">
        <h2 className="text-lg font-bold text-tan-100 text-shadow-brown mb-1">
          TravelersTable
        </h2>
        <p className="text-xs text-tan-300 text-shadow-tan">
          GM Campaign Hub
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
                : 'bg-brown-800/50 hover:bg-brown-700/70 hover:transform hover:scale-102'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <div className={`font-medium ${
                  activeItem === item.id ? 'text-white' : 'text-tan-200'
                }`}>
                  {item.label}
                </div>
                <div className={`text-xs ${
                  activeItem === item.id ? 'text-tan-100' : 'text-tan-400'
                }`}>
                  {item.description}
                </div>
              </div>
            </div>
          </button>
        ))}
      </nav>

      {/* Quick Actions */}
      <div className="mt-8 pt-6 border-t border-tan-700/30">
        <h3 className="text-sm font-semibold text-tan-200 text-shadow-tan mb-3">
          Quick Actions
        </h3>
        <div className="space-y-2">
          <button className="w-full p-2 bg-gradient-to-r from-brown-700 to-tan-700 rounded-lg text-xs text-tan-100 hover:from-brown-600 hover:to-tan-600 transition-all duration-200">
            🆕 New Campaign
          </button>
          <button className="w-full p-2 bg-gradient-to-r from-campaign-700 to-dice-700 rounded-lg text-xs text-white hover:from-campaign-600 hover:to-dice-600 transition-all duration-200">
            🎲 Quick Roll
          </button>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="mt-8 pt-6 border-t border-tan-700/30">
        <h3 className="text-sm font-semibold text-tan-200 text-shadow-tan mb-3">
          Status
        </h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-tan-300">3 Active Campaigns</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-tan-300">12 World Travelers</span>
          </div>
        </div>
      </div>
    </div>
  )
}
