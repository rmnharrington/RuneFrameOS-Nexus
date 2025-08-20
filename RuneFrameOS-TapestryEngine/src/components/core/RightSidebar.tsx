'use client'

export default function RightSidebar() {
  return (
    <div className="h-full bg-gradient-to-b from-stone-900 via-gold-900 to-stone-900 border-l border-stone-700/50 p-4">
      {/* Active Campaign Info */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gold-100 text-shadow-gold mb-3">
          Active Campaign
        </h3>
        <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-4 border border-stone-700/50">
          <div className="text-center mb-3">
            <div className="w-16 h-16 bg-gradient-to-r from-gold-600 to-stone-600 rounded-full mx-auto mb-2 flex items-center justify-center text-2xl">
              🗺️
            </div>
            <h4 className="font-semibold text-gold-100 text-shadow-stone">Shadow of the Ancients</h4>
            <p className="text-xs text-gold-300">Fantasy Campaign - Active</p>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-stone-800/50 rounded p-2 text-center">
              <div className="text-gold-300">Sessions</div>
              <div className="text-gold-100 font-bold">12</div>
            </div>
            <div className="bg-stone-800/50 rounded p-2 text-center">
              <div className="text-gold-300">NPCs</div>
              <div className="text-gold-100 font-bold">28</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Story Tools */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gold-100 text-shadow-gold mb-3">
          Story Tools
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <button className="dice-button text-xs">
            🗺️ Campaigns
          </button>
          <button className="dice-button text-xs">
            📖 Stories
          </button>
          <button className="dice-button text-xs">
            👥 NPCs
          </button>
          <button className="dice-button text-xs">
            🎣 Hooks
          </button>
          <button className="dice-button text-xs">
            🌍 Worlds
          </button>
          <button className="dice-button text-xs">
            🎭 Scenes
          </button>
        </div>
      </div>

      {/* Recent Creations */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gold-100 text-shadow-gold mb-3">
          Recent Creations
        </h3>
        <div className="space-y-2">
          <div className="bg-stone-800/50 rounded p-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gold-300">Eldric the Sage</span>
              <span className="text-gold-100 font-bold">2 hours ago</span>
            </div>
            <div className="text-gold-400">NPC - Shadow of the Ancients</div>
          </div>
          <div className="bg-stone-800/50 rounded p-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gold-300">The Lost Temple</span>
              <span className="text-gold-100 font-bold">Yesterday</span>
            </div>
            <div className="text-gold-400">Location - Shadow of the Ancients</div>
          </div>
        </div>
      </div>

      {/* Engine Status */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gold-100 text-shadow-gold mb-3">
          Engine Status
        </h3>
        <div className="bg-gradient-to-br from-character-800/50 to-dice-900/50 rounded-lg p-4 border border-character-700/50">
          <div className="text-center">
            <div className="text-3xl mb-2">⚙️</div>
            <div className="text-sm text-character-200 mb-2">Active</div>
            <div className="text-xs text-character-300">3 campaigns running</div>
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
            🗺️ New Campaign
          </button>
          <button className="w-full p-2 bg-gradient-to-r from-character-700 to-dice-700 rounded-lg text-xs text-white hover:from-character-600 hover:to-dice-700 transition-all duration-200">
            👥 Create NPC
          </button>
          <button className="w-full p-2 bg-gradient-to-r from-stone-700 to-gold-700 rounded-lg text-xs text-gold-100 hover:from-stone-600 hover:to-gold-700 transition-all duration-200">
            🎣 Generate Hook
          </button>
        </div>
      </div>
    </div>
  )
}
