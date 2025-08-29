'use client'

import { useState } from 'react'
import { useSystemContext } from '../../contexts/SystemContext'
import LeftSidebarSystems from '../functional/LeftSidebarSystems'

interface NavItem {
  id: string
  label: string
  icon: string
  description: string
  color: string
}

const navItems: NavItem[] = [
  {
    id: 'library',
    label: 'Library',
    icon: '📚',
    description: 'Game systems collection',
    color: 'from-gold-600 to-stone-600'
  },
  {
    id: 'echeladon',
    label: 'Echeladon',
    icon: '⚔️',
    description: 'Proprietary system',
    color: 'from-stone-600 to-character-600'
  },
  {
    id: 'rules',
    label: 'Rules',
    icon: '📖',
    description: 'System rulebooks',
    color: 'from-character-600 to-dice-600'
  },
  {
    id: 'mechanics',
    label: 'Mechanics',
    icon: '🎲',
    description: 'Game mechanics',
    color: 'from-dice-600 to-gold-600'
  },
  {
    id: 'reference',
    label: 'Reference',
    icon: '🔍',
    description: 'Quick lookup tools',
    color: 'from-gold-700 to-stone-700'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: '⚙️',
    description: 'App configuration',
    color: 'from-stone-700 to-character-700'
  }
]

export default function LeftSidebar() {
  const [activeItem, setActiveItem] = useState<string | null>(null)

  return (
    <div className="h-full bg-gradient-to-b from-stone-900 via-gold-900 to-stone-900 border-r border-stone-700/50 p-4">
      {/* App Title */}
      <div className="mb-6 text-center">
        <h2 className="text-lg font-bold text-gold-100 text-shadow-gold mb-1">
          Scriptoria
        </h2>
        <p className="text-xs text-gold-300 text-shadow-stone">
          Gaming Systems
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
                : 'bg-stone-800/50 hover:bg-stone-700/70 hover:transform hover:scale-102'
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
        
        {/* System Selection - Only show when Library is active */}
        {activeItem === 'library' && (
          <div className="mt-4 p-3 bg-stone-800/30 rounded-lg border border-stone-700/30">
            <LeftSidebarSystems />
          </div>
        )}
      </nav>

      {/* Quick Actions */}
      <div className="mt-8 pt-6 border-t border-stone-700/30">
        <h3 className="text-sm font-semibold text-gold-200 text-shadow-stone mb-3">
          Quick Actions
        </h3>
        <div className="space-y-2">
          <button className="w-full p-2 bg-gradient-to-r from-gold-700 to-stone-700 rounded-lg text-xs text-gold-100 hover:from-gold-600 hover:to-stone-600 transition-all duration-200">
            📚 Browse Systems
          </button>
          <button className="w-full p-2 bg-gradient-to-r from-character-700 to-dice-700 rounded-lg text-xs text-white hover:from-character-600 hover:to-dice-600 transition-all duration-200">
            ⚔️ Echeladon Rules
          </button>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="mt-8 pt-6 border-t border-stone-700/30">
        <h3 className="text-sm font-semibold text-gold-200 text-shadow-stone mb-3">
          Status
        </h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gold-300">Library Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gold-300">5 Systems Loaded</span>
          </div>
        </div>
      </div>
    </div>
  )
}
