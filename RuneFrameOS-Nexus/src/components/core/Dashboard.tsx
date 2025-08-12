"use client"

import React, { useState, useEffect } from 'react'

interface Module {
  id: string
  name: string
  description: string
  icon: string
  status: 'operational' | 'degraded' | 'down'
  url?: string
}

interface DashboardProps {
  modules: Module[]
  setModules: React.Dispatch<React.SetStateAction<Module[]>>
  onNavigate?: (destination: string) => void
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

  const isConnected = (moduleId: string) => connectedModules.has(moduleId)

  if (modules.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🏗️</div>
        <h2 className="text-2xl font-bold text-amber-800 mb-2">Dashboard Empty</h2>
        <p className="text-amber-600 mb-6">Use the "Add Modules" button in the left sidebar to get started</p>
        <div className="text-sm text-amber-500">
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
              className={`bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 p-4 hover:shadow-lg transition-all duration-200 flex flex-col ${
                isModuleConnected 
                  ? 'border-green-500 shadow-lg' 
                  : 'border-amber-200 hover:border-amber-300'
              }`}
              style={{
                minHeight: '280px'
              }}
            >
              {/* Module Header */}
              <div className="text-center mb-3 flex-shrink-0">
                <div className="text-3xl mb-2">{module.icon}</div>
                <h3 className="text-lg font-bold text-amber-800 mb-1 line-clamp-2">{module.name}</h3>
                <p className="text-xs text-amber-600 mb-2 line-clamp-2">{module.description}</p>
                
                {/* Status Badge */}
                <div className="inline-block px-2 py-1 bg-amber-200 text-amber-800 text-xs font-medium rounded-full mb-2">
                  {module.status}
                </div>
              </div>

              {/* Connection Status */}
              {isModuleConnected && moduleData && (
                <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded-lg flex-shrink-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs px-1 py-0.5 rounded-full ${getStatusColor(moduleData.status)} bg-white`}>
                      {moduleData.status === 'operational' ? 'Online' : moduleData.status}
                    </span>
                  </div>
                  {moduleData.lastUpdated && (
                    <p className="text-xs text-green-600">
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
                    className="w-full py-2 px-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg text-sm"
                  >
                    🚀 Open in Nexus
                  </button>
                ) : (
                  <button
                    onClick={() => handleConnect(module)}
                    disabled={!module.url}
                    className={`w-full py-2 px-3 rounded-lg font-semibold transition-all duration-200 text-sm ${
                      module.url
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white hover:scale-105'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {module.url ? '🔌 Connect' : 'No URL'}
                  </button>
                )}
              </div>

              {/* Live Data Display (in settings gear) */}
              {isModuleConnected && moduleData && (
                <div className="mt-3 p-2 bg-amber-100/50 rounded-lg flex-shrink-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-amber-700">Live Data</span>
                    <span className="text-xs text-amber-500">⚙️</span>
                  </div>
                  <div className="text-xs text-amber-600 space-y-0.5">
                    <p>Status: {moduleData.status}</p>
                    {moduleData.version && <p>Version: {moduleData.version}</p>}
                    {moduleData.uptime && <p>Uptime: {moduleData.uptime}</p>}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Footer Stats */}
      <div className="mt-8 p-6 bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl border border-amber-200">
        <h3 className="text-lg font-semibold text-amber-800 mb-4">Dashboard Overview</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-700">{modules.length}</div>
            <div className="text-sm text-amber-600">Total Modules</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{connectedModules.size}</div>
            <div className="text-sm text-amber-600">Connected</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">{modules.filter(m => m.status === 'operational').length}</div>
            <div className="text-sm text-amber-600">Operational</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{modules.filter(m => m.status !== 'operational').length}</div>
            <div className="text-sm text-amber-600">Issues</div>
          </div>
        </div>
      </div>
    </div>
  )
}
