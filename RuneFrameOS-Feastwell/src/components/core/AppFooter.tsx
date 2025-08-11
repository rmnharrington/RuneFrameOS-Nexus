export default function AppFooter() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-16 bg-gradient-to-r from-amber-900 via-orange-900 to-red-900 border-t-2 border-amber-500/30 shadow-lg z-40">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section - Company Info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <img 
              src="/runeframeos_logo2.png" 
              alt="RuneFrameOS Logo" 
              className="w-8 h-8 rounded"
            />
            <div>
              <p className="text-white text-sm font-medium">RuneFrameOS</p>
              <p className="text-amber-200 text-xs">Feastwell Division</p>
            </div>
          </div>
        </div>

        {/* Center Section - Quick Links */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-amber-200 hover:text-white text-sm transition-colors duration-200">
            Recipe Database
          </a>
          <a href="#" className="text-amber-200 hover:text-white text-sm transition-colors duration-200">
            Kitchen Tools
          </a>
          <a href="#" className="text-amber-200 hover:text-white text-sm transition-colors duration-200">
            Chef Training
          </a>
          <a href="#" className="text-amber-200 hover:text-white text-sm transition-colors duration-200">
            Support
          </a>
        </div>

        {/* Right Section - Legal & Status */}
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-amber-200 text-xs">© 2024 RuneFrameOS</p>
            <p className="text-orange-200 text-xs">Feastwell v1.0.0</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
