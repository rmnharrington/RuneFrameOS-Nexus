"use client"

import React from 'react'

export default function AppFooter() {
  return (
    <footer className="bg-gradient-to-r from-amber-900 via-yellow-800 to-amber-700 border-t-2 border-yellow-400/30 text-yellow-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4 text-yellow-200">
              About BrokeUnicorn Tavern
            </h3>
            <p className="text-yellow-100 text-sm leading-relaxed mb-4">
              A legendary establishment at the heart of the realm, where Travelers gather to share tales, 
              accept missions, and forge alliances. The BrokeUnicorn has stood for generations as a beacon 
              of hope and adventure in these troubled times.
            </p>
            <div className="flex space-x-4">
              <span className="text-xs text-yellow-300">🏰 Established: Year 127</span>
              <span className="text-xs text-yellow-300">👥 Capacity: 200+ Travelers</span>
              <span className="text-xs text-yellow-300">⭐ Rating: 4.8/5</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-md font-semibold mb-4 text-yellow-200">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-yellow-100">
              <li>🍺 Fine Ale & Mead</li>
              <li>🍖 Hot Meals & Provisions</li>
              <li>🛏️ Clean Lodging</li>
              <li>🗡️ Weapon Maintenance</li>
              <li>📚 Lore & Information</li>
              <li>🎲 Gaming & Entertainment</li>
            </ul>
          </div>

          {/* Contact & Info */}
          <div>
            <h4 className="text-md font-semibold mb-4 text-yellow-200">
              Contact & Info
            </h4>
            <div className="space-y-2 text-sm text-yellow-100">
              <p>📍 Central District, Capital City</p>
              <p>🕐 Open: 24/7 (Always)</p>
              <p>📧 TavernKeeper@BrokeUnicorn.com</p>
              <p>📞 Emergency: Signal Fire</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-yellow-400/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-yellow-200 text-sm">
                © 2024 BrokeUnicorn Tavern • Part of the RuneFrameOS Network
              </p>
              <p className="text-yellow-300 text-xs mt-1">
                "Where every Traveler finds their story"
              </p>
            </div>
            <div className="flex space-x-6">
              <span className="text-xs text-yellow-300">Privacy Policy</span>
              <span className="text-xs text-yellow-300">Terms of Service</span>
              <span className="text-xs text-yellow-300">Support</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-yellow-400">
            ⚠️ This is a mockup application for demonstration purposes. 
            No actual tavern services are available. 
            Part of the RuneFrameOS development project.
          </p>
        </div>
      </div>
    </footer>
  )
}

