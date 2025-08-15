'use client'

import { useState } from 'react'

interface Campaign {
  id: string
  name: string
  system: string
  session: number
  playerCount: number
  level: number
  status: string
}

interface Player {
  id: string
  name: string
  character: string
  race: string
  class: string
  level: number
  hp: number
  maxHp: number
  ac: number
  campaign: string
}

const sampleCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'The Lost Mines of Phandelver',
    system: 'D&D 5e',
    session: 8,
    playerCount: 5,
    level: 4,
    status: 'Active'
  },
  {
    id: '2',
    name: 'Curse of Strahd',
    system: 'D&D 5e',
    session: 3,
    playerCount: 4,
    level: 3,
    status: 'Active'
  },
  {
    id: '3',
    name: 'Storm King\'s Thunder',
    system: 'D&D 5e',
    session: 12,
    playerCount: 6,
    level: 7,
    status: 'Active'
  }
]

const samplePlayers: Player[] = [
  {
    id: '1',
    name: 'Thorin Stonefist',
    character: 'Thorin Stonefist',
    race: 'Dwarf',
    class: 'Fighter',
    level: 4,
    hp: 32,
    maxHp: 42,
    ac: 18,
    campaign: 'The Lost Mines of Phandelver'
  },
  {
    id: '2',
    name: 'Lyra Nightshade',
    character: 'Lyra Nightshade',
    race: 'Elf',
    class: 'Rogue',
    level: 4,
    hp: 28,
    maxHp: 28,
    ac: 16,
    campaign: 'The Lost Mines of Phandelver'
  },
  {
    id: '3',
    name: 'Grimtooth',
    character: 'Grimtooth',
    race: 'Orc',
    class: 'Barbarian',
    level: 4,
    hp: 45,
    maxHp: 45,
    ac: 17,
    campaign: 'The Lost Mines of Phandelver'
  }
]

