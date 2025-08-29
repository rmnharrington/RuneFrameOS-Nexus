'use client'

import React from 'react'
import { useSystemContext, GamingSystem } from '@/contexts/SystemContext'

interface SystemCardProps {
  system: GamingSystem
  onSelect: (system: GamingSystem) => void
}

const SystemCard: React.FC<SystemCardProps> = ({ system, onSelect }) => {
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

  const getDiceIcon = (diceSystem: string) => {
    if (diceSystem.toLowerCase().includes('d20')) return '🎯'
    if (diceSystem.toLowerCase().includes('3d6')) return '🎲'
    if (diceSystem.toLowerCase().includes('d10')) return '🔟'
    if (diceSystem.toLowerCase().includes('polyhedral')) return '🎲'
    return '🎲'
  }

  return (
    <div className="bg-gradient-to-br from-stone-800/80 to-gold-900/80 rounded-lg p-4 border border-gold-700/50 hover:border-gold-500/70 transition-all duration-200 hover:shadow-lg hover:shadow-gold-500/20">
      <div className="text-center mb-3">
        <div className="text-3xl mb-2">{getGenreIcon(system.genre)}</div>
        <h3 className="text-xl font-bold text-gold-100 mb-1">{system.name}</h3>
        <div className="text-sm text-gold-300 mb-2">{system.genre}</div>
        <div className="text-sm text-gold-400 mb-3 flex items-center justify-center gap-2">
          <span>{getDiceIcon(system.diceSystem)}</span>
          <span>{system.diceSystem}</span>
        </div>
      </div>
      
      <div className="text-xs text-gold-400 text-center mb-3 leading-relaxed">
        {system.description}
      </div>
      
      <div className="text-xs text-gold-500 text-center mb-3">
        {system.copyright}
      </div>
      
      <div className="text-xs text-gold-600 text-center mb-4">
        Published by {system.publisher}
      </div>
      
      <button
        onClick={() => onSelect(system)}
        className="w-full bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-500 hover:to-gold-600 text-white font-semibold py-2 px-4 rounded transition-all duration-200 hover:shadow-md"
      >
        Select System
      </button>
    </div>
  )
}

const SystemSelectionModal: React.FC = () => {
  const { isModalOpen, closeModal, availableSystems, setActiveSystem } = useSystemContext()

  if (!isModalOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-stone-900 to-gold-950 rounded-xl border border-gold-700/50 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gold-700/50">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gold-100">Select Gaming System</h2>
            <button
              onClick={closeModal}
              className="text-gold-400 hover:text-gold-200 text-2xl font-bold hover:bg-gold-900/30 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            >
              ×
            </button>
          </div>
          <p className="text-gold-300 mt-2">
            Choose a gaming system to activate. Only content from the selected system will be displayed.
          </p>
        </div>
        
        {/* Systems Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableSystems.map((system) => (
              <SystemCard
                key={system.id}
                system={system}
                onSelect={setActiveSystem}
              />
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-6 border-t border-gold-700/50 text-center">
          <button
            onClick={closeModal}
            className="text-gold-400 hover:text-gold-200 font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default SystemSelectionModal
