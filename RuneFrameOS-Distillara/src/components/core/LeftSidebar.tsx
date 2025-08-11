"use client"

import React from 'react'
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Wrench, 
  MessageCircle, 
  Plus,
  Zap
} from 'lucide-react'

interface LeftSidebarProps {
  currentApp?: string
  onNavigate?: (destination: string) => void
}

export default function LeftSidebar({
  currentApp = "Distillara",
  onNavigate
}: LeftSidebarProps) {
  const navigationItems = [
    { name: 'Dashboard', icon: LayoutDashboard, description: 'Overview and stats' },
    { name: 'Characters', icon: Users, description: 'Character management' },
    { name: 'Campaigns', icon: BookOpen, description: 'Adventure campaigns' },
    { name: 'Library', icon: BookOpen, description: 'Rules and resources' },
    { name: 'Tools', icon: Wrench, description: 'Utility tools' },
    { name: 'Social', icon: MessageCircle, description: 'Community features' }
  ]

  const quickActions = [
    { name: 'New Campaign', icon: Plus, action: () => onNavigate?.('new-campaign') },
    { name: 'Quick Roll', icon: Zap, action: () => onNavigate?.('quick-roll') }
  ]

  return (
    <aside className="hidden lg:block w-[280px] h-screen bg-gradient-to-b from-amber-50 to-orange-50 border-r-2 border-amber-300/30 fixed left-0 top-20 z-40 overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <img
              src="/runeframeos_logo2.png"
              alt="RuneFrameOS"
              className="w-12 h-12 object-contain"
            />
          </div>
          <h2 className="text-lg font-fantasy font-bold text-amber-800">Navigation</h2>
        </div>

        {/* Navigation Items */}
        <nav className="mb-8">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = currentApp === item.name
              return (
                <li key={item.name}>
                  <button
                    onClick={() => onNavigate?.(item.name.toLowerCase())}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 hover:scale-105 ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-200 to-orange-200 shadow-md border border-amber-300/50'
                        : 'hover:bg-amber-100/50 hover:border border-amber-200/30'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-amber-800' : 'text-amber-600'}`} />
                    <div className="text-left">
                      <span className={`font-medium ${isActive ? 'text-amber-800' : 'text-amber-700'}`}>
                        {item.name}
                      </span>
                      <p className={`text-xs ${isActive ? 'text-amber-700' : 'text-amber-600/70'}`}>
                        {item.description}
                      </p>
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Quick Actions */}
        <div>
          <h3 className="text-sm font-semibold text-amber-700 mb-3">Quick Actions</h3>
          <div className="space-y-2">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <button
                  key={action.name}
                  onClick={action.action}
                  className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-orange-100 to-amber-100 hover:from-orange-200 hover:to-amber-200 rounded-lg transition-all duration-200 hover:scale-105 border border-orange-200/30 hover:border-orange-300/50 shadow-sm"
                >
                  <Icon className="w-5 h-5 text-orange-600" />
                  <span className="font-medium text-orange-700">{action.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </aside>
  )
}
