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
            appName="Necrotic Arcanum"
            heroBannerImage="/NecroticArcanum_HeroBanner.png"
            title="Welcome to Necrotic Arcanum"
            subtitle="Comprehensive undead management system for all gaming genres and systems. Build, destroy, manipulate, and research undead creatures, manage necromantic powers, and control death magic across all gaming systems."
            details={[
              { icon: "💀", text: "Location: Necromantic District" },
              { icon: "🧟", text: "Manager: Master Necromancer Mortis" },
              { icon: "⚰️", text: "Specialty: Undead & Death Magic" }
            ]}
          />

          {/* Undead Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-gold-800/50 to-stone-800/50 rounded-lg p-4 border border-gold-700/50 text-center">
              <div className="text-2xl mb-2">🧟</div>
              <div className="text-gold-100 font-bold text-xl">47</div>
              <div className="text-gold-300 text-sm">Active Undead</div>
            </div>
            <div className="bg-gradient-to-br from-character-800/50 to-stone-800/50 rounded-lg p-4 border border-character-700/50 text-center">
              <div className="text-2xl mb-2">💀</div>
              <div className="text-character-100 font-bold text-xl">156</div>
              <div className="text-character-300 text-sm">Necromancy Spells</div>
            </div>
            <div className="bg-gradient-to-br from-dice-800/50 to-stone-800/50 rounded-lg p-4 border border-dice-700/50 text-center">
              <div className="text-2xl mb-2">⚰️</div>
              <div className="text-dice-100 font-bold text-xl">89</div>
              <div className="text-dice-100 text-sm">Research Projects</div>
            </div>
          </div>

          {/* Undead Management Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-6 border border-stone-700/50">
              <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">Undead Creation & Control</h2>
              <div className="space-y-3">
                <div className="bg-stone-800/50 rounded p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gold-100">Zombie Hordes</h3>
                      <p className="text-sm text-gold-300">Create massive undead armies with customizable abilities and intelligence levels</p>
                    </div>
                    <span className="text-xs bg-gold-700 text-gold-100 px-2 py-1 rounded">Active</span>
                  </div>
                </div>
                <div className="bg-stone-800/50 rounded p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gold-100">Lich Lords</h3>
                      <p className="text-sm text-gold-300">Build powerful undead spellcasters with unique personalities and magical abilities</p>
                    </div>
                    <span className="text-xs bg-character-700 text-character-100 px-2 py-1 rounded">Expanding</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-6 border border-stone-700/50">
              <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">Necromancy & Research</h2>
              <div className="space-y-3">
                <div className="bg-stone-800/50 rounded p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gold-100">Death Magic</h3>
                      <p className="text-sm text-gold-300">Research and develop new necromantic spells and rituals</p>
                    </div>
                    <span className="text-xs bg-gold-700 text-gold-100 px-2 py-1 rounded">Researching</span>
                  </div>
                </div>
                <div className="bg-stone-800/50 rounded p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gold-100">Soul Manipulation</h3>
                      <p className="text-sm text-gold-300">Study soul binding, trapping, and transfer techniques</p>
                    </div>
                    <span className="text-xs bg-character-700 text-character-100 px-2 py-1 rounded">Advanced</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Undead Types Management */}
          <div className="bg-gradient-to-br from-gold-800/50 to-stone-900/50 rounded-lg p-6 border border-gold-700/50">
            <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">Undead Types & Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl mb-2">🧟</div>
                <h3 className="font-semibold text-gold-100 mb-1">Mindless Undead</h3>
                <p className="text-sm text-gold-300">Zombies, skeletons, and other simple undead creatures</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">👻</div>
                <h3 className="font-semibold text-gold-100 mb-1">Intelligent Undead</h3>
                <p className="text-sm text-gold-300">Vampires, liches, and other sentient undead beings</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">💀</div>
                <h3 className="font-semibold text-gold-100 mb-1">Spirit Undead</h3>
                <p className="text-sm text-gold-300">Ghosts, wraiths, and other ethereal undead entities</p>
              </div>
            </div>
          </div>

          {/* Necromancy Systems */}
          <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-6 border border-stone-700/50">
            <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">Necromancy & Death Magic</h2>
            <div className="space-y-4">
              <div className="bg-stone-800/50 rounded p-4">
                <h3 className="font-semibold text-gold-100 mb-2">Spell Research</h3>
                <p className="text-sm text-gold-300 mb-3">Develop new necromantic spells, rituals, and magical techniques. Research soul manipulation, death magic, and undead creation spells across all gaming systems and magical traditions.</p>
                <button className="px-4 py-2 bg-gradient-to-r from-gold-700 to-stone-700 rounded-lg text-sm text-gold-100 hover:from-gold-600 hover:to-stone-600 transition-all duration-200">📚 Research Spell</button>
              </div>
              <div className="bg-stone-800/50 rounded p-4">
                <h3 className="font-semibold text-gold-100 mb-2">Ritual Development</h3>
                <p className="text-sm text-gold-300 mb-3">Create complex necromantic rituals for mass undead creation, soul binding, and death magic amplification. Design rituals that work across different magical systems and gaming genres.</p>
                <button className="px-4 py-2 bg-gradient-to-r from-character-700 to-dice-700 rounded-lg text-sm text-white hover:from-character-600 hover:to-dice-700 transition-all duration-200">⚗️ Create Ritual</button>
              </div>
            </div>
          </div>

          {/* Undead Control Systems */}
          <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-6 border border-stone-700/50">
            <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">Undead Control & Manipulation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-stone-800/50 rounded p-4 text-center">
                <div className="text-3xl mb-2">🧠</div>
                <h3 className="font-semibold text-gold-100 mb-2">Mind Control</h3>
                <p className="text-sm text-gold-300">Direct control over undead minds and actions</p>
              </div>
              <div className="bg-stone-800/50 rounded p-4 text-center">
                <div className="text-3xl mb-2">🎭</div>
                <h3 className="font-semibold text-gold-100 mb-2">Personality Imprinting</h3>
                <p className="text-sm text-gold-300">Imprint specific personalities and behaviors</p>
              </div>
              <div className="bg-stone-800/50 rounded p-4 text-center">
                <div className="text-3xl mb-2">🔗</div>
                <h3 className="font-semibold text-gold-100 mb-2">Soul Binding</h3>
                <p className="text-sm text-gold-300">Bind souls to undead bodies for enhanced control</p>
              </div>
              <div className="bg-stone-800/50 rounded p-4 text-center">
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="font-semibold text-gold-100 mb-2">Power Enhancement</h3>
                <p className="text-sm text-gold-300">Boost undead abilities and magical powers</p>
              </div>
            </div>
          </div>

          {/* Cross-Genre Support */}
          <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-6 border border-stone-700/50">
            <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">Cross-Genre & System Support</h2>
            <div className="space-y-4">
              <div className="bg-stone-800/50 rounded p-4">
                <h3 className="font-semibold text-gold-100 mb-2">Universal Undead Engine</h3>
                <p className="text-sm text-gold-300 mb-3">Works seamlessly across all gaming genres and systems. From medieval fantasy necromancers to cyberpunk reanimators, from space horror alien undead to post-apocalyptic zombie wastelands. Every undead type can be modeled with the same powerful tools.</p>
                <button className="px-4 py-2 bg-gradient-to-r from-gold-700 to-stone-700 rounded-lg text-sm text-gold-100 hover:from-gold-600 hover:to-stone-600 transition-all duration-200">🧟 Create New Undead</button>
              </div>
              <div className="bg-stone-800/50 rounded p-4">
                <h3 className="font-semibold text-gold-100 mb-2">System Integration</h3>
                <p className="text-sm text-gold-300 mb-3">Export undead data to other RuneFrameOS applications. Hoardwell can track undead equipment, LoreForge can integrate undead into world-building, and all apps can share necromantic data seamlessly.</p>
                <button className="px-4 py-2 bg-gradient-to-r from-character-700 to-dice-700 rounded-lg text-sm text-white hover:from-character-600 hover:to-dice-700 transition-all duration-200">🔗 Connect Apps</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
