import AppLayout from '../components/core/AppLayout'
import HeroBanner from '../components/core/HeroBanner'

export default function Home() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Welcome Section with Hero Banner Background */}
        <HeroBanner
          appName="Travelers Table"
          heroBannerImage="/TravelersTable_HeroBanner.png"
          title="Welcome to Travelers Table"
          subtitle="GameMaster's command center for managing campaigns, character sheets, inventories, XP, and blind rolls across all gaming systems and genres."
          details={[
            { icon: "🎲", text: "System: Multi-Genre Support" },
            { icon: "👑", text: "Role: GameMaster Tools" },
            { icon: "🕯️", text: "Focus: Campaign Management" }
          ]}
        />

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-gold-800/50 to-stone-800/50 rounded-lg p-4 border border-gold-700/50 text-center">
            <div className="text-2xl mb-2">👥</div>
            <div className="text-gold-100 font-bold text-xl">4</div>
            <div className="text-gold-300 text-sm">Active Players</div>
          </div>
          
          <div className="bg-gradient-to-br from-character-800/50 to-stone-800/50 rounded-lg p-4 border border-character-700/50 text-center">
            <div className="text-2xl mb-2">🗺️</div>
            <div className="text-character-100 font-bold text-xl">2</div>
            <div className="text-character-300 text-sm">Active Campaigns</div>
          </div>
          
          <div className="bg-gradient-to-br from-dice-800/50 to-stone-800/50 rounded-lg p-4 border border-dice-700/50 text-center">
            <div className="text-2xl mb-2">⭐</div>
            <div className="text-dice-100 font-bold text-xl">8</div>
            <div className="text-dice-300 text-sm">Average Level</div>
          </div>
        </div>

        {/* Featured Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Campaigns */}
          <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-6 border border-stone-700/50">
            <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">
              Active Campaigns
            </h2>
            <div className="space-y-3">
              <div className="bg-stone-800/50 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gold-100">Shadowfell Expedition</h3>
                    <p className="text-sm text-gold-300">D&D 5E • Session 12 • Level 8</p>
                  </div>
                  <span className="text-xs bg-gold-700 text-gold-100 px-2 py-1 rounded">Active</span>
                </div>
              </div>
              
              <div className="bg-stone-800/50 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gold-100">Cyberpunk 2077</h3>
                    <p className="text-sm text-gold-300">Cyberpunk Red • Session 5 • Street Level</p>
                  </div>
                  <span className="text-xs bg-character-700 text-character-100 px-2 py-1 rounded">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Actions */}
          <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-6 border border-stone-700/50">
            <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">
              Recent Actions
            </h2>
            <div className="space-y-3">
              <div className="bg-stone-800/50 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gold-100">XP Awarded</h3>
                    <p className="text-sm text-gold-300">+300 XP to Rogue player</p>
                  </div>
                  <span className="text-xs bg-gold-700 text-gold-100 px-2 py-1 rounded">2 min ago</span>
                </div>
              </div>
              
              <div className="bg-stone-800/50 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gold-100">Blind Roll</h3>
                    <p className="text-sm text-gold-300">d20 Stealth check (hidden)</p>
                  </div>
                  <span className="text-xs bg-character-700 text-character-100 px-2 py-1 rounded">5 min ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GameMaster Tools */}
        <div className="bg-gradient-to-br from-gold-800/50 to-stone-900/50 rounded-lg p-6 border border-gold-700/50">
          <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">
            GameMaster Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl mb-2">👤</div>
              <h3 className="font-semibold text-gold-100 mb-1">Character Management</h3>
              <p className="text-sm text-gold-300">View sheets, adjust stats, manage inventories</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-2">🎲</div>
              <h3 className="font-semibold text-gold-100 mb-1">Blind Rolls</h3>
              <p className="text-sm text-gold-300">Hidden dice rolls for secret checks and saves</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-2">⭐</div>
              <h3 className="font-semibold text-gold-100 mb-1">XP & Leveling</h3>
              <p className="text-sm text-gold-300">Award experience, track progression, manage levels</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
