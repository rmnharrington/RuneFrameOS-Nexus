import AppLayout from '@/components/core/AppLayout'
import Welcome from '@/components/core/Welcome'

export default function Home() {
  return (
    <AppLayout 
      appName="RuneFrameOS Nexus"
      userName="Traveler"
      showSidebar={false}
      showStats={false}
    >
      <div className="flex items-center justify-center min-h-[80vh]">
        <Welcome />
      </div>
      
      <div className="mt-12 pt-6 border-t-2 border-amber-300/30 text-center">
        <p className="text-amber-600 text-sm italic">
          "We're not saying we're better than the corporate tools. We're just saying we're not trying to nickel-and-dime you for basic functionality."
        </p>
        <p className="text-amber-500 text-xs mt-2">
          — The Bad Guy Gas Team (Est. 1974, Grumpy Since Forever)
        </p>
      </div>
    </AppLayout>
  )
}
