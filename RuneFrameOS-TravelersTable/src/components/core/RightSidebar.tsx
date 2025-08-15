'use client'

export default function RightSidebar() {
  return (
    <div className="h-full bg-gradient-to-b from-brown-900 via-tan-900 to-brown-900 border-l border-tan-700/50 p-4">
      {/* Active Campaign Info */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-tan-100 text-shadow-brown mb-3">
          Active Campaign
        </h3>
        <div className="bg-gradient-to-br from-brown-800/50 to-tan-900/50 rounded-lg p-4 border border-tan-700/50">
          <div className="text-center mb-3">
            <div className="w-16 h-16 bg-gradient-to-r from-brown-600 to-tan-600 rounded-full mx-auto mb-2 flex items-center justify-center text-2xl">
              🗺️
            </div>
            <h4 className="font-semibold text-tan-100 text-shadow-tan">The Lost Mines</h4>
            <p className="text-xs text-tan-300">D&D 5e - Session 8</p>
          </div>
          
          {/* Campaign Stats */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-brown-800/50 rounded p-2 text-center">
              <div className="text-tan-300">Players</div>
              <div className="text-tan-100 font-bold">5</div>
            </div>
            <div className="bg-brown-800/50 rounded p-2 text-center">
              <div className="text-tan-300">Level</div>
              <div className="text-tan-100 font-bold">4</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Dice Roller */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-tan-100 text-shadow-brown mb-3">
          Quick Dice
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <button className="dice-button text-xs">
            d20
          </button>
          <button className="dice-button text-xs">
            d12
          </button>
          <button className="dice-button text-xs">
            d10
          </button>
          <button className="dice-button text-xs">
            d8
          </button>
          <button className="dice-button text-xs">
            d6
          </button>
          <button className="dice-button text-xs">
            d4
          </button>
        </div>
      </div>

      {/* Active Players */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-tan-100 text-shadow-brown mb-3">
          Active Players
        </h3>
        <div className="space-y-2">
          <div className="bg-brown-800/50 rounded p-2 text-xs">
            <div className="flex justify-between">
              <span className="text-tan-300">Thorin</span>
              <span className="text-tan-100 font-bold">HP: 32/42</span>
            </div>
            <div className="text-tan-400">Dwarf Fighter</div>
          </div>
          <div className="bg-brown-800/50 rounded p-2 text-xs">
            <div className="flex justify-between">
              <span className="text-tan-300">Lyra</span>
              <span className="text-tan-100 font-bold">HP: 28/28</span>
            </div>
            <div className="text-tan-400">Elf Rogue</div>
          </div>
        </div>
      </div>

      {/* GM Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold text-tan-100 text-shadow-brown mb-3">
          GM Tools
        </h3>
        <div className="space-y-2">
          <button className="w-full p-2 bg-gradient-to-r from-brown-700 to-tan-700 rounded-lg text-xs text-tan-100 hover:from-brown-600 hover:to-tan-600 transition-all duration-200">
            📝 Session Notes
          </button>
          <button className="w-full p-2 bg-gradient-to-r from-campaign-700 to-dice-700 rounded-lg text-xs text-white hover:from-campaign-600 hover:to-dice-700 transition-all duration-200">
            🎭 NPC Generator
          </button>
          <button className="w-full p-2 bg-gradient-to-r from-tan-700 to-brown-700 rounded-lg text-xs text-tan-100 hover:from-tan-600 hover:to-brown-700 transition-all duration-200">
            🏰 Encounter Builder
          </button>
        </div>
      </div>
    </div>
  )
}
