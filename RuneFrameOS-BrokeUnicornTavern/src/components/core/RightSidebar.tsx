'use client'

export default function RightSidebar() {
  return (
    <aside className="w-64 h-full bg-brown-900 border-l-2 border-tan-600 shadow-lg flex flex-col">
      <div className="p-3 lg:p-4 h-full flex flex-col">
        {/* Header - MANDATORY structure from GUI spec */}
        <div className="mb-4 lg:mb-6 text-center">
          <div className="w-10 h-10 lg:w-12 lg:h-12 mx-auto rounded-full flex items-center justify-center shadow-lg mb-2 bg-gradient-to-br from-tan-400 to-tan-600">
            <span className="text-lg lg:text-xl">📊</span>
          </div>
          <h3 className="text-sm lg:text-base font-semibold text-tan-100">
            Statistics
          </h3>
          <p className="text-xs text-brown-400">
            Live updates
          </p>
        </div>

        {/* Quick Stats */}
        <div className="space-y-3 mb-6">
          <div className="bg-brown-800 rounded-lg p-3 border border-brown-700">
            <div className="text-xs text-brown-400 mb-1">Online Players</div>
            <div className="text-lg font-bold text-tan-100">24</div>
            <div className="text-xs text-tan-400">+3 from yesterday</div>
          </div>
          
          <div className="bg-brown-800 rounded-lg p-3 border border-brown-700">
            <div className="text-xs text-brown-400 mb-1">Active Games</div>
            <div className="text-lg font-bold text-tan-100">8</div>
            <div className="text-xs text-tan-400">2 starting soon</div>
          </div>
          
          <div className="bg-brown-800 rounded-lg p-3 border border-brown-700">
            <div className="text-xs text-brown-400 mb-1">New Events</div>
            <div className="text-lg font-bold text-tan-100">3</div>
            <div className="text-xs text-tan-400">This week</div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="flex-1">
          <h4 className="text-xs text-brown-400 mb-3 font-medium">Recent Activity</h4>
          <div className="space-y-2">
            {[
              { text: 'New game posted: "Dragon Hunt"', time: '2m ago' },
              { text: 'Player joined: "ShadowMage"', time: '5m ago' },
              { text: 'Game completed: "Forest Quest"', time: '12m ago' },
              { text: 'New event: "Tavern Night"', time: '1h ago' }
            ].map((item, index) => (
              <div key={index} className="text-xs p-2 bg-brown-800/50 rounded border border-brown-700/50">
                <div className="text-tan-200">{item.text}</div>
                <div className="text-brown-400">{item.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-auto pt-4 border-t border-brown-700">
          <h4 className="text-xs text-brown-400 mb-2 font-medium">Quick Actions</h4>
          <div className="space-y-1">
            <button className="w-full text-left p-2 text-xs text-tan-300 hover:text-tan-100 hover:bg-brown-800 rounded transition-colors">
              📢 Post Announcement
            </button>
            <button className="w-full text-left p-2 text-xs text-tan-300 hover:text-tan-100 hover:bg-brown-800 rounded transition-colors">
              🎯 Create Event
            </button>
            <button className="w-full text-left p-2 text-xs text-tan-300 hover:text-tan-100 hover:bg-brown-800 rounded transition-colors">
              ⚙️ Settings
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
