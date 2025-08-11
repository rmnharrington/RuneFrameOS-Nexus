"use client"

import React from 'react'

interface LeftSidebarProps {
  currentApp?: string
  onNavigate?: (destination: string) => void
}

export default function LeftSidebar({ currentApp = "Nexus", onNavigate }: LeftSidebarProps) {
  const navigationItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: '🏠',
      description: 'Main control center',
      active: currentApp === 'Nexus'
    },
    {
      id: 'distillara',
      name: 'Distillara',
      icon: '🧪',
      description: 'Gaming & alchemy system',
      active: false
    },
    {
      id: 'core',
      name: 'Core Admin',
      icon: '⚙️',
      description: 'System administration',
      active: false
    },
    {
      id: 'feastwell',
      name: 'Feastwell',
      icon: '🍽️',
      description: 'Food & recipe management',
      active: false
    },
    {
      id: 'hoardwell',
      name: 'Hoardwell',
      icon: '💎',
      description: 'Inventory & characters',
      active: false
    },
    {
      id: 'broke-unicorn-tavern',
      name: 'BrokeUnicorn Tavern',
      icon: '🏰',
      description: 'Social hub & gathering place',
      active: false
    },
    {
      id: 'shared-services',
      name: 'Shared Services',
      icon: '🔗',
      description: 'Authentication & APIs',
      active: false
    }
  ]

  const handleNavigation = (destination: string) => {
    switch (destination) {
      case 'distillara':
        window.open('http://localhost:3001', '_blank')
        break
      case 'core':
        window.open('http://localhost:3002', '_blank')
        break
      case 'feastwell':
        window.open('http://localhost:3003', '_blank')
        break
      case 'hoardwell':
        window.open('http://localhost:3004', '_blank')
        break
      case 'broke-unicorn-tavern':
        window.open('http://localhost:3005', '_blank')
        break
      case 'shared-services':
        // Open a services overview page or the auth service
        window.open('http://localhost:4001', '_blank')
        break
      default:
        // Handle other navigation
        onNavigate?.(destination)
    }
  }

  return (
    <aside className="w-64 bg-gradient-to-b from-amber-50 to-orange-50 border-r-2 border-amber-300/30 shadow-lg">
      <div className="p-6">
        {/* Sidebar Header */}
        <div className="mb-8 text-center">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg mb-3">
            <img 
              src="/RuneFrameOS_NoText.png" 
              alt="RuneFrameOS"
              className="w-10 h-10 object-contain"
            />
          </div>
          <h3 className="text-lg font-fantasy font-semibold text-amber-800">
            Navigation
          </h3>
          <p className="text-sm text-amber-600/70">
            Choose your path
          </p>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`w-full p-4 text-left rounded-lg transition-all duration-200 group ${
                item.active
                  ? 'bg-gradient-to-r from-amber-200 to-orange-200 border-2 border-amber-400 shadow-md'
                  : 'bg-white/60 hover:bg-white/80 border border-amber-200/50 hover:border-amber-300/70 hover:shadow-md'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1 text-left">
                  <h4 className={`font-medium ${
                    item.active ? 'text-amber-900' : 'text-amber-800'
                  }`}>
                    {item.name}
                  </h4>
                  <p className={`text-sm ${
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
        <div className="mt-8 pt-6 border-t border-amber-300/30">
          <h4 className="text-sm font-medium text-amber-700 mb-3">Quick Actions</h4>
          <div className="space-y-2">
            <button className="w-full p-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 hover:scale-105 shadow-md">
              <span className="flex items-center justify-center space-x-2">
                <span>🚀</span>
                <span className="font-medium">New Campaign</span>
              </span>
            </button>
            <button className="w-full p-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 hover:scale-105 shadow-md">
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
