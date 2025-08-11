'use client'

import { useState, useEffect } from 'react'
import { FlaskConical, BookOpen, Zap, TrendingUp, Users, AlertTriangle, Plus, Clock, Star } from 'lucide-react'
import AppLayout from '../components/core/AppLayout'

// Mock data for Distillara
const mockIngredients = [
  { id: 1, name: 'Dragon\'s Breath Root', description: 'A fiery root that adds heat and potency to fire-based potions. Commonly used in strength and courage elixirs.', rarity: 'Rare', effects: ['Fire resistance', 'Strength boost', 'Heat generation'] },
  { id: 2, name: 'Moonlight Essence', description: 'A silvery liquid that glows in darkness. Essential for night vision potions and lunar magic enhancement.', rarity: 'Uncommon', effects: ['Night vision', 'Lunar magic', 'Calming'] },
  { id: 3, name: 'Thunder Crystal', description: 'A crystalline substance that crackles with electricity. Used in lightning potions and speed enhancements.', rarity: 'Rare', effects: ['Speed boost', 'Lightning damage', 'Energy'] },
  { id: 4, name: 'Phoenix Feather Ash', description: 'The remains of a phoenix feather, containing powerful regenerative properties.', rarity: 'Legendary', effects: ['Healing', 'Regeneration', 'Fire immunity'] },
  { id: 5, name: 'Starlight Dew', description: 'Morning dew collected under starlight. Used in divination and wisdom potions.', rarity: 'Common', effects: ['Wisdom', 'Clarity', 'Divination'] }
]

const mockRecipes = [
  { id: 1, name: 'Potion of Invisibility', ingredients: ['Moonlight Essence', 'Starlight Dew', 'Thunder Crystal'], difficulty: 'Hard', effects: 'Complete invisibility for 1 hour' },
  { id: 2, name: 'Elixir of Strength', ingredients: ['Dragon\'s Breath Root', 'Phoenix Feather Ash'], difficulty: 'Medium', effects: 'Doubles physical strength for 30 minutes' },
  { id: 3, name: 'Night Vision Tonic', ingredients: ['Moonlight Essence', 'Starlight Dew'], difficulty: 'Easy', effects: 'Perfect night vision for 4 hours' },
  { id: 4, name: 'Lightning Speed Brew', ingredients: ['Thunder Crystal', 'Dragon\'s Breath Root'], difficulty: 'Hard', effects: 'Triples movement speed for 15 minutes' },
  { id: 5, name: 'Healing Salve', ingredients: ['Phoenix Feather Ash', 'Starlight Dew'], difficulty: 'Easy', effects: 'Restores 50% health over 1 minute' }
]

