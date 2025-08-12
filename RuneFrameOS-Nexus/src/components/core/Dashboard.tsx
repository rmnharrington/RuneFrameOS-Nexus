"use client"

import React, { useState, useEffect } from 'react'

interface Module {
  id: string
  name: string
  description: string
  icon: string
  status: 'operational' | 'degraded' | 'down'
  url?: string
  version?: string
}

interface DashboardProps {
  modules: Module[]
  setModules: React.Dispatch<React.SetStateAction<Module[]>>
  onNavigate?: (destination: string) => void
}

// Helper function to get image name for each module
const getModuleImage = (moduleId: string): string => {
  const imageMap: { [key: string]: string } = {
    'broke-unicorn-tavern': 'BrokeUnicornTavern',
    'persona-vault': 'PersonaVault',
    'scriptoria': 'Scriptoria',
    'distillara': 'Distillara',
    'feastwell': 'Feastwell',
    'hoardwell': 'Hoardwell',
    'loreforge': 'LoreForge',
    'mercatrix': 'Mercatrix',
    'tapestry-engine': 'TapestryEngine',
    'travelers-table': 'TravelersTable',
    'echeladon': 'Echeladon',
    'rune-weaver': 'RuneWeaver',
    'necrotic-arcanum': 'NecroticArcanum'
  }
  return imageMap[moduleId] || 'Default'
}

