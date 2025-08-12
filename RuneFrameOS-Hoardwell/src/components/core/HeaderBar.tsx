'use client'

import { Settings, LogOut, User } from 'lucide-react'

interface HeaderBarProps {
  appName?: string
  userName?: string
  appIcon?: string
  onToggleMobileMenu?: () => void
}

export default function HeaderBar({
  appName = "Hoardwell",
  userName = "Collector",
  appIcon = "/Hoardwell_Logos_IconOnly.png",
  onToggleMobileMenu
}: HeaderBarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-gradient-to-r from-yellow-600 via-amber-600 to-yellow-700 border-b-2 border-yellow-500/30 shadow-lg z-50">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <img 
            src={appIcon} 
            alt={`${appName} Logo`} 
            className="w-12 h-12 rounded-lg shadow-md"
          />
          <div>
            <h1 className="text-2xl font-bold text-white font-fantasy">{appName}</h1>
            <p className="text-yellow-100 text-sm">Character Inventory Manager</p>
            <p className="text-yellow-200 text-xs">RuneFrameOS™ Gaming Ecosystem</p>
          </div>
        </div>

        {/* Center Section */}
        <div className="text-center">
          <p className="text-white text-lg font-semibold">Welcome, {userName}</p>
          <p className="text-yellow-100 text-sm">Ready to forge your legend?</p>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-white hover:text-yellow-200 transition-colors">
            <Settings size={24} />
          </button>
          <button className="p-2 text-white hover:text-yellow-200 transition-colors">
            <User size={24} />
          </button>
          <button className="p-2 text-white hover:text-yellow-200 transition-colors">
            <LogOut size={24} />
          </button>
        </div>
      </div>
    </header>
  )
}
