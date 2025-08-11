"use client"

import React, { useState } from 'react'

interface Module {
  id: string
  name: string
  description: string
  status: 'online' | 'offline' | 'connecting' | 'maintenance'
  lastSeen?: string
  version?: string
  url?: string
}

const modules: Module[] = [
  {
    id: 'broke-unicorn-tavern',
    name: 'Broke Unicorn Tavern',
    description: 'Social hub & in-game gathering place for Travelers.',
    status: 'offline',
    version: 'v0.1.0',
    url: 'http://localhost:3005'
  },
  {
    id: 'cryptwell',
    name: 'Cryptwell',
    description: 'Undead/necromancy management and lore repository.',
    status: 'offline',
    version: 'v0.1.0'
  },
  {
    id: 'distillara',
    name: 'Distillara',
    description: 'Advanced alchemy crafting system with rarity tiers, economy, and failure mechanics.',
    status: 'offline',
    version: 'v0.1.0',
    url: 'http://localhost:3001'
  },
  {
    id: 'feastwell',
    name: 'Feastwell',
    description: 'Cooking and recipe management system with immersive flavor text and game mechanics.',
    status: 'offline',
    version: 'v0.1.0',
    url: 'http://localhost:3003'
  },
  {
    id: 'hoardwell',
    name: 'Hoardwell',
    description: 'Intelligent, immersive inventory management.',
    status: 'offline',
    version: 'v0.1.0',
    url: 'http://localhost:3004'
  },
  {
    id: 'loreforge',
    name: 'Loreforge',
    description: 'Campaign world and lore creation tool for Architects.',
    status: 'offline',
    version: 'v0.1.0'
  },
  {
    id: 'mercatrix',
    name: 'Mercatrix',
    description: 'Barter, trade, and merchant system with economy simulation.',
    status: 'offline',
    version: 'v0.1.0'
  },
  {
    id: 'runeweaver',
    name: 'RuneWeaver',
    description: 'Modular enchanting system using runes and energy circuits.',
    status: 'offline',
    version: 'v0.1.0'
  },
  {
    id: 'scriptoria',
    name: 'Scriptoria',
    description: 'Vast digital library for storing rules, notes, and historical records.',
    status: 'offline',
    version: 'v0.1.0'
  },
  {
    id: 'tapestry-engine',
    name: 'Tapestry Engine',
    description: 'Narrative engine for weaving interconnected storylines.',
    status: 'offline',
    version: 'v0.1.0'
  },
  {
    id: 'travelers-table',
    name: 'Travelers\' Table',
    description: 'Party/campaign session manager for group play.',
    status: 'offline',
    version: 'v0.1.0'
  },
  {
    id: 'persona-vault',
    name: 'PersonaVault',
    description: 'Character binder where all Traveler characters are stored and linked to accounts.',
    status: 'offline',
    version: 'v0.1.0'
  }
]

const getStatusColor = (status: Module['status']) => {
  switch (status) {
    case 'online':
      return 'bg-green-100 text-green-700 border-green-300'
    case 'offline':
      return 'bg-red-100 text-red-700 border-red-300'
    case 'connecting':
      return 'bg-yellow-100 text-yellow-700 border-yellow-300'
    case 'maintenance':
      return 'bg-blue-100 text-blue-700 border-blue-300'
    default:
      return 'bg-gray-100 text-gray-700 border-gray-300'
  }
}

const getStatusIcon = (status: Module['status']) => {
  switch (status) {
    case 'online':
      return '🟢'
    case 'offline':
      return '🔴'
    case 'connecting':
      return '🟡'
    case 'maintenance':
      return '🔵'
    default:
      return '⚪'
  }
}

