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
    <aside className="w-64 bg-gradient-to-b from-slate-50 to-blue-50 border-r-2 border-slate-300/30 shadow-lg">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-slate-200/50">
        <h2 className="text-lg font-semibold text-slate-800">
          Tavern Navigation
        </h2>
        <p className="text-sm text-slate-600">
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
                ? 'bg-gradient-to-r from-blue-200 to-indigo-300 border-2 border-blue-400 shadow-md'
                : 'bg-white/60 hover:bg-white/80 border border-slate-200/50 hover:border-blue-300/70 hover:shadow-md'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1 text-left">
                <h3 className={`font-medium ${
                  item.active ? 'text-blue-800' : 'text-slate-800'
                }`}>
                  {item.name}
                </h3>
                <p className={`text-xs ${
                  item.active ? 'text-blue-600' : 'text-slate-600'
                }`}>
                  {item.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </nav>

      {/* Quick Actions */}
      <div className="p-4 border-t border-slate-200/50">
        <h3 className="text-sm font-medium text-slate-700 mb-3">Quick Actions</h3>
        <div className="space-y-2">
          <button className="w-full p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-medium transition-colors">
            🎲 Roll Dice
          </button>
          <button className="w-full p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors">
            📖 View Lore
          </button>
          <button className="w-full p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-medium transition-colors">
            🗺️ Show Map
          </button>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="p-4 border-t border-slate-200/50">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-slate-600">Tavern Online</span>
        </div>
        <p className="text-xs text-slate-500 mt-1">All services operational</p>
      </div>
    </aside>
  )
}

