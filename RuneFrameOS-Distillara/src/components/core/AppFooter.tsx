"use client"

import React from 'react'

interface AppFooterProps {
  className?: string
}

export default function AppFooter({ className = "" }: AppFooterProps) {
  return (
    <footer className={`bg-gradient-to-r from-amber-900 via-orange-800 to-red-900 text-white border-t-2 border-amber-400/30 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full flex items-center justify-center">
                <img
                  src="/runeframeos_logo2.png"
                  alt="RuneFrameOS"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <h3 className="text-xl font-fantasy font-bold text-white">
                RuneFrameOS
              </h3>
            </div>
            <p className="text-amber-200/80 text-sm leading-relaxed">
              The premier gaming ecosystem for tabletop roleplaying games. 
              Where legends are forged and adventures come to life.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-amber-200/70 hover:text-amber-200 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="text-amber-200/70 hover:text-amber-200 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-amber-200/70 hover:text-amber-200 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-amber-200">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-amber-200/70 hover:text-amber-200 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-amber-200/70 hover:text-amber-200 transition-colors">API Reference</a></li>
              <li><a href="#" className="text-amber-200/70 hover:text-amber-200 transition-colors">Community Forum</a></li>
              <li><a href="#" className="text-amber-200/70 hover:text-amber-200 transition-colors">Support Center</a></li>
              <li><a href="#" className="text-amber-200/70 hover:text-amber-200 transition-colors">Developer Portal</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-amber-200">Contact Information</h4>
            <div className="space-y-2 text-sm text-amber-200/70">
              <p>📧 info@runeframeos.com</p>
              <p>🌐 www.runeframeos.com</p>
              <p>📱 Discord: RuneFrameOS Community</p>
              <p>📧 business@runeframeos.com</p>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-lg transition-all duration-200 hover:scale-105 shadow-md">
              Get in Touch
            </button>
          </div>
        </div>

        {/* Disclaimers and Legal */}
        <div className="border-t border-amber-400/30 pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-amber-200/70">
            <div>
              <h5 className="font-semibold text-amber-200 mb-2">Legal Disclaimers</h5>
              <p className="leading-relaxed">
                RuneFrameOS is provided "as is" without warranties. Use at your own risk. 
                Gaming content is for entertainment purposes only.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-amber-200 mb-2">Privacy & Terms</h5>
              <p className="leading-relaxed">
                Your privacy is important. We protect your data and provide transparent 
                information about how we use it.
              </p>
            </div>
          </div>

          <div className="text-center text-xs text-amber-200/50">
            <p>
              © 2024 Bad Guy Gas | RuneFrameOS™ | Version 0.1.0
            </p>
            <p className="mt-1">
              All trademarks and registered trademarks are property of their respective owners
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
