"use client"

import React from 'react'
import { 
  FlaskConical, 
  BookOpen, 
  Clock, 
  Settings as SettingsIcon,
  Play,
  Pause,
  Trash2,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'

interface RightSidebarProps {
  appType?: string
}

export default function RightSidebar({
  appType = "Distillara"
}: RightSidebarProps) {
  // Mock data for Distillara
  const activeRecipes = [
    { id: 1, name: 'Potion of Invisibility', progress: 75, timeLeft: '15 min' },
    { id: 2, name: 'Elixir of Strength', progress: 30, timeLeft: '45 min' }
  ]

  const materialRequirements = [
    { name: 'Moonlight Essence', required: 3, available: 2, status: 'insufficient' },
    { name: 'Dragon\'s Breath Root', required: 2, available: 5, status: 'sufficient' },
    { name: 'Thunder Crystal', required: 1, available: 1, status: 'sufficient' }
  ]

  const craftingQueue = [
    { id: 1, name: 'Night Vision Tonic', priority: 'high', estimatedTime: '2 hours' },
    { id: 2, name: 'Healing Salve', priority: 'medium', estimatedTime: '1 hour' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sufficient': return 'text-green-600'
      case 'insufficient': return 'text-red-600'
      default: return 'text-yellow-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sufficient': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'insufficient': return <AlertTriangle className="w-4 h-4 text-red-600" />
      default: return <AlertTriangle className="w-4 h-4 text-yellow-600" />
    }
  }

  return (
    <aside className="hidden lg:block w-64 h-screen bg-gradient-to-b from-orange-50 to-red-50 border-l-2 border-orange-300/30 fixed right-0 top-20 z-40 overflow-y-auto">
      <div className="p-3 lg:p-4">
        {/* Header */}
        <div className="mb-4 lg:mb-6 text-center">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-amber-900 via-orange-800 to-red-900 rounded-full flex items-center justify-center mx-auto mb-2 lg:mb-4 shadow-lg">
            <img
              src="/distillara_logo_IconOnly.png"
              alt="Distillara"
              className="w-7 h-7 lg:w-9 lg:h-9 object-contain"
            />
          </div>
          <h2 className="text-sm lg:text-base font-fantasy font-bold text-orange-800">Quick Actions</h2>
        </div>

        {/* Active Recipes */}
        <section className="mb-4 lg:mb-6">
          <div className="flex items-center space-x-2 mb-2 lg:mb-3">
            <FlaskConical className="w-4 h-4 lg:w-5 lg:h-5 text-orange-600" />
            <h3 className="font-semibold text-orange-800 text-sm lg:text-base">Active Recipes</h3>
          </div>
          <div className="space-y-2 lg:space-y-3">
            {activeRecipes.map((recipe) => (
              <div key={recipe.id} className="bg-white/60 rounded-lg p-2 lg:p-3 border border-orange-200/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-orange-700 text-xs lg:text-sm">{recipe.name}</span>
                  <span className="text-xs text-orange-600">{recipe.timeLeft}</span>
                </div>
                <div className="w-full bg-orange-200/30 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${recipe.progress}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-orange-600">{recipe.progress}% complete</span>
                  <div className="flex space-x-1">
                    <button className="p-1 hover:bg-orange-100 rounded transition-colors">
                      <Pause className="w-3 h-3 text-orange-600" />
                    </button>
                    <button className="p-1 hover:bg-orange-100 rounded transition-colors">
                      <Trash2 className="w-3 h-3 text-orange-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Material Requirements */}
        <section className="mb-4 lg:mb-6">
          <div className="flex items-center space-x-2 mb-2 lg:mb-3">
            <BookOpen className="w-4 h-4 lg:w-5 lg:h-5 text-orange-600" />
            <h3 className="font-semibold text-orange-800 text-sm lg:text-base">Material Requirements</h3>
          </div>
          <div className="space-y-1 lg:space-y-2">
            {materialRequirements.map((material, index) => (
              <div key={index} className="bg-white/60 rounded-lg p-2 lg:p-3 border border-orange-200/30">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-orange-700 text-xs lg:text-sm">{material.name}</span>
                  {getStatusIcon(material.status)}
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-orange-600">
                    {material.available}/{material.required}
                  </span>
                  <span className={`text-xs font-medium ${getStatusColor(material.status)}`}>
                    {material.status === 'sufficient' ? 'Ready' : 'Need More'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Crafting Queue */}
        <section className="mb-4 lg:mb-6">
          <div className="flex items-center space-x-2 mb-2 lg:mb-3">
            <Clock className="w-4 h-4 lg:w-5 lg:h-5 text-orange-600" />
            <h3 className="font-semibold text-orange-800 text-sm lg:text-base">Crafting Queue</h3>
          </div>
          <div className="space-y-1 lg:space-y-2">
            {craftingQueue.map((item) => (
              <div key={item.id} className="bg-white/60 rounded-lg p-2 lg:p-3 border border-orange-200/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-orange-700 text-xs lg:text-sm">{item.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.priority === 'high' 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {item.priority}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-orange-600">{item.estimatedTime}</span>
                  <div className="flex space-x-1">
                    <button className="p-1 hover:bg-orange-100 rounded transition-colors">
                      <Play className="w-3 h-3 text-orange-600" />
                    </button>
                    <button className="p-1 hover:bg-orange-100 rounded transition-colors">
                      <Trash2 className="w-3 h-3 text-orange-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quality Settings */}
        <section className="mb-4 lg:mb-6">
          <div className="flex items-center space-x-2 mb-2 lg:mb-3">
            <SettingsIcon className="w-4 h-4 lg:w-5 lg:h-5 text-orange-600" />
            <h3 className="font-semibold text-orange-800 text-sm lg:text-base">Quality Settings</h3>
          </div>
          <div className="bg-white/60 rounded-lg p-2 lg:p-3 border border-orange-200/30">
            <div className="space-y-2 lg:space-y-3">
              <div>
                <label className="text-xs lg:text-sm font-medium text-orange-700">Crafting Precision</label>
                <select className="w-full mt-1 p-1 lg:p-2 text-xs lg:text-sm border border-orange-200/30 rounded bg-white/80">
                  <option>Standard (85%)</option>
                  <option>Precise (92%)</option>
                  <option>Masterwork (98%)</option>
                </select>
              </div>
              <div>
                <label className="text-xs lg:text-sm font-medium text-orange-700">Quality Focus</label>
                <select className="w-full mt-1 p-1 lg:p-2 text-xs lg:text-sm border border-orange-200/30 rounded bg-white/80">
                  <option>Balanced</option>
                  <option>Efficiency</option>
                  <option>Quality</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <div className="flex items-center space-x-2 mb-2 lg:mb-3">
            <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-orange-600" />
            <h3 className="font-semibold text-orange-800 text-sm lg:text-base">Quick Actions</h3>
          </div>
          <div className="space-y-1 lg:space-y-2">
            <button className="w-full p-2 lg:p-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg transition-all duration-200 hover:scale-105 shadow-md text-xs lg:text-sm font-medium flex items-center justify-center space-x-2">
              <Play className="w-3 h-3 lg:w-4 lg:h-4" />
              <span>Start Crafting</span>
            </button>
            <button className="w-full p-2 lg:p-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-lg transition-all duration-200 hover:scale-105 shadow-md text-xs lg:text-sm font-medium flex items-center justify-center space-x-2">
              <Pause className="w-3 h-3 lg:w-4 lg:h-4" />
              <span>Pause Queue</span>
            </button>
            <button className="w-full p-2 lg:p-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all duration-200 hover:scale-105 shadow-md text-xs lg:text-sm font-medium flex items-center justify-center space-x-2">
              <Trash2 className="w-3 h-3 lg:w-4 lg:h-4" />
              <span>Clear Queue</span>
            </button>
          </div>
        </section>
      </div>
    </aside>
  )
}
