'use client'

import { 
  BarChart3, 
  Users, 
  Package, 
  BookOpen, 
  Wrench, 
  MessageCircle,
  Plus,
  Dice6
} from 'lucide-react'

export default function LeftSidebar() {
  const navigationItems = [
    { icon: BarChart3, label: 'Dashboard', description: 'Overview & stats' },
    { icon: Users, label: 'Characters', description: 'Manage characters' },
    { icon: Package, label: 'Inventories', description: 'View all inventories' },
    { icon: BookOpen, label: 'Item Library', description: 'Browse items' },
    { icon: Wrench, label: 'Tools', description: 'Utilities & helpers' },
    { icon: MessageCircle, label: 'Social', description: 'Community & sharing' },
  ]

  const quickActions = [
    { icon: Plus, label: 'New Character', action: () => console.log('New Character') },
    { icon: Dice6, label: 'Quick Roll', action: () => console.log('Quick Roll') },
  ]

  return (
    <aside className="fixed left-0 top-20 w-48 lg:w-56 h-[calc(100vh-5rem)] gradient-left-sidebar border-r-2 border-amber-300/30 overflow-y-auto">
      <div className="p-3 lg:p-4">
        {/* Header */}
        <div className="mb-4 lg:mb-6 text-center">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-2 lg:mb-4 shadow-lg">
            <img
              src="/runeframeos_logo2.png"
              alt="RuneFrameOS"
              className="w-6 h-6 lg:w-8 lg:h-8 object-contain"
            />
          </div>
          <h2 className="text-sm lg:text-base font-fantasy font-bold text-amber-800">Navigation</h2>
        </div>

        {/* Navigation Items */}
        <nav className="mb-8">
          {navigationItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-amber-200/50 transition-colors mb-2"
            >
              <item.icon size={20} className="text-amber-700" />
              <div className="text-left">
                <div className="font-medium text-amber-900">{item.label}</div>
                <div className="text-xs text-amber-600">{item.description}</div>
              </div>
            </button>
          ))}
        </nav>

        {/* Quick Actions */}
        <div>
          <h3 className="text-sm font-semibold text-amber-800 mb-3">Quick Actions</h3>
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="w-full flex items-center space-x-3 p-3 rounded-lg bg-amber-200/50 hover:bg-amber-200 transition-colors mb-2"
            >
              <action.icon size={20} className="text-amber-700" />
              <span className="font-medium text-amber-900">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
