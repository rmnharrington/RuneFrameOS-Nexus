"use client"

import React from 'react'

interface HeaderBarProps {
  appName: string
  userName?: string
  appIcon?: string
  onSettings?: () => void
  onLogout?: () => void
}

export default function HeaderBar({ 
  appName, 
  userName = "Traveler", 
  appIcon = "/RuneFrameOS_NoText.png",
  onSettings,
  onLogout 
}: HeaderBarProps) {
  return (
    <header className="bg-gradient-to-r from-amber-900 via-orange-800 to-red-900 text-white shadow-lg border-b-2 border-amber-400/30">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left: App Name and Icon */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
            <img 
              src={appIcon} 
              alt={`${appName} Icon`}
              className="w-8 h-8 object-contain"
            />
          </div>
          <div>
            <h1 className="text-2xl font-fantasy font-bold text-gradient bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
              {appName}
            </h1>
            <p className="text-amber-200/80 text-sm">
              RuneFrameOS™ Gaming Ecosystem
            </p>
          </div>
        </div>

        {/* Center: Welcome Message */}
        <div className="text-center">
          <p className="text-lg font-medium text-amber-100">
            Welcome, <span className="text-orange-200 font-semibold">{userName}</span>
          </p>
          <p className="text-amber-200/70 text-sm">
            Ready to forge your legend?
          </p>
        </div>

        {/* Right: Settings and Logout */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onSettings}
            className="p-3 bg-amber-800/50 hover:bg-amber-700/70 rounded-full transition-all duration-200 hover:scale-110 border border-amber-400/30 hover:border-amber-300/50"
            title="Settings"
          >
            <svg className="w-6 h-6 text-amber-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-800/50 hover:bg-red-700/70 rounded-lg transition-all duration-200 hover:scale-105 border border-red-400/30 hover:border-red-300/50 text-red-100 hover:text-red-200"
            title="Logout"
          >
            <span className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
