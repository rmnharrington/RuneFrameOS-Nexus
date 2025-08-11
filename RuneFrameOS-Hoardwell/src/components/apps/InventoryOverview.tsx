'use client'

export default function InventoryOverview() {
  return (
    <div className="mb-8 space-y-6">
      {/* Inventory Overview Stats */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 fantasy-font">📊 Inventory Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">24</div>
            <div className="text-blue-800 text-sm">Total Items</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-600">45.2</div>
            <div className="text-green-800 text-sm">Total Weight (lbs)</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="text-2xl font-bold text-purple-600">1,250</div>
            <div className="text-purple-800 text-sm">Total Value (gp)</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="text-2xl font-bold text-orange-600">Medium</div>
            <div className="text-orange-800 text-sm">Encumbrance</div>
          </div>
        </div>
        
        {/* Status Alerts */}
        <div className="mt-4 flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-yellow-600">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-sm">3 items need repair</span>
          </div>
          <div className="flex items-center space-x-2 text-red-600">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-sm">1 item is cursed</span>
          </div>
        </div>
      </div>

      {/* Equipped Items */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 fantasy-font">🎒 Equipped Items</h3>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-lg border-2 border-gray-300 flex items-center justify-center mb-2 hover:border-amber-400 transition-colors cursor-pointer">
              <span className="text-2xl">🛡️</span>
            </div>
            <div className="text-xs text-gray-700 font-medium">Shield</div>
            <div className="text-xs text-gray-500">Left Hand</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-lg border-2 border-gray-300 flex items-center justify-center mb-2 hover:border-amber-400 transition-colors cursor-pointer">
              <span className="text-2xl">⚔️</span>
            </div>
            <div className="text-xs text-gray-700 font-medium">Sword</div>
            <div className="text-xs text-gray-500">Right Hand</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-lg border-2 border-gray-300 flex items-center justify-center mb-2 hover:border-amber-400 transition-colors cursor-pointer">
              <span className="text-2xl">👕</span>
            </div>
            <div className="text-xs text-gray-700 font-medium">Armor</div>
            <div className="text-xs text-gray-500">Body</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-lg border-2 border-gray-300 flex items-center justify-center mb-2 hover:border-amber-400 transition-colors cursor-pointer">
              <span className="text-2xl">👖</span>
            </div>
            <div className="text-xs text-gray-700 font-medium">Pants</div>
            <div className="text-xs text-gray-500">Legs</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-lg border-2 border-gray-300 flex items-center justify-center mb-2 hover:border-amber-400 transition-colors cursor-pointer">
              <span className="text-2xl">👢</span>
            </div>
            <div className="text-xs text-gray-700 font-medium">Boots</div>
            <div className="text-xs text-gray-500">Feet</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-lg border-2 border-gray-300 flex items-center justify-center mb-2 hover:border-amber-400 transition-colors cursor-pointer">
              <span className="text-2xl">💍</span>
            </div>
            <div className="text-xs text-gray-700 font-medium">Ring 1</div>
            <div className="text-xs text-gray-500">Left Hand</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-lg border-2 border-gray-300 flex items-center justify-center mb-2 hover:border-amber-400 transition-colors cursor-pointer">
              <span className="text-2xl">💍</span>
            </div>
            <div className="text-xs text-gray-700 font-medium">Ring 2</div>
            <div className="text-xs text-gray-500">Right Hand</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-lg border-2 border-gray-300 flex items-center justify-center mb-2 hover:border-amber-400 transition-colors cursor-pointer">
              <span className="text-2xl">🎒</span>
            </div>
            <div className="text-xs text-gray-700 font-medium">Bag</div>
            <div className="text-xs text-gray-500">Back</div>
          </div>
        </div>
      </div>
    </div>
  )
}
