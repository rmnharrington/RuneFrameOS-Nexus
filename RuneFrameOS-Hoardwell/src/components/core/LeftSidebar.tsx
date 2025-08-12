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

interface LeftSidebarProps {
  currentApp?: string
}

export default function LeftSidebar({ currentApp = "Hoardwell" }: LeftSidebarProps) {
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
    <aside className="w-full h-full bg-gradient-to-b from-yellow-600 via-amber-600 to-yellow-700 border-r-2 border-yellow-500/30 overflow-y-auto">
      <div className="p-3 lg:p-4">
        {/* Header */}
        <div className="mb-4 lg:mb-6 text-center">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-yellow-300 to-amber-300 rounded-full flex items-center justify-center mx-auto mb-2 lg:mb-4 shadow-lg">
                         <img
               src="/Hoardwell_Logos_IconOnly.png"
               alt="Hoardwell"
               className="w-6 h-6 lg:w-8 lg:h-8 object-contain"
             />
          </div>
          <h2 className="text-sm lg:text-base font-fantasy font-bold text-yellow-800">Navigation</h2>
        </div>

        {/* Navigation Items */}
        <nav className="mb-8">
          {navigationItems.map((item, index) => (
                          <button
                key={index}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-yellow-200/50 transition-colors mb-2"
              >
                <item.icon size={20} className="text-yellow-700" />
                <div className="text-left">
                  <div className="font-medium text-yellow-900">{item.label}</div>
                  <div className="text-xs text-yellow-600">{item.description}</div>
                </div>
              </button>
          ))}
        </nav>

        {/* Quick Actions */}
        <div>
          <h3 className="text-sm font-semibold text-yellow-800 mb-3">Quick Actions</h3>
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="w-full flex items-center space-x-3 p-3 rounded-lg bg-yellow-200/50 hover:bg-yellow-200 transition-colors mb-2"
            >
              <action.icon size={20} className="text-yellow-700" />
              <span className="font-medium text-yellow-900">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
