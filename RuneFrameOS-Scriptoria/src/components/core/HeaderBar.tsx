'use client'

interface HeaderBarProps {
  appName?: string
  userName?: string
  appIcon?: string
  onToggleMobileMenu?: () => void
}

export default function HeaderBar({ 
  appName = 'Scriptoria',
  userName = 'Game Master',
  appIcon = '/Scriptoria_Logos_IconOnly.png',
  onToggleMobileMenu
}: HeaderBarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-800 via-gray-800 to-slate-900 border-b-2 border-slate-500/30 shadow-lg">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left side - App info */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-slate-900 via-gray-900 to-slate-950 rounded-full flex items-center justify-center shadow-lg">
            <img 
              src={appIcon} 
              alt={`${appName} Logo`} 
              className="w-8 h-8 object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white fantasy-font">{appName}</h1>
            <p className="text-slate-200 text-sm">Gaming Systems Library</p>
          </div>
        </div>

        {/* Center - Welcome message */}
        <div className="hidden md:block text-center">
          <p className="text-slate-200 text-sm">Welcome back,</p>
          <p className="text-white font-semibold">{userName}</p>
        </div>

        {/* Right side - Mobile menu button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 text-slate-200 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
