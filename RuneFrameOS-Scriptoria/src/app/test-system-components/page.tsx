'use client'

import React from 'react'
import { SystemProvider } from '@/contexts/SystemContext'
import SystemSelectionModal from '@/components/functional/SystemSelectionModal'
import LeftSidebarSystems from '@/components/functional/LeftSidebarSystems'

const TestSystemComponents: React.FC = () => {
  return (
    <SystemProvider>
      <div className="min-h-screen bg-stone-900 text-white p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gold-100 mb-8 text-center">
            System Components Test Page
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Sidebar Simulation */}
            <div className="bg-stone-800/50 rounded-lg p-6 border border-stone-700/50">
              <h2 className="text-xl font-bold text-gold-100 mb-4">Left Sidebar Systems</h2>
              <LeftSidebarSystems />
            </div>
            
            {/* Main Content Area */}
            <div className="lg:col-span-2 bg-stone-800/50 rounded-lg p-6 border border-stone-700/50">
              <h2 className="text-xl font-bold text-gold-100 mb-4">Main Content Area</h2>
              <p className="text-stone-300 mb-4">
                This simulates where your main content will appear. The system selection components are shown in the left sidebar.
              </p>
              
              <div className="bg-stone-700/50 rounded p-4">
                <h3 className="text-lg font-semibold text-gold-200 mb-2">Instructions:</h3>
                <ul className="text-stone-300 text-sm space-y-1">
                  <li>• Click "📚 Select System" to open the modal</li>
                  <li>• Choose a system from the modal</li>
                  <li>• See how the left sidebar updates</li>
                  <li>• Notice the "Active" indicator changes</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Modal will appear when triggered */}
          <SystemSelectionModal />
        </div>
      </div>
    </SystemProvider>
  )
}

export default TestSystemComponents
