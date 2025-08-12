'use client'

export default function AppFooter() {
  return (
    <footer className="bg-gradient-to-r from-slate-800 via-gray-800 to-slate-900 border-t-2 border-slate-500/30 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/Scriptoria_Logos_IconOnly.png"
                alt="Scriptoria Logo"
                className="w-8 h-8 object-contain"
              />
              <div>
                <h3 className="text-lg font-bold text-white fantasy-font">Scriptoria</h3>
                <p className="text-slate-200 text-sm">Gaming Systems Library</p>
              </div>
            </div>
            <p className="text-slate-200 text-sm mb-4">
              Empowering tabletop roleplaying with modern digital tools and seamless integration.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-200 hover:text-white transition-colors">Discord</a>
              <a href="#" className="text-slate-200 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-slate-200 hover:text-white transition-colors">GitHub</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-200 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-slate-200 hover:text-white transition-colors">API Reference</a></li>
              <li><a href="#" className="text-slate-200 hover:text-white transition-colors">Community Forum</a></li>
              <li><a href="#" className="text-slate-200 hover:text-white transition-colors">Support Center</a></li>
              <li><a href="#" className="text-slate-200 hover:text-white transition-colors">Developer Portal</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Information</h4>
            <ul className="space-y-2">
              <li><a href="mailto:contact@badguygas.com" className="text-slate-200 hover:text-white transition-colors">contact@badguygas.com</a></li>
              <li><a href="#" className="text-slate-200 hover:text-white transition-colors">Website</a></li>
              <li><a href="#" className="text-slate-200 hover:text-white transition-colors">Discord Server</a></li>
              <li><a href="#" className="text-slate-200 hover:text-white transition-colors">Business Contact</a></li>
            </ul>
            <button className="mt-4 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors">
              Get in Touch
            </button>
          </div>

          {/* Legal Disclaimers */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal & Terms</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-200 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-slate-200 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-200 hover:text-white transition-colors">Data Protection</a></li>
            </ul>
            <div className="mt-6 text-xs text-slate-300">
              <p>Use at own risk. Not responsible for lost characters or items.</p>
            </div>
          </div>
        </div>

        {/* Copyright & Version */}
        <div className="border-t border-slate-400/30 mt-8 pt-6 text-center">
          <p className="text-slate-200 text-sm">
            © 2024 Bad Guy Gas | RuneFrameOS™ | Version 0.1.0
          </p>
          <p className="text-slate-300 text-xs mt-2">
            RuneFrameOS™ is a trademark of Bad Guy Gas. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
