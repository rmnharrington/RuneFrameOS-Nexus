import { Settings, LogOut, Menu } from 'lucide-react'

interface HeaderBarProps {
  appName?: string
  userName?: string
  appIcon?: string
  onToggleMobileMenu?: () => void
}

export default function HeaderBar({
  appName = "Feastwell",
  userName = "Chef",
  appIcon = "/feastwell_logo2.png",
  onToggleMobileMenu
}: HeaderBarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-gradient-to-r from-amber-800 via-orange-800 to-red-800 border-b-2 border-amber-500/30 shadow-lg z-50">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section - App Branding */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <img 
              src={appIcon} 
              alt={`${appName} Logo`} 
              className="w-12 h-12 rounded-lg shadow-md"
            />
            <div>
              <h1 className="text-2xl font-bold text-white font-fantasy">{appName}</h1>
              <p className="text-amber-200 text-sm">Culinary Mastery Platform</p>
            </div>
          </div>
        </div>

        {/* Center Section - Welcome message */}
        <div className="hidden md:block flex-1 text-center">
          <h2 className="text-xl font-semibold text-white font-fantasy">
            Welcome, Master {userName}
          </h2>
          <p className="text-amber-200 text-sm">Ready to create culinary wonders?</p>
        </div>

        {/* Right Section - User Actions */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Toggle */}
          <button 
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 bg-orange-700/50 hover:bg-orange-600/50 rounded-lg transition-colors duration-200 text-white"
            title="Toggle Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button className="p-2 bg-orange-700/50 hover:bg-orange-600/50 rounded-lg transition-colors duration-200 text-white">
            <Settings className="w-5 h-5" />
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-red-700/50 hover:bg-red-600/50 rounded-lg transition-colors duration-200 text-white">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}
