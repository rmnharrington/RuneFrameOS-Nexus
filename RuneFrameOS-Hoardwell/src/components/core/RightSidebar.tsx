'use client'

import { 
  Plus, 
  Download, 
  Upload, 
  Search, 
  Filter,
  Dice6,
  FileText,
  Scale,
  DollarSign,
  AlertTriangle
} from 'lucide-react'

interface RightSidebarProps {
  appType: string
}

export default function RightSidebar({ appType }: RightSidebarProps) {
  const inventoryControls = [
    { icon: Plus, label: 'Add New Item', action: () => console.log('Add Item') },
    { icon: Upload, label: 'Import Items', action: () => console.log('Import') },
    { icon: Download, label: 'Export Inventory', action: () => console.log('Export') },
    { icon: Search, label: 'Search Items', action: () => console.log('Search') },
    { icon: Filter, label: 'Filter by Category', action: () => console.log('Filter') },
  ]

  const quickActions = [
    { icon: Dice6, label: 'Roll for random item', action: () => console.log('Random Item') },
    { icon: FileText, label: 'Generate item list', action: () => console.log('Generate List') },
    { icon: Scale, label: 'Calculate encumbrance', action: () => console.log('Encumbrance') },
    { icon: DollarSign, label: 'Appraise inventory', action: () => console.log('Appraise') },
  ]

  return (
    <aside className="fixed right-0 top-20 w-64 h-[calc(100vh-5rem)] gradient-right-sidebar border-l-2 border-orange-300/30 overflow-y-auto">
      <div className="p-3 lg:p-4">
        {/* Header */}
        <div className="mb-4 lg:mb-6 text-center">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-orange-200 to-red-200 rounded-full flex items-center justify-center mx-auto mb-2 lg:mb-4 shadow-lg">
            <img
              src="/runeframeos_logo2.png"
              alt="RuneFrameOS"
              className="w-6 h-6 lg:w-8 lg:h-8 object-contain"
            />
          </div>
          <h2 className="text-sm lg:text-base font-fantasy font-bold text-orange-800">Quick Actions</h2>
        </div>

        {/* Inventory Controls */}
        <div className="mb-8">
          {inventoryControls.map((control, index) => (
            <button
              key={index}
              onClick={control.action}
              className="w-full flex items-center space-x-3 p-3 rounded-lg bg-white/60 hover:bg-white/80 transition-colors mb-2 border border-orange-200"
            >
              <control.icon size={20} className="text-orange-700" />
              <span className="font-medium text-orange-900">{control.label}</span>
            </button>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-orange-800 mb-4">📊 Quick Stats</h3>
          
          {/* Items by Location */}
          <div className="bg-white/60 rounded-lg p-4 mb-4 border border-orange-200">
            <h4 className="font-medium text-orange-800 mb-2">Items by Location</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Worn:</span>
                <span className="font-medium">5 items</span>
              </div>
              <div className="flex justify-between">
                <span>Belt:</span>
                <span className="font-medium">3 items</span>
              </div>
              <div className="flex justify-between">
                <span>Bag:</span>
                <span className="font-medium">12 items</span>
              </div>
              <div className="flex justify-between">
                <span>Stored:</span>
                <span className="font-medium">4 items</span>
              </div>
            </div>
          </div>

          {/* Weight Distribution */}
          <div className="bg-white/60 rounded-lg p-4 mb-4 border border-orange-200">
            <h4 className="font-medium text-orange-800 mb-2">Weight Distribution</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Light:</span>
                <span className="font-medium">8 items</span>
              </div>
              <div className="flex justify-between">
                <span>Medium:</span>
                <span className="font-medium">12 items</span>
              </div>
              <div className="flex justify-between">
                <span>Heavy:</span>
                <span className="font-medium">4 items</span>
              </div>
            </div>
          </div>

          {/* Value Summary */}
          <div className="bg-white/60 rounded-lg p-4 border border-orange-200">
            <h4 className="font-medium text-orange-800 mb-2">Value Summary</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Weapons:</span>
                <span className="font-medium">450 gp</span>
              </div>
              <div className="flex justify-between">
                <span>Armor:</span>
                <span className="font-medium">200 gp</span>
              </div>
              <div className="flex justify-between">
                <span>Consumables:</span>
                <span className="font-medium">150 gp</span>
              </div>
              <div className="flex justify-between">
                <span>Misc:</span>
                <span className="font-medium">450 gp</span>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
            <AlertTriangle size={20} className="mr-2" />
            ⚠️ Alerts
          </h3>
          <div className="space-y-2">
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-800 text-sm">3 items need repair</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-yellow-800 text-sm">2 items are low on charges</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-800 text-sm">1 item is cursed</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-semibold text-orange-800 mb-4">🎯 Quick Actions</h3>
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="w-full flex items-center space-x-3 p-3 rounded-lg bg-white/60 hover:bg-white/80 transition-colors mb-2 border border-orange-200"
            >
              <action.icon size={20} className="text-orange-700" />
              <span className="font-medium text-orange-900">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
