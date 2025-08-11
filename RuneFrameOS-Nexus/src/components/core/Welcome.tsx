"use client"

import React from 'react'

export default function Welcome() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
                 <div className="relative">
           <div className="w-32 h-32 mx-auto bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl glow overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200" onClick={() => window.location.href = '/dashboard'}>
             <img 
               src="/RuneFrameOS_NoText.png" 
               alt="RuneFrameOS" 
               className="w-20 h-20 object-contain"
             />
           </div>
           <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/30 via-orange-400/30 to-red-400/30 rounded-full blur-xl animate-pulse"></div>
           <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-amber-700 bg-amber-100/80 px-2 py-1 rounded-full border border-amber-300/50">
             Click to access Dashboard
           </div>
         </div>
        
        <div className="space-y-3">
          <h2 className="text-3xl font-fantasy font-bold text-gradient text-shadow">Welcome, You Magnificent Bastard</h2>
          <p className="text-lg text-secondary-700 max-w-2xl mx-auto leading-relaxed">
            You've entered the <span className="font-semibold text-amber-700">RuneFrameOS Nexus</span> — 
            where we don't just play games, we <span className="italic">forge</span> them. 
            Built by gamers, for gamers, because we're tired of the corporate bullshit too.
          </p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="card rune-border">
          <div className="relative z-10">
            <h3 className="text-xl font-fantasy font-semibold text-amber-800 mb-4 flex items-center">
              <span className="mr-2">🎲</span> What You Can Actually Do
            </h3>
            <ul className="space-y-3 text-secondary-700">
              <li className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
                <span>Access all your apps without the corporate BS</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
                <span>Connect to services that actually work</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
                <span>Build the system you want, not what they want</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="card rune-border">
          <div className="relative z-10">
            <h3 className="text-xl font-fantasy font-semibold text-amber-800 mb-4 flex items-center">
              <span className="mr-2">🔮</span> System Status (It's Working, Stop Asking)
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-secondary-700">Core Services</span>
                <span className="text-green-600 font-semibold flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-secondary-700">Shared Services</span>
                <span className="text-green-600 font-semibold flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-secondary-700">Database</span>
                <span className="text-green-600 font-semibold flex items-center">
                  <span className="text-green-600 font-semibold flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    Online
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
             <div className="text-center">
         <button 
           onClick={() => window.location.href = '/dashboard'}
           className="btn-primary text-lg px-8 py-4 glow hover:scale-105 transition-transform duration-200"
         >
           🚀 Let's Build Something Awesome
         </button>
       </div>
    </div>
  )
}
