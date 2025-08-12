"use client"

import React from 'react'

interface SystemStatsProps {
  className?: string
}

export default function SystemStats({ className }: SystemStatsProps) {
  // Mock data for demonstration
  const activeModules = 6
  const totalModules = 10
  const systemHealth: 'excellent' | 'good' | 'fair' | 'poor' = 'excellent'
  const performanceScore = 95

  return (
    <aside className="w-48 lg:w-56 bg-gradient-to-b from-slate-100 to-gray-200 border-l-2 border-slate-300/50 shadow-lg">
      <div className="p-3 lg:p-4">
        {/* Sidebar Header */}
        <div className="mb-4 lg:mb-6 text-center">
          <div className="w-10 h-10 lg:w-12 lg:h-12 mx-auto bg-gradient-to-br from-slate-600 via-blue-600 to-slate-700 rounded-full flex items-center justify-center shadow-lg mb-2">
            <span className="text-white text-lg lg:text-xl">📊</span>
          </div>
          <h3 className="text-sm lg:text-base font-fantasy font-semibold text-slate-800">
            System Stats
          </h3>
          <p className="text-xs text-slate-600/70">
            Real-time monitoring
          </p>
        </div>

        {/* Stats Grid */}
        <div className="space-y-3">
          {/* Active Modules */}
          <div className="bg-white/60 rounded-lg p-3 border border-slate-300/50">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-medium text-slate-800">Active Modules</h4>
              <span className="text-xs text-slate-600">{activeModules}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(activeModules / totalModules) * 100}%` }}
              />
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white/60 rounded-lg p-3 border border-slate-300/50">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-medium text-slate-800">System Health</h4>
              <span className={`text-xs px-2 py-1 rounded-full ${
                systemHealth === 'excellent' ? 'bg-green-100 text-green-800' :
                systemHealth === 'good' ? 'bg-blue-100 text-blue-800' :
                systemHealth === 'fair' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {systemHealth}
              </span>
            </div>
            <div className="text-xs text-slate-600">
              All systems operational
            </div>
          </div>

          {/* Performance */}
          <div className="bg-white/60 rounded-lg p-3 border border-slate-300/50">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-medium text-slate-800">Performance</h4>
              <span className="text-xs text-slate-600">{performanceScore}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  performanceScore >= 80 ? 'bg-green-500' :
                  performanceScore >= 60 ? 'bg-blue-500' :
                  performanceScore >= 40 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${performanceScore}%` }}
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/60 rounded-lg p-3 border border-slate-300/50">
            <h4 className="text-xs font-medium text-slate-800 mb-3">Quick Actions</h4>
            <div className="space-y-2">
              <button className="w-full p-2 bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white text-xs rounded-lg transition-all duration-200 hover:scale-105">
                Refresh Stats
              </button>
              <button className="w-full p-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs rounded-lg transition-all duration-200 hover:scale-105">
                System Check
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
