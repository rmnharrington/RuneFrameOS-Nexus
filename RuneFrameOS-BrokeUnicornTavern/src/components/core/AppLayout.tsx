"use client"

import React from 'react'
import HeaderBar from './HeaderBar'
import LeftSidebar from './LeftSidebar'
import AppFooter from './AppFooter'

interface AppLayoutProps {
  children: React.ReactNode
  appName?: string
  userName?: string
  showSidebar?: boolean
  showStats?: boolean
}

export default function AppLayout({
  children,
  appName = "BrokeUnicorn Tavern",
  userName = "Adventurer",
  showSidebar = true,
  showStats = false
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50/30 via-indigo-50/20 to-purple-50/30 pointer-events-none"></div>
      
      {/* Header */}
      <HeaderBar 
        appName={appName}
        userName={userName}
      />
      
      <div className="flex h-screen pt-16">
        {/* Left Sidebar */}
        {showSidebar && (
          <LeftSidebar currentApp={appName} />
        )}
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      
      {/* Footer */}
      <AppFooter />
    </div>
  )
}

