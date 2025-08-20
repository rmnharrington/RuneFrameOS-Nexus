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
    <div className="min-h-screen bg-stone-950 flex flex-col">
      {/* Header */}
      <Header onMenuClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)} />
      
      <div className="flex flex-1">
        {/* Left Sidebar - Always visible following design standards */}
        <div className="w-48 lg:w-56 flex-shrink-0">
          <LeftSidebar />
        </div>
        
        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
        
        {/* Right Sidebar - Always visible following design standards */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <RightSidebar />
        </div>
      </div>
      
      {/* Footer */}
      <AppFooter />
    </div>
  )
}


