"use client"

import React, { useState } from 'react'

interface AvailableModule {
  id: string
  name: string
  description: string
  icon: string
  price: number
  currency: string
  isFree: boolean
  category: string
  features: string[]
}

interface ModuleSubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
  onSubscribe: (modules: AvailableModule[]) => void
}

// Helper function to get image name for each module
const getModuleImage = (moduleId: string): string => {
  const imageMap: { [key: string]: string } = {
    'broke-unicorn-tavern': 'BrokeUnicornTavern',
    'persona-vault': 'PersonaVault',
    'scriptoria': 'Scriptoria',
    'distillara': 'Distillara',
    'feastwell': 'Feastwell',
    'hoardwell': 'Hoardwell',
    'rulesmith-ai': 'RulesmithAI',
    'loreforge': 'LoreForge',
    'mercatrix': 'Mercatrix',
    'tapestry-engine': 'TapestryEngine',
    'travelers-table': 'TravelersTable',
    'echeladon': 'Echeladon',
    'rune-weaver': 'RuneWeaver',
    'necrotic-arcanum': 'NecroticArcanum'
  }
  return imageMap[moduleId] || 'Default'
}

const availableModules: AvailableModule[] = [
  {
    id: 'broke-unicorn-tavern',
    name: 'Broke Unicorn Tavern',
    description: 'Social hub & in-game gathering place for Travelers.',
    icon: '🏰',
    price: 0,
    currency: 'USD',
    isFree: true,
    category: 'Social',
    features: ['Party chat', 'Event planning', 'Character meetups', 'Tavern games']
  },
  {
    id: 'persona-vault',
    name: 'PersonaVault',
    description: 'Character binder where all Traveler characters are stored and linked to accounts.',
    icon: '👤',
    price: 0,
    currency: 'USD',
    isFree: true,
    category: 'Character Management',
    features: ['Unlimited characters', 'Character linking', 'Profile customization', 'Achievement tracking']
  },
  {
    id: 'scriptoria',
    name: 'Scriptoria',
    description: 'Comprehensive gaming systems library featuring Third-Party Publishers, Echeladon systems, Homegrown systems, and user-created rulesets.',
    icon: '📚',
    price: 0,
    currency: 'USD',
    isFree: true,
    category: 'Gaming Systems Library',
    features: ['Third-party publisher systems', 'Echeladon gaming systems', 'Homegrown rule sets', 'User-created house rules', 'Custom gaming systems', 'Ruleset sharing & collaboration']
  },
  {
    id: 'distillara',
    name: 'Distillara',
    description: 'Advanced alchemy crafting system with rarity tiers, economy, and failure mechanics.',
    icon: '🧪',
    price: 2.99,
    currency: 'USD',
    isFree: false,
    category: 'Crafting',
    features: ['Alchemy recipes', 'Rarity system', 'Economy simulation', 'Failure mechanics']
  },
  {
    id: 'feastwell',
    name: 'Feastwell',
    description: 'Cooking and recipe management system with immersive flavor text and game mechanics.',
    icon: '🍽️',
    price: 1.99,
    currency: 'USD',
    isFree: false,
    category: 'Cooking',
    features: ['Recipe database', 'Flavor system', 'Nutrition tracking', 'Meal planning']
  },
  {
    id: 'hoardwell',
    name: 'Hoardwell',
    description: 'Intelligent, immersive inventory management.',
    icon: '💎',
    price: 1.99,
    currency: 'USD',
    isFree: false,
    category: 'Inventory',
    features: ['Smart categorization', 'Weight tracking', 'Value estimation', 'Loot management']
  },
  {
    id: 'rulesmith-ai',
    name: 'Rulesmith AI',
    description: 'AI-powered rule generation and game mechanics assistance for Game Masters.',
    icon: '🤖',
    price: 2.99,
    currency: 'USD',
    isFree: false,
    category: 'AI Assistant',
    features: ['Rule generation', 'Balance suggestions', 'Mechanic design', 'AI consultation']
  },
  {
    id: 'cryptwell',
    name: 'Cryptwell',
    description: 'Undead/necromancy management and lore repository.',
    icon: '💀',
    price: 1.99,
    currency: 'USD',
    isFree: false,
    category: 'Lore & Management',
    features: ['Undead tracking', 'Necromancy rules', 'Lore database', 'Ritual management']
  },
  {
    id: 'loreforge',
    name: 'Loreforge',
    description: 'Campaign world and lore creation tool for Architects.',
    icon: '🌍',
    price: 2.99,
    currency: 'USD',
    isFree: false,
    category: 'World Building',
    features: ['Map creation', 'Lore writing', 'Timeline tools', 'Character relationships']
  },
  {
    id: 'mercatrix',
    name: 'Mercatrix',
    description: 'Barter, trade, and merchant system with economy simulation.',
    icon: '💰',
    price: 1.99,
    currency: 'USD',
    isFree: false,
    category: 'Economy',
    features: ['Barter system', 'Trade routes', 'Market simulation', 'Currency management']
  },
  {
    id: 'tapestry-engine',
    name: 'Tapestry Engine',
    description: 'Advanced storytelling and narrative management system.',
    icon: '📖',
    price: 2.99,
    currency: 'USD',
    isFree: false,
    category: 'Storytelling',
    features: ['Plot tracking', 'Character arcs', 'Story beats', 'Narrative tools']
  },
  {
    id: 'travelers-table',
    name: 'Travelers Table',
    description: 'Virtual tabletop with integrated tools for remote gaming.',
    icon: '🎲',
    price: 2.99,
    currency: 'USD',
    isFree: false,
    category: 'Virtual Tabletop',
    features: ['Dice rolling', 'Map sharing', 'Character sheets', 'Voice chat']
  }
]

