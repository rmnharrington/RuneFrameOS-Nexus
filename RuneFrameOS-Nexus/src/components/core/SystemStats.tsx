"use client"

import React, { useState, useEffect } from 'react'

interface SystemStatsProps {
  className?: string
}

export default function SystemStats({ className = "" }: SystemStatsProps) {
  const [currentTime, setCurrentTime] = useState<string>('')

  useEffect(() => {
    // Update time on client side after mounting
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString())
    }
    
    updateTime() // Set initial time
    
    // Update time every second
    const interval = setInterval(updateTime, 1000)
    
    return () => clearInterval(interval)
  }, [])

  const stats = [
    {
      category: 'System Status',
      items: [
        { label: 'Core Services', value: '🟢 Online', status: 'online' },
        { label: 'Database', value: '🟢 Connected', status: 'online' },
        { label: 'API Gateway', value: '🟡 Syncing', status: 'syncing' },
        { label: 'Cache Layer', value: '🟢 Active', status: 'online' }
      ]
    },
    {
      category: 'Performance',
      items: [
        { label: 'Response Time', value: '47ms', status: 'good' },
        { label: 'Uptime', value: '99.8%', status: 'good' },
        { label: 'Active Users', value: '12', status: 'normal' },
        { label: 'Memory Usage', value: '67%', status: 'warning' }
      ]
    },
    {
      category: 'Gaming Stats',
      items: [
        { label: 'Active Campaigns', value: '3', status: 'normal' },
        { label: 'Characters', value: '18', status: 'normal' },
        { label: 'Dice Rolls', value: '1,247', status: 'good' },
        { label: 'Session Time', value: '2h 34m', status: 'normal' }
      ]
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
      case 'good':
        return 'text-green-600 bg-green-100/80 border-green-300/50'
      case 'syncing':
      case 'warning':
        return 'text-yellow-600 bg-yellow-100/80 border-yellow-300/50'
      case 'offline':
      case 'error':
        return 'text-red-600 bg-red-100/80 border-red-300/50'
      default:
        return 'text-blue-600 bg-blue-100/80 border-blue-300/50'
    }
  }

  return (
    <aside className={`w-full lg:w-80 bg-gradient-to-b from-orange-50 to-red-50 border-l-2 border-orange-300/30 shadow-lg ${className}`}>
      <div className="p-4 lg:p-6">
        {/* Header */}
        <div className="mb-4 lg:mb-6 text-center">
          <div className="w-10 h-10 lg:w-12 lg:h-12 mx-auto bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg mb-3">
            <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-base lg:text-lg font-fantasy font-semibold text-orange-800">
            System Monitor
          </h3>
          <p className="text-xs lg:text-sm text-orange-600/70">
            Real-time status
          </p>
        </div>

        {/* Stats Sections */}
        <div className="space-y-4 lg:space-y-6">
          {stats.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white/60 rounded-lg border border-orange-200/50 p-3 lg:p-4">
              <h4 className="text-xs lg:text-sm font-semibold text-orange-800 mb-2 lg:mb-3 border-b border-orange-200/30 pb-2">
                {section.category}
              </h4>
              <div className="space-y-2 lg:space-y-3">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between">
                    <span className="text-xs lg:text-sm text-orange-700 font-medium">
                      {item.label}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full border font-medium ${getStatusColor(item.status)}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-4 lg:mt-6 pt-3 lg:pt-4 border-t border-orange-300/30">
          <h4 className="text-xs lg:text-sm font-medium text-orange-700 mb-2 lg:mb-3">Quick Actions</h4>
          <div className="space-y-2">
            <button className="w-full p-2 lg:p-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 hover:scale-105 shadow-md text-xs lg:text-sm touch-manipulation">
              <span className="flex items-center justify-center space-x-2">
                <span>📊</span>
                <span>Detailed Report</span>
              </span>
            </button>
            <button className="w-full p-2 lg:p-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 hover:scale-105 shadow-md text-xs lg:text-sm touch-manipulation">
              <span className="flex items-center justify-center space-x-2">
                <span>⚙️</span>
                <span>System Settings</span>
              </span>
            </button>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="mt-4 lg:mt-6 p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border border-green-300/50">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 lg:w-3 lg:h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs lg:text-sm font-medium text-green-800">
              All systems operational
            </span>
          </div>
          <p className="text-xs text-green-700/70 mt-1">
            Last updated: {currentTime || 'Loading...'}
          </p>
        </div>
      </div>
    </aside>
  )
}
