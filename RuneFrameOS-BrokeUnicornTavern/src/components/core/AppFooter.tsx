export default function AppFooter() {
  return (
    <footer className="bg-brown-900 border-t-2 border-tan-600 py-4 px-6 text-center">
      <div className="flex items-center justify-center space-x-4 mb-2">
        <img 
          src="/BGG_logo_light.png" 
          alt="Bad Guy Gas" 
          className="w-6 h-6 object-contain"
        />
        <span className="text-sm text-tan-100 font-medium">
          Bad Guy Gas
        </span>
      </div>
      <div className="text-xs text-brown-500">
        © 2024 RuneFrameOS - Broke Unicorn Tavern. All rights reserved.
      </div>
    </footer>
  )
}
