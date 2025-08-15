'use client'

import { useState } from 'react'

interface Character {
  id: string
  name: string
  race: string
  class: string
  level: number
  system: string
}

interface Template {
  id: string
  name: string
  system: string
  description: string
  source: string
}

const sampleCharacters: Character[] = [
  {
    id: '1',
    name: 'Thorin Stonefist',
    race: 'Dwarf',
    class: 'Fighter',
    level: 5,
    system: 'D&D 5e'
  },
  {
    id: '2',
    name: 'Lyra Nightshade',
    race: 'Elf',
    class: 'Rogue',
    level: 3,
    system: 'D&D 5e'
  },
  {
    id: '3',
    name: 'Grimtooth',
    race: 'Orc',
    class: 'Barbarian',
    level: 7,
    system: 'Pathfinder 2e'
  }
]

const sampleTemplates: Template[] = [
  {
    id: '1',
    name: 'D&D 5e Character Sheet',
    system: 'Dungeons & Dragons 5e',
    description: 'Standard character sheet for D&D 5th edition',
    source: 'Scriptoria'
  },
  {
    id: '2',
    name: 'Pathfinder 2e Sheet',
    system: 'Pathfinder 2nd Edition',
    description: 'Comprehensive character sheet for Pathfinder 2e',
    source: 'Scriptoria'
  },
  {
    id: '3',
    name: 'Call of Cthulhu 7e',
    system: 'Call of Cthulhu 7th Edition',
    description: 'Investigator sheet for CoC 7e',
    source: 'Scriptoria'
  }
]

export default function CharacterDashboard() {
  const [activeView, setActiveView] = useState('characters')

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex space-x-2">
        {['characters', 'templates', 'dice', 'scriptoria'].map((view) => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeView === view
                ? 'bg-gradient-to-r from-gold-600 to-stone-600 text-white shadow-lg'
                : 'bg-stone-800/50 text-gold-300 hover:bg-stone-700/70'
            }`}
          >
            {view === 'characters' && '👤 Characters'}
            {view === 'templates' && '📋 Templates'}
            {view === 'dice' && '🎲 Dice Roller'}
            {view === 'scriptoria' && '📚 Scriptoria'}
          </button>
        ))}
      </div>

      {/* Characters View */}
      {activeView === 'characters' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gold-100 text-shadow-gold">
              Your Characters
            </h2>
            <button className="bg-gradient-to-r from-gold-600 to-stone-600 hover:from-gold-700 hover:to-stone-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-gold">
              🆕 New Character
            </button>
          </div>
          
          {/* MANDATORY RESPONSIVE GRID PATTERN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {sampleCharacters.map((character) => (
              <div key={character.id} className="character-card">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-gold-600 to-stone-600 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl">
                    👤
                  </div>
                  <h3 className="text-lg font-semibold text-gold-100 text-shadow-stone mb-1">
                    {character.name}
                  </h3>
                  <p className="text-sm text-gold-300">
                    {character.race} {character.class} - Level {character.level}
                  </p>
                  <p className="text-xs text-gold-400 mt-1">{character.system}</p>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 py-2 bg-gradient-to-r from-character-600 to-dice-600 hover:from-character-700 hover:to-dice-700 text-white rounded text-sm transition-all duration-200">
                    📝 Edit
                  </button>
                  <button className="flex-1 py-2 bg-gradient-to-r from-stone-600 to-gold-600 hover:from-stone-700 hover:to-gold-700 text-white rounded text-sm transition-all duration-200">
                    🎲 Roll
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Templates View */}
      {activeView === 'templates' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gold-100 text-shadow-gold">
              Character Templates
            </h2>
            <button className="bg-gradient-to-r from-character-600 to-dice-600 hover:from-character-700 hover:to-dice-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-character">
              🔄 Refresh from Scriptoria
            </button>
          </div>
          
          {/* MANDATORY RESPONSIVE GRID PATTERN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {sampleTemplates.map((template) => (
              <div key={template.id} className="template-card">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-character-600 to-dice-600 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl">
                    📋
                  </div>
                  <h3 className="text-lg font-semibold text-character-100 text-shadow-character mb-1">
                    {template.name}
                  </h3>
                  <p className="text-sm text-character-300 mb-2">
                    {template.system}
                  </p>
                  <p className="text-xs text-character-400">
                    {template.description}
                  </p>
                </div>
                
                <div className="text-center">
                  <button className="w-full py-2 bg-gradient-to-r from-dice-600 to-character-600 hover:from-dice-700 hover:to-character-700 text-white rounded text-sm transition-all duration-200 shadow-dice">
                    📥 Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dice Roller View */}
      {activeView === 'dice' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gold-100 text-shadow-gold">
            Dice Roller
          </h2>
          
          {/* MANDATORY RESPONSIVE GRID PATTERN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {/* Quick Dice */}
            <div className="character-sheet">
              <div className="character-sheet-header">
                <h3 className="text-xl font-semibold text-gold-100 text-shadow-gold">
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
            <div className="character-sheet">
              <div className="character-sheet-header">
                <h3 className="text-xl font-semibold text-gold-100 text-shadow-gold">
                  Custom Roll
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="e.g., 2d6+3"
                    className="w-full p-3 bg-stone-800/50 border border-stone-700/50 rounded-lg text-gold-100 placeholder-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
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

      {/* Scriptoria View */}
      {activeView === 'scriptoria' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gold-100 text-shadow-gold">
            Scriptoria Connection
          </h2>
          
          {/* MANDATORY RESPONSIVE GRID PATTERN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            <div className="character-sheet">
              <div className="character-sheet-header">
                <h3 className="text-xl font-semibold text-gold-100 text-shadow-gold">
                  Gaming Library Status
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-600 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl">
                      ✅
                    </div>
                    <h4 className="text-lg font-semibold text-gold-100 mb-2">Connected</h4>
                    <p className="text-sm text-gold-300">Successfully connected to Scriptoria</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl">
                      📚
                    </div>
                    <h4 className="text-lg font-semibold text-gold-100 mb-2">Templates Available</h4>
                    <p className="text-sm text-gold-300">3 character sheet templates ready</p>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <button className="bg-gradient-to-r from-character-600 to-dice-600 hover:from-character-700 hover:to-dice-700 text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-character">
                    🔄 Sync with Scriptoria
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
