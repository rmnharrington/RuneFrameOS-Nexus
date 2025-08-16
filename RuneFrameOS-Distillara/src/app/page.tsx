import AppLayout from '../components/core/AppLayout'
import HeroBanner from '../components/core/HeroBanner'

export default function Home() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Welcome Section with Hero Banner Background */}
        <HeroBanner
          appName="Distillara"
          heroBannerImage="/Distillara_HeroBanner.png"
          title="Welcome to Distillara"
          subtitle="Master alchemist's workshop for crafting mystical potions and elixirs. A gamified alchemy experience across all gaming genres and systems."
          details={[
            { icon: "🏺", text: "Location: Alchemy District" },
            { icon: "🧪", text: "Master: Archmage Zephyrix" },
            { icon: "⚗️", text: "Specialty: Mystical Brews" }
          ]}
        />

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-gold-800/50 to-stone-800/50 rounded-lg p-4 border border-gold-700/50 text-center">
            <div className="text-2xl mb-2">🧪</div>
            <div className="text-gold-100 font-bold text-xl">3</div>
            <div className="text-gold-300 text-sm">Active Experiments</div>
          </div>
          
          <div className="bg-gradient-to-br from-character-800/50 to-stone-800/50 rounded-lg p-4 border border-character-700/50 text-center">
            <div className="text-2xl mb-2">⚗️</div>
            <div className="text-character-100 font-bold text-xl">12</div>
            <div className="text-character-300 text-sm">Successful Potions</div>
          </div>
          
          <div className="bg-gradient-to-br from-dice-800/50 to-stone-800/50 rounded-lg p-4 border border-dice-700/50 text-center">
            <div className="text-2xl mb-2">💥</div>
            <div className="text-dice-100 font-bold text-xl">5</div>
            <div className="text-dice-300 text-sm">Lab Accidents</div>
          </div>
        </div>

        {/* Featured Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Latest Quests */}
          <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-6 border border-stone-700/50">
            <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">
              Latest Experiments
            </h2>
            <div className="space-y-3">
              <div className="bg-stone-800/50 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gold-100">Dragon's Breath Elixir</h3>
                    <p className="text-sm text-gold-300">High risk • Fire resistance potion</p>
                  </div>
                  <span className="text-xs bg-gold-700 text-gold-100 px-2 py-1 rounded">Active</span>
                </div>
              </div>
              
              <div className="bg-stone-800/50 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gold-100">Invisibility Brew</h3>
                    <p className="text-sm text-gold-300">Medium risk • Stealth enhancement</p>
                  </div>
                  <span className="text-xs bg-character-700 text-character-100 px-2 py-1 rounded">Available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-6 border border-stone-700/50">
            <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">
              Upcoming Brews
            </h2>
            <div className="space-y-3">
              <div className="bg-stone-800/50 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gold-100">Moonlight Mead</h3>
                    <p className="text-sm text-gold-300">Tonight at 8 PM • Lunar enhancement brew</p>
                  </div>
                  <span className="text-xs bg-gold-700 text-gold-100 px-2 py-1 rounded">Tonight</span>
                </div>
              </div>
              
              <div className="bg-stone-800/50 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gold-100">Phantom Porter</h3>
                    <p className="text-sm text-gold-300">Tomorrow at 6 PM • Ghostly invisibility</p>
                  </div>
                  <span className="text-xs bg-character-700 text-character-100 px-2 py-1 rounded">Tomorrow</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Laboratory Specialties */}
        <div className="bg-gradient-to-br from-gold-800/50 to-stone-900/50 rounded-lg p-6 border border-gold-700/50">
          <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">
            Laboratory Specialties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl mb-2">⚗️</div>
              <h3 className="font-semibold text-gold-100 mb-1">Potion Crafting</h3>
              <p className="text-sm text-gold-300">Healing elixirs, invisibility brews, fire resistance</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-2">🧪</div>
              <h3 className="font-semibold text-gold-100 mb-1">Alchemical Research</h3>
              <p className="text-sm text-gold-300">Experimental formulas, ingredient analysis, risk assessment</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-2">💥</div>
              <h3 className="font-semibold text-gold-100 mb-1">Lab Accidents</h3>
              <p className="text-sm text-gold-300">Entertainment from failed experiments and explosions</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
