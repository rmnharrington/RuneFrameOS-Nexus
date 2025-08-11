"use client"

import React, { useState, useRef, useCallback } from 'react'
import Dashboard from '@/components/core/Dashboard'
import AppLayout, { AppLayoutRef } from '@/components/core/AppLayout'

export default function DashboardPage() {
  const [modules, setModules] = useState<any[]>([])
  const appLayoutRef = useRef<AppLayoutRef>(null)

  const handleAddModule = (module: any) => {
    // Convert AvailableModule to Module format
    const newModule = {
      id: module.id,
      name: module.name,
      description: module.description,
      status: 'offline' as const,
      version: 'v0.1.0',
      // Add URLs for modules that have them
      url: module.id === 'distillara' ? 'http://localhost:3001' :
           module.id === 'feastwell' ? 'http://localhost:3003' :
           module.id === 'hoardwell' ? 'http://localhost:3004' :
           module.id === 'broke-unicorn-tavern' ? 'http://localhost:3005' : undefined
    }

    // Check if module already exists
    if (modules.find(m => m.id === newModule.id)) {
      console.log(`Module ${newModule.name} is already added`)
      return
    }

    // Add the new module
    setModules(prev => [...prev, newModule])
    console.log(`✅ Added module: ${newModule.name}`)
  }

  const handleNavigate = useCallback((destination: string) => {
    console.log(`🔄 Dashboard navigating to: ${destination}`)
    // Call the AppLayout's navigation function directly
    if (appLayoutRef.current) {
      appLayoutRef.current.handleViewChange(destination)
    }
  }, [])

  return (
    <AppLayout 
      ref={appLayoutRef}
      appName="RuneFrameOS Nexus"
      userName="Traveler"
      showSidebar={true}
      showStats={true}
      onAddModule={handleAddModule}
      onNavigate={handleNavigate}
    >
      <Dashboard modules={modules} setModules={setModules} onNavigate={handleNavigate} />
    </AppLayout>
  )
}
