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
            appName="PersonaVault"
            heroBannerImage="/PersonaVault_HeroBanner.png"
            title="Welcome to PersonaVault"
            subtitle="Comprehensive character sheet management system for all gaming genres and systems. Create, edit, and view character sheets with access to various templates supplied by RuneFrameOS, working seamlessly across all gaming systems."
            details={[
              { icon: "📋", text: "Location: Character District" },
              { icon: "✨", text: "Manager: Master Character Keeper" },
              { icon: "🎭", text: "Specialty: Character Sheets & Templates" }
            ]}
          />

          {/* Character Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-gold-800/50 to-stone-800/50 rounded-lg p-4 border border-gold-700/50 text-center">
              <div className="text-2xl mb-2">📋</div>
              <div className="text-gold-100 font-bold text-xl">24</div>
              <div className="text-gold-300 text-sm">Active Characters</div>
            </div>
            <div className="bg-gradient-to-br from-character-800/50 to-stone-800/50 rounded-lg p-4 border border-character-700/50 text-center">
              <div className="text-2xl mb-2">🎭</div>
              <div className="text-character-100 font-bold text-xl">18</div>
              <div className="text-character-300 text-sm">System Templates</div>
            </div>
            <div className="bg-gradient-to-br from-dice-800/50 to-stone-800/50 rounded-lg p-4 border border-dice-700/50 text-center">
              <div className="text-2xl mb-2">✨</div>
              <div className="text-dice-100 font-bold text-xl">8</div>
              <div className="text-dice-100 text-sm">Gaming Systems</div>
            </div>
          </div>

          {/* Character Management Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-6 border border-stone-700/50">
              <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">Character Creation & Management</h2>
              <div className="space-y-3">
                <div className="bg-stone-800/50 rounded p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gold-100">Character Builder</h3>
                      <p className="text-sm text-gold-300">Create characters with step-by-step guidance and validation</p>
                    </div>
                    <span className="text-xs bg-gold-700 text-gold-100 px-2 py-1 rounded">Active</span>
                  </div>
                </div>
                <div className="bg-stone-800/50 rounded p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gold-100">Sheet Editor</h3>
                      <p className="text-sm text-gold-300">Edit and modify existing character sheets with real-time updates</p>
                    </div>
                    <span className="text-xs bg-character-700 text-character-100 px-2 py-1 rounded">Expanding</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-6 border border-stone-700/50">
              <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">Templates & Systems</h2>
              <div className="space-y-3">
                <div className="bg-stone-800/50 rounded p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gold-100">System Templates</h3>
                      <p className="text-sm text-gold-300">Pre-built templates for all major gaming systems</p>
                    </div>
                    <span className="text-xs bg-gold-700 text-gold-100 px-2 py-1 rounded">Available</span>
                  </div>
                </div>
                <div className="bg-stone-800/50 rounded p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gold-100">Genre Support</h3>
                      <p className="text-sm text-gold-300">Fantasy, sci-fi, modern, horror, and more</p>
                    </div>
                    <span className="text-xs bg-character-700 text-character-100 px-2 py-1 rounded">Complete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gaming Systems Support */}
          <div className="bg-gradient-to-br from-gold-800/50 to-stone-900/50 rounded-lg p-6 border border-gold-700/50">
            <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">Supported Gaming Systems</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl mb-2">🎲</div>
                <h3 className="font-semibold text-gold-100 mb-1">D&D 5e</h3>
                <p className="text-sm text-gold-300">Complete character sheets</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">⚔️</div>
                <h3 className="font-semibold text-gold-100 mb-1">Pathfinder</h3>
                <p className="text-sm text-gold-300">1e & 2e support</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🚀</div>
                <h3 className="font-semibold text-gold-100 mb-1">Starfinder</h3>
                <p className="text-sm text-gold-300">Sci-fi adventures</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🌌</div>
                <h3 className="font-semibold text-gold-100 mb-1">Custom Systems</h3>
                <p className="text-sm text-gold-300">Build your own</p>
              </div>
            </div>
          </div>

          {/* Character Sheet Features */}
          <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-6 border border-stone-700/50">
            <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">Character Sheet Features</h2>
            <div className="space-y-4">
              <div className="bg-stone-800/50 rounded p-4">
                <h3 className="font-semibold text-gold-100 mb-2">Interactive Sheets</h3>
                <p className="text-sm text-gold-300 mb-3">Dynamic character sheets that update in real-time. Automatic calculations, validation, and error checking ensure your characters are always rules-compliant.</p>
                <button className="px-4 py-2 bg-gradient-to-r from-gold-700 to-stone-700 rounded-lg text-sm text-gold-100 hover:from-gold-600 hover:to-stone-600 transition-all duration-200">📋 Create Sheet</button>
              </div>
              <div className="bg-stone-800/50 rounded p-4">
                <h3 className="font-semibold text-gold-100 mb-2">Template Library</h3>
                <p className="text-sm text-gold-300 mb-3">Access to hundreds of pre-built character sheet templates for all major gaming systems. From D&D to custom homebrew, find the perfect template for your game.</p>
                <button className="px-4 py-2 bg-gradient-to-r from-character-700 to-dice-700 rounded-lg text-sm text-white hover:from-character-600 hover:to-dice-700 transition-all duration-200">🎭 Browse Templates</button>
              </div>
            </div>
          </div>

          {/* Cross-Genre Support */}
          <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-6 border border-stone-700/50">
            <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">Cross-Genre & System Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-stone-800/50 rounded p-4 text-center">
                <div className="text-3xl mb-2">🏰</div>
                <h3 className="font-semibold text-gold-100 mb-2">Fantasy</h3>
                <p className="text-sm text-gold-300">Medieval, high fantasy, dark fantasy</p>
              </div>
              <div className="bg-stone-800/50 rounded p-4 text-center">
                <div className="text-3xl mb-2">🚀</div>
                <h3 className="font-semibold text-gold-100 mb-2">Sci-Fi</h3>
                <p className="text-sm text-gold-300">Space opera, cyberpunk, post-apocalyptic</p>
              </div>
              <div className="bg-stone-800/50 rounded p-4 text-center">
                <div className="text-3xl mb-2">🌆</div>
                <h3 className="font-semibold text-gold-100 mb-2">Modern</h3>
                <p className="text-sm text-gold-300">Contemporary, urban fantasy, superheroes</p>
              </div>
              <div className="bg-stone-800/50 rounded p-4 text-center">
                <div className="text-3xl mb-2">👻</div>
                <h3 className="font-semibold text-gold-100 mb-2">Horror</h3>
                <p className="text-sm text-gold-300">Gothic, cosmic, survival horror</p>
              </div>
            </div>
          </div>

          {/* System Integration */}
          <div className="bg-gradient-to-br from-stone-800/50 to-gold-900/50 rounded-lg p-6 border border-stone-700/50">
            <h2 className="text-xl font-bold text-gold-100 text-shadow-gold mb-4">RuneFrameOS Integration</h2>
            <div className="space-y-4">
              <div className="bg-stone-800/50 rounded p-4">
                <h3 className="font-semibold text-gold-100 mb-2">Seamless Data Sharing</h3>
                <p className="text-sm text-gold-300 mb-3">Character data automatically syncs with other RuneFrameOS applications. Hoardwell tracks character equipment, LoreForge integrates character backstories, and all apps share character information seamlessly.</p>
                <button className="px-4 py-2 bg-gradient-to-r from-gold-700 to-stone-700 rounded-lg text-sm text-gold-100 hover:from-gold-600 hover:to-stone-600 transition-all duration-200">✨ Create New Character</button>
              </div>
              <div className="bg-stone-800/50 rounded p-4">
                <h3 className="font-semibold text-gold-100 mb-2">Export & Import</h3>
                <p className="text-sm text-gold-300 mb-3">Export characters to PDF, JSON, or other formats. Import characters from other systems or share them with fellow players. Full compatibility with popular virtual tabletop platforms.</p>
                <button className="px-4 py-2 bg-gradient-to-r from-character-700 to-dice-700 rounded-lg text-sm text-white hover:from-character-600 hover:to-dice-700 transition-all duration-200">📤 Export Character</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
