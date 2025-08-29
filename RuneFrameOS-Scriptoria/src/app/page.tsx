import AppLayout from '../components/core/AppLayout'
import HeroBanner from '../components/core/HeroBanner'
import { SystemProvider } from '../contexts/SystemContext'

export default function Home() {
  return (
    <SystemProvider>
      <AppLayout>
      <div className="space-y-6">
        {/* Welcome Section with Hero Banner Background */}
        <HeroBanner
          appName="Scriptoria"
          heroBannerImage="/Scriptoria_HeroBanner.png"
          title="Welcome to Scriptoria"
          subtitle="Comprehensive gaming systems library for reading rules and implementing game mechanics across all systems."
          details={[
            { icon: "📚", text: "Location: Library District" },
            { icon: "⚔️", text: "Master: Loremaster Echeladon" },
            { icon: "🎲", text: "Specialty: Multi-System Support" }
          ]}
        />

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-gold-800/50 to-stone-800/50 rounded-lg p-4 border border-gold-700/50 text-center">
            <div className="text-2xl mb-2">📚</div>
            <div className="text-gold-100 font-bold text-xl">5</div>
            <div className="text-gold-300 text-sm">Game Systems</div>
          </div>
          
          <div className="bg-gradient-to-br from-character-800/50 to-stone-800/50 rounded-lg p-4 border border-character-700/50 text-center">
            <div className="text-2xl mb-2">📖</div>
            <div className="text-character-100 font-bold text-xl">24</div>
            <div className="text-character-300 text-sm">Rules Loaded</div>
          </div>
          
          <div className="bg-gradient-to-br from-dice-800/50 to-stone-800/50 rounded-lg p-4 border border-dice-700/50 text-center">
            <div className="text-2xl mb-2">🎲</div>
            <div className="text-dice-100 font-bold text-xl">156</div>
            <div className="text-dice-300 text-sm">Mechanics Available</div>
          </div>
        </div>

        {/* Featured Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Available Systems */}
          <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-6 border border-stone-700/50">
            <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">
              Available Systems
            </h2>
            <div className="space-y-3">
              <div className="bg-stone-800/50 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gold-100">⚔️ Echeladon</h3>
                    <p className="text-sm text-gold-300">Proprietary system • Complete ruleset</p>
                  </div>
                  <span className="text-xs bg-gold-700 text-gold-100 px-2 py-1 rounded">Active</span>
                </div>
              </div>
              
              <div className="bg-stone-800/50 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gold-100">🐉 D&D 5e</h3>
                    <p className="text-sm text-gold-300">Wizards of the Coast • Core rules</p>
                  </div>
                  <span className="text-xs bg-character-700 text-character-100 px-2 py-1 rounded">Ready</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Rules */}
          <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-6 border border-stone-700/50">
            <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">
              Recent Rules
            </h2>
            <div className="space-y-3">
              <div className="bg-stone-800/50 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gold-100">Combat Mechanics</h3>
                    <p className="text-sm text-gold-300">Echeladon system • 2 hours ago</p>
                  </div>
                  <span className="text-xs bg-gold-700 text-gold-100 px-2 py-1 rounded">Active</span>
                </div>
              </div>
              
              <div className="bg-stone-800/50 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gold-100">Magic System</h3>
                    <p className="text-sm text-gold-300">Echeladon system • Yesterday</p>
                  </div>
                  <span className="text-xs bg-character-700 text-character-100 px-2 py-1 rounded">Complete</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Specialties */}
        <div className="bg-gradient-to-br from-gold-800/50 to-stone-900/50 rounded-lg p-6 border border-gold-700/50">
          <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">
            System Specialties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl mb-2">⚔️</div>
              <h3 className="font-semibold text-gold-100 mb-1">Echeladon</h3>
              <p className="text-sm text-gold-300">Proprietary system with complete ruleset, combat mechanics, and magic system</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-2">📚</div>
              <h3 className="font-semibold text-gold-100 mb-1">Third-Party Systems</h3>
              <p className="text-sm text-gold-300">D&D 5e, Pathfinder, Starfinder, Call of Cthulhu, Savage Worlds</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-2">🎲</div>
              <h3 className="font-semibold text-gold-100 mb-1">Mechanics Library</h3>
              <p className="text-sm text-gold-300">Comprehensive collection of game mechanics and implementation tools</p>
            </div>
          </div>
        </div>
      </div>
      </AppLayout>
    </SystemProvider>
  )
}
