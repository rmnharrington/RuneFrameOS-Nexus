"use client"

import React, { ReactNode, useState } from 'react'
import HeaderBar from './HeaderBar'
import LeftSidebar from './LeftSidebar'
import SystemStats from './SystemStats'
import AppFooter from './AppFooter'

interface AppLayoutProps {
  children: ReactNode
  appName?: string
  userName?: string
  appIcon?: string
  showSidebar?: boolean
  showStats?: boolean
  onSettings?: () => void
  onLogout?: () => void
  onNavigate?: (destination: string) => void
}

export default function AppLayout({ 
  children, 
  appName = "RuneFrameOS Nexus",
  userName = "Traveler",
  appIcon = "/RuneFrameOS_NoText.png",
  showSidebar = true,
  showStats = true,
  onSettings,
  onLogout,
  onNavigate
}: AppLayoutProps) {
  const [showStatsPanel, setShowStatsPanel] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex flex-col">
      {/* Header Bar */}
      <HeaderBar 
        appName={appName}
        userName={userName}
        appIcon={appIcon}
        onSettings={onSettings}
        onLogout={onLogout}
        onToggleStats={() => setShowStatsPanel(!showStatsPanel)}
        showStatsToggle={showStats}
      />

      {/* Main Content Area - iPad Optimized */}
      <div className="flex flex-1 relative">
        {/* Left Sidebar - Collapsible for iPad */}
        {showSidebar && (
          <div className="relative">
            <LeftSidebar 
              currentApp={appName}
              onNavigate={onNavigate}
            />
          </div>
        )}

        {/* Center Content - Full width on iPad */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      <AppFooter />

      {/* Floating Stats Panel - iPad Friendly */}
      {showStats && showStatsPanel && (
        <div className="fixed inset-0 bg-black/20 z-40 md:hidden">
          <div className="absolute right-0 top-0 h-full w-80 bg-gradient-to-b from-orange-50 to-red-50 border-l-2 border-orange-300/30 shadow-2xl transform transition-transform duration-300 ease-in-out">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-fantasy font-semibold text-orange-800">
                  System Monitor
                </h3>
                <button 
                  onClick={() => setShowStatsPanel(false)}
                  className="p-2 hover:bg-orange-200/50 rounded-full transition-colors"
                >
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <SystemStats />
            </div>
          </div>
        </div>
      )}

      {/* Desktop Stats Panel - Hidden on mobile/tablet */}
      {showStats && (
        <div className="hidden lg:block">
          <SystemStats />
        </div>
      )}
    </div>
  )
}
