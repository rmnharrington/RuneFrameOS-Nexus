'use client'

import { useState } from 'react'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'
import Header from './Header'
import AppFooter from './AppFooter'

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-economy-950 flex flex-col">
      {/* Header */}
      <Header onMenuClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)} />
      
      <div className="flex flex-1">
        {/* Left Sidebar - Always visible following design standards */}
        <div className="w-48 lg:w-56 flex-shrink-0">
          <LeftSidebar />
        </div>
        
        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <div className="p-4 lg:p-6">
            {children}
          </div>
        </main>
        
        {/* Right Sidebar - Hidden on mobile/tablet following design standards */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <RightSidebar />
        </div>
      </div>
      
      {/* Mobile Right Sidebar Overlay */}
      {isRightSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsRightSidebarOpen(false)}
          />
          <div className="fixed right-0 top-0 h-full w-64 bg-economy-900 border-l border-economy-700">
            <RightSidebar />
          </div>
        </div>
      )}
      
      {/* Footer - Now properly positioned at bottom */}
      <AppFooter />
    </div>
  )
}
