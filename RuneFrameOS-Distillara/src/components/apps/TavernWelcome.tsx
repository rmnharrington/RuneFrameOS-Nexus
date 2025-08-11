"use client"

import React, { useState } from 'react'

export default function TavernWelcome() {
  const [selectedRoom, setSelectedRoom] = useState('main-hall')
  const [message, setMessage] = useState('')

  const chatRooms = [
    {
      id: 'main-hall',
      name: 'The Great Hall',
      description: 'General gathering and announcements',
      icon: '🏰',
      activeUsers: 23,
      lastMessage: 'Welcome travelers! Who seeks adventure today?',
      lastUser: 'TavernKeeper',
      lastTime: '2 min ago'
    },
    {
      id: 'fantasy-realm',
      name: 'The Enchanted Grove',
      description: 'High fantasy and magical adventures',
      icon: '🌳',
      activeUsers: 18,
      lastMessage: 'Anyone up for a dragon hunt in the Misty Mountains?',
      lastUser: 'DragonSlayer',
      lastTime: '5 min ago'
    },
    {
      id: 'sci-fi-frontier',
      name: 'The Stellar Cantina',
      description: 'Space exploration and futuristic tales',
      icon: '🚀',
      activeUsers: 15,
      lastMessage: 'Looking for crew members for a deep space expedition!',
      lastUser: 'CaptainNova',
      lastTime: '8 min ago'
    },
    {
      id: 'western-lands',
      name: 'The Dusty Saloon',
      description: 'Wild West and frontier adventures',
      icon: '🤠',
      activeUsers: 12,
      lastMessage: 'Gold rush in Deadwood! Who\'s ready to stake a claim?',
      lastUser: 'SheriffStone',
      lastTime: '12 min ago'
    },
    {
      id: 'modern-mystery',
      name: 'The Urban Hideout',
      description: 'Contemporary supernatural and mystery',
      icon: '🏙️',
      activeUsers: 9,
      lastMessage: 'Strange occurrences in the old library district...',
      lastUser: 'DetectiveGrey',
      lastTime: '15 min ago'
    }
  ]

  const selectedRoomData = chatRooms.find(room => room.id === selectedRoom)

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would typically send the message to your backend
      console.log(`Sending message to ${selectedRoom}: ${message}`)
      setMessage('')
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-tavern-500 to-wood-600 rounded-full flex items-center justify-center shadow-2xl mb-4">
          <span className="text-5xl">🏰</span>
        </div>
        <h1 className="text-4xl font-fantasy font-bold text-gradient bg-gradient-to-r from-tavern-700 to-wood-700 bg-clip-text text-transparent mb-2">
          Welcome to BrokeUnicorn Tavern
        </h1>
        <p className="text-xl text-wood-600 max-w-2xl mx-auto">
          A legendary gathering place where adventurers, storytellers, and those seeking 
          epic tales come together. Find your next great adventure or share your own stories.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Rooms List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white/80 rounded-lg border border-wood-200/50 p-4">
            <h3 className="text-lg font-semibold text-wood-800 mb-4 flex items-center">
              <span className="text-2xl mr-2">💬</span>
              Chat Rooms
            </h3>
            <div className="space-y-3">
              {chatRooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoom(room.id)}
                  className={`w-full p-3 text-left rounded-lg transition-all duration-200 hover:scale-105 ${
                    selectedRoom === room.id
                      ? 'bg-gradient-to-r from-tavern-500 to-wood-500 text-white shadow-lg'
                      : 'bg-white/60 hover:bg-white/80 text-wood-700 hover:text-wood-800 border border-wood-200/50 hover:border-tavern-300/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{room.icon}</span>
                    <div className="flex-1 text-left">
                      <h4 className="font-semibold">{room.name}</h4>
                      <p className={`text-sm ${
                        selectedRoom === room.id ? 'text-tavern-100' : 'text-wood-600'
                      }`}>
                        {room.description}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className={`text-xs ${
                          selectedRoom === room.id ? 'text-tavern-200' : 'text-wood-500'
                        }`}>
                          {room.activeUsers} active
                        </span>
                        <span className={`text-xs ${
                          selectedRoom === room.id ? 'text-tavern-200' : 'text-wood-500'
                        }`}>
                          {room.lastTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-r from-tavern-100 to-wood-100 rounded-lg border border-tavern-300/50 p-4">
            <h4 className="font-semibold text-tavern-800 mb-3">Tavern Activity</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-tavern-700">Total Travelers:</span>
                <span className="font-medium text-tavern-800">127</span>
              </div>
              <div className="flex justify-between">
                <span className="text-tavern-700">Active Rooms:</span>
                <span className="font-medium text-tavern-800">5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-tavern-700">Missions Posted:</span>
                <span className="font-medium text-tavern-800">23</span>
              </div>
              <div className="flex justify-between">
                <span className="text-tavern-700">Adventures Started:</span>
                <span className="font-medium text-tavern-800">8</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2">
          <div className="bg-white/80 rounded-lg border border-wood-200/50 h-96 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-wood-200/30 bg-gradient-to-r from-tavern-50 to-wood-50 rounded-t-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{selectedRoomData?.icon}</span>
                <div>
                  <h3 className="font-semibold text-wood-800">{selectedRoomData?.name}</h3>
                  <p className="text-sm text-wood-600">{selectedRoomData?.description}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-sm text-wood-600">{selectedRoomData?.activeUsers} travelers</p>
                  <p className="text-xs text-wood-500">Last active: {selectedRoomData?.lastTime}</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-tavern-500 to-wood-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  TK
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-wood-800">TavernKeeper</span>
                    <span className="text-xs text-wood-500">2 min ago</span>
                  </div>
                  <p className="text-wood-700 bg-tavern-50 rounded-lg p-3 border border-tavern-200/30">
                    Welcome travelers! Who seeks adventure today?
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-wood-500 to-tavern-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  DS
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-wood-800">DragonSlayer</span>
                    <span className="text-xs text-wood-500">1 min ago</span>
                  </div>
                  <p className="text-wood-700 bg-wood-50 rounded-lg p-3 border border-wood-200/30">
                    I'm looking for brave souls to join me in the Misty Mountains. Ancient dragon lair discovered!
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-tavern-400 to-wood-400 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  AW
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-wood-800">AdventureWanderer</span>
                    <span className="text-xs text-wood-500">Just now</span>
                  </div>
                  <p className="text-wood-700 bg-tavern-50 rounded-lg p-3 border border-tavern-200/30">
                    Count me in! I've been training for this moment. What level are we looking at?
                  </p>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-wood-200/30">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 p-3 border border-wood-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-tavern-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-6 py-3 bg-gradient-to-r from-tavern-500 to-wood-500 text-white rounded-lg hover:from-tavern-600 hover:to-wood-600 transition-all duration-200 hover:scale-105 shadow-md"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-8">
        <div className="bg-gradient-to-r from-tavern-100 to-wood-100 rounded-lg border border-tavern-300/50 p-6">
          <h3 className="text-xl font-semibold text-wood-800 mb-2">
            Ready to Start Your Adventure?
          </h3>
          <p className="text-wood-600 mb-4">
            Join an existing campaign or post your own mission to find players.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-6 py-3 bg-gradient-to-r from-tavern-500 to-wood-500 text-white rounded-lg hover:from-tavern-600 hover:to-wood-600 transition-all duration-200 hover:scale-105 shadow-md">
              Browse Missions
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-wood-500 to-tavern-500 text-white rounded-lg hover:from-wood-600 hover:to-tavern-600 transition-all duration-200 hover:scale-105 shadow-md">
              Post Mission
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
