import { 
  ChefHat, 
  BookOpen, 
  Clock, 
  Settings as SettingsIcon, 
  Play, 
  Pause, 
  Trash2, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Flame,
  Timer,
  Thermometer
} from 'lucide-react'

interface RightSidebarProps {
  appType?: string
}

export default function RightSidebar({ appType = "Feastwell" }: RightSidebarProps) {
  const activeRecipes = [
    { name: 'Spiced Venison Stew', time: '45 min', status: 'Simmering' },
    { name: 'Golden Honey Bread', time: '30 min', status: 'Baking' },
    { name: 'Herb Roasted Potatoes', time: '25 min', status: 'Ready' },
  ]

  const materialRequirements = [
    { item: 'Fresh Herbs', quantity: '2 bunches', status: 'Available' },
    { item: 'Quality Meat', quantity: '3 lbs', status: 'Low Stock' },
    { item: 'Rare Spices', quantity: '1 oz', status: 'Critical' },
  ]

  const cookingQueue = [
    { recipe: 'Elven Wine Sauce', priority: 'High', estimated: '20 min' },
    { recipe: 'Dwarven Ale Bread', priority: 'Medium', estimated: '40 min' },
    { recipe: 'Forest Berry Tart', priority: 'Low', estimated: '35 min' },
  ]

  return (
    <aside className="fixed right-0 top-20 h-screen w-[320px] bg-gradient-to-b from-orange-900 via-red-900 to-red-950 border-l-2 border-orange-500/30 shadow-lg hidden lg:block">
      <div className="p-6">
        {/* App Type Header */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white font-fantasy mb-2">{appType}</h2>
          <p className="text-orange-200 text-sm">Kitchen Operations Center</p>
        </div>

        {/* Active Recipes Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 font-fantasy flex items-center">
            <Flame className="w-5 h-5 text-orange-400 mr-2" />
            Active Recipes
          </h3>
          <div className="space-y-3">
            {activeRecipes.map((recipe, index) => (
              <div key={index} className="bg-orange-800/30 rounded-lg p-3 border border-orange-600/30">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">{recipe.name}</h4>
                  <span className="text-orange-300 text-sm">{recipe.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-orange-200 text-sm">{recipe.status}</span>
                  <div className="flex space-x-2">
                    <button className="p-1 bg-orange-600/50 hover:bg-orange-500/50 rounded text-orange-200">
                      <Pause className="w-3 h-3" />
                    </button>
                    <button className="p-1 bg-red-600/50 hover:bg-red-500/50 rounded text-red-200">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Material Requirements Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 font-fantasy flex items-center">
            <BookOpen className="w-5 h-5 text-red-400 mr-2" />
            Material Requirements
          </h3>
          <div className="space-y-2">
            {materialRequirements.map((material, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-red-800/20 rounded">
                <span className="text-orange-200 text-sm">{material.item}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-orange-300 text-xs">{material.quantity}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    material.status === 'Available' ? 'bg-green-600/50 text-green-200' :
                    material.status === 'Low Stock' ? 'bg-yellow-600/50 text-yellow-200' :
                    'bg-red-600/50 text-red-200'
                  }`}>
                    {material.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cooking Queue Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 font-fantasy flex items-center">
            <Clock className="w-5 h-5 text-amber-400 mr-2" />
            Cooking Queue
          </h3>
          <div className="space-y-2">
            {cookingQueue.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-amber-800/20 rounded">
                <span className="text-orange-200 text-sm">{item.recipe}</span>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    item.priority === 'High' ? 'bg-red-600/50 text-red-200' :
                    item.priority === 'Medium' ? 'bg-yellow-600/50 text-yellow-200' :
                    'bg-green-600/50 text-green-200'
                  }`}>
                    {item.priority}
                  </span>
                  <span className="text-orange-300 text-xs">{item.estimated}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kitchen Status Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 font-fantasy flex items-center">
            <Thermometer className="w-5 h-5 text-red-400 mr-2" />
            Kitchen Status
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 bg-green-800/20 rounded border border-green-600/30">
              <span className="text-green-200 text-sm">Main Oven</span>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-green-300 text-xs">Ready</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-2 bg-yellow-800/20 rounded border border-yellow-600/30">
              <span className="text-yellow-200 text-sm">Prep Station</span>
              <div className="flex items-center space-x-2">
                <Timer className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-300 text-xs">In Use</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 font-fantasy">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            <button className="p-3 bg-orange-700/50 hover:bg-orange-600/50 rounded-lg transition-colors duration-200 text-white text-sm">
              <Play className="w-4 h-4 mx-auto mb-1" />
              Start Batch
            </button>
            <button className="p-3 bg-red-700/50 hover:bg-red-600/50 rounded-lg transition-colors duration-200 text-white text-sm">
              <SettingsIcon className="w-4 h-4 mx-auto mb-1" />
              Kitchen Setup
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
