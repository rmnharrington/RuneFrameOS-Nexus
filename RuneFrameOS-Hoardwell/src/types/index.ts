export interface Character {
  id: string
  name: string
  level: number
  class: string
  system: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface InventoryItem {
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
  characterId: string
  system: string
  createdAt: Date
  updatedAt: Date
}

export interface ItemTemplate {
  id: string
  name: string
  description: string
  type: string
  rarity: string
  baseWeight: number
  baseCost: number
  properties: Record<string, any>
  system: string
  tags: string[]
}

export interface InventoryLocation {
  id: string
  name: string
  description: string
  capacity: number
  weightLimit: number
  characterId: string
  isEquipped: boolean
  slotType?: string
}

export interface DurabilityLog {
  id: string
  itemId: string
  action: 'repair' | 'damage' | 'use' | 'maintenance'
  description: string
  durabilityChange: number
  timestamp: Date
  characterId: string
}

export interface Currency {
  id: string
  name: string
  symbol: string
  value: number
  characterId: string
  location: string
}

export interface EncumbranceLevel {
  level: 'light' | 'medium' | 'heavy' | 'overloaded'
  maxWeight: number
  movementPenalty: number
  description: string
}
