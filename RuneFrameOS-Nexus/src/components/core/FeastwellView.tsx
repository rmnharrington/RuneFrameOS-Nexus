"use client"

import React from 'react'

interface FeastwellViewProps {
  onReturnToNexus: () => void
}

export default function FeastwellView({ onReturnToNexus }: FeastwellViewProps) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="text-4xl">🍽️</div>
        <div>
          <h1 className="text-2xl font-bold text-amber-800">Feastwell</h1>
          <p className="text-amber-600">Cooking and recipe management system</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/60 rounded-lg border border-amber-200 p-4">
          <h3 className="text-lg font-semibold text-amber-800 mb-3">Recipe Database</h3>
          <p className="text-amber-700 text-sm">Browse and manage your cooking recipes with immersive flavor text and game mechanics.</p>
        </div>
        
        <div className="bg-white/60 rounded-lg border border-amber-200 p-4">
          <h3 className="text-lg font-semibold text-amber-800 mb-3">Flavor System</h3>
          <p className="text-amber-700 text-sm">Experience rich, descriptive flavor profiles that enhance your culinary adventures.</p>
        </div>
        
        <div className="bg-white/60 rounded-lg border border-amber-200 p-4">
          <h3 className="text-lg font-semibold text-amber-800 mb-3">Nutrition Tracking</h3>
          <p className="text-amber-700 text-sm">Monitor the nutritional value and effects of your prepared meals.</p>
        </div>
        
        <div className="bg-white/60 rounded-lg border border-amber-200 p-4">
          <h3 className="text-lg font-semibold text-amber-800 mb-3">Meal Planning</h3>
          <p className="text-amber-700 text-sm">Plan your culinary journey with strategic meal preparation and timing.</p>
        </div>
      </div>
    </div>
  )
}

// Sidebar component for the right panel
FeastwellView.Sidebar = function FeastwellSidebar({ onReturnToNexus }: { onReturnToNexus: () => void }) {
  return (
    <div className="h-full bg-gradient-to-b from-orange-50 to-red-50 border-l-2 border-orange-300/30 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-orange-800 mb-4">Feastwell Tools</h3>
        
        {/* Quick Actions */}
        <div className="space-y-3 mb-6">
          <button className="w-full p-3 bg-white/60 hover:bg-white/80 border border-orange-200/50 hover:border-orange-300/70 rounded-lg transition-all duration-200 text-left">
            <div className="flex items-center space-x-3">
              <span className="text-xl">🍳</span>
              <div>
                <h4 className="font-medium text-orange-800">Quick Cook</h4>
                <p className="text-xs text-orange-600">Instant meal preparation</p>
              </div>
            </div>
          </button>
          
          <button className="w-full p-3 bg-white/60 hover:bg-white/80 border border-orange-200/50 hover:border-orange-300/70 rounded-lg transition-all duration-200 text-left">
            <div className="flex items-center space-x-3">
              <span className="text-xl">📖</span>
              <div>
                <h4 className="font-medium text-orange-800">Recipe Book</h4>
                <p className="text-xs text-orange-600">Browse all recipes</p>
              </div>
            </div>
          </button>
          
          <button className="w-full p-3 bg-white/60 hover:bg-white/80 border border-orange-200/50 hover:border-orange-300/70 rounded-lg transition-all duration-200 text-left">
            <div className="flex items-center space-x-3">
              <span className="text-xl">📊</span>
              <div>
                <h4 className="font-medium text-orange-800">Nutrition Stats</h4>
                <p className="text-xs text-orange-600">Health tracking</p>
              </div>
            </div>
          </button>
        </div>


      </div>
    </div>
  )
}
