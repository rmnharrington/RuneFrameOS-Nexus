'use client'

import AppLayout from '@/components/core/AppLayout'

export default function ScriptoriaPage() {
  const appName = 'Scriptoria'
  const appType = 'gaming-library'
  const userName = 'Game Master'

  return (
    <AppLayout appName={appName} appType={appType} userName={userName} appIcon="/Scriptoria_Logos_IconOnly.png">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="text-center py-8">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <img
              src="/Scriptoria_Logos_IconOnly.png"
              alt="Scriptoria Logo"
              className="w-16 h-16 lg:w-20 lg:h-20 object-contain"
            />
            <h1 className="text-4xl lg:text-5xl font-bold text-yellow-800 fantasy-font">
              Welcome to Scriptoria
            </h1>
          </div>
          <p className="text-lg lg:text-xl text-yellow-700 max-w-3xl mx-auto">
            Your comprehensive gaming systems library featuring Third-Party Publishers, 
            the Echeladon system, Homegrown systems, and user-created rulesets.
          </p>
        </div>

        {/* Gaming Systems Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          
          {/* Third-Party Publishers */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border-2 border-blue-200/50 shadow-lg">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Third-Party Publishers</h2>
            <div className="space-y-4">
              <div className="bg-white/70 rounded-lg p-4 border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-700">Advanced Dungeons & Dragons</h3>
                <p className="text-blue-600 text-sm">Copyright © Wizards of the Coast</p>
                <p className="text-blue-600 text-sm mt-2">The classic tabletop RPG system</p>
              </div>
              <div className="bg-white/70 rounded-lg p-4 border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-700">GURPS</h3>
                <p className="text-blue-600 text-sm">Copyright © Steve Jackson Games</p>
                <p className="text-blue-600 text-sm mt-2">Generic Universal RolePlaying System</p>
              </div>
            </div>
          </div>

          {/* Echeladon System */}
          <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-xl p-6 border-2 border-purple-200/50 shadow-lg">
            <h2 className="text-2xl font-bold text-purple-800 mb-4">Echeladon System</h2>
            <div className="space-y-4">
              <div className="bg-white/70 rounded-lg p-4 border border-purple-200">
                <h3 className="text-lg font-semibold text-purple-700">Echeladon Core</h3>
                <p className="text-purple-600 text-sm">Copyright © Bad Guy Gas</p>
                <p className="text-purple-600 text-sm mt-2">Our flagship gaming system</p>
              </div>
              <div className="bg-white/70 rounded-lg p-4 border border-purple-200">
                <h3 className="text-lg font-semibold text-purple-700">Echeladon: Fantasy</h3>
                <p className="text-purple-600 text-sm">Copyright © Bad Guy Gas</p>
                <p className="text-purple-600 text-sm mt-2">Fantasy setting expansion</p>
              </div>
            </div>
          </div>

          {/* Homegrown Systems */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border-2 border-green-200/50 shadow-lg">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Homegrown Systems</h2>
            <div className="space-y-4">
              <div className="bg-white/70 rounded-lg p-4 border border-green-200">
                <h3 className="text-lg font-semibold text-green-700">Shadowforge</h3>
                <p className="text-green-600 text-sm">Copyright © Bad Guy Gas</p>
                <p className="text-green-600 text-sm mt-2">Steampunk adventure system</p>
              </div>
              <div className="bg-white/70 rounded-lg p-4 border border-green-200">
                <h3 className="text-lg font-semibold text-green-700">Neon Dreams</h3>
                <p className="text-green-600 text-sm">Copyright © Bad Guy Gas</p>
                <p className="text-green-600 text-sm mt-2">Cyberpunk narrative system</p>
              </div>
              <div className="bg-white/70 rounded-lg p-4 border border-green-200">
                <h3 className="text-lg font-semibold text-green-700">Mystic Realms</h3>
                <p className="text-green-600 text-sm">Copyright © Bad Guy Gas</p>
                <p className="text-green-600 text-sm mt-2">Modern urban fantasy</p>
              </div>
            </div>
          </div>

          {/* User-Created Rulesets */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-xl p-6 border-2 border-amber-200/50 shadow-lg">
            <h2 className="text-2xl font-bold text-amber-800 mb-4">User-Created Rulesets</h2>
            <div className="space-y-4">
              <div className="bg-white/70 rounded-lg p-4 border border-amber-200">
                <h3 className="text-lg font-semibold text-amber-700">House Rules: Echeladon</h3>
                <p className="text-amber-600 text-sm">Created by: GM_Shadow</p>
                <p className="text-amber-600 text-sm mt-2">Custom magic system modifications</p>
              </div>
              <div className="bg-white/70 rounded-lg p-4 border border-amber-200">
                <h3 className="text-lg font-semibold text-amber-700">Combat Overhaul: AD&D</h3>
                <p className="text-amber-600 text-sm">Created by: BattleMaster</p>
                <p className="text-amber-600 text-sm mt-2">Enhanced tactical combat rules</p>
              </div>
            </div>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-gray-50 to-slate-100 rounded-xl p-6 border-2 border-gray-200/50">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
              Browse Systems
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
              Create Ruleset
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
              Import System
            </button>
            <button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
              Community Hub
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gradient-to-r from-slate-50 to-gray-100 rounded-xl p-6 border-2 border-slate-200/50">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Scriptoria Statistics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="bg-white/70 rounded-lg p-4 border border-slate-200 text-center">
              <div className="text-3xl font-bold text-slate-700">12</div>
              <div className="text-slate-600">Total Systems</div>
            </div>
            <div className="bg-white/70 rounded-lg p-4 border border-slate-200 text-center">
              <div className="text-3xl font-bold text-slate-700">8</div>
              <div className="text-slate-600">User Rulesets</div>
            </div>
            <div className="bg-white/70 rounded-lg p-4 border border-slate-200 text-center">
              <div className="text-3xl font-bold text-slate-700">156</div>
              <div className="text-slate-600">Total Rules</div>
            </div>
            <div className="bg-white/70 rounded-lg p-4 border border-slate-200 text-center">
              <div className="text-3xl font-bold text-slate-700">24</div>
              <div className="text-slate-600">Active Users</div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