export default function CampaignDashboard() {
  const [activeView, setActiveView] = useState('campaigns')

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex space-x-2">
        {['campaigns', 'players', 'characters', 'inventories', 'dice', 'notes'].map((view) => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeView === view
                ? 'bg-gradient-to-r from-brown-600 to-tan-600 text-white shadow-lg'
                : 'bg-brown-800/50 text-tan-300 hover:bg-brown-700/70'
            }`}
          >
            {view === 'campaigns' && '🗺️ Campaigns'}
            {view === 'players' && '👥 World Travelers'}
            {view === 'characters' && '📋 Character Sheets'}
            {view === 'inventories' && '🎒 Inventories'}
            {view === 'dice' && '🎲 Dice Roller'}
            {view === 'notes' && '📝 GM Notes'}
          </button>
        ))}
      </div>

      {/* Campaigns View */}
      {activeView === 'campaigns' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-tan-100 text-shadow-brown">
              Your Campaigns
            </h2>
            <button className="bg-gradient-to-r from-brown-600 to-tan-600 hover:from-brown-700 hover:to-tan-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-brown">
              🆕 New Campaign
            </button>
          </div>
          
          {/* MANDATORY RESPONSIVE GRID PATTERN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {sampleCampaigns.map((campaign) => (
              <div key={campaign.id} className="campaign-card">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-brown-600 to-tan-600 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl">
                    🗺️
                  </div>
                  <h3 className="text-lg font-semibold text-tan-100 text-shadow-brown mb-1">
                    {campaign.name}
                  </h3>
                  <p className="text-sm text-tan-300">
                    {campaign.system} - Session {campaign.session}
                  </p>
                  <p className="text-xs text-tan-400 mt-1">
                    {campaign.playerCount} players, Level {campaign.level}
                  </p>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 py-2 bg-gradient-to-r from-campaign-600 to-dice-600 hover:from-campaign-700 hover:to-dice-700 text-white rounded text-sm transition-all duration-200">
                    📊 Manage
                  </button>
                  <button className="flex-1 py-2 bg-gradient-to-r from-tan-600 to-brown-600 hover:from-tan-700 hover:to-brown-700 text-white rounded text-sm transition-all duration-200">
                    👥 Players
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Players View */}
      {activeView === 'players' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-tan-100 text-shadow-brown">
              World Travelers
            </h2>
            <button className="bg-gradient-to-r from-campaign-600 to-dice-600 hover:from-campaign-700 hover:to-dice-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-campaign">
              👤 Add Player
            </button>
          </div>
          
          {/* MANDATORY RESPONSIVE GRID PATTERN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {samplePlayers.map((player) => (
              <div key={player.id} className="player-card">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-campaign-600 to-dice-600 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl">
                    👤
                  </div>
                  <h3 className="text-lg font-semibold text-tan-100 text-shadow-brown mb-1">
                    {player.name}
                  </h3>
                  <p className="text-sm text-tan-300">
                    {player.race} {player.class} - Level {player.level}
                  </p>
                  <p className="text-xs text-tan-400 mt-1">{player.campaign}</p>
                </div>
                
                {/* Player Stats */}
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                  <div className="bg-brown-800/50 rounded p-2 text-center">
                    <div className="text-tan-300">HP</div>
                    <div className="text-tan-100 font-bold">{player.hp}/{player.maxHp}</div>
                  </div>
                  <div className="bg-brown-800/50 rounded p-2 text-center">
                    <div className="text-tan-300">AC</div>
                    <div className="text-tan-100 font-bold">{player.ac}</div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 py-2 bg-gradient-to-r from-campaign-600 to-dice-600 hover:from-campaign-700 hover:to-dice-700 text-white rounded text-sm transition-all duration-200">
                    📋 Sheet
                  </button>
                  <button className="flex-1 py-2 bg-gradient-to-r from-tan-600 to-brown-600 hover:from-tan-700 hover:to-brown-700 text-white rounded text-sm transition-all duration-200">
                    🎒 Inventory
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Character Sheets View */}
      {activeView === 'characters' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-tan-100 text-shadow-brown">
            Character Sheets
          </h2>
          
          {/* MANDATORY RESPONSIVE GRID PATTERN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {samplePlayers.map((player) => (
              <div key={player.id} className="campaign-card">
                <div className="campaign-header">
                  <h3 className="text-xl font-semibold text-tan-100 text-shadow-brown">
                    {player.character}
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-tan-300 mb-1">Race & Class</div>
                      <div className="text-tan-100 font-semibold">{player.race} {player.class}</div>
                    </div>
                    <div>
                      <div className="text-tan-300 mb-1">Level</div>
                      <div className="text-tan-100 font-semibold">{player.level}</div>
                    </div>
                    <div>
                      <div className="text-tan-300 mb-1">HP</div>
                      <div className="text-tan-100 font-semibold">{player.hp}/{player.maxHp}</div>
                    </div>
                    <div>
                      <div className="text-tan-300 mb-1">AC</div>
                      <div className="text-tan-100 font-semibold">{player.ac}</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <button className="w-full py-2 bg-gradient-to-r from-campaign-600 to-dice-600 hover:from-campaign-700 hover:to-dice-700 text-white rounded text-sm transition-all duration-200">
                      📋 View Full Sheet
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inventories View */}
      {activeView === 'inventories' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-tan-100 text-shadow-brown">
            Player Inventories
          </h2>
          
          {/* MANDATORY RESPONSIVE GRID PATTERN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {samplePlayers.map((player) => (
              <div key={player.id} className="campaign-card">
                <div className="campaign-header">
                  <h3 className="text-xl font-semibold text-tan-100 text-shadow-brown">
                    {player.character}'s Gear
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-tan-300">Weapons</span>
                      <span className="text-tan-100 font-semibold">3 items</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-tan-300">Armor</span>
                      <span className="text-tan-100 font-semibold">2 items</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-tan-300">Consumables</span>
                      <span className="text-tan-100 font-semibold">5 items</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-tan-300">Treasure</span>
                      <span className="text-tan-100 font-semibold">8 items</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <button className="w-full py-2 bg-gradient-to-r from-tan-600 to-brown-600 hover:from-tan-700 hover:to-brown-700 text-white rounded text-sm transition-all duration-200">
                      🎒 View Full Inventory
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dice Roller View */}
      {activeView === 'dice' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-tan-100 text-shadow-brown">
            Dice Roller
          </h2>
          
          {/* MANDATORY RESPONSIVE GRID PATTERN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {/* Quick Dice */}
            <div className="campaign-card">
              <div className="campaign-header">
                <h3 className="text-xl font-semibold text-tan-100 text-shadow-brown">
                  Quick Dice
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4">
                  {['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'].map((die) => (
                    <button key={die} className="dice-button text-lg">
                      {die}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom Roll */}
            <div className="campaign-card">
              <div className="campaign-header">
                <h3 className="text-xl font-semibold text-tan-100 text-shadow-brown">
                  Custom Roll
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="e.g., 2d6+3"
                    className="w-full p-3 bg-brown-800/50 border border-tan-700/50 rounded-lg text-tan-100 placeholder-tan-400 focus:outline-none focus:ring-2 focus:ring-brown-500"
                  />
                  <button className="w-full py-3 bg-gradient-to-r from-dice-600 to-dice-700 hover:from-dice-700 hover:to-dice-800 text-white font-bold rounded-lg transition-all duration-200 shadow-dice">
                    🎲 Roll Dice
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GM Notes View */}
      {activeView === 'notes' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-tan-100 text-shadow-brown">
              GM Notes
            </h2>
            <button className="bg-gradient-to-r from-campaign-600 to-dice-600 hover:from-campaign-700 hover:to-dice-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-campaign">
              📝 New Note
            </button>
          </div>
          
          {/* MANDATORY RESPONSIVE GRID PATTERN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            <div className="gm-notes">
              <h3 className="text-lg font-semibold text-tan-100 text-shadow-campaign mb-3">
                Session 8 Notes
              </h3>
              <p className="text-sm text-tan-300 mb-3">
                Players explored the Redbrand hideout. Thorin took heavy damage from the bugbear. Need to prepare healing potions for next session.
              </p>
              <div className="text-xs text-tan-400">Campaign: The Lost Mines</div>
            </div>
            
            <div className="gm-notes">
              <h3 className="text-lg font-semibold text-tan-100 text-shadow-campaign mb-3">
                NPC Ideas
              </h3>
              <p className="text-sm text-tan-300 mb-3">
                Mysterious old wizard in the woods. Could be helpful or dangerous. Maybe knows about the lost mine's location.
              </p>
              <div className="text-xs text-tan-400">Campaign: The Lost Mines</div>
            </div>
            
            <div className="gm-notes">
              <h3 className="text-lg font-semibold text-tan-100 text-shadow-campaign mb-3">
                Encounter Planning
              </h3>
              <p className="text-sm text-tan-300 mb-3">
                Prepare goblin ambush on the road. 6 goblins with 2 hobgoblins. Should be challenging for level 4 party.
              </p>
              <div className="text-xs text-tan-400">Campaign: The Lost Mines</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
