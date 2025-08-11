"use client"

import React from 'react'

interface HeaderBarProps {
  appName?: string
  userName?: string
  appIcon?: string
  appType?: string
}

export default function HeaderBar({
  appName = "BrokeUnicorn Tavern",
  userName = "Adventurer",
  appIcon = "/tavern-logo.png",
  appType = "Tavern"
}: HeaderBarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-wood-800 via-tavern-800 to-wood-900 border-b-2 border-tavern-400/30 shadow-lg">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left Side - App Branding */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-tavern-400 to-tavern-600 rounded-lg flex items-center justify-center text-white text-xl font-fantasy font-bold shadow-lg">
              🏰
            </div>
            <div>
              <h1 className="text-xl font-fantasy font-bold text-white">
                {appName}
              </h1>
              <p className="text-xs text-tavern-200 font-medium">
                {appType} • RuneFrameOS
              </p>
            </div>
          </div>
        </div>

        {/* Center - Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex space-x-4">
            <a href="#" className="text-tavern-200 hover:text-white transition-colors font-medium">
              Main Hall
            </a>
            <a href="#" className="text-tavern-200 hover:text-white transition-colors font-medium">
              Chat Rooms
            </a>
            <a href="#" className="text-tavern-200 hover:text-white transition-colors font-medium">
              Mission Board
            </a>
            <a href="#" className="text-tavern-200 hover:text-white transition-colors font-medium">
              Character Profiles
            </a>
          </nav>
        </div>

        {/* Right Side - User Info & Actions */}
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-white">
              Welcome, {userName}
            </p>
            <p className="text-xs text-tavern-200">
              Status: Online
            </p>
          </div>
          <button className="px-4 py-2 bg-tavern-600 hover:bg-tavern-700 text-white rounded-lg transition-colors font-medium">
            Leave Tavern
          </button>
        </div>
      </div>
    </header>
  )
}