export default function Dashboard({ modules, setModules, onNavigate }: DashboardProps) {
  const [moduleStatuses, setModuleStatuses] = useState<Record<string, any>>({})
  const [connectedModules, setConnectedModules] = useState<Set<string>>(new Set())

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-green-600'
      case 'degraded':
        return 'text-yellow-600'
      case 'down':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const handleConnect = async (module: Module) => {
    if (!module.url) {
      console.log(`No URL configured for ${module.name}`)
      return
    }

    try {
      // Try different API endpoints based on module type
      let data = null
      let endpoint = ''
      
      // First try module-info (for Distillara and similar)
      try {
        const response = await fetch(`${module.url}/api/module-info`)
        if (response.ok) {
          data = await response.json()
          endpoint = '/api/module-info'
        }
      } catch (error) {
        console.log(`${module.name} doesn't have /api/module-info endpoint`)
      }
      
      // If module-info failed, try health endpoint (for Broke Unicorn Tavern and similar)
      if (!data) {
        try {
          const response = await fetch(`${module.url}/api/health`)
          if (response.ok) {
            data = await response.json()
            endpoint = '/api/health'
          }
        } catch (error) {
          console.log(`${module.name} doesn't have /api/health endpoint`)
        }
      }
      
      // If we got data from either endpoint, mark as connected
      if (data) {
        console.log(`Connected to ${module.name} via ${endpoint}:`, data)
        
        // Mark module as connected
        setConnectedModules(prev => new Set([...Array.from(prev), module.id]))
        
        // Update module status
        setModuleStatuses(prev => ({
          ...prev,
          [module.id]: data
        }))
      } else {
        console.error(`Failed to connect to ${module.name}: No available API endpoints`)
      }
    } catch (error) {
      console.error(`Error connecting to ${module.name}:`, error)
    }
  }

  const handleOpenInNexus = (module: Module) => {
    console.log(`Opening ${module.name} in Nexus`)
    if (onNavigate) {
      // Map module IDs to view names
      const moduleViewMap: Record<string, string> = {
        'distillara': 'distillara',
        'feastwell': 'feastwell',
        'hoardwell': 'hoardwell',
        'broke-unicorn-tavern': 'tavern',
        'scriptoria': 'scriptoria'
      }
      
      const viewName = moduleViewMap[module.id]
      if (viewName) {
        onNavigate(viewName)
      } else {
        console.warn(`No view mapping found for module: ${module.id}`)
      }
    }
  }

  const handleOpenExternal = (module: Module) => {
    console.log(`Opening external URL for ${module.name}`)
    if (module.url) {
      window.open(module.url, '_blank')
    } else {
      console.warn(`No external URL configured for ${module.name}`)
    }
  }

  const onAddModules = () => {
    console.log('Add Modules clicked')
    // Implement navigation or modal for adding modules
  }

  const isConnected = (moduleId: string) => connectedModules.has(moduleId)

  if (modules.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🏗️</div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Dashboard Empty</h2>
        <p className="text-slate-600 mb-6">Use the "Add Modules" button in the left sidebar to get started</p>
        <div className="text-sm text-slate-500">
          <p>Your RuneFrameOS ecosystem awaits...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Module Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {modules.map((module) => {
          const isModuleConnected = isConnected(module.id)
          const moduleData = moduleStatuses[module.id]
          
          return (
            <div
              key={module.id}
              className={`relative overflow-hidden rounded-xl border-2 p-4 hover:shadow-lg transition-all duration-200 flex flex-col ${
                isModuleConnected 
                  ? 'border-blue-500 shadow-lg' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
              style={{
                minHeight: '280px',
                backgroundImage: `url('/${getModuleImage(module.id)}.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Dark Overlay for Readability */}
              <div className="absolute inset-0 bg-black/50"></div>
              
              {/* Content with relative positioning for overlay */}
              <div className="relative z-10 h-full flex flex-col">
                {/* Module Header */}
                <div className="text-center mb-3 flex-shrink-0">
                  <div className="text-3xl mb-2">{module.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-1 line-clamp-2 drop-shadow-lg">{module.name}</h3>
                  <p className="text-xs text-slate-200 mb-2 line-clamp-2 drop-shadow-lg">{module.description}</p>
                  
                  {/* Status Badge */}
                  <div className="inline-block px-2 py-1 bg-white/20 text-white text-xs font-medium rounded-full mb-2 border border-white/30">
                    {module.status}
                  </div>
                </div>

                {/* Connection Status */}
                {isModuleConnected && moduleData && (
                  <div className="mb-3 p-2 bg-blue-50/80 border border-blue-200/50 rounded-lg flex-shrink-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs px-1 py-0.5 rounded-full ${getStatusColor(moduleData.status)} bg-white/90`}>
                        {moduleData.status === 'operational' ? 'Online' : moduleData.status}
                      </span>
                    </div>
                    {moduleData.lastUpdated && (
                      <p className="text-xs text-blue-200 drop-shadow-lg">
                        Last updated: {new Date(moduleData.lastUpdated).toLocaleTimeString()}
                      </p>
                    )}
                  </div>
                )}

                {/* Action Button */}
                <div className="mt-auto">
                  {isModuleConnected ? (
                    <button
                      onClick={() => handleOpenInNexus(module)}
                      className="w-full py-2 px-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg text-sm"
                    >
                      🚀 Open in Nexus
                    </button>
                  ) : (
                    <button
                      onClick={() => handleConnect(module)}
                      disabled={!module.url}
                      className={`w-full py-2 px-3 rounded-lg font-semibold transition-all duration-200 text-sm ${
                        module.url
                          ? 'bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white hover:scale-105'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {module.url ? '🔌 Connect' : 'No URL'}
                    </button>
                  )}
                </div>

                {/* Live Data Display (in settings gear) */}
                {isModuleConnected && moduleData && (
                  <div className="mt-3 p-2 bg-white/20 rounded-lg flex-shrink-0 border border-white/30">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-white drop-shadow-lg">Live Data</span>
                      <span className="text-xs text-white/80">⚙️</span>
                    </div>
                    <div className="text-xs text-slate-200 space-y-0.5 drop-shadow-lg">
                      <p>Status: {moduleData.status}</p>
                      {moduleData.version && <p>Version: {moduleData.version}</p>}
                      {moduleData.uptime && <p>Uptime: {moduleData.uptime}</p>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer Stats */}
      <div className="mt-8 p-6 bg-gradient-to-r from-slate-100 to-gray-100 rounded-xl border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Dashboard Overview</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-700">{modules.length}</div>
            <div className="text-sm text-slate-600">Total Modules</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{connectedModules.size}</div>
            <div className="text-sm text-slate-600">Connected</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-600">{modules.filter(m => m.status === 'operational').length}</div>
            <div className="text-sm text-slate-600">Operational</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{modules.filter(m => m.status !== 'operational').length}</div>
            <div className="text-sm text-slate-600">Issues</div>
          </div>
        </div>
      </div>
    </div>
  )
}
