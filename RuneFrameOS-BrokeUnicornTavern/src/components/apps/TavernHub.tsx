'use client'

import { useState } from 'react'

export default function TavernHub() {
  const [activeTab, setActiveTab] = useState('available-games')

  const availableGames = [
    {
      id: 1,
      title: "D&D 5e - Lost Mine of Phandelver",
      gm: "Sarah the Storyteller",
      system: "D&D 5e",
      players: "4/5",
      date: "Tonight, 7 PM",
      description: "A classic adventure for new players and veterans alike.",
      tags: ["Beginner Friendly", "Fantasy", "Adventure"]
    },
    {
      id: 2,
      title: "Pathfinder 2e - Abomination Vaults",
      gm: "Mike the Mastermind",
      system: "Pathfinder 2e",
      players: "3/4",
      date: "Tomorrow, 6 PM",
      description: "Delve into a haunted dungeon beneath the town of Otari.",
      tags: ["Horror", "Dungeon Crawl", "Advanced"]
    },
    {
      id: 3,
      title: "Call of Cthulhu - Dark Corners",
      gm: "Alex the Ancient",
      system: "Call of Cthulhu",
      players: "2/3",
      date: "Friday, 8 PM",
      description: "Investigate supernatural mysteries in 1920s Arkham.",
      tags: ["Horror", "Mystery", "Historical"]
    }
  ]

  const tabs = [
    { id: 'available-games', name: 'Available Games', icon: '🎲' },
    { id: 'post-game', name: 'Post Game', icon: '📝' },
    { id: 'my-games', name: 'My Games', icon: '👤' },
    { id: 'player-ratings', name: 'Player Ratings', icon: '⭐' },
    { id: 'community', name: 'Community', icon: '👥' },
    { id: 'events', name: 'Events', icon: '📅' }
  ]

  return (
    <div className="w-full h-full">
      {/* Hero Banner - MANDATORY structure from GUI spec */}
      <div className="relative overflow-hidden rounded-xl mb-6">
        <div 
          className="h-48 lg:h-64 bg-cover bg-center bg-no-repeat rounded-xl"
          style={{backgroundImage: "url('/BrokeUnicornTavern_HeroBanner.png')"}}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-brown-900/80 via-brown-800/60 to-brown-900/80"></div>
          
          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-center text-center p-6">
            <div>
              <h1 className="text-3xl lg:text-5xl font-bold text-white mb-2">
                Welcome to Broke Unicorn Tavern
              </h1>
              <p className="text-lg lg:text-xl text-tan-100 mb-4">
                Your social hub for game coordination, party formation, and community building
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-tan-600/80 text-white text-sm rounded-full">
                  🎲 Find Games
                </span>
                <span className="px-3 py-1 bg-tan-500/80 text-white text-sm rounded-full">
                  👥 Build Parties
                </span>
                <span className="px-3 py-1 bg-brown-600/80 text-white text-sm rounded-full">
                  ⭐ Rate Players
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 border-b border-brown-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-t-lg transition-all duration-200 hover:scale-105 ${
                activeTab === tab.id
                  ? 'bg-tan-600 text-brown-900 border-b-2 border-tan-400'
                  : 'text-brown-400 hover:text-tan-100 hover:bg-brown-800'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="text-sm font-medium">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'available-games' && (
          <div>
            <h2 className="text-2xl font-bold text-tan-100 mb-4">Available Games</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              {availableGames.map((game) => (
                <div key={game.id} className="bg-brown-800 border border-brown-700 rounded-lg p-4 shadow-lg hover:scale-105 transition-all duration-200">
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-tan-100 mb-1">{game.title}</h3>
                    <p className="text-sm text-brown-400 mb-1">GM: {game.gm}</p>
                    <p className="text-sm text-brown-400 mb-1">System: {game.system}</p>
                    <p className="text-sm text-tan-200 mb-2">Players: {game.players}</p>
                    <p className="text-sm text-brown-400 mb-1">Date: {game.date}</p>
                    <p className="text-sm text-tan-300 mb-3">{game.description}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {game.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-tan-600 text-white text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-tan-600 hover:bg-tan-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-all duration-200 hover:scale-105">
                      Join Game
                    </button>
                    <button className="bg-brown-700 hover:bg-brown-600 text-tan-100 text-sm font-medium py-2 px-3 rounded-lg transition-all duration-200 hover:scale-105">
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'post-game' && (
          <div className="bg-brown-800 border border-brown-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-tan-100 mb-6">Post a New Game</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-tan-100 mb-2">Game Title</label>
                <input
                  type="text"
                  className="w-full p-3 bg-brown-700 border border-brown-600 rounded-lg text-tan-100 placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-tan-500"
                  placeholder="Enter game title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-tan-100 mb-2">Game System</label>
                <select className="w-full p-3 bg-brown-700 border border-brown-600 rounded-lg text-tan-100 focus:outline-none focus:ring-2 focus:ring-tan-500">
                  <option>D&D 5e</option>
                  <option>Pathfinder 2e</option>
                  <option>Call of Cthulhu</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-tan-100 mb-2">Maximum Players</label>
                <input
                  type="number"
                  className="w-full p-3 bg-brown-700 border border-brown-600 rounded-lg text-tan-100 focus:outline-none focus:ring-2 focus:ring-tan-500"
                  placeholder="4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-tan-100 mb-2">Date & Time</label>
                <input
                  type="datetime-local"
                  className="w-full p-3 bg-brown-700 border border-brown-600 rounded-lg text-tan-100 focus:outline-none focus:ring-2 focus:ring-tan-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-tan-100 mb-2">Description</label>
                <textarea
                  rows={4}
                  className="w-full p-3 bg-brown-700 border border-brown-600 rounded-lg text-tan-100 placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-tan-500"
                  placeholder="Describe your game, setting, and what players can expect..."
                />
              </div>
              <div className="md:col-span-2">
                <button className="w-full bg-tan-600 hover:bg-tan-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105">
                  Post Game
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'my-games' && (
          <div className="bg-brown-800 border border-brown-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-tan-100 mb-6">My Games</h2>
            <div className="space-y-4">
              <div className="p-4 bg-brown-700 border border-brown-600 rounded-lg">
                <h3 className="text-lg font-bold text-tan-100 mb-2">D&D 5e - Lost Mine of Phandelver</h3>
                <p className="text-sm text-brown-400 mb-2">GM: Sarah the Storyteller</p>
                <p className="text-sm text-tan-200 mb-3">Players: 4/5</p>
                <div className="flex space-x-2">
                  <button className="bg-tan-600 hover:bg-tan-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105">
                    Manage Game
                  </button>
                  <button className="bg-brown-600 hover:bg-brown-500 text-tan-100 text-sm font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'player-ratings' && (
          <div className="bg-brown-800 border border-brown-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-tan-100 mb-6">Player Ratings</h2>
            <div className="space-y-4">
              <div className="p-4 bg-brown-700 border border-brown-600 rounded-lg">
                <h3 className="text-lg font-bold text-tan-100 mb-2">Rate a Player</h3>
                <p className="text-sm text-brown-400 mb-4">Share your experience playing with other members</p>
                <div className="flex space-x-2">
                  <button className="bg-tan-600 hover:bg-tan-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105">
                    Rate Player
                  </button>
                  <button className="bg-brown-600 hover:bg-brown-500 text-tan-100 text-sm font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105">
                    View Ratings
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'community' && (
          <div className="bg-brown-800 border border-brown-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-tan-100 mb-6">Community</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-brown-700 border border-brown-600 rounded-lg">
                <h3 className="text-lg font-bold text-tan-100 mb-2">Discussion Forums</h3>
                <p className="text-sm text-brown-400 mb-3">Join conversations about games, strategies, and more</p>
                <button className="bg-tan-600 hover:bg-tan-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105">
                  Browse Forums
                </button>
              </div>
              <div className="p-4 bg-brown-700 border border-brown-600 rounded-lg">
                <h3 className="text-lg font-bold text-tan-100 mb-2">Member Directory</h3>
                <p className="text-sm text-brown-400 mb-3">Find other players and GMs in your area</p>
                <button className="bg-tan-600 hover:bg-tan-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105">
                  Find Members
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="bg-brown-800 border border-brown-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-tan-100 mb-6">Events</h2>
            <div className="space-y-4">
              <div className="p-4 bg-brown-700 border border-brown-600 rounded-lg">
                <h3 className="text-lg font-bold text-tan-100 mb-2">Tavern Night</h3>
                <p className="text-sm text-brown-400 mb-2">Date: Saturday, 7 PM</p>
                <p className="text-sm text-tan-200 mb-3">Join us for a special evening of gaming and socializing</p>
                <div className="flex space-x-2">
                  <button className="bg-tan-600 hover:bg-tan-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105">
                    Join Event
                  </button>
                  <button className="bg-brown-600 hover:bg-brown-500 text-tan-100 text-sm font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
