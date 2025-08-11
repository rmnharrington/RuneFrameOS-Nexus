"use client"

"use client"

import React, { useState, useEffect } from 'react'

interface AppFooterProps {
  className?: string
}

export default function AppFooter({ className = "" }: AppFooterProps) {
  const [lastUpdated, setLastUpdated] = useState<string>('')

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString())
  }, [])
  return (
    <footer className={`bg-gradient-to-r from-amber-900 via-orange-800 to-red-900 text-white border-t-2 border-amber-400/30 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Company Info */}
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <img 
                  src="/RuneFrameOS_NoText.png" 
                  alt="RuneFrameOS"
                  className="w-5 h-5 md:w-6 md:h-6 object-contain"
                />
              </div>
              <h3 className="text-lg md:text-xl font-fantasy font-bold text-gradient bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
                RuneFrameOS™
              </h3>
            </div>
            <p className="text-amber-200/80 text-xs md:text-sm leading-relaxed">
              Forging the future of tabletop gaming through innovative technology, 
              immersive storytelling, and the power of community.
            </p>
            <div className="flex space-x-3 md:space-x-4">
              <a href="#" className="text-amber-200/70 hover:text-amber-200 transition-colors p-1">
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-amber-200/70 hover:text-amber-200 transition-colors p-1">
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="text-amber-200/70 hover:text-amber-200 transition-colors p-1">
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 md:space-y-4">
            <h4 className="text-base md:text-lg font-semibold text-amber-200">Quick Links</h4>
            <ul className="space-y-2 text-xs md:text-sm">
              <li><a href="#" className="text-amber-200/70 hover:text-amber-200 transition-colors block py-1">Documentation</a></li>
              <li><a href="#" className="text-amber-200/70 hover:text-amber-200 transition-colors block py-1">API Reference</a></li>
              <li><a href="#" className="text-amber-200/70 hover:text-amber-200 transition-colors block py-1">Community Forum</a></li>
              <li><a href="#" className="text-amber-200/70 hover:text-amber-200 transition-colors block py-1">Support Center</a></li>
              <li><a href="#" className="text-amber-200/70 hover:text-amber-200 transition-colors block py-1">Developer Portal</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-3 md:space-y-4">
            <h4 className="text-base md:text-lg font-semibold text-amber-200">Contact Us</h4>
            <div className="space-y-2 text-xs md:text-sm text-amber-200/70">
              <p>📧 support@runeframeos.com</p>
              <p>🌐 www.runeframeos.com</p>
              <p>📱 Discord: RuneFrameOS Community</p>
              <p>📧 business@runeframeos.com</p>
            </div>
            <button className="px-3 py-2 md:px-4 md:py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-lg transition-all duration-200 hover:scale-105 shadow-md text-xs md:text-sm touch-manipulation">
              Get in Touch
            </button>
          </div>
        </div>

        {/* Disclaimers and Legal */}
        <div className="border-t border-amber-400/30 pt-4 md:pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-xs md:text-sm text-amber-200/70">
            <div>
              <h5 className="font-semibold text-amber-200 mb-2">Legal Disclaimers</h5>
              <p className="leading-relaxed">
                RuneFrameOS™ is a trademark of Bad Guy Gas. All rights reserved. 
                This software is provided "as is" without warranty of any kind. 
                Use at your own risk.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-amber-200 mb-2">Privacy & Terms</h5>
              <p className="leading-relaxed">
                By using RuneFrameOS, you agree to our Terms of Service and Privacy Policy. 
                We respect your data and never share personal information with third parties.
              </p>
            </div>
          </div>
          
          <div className="text-center text-xs text-amber-200/50">
            <p>
              © 2024 Bad Guy Gas. All rights reserved. | 
              RuneFrameOS™ is a trademark of Bad Guy Gas | 
              Built with ❤️ for the gaming community
            </p>
            <p className="mt-1">
              Version 0.1.0 | Last updated: {lastUpdated || 'Loading...'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
