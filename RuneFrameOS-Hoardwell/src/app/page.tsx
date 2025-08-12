'use client'

import AppLayout from '@/components/core/AppLayout'
import CharacterSelector from '@/components/apps/CharacterSelector'
import InventoryOverview from '@/components/apps/InventoryOverview'
import InventoryGrid from '@/components/apps/InventoryGrid'

export default function HoardwellPage() {
  return (
    <AppLayout 
      appName="Hoardwell" 
      userName="Collector"
      appIcon="/Hoardwell_Logos_IconOnly.png"
      appType="hoardwell"
    >
      {/* Content will be rendered within the AppLayout's main area */}
      <div className="space-y-6">
        <CharacterSelector />
        <InventoryOverview />
        <InventoryGrid />
      </div>
    </AppLayout>
  )
}
