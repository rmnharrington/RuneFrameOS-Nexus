"use client"

import React from 'react'

interface LeftSidebarProps {
  currentApp?: string
}

export default function LeftSidebar({ currentApp = "BrokeUnicorn Tavern" }: LeftSidebarProps) {
  const tavernNavigation = [
    {
      id: 'main-hall',
      name: 'Main Hall',
      icon: '🏛️',
      description: 'Central gathering area',
      active: currentApp === 'Main Hall'
    },
    {
      id: 'chat-rooms',
      name: 'Chat Rooms',
      icon: '💬',
      description: 'Social conversations',
      active: currentApp === 'Chat Rooms'
    },
    {
      id: 'mission-board',
      name: 'Mission Board',
      icon: '📋',
      description: 'Available quests',
      active: currentApp === 'Mission Board'
    },
    {
      id: 'character-profiles',
      name: 'Character Profiles',
      icon: '👤',
      description: 'Traveler information',
      active: currentApp === 'Character Profiles'
    },
    {
      id: 'tavern-rules',
      name: 'Tavern Rules',
      icon: '📜',
      description: 'Establishment guidelines',
      active: currentApp === 'Tavern Rules'
    }
  ]

  return (
    <aside className="w-64 bg-gradient-to-b from-wood-50 to-tavern-50 border-r-2 border-wood-300/30 shadow-lg">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-wood-200/50">
        <h2 className="text-lg font-fantasy font-semibold text-wood-800">
          Tavern Navigation
        </h2>
        <p className="text-sm text-wood-600">
          Explore the establishment
        </p>
      </div>

      {/* Navigation Items */}
      <nav className="space-y-2 p-4">
        {tavernNavigation.map((item) => (
          <button
            key={item.id}
            className={`w-full p-4 text-left rounded-lg transition-all duration-200 group ${
              item.active
                ? 'bg-gradient-to-r from-tavern-200 to-tavern-300 border-2 border-tavern-400 shadow-md'
                : 'bg-white/60 hover:bg-white/80 border border-wood-200/50 hover:border-tavern-300/70 hover:shadow-md'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1 text-left">
                <h3 className={`font-medium ${
                  item.active ? 'text-tavern-800' : 'text-wood-800'
                }`}>
                  {item.name}
                </h3>
                <p className={`text-xs ${
                  item.active ? 'text-tavern-600' : 'text-wood-600'
                }`}>
                  {item.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </nav>

      {/* Quick Actions */}
      <div className="p-4 border-t border-wood-200/50">
        <h3 className="text-sm font-medium text-wood-700 mb-3">Quick Actions</h3>
        <div className="space-y-2">
          <button className="w-full p-2 bg-tavern-100 hover:bg-tavern-200 text-tavern-700 rounded-lg text-sm font-medium transition-colors">
            🎲 Roll Dice
          </button>
          <button className="w-full p-2 bg-wood-100 hover:bg-wood-200 text-wood-700 rounded-lg text-sm font-medium transition-colors">
            📖 View Lore
          </button>
          <button className="w-full p-2 bg-tavern-100 hover:bg-tavern-200 text-tavern-700 rounded-lg text-sm font-medium transition-colors">
            🗺️ Show Map
          </button>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="p-4 border-t border-wood-200/50">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-wood-600">Tavern Online</span>
        </div>
        <p className="text-xs text-wood-500 mt-1">All services operational</p>
      </div>
    </aside>
  )
}

