"use client"

import React from 'react'

interface HeaderBarProps {
  appName: string
  userName?: string
  appIcon?: string
  onSettings?: () => void
  onLogout?: () => void
  onToggleStats?: () => void
  showStatsToggle?: boolean
}

export default function HeaderBar({ 
  appName, 
  userName = "Traveler", 
  appIcon = "/RuneFrameOS_NoText.png",
  onSettings,
  onLogout,
  onToggleStats,
  showStatsToggle = false
}: HeaderBarProps) {
  return (
    <header className="bg-gradient-to-r from-amber-900 via-orange-800 to-red-900 text-white shadow-lg border-b-2 border-amber-400/30">
      <div className="flex items-center justify-between px-4 md:px-6 py-4">
        {/* Left: App Name and Icon */}
        <div className="flex items-center space-x-3 md:space-x-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
            <img 
              src={appIcon} 
              alt={`${appName} Icon`}
              className="w-6 h-6 md:w-8 md:h-8 object-contain"
            />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl md:text-2xl font-fantasy font-bold text-gradient bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
              {appName}
            </h1>
            <p className="text-amber-200/80 text-xs md:text-sm">
              RuneFrameOS™ Gaming Ecosystem
            </p>
          </div>
        </div>

        {/* Center: Welcome Message */}
        <div className="text-center flex-1 mx-4">
          <p className="text-base md:text-lg font-medium text-amber-100">
            Welcome, <span className="text-orange-200 font-semibold">{userName}</span>
          </p>
          <p className="text-amber-200/70 text-xs md:text-sm">
            Ready to forge your legend?
          </p>
        </div>

        {/* Right: Stats Toggle, Settings and Logout */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Stats Toggle - Only show on mobile/tablet */}
          {showStatsToggle && onToggleStats && (
            <button
              onClick={onToggleStats}
              className="p-2 md:p-3 bg-orange-800/50 hover:bg-orange-700/70 rounded-full transition-all duration-200 hover:scale-110 border border-orange-400/30 hover:border-orange-300/50 lg:hidden"
              title="Toggle System Stats"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 text-orange-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </button>
          )}

          <button
            onClick={onSettings}
            className="p-2 md:p-3 bg-amber-800/50 hover:bg-amber-700/70 rounded-full transition-all duration-200 hover:scale-110 border border-amber-400/30 hover:border-amber-300/50"
            title="Settings"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-amber-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          
          <button
            onClick={onLogout}
            className="px-3 py-2 md:px-4 md:py-2 bg-red-800/50 hover:bg-red-700/70 rounded-lg transition-all duration-200 hover:scale-105 border border-red-400/30 hover:border-red-300/50 text-red-100 hover:text-red-200"
            title="Logout"
          >
            <span className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline">Logout</span>
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
