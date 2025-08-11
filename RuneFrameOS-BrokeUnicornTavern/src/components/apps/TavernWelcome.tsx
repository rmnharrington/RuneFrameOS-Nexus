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
        <div className="flex items-center justify-center space-x-4 mb-4">
          <img
            src="/BrokeUnicornTavern_Logos_IconOnly.png"
            alt="BrokeUnicorn Tavern"
            className="w-16 h-16 lg:w-20 lg:h-20 object-contain"
          />
          <h1 className="text-4xl font-bold text-amber-900">
            Welcome to BrokeUnicorn Tavern
          </h1>
        </div>
        <p className="text-lg text-amber-700 max-w-2xl mx-auto">
          A legendary establishment where Travelers gather to share tales, accept missions, 
          and forge alliances. Pull up a chair and join the conversation!
        </p>
      </div>

      {/* Chat Interface - Full Width */}
      <div className="bg-white/80 backdrop-blur-sm border-2 border-amber-200/50 rounded-lg p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-amber-900">
            {chatRooms.find(r => r.id === selectedRoom)?.name}
          </h2>
          <span className="text-sm text-amber-600">
            👥 {chatRooms.find(r => r.id === selectedRoom)?.activeUsers} active
          </span>
        </div>

        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto space-y-3 mb-4">
          {sampleMessages.map((msg, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-amber-900 text-sm font-bold">
                {msg.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-amber-900">{msg.user}</span>
                  <span className="text-xs text-amber-600">{msg.time}</span>
                </div>
                <p className="text-amber-800 text-sm">{msg.message}</p>
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
            className="flex-1 px-4 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white/80"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-amber-900 font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Send
          </button>
        </form>
      </div>

      {/* Chat Room Selection - Below Chat Interface */}
      <div className="bg-white/80 backdrop-blur-sm border-2 border-amber-200/50 rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-amber-900 mb-4">
          Select Chat Room
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {chatRooms.map((room) => (
            <button
              key={room.id}
              onClick={() => setSelectedRoom(room.id)}
              className={`p-4 text-center rounded-lg transition-all duration-200 ${
                selectedRoom === room.id
                  ? 'bg-gradient-to-r from-yellow-200 to-amber-300 border-2 border-yellow-400 shadow-md'
                  : 'bg-white/60 hover:bg-white/80 border border-amber-200/50 hover:border-yellow-300/70 hover:shadow-md'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <span className="text-3xl">{room.icon}</span>
                <div className="text-center">
                  <h3 className={`font-medium text-sm ${
                    selectedRoom === room.id ? 'text-amber-800' : 'text-amber-900'
                  }`}>
                    {room.name}
                  </h3>
                  <p className={`text-xs ${
                    selectedRoom === room.id ? 'text-amber-700' : 'text-amber-700'
                  }`}>
                    {room.description}
                  </p>
                </div>
                <div className="flex items-center justify-center space-x-4 text-xs text-amber-600">
                  <span>👥 {room.activeUsers}</span>
                  <span>💬 {room.lastMessage}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tavern Activity */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-sm border-2 border-amber-200/50 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-amber-900 mb-4">
            Tavern Activity
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-amber-700">Active Travelers:</span>
              <span className="font-medium text-amber-600">47</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-amber-700">Missions Available:</span>
              <span className="font-medium text-amber-600">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-amber-700">Recent Arrivals:</span>
              <span className="font-medium text-amber-600">3</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-amber-700">Special Events:</span>
              <span className="font-medium text-amber-600">2</span>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border-2 border-amber-200/50 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-amber-900 mb-4">
            Call to Action
          </h3>
          <p className="text-amber-700 text-sm mb-4">
            Ready to start your adventure? Check out the mission board or join a chat room to connect with other Travelers.
          </p>
          <div className="space-y-2">
            <button className="w-full p-3 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-amber-900 font-bold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
              🗺️ View Available Missions
            </button>
            <button className="w-full p-3 bg-gradient-to-r from-amber-700 to-yellow-800 hover:from-amber-800 hover:to-yellow-900 text-yellow-100 font-bold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
              📋 Post a Mission
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

