// Database Types for Scriptoria Gaming Platform

export interface GamingSystem {
  id: string
  name: string
  description?: string
  publisher?: string
  isActive: boolean
  isProprietary: boolean
  createdAt: Date
  updatedAt: Date
  versions?: SystemVersion[]
  ruleBooks?: RuleBook[]
  mechanics?: GameMechanic[]
  content?: ContentItem[]
}

export interface SystemVersion {
  id: string
  versionName: string
  description?: string
  releaseDate?: Date
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  gamingSystemId: string
  gamingSystem?: GamingSystem
  ruleBooks?: RuleBook[]
  mechanics?: GameMechanic[]
}

export interface RuleBook {
  id: string
  title: string
  description?: string
  bookType: BookType
  pageCount?: number
  isbn?: string
  publicationDate?: Date
  price: number
  isActive: boolean
  isPurchasable: boolean
  createdAt: Date
  updatedAt: Date
  gamingSystemId: string
  gamingSystem?: GamingSystem
  systemVersionId?: string
  systemVersion?: SystemVersion
  contentItems?: ContentItem[]
}

export enum BookType {
  CORE = 'CORE',
  EXPANSION = 'EXPANSION',
  SUPPLEMENT = 'SUPPLEMENT',
  ADVENTURE = 'ADVENTURE',
  SETTING = 'SETTING',
  MAGAZINE = 'MAGAZINE',
  OTHER = 'OTHER'
}

export interface GameMechanic {
  id: string
  name: string
  description?: string
  mechanicType: MechanicType
  implementation?: string // JSON string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  gamingSystemId: string
  gamingSystem?: GamingSystem
  systemVersionId?: string
  systemVersion?: SystemVersion
  contentItems?: ContentItem[]
}

export enum MechanicType {
  DICE_ROLLING = 'DICE_ROLLING',
  COMBAT = 'COMBAT',
  SKILL_CHECKS = 'SKILL_CHECKS',
  CHARACTER_CREATION = 'CHARACTER_CREATION',
  MAGIC = 'MAGIC',
  EQUIPMENT = 'EQUIPMENT',
  MOVEMENT = 'MOVEMENT',
  SOCIAL_INTERACTION = 'SOCIAL_INTERACTION',
  OTHER = 'OTHER'
}

export interface ContentItem {
  id: string
  title: string
  description?: string
  content: string // JSON string of actual content
  contentType: ContentType
  tags: string[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  gamingSystemId: string
  gamingSystem?: GamingSystem
  ruleBookId?: string
  ruleBook?: RuleBook
  mechanics?: GameMechanic[]
}

export enum ContentType {
  EQUIPMENT = 'EQUIPMENT',
  SPELL = 'SPELL',
  FEAT = 'FEAT',
  RULE = 'RULE',
  MONSTER = 'MONSTER',
  NPC = 'NPC',
  LOCATION = 'LOCATION',
  ITEM = 'ITEM',
  OTHER = 'OTHER'
}

export interface CharacterTemplate {
  id: string
  name: string
  description?: string
  templateData: string // JSON string of template structure
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  gamingSystemId: string
  gamingSystem?: GamingSystem
  systemVersionId?: string
  systemVersion?: SystemVersion
}

export interface SystemImplementation {
  id: string
  name: string
  description?: string
  implementationType: ImplementationType
  config: string // JSON configuration
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  gamingSystemId: string
  gamingSystem?: GamingSystem
}

export enum ImplementationType {
  CHARACTER_BUILDER = 'CHARACTER_BUILDER',
  COMBAT_SYSTEM = 'COMBAT_SYSTEM',
  MAGIC_SYSTEM = 'MAGIC_SYSTEM',
  EQUIPMENT_SYSTEM = 'EQUIPMENT_SYSTEM',
  SKILL_SYSTEM = 'SKILL_SYSTEM',
  OTHER = 'OTHER'
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Character Creation Types
export interface CharacterCreationData {
  gamingSystemId: string
  systemVersionId?: string
  templateId?: string
  characterData: Record<string, any> // Flexible character structure
}

export interface CharacterExportOptions {
  format: 'personavault' | 'pdf'
  characterData: Record<string, any>
  template?: CharacterTemplate
}

// Search and Filter Types
export interface ContentSearchParams {
  query?: string
  gamingSystemId?: string
  contentType?: ContentType
  tags?: string[]
  page?: number
  limit?: number
}

export interface MechanicSearchParams {
  gamingSystemId?: string
  mechanicType?: MechanicType
  query?: string
  page?: number
  limit?: number
}
