import AppLayout from '../components/core/AppLayout'
import HeroBanner from '../components/core/HeroBanner'

export default function Home() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Welcome Section with Hero Banner Background */}
        <HeroBanner
          appName="Hoardwell"
          heroBannerImage="/Hoardwell_HeroBanner.png"
          title="Welcome to Hoardwell"
          subtitle="Comprehensive equipment management system for all gaming genres and systems. Buy, sell, manage durability, carry locations, and download predefined equipment lists from Mercatrix."
          details={[
            { icon: "🎒", text: "Location: Equipment District" },
            { icon: "🛒", text: "Manager: Master Merchant Thaddeus" },
            { icon: "⚔️", text: "Specialty: Equipment & Trading" }
          ]}
        />

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-gold-800/50 to-stone-800/50 rounded-lg p-4 border border-gold-700/50 text-center">
            <div className="text-2xl mb-2">🎒</div>
            <div className="text-gold-100 font-bold text-xl">42</div>
            <div className="text-gold-300 text-sm">Items in Inventory</div>
          </div>
          
          <div className="bg-gradient-to-br from-character-800/50 to-stone-800/50 rounded-lg p-4 border border-character-700/50 text-center">
            <div className="text-2xl mb-2">🛒</div>
            <div className="text-character-100 font-bold text-xl">15</div>
            <div className="text-character-300 text-sm">Shop Items Available</div>
          </div>
          
          <div className="bg-gradient-to-br from-dice-800/50 to-stone-800/50 rounded-lg p-4 border border-dice-700/50 text-center">
            <div className="text-2xl mb-2">📋</div>
            <div className="text-dice-100 font-bold text-xl">8</div>
            <div className="text-dice-100 text-sm">Equipment Lists</div>
          </div>
        </div>

        {/* Featured Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Latest Equipment */}
          <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-6 border border-stone-700/50">
            <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">
              Latest Equipment
            </h2>
            <div className="space-y-3">
              <div className="bg-stone-800/50 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gold-100">Dragon's Fang Sword</h3>
                    <p className="text-sm text-gold-300">Legendary weapon • 95% durability</p>
                  </div>
                  <span className="text-xs bg-gold-700 text-gold-100 px-2 py-1 rounded">Equipped</span>
                </div>
              </div>
              
              <div className="bg-stone-800/50 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gold-100">Healing Potion</h3>
                    <p className="text-sm text-gold-300">Consumable • 100% durability</p>
                  </div>
                  <span className="text-xs bg-character-700 text-character-100 px-2 py-1 rounded">Inventory</span>
                </div>
              </div>
            </div>
          </div>

          {/* Available Equipment Lists */}
          <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-6 border border-stone-700/50">
            <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">
              Available Equipment Lists
            </h2>
            <div className="space-y-3">
              <div className="bg-stone-800/50 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gold-100">D&D 5e Starter Pack</h3>
                    <p className="text-sm text-gold-300">Basic equipment for new adventurers</p>
                  </div>
                  <span className="text-xs bg-gold-700 text-gold-100 px-2 py-1 rounded">Download</span>
                </div>
              </div>
              
              <div className="bg-stone-800/50 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gold-100">Pathfinder 2e Gear</h3>
                    <p className="text-sm text-gold-300">Advanced equipment for experienced players</p>
                  </div>
                  <span className="text-xs bg-character-700 text-character-100 px-2 py-1 rounded">Download</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Equipment Management Features */}
        <div className="bg-gradient-to-br from-gold-800/50 to-stone-900/50 rounded-lg p-6 border border-gold-700/50">
          <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">
            Equipment Management Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl mb-2">🛒</div>
              <h3 className="font-semibold text-gold-100 mb-1">Buy & Sell</h3>
              <p className="text-sm text-gold-300">Purchase new equipment, sell unwanted items, manage your gold</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-2">⚔️</div>
              <h3 className="font-semibold text-gold-100 mb-1">Durability Tracking</h3>
              <p className="text-sm text-gold-300">Monitor equipment condition, repair items, track wear and tear</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-2">📍</div>
              <h3 className="font-semibold text-gold-100 mb-1">Carry Locations</h3>
              <p className="text-sm text-gold-300">Manage storage slots, organize inventory, track item placement</p>
            </div>
          </div>
        </div>

        {/* Mercatrix Integration */}
        <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-6 border border-stone-700/50">
          <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">
            Mercatrix Integration
          </h2>
          <div className="space-y-4">
            <div className="bg-stone-800/50 rounded p-4">
              <h3 className="font-semibold text-gold-100 mb-2">GM Control Panel</h3>
              <p className="text-sm text-gold-300 mb-3">
                Game Masters can manage what players can buy and sell through Mercatrix integration. 
                Control equipment availability, pricing, and restrictions across all gaming systems.
              </p>
              <button className="px-4 py-2 bg-gradient-to-r from-gold-700 to-stone-700 rounded-lg text-sm text-gold-100 hover:from-gold-600 hover:to-stone-600 transition-all duration-200">
                🔗 Connect to Mercatrix
              </button>
            </div>
            
            <div className="bg-stone-800/50 rounded p-4">
              <h3 className="font-semibold text-gold-100 mb-2">Predefined Equipment Lists</h3>
              <p className="text-sm text-gold-300 mb-3">
                Download curated equipment lists created in Mercatrix. 
                Perfect for new campaigns, specific genres, or themed adventures.
              </p>
              <button className="px-4 py-2 bg-gradient-to-r from-character-700 to-dice-700 rounded-lg text-sm text-white hover:from-character-600 hover:to-dice-700 transition-all duration-200">
                📋 Browse Equipment Lists
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
