'use client'

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-brown-900 via-tan-800 to-brown-900 border-b border-tan-700/50 shadow-lg">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6 lg:py-4">
        {/* Left side - Logo and Title */}
        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-10 lg:w-12 lg:h-12">
            <img
              src="/TravelersTable_Logos_IconOnly.png"
              alt="TravelersTable"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl lg:text-2xl font-bold text-tan-100 text-shadow-brown">
              TravelersTable
            </h1>
            <p className="text-sm text-tan-300 text-shadow-tan">
              GameMaster Campaign Management
            </p>
          </div>
        </div>

        {/* Right side - Settings, Logout, and Mobile Menu */}
        <div className="flex items-center space-x-3">
          {/* Settings Gear */}
          <button className="p-2 text-tan-200 hover:text-tan-100 hover:bg-brown-800 rounded-md transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          {/* Logout Button - MUST be styled as proper button */}
          <button className="px-4 py-2 bg-brown-700 hover:bg-brown-600 text-tan-100 hover:text-white rounded-md transition-all duration-200 text-sm font-medium border border-brown-600 hover:border-brown-500 shadow-sm hover:shadow-md">
            Logout
          </button>
          
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-tan-200 hover:text-tan-100 hover:bg-brown-800 rounded-md transition-colors"
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
