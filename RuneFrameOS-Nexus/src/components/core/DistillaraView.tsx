"use client"

import React, { useState, useEffect } from 'react'

interface DistillaraViewProps {
  onReturnToNexus: () => void
}

interface DistillaraData {
  status: string
  version: string
  lastSeen: string
  craftingStatus?: string
  economyData?: any
}

export default function DistillaraView({ onReturnToNexus }: DistillaraViewProps) {
  const [distillaraData, setDistillaraData] = useState<DistillaraData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDistillaraData()
  }, [])

  const fetchDistillaraData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('http://localhost:3001/api/module-info')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setDistillaraData(data)
    } catch (err) {
      console.error('Failed to fetch Distillara data:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-amber-700">Loading Distillara...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-red-800 mb-2">Connection Error</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchDistillaraData}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      {/* Distillara Header */}
      <div className="mb-6 p-4 bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg border border-amber-300">
                  <div className="flex items-center space-x-3">
            <div className="w-12 h-12 flex items-center justify-center">
              <img 
                src="/distillara_logo_IconOnly.png" 
                alt="Distillara Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-amber-800">Distillara</h1>
              <p className="text-amber-600">Advanced Alchemy & Crafting System</p>
            </div>
          </div>
      </div>

      {/* Main Distillara Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Crafting Station */}
        <div className="bg-white rounded-lg border border-amber-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-amber-800 mb-4 flex items-center">
            <span className="mr-2">⚗️</span>
            Crafting Station
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h3 className="font-medium text-amber-800 mb-2">Current Project</h3>
              <p className="text-amber-600 text-sm">No active crafting project</p>
            </div>
            <button className="w-full px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-200">
              Start New Craft
            </button>
          </div>
        </div>

        {/* Alchemy Lab */}
        <div className="bg-white rounded-lg border border-amber-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-amber-800 mb-4 flex items-center">
            <span className="mr-2">🔬</span>
            Alchemy Lab
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-medium text-blue-800 mb-2">Research Status</h3>
              <p className="text-blue-600 text-sm">3 new recipes discovered</p>
            </div>
            <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200">
              View Research
            </button>
          </div>
        </div>

        {/* Economy Overview */}
        <div className="bg-white rounded-lg border border-amber-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-amber-800 mb-4 flex items-center">
            <span className="mr-2">💰</span>
            Economy
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-2xl font-bold text-green-600">1,247</p>
                <p className="text-sm text-green-600">Gold Coins</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-2xl font-bold text-purple-600">23</p>
                <p className="text-sm text-purple-600">Rare Items</p>
              </div>
            </div>
            <button className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200">
              Market Analysis
            </button>
          </div>
        </div>

        {/* Character Progress */}
        <div className="bg-white rounded-lg border border-amber-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-amber-800 mb-4 flex items-center">
            <span className="mr-2">👤</span>
            Character Progress
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h3 className="font-medium text-purple-800 mb-2">Alchemy Level</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-purple-600 text-sm">Level 7 (75% to Level 8)</p>
            </div>
            <button className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200">
              View Skills
            </button>
          </div>
        </div>
      </div>

      {/* Status Footer */}
      {distillaraData && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Status: {distillaraData.status}</span>
            <span>Version: {distillaraData.version}</span>
            <span>Last Updated: {new Date(distillaraData.lastSeen).toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}

// Sidebar component for the right panel
DistillaraView.Sidebar = function DistillaraSidebar({ onReturnToNexus }: { onReturnToNexus: () => void }) {
  return (
    <div className="h-full bg-gradient-to-b from-amber-50 to-orange-50 border-l-2 border-amber-300/30 p-6">
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <img 
            src="/distillara_logo_IconOnly.png" 
            alt="Distillara Logo" 
            className="w-6 h-6 object-contain"
          />
          <h3 className="text-lg font-semibold text-amber-800">Distillara Tools</h3>
        </div>
        
        {/* Quick Actions */}
        <div className="space-y-3 mb-6">
          <button className="w-full p-3 bg-white/60 hover:bg-white/80 border border-amber-200/50 hover:border-amber-300/70 rounded-lg transition-all duration-200 text-left">
            <div className="flex items-center space-x-3">
              <span className="text-xl">⚗️</span>
              <div>
                <h4 className="font-medium text-amber-800">Quick Craft</h4>
                <p className="text-xs text-amber-600">Instant potion creation</p>
              </div>
            </div>
          </button>
          
          <button className="w-full p-3 bg-white/60 hover:bg-white/80 border border-amber-200/50 hover:border-amber-300/70 rounded-lg transition-all duration-200 text-left">
            <div className="flex items-center space-x-3">
              <span className="text-xl">🔍</span>
              <div>
                <h4 className="font-medium text-amber-800">Recipe Search</h4>
                <p className="text-xs text-amber-600">Find new formulas</p>
              </div>
            </div>
          </button>
          
          <button className="w-full p-3 bg-white/60 hover:bg-white/80 border border-amber-200/50 hover:border-amber-300/70 rounded-lg transition-all duration-200 text-left">
            <div className="flex items-center space-x-3">
              <span className="text-xl">📊</span>
              <div>
                <h4 className="font-medium text-amber-800">Analytics</h4>
                <p className="text-xs text-amber-600">Crafting statistics</p>
              </div>
            </div>
          </button>
        </div>


      </div>
    </div>
  )
}
