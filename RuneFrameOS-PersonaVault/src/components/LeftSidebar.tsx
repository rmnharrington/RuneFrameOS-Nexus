'use client'

interface LeftSidebarProps {
  activeView: string
  onViewChange: (view: string) => void
}

const navItems = [
  {
    id: 'characters',
    label: 'Characters',
    description: 'Manage your characters',
    icon: '👤',
    color: 'from-gold-500 to-gold-600'
  },
  {
    id: 'templates',
    label: 'Templates',
    description: 'Download gaming system templates',
    icon: '📋',
    color: 'from-grey-500 to-grey-600'
  },
  {
    id: 'dice',
    label: 'Dice Roller',
    description: 'Roll dice for your games',
    icon: '🎲',
    color: 'from-gold-500 to-gold-600'
  },
  {
    id: 'scriptoria',
    label: 'Scriptoria',
    description: 'Connect to gaming systems',
    icon: '📚',
    color: 'from-grey-500 to-grey-600'
  }
]

export default function LeftSidebar({ activeView, onViewChange }: LeftSidebarProps) {
  return (
    <aside className="w-48 lg:w-56 bg-gradient-to-b from-gold-900 via-gold-800 to-gold-900 border-r border-gold-700/50 p-4 shadow-lg">
      {/* App Title - MANDATORY */}
      <div className="mb-6 text-center">
        <h2 className="text-lg font-bold text-gold-100 mb-1">
          PersonaVault
        </h2>
        <p className="text-xs text-gold-300">
          Character Management
        </p>
      </div>

      {/* Navigation Items - MANDATORY */}
      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(activeView === item.id ? 'characters' : item.id)}
            className={`w-full text-left p-3 rounded-lg transition-all duration-200 group ${
              activeView === item.id
                ? 'bg-gradient-to-r ' + item.color + ' shadow-lg transform scale-105'
                : 'bg-gold-800/50 hover:bg-gold-700/70 hover:transform hover:scale-105'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <div className={`font-medium ${
                  activeView === item.id ? 'text-white' : 'text-gold-200'
                }`}>
                  {item.label}
                </div>
                <div className={`text-xs ${
                  activeView === item.id ? 'text-gold-100' : 'text-gold-400'
                }`}>
                  {item.description}
                </div>
              </div>
            </div>
          </button>
        ))}
      </nav>

      {/* Quick Actions */}
      <div className="mt-8 pt-6 border-t border-gold-700/30">
        <h3 className="text-sm font-semibold text-gold-200 mb-3">Quick Actions</h3>
        <div className="space-y-2">
          <button className="w-full p-2 bg-gold-700/50 hover:bg-gold-600/70 text-gold-100 rounded-md transition-all duration-200 hover:scale-105 text-sm">
            + New Character
          </button>
          <button className="w-full p-2 bg-grey-700/50 hover:bg-grey-600/70 text-grey-100 rounded-md transition-all duration-200 hover:scale-105 text-sm">
            Import Character
          </button>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="mt-6 pt-4 border-t border-gold-700/30">
        <div className="flex items-center space-x-2 text-xs text-gold-300">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span>Connected to Scriptoria</span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-gold-300 mt-1">
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <span>3 Characters Active</span>
        </div>
      </div>
    </aside>
  )
}
