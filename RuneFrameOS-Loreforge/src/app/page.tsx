import AppLayout from '../components/core/AppLayout'
import HeroBanner from '../components/core/HeroBanner'

export default function Home() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Welcome Section with Hero Banner Background */}
        <HeroBanner
          appName="LoreForge"
          heroBannerImage="/LoreForge_HeroBanner.png"
          title="Welcome to LoreForge"
          subtitle="Comprehensive world-building system for all gaming genres and systems. Create entire worlds, countries, races, POIs, and manage everything from galaxy-scale to street-level details."
          details={[
            { icon: "🌍", text: "Location: World Building District" },
            { icon: "🔥", text: "Manager: Master Lore Smith" },
            { icon: "🏰", text: "Specialty: World Creation & Management" }
          ]}
        />

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-gold-800/50 to-stone-800/50 rounded-lg p-4 border border-gold-700/50 text-center">
            <div className="text-2xl mb-2">🌍</div>
            <div className="text-gold-100 font-bold text-xl">12</div>
            <div className="text-gold-300 text-sm">Worlds Created</div>
          </div>
          
          <div className="bg-gradient-to-br from-character-800/50 to-stone-800/50 rounded-lg p-4 border border-character-700/50 text-center">
            <div className="text-2xl mb-2">🏰</div>
            <div className="text-character-100 font-bold text-xl">47</div>
            <div className="text-character-300 text-sm">Countries & Kingdoms</div>
          </div>
          
          <div className="bg-gradient-to-br from-dice-800/50 to-stone-800/50 rounded-lg p-4 border border-dice-700/50 text-center">
            <div className="text-2xl mb-2">👥</div>
            <div className="text-dice-100 font-bold text-xl">23</div>
            <div className="text-dice-100 text-sm">Races & Cultures</div>
          </div>
        </div>

        {/* Featured Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Latest Worlds */}
          <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-6 border border-stone-700/50">
            <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">
              Latest Worlds
            </h2>
            <div className="space-y-3">
              <div className="bg-stone-800/50 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gold-100">Eldoria Prime</h3>
                    <p className="text-sm text-gold-300">High Fantasy • 7 countries, 12 races</p>
                  </div>
                  <span className="text-xs bg-gold-700 text-gold-100 px-2 py-1 rounded">Active</span>
                </div>
              </div>
              
              <div className="bg-stone-800/50 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gold-100">Nebula Sector 7</h3>
                    <p className="text-sm text-gold-300">Sci-Fi • 3 star systems, 8 planets</p>
                  </div>
                  <span className="text-xs bg-character-700 text-character-100 px-2 py-1 rounded">Expanding</span>
                </div>
              </div>
            </div>
          </div>

          {/* Available Templates */}
          <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-6 border border-stone-700/50">
            <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">
              World Templates
            </h2>
            <div className="space-y-3">
              <div className="bg-stone-800/50 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gold-100">Medieval Fantasy</h3>
                    <p className="text-sm text-gold-300">Complete kingdom starter pack</p>
                  </div>
                  <span className="text-xs bg-gold-700 text-gold-100 px-2 py-1 rounded">Use</span>
                </div>
              </div>
              
              <div className="bg-stone-800/50 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gold-100">Space Opera</h3>
                    <p className="text-sm text-gold-300">Galaxy-spanning civilization</p>
                  </div>
                  <span className="text-xs bg-character-700 text-character-100 px-2 py-1 rounded">Use</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* World Building Features */}
        <div className="bg-gradient-to-br from-gold-800/50 to-stone-900/50 rounded-lg p-6 border border-gold-700/50">
          <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">
            World Building Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl mb-2">🌌</div>
              <h3 className="font-semibold text-gold-100 mb-1">Macro Scale</h3>
              <p className="text-sm text-gold-300">Create entire galaxies, star systems, and worlds with comprehensive management</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-2">🏘️</div>
              <h3 className="font-semibold text-gold-100 mb-1">Micro Scale</h3>
              <p className="text-sm text-gold-300">Detail individual streets, buildings, and even the panhandler down the block</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-2">🔗</div>
              <h3 className="font-semibold text-gold-100 mb-1">Cross-Genre</h3>
              <p className="text-sm text-gold-300">Works across all gaming genres and systems seamlessly</p>
            </div>
          </div>
        </div>

        {/* Scale Management */}
        <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-6 border border-stone-700/50">
          <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">
            Scale Management
          </h2>
          <div className="space-y-4">
            <div className="bg-stone-800/50 rounded p-4">
              <h3 className="font-semibold text-gold-100 mb-2">Galaxy Level</h3>
              <p className="text-sm text-gold-300 mb-3">
                Manage entire galaxies with multiple star systems, interstellar politics, and cosmic-scale events. 
                Perfect for space opera and sci-fi campaigns.
              </p>
              <button className="px-4 py-2 bg-gradient-to-r from-gold-700 to-stone-700 rounded-lg text-sm text-gold-100 hover:from-gold-600 hover:to-stone-600 transition-all duration-200">
                🌌 Create Galaxy
              </button>
            </div>
            
            <div className="bg-stone-800/50 rounded p-4">
              <h3 className="font-semibold text-gold-100 mb-2">Street Level</h3>
              <p className="text-sm text-gold-300 mb-3">
                Detail individual streets, buildings, and NPCs. Track the panhandler outside your players' hideout, 
                the shopkeeper's daily routine, and every alleyway detail.
              </p>
              <button className="px-4 py-2 bg-gradient-to-r from-character-700 to-dice-700 rounded-lg text-sm text-white hover:from-character-600 hover:to-dice-700 transition-all duration-200">
                🏘️ Detail Street
              </button>
            </div>
          </div>
        </div>

        {/* World Elements */}
        <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-6 border border-stone-700/50">
          <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">
            World Elements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-stone-800/50 rounded p-4 text-center">
              <div className="text-3xl mb-2">🌍</div>
              <h3 className="font-semibold text-gold-100 mb-2">Worlds</h3>
              <p className="text-sm text-gold-300">Create entire planets with geography, climate, and ecosystems</p>
            </div>
            
            <div className="bg-stone-800/50 rounded p-4 text-center">
              <div className="text-3xl mb-2">🏰</div>
              <h3 className="font-semibold text-gold-100 mb-2">Countries</h3>
              <p className="text-sm text-gold-300">Manage nations, kingdoms, and political systems</p>
            </div>
            
            <div className="bg-stone-800/50 rounded p-4 text-center">
              <div className="text-3xl mb-2">👥</div>
              <h3 className="font-semibold text-gold-100 mb-2">Races</h3>
              <p className="text-sm text-gold-300">Define species, cultures, and social structures</p>
            </div>
            
            <div className="bg-stone-800/50 rounded p-4 text-center">
              <div className="text-3xl mb-2">📍</div>
              <h3 className="font-semibold text-gold-100 mb-2">POIs</h3>
              <p className="text-sm text-gold-300">Create points of interest and landmarks</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
