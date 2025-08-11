"use client"

import React from 'react'
import HeaderBar from './HeaderBar'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'
import AppFooter from './AppFooter'

interface AppLayoutProps {
  children: React.ReactNode
  appName?: string
  userName?: string
  appType?: string
  showSidebar?: boolean
  showStats?: boolean
}

export default function AppLayout({
  children,
  appName = "BrokeUnicorn Tavern",
  userName = "Adventurer",
  appType = "tavern",
  showSidebar = true,
  showStats = true
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-gradient-to-br from-amber-100/30 via-yellow-100/20 to-amber-200/30 pointer-events-none"></div>
      
      {/* Header */}
      <HeaderBar 
        appName={appName}
        userName={userName}
      />
      
      {/* Main Content Area - Below header with proper spacing */}
      <div className="flex flex-1 pt-20 relative">
        {/* Left Sidebar - Always visible, fixed width */}
        {showSidebar && (
          <div className="w-48 lg:w-56 flex-shrink-0">
            <LeftSidebar currentApp={appName} />
          </div>
        )}
        
        {/* Center Content - Takes remaining width with proper spacing */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>

        {/* Desktop Stats Panel - Floating right sidebar */}
        {showStats && (
          <div className="hidden lg:block w-64 flex-shrink-0">
            <RightSidebar appType={appType} />
          </div>
        )}
      </div>
      
      {/* Footer */}
      <AppFooter />
    </div>
  )
}