export default function Dashboard() {
  const [moduleStatuses, setModuleStatuses] = useState<Record<string, Module['status']>>({})
  const [moduleData, setModuleData] = useState<Record<string, any>>({})
  const [showModuleData, setShowModuleData] = useState<Record<string, boolean>>({})

  const handleConnect = async (moduleId: string) => {
    const module = modules.find(m => m.id === moduleId)
    if (!module || !module.url) {
      console.log(`No URL configured for ${module?.name}`)
      return
    }

    console.log(`🔌 Attempting to connect to ${module.name} at ${module.url}`)
    setModuleStatuses(prev => ({ ...prev, [moduleId]: 'connecting' }))

    try {
      // Test the connection by calling the module's API
      const response = await fetch(`${module.url}/api/module-info`)
      console.log(`📡 Response from ${module.name}:`, response.status, response.statusText)
      
      if (response.ok) {
        const data = await response.json()
        console.log(`✅ Successfully connected to ${module.name}:`, data)
        setModuleStatuses(prev => ({ ...prev, [moduleId]: 'online' }))
        setModuleData(prev => ({ ...prev, [moduleId]: data }))
      } else {
        console.log(`❌ ${module.name} responded with status: ${response.status}`)
        setModuleStatuses(prev => ({ ...prev, [moduleId]: 'offline' }))
      }
    } catch (error) {
      console.error(`❌ Failed to connect to ${module.name}:`, error)
      if (error instanceof Error) {
        console.error(`❌ Error message: ${error.message}`)
        console.error(`❌ Error name: ${error.name}`)
        console.error(`❌ Error stack: ${error.stack}`)
      } else {
        console.error(`❌ Unknown error type:`, typeof error, error)
      }
      setModuleStatuses(prev => ({ ...prev, [moduleId]: 'offline' }))
    }
  }

  const toggleModuleData = (moduleId: string) => {
    setShowModuleData(prev => ({ ...prev, [moduleId]: !prev[moduleId] }))
  }

  const handleRefresh = () => {
    console.log('Refreshing module statuses...')
    // Reset all modules to offline for demo purposes
    const reset: Record<string, Module['status']> = {}
    modules.forEach(module => {
      reset[module.id] = 'offline'
    })
    setModuleStatuses(reset)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="mb-4">
          <h1 className="text-4xl font-fantasy font-bold text-gradient text-shadow">
            RuneFrameOS Module Dashboard
          </h1>
        </div>
        <p className="text-lg text-secondary-700 max-w-3xl mx-auto">
          Your command center for all RuneFrameOS applications. Monitor status, connect to services, 
          and manage your gaming ecosystem from one place.
        </p>
        <div className="flex justify-center space-x-4">
          <button 
            onClick={handleRefresh}
            className="btn-secondary px-6 py-2"
          >
            🔄 Refresh Status
          </button>
          <button className="btn-primary px-6 py-2">
            🚀 Quick Connect All
          </button>
        </div>
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {modules.map((module) => {
          const currentStatus = moduleStatuses[module.id]
          return (
            <div key={module.id} className="card rune-border hover:scale-105 transition-transform duration-200">
              <div className="relative z-10">
                {/* Module Header */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-fantasy font-semibold text-amber-800 flex-1">
                    {module.name}
                  </h3>
                  <div className={`text-xs px-2 py-1 rounded-full border font-medium ${getStatusColor(currentStatus)}`}>
                    {getStatusIcon(currentStatus)} {currentStatus}
                  </div>
                </div>

                {/* Description */}
                <p className="text-secondary-700 text-sm mb-4 leading-relaxed">
                  {module.description}
                </p>

                {/* Module Info */}
                <div className="space-y-2 mb-4">
                  {module.version && (
                    <div className="flex items-center text-xs text-secondary-600">
                      <span className="mr-2">📦</span>
                      Version {module.version}
                    </div>
                  )}
                  {module.lastSeen && (
                    <div className="flex items-center text-xs text-secondary-600">
                      <span className="mr-2">🕐</span>
                      Last seen: {module.lastSeen}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {currentStatus === 'offline' && module.url && (
                    <button
                      onClick={() => handleConnect(module.id)}
                      className="px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg border border-blue-300 hover:bg-blue-200 transition-colors"
                      title="Connect to module"
                    >
                      🔌 Connect
                    </button>
                  )}
                  {currentStatus === 'online' && module.url && (
                    <button
                      className="px-3 py-2 text-sm bg-green-100 text-green-700 rounded-lg border border-green-300 hover:bg-green-200 transition-colors"
                      title="Module is connected"
                    >
                      ✅ Connected
                    </button>
                  )}
                  {currentStatus === 'connecting' && (
                    <button
                      disabled
                      className="px-3 py-2 text-sm bg-yellow-100 text-yellow-700 rounded-lg border border-yellow-300 cursor-not-allowed"
                      title="Connecting to module"
                    >
                      🔄 Connecting...
                    </button>
                  )}
                  <button
                    onClick={() => toggleModuleData(module.id)}
                    className="px-3 py-2 text-sm bg-secondary-100 text-secondary-700 rounded-lg border border-secondary-300 hover:bg-secondary-200 transition-colors"
                    title="Module data"
                  >
                    ⚙️
                  </button>
                </div>

                {/* Module Data Display - Now shown when settings gear is clicked */}
                {currentStatus === 'online' && moduleData[module.id] && showModuleData[module.id] && (
                  <div className="mt-4 p-3 bg-white/10 rounded-lg border border-amber-300/30">
                    <h4 className="font-medium text-amber-800 mb-2 flex items-center">
                      <span className="mr-2">📊</span>
                      Live Data
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-amber-700">
                        <span className="mr-2">🟢</span>
                        Status: {moduleData[module.id].status || 'Unknown'}
                      </div>
                      {moduleData[module.id].version && (
                        <div className="flex items-center text-amber-700">
                          <span className="mr-2">📦</span>
                          Version: {moduleData[module.id].version}
                        </div>
                      )}
                      {moduleData[module.id].lastSeen && (
                        <div className="flex items-center text-amber-700">
                          <span className="mr-2">🕐</span>
                          Last Updated: {new Date(moduleData[module.id].lastSeen).toLocaleString()}
                        </div>
                      )}
                      {moduleData[module.id].service && (
                        <div className="flex items-center text-amber-700">
                          <span className="mr-2">🔗</span>
                          <span className="ml-2">{moduleData[module.id].service}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer Stats */}
      <div className="mt-8 pt-6 border-t-2 border-amber-300/30">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-amber-600">
              {Object.values(moduleStatuses).filter(status => status === 'online').length}
            </div>
            <div className="text-sm text-secondary-600">Connected</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">
              {Object.values(moduleStatuses).filter(status => status === 'offline').length}
            </div>
            <div className="text-sm text-secondary-600">Offline</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-600">
              {Object.values(moduleStatuses).filter(status => status === 'connecting').length}
            </div>
            <div className="text-sm text-secondary-600">Connecting</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {Object.values(moduleStatuses).filter(status => status === 'maintenance').length}
            </div>
            <div className="text-sm text-secondary-600">Maintenance</div>
          </div>
        </div>
      </div>
    </div>
  )
}
