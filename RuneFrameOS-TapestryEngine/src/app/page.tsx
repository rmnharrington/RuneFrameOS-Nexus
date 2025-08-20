import AppLayout from '../components/core/AppLayout'
import HeroBanner from '../components/core/HeroBanner'

export default function Home() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Welcome Section with Hero Banner Background */}
        <HeroBanner
          appName="TapestryEngine"
          heroBannerImage="/TapestryEngine_HeroBanner.png"
          title="Welcome to TapestryEngine"
          subtitle="Powerful campaign and story building engine for creating immersive narratives that keep players engaged for hours."
          details={[
            { icon: "🗺️", text: "Location: Story Forge District" },
            { icon: "📖", text: "Master: Loremaster Weaver" },
            { icon: "🎭", text: "Specialty: Narrative Creation" }
          ]}
        />

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-gold-800/50 to-stone-800/50 rounded-lg p-4 border border-gold-700/50 text-center">
            <div className="text-2xl mb-2">🗺️</div>
            <div className="text-gold-100 font-bold text-xl">3</div>
            <div className="text-gold-300 text-sm">Active Campaigns</div>
          </div>
          
          <div className="bg-gradient-to-br from-character-800/50 to-stone-800/50 rounded-lg p-4 border border-character-700/50 text-center">
            <div className="text-2xl mb-2">👥</div>
            <div className="text-character-100 font-bold text-xl">28</div>
            <div className="text-character-300 text-sm">NPCs Created</div>
          </div>
          
          <div className="bg-gradient-to-br from-dice-800/50 to-stone-800/50 rounded-lg p-4 border border-dice-700/50 text-center">
            <div className="text-2xl mb-2">🎣</div>
            <div className="text-dice-100 font-bold text-xl">156</div>
            <div className="text-dice-300 text-sm">Story Hooks</div>
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
                    <h3 className="font-semibold text-gold-100">🗺️ Shadow of the Ancients</h3>
                    <p className="text-sm text-gold-300">Fantasy campaign • 12 sessions</p>
                  </div>
                  <span className="text-xs bg-gold-700 text-gold-100 px-2 py-1 rounded">Active</span>
                </div>
              </div>
              
              <div className="bg-stone-800/50 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gold-100">🚀 Starfall Chronicles</h3>
                    <p className="text-sm text-gold-300">Sci-fi campaign • 8 sessions</p>
                  </div>
                  <span className="text-xs bg-character-700 text-character-100 px-2 py-1 rounded">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Creations */}
          <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-6 border border-stone-700/50">
            <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">
              Recent Creations
            </h2>
            <div className="space-y-3">
              <div className="bg-stone-800/50 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gold-100">Eldric the Sage</h3>
                    <p className="text-sm text-gold-300">NPC • 2 hours ago</p>
                  </div>
                  <span className="text-xs bg-gold-700 text-gold-100 px-2 py-1 rounded">Complete</span>
                </div>
              </div>
              
              <div className="bg-stone-800/50 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gold-100">The Lost Temple</h3>
                    <p className="text-sm text-gold-300">Location • Yesterday</p>
                  </div>
                  <span className="text-xs bg-character-700 text-character-100 px-2 py-1 rounded">Complete</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Story Building Tools */}
        <div className="bg-gradient-to-br from-gold-800/50 to-stone-900/50 rounded-lg p-6 border border-gold-700/50">
          <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">
            Story Building Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl mb-2">🗺️</div>
              <h3 className="font-semibold text-gold-100 mb-1">Campaign Builder</h3>
              <p className="text-sm text-gold-300">Create epic campaigns with multiple story arcs, locations, and NPCs</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-2">👥</div>
              <h3 className="font-semibold text-gold-100 mb-1">NPC Generator</h3>
              <p className="text-sm text-gold-300">Build compelling characters with motivations, backstories, and plot hooks</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-2">🎣</div>
              <h3 className="font-semibold text-gold-100 mb-1">Hook Engine</h3>
              <p className="text-sm text-gold-300">Generate engaging story hooks that keep players invested for hours</p>
            </div>
          </div>
        </div>

        {/* Cross-System Compatibility */}
        <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-6 border border-stone-700/50">
          <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">
            Cross-System Compatibility
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gold-100 mb-2">Supported Genres</h3>
              <div className="space-y-1 text-sm text-gold-300">
                <div>• Fantasy & Medieval</div>
                <div>• Science Fiction</div>
                <div>• Modern & Urban</div>
                <div>• Horror & Mystery</div>
                <div>• Post-Apocalyptic</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gold-100 mb-2">Gaming Systems</h3>
              <div className="space-y-1 text-sm text-gold-300">
                <div>• Echeladon (Proprietary)</div>
                <div>• D&D 5e & Pathfinder</div>
                <div>• Call of Cthulhu</div>
                <div>• Savage Worlds</div>
                <div>• Custom Systems</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
