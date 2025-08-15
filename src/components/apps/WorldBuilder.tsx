'use client'

import { useState } from 'react'

interface World {
  id: string
  name: string
  description: string
  campaigns: number
  npcs: number
  locations: number
  lastUpdated: string
}

interface Campaign {
  id: string
  name: string
  world: string
  status: 'active' | 'paused' | 'completed'
  sessions: number
  players: number
}

const mockWorlds: World[] = [
  {
    id: '1',
    name: 'Eldoria',
    description: 'A mystical realm of ancient magic and forgotten kingdoms',
    campaigns: 3,
    npcs: 24,
    locations: 12,
    lastUpdated: '2 hours ago'
  },
  {
    id: '2',
    name: 'Ironforge',
    description: 'Industrial city-state built around a massive forge',
    campaigns: 2,
    npcs: 18,
    locations: 8,
    lastUpdated: '1 day ago'
  },
  {
    id: '3',
    name: 'Shadowmoor',
    description: 'Dark forest realm where shadows come alive',
    campaigns: 2,
    npcs: 16,
    locations: 6,
    lastUpdated: '3 days ago'
  }
]

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'The Shadow War',
    world: 'Eldoria',
    status: 'active',
    sessions: 12,
    players: 5
  },
  {
    id: '2',
    name: 'Forgotten Relics',
    world: 'Eldoria',
    status: 'active',
    sessions: 8,
    players: 4
  },
  {
    id: '3',
    name: 'Iron & Steam',
    world: 'Ironforge',
    status: 'paused',
    sessions: 6,
    players: 6
  }
]

export default function WorldBuilder() {
  const [activeTab, setActiveTab] = useState<'worlds' | 'campaigns' | 'npcs' | 'locations'>('worlds')

  return (
    <div className="w-full h-full">
      {/* Header */}
      <div className="mb-6 p-4 rounded-lg border border-world-700/30 bg-gradient-to-r from-tapestry-900/50 to-world-900/50">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 flex items-center justify-center">
            <span className="text-3xl">🌍</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-tapestry-100 text-shadow-tapestry">Tapestry Engine</h1>
            <p className="text-world-300 text-shadow-world">World Building & Campaign Management</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-6">
        <nav className="flex space-x-1 bg-world-800/50 p-1 rounded-lg border border-world-700/30">
          {[
            { id: 'worlds', label: 'Worlds', icon: '🌍', count: mockWorlds.length },
            { id: 'campaigns', label: 'Campaigns', icon: '📚', count: mockCampaigns.length },
            { id: 'npcs', label: 'NPCs', icon: '👥', count: 58 },
            { id: 'locations', label: 'Locations', icon: '🏰', count: 26 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-tapestry-600 to-world-600 text-white shadow-lg'
                  : 'text-tapestry-300 hover:text-tapestry-200 hover:bg-world-700/50'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="font-medium">{tab.label}</span>
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-bold">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {activeTab === 'worlds' && mockWorlds.map((world) => (
          <div
            key={world.id}
            className="relative overflow-hidden rounded-xl border-2 border-world-700/30 p-4 hover:shadow-lg transition-all duration-200 flex flex-col bg-gradient-to-br from-tapestry-900/80 to-world-900/80"
            style={{ minHeight: '280px' }}
          >
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-3xl">🌍</span>
                <div>
                  <h3 className="font-bold text-tapestry-100 text-shadow-tapestry">{world.name}</h3>
                  <p className="text-xs text-world-300">{world.description}</p>
                </div>
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-tapestry-300">Campaigns:</span>
                  <span className="text-world-400 font-medium">{world.campaigns}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-tapestry-300">NPCs:</span>
                  <span className="text-world-400 font-medium">{world.npcs}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-tapestry-300">Locations:</span>
                  <span className="text-world-400 font-medium">{world.locations}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-tapestry-300">Updated:</span>
                  <span className="text-story-400 font-medium">{world.lastUpdated}</span>
                </div>
              </div>
              
              <div className="mt-auto pt-3">
                <button className="w-full py-2 px-3 bg-gradient-to-r from-tapestry-600 to-world-600 hover:from-tapestry-500 hover:to-world-500 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 text-xs text-center">
                  🌍 Manage World
                </button>
              </div>
            </div>
          </div>
        ))}

        {activeTab === 'campaigns' && mockCampaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="relative overflow-hidden rounded-xl border-2 border-world-700/30 p-4 hover:shadow-lg transition-all duration-200 flex flex-col bg-gradient-to-br from-story-900/80 to-campaign-900/80"
            style={{ minHeight: '280px' }}
          >
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-3xl">📚</span>
                <div>
                  <h3 className="font-bold text-story-100 text-shadow-story">{campaign.name}</h3>
                  <p className="text-xs text-campaign-300">World: {campaign.world}</p>
                </div>
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-story-300">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    campaign.status === 'active' ? 'bg-world-600 text-white' :
                    campaign.status === 'paused' ? 'bg-tapestry-600 text-white' :
                    'bg-gray-600 text-white'
                  }`}>
                    {campaign.status}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-story-300">Sessions:</span>
                  <span className="text-campaign-400 font-medium">{campaign.sessions}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-story-300">Players:</span>
                  <span className="text-campaign-400 font-medium">{campaign.players}</span>
                </div>
              </div>
              
              <div className="mt-auto pt-3">
                <button className="w-full py-2 px-3 bg-gradient-to-r from-story-600 to-campaign-600 hover:from-story-500 hover:to-campaign-500 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 text-xs text-center">
                  📚 Manage Campaign
                </button>
              </div>
            </div>
          </div>
        ))}

        {activeTab === 'npcs' && (
          <div className="col-span-full text-center py-12">
            <span className="text-6xl mb-4 block">👥</span>
            <h3 className="text-xl font-bold text-tapestry-100 mb-2">NPC Management</h3>
            <p className="text-world-300">Create and manage non-player characters for your worlds</p>
            <button className="mt-4 px-6 py-3 bg-gradient-to-r from-story-600 to-campaign-600 hover:from-story-500 hover:to-campaign-500 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105">
              👥 Create New NPC
            </button>
          </div>
        )}

        {activeTab === 'locations' && (
          <div className="col-span-full text-center py-12">
            <span className="text-6xl mb-4 block">🏰</span>
            <h3 className="text-xl font-bold text-tapestry-100 mb-2">Location Management</h3>
            <p className="text-world-300">Design and organize locations within your worlds</p>
            <button className="mt-4 px-6 py-3 bg-gradient-to-r from-campaign-600 to-tapestry-600 hover:from-campaign-500 hover:to-tapestry-500 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105">
              🏰 Create New Location
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

