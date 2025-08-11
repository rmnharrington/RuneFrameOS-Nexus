"use client"

import React from 'react'

interface RightSidebarProps {
  appType?: string
}

export default function RightSidebar({ appType = "Tavern" }: RightSidebarProps) {
  const missionBoard = [
    {
      id: 1,
      title: "Goblin Infestation",
      description: "Clear the mines of pesky goblins",
      reward: "50 gold + XP",
      difficulty: "Easy",
      genre: "Combat",
      status: "Available"
    },
    {
      id: 2,
      title: "Lost Artifact",
      description: "Recover the ancient crystal from the ruins",
      reward: "100 gold + Rare Item",
      difficulty: "Medium",
      genre: "Exploration",
      status: "Available"
    },
    {
      id: 3,
      title: "Merchant Escort",
      description: "Protect a merchant caravan to the next town",
      reward: "75 gold + Reputation",
      difficulty: "Medium",
      genre: "Escort",
      status: "In Progress"
    },
    {
      id: 4,
      title: "Dragon Hunt",
      description: "Track and eliminate the young dragon",
      reward: "500 gold + Legendary Item",
      difficulty: "Hard",
      genre: "Combat",
      status: "Available"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'text-green-600 bg-green-100 border-green-300'
      case 'In Progress': return 'text-blue-600 bg-blue-100 border-blue-300'
      case 'Completed': return 'text-gray-600 bg-gray-100 border-gray-300'
      default: return 'text-gray-600 bg-gray-100 border-gray-300'
    }
  }

  const getGenreColor = (genre: string) => {
    switch (genre) {
      case 'Combat': return 'bg-red-100 text-red-700 border-red-300'
      case 'Exploration': return 'bg-blue-100 text-blue-700 border-blue-300'
      case 'Escort': return 'bg-green-100 text-green-700 border-green-300'
      default: return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  return (
    <aside className="w-80 bg-gradient-to-b from-wood-50 to-tavern-50 border-l-2 border-wood-300/30 shadow-lg">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-wood-200/50">
        <h2 className="text-lg font-fantasy font-semibold text-wood-800">
          Mission Board
        </h2>
        <p className="text-sm text-wood-600">
          Available quests and bounties
        </p>
      </div>

      {/* Mission List */}
      <div className="p-4 space-y-4">
        {missionBoard.map((mission) => (
          <div key={mission.id} className="card rune-border p-4 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-fantasy font-semibold text-wood-800 text-sm">
                {mission.title}
              </h3>
              <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(mission.status)}`}>
                {mission.status}
              </span>
            </div>
            
            <p className="text-xs text-wood-600 mb-3 leading-relaxed">
              {mission.description}
            </p>
            
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-tavern-600">
                Reward: {mission.reward}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full border ${getGenreColor(mission.genre)}`}>
                {mission.genre}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-wood-500">
                Difficulty: {mission.difficulty}
              </span>
              <button className="px-3 py-1 bg-tavern-600 hover:bg-tavern-700 text-white text-xs rounded-lg transition-colors">
                Accept
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-wood-200/50">
        <h3 className="text-sm font-medium text-wood-700 mb-3">Quick Actions</h3>
        <div className="space-y-2">
          <button className="w-full p-2 bg-tavern-100 hover:bg-tavern-200 text-tavern-700 rounded-lg text-sm font-medium transition-colors">
            📋 Post Mission
          </button>
          <button className="w-full p-2 bg-wood-100 hover:bg-wood-200 text-wood-700 rounded-lg text-sm font-medium transition-colors">
            🎯 Set Bounty
          </button>
          <button className="w-full p-2 bg-tavern-100 hover:bg-tavern-200 text-tavern-700 rounded-lg text-sm font-medium transition-colors">
            📊 View Stats
          </button>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="p-4 border-t border-wood-200/50">
        <div className="flex items-center justify-between">
          <span className="text-sm text-wood-600">Active Missions:</span>
          <span className="text-sm font-medium text-tavern-600">4</span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-sm text-wood-600">Completed:</span>
          <span className="text-sm font-medium text-green-600">12</span>
        </div>
      </div>
    </aside>
  )
}

