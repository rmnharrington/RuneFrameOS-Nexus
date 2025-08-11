'use client'

import { useState, useEffect } from 'react'
import { FlaskConical, BookOpen, Zap, TrendingUp, Users, AlertTriangle, Star, Award, Flame, Plus, Heart, Share2 } from 'lucide-react'
import AppLayout from '../components/core/AppLayout'

// Mock data for demonstration
const mockIngredients = [
  { id: 1, name: 'Dragon\'s Breath Root', description: 'A fiery root that adds heat and potency to fire-based potions. Commonly used in strength and courage elixirs.', rarity: 'Rare', effects: ['Fire resistance', 'Strength boost', 'Heat generation'], commonUses: ['Strength potions', 'Fire resistance elixirs', 'Courage brews'] },
  { id: 2, name: 'Moonlight Essence', description: 'A silvery liquid that glows in darkness. Essential for night vision potions and lunar magic enhancement.', rarity: 'Uncommon', effects: ['Night vision', 'Lunar magic', 'Calming'], commonUses: ['Night vision tonics', 'Lunar magic enhancers', 'Calming draughts'] },
  { id: 3, name: 'Thunder Crystal', description: 'A crystalline substance that crackles with electricity. Used in lightning potions and speed enhancements.', rarity: 'Rare', effects: ['Speed boost', 'Lightning damage', 'Energy'], commonUses: ['Speed potions', 'Lightning damage brews', 'Energy elixirs'] },
  { id: 4, name: 'Phoenix Feather Ash', description: 'The remains of a phoenix feather, containing powerful regenerative properties.', rarity: 'Legendary', effects: ['Healing', 'Regeneration', 'Fire immunity'], commonUses: ['Healing salves', 'Regeneration potions', 'Fire immunity elixirs'] },
  { id: 5, name: 'Starlight Dew', description: 'Morning dew collected under starlight. Used in divination and wisdom potions.', rarity: 'Common', effects: ['Wisdom', 'Clarity', 'Divination'], commonUses: ['Wisdom potions', 'Clarity brews', 'Divination elixirs'] }
]

const mockRecipes = [
  { id: 1, name: 'Potion of Invisibility', ingredients: ['Moonlight Essence', 'Starlight Dew', 'Thunder Crystal'], difficulty: 'Hard', effects: 'Complete invisibility for 1 hour', description: 'A legendary potion that renders the drinker completely invisible to all forms of detection.' },
  { id: 2, name: 'Elixir of Strength', ingredients: ['Dragon\'s Breath Root', 'Phoenix Feather Ash'], difficulty: 'Medium', effects: 'Doubles physical strength for 30 minutes', description: 'A powerful brew that enhances the drinker\'s physical capabilities to superhuman levels.' },
  { id: 3, name: 'Night Vision Tonic', ingredients: ['Moonlight Essence', 'Starlight Dew'], difficulty: 'Easy', effects: 'Perfect night vision for 4 hours', description: 'A simple but effective potion that grants the ability to see clearly in complete darkness.' },
  { id: 4, name: 'Lightning Speed Brew', ingredients: ['Thunder Crystal', 'Dragon\'s Breath Root'], difficulty: 'Hard', effects: 'Triples movement speed for 15 minutes', description: 'An exhilarating potion that dramatically increases the drinker\'s speed and reflexes.' },
  { id: 5, name: 'Healing Salve', ingredients: ['Phoenix Feather Ash', 'Starlight Dew'], difficulty: 'Easy', effects: 'Restores 50% health over 1 minute', description: 'A gentle healing potion that gradually restores vitality and mends wounds.' }
]

const mockStats = {
  totalPotions: 15420,
  totalAlchemists: 892,
  blownUpAlchemists: 47,
  successRate: 94.7,
  activeCrafting: 23,
  todayProduction: 156
}

