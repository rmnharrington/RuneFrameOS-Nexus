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
    <aside className="hidden lg:block w-[320px] h-screen bg-gradient-to-b from-orange-50 to-red-50 border-l-2 border-orange-300/30 fixed right-0 top-20 z-40 overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-lg font-fantasy font-bold text-orange-800">Crafting Menu & Controls</h2>
          <p className="text-sm text-orange-600/70">Manage your alchemical endeavors</p>
        </div>

        {/* Active Recipes */}
        <section className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <FlaskConical className="w-5 h-5 text-orange-600" />
            <h3 className="font-semibold text-orange-800">Active Recipes</h3>
          </div>
          <div className="space-y-3">
            {activeRecipes.map((recipe) => (
              <div key={recipe.id} className="bg-white/60 rounded-lg p-3 border border-orange-200/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-orange-700 text-sm">{recipe.name}</span>
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
        <section className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <BookOpen className="w-5 h-5 text-orange-600" />
            <h3 className="font-semibold text-orange-800">Material Requirements</h3>
          </div>
          <div className="space-y-2">
            {materialRequirements.map((material, index) => (
              <div key={index} className="bg-white/60 rounded-lg p-3 border border-orange-200/30">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-orange-700 text-sm">{material.name}</span>
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
        <section className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <Clock className="w-5 h-5 text-orange-600" />
            <h3 className="font-semibold text-orange-800">Crafting Queue</h3>
          </div>
          <div className="space-y-2">
            {craftingQueue.map((item) => (
              <div key={item.id} className="bg-white/60 rounded-lg p-3 border border-orange-200/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-orange-700 text-sm">{item.name}</span>
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
        <section className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <SettingsIcon className="w-5 h-5 text-orange-600" />
            <h3 className="font-semibold text-orange-800">Quality Settings</h3>
          </div>
          <div className="bg-white/60 rounded-lg p-3 border border-orange-200/30">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-orange-700">Crafting Precision</label>
                <select className="w-full mt-1 p-2 text-sm border border-orange-200/30 rounded bg-white/80">
                  <option>Standard (85%)</option>
                  <option>Precise (92%)</option>
                  <option>Masterwork (98%)</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-orange-700">Quality Focus</label>
                <select className="w-full mt-1 p-2 text-sm border border-orange-200/30 rounded bg-white/80">
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
          <div className="flex items-center space-x-2 mb-3">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            <h3 className="font-semibold text-orange-800">Quick Actions</h3>
          </div>
          <div className="space-y-2">
            <button className="w-full p-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg transition-all duration-200 hover:scale-105 shadow-md text-sm font-medium flex items-center justify-center space-x-2">
              <Play className="w-4 h-4" />
              <span>Start Crafting</span>
            </button>
            <button className="w-full p-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-lg transition-all duration-200 hover:scale-105 shadow-md text-sm font-medium flex items-center justify-center space-x-2">
              <Pause className="w-4 h-4" />
              <span>Pause Queue</span>
            </button>
            <button className="w-full p-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all duration-200 hover:scale-105 shadow-md text-sm font-medium flex items-center justify-center space-x-2">
              <Trash2 className="w-4 h-4" />
              <span>Clear Queue</span>
            </button>
          </div>
        </section>
      </div>
    </aside>
  )
}