const mockStats = {
  totalPotions: 15420,
  totalAlchemists: 892,
  blownUpAlchemists: 47,
  successRate: 94.7,
  totalRecipes: 342
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
      userName="Master Alchemist"
      appIcon="/Distillara_Logos_IconOnly.png"
      appType="Distillara"
      onSettings={handleSettings}
      onLogout={handleLogout}
      onNavigate={handleNavigate}
    >
      {/* Main Content Area */}
      <div className="space-y-8">
        {/* Welcome Section */}
        <section className="text-center py-8">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full flex items-center justify-center shadow-lg">
                             <img 
                 src="/Distillara_Logos_IconOnly.png" 
                 alt="Distillara Logo" 
                 className="w-10 h-10 object-contain"
               />
            </div>
            <h1 className="text-4xl font-fantasy font-bold text-amber-800">Welcome to Distillara</h1>
          </div>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto">
            Master the ancient art of alchemy and potion crafting. Discover rare ingredients, 
            learn powerful recipes, and forge legendary elixirs that will change the course of your adventures.
          </p>
        </section>

        {/* Quick Actions */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-200 flex items-center space-x-4">
            <img 
              src="/Distillara_Logos_IconOnly.png" 
              alt="Distillara Logo" 
              className="w-8 h-8 object-contain"
            />
            <div className="text-left">
              <h3 className="text-xl font-bold">Start Crafting</h3>
              <p className="text-amber-100">Begin a new potion</p>
            </div>
          </button>
          
          <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-200 flex items-center space-x-4">
            <img 
              src="/Distillara_Logos_IconOnly.png" 
              alt="Distillara Logo" 
              className="w-8 h-8 object-contain"
            />
            <div className="text-left">
              <h3 className="text-xl font-bold">Browse Recipes</h3>
              <p className="text-orange-100">Discover new formulas</p>
            </div>
          </button>
          
          <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-200 flex items-center space-x-4">
            <img 
              src="/Distillara_Logos_IconOnly.png" 
              alt="Distillara Logo" 
              className="w-8 h-8 object-contain"
            />
            <div className="text-left">
              <h3 className="text-xl font-bold">View Progress</h3>
              <p className="text-red-100">Track your achievements</p>
            </div>
          </button>
        </section>

        {/* Ingredients Section */}
        <section className="bg-white/60 rounded-lg shadow-lg p-6 border border-amber-200/30">
          <div className="flex items-center space-x-3 mb-6">
            <img 
              src="/Distillara_Logos_IconOnly.png" 
              alt="Distillara Logo" 
              className="w-6 h-6 object-contain"
            />
            <h2 className="text-2xl font-bold text-amber-800">Featured Ingredients</h2>
          </div>
          <p className="text-gray-700 mb-6">
            Discover the mystical ingredients that power the art of alchemy. Each component holds unique properties 
            that can be combined to create powerful potions and elixirs.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-6">
            {mockIngredients.slice(0, 6).map((ingredient) => (
              <div key={ingredient.id} className="border border-amber-200/30 rounded-lg p-4 hover:shadow-md transition-all duration-200 bg-white/80">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-amber-800">{ingredient.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    ingredient.rarity === 'Legendary' ? 'bg-purple-100 text-purple-800' :
                    ingredient.rarity === 'Rare' ? 'bg-blue-100 text-blue-800' :
                    ingredient.rarity === 'Uncommon' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {ingredient.rarity}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{ingredient.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{ingredient.effects.length} effects</span>
                  <button className="text-xs text-amber-600 hover:text-amber-800 font-medium">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recipes Section */}
        <section className="bg-white/60 rounded-lg shadow-lg p-6 border border-amber-200/30">
          <div className="flex items-center space-x-3 mb-6">
            <img 
              src="/Distillara_Logos_IconOnly.png" 
              alt="Distillara Logo" 
              className="w-6 h-6 object-contain"
            />
            <h2 className="text-2xl font-bold text-amber-800">Popular Recipes</h2>
          </div>
          <p className="text-gray-700 mb-6">
            Master the ancient techniques of combining ingredients to create powerful potions. 
            Each recipe has been tested and refined by master alchemists.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-6">
            {mockRecipes.slice(0, 6).map((recipe) => (
              <div key={recipe.id} className="border border-amber-200/30 rounded-lg p-4 hover:shadow-md transition-all duration-200 bg-white/80">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-amber-800">{recipe.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    recipe.difficulty === 'Hard' ? 'bg-red-100 text-red-800' :
                    recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {recipe.difficulty}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{recipe.effects}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{recipe.ingredients.length} ingredients</span>
                  <button className="text-xs text-amber-600 hover:text-amber-800 font-medium">
                    Learn Recipe →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg shadow-lg p-6 border border-amber-300/50">
          <div className="flex items-center space-x-3 mb-6">
            <img 
              src="/Distillara_Logos_IconOnly.png" 
              alt="Distillara Logo" 
              className="w-6 h-6 object-contain"
            />
            <h2 className="text-2xl font-bold text-amber-800">Distillara Statistics</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-800">{stats.totalPotions.toLocaleString()}</div>
              <div className="text-sm text-amber-600">Potions Crafted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{stats.totalAlchemists}</div>
              <div className="text-sm text-green-600">Active Alchemists</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{stats.successRate}%</div>
              <div className="text-sm text-green-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">{stats.blownUpAlchemists}</div>
              <div className="text-sm text-red-600">Learning Experiences</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{stats.totalRecipes}</div>
              <div className="text-sm text-blue-600">Total Recipes</div>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  )
}
