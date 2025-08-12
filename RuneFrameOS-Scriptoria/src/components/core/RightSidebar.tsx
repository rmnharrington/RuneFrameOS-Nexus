'use client'

interface RightSidebarProps {
  appType?: string
  showStats?: boolean
  onToggleStats?: () => void
}

export default function RightSidebar({ 
  appType = 'gaming-library',
  showStats = true,
  onToggleStats
}: RightSidebarProps) {
  return (
    <aside className="w-full h-full bg-gradient-to-b from-gray-100 to-slate-200 border-l-2 border-gray-300/30 overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-gray-900 via-slate-900 to-gray-950 rounded-full flex items-center justify-center shadow-lg mx-auto mb-3">
            <img 
              src="/Scriptoria_Logos_IconOnly.png" 
              alt="Scriptoria Logo" 
              className="w-7 h-7 object-contain"
            />
          </div>
          <h2 className="text-lg font-bold text-gray-800">System Monitor</h2>
          <p className="text-gray-600 text-sm">Library Status</p>
        </div>

        {/* System Status */}
        <div className="space-y-4 mb-6">
          <div className="bg-white/70 rounded-lg p-4 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Library Status</h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">All Systems Operational</span>
            </div>
          </div>
          
          <div className="bg-white/70 rounded-lg p-4 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Last Updated</h3>
            <p className="text-sm text-gray-600">2 minutes ago</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-3 mb-6">
          <h3 className="text-sm font-semibold text-gray-700">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/70 rounded-lg p-3 border border-gray-200 text-center">
              <div className="text-lg font-bold text-gray-800">12</div>
              <div className="text-xs text-gray-600">Systems</div>
            </div>
            <div className="bg-white/70 rounded-lg p-3 border border-gray-200 text-center">
              <div className="text-lg font-bold text-gray-800">8</div>
              <div className="text-xs text-gray-600">Rulesets</div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-700">Recent Activity</h3>
          <div className="space-y-2">
            <div className="bg-white/70 rounded-lg p-3 border border-gray-200">
              <p className="text-xs text-gray-600">New ruleset added</p>
              <p className="text-sm text-gray-800 font-medium">Combat Overhaul: AD&D</p>
            </div>
            <div className="bg-white/70 rounded-lg p-3 border border-gray-200">
              <p className="text-xs text-gray-600">System updated</p>
              <p className="text-sm text-gray-800 font-medium">Echeladon Core v1.2</p>
            </div>
            <div className="bg-white/70 rounded-lg p-3 border border-gray-200">
              <p className="text-xs text-gray-600">User contribution</p>
              <p className="text-sm text-gray-800 font-medium">House Rules: Echeladon</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
