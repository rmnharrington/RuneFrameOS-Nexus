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
    url: 'http://localhost:3002'
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
    version: 'v0.1.0'
  },
  {
    id: 'feastwell',
    name: 'Feastwell',
    description: 'Cooking and recipe management system with immersive flavor text and game mechanics.',
    status: 'offline',
    version: 'v0.1.0'
  },
  {
    id: 'hoardwell',
    name: 'Hoardwell',
    description: 'Intelligent, immersive inventory management.',
    status: 'offline',
    version: 'v0.1.0'
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
      return 'text-green-600 bg-green-100/80 border-green-300/50'
    case 'offline':
      return 'text-red-600 bg-red-100/80 border-red-300/50'
    case 'connecting':
      return 'text-yellow-600 bg-yellow-100/80 border-yellow-300/50'
    case 'maintenance':
      return 'text-blue-600 bg-blue-100/80 border-blue-300/50'
    default:
      return 'text-gray-600 bg-gray-100/80 border-gray-300/50'
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
  const [moduleStatuses, setModuleStatuses] = useState<Record<string, Module['status']>>(() => {
    const initial: Record<string, Module['status']> = {}
    modules.forEach(module => {
      initial[module.id] = module.status
    })
    return initial
  })

  const handleConnect = async (moduleId: string) => {
    const module = modules.find(m => m.id === moduleId)
    if (!module) return

    // Set status to connecting
    setModuleStatuses(prev => ({ ...prev, [moduleId]: 'connecting' }))

    try {
      if (moduleId === 'broke-unicorn-tavern') {
        // Special handling for BrokeUnicorn Tavern
        if (module.url) {
          // Check if the service is running
          const response = await fetch(`${module.url}/api/health`, { 
            method: 'GET',
            mode: 'cors'
          })
          
          if (response.ok) {
            setModuleStatuses(prev => ({ ...prev, [moduleId]: 'online' }))
            console.log(`✅ Successfully connected to ${module.name}`)
          } else {
            throw new Error(`Service responded with status: ${response.status}`)
          }
        } else {
          throw new Error('No URL configured for this module')
        }
      } else {
        // Generic connection logic for other modules
        console.log(`Connecting to ${module.name}...`)
        // Simulate connection delay
        await new Promise(resolve => setTimeout(resolve, 2000))
        setModuleStatuses(prev => ({ ...prev, [moduleId]: 'online' }))
        console.log(`✅ Successfully connected to ${module.name}`)
      }
    } catch (error) {
      console.error(`❌ Failed to connect to ${module.name}:`, error)
      setModuleStatuses(prev => ({ ...prev, [moduleId]: 'offline' }))
    }
  }

  const handleOpenModule = (moduleId: string) => {
    const module = modules.find(m => m.id === moduleId)
    if (!module || !module.url) {
      console.log(`No URL configured for ${module?.name}`)
      return
    }

    if (moduleStatuses[moduleId] === 'online') {
      window.open(module.url, '_blank')
    } else {
      console.log(`Cannot open ${module.name} - not connected`)
    }
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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleConnect(module.id)}
                    disabled={currentStatus === 'online' || currentStatus === 'connecting'}
                    className={`flex-1 px-3 py-2 text-sm rounded-lg border transition-colors ${
                      currentStatus === 'online'
                        ? 'bg-green-100 text-green-700 border-green-300 cursor-not-allowed'
                        : currentStatus === 'connecting'
                        ? 'bg-yellow-100 text-yellow-700 border-yellow-300 cursor-not-allowed'
                        : 'btn-primary hover:bg-amber-600'
                    }`}
                  >
                    {currentStatus === 'online' ? '✅ Connected' : 
                     currentStatus === 'connecting' ? '🔄 Connecting...' : '🔌 Connect'}
                  </button>
                  {currentStatus === 'online' && module.url && (
                    <button
                      onClick={() => handleOpenModule(module.id)}
                      className="px-3 py-2 text-sm bg-green-100 text-green-700 rounded-lg border border-green-300 hover:bg-green-200 transition-colors"
                      title="Open in new tab"
                    >
                      🌐
                    </button>
                  )}
                  <button className="px-3 py-2 text-sm bg-secondary-100 text-secondary-700 rounded-lg border border-secondary-300 hover:bg-secondary-200 transition-colors">
                    ⚙️
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer Stats */}
      <div className="mt-8 pt-6 border-t-2 border-amber-300/30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
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
