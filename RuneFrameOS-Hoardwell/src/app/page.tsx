'use client'

import AppLayout from '@/components/core/AppLayout'
import HeaderBar from '@/components/core/HeaderBar'
import LeftSidebar from '@/components/core/LeftSidebar'
import RightSidebar from '@/components/core/RightSidebar'
import AppFooter from '@/components/core/AppFooter'
import CharacterSelector from '@/components/apps/CharacterSelector'
import InventoryOverview from '@/components/apps/InventoryOverview'
import InventoryGrid from '@/components/apps/InventoryGrid'

export default function HoardwellPage() {
  return (
    <AppLayout appName="Hoardwell" appIcon="🏺">
      <HeaderBar />
      <div className="flex">
        <LeftSidebar />
        <main className="ml-[280px] mr-[320px] p-6 flex-1">
          <CharacterSelector />
          <InventoryOverview />
          <InventoryGrid />
        </main>
        <RightSidebar appType="hoardwell" />
      </div>
      <AppFooter />
    </AppLayout>
  )
}
