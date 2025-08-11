"use client"

import React from 'react'
import { Settings, LogOut, Menu } from 'lucide-react'

interface HeaderBarProps {
  appName?: string
  userName?: string
  appIcon?: string
  onSettings?: () => void
  onLogout?: () => void
  onToggleMobileMenu?: () => void
}

export default function HeaderBar({
  appName = "Distillara",
  userName = "Alchemist",
  appIcon = "/Distillara_Logos_IconOnly.png",
  onSettings,
  onLogout,
  onToggleMobileMenu
}: HeaderBarProps) {
  return (
    <header className="h-20 bg-gradient-to-r from-amber-900 via-orange-800 to-red-900 text-white border-b-2 border-amber-400/30 shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Left Section - App branding and mobile menu */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button - visible on small screens */}
            <button
              onClick={onToggleMobileMenu}
              className="lg:hidden p-2 bg-orange-700/50 hover:bg-orange-600/50 rounded-lg transition-colors duration-200 text-white"
              title="Toggle Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="w-8 h-8 bg-gradient-to-r from-amber-900 via-orange-800 to-red-900 rounded-full flex items-center justify-center shadow-lg">
              <img
                src={appIcon}
                alt={appName}
                className="w-6 h-6 object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-fantasy font-bold text-white">
                {appName}
              </h1>
              <p className="text-sm text-amber-200/80">
                RuneFrameOS™ Gaming Ecosystem
              </p>
            </div>
          </div>

          {/* Center Section - Welcome message */}
          <div className="text-center hidden md:block">
            <p className="text-lg font-semibold text-white">Welcome, {userName}</p>
            <p className="text-sm text-orange-200">Ready to forge your legend?</p>
          </div>

          {/* Right Section - User actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onSettings}
              className="p-2 bg-orange-700/50 hover:bg-orange-600/50 rounded-lg transition-colors duration-200 text-white"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
            
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-lg transition-all duration-200 hover:scale-105 shadow-md flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
