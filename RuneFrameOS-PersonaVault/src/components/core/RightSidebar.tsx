'use client'

export default function RightSidebar() {
  return (
    <div className="h-full bg-gradient-to-b from-stone-900 via-gold-900 to-stone-900 border-l border-stone-700/50 p-4">
      {/* Active Character Info */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gold-100 text-shadow-gold mb-3">
          Active Character
        </h3>
        <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-4 border border-stone-700/50">
          <div className="text-center mb-3">
            <div className="w-16 h-16 bg-gradient-to-r from-gold-600 to-stone-600 rounded-full mx-auto mb-2 flex items-center justify-center text-2xl">
              🧙‍♂️
            </div>
            <h4 className="font-semibold text-gold-100 text-shadow-stone">Gandalf the Grey</h4>
            <p className="text-xs text-gold-300">Wizard - Level 15</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-stone-800/50 rounded p-2 text-center">
              <div className="text-gold-300">HP</div>
              <div className="text-gold-100 font-bold">127</div>
            </div>
            <div className="bg-stone-800/50 rounded p-2 text-center">
              <div className="text-gold-300">Level</div>
              <div className="text-gold-100 font-bold">15</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Dice Roller */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gold-100 text-shadow-gold mb-3">
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

      {/* Recent Activities */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gold-100 text-shadow-gold mb-3">
          Recent Activities
        </h3>
        <div className="space-y-2">
          <div className="bg-stone-800/50 rounded p-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gold-300">Character Created</span>
              <span className="text-gold-100 font-bold">New</span>
            </div>
            <div className="text-gold-400">Ranger - Level 1</div>
          </div>
          <div className="bg-stone-800/50 rounded p-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gold-300">Sheet Updated</span>
              <span className="text-gold-100 font-bold">Modified</span>
            </div>
            <div className="text-gold-400">Wizard gained new spell</div>
          </div>
        </div>
      </div>

      {/* Character Status */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gold-100 text-shadow-gold mb-3">
          Character Status
        </h3>
        <div className="bg-gradient-to-br from-character-800/50 to-dice-900/50 rounded-lg p-4 border border-character-700/50">
          <div className="text-center">
            <div className="text-3xl mb-2">📋</div>
            <div className="text-sm text-character-200 mb-2">24 Active Characters</div>
            <div className="text-xs text-character-300">Across 8 gaming systems</div>
            <button className="mt-2 w-full py-1 px-2 bg-gradient-to-r from-character-600 to-dice-600 rounded text-xs text-white hover:from-character-500 hover:to-dice-500 transition-all duration-200">
              View All
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold text-gold-100 text-shadow-gold mb-3">
          Quick Actions
        </h3>
        <div className="space-y-2">
          <button className="w-full p-2 bg-gradient-to-r from-gold-700 to-stone-700 rounded-lg text-xs text-gold-100 hover:from-gold-600 hover:to-stone-600 transition-all duration-200">
            ✨ Create Character
          </button>
          <button className="w-full p-2 bg-gradient-to-r from-character-700 to-dice-700 rounded-lg text-xs text-white hover:from-character-600 hover:to-dice-700 transition-all duration-200">
            📋 New Sheet
          </button>
          <button className="w-full p-2 bg-gradient-to-r from-stone-700 to-gold-700 rounded-lg text-xs text-gold-100 hover:from-stone-600 hover:to-gold-700 transition-all duration-200">
            🎭 Browse Templates
          </button>
        </div>
      </div>
    </div>
  )
}
