import React from 'react'

interface AppWindowProps {
  children: React.ReactNode
}

export default function AppWindow({ children }: AppWindowProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="app-window animate-fade-in">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
