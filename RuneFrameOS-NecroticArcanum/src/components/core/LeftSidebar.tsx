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
    id: 'create',
    label: 'Create Undead',
    icon: '🧟',
    description: 'Summon and animate the dead',
    color: 'from-sickly-600 to-necrotic-600'
  },
  {
    id: 'control',
    label: 'Control Undead',
    icon: '🎭',
    description: 'Command and direct your minions',
    color: 'from-undead-600 to-corpse-600'
  },
  {
    id: 'catalog',
    label: 'Undead Catalog',
    icon: '📚',
    description: 'Comprehensive undead bestiary',
    color: 'from-necrotic-600 to-undead-600'
  },
  {
    id: 'research',
    label: 'Necromantic Research',
    icon: '🔬',
    description: 'Study and improve your craft',
    color: 'from-corpse-600 to-sickly-600'
  },
  {
    id: 'rituals',
    label: 'Dark Rituals',
    icon: '⚰️',
    description: 'Ancient necromantic ceremonies',
    color: 'from-undead-700 to-necrotic-700'
  },
  {
    id: 'tools',
    label: 'Necromantic Tools',
    icon: '🦴',
    description: 'Equipment and artifacts',
    color: 'from-sickly-700 to-corpse-700'
  }
]

export default function LeftSidebar() {
  const [activeItem, setActiveItem] = useState<string | null>(null)

  return (
    <div className="h-full bg-gradient-to-b from-undead-900 via-necrotic-900 to-corpse-900 border-r border-undead-700/50 p-4">
      {/* App Title */}
      <div className="mb-6 text-center">
        <h2 className="text-lg font-bold text-sickly-100 text-shadow-necrotic mb-1">
          Necrotic Arcanum
        </h2>
        <p className="text-xs text-sickly-300 text-shadow-corpse">
          Undead Mastery
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
                : 'bg-undead-800/50 hover:bg-undead-700/70 hover:transform hover:scale-102'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <div className={`font-medium ${
                  activeItem === item.id ? 'text-white' : 'text-sickly-200'
                }`}>
                  {item.label}
                </div>
                <div className={`text-xs ${
                  activeItem === item.id ? 'text-sickly-100' : 'text-sickly-400'
                }`}>
                  {item.description}
                </div>
              </div>
            </div>
          </button>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-undead-800/50 rounded-lg p-3 border border-undead-700/30">
          <div className="text-center">
            <p className="text-xs text-sickly-400 mb-2">Powered by</p>
            <div className="text-sm font-medium text-sickly-200">
              Bad Guy Gas
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
