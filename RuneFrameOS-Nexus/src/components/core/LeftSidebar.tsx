"use client"

import React from 'react'

interface LeftSidebarProps {
  currentApp?: string
  onNavigate?: (destination: 'nexus' | 'distillara' | 'feastwell' | 'hoardwell' | 'tavern') => void
}

export default function LeftSidebar({ currentApp = "Nexus", onNavigate }: LeftSidebarProps) {
  const navigationItems = [
    {
      id: 'nexus',
      name: 'Dashboard',
      icon: '🏠',
      description: 'Main control center',
      active: currentApp === 'Nexus' || currentApp === 'nexus'
    },
    {
      id: 'distillara',
      name: 'Distillara',
      icon: '🧪',
      description: 'Gaming & alchemy system',
      active: currentApp === 'distillara'
    },
    {
      id: 'feastwell',
      name: 'Feastwell',
      icon: '🍽️',
      description: 'Food & recipe management',
      active: currentApp === 'feastwell'
    },
    {
      id: 'hoardwell',
      name: 'Hoardwell',
      icon: '💎',
      description: 'Inventory & characters',
      active: currentApp === 'hoardwell'
    },
    {
      id: 'tavern',
      name: 'BrokeUnicorn Tavern',
      icon: '🏰',
      description: 'Social hub & gathering place',
      active: currentApp === 'tavern'
    }
  ]

  const handleNavigation = (destination: string) => {
    if (onNavigate) {
      onNavigate(destination as any)
    }
  }

  return (
    <aside className="w-64 lg:w-72 bg-gradient-to-b from-amber-50 to-orange-50 border-r-2 border-amber-300/30 shadow-lg">
      <div className="p-4 lg:p-6">
        {/* Sidebar Header */}
        <div className="mb-6 lg:mb-8 text-center">
          <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg mb-3">
            <img 
              src="/RuneFrameOS_NoText.png" 
              alt="RuneFrameOS"
              className="w-8 h-8 lg:w-10 lg:h-10 object-contain"
            />
          </div>
          <h3 className="text-base lg:text-lg font-fantasy font-semibold text-amber-800">
            Navigation
          </h3>
          <p className="text-xs lg:text-sm text-amber-600/70">
            Choose your path
          </p>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`w-full p-3 lg:p-4 text-left rounded-lg transition-all duration-200 group touch-manipulation ${
                item.active
                  ? 'bg-gradient-to-r from-amber-200 to-orange-200 border-2 border-amber-400 shadow-md'
                  : 'bg-white/60 hover:bg-white/80 border border-amber-200/50 hover:border-amber-300/70 hover:shadow-md'
              }`}
            >
              <div className="flex items-center space-x-2 lg:space-x-3">
                <span className="text-xl lg:text-2xl">{item.icon}</span>
                <div className="flex-1 text-left">
                  <h4 className={`font-medium text-sm lg:text-base ${
                    item.active ? 'text-amber-900' : 'text-amber-800'
                  }`}>
                    {item.name}
                  </h4>
                  <p className={`text-xs lg:text-sm ${
                    item.active ? 'text-amber-700' : 'text-amber-600/70'
                  }`}>
                    {item.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </nav>

        {/* Quick Actions */}
        <div className="mt-6 lg:mt-8 pt-4 lg:pt-6 border-t border-amber-300/30">
          <h4 className="text-xs lg:text-sm font-medium text-amber-700 mb-2 lg:mb-3">Quick Actions</h4>
          <div className="space-y-2">
            <button className="w-full p-2 lg:p-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 hover:scale-105 shadow-md text-xs lg:text-sm touch-manipulation">
              <span className="flex items-center justify-center space-x-2">
                <span>🚀</span>
                <span className="font-medium">New Campaign</span>
              </span>
            </button>
            <button className="w-full p-2 lg:p-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 hover:scale-105 shadow-md text-xs lg:text-sm touch-manipulation">
              <span className="flex items-center justify-center space-x-2">
                <span>⚡</span>
                <span className="font-medium">Quick Roll</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
