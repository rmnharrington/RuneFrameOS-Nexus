import { Settings, LogOut, FlaskConical, Menu } from 'lucide-react'

interface HeaderBarProps {
  appName: string
  userName?: string
  onSettings?: () => void
  onLogout?: () => void
  onMenuToggle?: () => void
}

export default function HeaderBar({ appName, userName = "Alchemist", onSettings, onLogout, onMenuToggle }: HeaderBarProps) {
  return (
    <header className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 h-20 w-full fixed top-0 z-50 shadow-lg">
      <div className="flex items-center justify-between h-full px-4 sm:px-6">
        {/* Left Section - Menu Toggle + App Branding */}
        <div className="flex items-center space-x-4">
          {/* Menu Toggle Button - Always visible on mobile/tablet */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-3 hover:bg-white/20 rounded-xl transition-all duration-200 active:scale-95"
            aria-label="Toggle navigation menu"
          >
            <Menu className="h-6 w-6 text-white" />
          </button>
          
          {/* App Branding */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
              <FlaskConical className="h-7 w-7 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold text-white">{appName}</h1>
              <p className="text-amber-100 text-sm">RuneFrameOS™ Gaming Ecosystem</p>
            </div>
          </div>
        </div>

        {/* Center Section - Welcome Message */}
        <div className="hidden md:block text-center">
          <p className="text-white text-lg font-semibold">Welcome, {userName}</p>
          <p className="text-amber-100 text-sm">Ready to forge your legend?</p>
        </div>

        {/* Right Section - Action Buttons */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={onSettings}
            className="p-3 text-white hover:bg-white/20 rounded-xl transition-all duration-200 active:scale-95"
            aria-label="Settings"
          >
            <Settings className="h-6 w-6" />
          </button>
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 px-4 py-3 text-white hover:bg-white/20 rounded-xl transition-all duration-200 active:scale-95"
          >
            <LogOut className="h-5 w-5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}
