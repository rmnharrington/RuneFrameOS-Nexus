'use client'

import Image from 'next/image'

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-necrotic-900 via-undead-900 to-corpse-900 border-b border-undead-700/50 shadow-lg">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6 lg:py-4">
        {/* Left side - Logo and Title */}
        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-10 lg:w-12 lg:h-12">
            <Image
              src="/NecroticArcanum_Logos_IconOnly.png"
              alt="Necrotic Arcanum"
              fill
              className="object-contain"
            />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl lg:text-2xl font-bold text-sickly-100 text-shadow-necrotic">
              Necrotic Arcanum
            </h1>
            <p className="text-sm text-sickly-300 text-shadow-corpse">
              Master of the Undead Arts
            </p>
          </div>
        </div>

        {/* Center - Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-sickly-200 hover:text-sickly-100 transition-colors">
            Create
          </a>
          <a href="#" className="text-sickly-200 hover:text-sickly-100 transition-colors">
            Control
          </a>
          <a href="#" className="text-sickly-200 hover:text-sickly-100 transition-colors">
            Catalog
          </a>
          <a href="#" className="text-sickly-200 hover:text-sickly-100 transition-colors">
            Research
          </a>
        </nav>

        {/* Right side - Menu button and BGG Logo */}
        <div className="flex items-center space-x-3">
          {/* BGG Logo */}
          <div className="hidden sm:block relative w-8 h-8">
            <Image
              src="/Logo_light.png"
              alt="Bad Guy Gas"
              fill
              className="object-contain opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
          
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-sickly-200 hover:text-sickly-100 hover:bg-undead-800 rounded-md transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
