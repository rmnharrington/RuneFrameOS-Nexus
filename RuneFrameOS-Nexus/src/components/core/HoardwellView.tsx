"use client"

import React from 'react'

interface HoardwellViewProps {
  onReturnToNexus: () => void
}

export default function HoardwellView({ onReturnToNexus }: HoardwellViewProps) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="text-4xl">💎</div>
        <div>
          <h1 className="text-2xl font-bold text-amber-800">Hoardwell</h1>
          <p className="text-amber-600">Intelligent, immersive inventory management</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/60 rounded-lg border border-amber-200 p-4">
          <h3 className="text-lg font-semibold text-amber-800 mb-3">Smart Categorization</h3>
          <p className="text-amber-700 text-sm">Automatically organize your treasures with intelligent sorting and tagging systems.</p>
        </div>
        
        <div className="bg-white/60 rounded-lg border border-amber-200 p-4">
          <h3 className="text-lg font-semibold text-amber-800 mb-3">Weight Tracking</h3>
          <p className="text-amber-700 text-sm">Monitor encumbrance and manage your carrying capacity with precision.</p>
        </div>
        
        <div className="bg-white/60 rounded-lg border border-amber-200 p-4">
          <h3 className="text-lg font-semibold text-amber-800 mb-3">Value Estimation</h3>
          <p className="text-amber-700 text-sm">Get real-time estimates of your collection's worth and market value.</p>
        </div>
        
        <div className="bg-white/60 rounded-lg border border-amber-200 p-4">
          <h3 className="text-lg font-semibold text-amber-800 mb-3">Loot Management</h3>
          <p className="text-amber-700 text-sm">Organize and track your adventures' spoils with detailed categorization.</p>
        </div>
      </div>
    </div>
  )
}

// Sidebar component for the right panel
HoardwellView.Sidebar = function HoardwellSidebar({ onReturnToNexus }: { onReturnToNexus: () => void }) {
  return (
    <div className="h-full bg-gradient-to-b from-yellow-50 to-amber-50 border-l-2 border-yellow-300/30 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-yellow-800 mb-4">Hoardwell Tools</h3>
        
        {/* Quick Actions */}
        <div className="space-y-3 mb-6">
          <button className="w-full p-3 bg-white/60 hover:bg-white/80 border border-yellow-200/50 hover:border-yellow-300/70 rounded-lg transition-all duration-200 text-left">
            <div className="flex items-center space-x-3">
              <span className="text-xl">💎</span>
              <div>
                <h4 className="font-medium text-yellow-800">Quick Sort</h4>
                <p className="text-xs text-yellow-600">Auto-organize inventory</p>
              </div>
            </div>
          </button>
          
          <button className="w-full p-3 bg-white/60 hover:bg-white/80 border border-yellow-200/50 hover:border-yellow-300/70 rounded-lg transition-all duration-200 text-left">
            <div className="flex items-center space-x-3">
              <span className="text-xl">📊</span>
              <div>
                <h4 className="font-medium text-yellow-800">Value Calculator</h4>
                <p className="text-xs text-yellow-600">Estimate worth</p>
              </div>
            </div>
          </button>
          
          <button className="w-full p-3 bg-white/60 hover:bg-white/80 border border-yellow-200/50 hover:border-yellow-300/70 rounded-lg transition-all duration-200 text-left">
            <div className="flex items-center space-x-3">
              <span className="text-xl">🔍</span>
              <div>
                <h4 className="font-medium text-yellow-800">Search Items</h4>
                <p className="text-xs text-yellow-600">Find specific items</p>
              </div>
            </div>
          </button>
        </div>


      </div>
    </div>
  )
}