export default function DistillaraPage() {
  const [todaysRecipe, setTodaysRecipe] = useState(mockRecipes[0])
  const [todaysIngredient, setTodaysIngredient] = useState(mockIngredients[0])
  const [stats, setStats] = useState(mockStats)

  useEffect(() => {
    // Pick random recipe and ingredient for today
    const randomRecipe = mockRecipes[Math.floor(Math.random() * mockRecipes.length)]
    const randomIngredient = mockIngredients[Math.floor(Math.random() * mockIngredients.length)]
    
    setTodaysRecipe(randomRecipe)
    setTodaysIngredient(randomIngredient)
  }, [])

  const handleSettings = () => {
    console.log('Settings clicked')
  }

  const handleLogout = () => {
    console.log('Logout clicked')
  }

  const handleNavigate = (destination: string) => {
    console.log('Navigate to:', destination)
  }

  return (
    <AppLayout
      appName="Distillara"
      appType="distillara"
      userName="Master Alchemist"
      onSettings={handleSettings}
      onLogout={handleLogout}
      onNavigate={handleNavigate}
    >
      {/* Hero Section - Touch-friendly and prominent */}
      <section className="text-center mb-8">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-8 mb-6 shadow-xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Welcome to Distillara</h1>
          <p className="text-xl sm:text-2xl text-amber-100 mb-6">Master the Art of Alchemy</p>
          <button className="bg-white text-amber-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95">
            Start Crafting
          </button>
        </div>
      </section>

      {/* Today's Special Recipe - Large touch-friendly card */}
      <section className="mb-8">
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-amber-200">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center">
              <Star className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-amber-800">Today's Special Recipe</h2>
              <p className="text-amber-600">Featured creation of the day</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-300">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
              <div className="flex-1">
                <h3 className="text-2xl sm:text-3xl font-bold text-amber-800 mb-3">{todaysRecipe.name}</h3>
                <p className="text-gray-700 text-lg mb-4">{todaysRecipe.description}</p>
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                    Difficulty: {todaysRecipe.difficulty}
                  </span>
                  <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                    {todaysRecipe.effects}
                  </span>
                </div>
              </div>
              <div className="mt-4 lg:mt-0 lg:ml-6">
                <Award className="h-16 w-16 text-amber-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 border border-amber-200">
              <h4 className="font-semibold text-amber-800 mb-3 text-lg">Required Ingredients:</h4>
              <div className="flex flex-wrap gap-3">
                {todaysRecipe.ingredients.map((ingredient, index) => (
                  <span key={index} className="px-4 py-2 bg-amber-200 text-amber-900 rounded-full text-sm font-medium">
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex gap-3 mt-6">
              <button className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 active:scale-95">
                Craft This Potion
              </button>
              <button className="px-6 py-3 border-2 border-amber-300 text-amber-700 rounded-xl font-semibold hover:bg-amber-50 transition-all duration-200 active:scale-95">
                Save Recipe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Today's Special Ingredient - Large touch-friendly card */}
      <section className="mb-8">
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-orange-200">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
              <Flame className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-orange-800">Ingredient of the Day</h2>
              <p className="text-orange-600">Discover new materials</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-300">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
              <div className="flex-1">
                <h3 className="text-2xl sm:text-3xl font-bold text-orange-800 mb-3">{todaysIngredient.name}</h3>
                <p className="text-gray-700 text-lg mb-4">{todaysIngredient.description}</p>
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    todaysIngredient.rarity === 'Legendary' ? 'bg-red-100 text-red-800' :
                    todaysIngredient.rarity === 'Rare' ? 'bg-purple-100 text-purple-800' :
                    todaysIngredient.rarity === 'Uncommon' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {todaysIngredient.rarity}
                  </span>
                  <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                    {todaysIngredient.effects.length} effects
                  </span>
                </div>
              </div>
              <div className="mt-4 lg:mt-0 lg:ml-6">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center">
                  <FlaskConical className="h-10 w-10 text-white" />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-4 border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-3 text-lg">Effects:</h4>
                <ul className="space-y-2">
                  {todaysIngredient.effects.map((effect, index) => (
                    <li key={index} className="text-gray-700 flex items-center space-x-3">
                      <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                      <span>{effect}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-xl p-4 border border-red-200">
                <h4 className="font-semibold text-red-800 mb-3 text-lg">Common Uses:</h4>
                <ul className="space-y-2">
                  {todaysIngredient.commonUses.map((use, index) => (
                    <li key={index} className="text-gray-700 flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <span>{use}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex gap-3 mt-6">
              <button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 active:scale-95">
                Find This Ingredient
              </button>
              <button className="px-6 py-3 border-2 border-orange-300 text-orange-700 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-200 active:scale-95">
                Add to Collection
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Stats - Touch-friendly grid */}
      <section className="mb-8">
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-red-200">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-red-800">Distillara Dashboard</h2>
              <p className="text-red-600">Your alchemy progress</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-300 text-center">
              <div className="flex items-center justify-center mb-3">
                <FlaskConical className="h-10 w-10 text-amber-600" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-amber-800">{stats.totalPotions.toLocaleString()}</h3>
              <p className="text-sm text-gray-600">Total Potions Made</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-4 border border-orange-300 text-center">
              <div className="flex items-center justify-center mb-3">
                <Users className="h-10 w-10 text-orange-600" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-orange-800">{stats.totalAlchemists.toLocaleString()}</h3>
              <p className="text-sm text-gray-600">Total Alchemists</p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-4 border border-red-300 text-center">
              <div className="flex items-center justify-center mb-3">
                <AlertTriangle className="h-10 w-10 text-red-600" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-red-800">{stats.blownUpAlchemists}</h3>
              <p className="text-sm text-gray-600">Alchemists Blown Up</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-4 border border-green-300 text-center">
              <div className="flex items-center justify-center mb-3">
                <TrendingUp className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-green-800">{stats.successRate}%</h3>
              <p className="text-sm text-gray-600">Success Rate</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-300">
              <h4 className="font-semibold text-blue-800 mb-3 text-lg">Active Crafting</h4>
              <p className="text-4xl font-bold text-blue-600">{stats.activeCrafting}</p>
              <p className="text-gray-600">Potions currently being crafted</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-300">
              <h4 className="font-semibold text-purple-800 mb-3 text-lg">Today's Production</h4>
              <p className="text-4xl font-bold text-purple-600">{stats.todayProduction}</p>
              <p className="text-gray-600">Potions completed today</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95">
            <div className="flex items-center space-x-4">
              <Plus className="h-8 w-8" />
              <div className="text-left">
                <h3 className="text-xl font-bold">New Potion</h3>
                <p className="text-amber-100">Start crafting</p>
              </div>
            </div>
          </button>
          
          <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95">
            <div className="flex items-center space-x-4">
              <BookOpen className="h-8 w-8" />
              <div className="text-left">
                <h3 className="text-xl font-bold">Browse Recipes</h3>
                <p className="text-orange-100">Find inspiration</p>
              </div>
            </div>
          </button>
          
          <button className="bg-gradient-to-r from-red-500 to-purple-500 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95">
            <div className="flex items-center space-x-4">
              <Zap className="h-8 w-8" />
              <div className="text-left">
                <h3 className="text-xl font-bold">Crafting Lab</h3>
                <p className="text-red-100">Mix ingredients</p>
              </div>
            </div>
          </button>
        </div>
      </section>

      {/* Recent Recipes - Touch-friendly cards */}
      <section className="mb-8">
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-purple-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Recent Recipes</h2>
            <button className="text-purple-600 hover:text-purple-800 font-semibold">View All</button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockRecipes.slice(0, 4).map((recipe) => (
              <div key={recipe.id} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-5 border border-purple-200 hover:shadow-md transition-all duration-200">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-purple-800">{recipe.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    recipe.difficulty === 'Hard' ? 'bg-red-100 text-red-800' :
                    recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {recipe.difficulty}
                  </span>
                </div>
                <p className="text-gray-700 mb-4">{recipe.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{recipe.ingredients.length} ingredients</span>
                  <div className="flex space-x-2">
                    <button className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors">
                      <Heart className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AppLayout>
  )
}

