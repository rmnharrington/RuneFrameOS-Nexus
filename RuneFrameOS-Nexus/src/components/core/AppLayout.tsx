"use client"

import React, { useState, useImperativeHandle, forwardRef } from 'react'
import HeaderBar from './HeaderBar'
import LeftSidebar from './LeftSidebar'
import SystemStats from './SystemStats'
import AppFooter from './AppFooter'
import DistillaraView from './DistillaraView'
import FeastwellView from './FeastwellView'
import HoardwellView from './HoardwellView'
import TavernView from './TavernView'
import ModuleSubscriptionModal from './ModuleSubscriptionModal'

interface AppLayoutProps {
  children: React.ReactNode
  appName?: string
  userName?: string
  appIcon?: string
  showSidebar?: boolean
  showStats?: boolean
  onSettings?: () => void
  onLogout?: () => void
  onNavigate?: (destination: string) => void
  onAddModule?: (module: any) => void
}

export interface AppLayoutRef {
  handleViewChange: (view: string) => void
}

const AppLayout = forwardRef<AppLayoutRef, AppLayoutProps>(({
  children,
  appName = "RuneFrameOS Nexus",
  userName = "Traveler",
  appIcon = "/RuneFrameOS_NoText.png",
  showSidebar = true,
  showStats = true,
  onSettings,
  onLogout,
  onNavigate,
  onAddModule
}, ref) => {
  const [showStatsPanel, setShowStatsPanel] = useState(false)
  const [currentView, setCurrentView] = useState<'nexus' | 'distillara' | 'feastwell' | 'hoardwell' | 'tavern'>('nexus')
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false)

  const handleViewChange = (view: string) => {
    console.log(`🔄 AppLayout: Changing view to ${view}`)
    
    // Type guard to ensure view is valid
    if (view === 'nexus' || view === 'distillara' || view === 'feastwell' || view === 'hoardwell' || view === 'tavern') {
      setCurrentView(view)
      
      // Don't call onNavigate here to prevent infinite recursion
      // The onNavigate is only for external navigation, not internal view changes
    } else {
      console.warn(`Invalid view: ${view}`)
    }
  }

  // Expose handleViewChange to parent components
  useImperativeHandle(ref, () => ({
    handleViewChange
  }))

  const handleAddModules = () => {
    console.log('🔍 handleAddModules called')
    console.log('🔍 Current isModuleModalOpen:', isModuleModalOpen)
    setIsModuleModalOpen(true)
    console.log('🔍 Set isModuleModalOpen to true')
  }

  const handleModuleSubscribe = (modules: any[]) => {
    if (onAddModule) {
      // Handle multiple modules
      modules.forEach(module => {
        onAddModule(module)
      })
    }
    setIsModuleModalOpen(false)
  }

  const renderCenterContent = () => {
    switch (currentView) {
      case 'distillara':
        return <DistillaraView onReturnToNexus={() => handleViewChange('nexus')} />
      case 'feastwell':
        return <FeastwellView onReturnToNexus={() => handleViewChange('nexus')} />
      case 'hoardwell':
        return <HoardwellView onReturnToNexus={() => handleViewChange('nexus')} />
      case 'tavern':
        return <TavernView onReturnToNexus={() => handleViewChange('nexus')} />
      case 'nexus':
      default:
        return (
          <div className="w-full">
            {children}
          </div>
        )
    }
  }

  const renderRightContent = () => {
    switch (currentView) {
      case 'distillara':
        return <DistillaraView.Sidebar onReturnToNexus={() => handleViewChange('nexus')} />
      case 'feastwell':
        return <FeastwellView.Sidebar onReturnToNexus={() => handleViewChange('nexus')} />
      case 'hoardwell':
        return <HoardwellView.Sidebar onReturnToNexus={() => handleViewChange('nexus')} />
      case 'tavern':
        return <TavernView.Sidebar onReturnToNexus={() => handleViewChange('nexus')} />
      case 'nexus':
      default:
        return <SystemStats />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex flex-col">
      {/* Header Bar */}
      <HeaderBar
        appName={appName}
        userName={userName}
        appIcon={appIcon}
        onSettings={onSettings}
        onLogout={onLogout}
        onToggleStats={() => setShowStatsPanel(!showStatsPanel)}
        showStatsToggle={showStats}
      />

      {/* Main Content Area - iPad Optimized */}
      <div className="flex flex-1 relative">
        {/* Left Sidebar - Collapsible for iPad */}
        {showSidebar && (
          <div className="relative">
            <LeftSidebar
              currentApp={currentView === 'nexus' ? 'Nexus' : currentView}
              onNavigate={handleViewChange}
              onAddModules={handleAddModules}
            />
          </div>
        )}

        {/* Center Content - Full width on iPad */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {renderCenterContent()}
        </main>

        {/* Desktop Stats Panel - Floating right sidebar */}
        {showStats && (
          <div className="hidden lg:block w-64 flex-shrink-0">
            {renderRightContent()}
          </div>
        )}
      </div>

      {/* Footer */}
      <AppFooter />

      {/* Floating Stats Panel - Mobile/Tablet Overlay */}
      {showStats && showStatsPanel && (
        <div className="fixed inset-0 bg-black/20 z-40 md:hidden">
          <div className="absolute right-0 top-0 h-full w-64 bg-gradient-to-b from-orange-50 to-red-50 border-l-2 border-orange-300/30 shadow-2xl transform transition-transform duration-300 ease-in-out">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-fantasy font-semibold text-orange-800">
                  System Monitor
                </h3>
                <button
                  onClick={() => setShowStatsPanel(false)}
                  className="p-2 hover:bg-orange-200/50 rounded-full transition-colors"
                >
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {currentView === 'nexus' ? <SystemStats /> : renderRightContent()}
            </div>
          </div>
        </div>
      )}

      {/* Module Subscription Modal */}
      <ModuleSubscriptionModal
        isOpen={isModuleModalOpen}
        onClose={() => setIsModuleModalOpen(false)}
        onSubscribe={handleModuleSubscribe}
      />
    </div>
  )
})

export default AppLayout
