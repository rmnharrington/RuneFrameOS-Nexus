"use client"

import React, { useState } from 'react'

export default function TavernWelcome() {
  const [selectedRoom, setSelectedRoom] = useState('general')
  const [message, setMessage] = useState('')

  const chatRooms = [
    {
      id: 'general',
      name: 'General Chat',
      description: 'General conversation and announcements',
      icon: '💬',
      activeUsers: 24,
      lastMessage: 'Anyone up for a dungeon run tonight?'
    },
    {
      id: 'trading',
      name: 'Trading Post',
      description: 'Buy, sell, and trade items',
      icon: '💰',
      activeUsers: 18,
      lastMessage: 'Selling rare potions, DM for details'
    },
    {
      id: 'missions',
      name: 'Mission Planning',
      description: 'Coordinate quests and adventures',
      icon: '🗺️',
      activeUsers: 31,
      lastMessage: 'Need a healer for the dragon hunt'
    },
    {
      id: 'lore',
      name: 'Lore & Stories',
      description: 'Share tales and legends',
      icon: '📚',
      activeUsers: 12,
      lastMessage: 'The legend of the Broken Unicorn...'
    }
  ]

  const sampleMessages = [
    { user: 'Grimtooth', message: 'Anyone up for a dungeon run tonight?', time: '2 min ago', avatar: '🧙‍♂️' },
    { user: 'ShadowStalker', message: 'I\'m in! What level are we talking?', time: '1 min ago', avatar: '👤' },
    { user: 'HealBot', message: 'I can heal if you need a cleric', time: '1 min ago', avatar: '⛪' },
    { user: 'DragonSlayer', message: 'Perfect! Let\'s meet at the entrance in 30', time: 'Just now', avatar: '⚔️' }
  ]

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      // In a real app, this would send the message to the server
      console.log('Sending message:', message)
      setMessage('')
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Welcome to BrokeUnicorn Tavern
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          A legendary establishment where Travelers gather to share tales, accept missions, 
          and forge alliances. Pull up a chair and join the conversation!
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chat Rooms Selection */}
        <div className="lg:col-span-1">
          <div className="card rune-border p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              Chat Rooms
            </h2>
            <div className="space-y-3">
              {chatRooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoom(room.id)}
                  className={`w-full p-4 text-left rounded-lg transition-all duration-200 ${
                    selectedRoom === room.id
                      ? 'bg-gradient-to-r from-blue-200 to-indigo-300 border-2 border-blue-400 shadow-md'
                      : 'bg-white/60 hover:bg-white/80 border border-slate-200/50 hover:border-blue-300/70 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{room.icon}</span>
                    <div className="flex-1 text-left">
                      <h3 className={`font-medium ${
                        selectedRoom === room.id ? 'text-blue-800' : 'text-slate-800'
                      }`}>
                        {room.name}
                      </h3>
                      <p className={`text-xs ${
                        selectedRoom === room.id ? 'text-blue-600' : 'text-slate-600'
                      }`}>
                        {room.description}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-slate-500">
                          👥 {room.activeUsers} active
                        </span>
                        <span className="text-xs text-slate-500">
                          💬 {room.lastMessage}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <div className="card rune-border p-6 h-96 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-800">
                {chatRooms.find(r => r.id === selectedRoom)?.name}
              </h2>
              <span className="text-sm text-slate-500">
                👥 {chatRooms.find(r => r.id === selectedRoom)?.activeUsers} active
              </span>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              {sampleMessages.map((msg, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {msg.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-slate-800">{msg.user}</span>
                      <span className="text-xs text-slate-500">{msg.time}</span>
                    </div>
                    <p className="text-slate-700 text-sm">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="flex space-x-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Tavern Activity */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card rune-border p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Tavern Activity
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Active Travelers:</span>
              <span className="font-medium text-blue-600">47</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Missions Available:</span>
              <span className="font-medium text-blue-600">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Recent Arrivals:</span>
              <span className="font-medium text-blue-600">3</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Special Events:</span>
              <span className="font-medium text-blue-600">2</span>
            </div>
          </div>
        </div>

        <div className="card rune-border p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Call to Action
          </h3>
          <p className="text-slate-600 text-sm mb-4">
            Ready to start your adventure? Check out the mission board or join a chat room to connect with other Travelers.
          </p>
          <div className="space-y-2">
            <button className="w-full p-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
              🗺️ View Available Missions
            </button>
            <button className="w-full p-3 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
              👥 Create New Party
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

