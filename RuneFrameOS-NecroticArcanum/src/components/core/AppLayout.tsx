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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col">
      {/* Header */}
      <Header onMenuClick={handleMenuClick} />
      
      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Left Sidebar - Hidden on mobile unless menu is open */}
        <div className={`${
          isMobileMenuOpen ? 'block' : 'hidden'
        } lg:block w-48 lg:w-56 flex-shrink-0`}>
          <LeftSidebar />
        </div>
        
        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
        
        {/* Right Sidebar - Hidden on mobile */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <RightSidebar />
        </div>
      </div>
      
      {/* Footer */}
      <AppFooter />
    </div>
  )
}
