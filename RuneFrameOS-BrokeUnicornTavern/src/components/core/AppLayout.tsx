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
  appIcon?: string
  appType?: string
}

export default function AppLayout({
  children,
  appName = "BrokeUnicorn Tavern",
  userName = "Adventurer",
  appIcon = "/tavern-logo.png",
  appType = "Tavern"
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-wood-50 via-tavern-50 to-wood-100">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-tavern-pattern opacity-5 pointer-events-none"></div>
      
      {/* Header */}
      <HeaderBar 
        appName={appName}
        userName={userName}
        appIcon={appIcon}
        appType={appType}
      />
      
      <div className="flex h-screen pt-16">
        {/* Left Sidebar */}
        <LeftSidebar currentApp={appName} />
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
        
        {/* Right Sidebar */}
        <RightSidebar appType={appType} />
      </div>
      
      {/* Footer */}
      <AppFooter />
    </div>
  )
}

