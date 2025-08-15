'use client'

export default function RightSidebar() {
  return (
    <div className="h-full bg-gradient-to-b from-story-900 via-campaign-900 to-tapestry-900 border-l border-story-700/50 p-4">
      {/* Quick Actions Header */}
      <div className="mb-6 text-center">
        <h3 className="text-lg font-bold text-story-100 text-shadow-story mb-1">
          Quick Actions
        </h3>
        <p className="text-xs text-campaign-300 text-shadow-campaign">
          World Building Tools
        </p>
      </div>

      {/* Quick Action Buttons */}
      <div className="space-y-3">
        <button className="w-full p-3 bg-gradient-to-r from-tapestry-600 to-world-600 hover:from-tapestry-500 hover:to-world-500 text-white rounded-lg transition-all duration-200 hover:scale-105 shadow-lg">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🌍</span>
            <span className="text-sm font-medium">New World</span>
          </div>
        </button>

        <button className="w-full p-3 bg-gradient-to-r from-world-600 to-story-600 hover:from-world-500 hover:to-story-500 text-white rounded-lg transition-all duration-200 hover:scale-105 shadow-lg">
          <div className="flex items-center space-x-2">
            <span className="text-xl">📚</span>
            <span className="text-sm font-medium">New Campaign</span>
          </div>
        </button>

        <button className="w-full p-3 bg-gradient-to-r from-story-600 to-campaign-600 hover:from-story-500 hover:to-campaign-500 text-white rounded-lg transition-all duration-200 hover:scale-105 shadow-lg">
          <div className="flex items-center space-x-2">
            <span className="text-xl">👥</span>
            <span className="text-sm font-medium">New NPC</span>
          </div>
        </button>

        <button className="w-full p-3 bg-gradient-to-r from-campaign-600 to-tapestry-600 hover:from-campaign-500 hover:to-tapestry-500 text-white rounded-lg transition-all duration-200 hover:scale-105 shadow-lg">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🏰</span>
            <span className="text-sm font-medium">New Location</span>
          </div>
        </button>
      </div>

      {/* Status Section */}
      <div className="mt-8 p-3 bg-world-800/50 rounded-lg border border-world-700/30">
        <h4 className="text-sm font-medium text-tapestry-200 mb-2">Current Status</h4>
        <div className="space-y-2 text-xs text-tapestry-300">
          <div className="flex justify-between">
            <span>Active Worlds:</span>
            <span className="text-world-400">3</span>
          </div>
          <div className="flex justify-between">
            <span>Running Campaigns:</span>
            <span className="text-story-400">7</span>
          </div>
          <div className="flex justify-between">
            <span>Total NPCs:</span>
            <span className="text-campaign-400">42</span>
          </div>
          <div className="flex justify-between">
            <span>Locations:</span>
            <span className="text-tapestry-400">18</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6 p-3 bg-world-800/50 rounded-lg border border-world-700/30">
        <h4 className="text-sm font-medium text-tapestry-200 mb-2">Recent Activity</h4>
        <div className="space-y-2 text-xs text-tapestry-300">
          <div className="flex items-center space-x-2">
            <span className="text-world-400">🌍</span>
            <span>World "Eldoria" updated</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-story-400">📚</span>
            <span>Campaign "Shadow War" created</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-campaign-400">👥</span>
            <span>NPC "Captain Thorne" added</span>
          </div>
        </div>
      </div>
    </div>
  )
}

