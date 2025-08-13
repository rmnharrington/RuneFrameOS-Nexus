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
    id: 'soul-gem',
    name: 'Soul Gem',
    description: 'Capture and store souls for power',
    icon: '💎',
    status: 'ready'
  },
  {
    id: 'death-tome',
    name: 'Death Tome',
    description: 'Ancient knowledge of necromancy',
    icon: '📖',
    status: 'ready'
  },
  {
    id: 'bone-chisel',
    name: 'Bone Chisel',
    description: 'Craft undead from remains',
    icon: '🔨',
    status: 'cooldown'
  },
  {
    id: 'shadow-mirror',
    name: 'Shadow Mirror',
    description: 'Communicate with the dead',
    icon: '🪞',
    status: 'locked'
  }
]

export default function RightSidebar() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null)

  const getStatusColor = (status: ToolItem['status']) => {
    switch (status) {
      case 'ready':
        return 'text-sickly-400 border-sickly-600'
      case 'cooldown':
        return 'text-undead-400 border-undead-600'
      case 'locked':
        return 'text-corpse-400 border-corpse-600'
      default:
        return 'text-sickly-400 border-sickly-600'
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
    <div className="h-full bg-gradient-to-b from-corpse-900 via-undead-900 to-necrotic-900 border-l border-undead-700/50 p-4">
      {/* Title */}
      <div className="mb-6 text-center">
        <h3 className="text-lg font-bold text-sickly-100 text-shadow-necrotic mb-1">
          Necromantic Tools
        </h3>
        <p className="text-xs text-sickly-300 text-shadow-corpse">
          Your arsenal of death
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
                ? 'bg-undead-800/70 border-sickly-500 shadow-lg'
                : 'bg-undead-800/30 hover:bg-undead-800/50'
            } ${getStatusColor(tool.status)}`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{tool.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sickly-200">{tool.name}</div>
                <div className="text-xs text-sickly-400">{tool.description}</div>
                <div className={`text-xs mt-1 ${getStatusColor(tool.status)}`}>
                  {getStatusText(tool.status)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="bg-undead-800/50 rounded-lg p-3 border border-undead-700/30 mb-4">
        <h4 className="text-sm font-medium text-sickly-200 mb-2">Quick Stats</h4>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-sickly-400">Undead Created:</span>
            <span className="text-sickly-200">47</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sickly-400">Souls Collected:</span>
            <span className="text-sickly-200">23</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sickly-400">Rituals Performed:</span>
            <span className="text-sickly-200">12</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-undead-800/50 rounded-lg p-3 border border-undead-700/30">
        <h4 className="text-sm font-medium text-sickly-200 mb-2">Recent Activity</h4>
        <div className="space-y-2 text-xs">
          <div className="text-sickly-400">
            <span className="text-sickly-300">2 min ago:</span> Created zombie horde
          </div>
          <div className="text-sickly-400">
            <span className="text-sickly-300">15 min ago:</span> Collected soul essence
          </div>
          <div className="text-sickly-400">
            <span className="text-sickly-300">1 hour ago:</span> Performed binding ritual
          </div>
        </div>
      </div>
    </div>
  )
}
