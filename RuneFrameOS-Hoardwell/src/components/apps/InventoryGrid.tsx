'use client'

import { useState } from 'react'
import { Edit, Trash2, Image as ImageIcon, Package } from 'lucide-react'

interface InventoryItem {
  id: string
  name: string
  description: string
  image: string
  type: string
  rarity: string
  location: string
  weight: number
  cost: number
  durability: number
  properties: Record<string, any>
}

export default function InventoryGrid() {
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const inventoryItems: InventoryItem[] = [
    {
      id: '1',
      name: 'Longsword +1',
      description: 'A finely crafted longsword with a +1 magical enhancement.',
      image: '/api/placeholder/200/200',
      type: 'Weapon',
      rarity: 'Uncommon',
      location: 'Belt',
      weight: 3.0,
      cost: 50,
      durability: 95,
      properties: { enhancement: '+1', damage: '1d8/1d10' }
    },
    {
      id: '2',
      name: 'Healing Potion',
      description: 'A red potion that restores 2d4+2 hit points.',
      image: '/api/placeholder/200/200',
      type: 'Consumable',
      rarity: 'Common',
      location: 'Bag',
      weight: 0.5,
      cost: 50,
      durability: 100,
      properties: { healing: '2d4+2' }
    },
    {
      id: '3',
      name: 'Leather Armor',
      description: 'Light armor made from tanned animal hide.',
      image: '/api/placeholder/200/200',
      type: 'Armor',
      rarity: 'Common',
      location: 'Worn',
      weight: 10.0,
      cost: 10,
      durability: 80,
      properties: { ac: 11, type: 'Light' }
    },
    {
      id: '4',
      name: 'Rope (50ft)',
      description: 'A sturdy hemp rope, 50 feet long.',
      image: '/api/placeholder/200/200',
      type: 'Adventuring Gear',
      rarity: 'Common',
      location: 'Bag',
      weight: 10.0,
      cost: 1,
      durability: 100,
      properties: { length: '50ft', material: 'Hemp' }
    },
    {
      id: '5',
      name: 'Torch',
      description: 'A wooden torch that provides bright light in a 20-foot radius.',
      image: '/api/placeholder/200/200',
      type: 'Adventuring Gear',
      rarity: 'Common',
      location: 'Bag',
      weight: 1.0,
      cost: 0.1,
      durability: 100,
      properties: { light: '20ft radius', duration: '1 hour' }
    },
    {
      id: '6',
      name: 'Gold Coins',
      description: 'Standard gold currency pieces.',
      image: '/api/placeholder/200/200',
      type: 'Currency',
      rarity: 'Common',
      location: 'Purse',
      weight: 0.0,
      cost: 1089,
      durability: 100,
      properties: { currency: 'Gold', count: 1089 }
    }
  ]

  const handleItemSelect = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const getDurabilityColor = (durability: number) => {
    if (durability >= 90) return 'text-green-600'
    if (durability >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getDurabilityText = (durability: number) => {
    if (durability >= 90) return 'Excellent'
    if (durability >= 70) return 'Good'
    if (durability >= 50) return 'Fair'
    return 'Poor'
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 fantasy-font">📦 Inventory Grid</h3>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-7 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 font-medium text-gray-700">
        <div className="col-span-2">Item</div>
        <div>Location</div>
        <div>Weight</div>
        <div>Cost</div>
        <div>Durability</div>
        <div>Actions</div>
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-gray-200">
        {inventoryItems.map((item) => (
          <div key={item.id} className="grid grid-cols-7 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
            {/* Item Column */}
            <div className="col-span-2 flex items-center space-x-3">
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => handleItemSelect(item.id)}
                className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
              />
              <div className="w-12 h-12 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center">
                {item.image ? (
                  <ImageIcon size={24} className="text-gray-400" />
                ) : (
                  <Package size={24} className="text-gray-400" />
                )}
              </div>
              <div>
                <div className="font-medium text-gray-900">{item.name}</div>
                <div className="text-sm text-gray-500">{item.type} • {item.rarity}</div>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {item.location}
              </span>
            </div>

            {/* Weight */}
            <div className="flex items-center">
              <span className="text-gray-900">{item.weight} lbs</span>
            </div>

            {/* Cost */}
            <div className="flex items-center">
              <span className="text-gray-900">{item.cost} gp</span>
            </div>

            {/* Durability */}
            <div className="flex items-center">
              <span className={`${getDurabilityColor(item.durability)} font-medium`}>
                {item.durability}% ({getDurabilityText(item.durability)})
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                <Edit size={16} />
              </button>
              <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <div className="px-6 py-3 bg-amber-50 border-t border-amber-200">
          <div className="flex items-center justify-between">
            <span className="text-amber-800">
              {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
            </span>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-amber-600 text-white text-sm rounded hover:bg-amber-700 transition-colors">
                Edit Selected
              </button>
              <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors">
                Delete Selected
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
