import AppLayout from '../components/core/AppLayout'
import HeroBanner from '../components/core/HeroBanner'

export default function Home() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Welcome Section with Hero Banner Background */}
        <HeroBanner
          appName="BrokeUnicorn Tavern"
          heroBannerImage="/BrokeUnicornTavern_HeroBanner.png"
          title="Welcome to BrokeUnicorn Tavern"
          subtitle="A haven for adventurers, storytellers, and those seeking mystical brews and rare artifacts."
          details={[
            { icon: "🏰", text: "Location: Pedantic Theory District" },
            { icon: "👑", text: "Owner: Madame Whisperwind" },
            { icon: "🕯️", text: "Atmosphere: Cozy and Mysterious" }
          ]}
        />

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-gold-800/50 to-stone-800/50 rounded-lg p-4 border border-gold-700/50 text-center">
            <div className="text-2xl mb-2">👥</div>
            <div className="text-gold-100 font-bold text-xl">15</div>
            <div className="text-gold-300 text-sm">Current Patrons</div>
          </div>
          
          <div className="bg-gradient-to-br from-character-800/50 to-stone-800/50 rounded-lg p-4 border border-character-700/50 text-center">
            <div className="text-2xl mb-2">🗺️</div>
            <div className="text-character-100 font-bold text-xl">3</div>
            <div className="text-character-300 text-sm">Active Quests</div>
          </div>
          
          <div className="bg-gradient-to-br from-dice-800/50 to-stone-800/50 rounded-lg p-4 border border-dice-700/50 text-center">
            <div className="text-2xl mb-2">🎭</div>
            <div className="text-dice-100 font-bold text-xl">2</div>
            <div className="text-dice-300 text-sm">Upcoming Events</div>
          </div>
        </div>

        {/* Featured Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Latest Quests */}
          <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-6 border border-stone-700/50">
            <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">
              Latest Quests
            </h2>
            <div className="space-y-3">
              <div className="bg-stone-800/50 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gold-100">Find the Lost Chalice</h3>
                    <p className="text-sm text-gold-300">Medium difficulty • 25 gold reward</p>
                  </div>
                  <span className="text-xs bg-gold-700 text-gold-100 px-2 py-1 rounded">Active</span>
                </div>
              </div>
              
              <div className="bg-stone-800/50 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gold-100">Clear the Cellar</h3>
                    <p className="text-sm text-gold-300">Easy difficulty • 15 gold reward</p>
                  </div>
                  <span className="text-xs bg-character-700 text-character-100 px-2 py-1 rounded">Available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-6 border border-stone-700/50">
            <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">
              Upcoming Events
            </h2>
            <div className="space-y-3">
              <div className="bg-stone-800/50 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gold-100">Bard's Night</h3>
                    <p className="text-sm text-gold-300">Tonight at 8 PM • Live music and stories</p>
                  </div>
                  <span className="text-xs bg-gold-700 text-gold-100 px-2 py-1 rounded">Tonight</span>
                </div>
              </div>
              
              <div className="bg-stone-800/50 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gold-100">Adventurer's Guild Meeting</h3>
                    <p className="text-sm text-gold-300">Tomorrow at 6 PM • Quest coordination</p>
                  </div>
                  <span className="text-xs bg-character-700 text-character-100 px-2 py-1 rounded">Tomorrow</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tavern Specialties */}
        <div className="bg-gradient-to-br from-gold-800/50 to-stone-900/50 rounded-lg p-6 border border-gold-700/50">
          <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">
            Tavern Specialties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl mb-2">🍺</div>
              <h3 className="font-semibold text-gold-100 mb-1">Mystical Brews</h3>
              <p className="text-sm text-gold-300">Dragon's Breath Ale, Moonlight Mead, Phantom Porter</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-2">🗣️</div>
              <h3 className="font-semibold text-gold-100 mb-1">Adventure Stories</h3>
              <p className="text-sm text-gold-300">Tales from the road, quest reports, legendary encounters</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-2">💎</div>
              <h3 className="font-semibold text-gold-100 mb-1">Rare Artifacts</h3>
              <p className="text-sm text-gold-300">Trading post for magical items and ancient relics</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
