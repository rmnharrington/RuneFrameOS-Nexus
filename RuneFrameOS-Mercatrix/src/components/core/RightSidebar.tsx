'use client'

import { useState } from 'react'

interface ToolItem {
  id: string
  name: string
  description: string
  icon: string
  status: 'ready' | 'cooldown' | 'locked'
}

const toolItems: ToolItem[] = [
  {
    id: 'gold-standard',
    name: 'Gold Standard',
    description: 'Set currency standards and values',
    icon: '💰',
    status: 'ready'
  },
  {
    id: 'trade-routes',
    name: 'Trade Routes',
    description: 'Design and optimize trade networks',
    icon: '🗺️',
    status: 'ready'
  },
  {
    id: 'market-maker',
    name: 'Market Maker',
    description: 'Create and manage marketplaces',
    icon: '🏪',
    status: 'cooldown'
  },
  {
    id: 'wealth-analyzer',
    name: 'Wealth Analyzer',
    description: 'Analyze economic trends',
    icon: '📈',
    status: 'locked'
  }
]

export default function RightSidebar() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null)

  const getStatusColor = (status: ToolItem['status']) => {
    switch (status) {
      case 'ready':
        return 'text-gold-400 border-gold-600'
      case 'cooldown':
        return 'text-wealth-400 border-wealth-600'
      case 'locked':
        return 'text-economy-400 border-economy-600'
      default:
        return 'text-gold-400 border-gold-600'
    }
  }

  const getStatusText = (status: ToolItem['status']) => {
    switch (status) {
      case 'ready':
        return 'Ready'
      case 'cooldown':
        return 'Cooldown'
      case 'locked':
        return 'Locked'
      default:
        return 'Unknown'
    }
  }

  return (
    <div className="h-full bg-gradient-to-b from-wealth-900 via-economy-900 to-gold-900 border-l border-economy-700/50 p-4">
      {/* Title */}
      <div className="mb-6 text-center">
        <h3 className="text-lg font-bold text-gold-100 text-shadow-gold mb-1">
          Economic Tools
        </h3>
        <p className="text-xs text-gold-300 text-shadow-wealth">
          Your wealth management arsenal
        </p>
      </div>

      {/* Tools List */}
      <div className="space-y-3 mb-6">
        {toolItems.map((tool) => (
          <div
            key={tool.id}
            onClick={() => setSelectedTool(selectedTool === tool.id ? null : tool.id)}
            className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
              selectedTool === tool.id
                ? 'bg-economy-800/70 border-gold-500 shadow-lg'
                : 'bg-economy-800/30 hover:bg-economy-800/50'
            } ${getStatusColor(tool.status)}`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{tool.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gold-200">{tool.name}</div>
                <div className="text-xs text-gold-400">{tool.description}</div>
                <div className={`text-xs mt-1 ${getStatusColor(tool.status)}`}>
                  {getStatusText(tool.status)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="bg-economy-800/50 rounded-lg p-3 border border-economy-700/30 mb-4">
        <h4 className="text-sm font-medium text-gold-200 mb-2">Economic Metrics</h4>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gold-400">Markets Created:</span>
            <span className="text-gold-200">23</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gold-400">Trade Routes:</span>
            <span className="text-gold-200">47</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gold-400">GDP Managed:</span>
            <span className="text-gold-200">$2.4M</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-economy-800/50 rounded-lg p-3 border border-economy-700/30">
        <h4 className="text-sm font-medium text-gold-200 mb-2">Recent Activity</h4>
        <div className="space-y-2 text-xs">
          <div className="text-gold-400">
            <span className="text-gold-300">2 min ago:</span> Created new market
          </div>
          <div className="text-gold-400">
            <span className="text-gold-300">15 min ago:</span> Established trade route
          </div>
          <div className="text-gold-400">
            <span className="text-gold-300">1 hour ago:</span> Updated currency values
          </div>
        </div>
      </div>
    </div>
  )
}
