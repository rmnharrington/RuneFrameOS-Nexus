'use client'

interface LeftSidebarProps {
  currentApp?: string
  showSidebar?: boolean
  onToggleSidebar?: () => void
}

export default function LeftSidebar({ 
  currentApp = 'Scriptoria',
  showSidebar = true,
  onToggleSidebar
}: LeftSidebarProps) {
  return (
    <aside className="w-full h-full bg-gradient-to-b from-slate-50 to-gray-100 border-r-2 border-slate-300/30 overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-slate-900 via-gray-900 to-slate-950 rounded-full flex items-center justify-center shadow-lg mx-auto mb-4">
            <img 
              src="/Scriptoria_Logos_IconOnly.png" 
              alt="Scriptoria Logo" 
              className="w-10 h-10 object-contain"
            />
          </div>
          <h2 className="text-xl font-bold text-slate-800">{currentApp}</h2>
          <p className="text-slate-600 text-sm">Gaming Library</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 mb-8">
          <button className="w-full text-left p-3 bg-slate-200/50 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors">
            <span className="font-medium">📚 Systems Library</span>
          </button>
          <button className="w-full text-left p-3 hover:bg-slate-200/50 text-slate-700 rounded-lg transition-colors">
            <span className="font-medium">🎲 Game Rules</span>
          </button>
          <button className="w-full text-left p-3 hover:bg-slate-200/50 text-slate-700 rounded-lg transition-colors">
            <span className="font-medium">⚔️ Combat Systems</span>
          </button>
          <button className="w-full text-left p-3 hover:bg-slate-200/50 text-slate-700 rounded-lg transition-colors">
            <span className="font-medium">🔮 Magic Systems</span>
          </button>
          <button className="w-full text-left p-3 hover:bg-slate-200/50 text-slate-700 rounded-lg transition-colors">
            <span className="font-medium">🏰 Settings</span>
          </button>
          <button className="w-full text-left p-3 hover:bg-slate-200/50 text-slate-700 rounded-lg transition-colors">
            <span className="font-medium">👥 Community</span>
          </button>
        </nav>

        {/* Quick Actions */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-600 mb-3">Quick Actions</h3>
          <button className="w-full p-3 bg-slate-200/50 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors">
            <span className="font-medium">➕ Add New System</span>
          </button>
          <button className="w-full p-3 bg-slate-200/50 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors">
            <span className="font-medium">📝 Create Ruleset</span>
          </button>
          <button className="w-full p-3 bg-slate-200/50 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors">
            <span className="font-medium">🔍 Search Library</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
