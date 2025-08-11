"use client"

import React from 'react'

interface RightSidebarProps {
  appType?: string
}

export default function RightSidebar({
  appType = "BrokeUnicorn Tavern"
}: RightSidebarProps) {
  // Mock data for Tavern
  const activeTravelers = [
    { id: 1, name: 'Grimtooth', level: 12, status: 'online', lastSeen: '2 min ago' },
    { id: 2, name: 'ShadowStalker', level: 8, status: 'online', lastSeen: '5 min ago' },
    { id: 3, name: 'HealBot', level: 15, status: 'away', lastSeen: '15 min ago' }
  ]

  const availableMissions = [
    { id: 1, name: 'Dragon Hunt', difficulty: 'hard', reward: '500 gold', timeLimit: '3 days' },
    { id: 2, name: 'Goblin Cleanup', difficulty: 'easy', reward: '100 gold', timeLimit: '1 day' },
    { id: 3, name: 'Lost Artifact', difficulty: 'medium', reward: '250 gold', timeLimit: '5 days' }
  ]

  const tavernEvents = [
    { id: 1, name: 'Bard Night', time: 'Tonight 8PM', attendees: 15 },
    { id: 2, name: 'Auction House', time: 'Tomorrow 2PM', attendees: 8 }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600'
      case 'medium': return 'text-yellow-600'
      case 'hard': return 'text-red-600'
      default: return 'text-amber-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <span className="text-green-600">🟢</span>
      case 'away': return <span className="text-yellow-600">🟡</span>
      case 'offline': return <span className="text-red-600">🔴</span>
      default: return <span className="text-amber-600">🟠</span>
    }
  }

  return (
    <aside className="w-full h-full bg-gradient-to-b from-amber-50 to-orange-50 border-l-2 border-amber-300/30 overflow-y-auto">
      <div className="p-3 lg:p-4">
        {/* Header */}
        <div className="mb-4 lg:mb-6 text-center">
          <img
            src="/BrokeUnicornTavern_Logos_IconOnly.png"
            alt="BrokeUnicorn Tavern"
            className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-2 lg:mb-4 object-contain"
          />
          <h2 className="text-sm lg:text-base font-fantasy font-bold text-amber-800">Tavern Info</h2>
        </div>

                 {/* Active Travelers */}
         <section className="mb-4 lg:mb-6">
           <div className="flex items-center space-x-2 mb-2 lg:mb-3">
             <span className="text-amber-600">👥</span>
             <h3 className="font-semibold text-amber-800 text-sm lg:text-base">Active Travelers</h3>
           </div>
          <div className="space-y-2 lg:space-y-3">
            {activeTravelers.map((traveler) => (
              <div key={traveler.id} className="bg-white/60 rounded-lg p-2 lg:p-3 border border-amber-200/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-amber-700 text-xs lg:text-sm">{traveler.name}</span>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(traveler.status)}
                    <span className="text-xs text-amber-600">Lv.{traveler.level}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-amber-600">{traveler.lastSeen}</span>
                  <span className={`text-xs ${traveler.status === 'online' ? 'text-green-600' : 'text-yellow-600'}`}>
                    {traveler.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

                 {/* Available Missions */}
         <section className="mb-4 lg:mb-6">
           <div className="flex items-center space-x-2 mb-2 lg:mb-3">
             <span className="text-amber-600">🗺️</span>
             <h3 className="font-semibold text-amber-800 text-sm lg:text-base">Available Missions</h3>
           </div>
          <div className="space-y-2 lg:space-y-3">
            {availableMissions.map((mission) => (
              <div key={mission.id} className="bg-white/60 rounded-lg p-2 lg:p-3 border border-amber-200/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-amber-700 text-xs lg:text-sm">{mission.name}</span>
                  <span className={`text-xs font-medium ${getDifficultyColor(mission.difficulty)}`}>
                    {mission.difficulty}
                  </span>
                </div>
                <div className="space-y-1 text-xs text-amber-600">
                  <div className="flex justify-between">
                    <span>Reward:</span>
                    <span className="font-medium">{mission.reward}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time Limit:</span>
                    <span className="font-medium">{mission.timeLimit}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

                 {/* Tavern Events */}
         <section className="mb-4 lg:mb-6">
           <div className="flex items-center space-x-2 mb-2 lg:mb-3">
             <span className="text-amber-600">🔔</span>
             <h3 className="font-semibold text-amber-800 text-sm lg:text-base">Upcoming Events</h3>
           </div>
          <div className="space-y-2 lg:space-y-3">
            {tavernEvents.map((event) => (
              <div key={event.id} className="bg-white/60 rounded-lg p-2 lg:p-3 border border-amber-200/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-amber-700 text-xs lg:text-sm">{event.name}</span>
                  <span className="text-xs text-amber-600">👥 {event.attendees}</span>
                </div>
                                 <div className="text-xs text-amber-600">
                   <div className="flex items-center space-x-1">
                     <span>🕐</span>
                     <span>{event.time}</span>
                   </div>
                 </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Stats */}
        <section className="border-t border-amber-200/50 pt-4">
          <h3 className="font-semibold text-amber-800 text-sm lg:text-base mb-3">Tavern Stats</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-amber-600">Total Travelers:</span>
              <span className="font-medium text-amber-800">47</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-600">Active Missions:</span>
              <span className="font-medium text-amber-800">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-600">Today's Revenue:</span>
              <span className="font-medium text-amber-800">1,250 gold</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-600">Rating:</span>
              <span className="font-medium text-amber-800">⭐ 4.8/5</span>
            </div>
          </div>
        </section>
      </div>
    </aside>
  )
}
