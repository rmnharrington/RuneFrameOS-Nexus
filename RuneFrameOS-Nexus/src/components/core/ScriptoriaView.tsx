"use client"

import React, { useState, useEffect } from 'react'

interface ScriptoriaViewProps {
  onReturnToNexus: () => void
}

interface ScriptoriaData {
  status: string
  version: string
  lastSeen: string
  subscribedSystems?: string[]
  availableSystems?: any[]
}

function ScriptoriaView({ onReturnToNexus }: ScriptoriaViewProps) {
  const [scriptoriaData, setScriptoriaData] = useState<ScriptoriaData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchScriptoriaData()
  }, [])

  const fetchScriptoriaData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('http://localhost:3006/api/module-info')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setScriptoriaData(data)
    } catch (err) {
      console.error('Failed to fetch Scriptoria data:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 mx-auto mb-4"></div>
          <p className="text-slate-700">Loading Scriptoria...</p>
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
            onClick={fetchScriptoriaData}
            className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      {/* Scriptoria Header */}
      <div className="mb-6 p-4 bg-gradient-to-r from-slate-100 to-gray-100 rounded-lg border border-slate-300">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 flex items-center justify-center">
            <img 
              src="/scriptoria_logo_IconOnly.png" 
              alt="Scriptoria Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Scriptoria</h1>
            <p className="text-slate-600">Comprehensive Gaming Systems Library</p>
          </div>
        </div>
      </div>

      {/* Main Scriptoria Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subscribed Systems */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
            <span className="mr-2">📚</span>
            Your Subscribed Systems
          </h2>
          <div className="space-y-3">
            {scriptoriaData?.subscribedSystems && scriptoriaData.subscribedSystems.length > 0 ? (
              scriptoriaData.subscribedSystems.map((system, index) => (
                <div key={index} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-800">{system}</span>
                    <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors">
                      Launch
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-500">
                <div className="text-4xl mb-2">📚</div>
                <p>No systems subscribed yet</p>
                <p className="text-sm">Browse and subscribe to gaming systems</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Access */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
            <span className="mr-2">⚡</span>
            Quick Access
          </h2>
          <div className="space-y-3">
            <button className="w-full p-3 bg-gradient-to-r from-slate-500 to-slate-600 text-white rounded-lg hover:from-slate-600 hover:to-slate-700 transition-all duration-200 hover:scale-105">
              🔍 Browse All Systems
            </button>
            <button className="w-full p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 hover:scale-105">
              ➕ Create New Ruleset
            </button>
            <button className="w-full p-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 hover:scale-105">
              📖 View Documentation
            </button>
          </div>
        </div>

        {/* System Categories */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Gaming System Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Third-Party Publishers */}
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:shadow-md transition-shadow cursor-pointer">
              <div className="text-3xl mb-2">📚</div>
              <h3 className="font-semibold text-slate-800 mb-1">Third-Party Publishers</h3>
              <p className="text-sm text-slate-600">AD&D, GURPS, Pathfinder, Call of Cthulhu</p>
              <div className="mt-2 text-xs text-slate-500">12 systems available</div>
            </div>

            {/* Echeladon System */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:shadow-md transition-shadow cursor-pointer">
              <div className="text-3xl mb-2">⚔️</div>
              <h3 className="font-semibold text-slate-800 mb-1">Echeladon System</h3>
              <p className="text-sm text-slate-600">Bad Guy Gas flagship gaming system</p>
              <div className="mt-2 text-xs text-blue-600">Core + 8 expansions</div>
            </div>

            {/* Homegrown Systems */}
            <div className="p-4 bg-green-50 rounded-lg border border-green-200 hover:shadow-md transition-shadow cursor-pointer">
              <div className="text-3xl mb-2">🏠</div>
              <h3 className="font-semibold text-slate-800 mb-1">Homegrown Systems</h3>
              <p className="text-sm text-slate-600">Shadowforge, Neon Dreams, Mystic Realms</p>
              <div className="mt-2 text-xs text-green-600">6 systems available</div>
            </div>

            {/* User-Created Rulesets */}
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 hover:shadow-md transition-shadow cursor-pointer">
              <div className="text-3xl mb-2">✨</div>
              <h3 className="font-semibold text-slate-800 mb-1">User-Created Rulesets</h3>
              <p className="text-sm text-slate-600">House rules, mods, and custom content</p>
              <div className="mt-2 text-xs text-purple-600">24+ rulesets</div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
              <div className="text-2xl">📝</div>
              <div className="flex-1">
                <div className="font-medium text-slate-800">New House Rules Added</div>
                <div className="text-sm text-slate-500">Echeladon Combat Overhaul v2.1</div>
              </div>
              <div className="text-xs text-slate-400">2 hours ago</div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
              <div className="text-2xl">🎲</div>
              <div className="flex-1">
                <div className="font-medium text-slate-800">System Updated</div>
                <div className="text-sm text-slate-500">GURPS Lite 4e - Latest Edition</div>
              </div>
              <div className="text-xs text-slate-400">1 day ago</div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
              <div className="text-2xl">✨</div>
              <div className="flex-1">
                <div className="font-medium text-slate-800">New Contribution</div>
                <div className="text-sm text-slate-500">Shadowforge: Urban Fantasy Rules</div>
              </div>
              <div className="text-xs text-slate-400">3 days ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Scriptoria Sidebar Component
function ScriptoriaSidebar({ onReturnToNexus }: ScriptoriaViewProps) {
  return (
    <div className="w-full h-full bg-gradient-to-b from-slate-100 to-gray-200 border-l-2 border-slate-300/50 shadow-lg">
      <div className="p-4">
        {/* Sidebar Header */}
        <div className="mb-6 text-center">
          <div className="w-12 h-12 mx-auto bg-gradient-to-br from-slate-600 via-blue-600 to-slate-700 rounded-full flex items-center justify-center shadow-lg mb-2">
            <img
              src="/scriptoria_logo_IconOnly.png"
              alt="Scriptoria"
              className="w-8 h-8 object-contain"
            />
          </div>
          <h3 className="text-base font-fantasy font-semibold text-slate-800">
            Scriptoria
          </h3>
          <p className="text-xs text-slate-600/70">
            Gaming Systems
          </p>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <button className="w-full p-3 bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white text-sm rounded-lg transition-all duration-200 hover:scale-105">
            🔍 Browse Systems
          </button>
          <button className="w-full p-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm rounded-lg transition-all duration-200 hover:scale-105">
            ➕ Add Ruleset
          </button>
          <button className="w-full p-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-sm rounded-lg transition-all duration-200 hover:scale-105">
            📖 Documentation
          </button>
        </div>

        {/* Recent Systems */}
        <div className="mt-6">
          <h4 className="text-xs font-semibold text-slate-600/70 uppercase tracking-wider mb-3">
            Recent Systems
          </h4>
          <div className="space-y-2">
            <div className="p-2 bg-white/60 rounded-lg text-xs text-slate-700">
              ⚔️ Echeladon Core
            </div>
            <div className="p-2 bg-white/60 rounded-lg text-xs text-slate-700">
              📚 AD&D 5e
            </div>
            <div className="p-2 bg-white/60 rounded-lg text-xs text-slate-700">
              🏠 Shadowforge
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Export both components
ScriptoriaView.Sidebar = ScriptoriaSidebar
export default ScriptoriaView
