"use client"

import React, { ReactNode, useState } from 'react'
import HeaderBar from './HeaderBar'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'
import AppFooter from './AppFooter'

interface AppLayoutProps {
  children: ReactNode
  appName?: string
  userName?: string
  appIcon?: string
  showSidebar?: boolean
  showStats?: boolean
  appType?: string
  onSettings?: () => void
  onLogout?: () => void
  onNavigate?: (destination: string) => void
}

export default function AppLayout({
  children,
  appName = "Distillara",
  userName = "Alchemist",
  appIcon = "/Distillara_Logos_IconOnly.png",
  showSidebar = true,
  showStats = true,
  appType = "Distillara",
  onSettings,
  onLogout,
  onNavigate
}: AppLayoutProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const handleToggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex flex-col">
      {/* Header Bar - Fixed at top */}
      <HeaderBar
        appName={appName}
        userName={userName}
        appIcon={appIcon}
        onSettings={onSettings}
        onLogout={onLogout}
        onToggleMobileMenu={handleToggleMobileMenu}
      />

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="lg:hidden fixed top-20 left-0 right-0 bg-gradient-to-b from-amber-900 to-orange-800 text-white z-40 border-b-2 border-amber-400/30 shadow-lg">
          <div className="p-4">
            <nav className="space-y-2">
              <button
                onClick={() => onNavigate?.('dashboard')}
                className="w-full text-left p-3 bg-orange-700/50 hover:bg-orange-600/50 rounded-lg transition-colors duration-200"
              >
                Dashboard
              </button>
              <button
                onClick={() => onNavigate?.('characters')}
                className="w-full text-left p-3 bg-orange-700/50 hover:bg-orange-600/50 rounded-lg transition-colors duration-200"
              >
                Characters
              </button>
              <button
                onClick={() => onNavigate?.('campaigns')}
                className="w-full text-left p-3 bg-orange-700/50 hover:bg-orange-600/50 rounded-lg transition-colors duration-200"
              >
                Campaigns
              </button>
              <button
                onClick={() => onNavigate?.('library')}
                className="w-full text-left p-3 bg-orange-700/50 hover:bg-orange-600/50 rounded-lg transition-colors duration-200"
              >
                Library
              </button>
              <button
                onClick={() => onNavigate?.('tools')}
                className="w-full text-left p-3 bg-orange-700/50 hover:bg-orange-600/50 rounded-lg transition-colors duration-200"
              >
                Tools
              </button>
              <button
                onClick={() => onNavigate?.('social')}
                className="w-full text-left p-3 bg-orange-700/50 hover:bg-orange-600/50 rounded-lg transition-colors duration-200"
              >
                Social
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content Area - Below header */}
      <div className="flex flex-1 pt-20 relative">
        {/* Left Sidebar - Always visible, fixed width */}
        {showSidebar && (
          <div className="w-48 lg:w-56 flex-shrink-0">
            <LeftSidebar
              currentApp={appName}
              onNavigate={onNavigate}
            />
          </div>
        )}

        {/* Center Content - Takes remaining width with proper spacing */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>

        {/* Desktop Stats Panel - Floating right sidebar */}
        {showStats && (
          <div className="hidden lg:block w-64 flex-shrink-0">
            <RightSidebar
              appType={appType}
            />
          </div>
        )}
      </div>

      {/* Footer - Fixed at bottom */}
      <AppFooter />
    </div>
  )
}
