'use client'

import { Settings, LogOut, User } from 'lucide-react'

export default function HeaderBar() {
  return (
    <header className="fixed top-0 left-0 right-0 h-20 gradient-header border-b-2 border-amber-400/30 z-50">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <div className="text-3xl">🏺</div>
          <div>
            <h1 className="text-2xl font-bold text-white fantasy-font">Hoardwell</h1>
            <p className="text-amber-200 text-sm">Character Inventory Manager</p>
            <p className="text-orange-200 text-xs">RuneFrameOS™ Gaming Ecosystem</p>
          </div>
        </div>

        {/* Center Section */}
        <div className="text-center">
          <p className="text-white text-lg font-semibold">Welcome, Username</p>
          <p className="text-amber-200 text-sm">Ready to forge your legend?</p>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-white hover:text-amber-200 transition-colors">
            <Settings size={24} />
          </button>
          <button className="p-2 text-white hover:text-amber-200 transition-colors">
            <User size={24} />
          </button>
          <button className="p-2 text-white hover:text-amber-200 transition-colors">
            <LogOut size={24} />
          </button>
        </div>
      </div>
    </header>
  )
}
