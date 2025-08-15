'use client'

export default function LeftSidebar() {
  return (
    <aside className="w-48 lg:w-56 h-full bg-brown-900 border-r-2 border-tan-600 shadow-lg flex flex-col">
      <div className="p-3 lg:p-4 h-full flex flex-col">
        {/* Header - MANDATORY structure from GUI spec */}
        <div className="mb-4 lg:mb-6 text-center">
          <div className="w-10 h-10 lg:w-12 lg:h-12 mx-auto rounded-full flex items-center justify-center shadow-lg mb-2 bg-gradient-to-br from-tan-400 to-tan-600">
            <img 
              src="/BGG_logo_light.png" 
              alt="Broke Unicorn Tavern"
              className="w-6 h-6 lg:w-8 lg:h-8 object-contain"
            />
          </div>
          <h3 className="text-sm lg:text-base font-semibold text-tan-100">
            Navigation
          </h3>
          <p className="text-xs text-brown-400">
            Choose your path
          </p>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1 lg:space-y-2">
          {[
            { name: 'Available Games', icon: '🎲', active: true },
            { name: 'Post Game', icon: '📝', active: false },
            { name: 'My Games', icon: '👤', active: false },
            { name: 'Community', icon: '👥', active: false },
            { name: 'Events', icon: '📅', active: false }
          ].map((item) => (
            <button
              key={item.name}
              className={`w-full flex items-center space-x-2 p-2 lg:p-3 rounded-lg text-left transition-all duration-200 ${
                item.active
                  ? 'bg-tan-600 text-brown-900 shadow-md'
                  : 'text-tan-200 hover:bg-brown-800 hover:text-tan-100'
              }`}
            >
              <span className="text-lg lg:text-xl">{item.icon}</span>
              <span className="text-xs lg:text-sm font-medium">{item.name}</span>
            </button>
          ))}
        </nav>

        {/* Quick Actions */}
        <div className="mt-auto pt-4 border-t border-brown-700">
          <h4 className="text-xs text-brown-400 mb-2 font-medium">Quick Actions</h4>
          <div className="space-y-1">
            <button className="w-full text-left p-2 text-xs text-tan-300 hover:text-tan-100 hover:bg-brown-800 rounded transition-colors">
              🔍 Search Games
            </button>
            <button className="w-full text-left p-2 text-xs text-tan-300 hover:text-tan-100 hover:bg-brown-800 rounded transition-colors">
              ⭐ Rate Players
            </button>
            <button className="w-full text-left p-2 text-xs text-tan-300 hover:text-tan-100 hover:bg-brown-800 rounded transition-colors">
              📊 View Stats
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
