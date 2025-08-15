'use client'

import { useState, useEffect } from 'react'

export default function Header() {
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      })
      setCurrentTime(timeString)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brown-900 border-b-2 border-tan-600 shadow-lg">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left Section - App Branding */}
        <div className="flex items-center space-x-3">
          {/* Mobile Menu Button (hidden on desktop) */}
          <button className="lg:hidden p-2 text-tan-100 hover:text-tan-200 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* App Logo and Title */}
          <div className="flex items-center space-x-2">
            <img 
              src="/BGG_logo_light.png" 
              alt="Broke Unicorn Tavern" 
              className="w-8 h-8 object-contain"
            />
            <h1 className="text-xl font-bold text-tan-100">
              Broke Unicorn Tavern
            </h1>
          </div>
        </div>

        {/* Center Section - App Description */}
        <div className="hidden md:flex items-center">
          <span className="text-sm text-brown-400">
            Social Hub & Game Coordination for RuneFrameOS
          </span>
        </div>

        {/* Right Section - Controls and Status */}
        <div className="flex items-center space-x-3">
          {/* Status Information */}
          <div className="hidden sm:flex items-center space-x-2 text-xs text-brown-400">
            <span>Status: Online</span>
            <span>•</span>
            <span>{currentTime}</span>
          </div>

          {/* Settings Gear (MANDATORY) */}
          <button className="p-2 text-tan-100 hover:text-tan-200 hover:bg-brown-800 rounded-md transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          {/* Logout Button (MANDATORY) */}
          <button className="px-4 py-2 bg-brown-700 hover:bg-brown-600 text-tan-100 hover:text-white rounded-md transition-all duration-200 text-sm font-medium border border-brown-600 hover:border-brown-500 shadow-sm hover:shadow-md">
            Logout
          </button>
          
          {/* Stats Toggle (hidden on mobile) */}
          <button className="hidden lg:block p-2 text-tan-100 hover:text-tan-200 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
