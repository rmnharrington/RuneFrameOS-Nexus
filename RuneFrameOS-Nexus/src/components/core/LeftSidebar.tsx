"use client"

import React from 'react'

interface LeftSidebarProps {
  currentApp?: string
  onNavigate?: (destination: 'nexus' | 'distillara' | 'feastwell' | 'hoardwell' | 'tavern') => void
  onAddModules?: () => void
}

export default function LeftSidebar({ currentApp = "Nexus", onNavigate, onAddModules }: LeftSidebarProps) {
  const navigationItems = [
    {
      id: 'nexus',
      name: 'Dashboard',
      icon: '🏠',
      description: 'Main control center',
      active: currentApp === 'Nexus' || currentApp === 'nexus'
    }
  ]

  const handleNavigation = (destination: string) => {
    if (onNavigate) {
      onNavigate(destination as any)
    }
  }

  return (
    <aside className="w-48 lg:w-56 bg-gradient-to-b from-slate-100 to-gray-200 border-r-2 border-slate-300/50 shadow-lg">
      <div className="p-3 lg:p-4">
        {/* Sidebar Header */}
        <div className="mb-4 lg:mb-6 text-center">
          <div className="w-10 h-10 lg:w-12 lg:h-12 mx-auto bg-gradient-to-br from-slate-600 via-blue-600 to-slate-700 rounded-full flex items-center justify-center shadow-lg mb-2">
            <img 
              src="/RuneFrameOS_NoText.png" 
              alt="RuneFrameOS"
              className="w-6 h-6 lg:w-8 lg:h-8 object-contain"
            />
          </div>
          <h3 className="text-sm lg:text-base font-fantasy font-semibold text-slate-800">
            Navigation
          </h3>
          <p className="text-xs text-slate-600/70">
            Choose your path
          </p>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`w-full p-2 lg:p-3 text-left rounded-lg transition-all duration-200 group touch-manipulation ${
                item.active
                  ? 'bg-gradient-to-r from-slate-300 to-blue-300 border-2 border-slate-400 shadow-md'
                  : 'bg-white/60 hover:bg-white/80 border border-slate-300/50 hover:border-slate-400/70 hover:shadow-md'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg lg:text-xl">{item.icon}</span>
                <div className="flex-1 text-left">
                  <h4 className={`font-medium text-xs lg:text-sm ${
                    item.active ? 'text-slate-900' : 'text-slate-800'
                  }`}>
                    {item.name}
                  </h4>
                  <p className={`text-xs ${
                    item.active ? 'text-slate-700' : 'text-slate-600/70'
                  }`}>
                    {item.description}
                  </p>
                </div>
              </div>
            </button>
          ))}

          {/* Add Modules Button */}
          <button
            onClick={onAddModules}
            className="w-full p-2 lg:p-3 text-left rounded-lg transition-all duration-200 group touch-manipulation bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white hover:scale-105 shadow-md"
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg lg:text-xl">➕</span>
              <div className="flex-1 text-left">
                <h4 className="font-medium text-xs lg:text-sm text-white">
                  Add Modules
                </h4>
                <p className="text-xs text-blue-100">
                  Browse and subscribe to modules
                </p>
              </div>
            </div>
          </button>
        </nav>
      </div>
    </aside>
  )
}
