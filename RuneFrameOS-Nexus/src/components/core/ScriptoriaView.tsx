"use client"

import React from 'react'

export default function ScriptoriaView() {
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-600 to-gray-700 text-white p-4 shadow-lg">
        <div className="flex items-center space-x-3">
          <img 
            src="/scriptoria_logo_IconOnly.png" 
            alt="Scriptoria Logo" 
            className="w-8 h-8 object-contain"
          />
          <h1 className="text-2xl font-bold">Scriptoria</h1>
          <span className="text-slate-300 text-sm">Gaming Systems Library</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Sidebar */}
        <div className="w-48 bg-slate-800 text-white p-4 shadow-lg">
          <div className="space-y-4">
            <div className="text-center mb-6">
              <img 
                src="/scriptoria_logo_IconOnly.png" 
                alt="Scriptoria Icon" 
                className="w-16 h-16 mx-auto mb-2 object-contain"
              />
              <h3 className="text-sm font-semibold text-slate-200">Scriptoria</h3>
            </div>
            
            <nav className="space-y-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Gaming Systems
              </div>
              <a href="#" className="block px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                📚 Third-Party Publishers
              </a>
              <a href="#" className="block px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                ⚔️ Echeladon System
              </a>
              <a href="#" className="block px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                🏠 Homegrown Systems
              </a>
              <a href="#" className="block px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                ✨ User-Created Rulesets
              </a>
            </nav>

            <div className="pt-4 border-t border-slate-700">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Quick Actions
              </div>
              <button className="w-full px-3 py-2 text-sm bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors">
                🔍 Search Systems
              </button>
              <button className="w-full px-3 py-2 text-sm bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors mt-2">
                ➕ Add Ruleset
              </button>
            </div>
          </div>
        </div>

        {/* Center Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {/* Welcome Section */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                Welcome to Scriptoria
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Your comprehensive gaming systems library. Discover, explore, and contribute to a vast collection of tabletop RPG systems, rules, and mechanics.
              </p>
            </div>

            {/* Featured Systems Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Third-Party Publishers */}
              <div className="bg-white rounded-lg shadow-md p-6 border border-slate-200 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Third-Party Publishers</h3>
                <p className="text-slate-600 mb-4">Access to established systems like AD&D, GURPS, and more.</p>
                <div className="space-y-2 text-sm text-slate-500">
                  <div>• Advanced Dungeons & Dragons</div>
                  <div>• GURPS (Generic Universal RolePlaying)</div>
                  <div>• Pathfinder</div>
                  <div>• Call of Cthulhu</div>
                </div>
              </div>

              {/* Echeladon System */}
              <div className="bg-white rounded-lg shadow-md p-6 border border-slate-200 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">⚔️</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Echeladon System</h3>
                <p className="text-slate-600 mb-4">Bad Guy Gas's flagship gaming system with unique mechanics.</p>
                <div className="space-y-2 text-sm text-slate-500">
                  <div>• Core Rulebook</div>
                  <div>• Character Creation</div>
                  <div>• Combat Mechanics</div>
                  <div>• Magic System</div>
                </div>
              </div>

              {/* Homegrown Systems */}
              <div className="bg-white rounded-lg shadow-md p-6 border border-slate-200 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">🏠</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Homegrown Systems</h3>
                <p className="text-slate-600 mb-4">Community-created and indie gaming systems.</p>
                <div className="space-y-2 text-sm text-slate-500">
                  <div>• Shadowforge</div>
                  <div>• Neon Dreams</div>
                  <div>• Mystic Realms</div>
                  <div>• Custom Creations</div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                  <div className="text-2xl">📝</div>
                  <div className="flex-1">
                    <div className="font-medium text-slate-800">New House Rules Added</div>
                    <div className="text-sm text-slate-500">Echeladon Combat Overhaul v2.1</div>
                  </div>
                  <div className="text-xs text-slate-400">2 hours ago</div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                  <div className="text-2xl">🎲</div>
                  <div className="flex-1">
                    <div className="font-medium text-slate-800">System Updated</div>
                    <div className="text-sm text-slate-500">GURPS Lite 4e - Latest Edition</div>
                  </div>
                  <div className="text-xs text-slate-400">1 day ago</div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                  <div className="text-2xl">✨</div>
                  <div className="flex-1">
                    <div className="font-medium text-slate-800">New Contribution</div>
                    <div className="text-sm text-slate-500">Shadowforge: Urban Fantasy Rules</div>
                  </div>
                  <div className="text-xs text-slate-400">3 days ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
