"use client"

import React, { ReactNode } from 'react'
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex flex-col">
      {/* Header Bar */}
      <HeaderBar 
        appName={appName}
        userName={userName}
        appIcon={appIcon}
        onSettings={onSettings}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Left Sidebar */}
        {showSidebar && (
          <LeftSidebar 
            currentApp={appName}
            onNavigate={onNavigate}
          />
        )}

        {/* Center Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>

        {/* Right System Stats */}
        {showStats && (
          <SystemStats />
        )}
      </div>

      {/* Footer */}
      <AppFooter />
    </div>
  )
}
