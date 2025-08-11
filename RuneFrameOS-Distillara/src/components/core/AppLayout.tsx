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
  appIcon = "/distillara_logo_IconOnly.png",
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
      <div className="flex flex-1 pt-20">
        {/* Left Sidebar - Fixed left */}
        {showSidebar && (
          <LeftSidebar
            currentApp={appName}
            onNavigate={onNavigate}
          />
        )}

        {/* Center Content - Flexible width with proper spacing */}
        <main className={`flex-1 p-6 pb-24 overflow-auto transition-all duration-300 ${
          showSidebar ? 'ml-0 lg:ml-[280px]' : 'ml-0'
        } ${
          showStats ? 'mr-0 lg:mr-[320px]' : 'mr-0'
        } ${showMobileMenu ? 'pt-32' : 'pt-0'}`}>
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>

        {/* Right Sidebar - Fixed right */}
        {showStats && (
          <RightSidebar
            appType={appType}
          />
        )}
      </div>

      {/* Footer - Fixed at bottom */}
      <AppFooter />
    </div>
  )
}
