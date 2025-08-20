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
              ⚒️
            </div>
            <h4 className="font-semibold text-gold-100 text-shadow-stone">Eldara the Mystic</h4>
            <p className="text-xs text-gold-300">Elven Sage • Level 12</p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-stone-800/50 rounded p-2 text-center">
              <div className="text-gold-300">Personality</div>
              <div className="text-gold-100 font-bold">Wise</div>
            </div>
            <div className="bg-stone-800/50 rounded p-2 text-center">
              <div className="text-gold-300">Culture</div>
              <div className="text-gold-100 font-bold">Elven</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Character Stats */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gold-100 text-shadow-gold mb-3">Quick Stats</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-stone-800/50 rounded p-2 text-xs text-center">
            <div className="text-gold-300">Intelligence</div>
            <div className="text-gold-100 font-bold">18</div>
          </div>
          <div className="bg-stone-800/50 rounded p-2 text-xs text-center">
            <div className="text-gold-300">Wisdom</div>
            <div className="text-gold-100 font-bold">16</div>
          </div>
          <div className="bg-stone-800/50 rounded p-2 text-xs text-center">
            <div className="text-gold-300">Charisma</div>
            <div className="text-gold-100 font-bold">14</div>
          </div>
          <div className="bg-stone-800/50 rounded p-2 text-xs text-center">
            <div className="text-gold-300">Experience</div>
            <div className="text-gold-100 font-bold">85,000</div>
          </div>
        </div>
      </div>
      
      {/* Recent Forged Characters */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gold-100 text-shadow-gold mb-3">Recent Forged</h3>
        <div className="space-y-2">
          <div className="bg-stone-800/50 rounded p-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gold-300">Thorin Ironfist</span>
              <span className="text-gold-100 font-bold">Dwarf</span>
            </div>
            <div className="text-gold-400">Warrior • 2 min ago</div>
          </div>
          <div className="bg-stone-800/50 rounded p-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gold-300">Zara Nightshade</span>
              <span className="text-gold-100 font-bold">Human</span>
            </div>
            <div className="text-gold-400">Rogue • 5 min ago</div>
          </div>
        </div>
      </div>
      
      {/* AI Engine Status */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gold-100 text-shadow-gold mb-3">AI Engine</h3>
        <div className="bg-gradient-to-br from-character-800/50 to-dice-900/50 rounded-lg p-4 border border-character-700/50">
          <div className="text-center">
            <div className="text-3xl mb-2">🧠</div>
            <div className="text-sm character-200 mb-2">Active</div>
            <div className="text-xs character-300">Processing: 2 requests</div>
            <button className="mt-2 w-full py-1 px-2 bg-gradient-to-r from-character-600 to-dice-600 rounded text-xs text-white hover:from-character-500 hover:to-dice-500 transition-all duration-200">
              View Queue
            </button>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold text-gold-100 text-shadow-gold mb-3">Quick Actions</h3>
        <div className="space-y-2">
          <button className="w-full p-2 bg-gradient-to-r from-gold-700 to-stone-700 rounded-lg text-xs text-gold-100 hover:from-gold-600 hover:to-stone-600 transition-all duration-200">
            ⚒️ Forge NPC
          </button>
          <button className="w-full p-2 bg-gradient-to-r from-character-700 to-dice-700 rounded-lg text-xs text-white hover:from-character-600 hover:to-dice-700 transition-all duration-200">
            🎭 Random Traits
          </button>
          <button className="w-full p-2 bg-gradient-to-r from-stone-700 to-gold-700 rounded-lg text-xs text-gold-100 hover:from-stone-600 hover:to-gold-700 transition-all duration-200">
            📤 Export Character
          </button>
        </div>
      </div>
    </div>
  )
}


