import AppLayout from '../components/core/AppLayout'
import HeroBanner from '../components/core/HeroBanner'

export default function Home() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Welcome Section with Hero Banner Background */}
        <HeroBanner
          appName="ChimerraForge"
          heroBannerImage="/ChimerraForge_HeroBanner.png"
          title="Welcome to ChimerraForge"
          subtitle="Character-weaver of RuneFrameOS™. Forges richly detailed NPCs with full backgrounds, personalities, cultural idioms, and reactive behaviors, then delivers only the essential traits to connected apps."
          details={[
            { icon: "⚒️", text: "System: AI-Powered Forging" },
            { icon: "🎭", text: "Role: Character Weaver" },
            { icon: "🧠", text: "Focus: NPC Generation" }
          ]}
        />
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-gold-800/50 to-stone-800/50 rounded-lg p-4 border border-gold-700/50 text-center">
            <div className="text-2xl mb-2">⚒️</div>
            <div className="text-gold-100 font-bold text-xl">1,247</div>
            <div className="text-gold-300 text-sm">Characters Forged</div>
          </div>
          <div className="bg-gradient-to-br from-character-800/50 to-stone-800/50 rounded-lg p-4 border border-character-700/50 text-center">
            <div className="text-2xl mb-2">🎭</div>
            <div className="text-character-100 font-bold text-xl">47</div>
            <div className="text-character-300 text-sm">Personality Types</div>
          </div>
          <div className="bg-gradient-to-br from-dice-800/50 to-stone-800/50 rounded-lg p-4 border border-dice-700/50 text-center">
            <div className="text-2xl mb-2">🌍</div>
            <div className="text-dice-100 font-bold text-xl">23</div>
            <div className="text-dice-300 text-sm">Cultural Templates</div>
          </div>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Characters */}
          <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-6 border border-stone-700/50">
            <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">Recently Forged Characters</h2>
            <div className="space-y-3">
              <div className="bg-stone-800/50 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gold-100">Eldara the Mystic</h3>
                    <p className="text-sm text-gold-300">Elven Sage • Level 12 • Wise & Mysterious</p>
                  </div>
                  <span className="text-xs bg-gold-700 text-gold-100 px-2 py-1 rounded">Active</span>
                </div>
              </div>
              <div className="bg-stone-800/50 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gold-100">Thorin Ironfist</h3>
                    <p className="text-sm text-gold-300">Dwarf Warrior • Level 8 • Stubborn & Loyal</p>
                  </div>
                  <span className="text-xs bg-character-700 text-character-100 px-2 py-1 rounded">Active</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* AI Engine Status */}
          <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-6 border border-stone-700/50">
            <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">AI Engine Status</h2>
            <div className="space-y-3">
              <div className="bg-stone-800/50 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gold-100">Processing Queue</h3>
                    <p className="text-sm text-gold-300">2 character requests pending</p>
                  </div>
                  <span className="text-xs bg-gold-700 text-gold-100 px-2 py-1 rounded">2 min ago</span>
                </div>
              </div>
              <div className="bg-stone-800/50 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gold-100">AI Response Time</h3>
                    <p className="text-sm text-gold-300">Average: 3.2 seconds</p>
                  </div>
                  <span className="text-xs bg-character-700 text-character-100 px-2 py-1 rounded">Optimal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Character Forging Tools */}
        <div className="bg-gradient-to-br from-gold-800/50 to-stone-900/50 rounded-lg p-6 border border-gold-700/50">
          <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">Character Forging Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl mb-2">⚒️</div>
              <h3 className="font-semibold text-gold-100 mb-1">NPC Forge</h3>
              <p className="text-sm text-gold-300">Generate complete characters with AI-powered personality engines</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🎭</div>
              <h3 className="font-semibold text-gold-100 mb-1">Personality Engine</h3>
              <p className="text-sm text-gold-300">Create consistent behavioral patterns and reactive responses</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🌍</div>
              <h3 className="font-semibold text-gold-100 mb-1">Cultural Database</h3>
              <p className="text-sm text-gold-300">Access rich cultural backgrounds and world-building elements</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}





