// Service status types
export interface ServiceStatus {
  name: string
  status: 'online' | 'offline' | 'error'
  lastCheck: Date
  responseTime?: number
}

// User information types
export interface User {
  id: string
  username: string
  email: string
  role: 'user' | 'admin' | 'developer' | 'betaTester'
  preferences: UserPreferences
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto'
  language: string
  notifications: boolean
}

// Application integration types
export interface AppIntegration {
  id: string
  name: string
  description: string
  status: 'available' | 'unavailable' | 'maintenance'
  icon?: string
  endpoint?: string
}

// API response types
export interface APIResponse<T> {
  success: boolean
  data?: T
  error?: string
  timestamp: Date
}

// Navigation types
export interface NavigationItem {
  id: string
  label: string
  path: string
  icon?: string
  children?: NavigationItem[]
}
