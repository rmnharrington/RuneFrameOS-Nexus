import React from 'react'
import AppLayout from '@/components/core/AppLayout'
import Dashboard from '@/components/core/Dashboard'

export default function DashboardPage() {
  return (
    <AppLayout
      appName="RuneFrameOS Nexus"
      userName="Traveler"
      appIcon="/RuneFrameOS_NoText.png"
      appType="Nexus"
      onSettings={() => console.log('Settings clicked')}
      onLogout={() => console.log('Logout clicked')}
      onNavigate={(destination) => console.log('Navigate to:', destination)}
    >
      <Dashboard />
    </AppLayout>
  )
}
