"use client"

import React from 'react'

export default function AppHeader() {
  return (
    <header className="mb-8 pb-6 border-b-2 border-amber-300/50 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-200/20 to-orange-200/20 rounded-lg"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
                         <div className="flex items-center space-x-3 cursor-pointer hover:scale-105 transition-transform duration-200" onClick={() => window.location.href = '/dashboard'}>
               <img 
                 src="/RuneFrameOS_NoText.png" 
                 alt="RuneFrameOS" 
                 className="w-8 h-8 object-contain"
               />
               <h1 className="text-4xl font-fantasy font-bold text-gradient text-shadow">RuneFrameOS Nexus</h1>
             </div>
            <span className="text-sm text-amber-700 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300/50 font-medium">
              v0.1.0 - Beta
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 bg-green-100/80 px-3 py-2 rounded-full border border-green-300/50">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-700 font-medium">Connected</span>
              </div>
            <div className="text-sm text-secondary-700 bg-white/60 px-3 py-2 rounded-full border border-amber-300/30">
              Welcome, Old Timer! 🎲
            </div>
          </div>
        </div>
        <p className="text-secondary-700 mt-3 text-lg font-medium">
          Built by gamers who've been doing this since the 70s. We know what works.
        </p>
      </div>
    </header>
  )
}
