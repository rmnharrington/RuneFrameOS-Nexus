import { FlaskConical, BookOpen, Zap, TrendingUp, Users, Star, Heart, Share2 } from 'lucide-react'

export default function AppFooter() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-8 mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                <FlaskConical className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">RuneFrameOS™</h3>
                <p className="text-sm text-gray-300">Gaming Ecosystem</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Master the art of alchemy and forge your legend in the mystical world of Distillara.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-amber-400">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button className="text-gray-300 hover:text-amber-400 transition-colors text-sm">
                  Home
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-amber-400 transition-colors text-sm">
                  Recipes
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-amber-400 transition-colors text-sm">
                  Ingredients
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-amber-400 transition-colors text-sm">
                  Community
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-orange-400">Resources</h4>
            <ul className="space-y-2">
              <li>
                <button className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                  Alchemy Guide
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                  Ingredient Database
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                  Crafting Tutorials
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                  Safety Protocols
                </button>
              </li>
            </ul>
          </div>

          {/* Social & Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-red-400">Connect</h4>
            <div className="flex space-x-3">
              <button className="w-10 h-10 bg-gray-700 hover:bg-amber-600 rounded-lg flex items-center justify-center transition-colors">
                <Heart className="h-5 w-5" />
              </button>
              <button className="w-10 h-10 bg-gray-700 hover:bg-orange-600 rounded-lg flex items-center justify-center transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="w-10 h-10 bg-gray-700 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors">
                <Star className="h-5 w-5" />
              </button>
            </div>
            <p className="text-gray-300 text-sm">
              Join our community of master alchemists
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-6">
              <span className="text-sm text-gray-400">
                © 2024 RuneFrameOS™. All rights reserved.
              </span>
              <span className="text-sm text-gray-400">
                Version 1.0.0
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <button className="text-sm text-gray-400 hover:text-amber-400 transition-colors">
                Privacy Policy
              </button>
              <button className="text-sm text-gray-400 hover:text-amber-400 transition-colors">
                Terms of Service
              </button>
              <button className="text-sm text-gray-400 hover:text-amber-400 transition-colors">
                Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

