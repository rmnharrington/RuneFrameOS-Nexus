'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface GamingSystem {
  id: string
  name: string
  genre: string
  diceSystem: string
  description: string
  publisher: string
  copyright: string
  isProprietary: boolean
  bannerImage?: string
  isActive: boolean
}

interface SystemContextType {
  activeSystem: GamingSystem | null
  setActiveSystem: (system: GamingSystem | null) => void
  availableSystems: GamingSystem[]
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const SystemContext = createContext<SystemContextType | undefined>(undefined)

export const useSystemContext = () => {
  const context = useContext(SystemContext)
  if (context === undefined) {
    throw new Error('useSystemContext must be used within a SystemProvider')
  }
  return context
}

interface SystemProviderProps {
  children: ReactNode
}

export const SystemProvider: React.FC<SystemProviderProps> = ({ children }) => {
  const [activeSystem, setActiveSystem] = useState<GamingSystem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const availableSystems: GamingSystem[] = [
    {
      id: 'echeladon',
      name: 'Echeladon',
      genre: 'Multi-Genre',
      diceSystem: 'Polyhedral System',
      description: 'Proprietary fantasy roleplaying system with deep lore and innovative mechanics',
      publisher: 'Proprietary',
      copyright: '© 2024 Echeladon Gaming',
      isProprietary: true,
      bannerImage: '/Echeladon_HeroBanner.png', // Echeladon banner
      isActive: false
    },
    {
      id: 'dnd5e',
      name: 'D&D 5e',
      genre: 'Fantasy',
      diceSystem: 'd20 System',
      description: 'Fifth edition of Dungeons & Dragons',
      publisher: 'Wizards of the Coast',
      copyright: '© 2014 Wizards of the Coast LLC',
      isProprietary: false,
      bannerImage: '/dnd5e-banner.png',
      isActive: false
    },
    {
      id: 'gurps',
      name: 'GURPS',
      genre: 'Multi-Genre',
      diceSystem: '3d6 System',
      description: 'Generic Universal RolePlaying System',
      publisher: 'Steve Jackson Games',
      copyright: '© 1986 Steve Jackson Games',
      isProprietary: false,
      bannerImage: '/gurps-banner.png',
      isActive: false
    },
    {
      id: 'adnd',
      name: 'AD&D',
      genre: 'Fantasy',
      diceSystem: 'd20 System',
      description: 'Advanced Dungeons & Dragons',
      publisher: 'Wizards of the Coast',
      copyright: '© 1977-2000 TSR, Inc.',
      isProprietary: false,
      bannerImage: '/adnd-banner.png',
      isActive: false
    },
    {
      id: 'cyberpunk',
      name: 'Cyberpunk',
      genre: 'Sci-Fi',
      diceSystem: 'd10 System',
      description: 'Cyberpunk roleplaying game',
      publisher: 'R. Talsorian Games',
      copyright: '© 1988 R. Talsorian Games',
      isProprietary: false,
      bannerImage: '/cyberpunk-banner.png',
      isActive: false
    }
  ]

  const handleSetActiveSystem = (system: GamingSystem | null) => {
    // Update active status for all systems
    const updatedSystems = availableSystems.map(sys => ({
      ...sys,
      isActive: sys.id === system?.id
    }))
    
    setActiveSystem(system)
    closeModal()
  }

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const value: SystemContextType = {
    activeSystem,
    setActiveSystem: handleSetActiveSystem,
    availableSystems,
    isModalOpen,
    openModal,
    closeModal
  }

  return (
    <SystemContext.Provider value={value}>
      {children}
    </SystemContext.Provider>
  )
}