export default function ModuleSubscriptionModal({ isOpen, onClose, onSubscribe }: ModuleSubscriptionModalProps) {
  const [selectedModules, setSelectedModules] = useState<AvailableModule[]>([])

  // Add debugging
  console.log('🔍 ModuleSubscriptionModal render - isOpen:', isOpen)
  console.log('🔍 ModuleSubscriptionModal render - selectedModules:', selectedModules)

  const handleModuleToggle = (module: AvailableModule) => {
    setSelectedModules(prev => {
      const isSelected = prev.find(m => m.id === module.id)
      if (isSelected) {
        return prev.filter(m => m.id !== module.id)
      } else {
        return [...prev, module]
      }
    })
  }

  const handleSubscribe = () => {
    onSubscribe(selectedModules)
    setSelectedModules([])
  }

  const getTotalPrice = () => {
    return selectedModules.reduce((total, module) => total + module.price, 0)
  }

  const getSelectedCount = () => selectedModules.length

  if (!isOpen) {
    console.log('🔍 Modal not open, returning null')
    return null
  }

  console.log('🔍 Modal is open, rendering content')

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Module Marketplace</h2>
              <p className="text-slate-100 mt-1">Select multiple modules to add to your dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Selection Counter */}
              <div className="bg-white/20 px-4 py-2 rounded-lg">
                <span className="text-white font-semibold">
                  {getSelectedCount()} module{getSelectedCount() !== 1 ? 's' : ''} selected
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white text-2xl p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableModules.map((module) => {
              const isSelected = selectedModules.find(m => m.id === module.id)
              return (
                <div 
                  key={module.id} 
                  className={`relative overflow-hidden rounded-xl border-2 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer ${
                    isSelected 
                      ? 'border-blue-500 shadow-lg scale-105' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                  onClick={() => handleModuleToggle(module)}
                  style={{
                    backgroundImage: `url('/${getModuleImage(module.id)}.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  {/* Dark Overlay for Readability */}
                  <div className="absolute inset-0 bg-black/50"></div>
                  
                  {/* Content with relative positioning for overlay */}
                  <div className="relative z-10 h-full flex flex-col">
                    {/* Selection Indicator */}
                    <div className="flex justify-end mb-2">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        isSelected 
                          ? 'bg-blue-500 border-blue-600' 
                          : 'bg-white/80 border-white/60'
                      }`}>
                        {isSelected && <span className="text-white text-sm">✓</span>}
                      </div>
                    </div>

                    {/* Module Header */}
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-3">{module.icon}</div>
                      <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">{module.name}</h3>
                      <p className="text-sm text-slate-200 mb-3 drop-shadow-lg">{module.description}</p>
                      
                      {/* Price */}
                      <div className="mb-4">
                        {module.isFree ? (
                          <div className="text-2xl font-bold text-green-300 drop-shadow-lg">FREE</div>
                        ) : (
                          <div className="text-2xl font-bold text-white drop-shadow-lg">
                            ${module.price}
                            <span className="text-sm text-slate-200 ml-1">/month</span>
                          </div>
                        )}
                      </div>

                      {/* Category Badge */}
                      <div className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-medium rounded-full mb-4 border border-white/30">
                        {module.category}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-white mb-2 text-sm drop-shadow-lg">Features:</h4>
                      <ul className="space-y-1">
                        {module.features.map((feature, index) => (
                          <li key={index} className="text-xs text-slate-200 flex items-center drop-shadow-lg">
                            <span className="text-green-300 mr-2">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Selection Status */}
                    <div className="text-center mt-auto">
                      <span className={`text-sm font-medium drop-shadow-lg ${
                        isSelected ? 'text-blue-300' : 'text-slate-200'
                      }`}>
                        {isSelected ? '✓ Selected' : 'Click to select'}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer with Bulk Actions */}
        <div className="bg-gray-50 p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {getSelectedCount() > 0 && (
                <span className="font-medium">
                  Total: ${getTotalPrice().toFixed(2)}/month for {getSelectedCount()} module{getSelectedCount() !== 1 ? 's' : ''}
                </span>
              )}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setSelectedModules([])}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                disabled={getSelectedCount() === 0}
              >
                Clear Selection
              </button>
              <button
                onClick={handleSubscribe}
                disabled={getSelectedCount() === 0}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  getSelectedCount() > 0
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {getSelectedCount() > 0 
                  ? `Add ${getSelectedCount()} Module${getSelectedCount() !== 1 ? 's' : ''}` 
                  : 'Select Modules'
                }
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">
            All modules include updates and support. Pricing may change. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  )
}
