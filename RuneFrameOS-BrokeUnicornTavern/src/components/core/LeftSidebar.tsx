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
    <aside className="w-full h-full bg-gradient-to-b from-amber-50 to-orange-50 border-r-2 border-amber-300/30 overflow-y-auto">
      <div className="p-3 lg:p-4">
        {/* Header */}
        <div className="mb-4 lg:mb-6 text-center">
          <img
            src="/BrokeUnicornTavern_Logos_IconOnly.png"
            alt="BrokeUnicorn Tavern"
            className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-2 lg:mb-4 object-contain"
          />
          <h2 className="text-sm lg:text-base font-fantasy font-bold text-amber-800">Navigation</h2>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1 lg:space-y-2 mb-4 lg:mb-6">
          {tavernNavigation.map((item) => (
            <button
              key={item.id}
              className={`w-full p-2 lg:p-3 text-left rounded-lg transition-all duration-200 group ${
                item.active
                  ? 'bg-gradient-to-r from-yellow-200 to-amber-300 border-2 border-yellow-400 shadow-md'
                  : 'bg-white/60 hover:bg-white/80 border border-amber-200/50 hover:border-yellow-300/70 hover:shadow-md'
              }`}
            >
              <div className="flex items-center space-x-2 lg:space-x-3">
                <span className="text-lg lg:text-xl">{item.icon}</span>
                <div className="flex-1 text-left">
                  <h3 className={`font-medium text-xs lg:text-sm ${
                    item.active ? 'text-amber-800' : 'text-amber-900'
                  }`}>
                    {item.name}
                  </h3>
                  <p className={`text-xs ${
                    item.active ? 'text-amber-700' : 'text-amber-700'
                  }`}>
                    {item.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </nav>

        {/* Quick Actions */}
        <div className="mb-4 lg:mb-6 border-t border-amber-200/50 pt-4">
          <h3 className="text-xs lg:text-sm font-medium text-amber-700 mb-2 lg:mb-3">Quick Actions</h3>
          <div className="space-y-1 lg:space-y-2">
            <button className="w-full p-2 bg-yellow-100 hover:bg-yellow-200 text-amber-700 rounded-lg text-xs lg:text-sm font-medium transition-colors">
              🎲 Roll Dice
            </button>
            <button className="w-full p-2 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg text-xs lg:text-sm font-medium transition-colors">
              📖 Read Lore
            </button>
            <button className="w-full p-2 bg-yellow-100 hover:bg-yellow-200 text-amber-700 rounded-lg text-xs lg:text-sm font-medium transition-colors">
              🗺️ View Map
            </button>
          </div>
        </div>

        {/* Tavern Status */}
        <div className="border-t border-amber-200/50 pt-4">
          <h3 className="text-xs lg:text-sm font-medium text-amber-700 mb-2 lg:mb-3">Tavern Status</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-amber-600">Active Travelers:</span>
              <span className="font-medium text-amber-800">47</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-600">Missions:</span>
              <span className="font-medium text-amber-800">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-600">Events:</span>
              <span className="font-medium text-amber-800">2</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

