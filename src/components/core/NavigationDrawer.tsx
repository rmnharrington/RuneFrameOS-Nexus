import { X, FlaskConical, BookOpen, Zap, TrendingUp, Users, Settings, Home, Star, Flame } from 'lucide-react'

interface NavigationDrawerProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: (destination: string) => void
  activeApp: string
}

export default function NavigationDrawer({ isOpen, onClose, onNavigate, activeApp }: NavigationDrawerProps) {
  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home, color: 'text-amber-600' },
    { id: 'ingredients', label: 'Ingredients', icon: BookOpen, color: 'text-orange-600' },
    { id: 'recipes', label: 'Recipes', icon: FlaskConical, color: 'text-red-600' },
    { id: 'crafting', label: 'Crafting', icon: Zap, color: 'text-purple-600' },
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp, color: 'text-green-600' },
    { id: 'community', label: 'Community', icon: Users, color: 'text-blue-600' },
    { id: 'favorites', label: 'Favorites', icon: Star, color: 'text-yellow-600' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'text-gray-600' },
  ]

  const quickActions = [
    { id: 'new-potion', label: 'New Potion', icon: FlaskConical, color: 'bg-gradient-to-r from-amber-500 to-orange-500' },
    { id: 'daily-recipe', label: 'Daily Recipe', icon: Star, color: 'bg-gradient-to-r from-orange-500 to-red-500' },
    { id: 'ingredient-hunt', label: 'Ingredient Hunt', icon: Flame, color: 'bg-gradient-to-r from-red-500 to-purple-500' },
  ]

  return (
    <>
      {/* Navigation Drawer */}
      <div className={`
        fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:shadow-none
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-amber-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
              <FlaskConical className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Distillara</h2>
              <p className="text-sm text-gray-500">Navigation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-b border-amber-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h3>
          <div className="space-y-2">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => onNavigate(action.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white font-medium transition-all duration-200 hover:scale-105 ${action.color}`}
              >
                <action.icon className="h-5 w-5" />
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Main Menu</h3>
          <nav className="space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`
                  w-full flex items-center space-x-3 p-4 rounded-xl text-left transition-all duration-200
                  ${activeApp === item.id 
                    ? 'bg-amber-100 border-2 border-amber-300 shadow-md' 
                    : 'hover:bg-gray-50 hover:shadow-sm'
                  }
                `}
              >
                <item.icon className={`h-6 w-6 ${item.color}`} />
                <span className={`font-medium ${activeApp === item.id ? 'text-amber-800' : 'text-gray-700'}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-amber-100">
          <div className="text-center">
            <p className="text-xs text-gray-500">RuneFrameOS™ Gaming Ecosystem</p>
            <p className="text-xs text-amber-600 font-medium">Version 1.0.0</p>
          </div>
        </div>
      </div>
    </>
  )
}
