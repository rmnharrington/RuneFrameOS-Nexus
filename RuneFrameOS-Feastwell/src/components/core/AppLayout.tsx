'use client'

import { useState } from 'react'
import HeaderBar from './HeaderBar'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'
import AppFooter from './AppFooter'

interface AppLayoutProps {
  appName?: string
  userName?: string
  appIcon?: string
  appType?: string
}

export default function AppLayout({
  appName = "Feastwell",
  userName = "Chef",
  appIcon = "/feastwell_logo2.png",
  appType = "Feastwell"
}: AppLayoutProps) {
  const [showSidebar, setShowSidebar] = useState(true)
  const [showStats, setShowStats] = useState(true)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const handleToggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-orange-950 to-red-950 flex flex-col">
      {/* Header */}
      <HeaderBar 
        appName={appName}
        userName={userName}
        appIcon={appIcon}
        onToggleMobileMenu={handleToggleMobileMenu}
      />



      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="lg:hidden fixed top-20 left-0 right-0 bg-gradient-to-b from-amber-900 via-orange-900 to-red-900 border-b-2 border-amber-500/30 shadow-lg z-40">
          <div className="p-4 space-y-2">
            <button className="w-full text-left px-4 py-3 text-amber-100 hover:bg-amber-700/30 hover:text-white rounded-lg transition-colors duration-200">
              Kitchen Dashboard
            </button>
            <button className="w-full text-left px-4 py-3 text-amber-100 hover:bg-amber-700/30 hover:text-white rounded-lg transition-colors duration-200">
              Recipe Library
            </button>
            <button className="w-full text-left px-4 py-3 text-amber-100 hover:bg-amber-700/30 hover:text-white rounded-lg transition-colors duration-200">
              Active Orders
            </button>
            <button className="w-full text-left px-4 py-3 text-amber-100 hover:bg-amber-700/30 hover:text-white rounded-lg transition-colors duration-200">
              Cooking Guides
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area - Below header with proper spacing */}
      <div className="flex flex-1 relative">
        {/* Left Sidebar - Always visible, fixed width */}
        {showSidebar && (
          <div className="w-48 lg:w-56 flex-shrink-0">
            <LeftSidebar currentApp={appName} />
          </div>
        )}

        {/* Center Content - Takes remaining width with proper spacing */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {/* Welcome Section */}
          <div className="mb-4 lg:mb-6">
            <h1 className="text-3xl lg:text-4xl font-bold text-white font-fantasy mb-2 lg:mb-4">
              Welcome to {appName}
            </h1>
            <p className="text-lg lg:text-xl text-amber-200 mb-4 lg:mb-6">
              Master the culinary arts and create legendary feasts
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mb-4 lg:mb-6">
            <div className="bg-gradient-to-br from-amber-800/30 to-orange-800/30 rounded-lg p-4 lg:p-6 border border-amber-500/30">
              <h3 className="text-base lg:text-lg font-semibold text-white mb-2">Active Recipes</h3>
              <p className="text-2xl lg:text-3xl font-bold text-amber-400">12</p>
              <p className="text-amber-200 text-xs lg:text-sm">Currently cooking</p>
            </div>
            <div className="bg-gradient-to-br from-orange-800/30 to-red-800/30 rounded-lg p-4 lg:p-6 border border-orange-500/30">
              <h3 className="text-base lg:text-lg font-semibold text-white mb-2">Recipe Library</h3>
              <p className="text-2xl lg:text-3xl font-bold text-orange-400">247</p>
              <p className="text-orange-200 text-xs lg:text-sm">Available recipes</p>
            </div>
            <div className="bg-gradient-to-br from-red-800/30 to-red-900/30 rounded-lg p-4 lg:p-6 border border-red-500/30">
              <h3 className="text-base lg:text-lg font-semibold text-white mb-2">Kitchen Status</h3>
              <p className="text-2xl lg:text-3xl font-bold text-red-400">Ready</p>
              <p className="text-red-200 text-xs lg:text-sm">All systems operational</p>
            </div>
            <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 rounded-lg p-4 lg:p-6 border border-amber-600/30">
              <h3 className="text-base lg:text-lg font-semibold text-white mb-2">Chef Level</h3>
              <p className="text-2xl lg:text-3xl font-bold text-amber-300">Master</p>
              <p className="text-amber-200 text-xs lg:text-sm">Expert culinary skills</p>
            </div>
          </div>

          {/* Featured Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-amber-800/20 to-orange-800/20 rounded-lg p-4 lg:p-6 border border-amber-500/30">
              <h3 className="text-lg lg:text-xl font-semibold text-white mb-3 lg:mb-4 font-fantasy">Today's Special</h3>
              <div className="space-y-2 lg:space-y-3">
                <div className="flex items-center justify-between p-2 lg:p-3 bg-amber-700/30 rounded">
                  <span className="text-white text-sm lg:text-base">Spiced Venison Stew</span>
                  <span className="text-amber-300 text-xs lg:text-sm">45 min</span>
                </div>
                <div className="flex items-center justify-between p-2 lg:p-3 bg-orange-700/30 rounded">
                  <span className="text-white text-sm lg:text-base">Golden Honey Bread</span>
                  <span className="text-orange-300 text-xs lg:text-sm">30 min</span>
                </div>
                <div className="flex items-center justify-between p-2 lg:p-3 bg-red-700/30 rounded">
                  <span className="text-white text-sm lg:text-base">Herb Roasted Potatoes</span>
                  <span className="text-red-300 text-xs lg:text-sm">25 min</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-800/20 to-red-800/20 rounded-lg p-4 lg:p-6 border border-orange-500/30">
              <h3 className="text-lg lg:text-xl font-semibold text-white mb-3 lg:mb-4 font-fantasy">Kitchen Tips</h3>
              <div className="space-y-2 lg:space-y-3 text-amber-200">
                <p className="text-xs lg:text-sm">• Always preheat your oven for consistent results</p>
                <p className="text-xs lg:text-sm">• Use fresh herbs for maximum flavor impact</p>
                <p className="text-xs lg:text-sm">• Let meat rest before slicing for juiciness</p>
                <p className="text-xs lg:text-sm">• Season in layers for depth of flavor</p>
              </div>
            </div>
          </div>
        </main>

        {/* Desktop Stats Panel - Floating right sidebar */}
        {showStats && (
          <div className="hidden lg:block w-64 flex-shrink-0">
            <RightSidebar appType={appType} />
          </div>
        )}
      </div>

      {/* Footer */}
      <AppFooter />
    </div>
  )
}
