"use client"

import React from 'react'

interface HeaderBarProps {
  appName?: string
  userName?: string
}

export default function HeaderBar({
  appName = "BrokeUnicorn Tavern",
  userName = "Adventurer"
}: HeaderBarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-amber-900 via-yellow-800 to-amber-700 border-b-2 border-yellow-400/30 shadow-lg">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left Side - App Branding */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <img
              src="/BrokeUnicornTavern_Logos_IconOnly.png"
              alt="BrokeUnicorn Tavern"
              className="w-10 h-10 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-yellow-100">
                {appName}
              </h1>
              <p className="text-xs text-yellow-200 font-medium">
                Tavern • RuneFrameOS
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - User Info & Actions */}
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-yellow-100">
              Welcome, {userName}
            </p>
            <p className="text-xs text-yellow-200">
              Status: Online
            </p>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-amber-900 font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
            Leave Tavern
          </button>
        </div>
      </div>
    </header>
  )
}

