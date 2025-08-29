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
    id: 'forge',
    label: 'Forge NPC',
    icon: '⚒️',
    description: 'Create new characters',
    color: 'from-gold-600 to-stone-600'
  },
  {
    id: 'library',
    label: 'Character Library',
    icon: '📚',
    description: 'Browse existing NPCs',
    color: 'from-stone-600 to-character-600'
  },
  {
    id: 'templates',
    label: 'Templates',
    icon: '🎭',
    description: 'Character archetypes',
    color: 'from-character-600 to-dice-600'
  },
  {
    id: 'personality',
    label: 'Personality Engine',
    icon: '🧠',
    description: 'Behavioral patterns',
    color: 'from-dice-600 to-stone-600'
  },
  {
    id: 'culture',
    label: 'Cultural Database',
    icon: '🌍',
    description: 'World-building tools',
    color: 'from-stone-600 to-gold-600'
  },
  {
    id: 'export',
    label: 'Export Tools',
    icon: '📤',
    description: 'Share characters',
    color: 'from-gold-600 to-character-600'
  }
]

export default function LeftSidebar() {
  const [activeItem, setActiveItem] = useState('forge')

  return (
    <div className="h-full bg-gradient-to-b from-stone-900 via-gold-900 to-stone-900 border-r border-stone-700/50 p-4">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-lg font-bold text-gold-100 text-shadow-gold mb-1">ChimerraForge</h2>
        <p className="text-xs text-gold-300 text-shadow-stone">Character Weaver</p>
      </div>
      
      {/* Navigation */}
      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`w-full text-left p-3 rounded-lg transition-all duration-200 group ${
              activeItem === item.id 
                ? 'bg-gradient-to-r ' + item.color + ' shadow-lg' 
                : 'bg-stone-800/50 hover:bg-stone-700/70 hover:transform hover:scale-102'
            }`}
            onClick={() => setActiveItem(item.id)}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gold-200">{item.label}</div>
                <div className="text-xs text-gold-400">{item.description}</div>
              </div>
            </div>
          </button>
        ))}
      </nav>
      
      {/* Quick Actions */}
      <div className="mt-8 pt-6 border-t border-stone-700/30">
        <h3 className="text-sm font-semibold text-gold-200 text-shadow-stone mb-3">Quick Actions</h3>
        <div className="space-y-2">
          <button className="w-full p-2 bg-gradient-to-r from-gold-700 to-stone-700 rounded-lg text-xs text-gold-100 hover:from-gold-600 hover:to-stone-600 transition-all duration-200">
            🆕 New NPC
          </button>
          <button className="w-full p-2 bg-gradient-to-r from-character-700 to-dice-700 rounded-lg text-xs text-white hover:from-character-600 hover:to-dice-600 transition-all duration-200">
            🎭 Random Personality
          </button>
        </div>
      </div>
      
      {/* Status */}
      <div className="mt-8 pt-6 border-t border-stone-700/30">
        <h3 className="text-sm font-semibold text-gold-200 text-shadow-stone mb-3">Status</h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gold-300">AI Engine Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gold-300">1,247 Characters</span>
          </div>
        </div>
      </div>
    </div>
  )
}





