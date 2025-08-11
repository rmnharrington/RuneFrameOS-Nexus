import { 
  LayoutDashboard, 
  ChefHat, 
  BookOpen, 
  Wrench, 
  MessageCircle, 
  Plus, 
  Zap,
  Utensils,
  Clock,
  Star
} from 'lucide-react'

interface LeftSidebarProps {
  currentApp?: string
}

export default function LeftSidebar({ currentApp = "Feastwell" }: LeftSidebarProps) {
  const navigationItems = [
    { icon: LayoutDashboard, label: 'Kitchen Dashboard', href: '/dashboard' },
    { icon: ChefHat, label: 'Recipe Library', href: '/recipes' },
    { icon: Utensils, label: 'Active Orders', href: '/orders' },
    { icon: BookOpen, label: 'Cooking Guides', href: '/guides' },
    { icon: Clock, label: 'Meal Planning', href: '/planning' },
    { icon: Star, label: 'Favorites', href: '/favorites' },
  ]

  const quickActions = [
    { icon: Plus, label: 'New Recipe', action: 'create-recipe' },
    { icon: Zap, label: 'Quick Cook', action: 'quick-cook' },
    { icon: Wrench, label: 'Kitchen Tools', action: 'tools' },
    { icon: MessageCircle, label: 'Chef Chat', action: 'chat' },
  ]

  return (
    <aside className="fixed left-0 top-20 h-screen w-48 lg:w-56 bg-gradient-to-b from-amber-900 via-orange-900 to-red-900 border-r-2 border-amber-500/30 shadow-lg hidden lg:block">
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
          <h2 className="text-sm lg:text-base font-fantasy font-bold text-amber-200">Navigation</h2>
        </div>

        {/* Current App Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white font-fantasy mb-2">{currentApp}</h2>
          <p className="text-amber-200 text-sm">Master the culinary arts</p>
        </div>

        {/* Navigation Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 font-fantasy">Kitchen Navigation</h3>
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left text-amber-100 hover:bg-amber-700/30 hover:text-white rounded-lg transition-colors duration-200 group"
              >
                <item.icon className="w-5 h-5 text-amber-400 group-hover:text-amber-200" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Quick Actions Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 font-fantasy">Quick Actions</h3>
          <div className="space-y-2">
            {quickActions.map((action) => (
              <button
                key={action.label}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left text-orange-100 hover:bg-orange-700/30 hover:text-white rounded-lg transition-colors duration-200 group"
              >
                <action.icon className="w-5 h-5 text-orange-400 group-hover:text-orange-200" />
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
