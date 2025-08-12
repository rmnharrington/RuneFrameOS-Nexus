"use client"

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
      <div className="flex items-center justify-center min-h-[60vh]">
        <Welcome />
      </div>
      
      {/* App Testing Section */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 p-6">
        <h2 className="text-xl font-bold text-blue-800 mb-4">🧪 App Testing & Development</h2>
        <p className="text-blue-600 mb-4 text-sm">Test each application individually for development and debugging</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {/* Nexus Card */}
          <div className="bg-white/80 rounded-lg border border-blue-200 p-4 text-center hover:shadow-md transition-all duration-200">
            <div className="text-3xl mb-2">🏛️</div>
            <h3 className="font-semibold text-blue-800 text-sm mb-1">Nexus Dashboard</h3>
            <p className="text-xs text-blue-600 mb-3">Main Hub</p>
            <div className="text-xs text-green-600 font-medium mb-2">Port 3000</div>
            <button 
              onClick={() => window.open('/dashboard', '_blank')}
              className="w-full py-2 px-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 text-xs"
            >
              🚀 Open Dashboard
            </button>
          </div>

          {/* Distillara Card */}
          <div className="bg-white/80 rounded-lg border border-blue-200 p-4 text-center hover:shadow-md transition-all duration-200">
            <div className="text-3xl mb-2">🧪</div>
            <h3 className="font-semibold text-blue-800 text-sm mb-1">Distillara</h3>
            <p className="text-xs text-blue-600 mb-3">Alchemy System</p>
            <div className="text-xs text-green-600 font-medium mb-2">Port 3001</div>
            <button 
              onClick={() => window.open('http://localhost:3001', '_blank')}
              className="w-full py-2 px-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 text-xs"
            >
              🧪 Open Distillara
            </button>
          </div>

          {/* Feastwell Card */}
          <div className="bg-white/80 rounded-lg border border-blue-200 p-4 text-center hover:shadow-md transition-all duration-200">
            <div className="text-3xl mb-2">🍳</div>
            <h3 className="font-semibold text-blue-800 text-sm mb-1">Feastwell</h3>
            <p className="text-xs text-blue-600 mb-3">Cooking System</p>
            <div className="text-xs text-green-600 font-medium mb-2">Port 3003</div>
            <button 
              onClick={() => window.open('http://localhost:3003', '_blank')}
              className="w-full py-2 px-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 text-xs"
            >
              🍳 Open Feastwell
            </button>
          </div>

          {/* Hoardwell Card */}
          <div className="bg-white/80 rounded-lg border border-blue-200 p-4 text-center hover:shadow-md transition-all duration-200">
            <div className="text-3xl mb-2">💎</div>
            <h3 className="font-semibold text-blue-800 text-sm mb-1">Hoardwell</h3>
            <p className="text-xs text-blue-600 mb-3">Inventory System</p>
            <div className="text-xs text-green-600 font-medium mb-2">Port 3004</div>
            <button 
              onClick={() => window.open('http://localhost:3004', '_blank')}
              className="w-full py-2 px-3 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 text-xs"
            >
              💎 Open Hoardwell
            </button>
          </div>

          {/* Broke Unicorn Tavern Card */}
          <div className="bg-white/80 rounded-lg border border-blue-200 p-4 text-center hover:shadow-md transition-all duration-200">
            <div className="text-3xl mb-2">🏰</div>
            <h3 className="font-semibold text-blue-800 text-sm mb-1">Broke Unicorn Tavern</h3>
            <p className="text-xs text-blue-600 mb-3">Social Hub</p>
            <div className="text-xs text-green-600 font-medium mb-2">Port 3005</div>
            <button 
              onClick={() => window.open('http://localhost:3005', '_blank')}
              className="w-full py-2 px-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 text-xs"
            >
              🏰 Open Tavern
            </button>
          </div>

          {/* Scriptoria Card */}
          <div className="bg-white/80 rounded-lg border border-blue-200 p-4 text-center hover:shadow-md transition-all duration-200">
            <div className="text-3xl mb-2">📚</div>
            <h3 className="font-semibold text-blue-800 text-sm mb-1">Scriptoria</h3>
            <p className="text-xs text-blue-600 mb-3">Gaming Library</p>
            <div className="text-xs text-green-600 font-medium mb-2">Port 3006</div>
            <button 
              onClick={() => window.open('http://localhost:3006', '_blank')}
              className="w-full py-2 px-3 bg-gradient-to-r from-slate-500 to-gray-600 hover:from-slate-600 hover:to-gray-700 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 text-xs"
            >
              📚 Open Scriptoria
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-12 pt-6 border-t-2 border-amber-300/30 text-center">
        <p className="text-amber-600 text-sm italic">
          "We're not saying we're better than the corporate tools. We're just saying we're not trying to nickel-and-dime you for basic functionality."
        </p>
        <p className="text-amber-500 text-xs mt-2">
          - Bad Guy Gas Development Team
        </p>
      </div>
    </AppLayout>
  )
}
