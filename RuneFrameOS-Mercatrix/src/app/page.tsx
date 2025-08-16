'use client'

import AppLayout from '@/components/core/AppLayout'
import HeroBanner from '@/components/core/HeroBanner'

export default function HomePage() {
  return (
    <AppLayout>
      <div className="p-4 lg:p-6">
        <div className="space-y-6">
          {/* Hero Banner */}
          <HeroBanner
            appName="Mercatrix"
            heroBannerImage="/Mercatrix_HeroBanner.png"
            title="Welcome to Mercatrix"
            subtitle="Comprehensive economy management system for all gaming genres and systems. Build entire economies from macro-world scale down to individual vendor inventories, manage trade routes, currency systems, and economic policies."
            details={[
              { icon: "🌍", text: "Location: Economic District" },
              { icon: "💼", text: "Manager: Master Economist Thaddeus" },
              { icon: "💰", text: "Specialty: Economy & Trade Management" }
            ]}
          />

          {/* Economy Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-gold-800/50 to-stone-800/50 rounded-lg p-4 border border-gold-700/50 text-center">
              <div className="text-2xl mb-2">🌍</div>
              <div className="text-gold-100 font-bold text-xl">8</div>
              <div className="text-gold-300 text-sm">Active Economies</div>
            </div>
            <div className="bg-gradient-to-br from-character-800/50 to-stone-800/50 rounded-lg p-4 border border-character-700/50 text-center">
              <div className="text-2xl mb-2">🏪</div>
              <div className="text-character-100 font-bold text-xl">24</div>
              <div className="text-character-300 text-sm">Trading Markets</div>
            </div>
            <div className="bg-gradient-to-br from-dice-800/50 to-stone-800/50 rounded-lg p-4 border border-dice-700/50 text-center">
              <div className="text-2xl mb-2">👨‍💼</div>
              <div className="text-dice-100 font-bold text-xl">156</div>
              <div className="text-dice-100 text-sm">Active Vendors</div>
            </div>
          </div>

          {/* Economy Management Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-6 border border-stone-700/50">
              <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">Macro-Economy Management</h2>
              <div className="space-y-3">
                <div className="bg-stone-800/50 rounded p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gold-100">World-Scale Economies</h3>
                      <p className="text-sm text-gold-300">Manage entire world economies with multiple nations, trade agreements, and economic policies</p>
                    </div>
                    <span className="text-xs bg-gold-700 text-gold-100 px-2 py-1 rounded">Active</span>
                  </div>
                </div>
                <div className="bg-stone-800/50 rounded p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gold-100">Inter-Galactic Trade</h3>
                      <p className="text-sm text-gold-300">Handle space-faring economies with multiple star systems and interstellar commerce</p>
                    </div>
                    <span className="text-xs bg-character-700 text-character-100 px-2 py-1 rounded">Expanding</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-6 border border-stone-700/50">
              <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">Micro-Economy Details</h2>
              <div className="space-y-3">
                <div className="bg-stone-800/50 rounded p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gold-100">Individual Vendors</h3>
                      <p className="text-sm text-gold-300">Manage specific merchant inventories, pricing, and availability</p>
                    </div>
                    <span className="text-xs bg-gold-700 text-gold-100 px-2 py-1 rounded">Detailed</span>
                  </div>
                </div>
                <div className="bg-stone-800/50 rounded p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gold-100">Street-Level Markets</h3>
                      <p className="text-sm text-gold-300">Track individual stalls, black markets, and underground economies</p>
                    </div>
                    <span className="text-xs bg-character-700 text-character-100 px-2 py-1 rounded">Granular</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trade Route Management */}
          <div className="bg-gradient-to-br from-gold-800/50 to-stone-900/50 rounded-lg p-6 border border-gold-700/50">
            <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">Trade Route Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl mb-2">🛣️</div>
                <h3 className="font-semibold text-gold-100 mb-1">Route Creation</h3>
                <p className="text-sm text-gold-300">Design commercial pathways between cities, nations, and worlds</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">📦</div>
                <h3 className="font-semibold text-gold-100 mb-1">Cargo Management</h3>
                <p className="text-sm text-gold-300">Track goods, tariffs, and transportation costs along routes</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">⚔️</div>
                <h3 className="font-semibold text-gold-100 mb-1">Security & Risk</h3>
                <p className="text-sm text-gold-300">Manage bandits, pirates, and political instability</p>
              </div>
            </div>
          </div>

          {/* Currency Systems */}
          <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-6 border border-stone-700/50">
            <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">Currency & Financial Systems</h2>
            <div className="space-y-4">
              <div className="bg-stone-800/50 rounded p-4">
                <h3 className="font-semibold text-gold-100 mb-2">Multi-Currency Support</h3>
                <p className="text-sm text-gold-300 mb-3">Handle multiple currencies, exchange rates, and economic policies across different regions and gaming systems. Support for gold pieces, credits, shells, or any custom currency.</p>
                <button className="px-4 py-2 bg-gradient-to-r from-gold-700 to-stone-700 rounded-lg text-sm text-gold-100 hover:from-gold-600 hover:to-stone-600 transition-all duration-200">💰 Create Currency</button>
              </div>
              <div className="bg-stone-800/50 rounded p-4">
                <h3 className="font-semibold text-gold-100 mb-2">Economic Policies</h3>
                <p className="text-sm text-gold-300 mb-3">Implement inflation, deflation, trade restrictions, and economic sanctions. Control how economies respond to player actions and world events.</p>
                <button className="px-4 py-2 bg-gradient-to-r from-character-700 to-dice-700 rounded-lg text-sm text-white hover:from-character-600 hover:to-dice-700 transition-all duration-200">📊 Set Policies</button>
              </div>
            </div>
          </div>

          {/* Vendor Management */}
          <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-6 border border-stone-700/50">
            <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">Vendor & Inventory Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-stone-800/50 rounded p-4 text-center">
                <div className="text-3xl mb-2">👨‍💼</div>
                <h3 className="font-semibold text-gold-100 mb-2">Vendor Creation</h3>
                <p className="text-sm text-gold-300">Create individual merchants with unique personalities, specialties, and inventory preferences</p>
              </div>
              <div className="bg-stone-800/50 rounded p-4 text-center">
                <div className="text-3xl mb-2">📦</div>
                <h3 className="font-semibold text-gold-100 mb-2">Inventory Systems</h3>
                <p className="text-sm text-gold-300">Manage what each vendor sells, restocking schedules, and seasonal availability</p>
              </div>
              <div className="bg-stone-800/50 rounded p-4 text-center">
                <div className="text-3xl mb-2">💱</div>
                <h3 className="font-semibold text-gold-100 mb-2">Pricing Models</h3>
                <p className="text-sm text-gold-300">Set dynamic pricing based on supply, demand, location, and vendor personality</p>
              </div>
              <div className="bg-stone-800/50 rounded p-4 text-center">
                <div className="text-3xl mb-2">🎭</div>
                <h3 className="font-semibold text-gold-100 mb-2">Vendor AI</h3>
                <p className="text-sm text-gold-300">Create realistic merchant behavior and negotiation patterns</p>
              </div>
            </div>
          </div>

          {/* Cross-Genre Support */}
          <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-6 border border-stone-700/50">
            <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">Cross-Genre & System Support</h2>
            <div className="space-y-4">
              <div className="bg-stone-800/50 rounded p-4">
                <h3 className="font-semibold text-gold-100 mb-2">Universal Economy Engine</h3>
                <p className="text-sm text-gold-300 mb-3">Works seamlessly across all gaming genres and systems. From medieval fantasy kingdoms to cyberpunk megacities, from space opera empires to post-apocalyptic wastelands. Every economy can be modeled with the same powerful tools.</p>
                <button className="px-4 py-2 bg-gradient-to-r from-gold-700 to-stone-700 rounded-lg text-sm text-gold-100 hover:from-gold-600 hover:to-stone-600 transition-all duration-200">🌍 Create New Economy</button>
              </div>
              <div className="bg-stone-800/50 rounded p-4">
                <h3 className="font-semibold text-gold-100 mb-2">System Integration</h3>
                <p className="text-sm text-gold-300 mb-3">Export economy data to other RuneFrameOS applications. Hoardwell can download vendor inventories, LoreForge can integrate economic policies into world-building, and all apps can share economic data seamlessly.</p>
                <button className="px-4 py-2 bg-gradient-to-r from-character-700 to-dice-700 rounded-lg text-sm text-white hover:from-character-600 hover:to-dice-700 transition-all duration-200">🔗 Connect Apps</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
