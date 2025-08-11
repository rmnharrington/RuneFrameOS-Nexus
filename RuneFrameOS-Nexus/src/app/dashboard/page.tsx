import Dashboard from '@/components/core/Dashboard'
import AppLayout from '@/components/core/AppLayout'

export default function DashboardPage() {
  return (
    <AppLayout 
      appName="RuneFrameOS Nexus"
      userName="Traveler"
      showSidebar={true}
      showStats={true}
    >
      <Dashboard />
    </AppLayout>
  )
}
