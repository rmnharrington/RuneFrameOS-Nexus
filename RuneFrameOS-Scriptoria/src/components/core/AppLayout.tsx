'use client'

import { useState } from 'react'
import HeaderBar from './HeaderBar'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'
import AppFooter from './AppFooter'

interface AppLayoutProps {
  children: React.ReactNode
  appName?: string
  appType?: string
  userName?: string
  appIcon?: string
}

export default function AppLayout({ 
  children, 
  appName = 'Scriptoria',
  appType = 'gaming-library',
  userName = 'Game Master',
  appIcon = '/Scriptoria_Logos_IconOnly.png'
}: AppLayoutProps) {
  const [showSidebar, setShowSidebar] = useState(true)
  const [showStats, setShowStats] = useState(true)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const toggleSidebar = () => setShowSidebar(!showSidebar)
  const toggleStats = () => setShowStats(!showStats)
  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200 flex flex-col">
      <HeaderBar 
        appName={appName}
        userName={userName}
        appIcon={appIcon}
        onToggleMobileMenu={toggleMobileMenu}
      />
      
      <div className="flex flex-1 pt-20 relative">
        {/* Left Sidebar */}
        <div className="w-48 lg:w-56 flex-shrink-0">
          <LeftSidebar 
            currentApp={appName}
            showSidebar={showSidebar}
            onToggleSidebar={toggleSidebar}
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>

        {/* Right Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <RightSidebar 
            appType={appType}
            showStats={showStats}
            onToggleStats={toggleStats}
          />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={toggleMobileMenu}></div>
          <div className="fixed left-0 top-20 h-full w-64 bg-gradient-to-b from-slate-900 via-gray-900 to-slate-950 border-r-2 border-slate-500/30 p-6">
            <LeftSidebar 
              currentApp={appName}
              showSidebar={true}
              onToggleSidebar={toggleMobileMenu}
            />
          </div>
        </div>
      )}

      <AppFooter />
    </div>
  )
}
