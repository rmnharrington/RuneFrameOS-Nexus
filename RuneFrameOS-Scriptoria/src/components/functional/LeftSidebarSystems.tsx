'use client'

import React from 'react'
import { useSystemContext } from '@/contexts/SystemContext'

const LeftSidebarSystems: React.FC = () => {
  const { activeSystem, availableSystems, openModal } = useSystemContext()

  const getGenreIcon = (genre: string) => {
    switch (genre.toLowerCase()) {
      case 'fantasy':
        return '🐉'
      case 'sci-fi':
        return '🚀'
      case 'multi-genre':
        return '⚔️'
      default:
        return '🎲'
    }
  }

  return (
    <div className="space-y-2">
      {/* System Selection Button */}
      <button
        onClick={openModal}
        className="w-full bg-gradient-to-r from-gold-700/50 to-gold-800/50 hover:from-gold-600/50 hover:to-gold-700/50 text-gold-100 font-medium py-2 px-3 rounded border border-gold-600/50 hover:border-gold-500/70 transition-all duration-200 text-sm"
      >
        📚 Select System
      </button>
      
      {/* Active System Display */}
      {activeSystem && (
        <div className="bg-gradient-to-r from-gold-800/30 to-gold-900/30 rounded border border-gold-600/50 p-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{getGenreIcon(activeSystem.genre)}</span>
            <span className="text-gold-100 font-semibold text-sm">{activeSystem.name}</span>
          </div>
          <div className="text-xs text-gold-400 mb-1">{activeSystem.genre}</div>
          <div className="text-xs text-gold-500 mb-2">{activeSystem.diceSystem}</div>
          <div className="inline-block bg-gold-600/50 text-gold-100 text-xs px-2 py-1 rounded">
            Active
          </div>
        </div>
      )}
      
      {/* Available Systems List */}
      <div className="space-y-1">
        {availableSystems
          .filter(system => !system.isActive)
          .map((system) => (
            <div
              key={system.id}
              className="bg-stone-800/30 rounded border border-stone-600/30 p-2 hover:bg-stone-700/40 transition-colors cursor-pointer"
              onClick={() => openModal()}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">{getGenreIcon(system.genre)}</span>
                <span className="text-stone-300 font-medium text-sm">{system.name}</span>
              </div>
              <div className="text-xs text-stone-500 mt-1">{system.genre}</div>
              <div className="text-xs text-stone-600">{system.diceSystem}</div>
            </div>
          ))}
      </div>
      
      {/* No System Selected Message */}
      {!activeSystem && (
        <div className="text-center py-4">
          <div className="text-gold-400 text-sm mb-2">No system selected</div>
          <div className="text-gold-600 text-xs">Select a system to view content</div>
        </div>
      )}
    </div>
  )
}

export default LeftSidebarSystems
