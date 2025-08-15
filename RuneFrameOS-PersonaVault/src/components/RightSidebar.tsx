'use client'

export default function RightSidebar() {
  return (
    <div className="h-full bg-gradient-to-b from-grey-50 to-grey-100 border-l border-grey-200 p-4">
      {/* Character Stats */}
      <div className="mb-6">
        <h3 className="text-lg font-fantasy font-semibold text-grey-800 mb-4">
          Active Character
        </h3>
        
        {/* Character Info */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-grey-200 mb-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">👤</span>
            </div>
            <div>
              <h4 className="font-semibold text-grey-800">Thorin Stonefist</h4>
              <p className="text-sm text-grey-600">Dwarf Fighter - Level 5</p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-grey-50 p-2 rounded">
              <span className="text-grey-600">HP:</span>
              <span className="ml-1 font-semibold text-grey-800">42/42</span>
            </div>
            <div className="bg-grey-50 p-2 rounded">
              <span className="text-grey-600">AC:</span>
              <span className="ml-1 font-semibold text-grey-800">18</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dice Quick Roll */}
      <div className="mb-6">
        <h3 className="text-lg font-fantasy font-semibold text-grey-800 mb-4">
          Quick Dice
        </h3>
        
        <div className="grid grid-cols-2 gap-2">
          <button className="dice-button text-sm py-2 px-3">
            d20
          </button>
          <button className="dice-button text-sm py-2 px-3">
            d6
          </button>
          <button className="dice-button text-sm py-2 px-3">
            d10
          </button>
          <button className="dice-button text-sm py-2 px-3">
            d100
          </button>
        </div>
        
        {/* Custom Roll */}
        <div className="mt-3">
          <input 
            type="text" 
            placeholder="2d6+3" 
            className="w-full p-2 border border-grey-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
          <button className="w-full mt-2 dice-button text-sm py-2">
            Roll
          </button>
        </div>
      </div>

      {/* Recent Rolls */}
      <div className="mb-6">
        <h3 className="text-lg font-fantasy font-semibold text-grey-800 mb-4">
          Recent Rolls
        </h3>
        
        <div className="space-y-2">
          <div className="bg-white p-2 rounded border border-grey-200 text-xs">
            <div className="flex justify-between">
              <span className="text-grey-600">d20</span>
              <span className="font-semibold text-grey-800">17</span>
            </div>
            <div className="text-grey-500">Attack Roll</div>
          </div>
          
          <div className="bg-white p-2 rounded border border-grey-200 text-xs">
            <div className="flex justify-between">
              <span className="text-grey-600">2d6+3</span>
              <span className="font-semibold text-grey-800">12</span>
            </div>
            <div className="text-grey-500">Damage</div>
          </div>
          
          <div className="bg-white p-2 rounded border border-grey-200 text-xs">
            <div className="flex justify-between">
              <span className="text-grey-600">d100</span>
              <span className="font-semibold text-grey-800">87</span>
            </div>
            <div className="text-grey-500">Skill Check</div>
          </div>
        </div>
      </div>

      {/* Scriptoria Connection */}
      <div>
        <h3 className="text-lg font-fantasy font-semibold text-grey-800 mb-4">
          Scriptoria Status
        </h3>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-800 font-medium">Connected</span>
          </div>
          <p className="text-xs text-green-600 mt-1">
            Access to 12 gaming systems
          </p>
        </div>
        
        <button className="w-full mt-3 p-2 bg-grey-200 hover:bg-grey-300 text-grey-700 rounded-md transition-all duration-200 hover:scale-105 text-sm">
          Browse Templates
        </button>
      </div>
    </div>
  )
}
