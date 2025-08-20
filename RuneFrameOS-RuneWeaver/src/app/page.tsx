import AppLayout from '../components/core/AppLayout'
import HeroBanner from '../components/core/HeroBanner'

export default function Home() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Welcome Section with Hero Banner Background */}
        <HeroBanner
          appName="RuneWeaver"
          heroBannerImage="/RuneWeaver_HeroBanner.png"
          title="Welcome to RuneWeaver"
          subtitle="Master enchantment workshop for crafting mystical runes and powerful enchantments across all gaming systems."
          details={[
            { icon: "⚡", text: "Location: Enchantment District" },
            { icon: "🔮", text: "Master: Archmage Runeheart" },
            { icon: "✨", text: "Specialty: Cross-Genre Enchantments" }
          ]}
        />

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-gold-800/50 to-stone-800/50 rounded-lg p-4 border border-gold-700/50 text-center">
            <div className="text-2xl mb-2">🔮</div>
            <div className="text-gold-100 font-bold text-xl">12</div>
            <div className="text-gold-300 text-sm">Active Runes</div>
          </div>
          
          <div className="bg-gradient-to-br from-character-800/50 to-stone-800/50 rounded-lg p-4 border border-character-700/50 text-center">
            <div className="text-2xl mb-2">✨</div>
            <div className="text-character-100 font-bold text-xl">8</div>
            <div className="text-character-300 text-sm">Enchantments in Progress</div>
          </div>
          
          <div className="bg-gradient-to-br from-dice-800/50 to-stone-800/50 rounded-lg p-4 border border-dice-700/50 text-center">
            <div className="text-2xl mb-2">📚</div>
            <div className="text-dice-100 font-bold text-xl">45</div>
            <div className="text-dice-300 text-sm">Formulas Mastered</div>
          </div>
        </div>

        {/* Featured Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Latest Enchantments */}
          <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-6 border border-stone-700/50">
            <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">
              Latest Enchantments
            </h2>
            <div className="space-y-3">
              <div className="bg-stone-800/50 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gold-100">Flame Blade Enhancement</h3>
                    <p className="text-sm text-gold-300">Advanced level • 150 mana cost</p>
                  </div>
                  <span className="text-xs bg-gold-700 text-gold-100 px-2 py-1 rounded">Active</span>
                </div>
              </div>
              
              <div className="bg-stone-800/50 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gold-100">Ice Shield Rune</h3>
                    <p className="text-sm text-gold-300">Intermediate level • 75 mana cost</p>
                  </div>
                  <span className="text-xs bg-character-700 text-character-100 px-2 py-1 rounded">Complete</span>
                </div>
              </div>
            </div>
          </div>

          {/* Available Runes */}
          <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-6 border border-stone-700/50">
            <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">
              Available Runes
            </h2>
            <div className="space-y-3">
              <div className="bg-stone-800/50 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gold-100">Lightning Strike</h3>
                    <p className="text-sm text-gold-300">Offensive spell • 100 mana cost</p>
                  </div>
                  <span className="text-xs bg-gold-700 text-gold-100 px-2 py-1 rounded">Ready</span>
                </div>
              </div>
              
              <div className="bg-stone-800/50 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gold-100">Healing Touch</h3>
                    <p className="text-sm text-gold-300">Restorative magic • 120 mana cost</p>
                  </div>
                  <span className="text-xs bg-character-700 text-character-100 px-2 py-1 rounded">Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Workshop Specialties */}
        <div className="bg-gradient-to-br from-gold-800/50 to-stone-900/50 rounded-lg p-6 border border-gold-700/50">
          <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">
            Workshop Specialties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl mb-2">🔮</div>
              <h3 className="font-semibold text-gold-100 mb-1">Elemental Runes</h3>
              <p className="text-sm text-gold-300">Fire, Ice, Lightning, Earth, Wind, Water</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold text-gold-100 mb-1">Weapon Enchantments</h3>
              <p className="text-sm text-gold-300">Blade enhancements, armor fortification, magical properties</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-2">✨</div>
              <h3 className="font-semibold text-gold-100 mb-1">Cross-Genre Magic</h3>
              <p className="text-sm text-gold-300">Works with D&D, Pathfinder, custom systems, and more</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
