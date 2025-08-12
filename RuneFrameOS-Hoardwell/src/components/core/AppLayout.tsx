'use client'

import { useState } from 'react'
import HeaderBar from './HeaderBar'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'
import AppFooter from './AppFooter'

interface AppLayoutProps {
  children?: React.ReactNode
  appName?: string
  userName?: string
  appIcon?: string
  appType?: string
}

export default function AppLayout({
  children,
  appName = "Hoardwell",
  userName = "Collector",
  appIcon = "/Hoardwell_Logos_IconOnly.png",
  appType = "Hoardwell"
}: AppLayoutProps) {
  const [showSidebar, setShowSidebar] = useState(true)
  const [showStats, setShowStats] = useState(true)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const handleToggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-100 to-yellow-200 flex flex-col">
      {/* Header */}
      <HeaderBar 
        appName={appName}
        userName={userName}
        appIcon={appIcon}
        onToggleMobileMenu={handleToggleMobileMenu}
      />

              {/* Mobile Menu Overlay */}
        {showMobileMenu && (
          <div className="lg:hidden fixed top-20 left-0 right-0 bg-gradient-to-b from-yellow-600 via-amber-600 to-yellow-700 border-b-2 border-yellow-500/30 shadow-lg z-40">
            <div className="p-4 space-y-2">
              <button className="w-full text-left px-4 py-3 text-yellow-100 hover:bg-yellow-700/30 hover:text-white rounded-lg transition-colors duration-200">
                Inventory Dashboard
              </button>
              <button className="w-full text-left px-4 py-3 text-yellow-100 hover:bg-yellow-700/30 hover:text-white rounded-lg transition-colors duration-200">
                Character Management
              </button>
              <button className="w-full text-left px-4 py-3 text-yellow-100 hover:bg-yellow-700/30 hover:text-white rounded-lg transition-colors duration-200">
                Item Library
              </button>
              <button className="w-full text-left px-4 py-3 text-yellow-100 hover:bg-yellow-700/30 hover:text-white rounded-lg transition-colors duration-200">
                Tools & Utilities
              </button>
            </div>
          </div>
        )}

      {/* Main Content Area - Below header with proper spacing */}
      <div className="flex flex-1 pt-20 relative">
        {/* Left Sidebar - Always visible, fixed width */}
        {showSidebar && (
          <div className="w-48 lg:w-56 flex-shrink-0 pt-0 pb-24">
            <LeftSidebar currentApp={appName} />
          </div>
        )}

        {/* Center Content - Takes remaining width with proper spacing */}
        <main className="flex-1 p-4 md:p-6 pb-24 overflow-auto">
          {/* Welcome Section */}
          <div className="mb-4 lg:mb-6">
            <div className="flex items-center justify-center space-x-4 mb-2 lg:mb-4">
                             <img
                 src="/Hoardwell_Logos_IconOnly.png"
                 alt="Hoardwell"
                 className="w-16 h-16 lg:w-20 lg:h-20 object-contain"
               />
              <h1 className="text-3xl lg:text-4xl font-bold text-yellow-800 font-fantasy">
                Welcome to {appName}
              </h1>
            </div>
            <p className="text-lg lg:text-xl text-yellow-700 mb-4 lg:mb-6 text-center">
              Master your inventory and manage your treasures
            </p>
          </div>

          {/* Content will be injected here by the page component */}
          {children}
        </main>

        {/* Desktop Stats Panel - Floating right sidebar */}
        {showStats && (
          <div className="hidden lg:block w-64 flex-shrink-0 overflow-y-auto pt-0 pb-24">
            <RightSidebar appType={appType} />
          </div>
        )}
      </div>

      {/* Footer */}
      <AppFooter />
    </div>
  )
}
