"use client"

import React from 'react'

interface TavernViewProps {
  onReturnToNexus: () => void
}

export default function TavernView({ onReturnToNexus }: TavernViewProps) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="text-4xl">🏰</div>
          <div>
            <h1 className="text-2xl font-bold text-amber-800">Broke Unicorn Tavern</h1>
            <p className="text-amber-600">Social hub & in-game gathering place for Travelers</p>
          </div>
        </div>
        <button
          onClick={onReturnToNexus}
          className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-lg transition-all duration-200 hover:scale-105"
        >
          ← Back to Nexus
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/60 rounded-lg border border-amber-200 p-4">
          <h3 className="text-lg font-semibold text-amber-800 mb-3">Party Chat</h3>
          <p className="text-amber-700 text-sm">Connect with fellow Travelers in real-time chat rooms and private conversations.</p>
        </div>
        
        <div className="bg-white/60 rounded-lg border border-amber-200 p-4">
          <h3 className="text-lg font-semibold text-amber-800 mb-3">Event Planning</h3>
          <p className="text-amber-700 text-sm">Organize and join gaming sessions, tournaments, and social events.</p>
        </div>
        
        <div className="bg-white/60 rounded-lg border border-amber-200 p-4">
          <h3 className="text-lg font-semibold text-amber-800 mb-3">Character Meetups</h3>
          <p className="text-amber-700 text-sm">Find and connect with characters that complement your own for epic adventures.</p>
        </div>
        
        <div className="bg-white/60 rounded-lg border border-amber-200 p-4">
          <h3 className="text-lg font-semibold text-amber-800 mb-3">Tavern Games</h3>
          <p className="text-amber-700 text-sm">Enjoy classic tavern games and activities while building your reputation.</p>
        </div>
      </div>
    </div>
  )
}

// Sidebar component for the right panel
TavernView.Sidebar = function TavernSidebar({ onReturnToNexus }: { onReturnToNexus: () => void }) {
  return (
    <div className="h-full bg-gradient-to-b from-slate-50 to-blue-50 border-l-2 border-slate-300/30 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Tavern Tools</h3>
        
        {/* Quick Actions */}
        <div className="space-y-3 mb-6">
          <button className="w-full p-3 bg-white/60 hover:bg-white/80 border border-slate-200/50 hover:border-slate-300/70 rounded-lg transition-all duration-200 text-left">
            <div className="flex items-center space-x-3">
              <span className="text-xl">🎲</span>
              <div>
                <h4 className="font-medium text-slate-800">Roll Dice</h4>
                <p className="text-xs text-slate-600">Quick dice rolling</p>
              </div>
            </div>
          </button>
          
          <button className="w-full p-3 bg-white/60 hover:bg-white/80 border border-slate-200/50 hover:border-slate-300/70 rounded-lg transition-all duration-200 text-left">
            <div className="flex items-center space-x-3">
              <span className="text-xl">💬</span>
              <div>
                <h4 className="font-medium text-slate-800">Chat Rooms</h4>
                <p className="text-xs text-slate-600">Join conversations</p>
              </div>
            </div>
          </button>
          
          <button className="w-full p-3 bg-white/60 hover:bg-white/80 border border-slate-200/50 hover:border-slate-300/70 rounded-lg transition-all duration-200 text-left">
            <div className="flex items-center space-x-3">
              <span className="text-xl">📋</span>
              <div>
                <h4 className="font-medium text-slate-800">Mission Board</h4>
                <p className="text-xs text-slate-600">View available quests</p>
              </div>
            </div>
          </button>
        </div>

        {/* Return Button */}
        <button
          onClick={onReturnToNexus}
          className="w-full px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          ← Return to Nexus
        </button>
      </div>
    </div>
  )
}
