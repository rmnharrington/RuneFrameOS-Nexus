'use client'

import { useState } from 'react'
import Header from './Header'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'
import AppFooter from './AppFooter'

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [showSidebar, setShowSidebar] = useState(true)
  const [showStats, setShowStats] = useState(true)

  return (
    <div className="min-h-screen bg-brown-950 text-tan-100 flex flex-col">
      {/* Header - Always visible */}
      <Header />
      
      {/* Main Layout Container - Uses exact structure from GUI spec */}
      <div className="flex flex-1 pt-20 min-h-0">
        {/* Left Sidebar - Always visible, full height, fixed width per GUI spec */}
        {showSidebar && (
          <div className="flex-shrink-0">
            <LeftSidebar />
          </div>
        )}
        
        {/* Center Content - Takes remaining width */}
        <main className="flex-1 p-4 md:p-6 overflow-auto min-w-0">
          {children}
        </main>
        
        {/* Desktop Stats Panel - Full height right sidebar per GUI spec */}
        {showStats && (
          <div className="hidden lg:block w-64 flex-shrink-0">
            <RightSidebar />
          </div>
        )}
      </div>
      
      {/* Footer - Always visible */}
      <AppFooter />
    </div>
  )
}
