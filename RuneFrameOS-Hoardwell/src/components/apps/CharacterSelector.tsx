'use client'

import { useState } from 'react'
import { ChevronDown, Plus, User } from 'lucide-react'

interface Character {
  id: string
  name: string
  level: number
  class: string
  system: string
  avatar?: string
}

export default function CharacterSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCharacter, setSelectedCharacter] = useState<Character>({
    id: '1',
    name: 'Character 1',
    level: 5,
    class: 'Fighter',
    system: 'D&D 5e'
  })

  const characters: Character[] = [
    { id: '1', name: 'Character 1', level: 5, class: 'Fighter', system: 'D&D 5e' },
    { id: '2', name: 'Character 2', level: 3, class: 'Wizard', system: 'D&D 5e' },
    { id: '3', name: 'Character 3', level: 7, class: 'Rogue', system: 'Pathfinder 2e' },
  ]

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character)
    setIsOpen(false)
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 fantasy-font">Character Inventory</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors">
          <Plus size={20} />
          <span>Add Character</span>
        </button>
      </div>

      {/* Character Selection Bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          {/* Character Tabs */}
          {characters.map((character) => (
            <button
              key={character.id}
              onClick={() => handleCharacterSelect(character)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                selectedCharacter.id === character.id
                  ? 'bg-amber-100 border-2 border-amber-400 text-amber-900'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <User size={20} />
              <span className="font-medium">{character.name}</span>
            </button>
          ))}

          {/* Add Character Button */}
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
            <Plus size={20} />
            <span>+</span>
          </button>
        </div>

        {/* Active Character Info */}
        <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-amber-900">
            <span className="font-semibold">Active:</span> {selectedCharacter.name} - Level {selectedCharacter.level} {selectedCharacter.class} ({selectedCharacter.system})
          </p>
        </div>
      </div>
    </div>
  )
}
