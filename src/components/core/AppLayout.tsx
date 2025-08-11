import { ReactNode, useState } from 'react'
import HeaderBar from './HeaderBar'
import NavigationDrawer from './NavigationDrawer'
import AppFooter from './AppFooter'

interface AppLayoutProps {
  appName: string
  appType: string
  userName?: string
  children: ReactNode
  onSettings?: () => void
  onLogout?: () => void
  onNavigate?: (destination: string) => void
}

export default function AppLayout({ 
  appName, 
  appType, 
  userName = "Alchemist", 
  children, 
  onSettings, 
  onLogout, 
  onNavigate 
}: AppLayoutProps) {
  const [isNavOpen, setIsNavOpen] = useState(false)

  const toggleNav = () => setIsNavOpen(!isNavOpen)
  const closeNav = () => setIsNavOpen(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header - Always visible */}
      <HeaderBar 
        appName={appName} 
        userName={userName} 
        onSettings={onSettings} 
        onLogout={onLogout}
        onMenuToggle={toggleNav}
      />
      
      {/* Navigation Drawer - Slides in from left */}
      <NavigationDrawer 
        isOpen={isNavOpen}
        onClose={closeNav}
        onNavigate={(dest) => {
          onNavigate?.(dest)
          closeNav()
        }}
        activeApp={appType}
      />
      
      {/* Main Content - Full width, touch-optimized */}
      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
      
      {/* Footer */}
      <AppFooter />
      
      {/* Overlay for navigation drawer */}
      {isNavOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={closeNav}
        />
      )}
    </div>
  )
}

