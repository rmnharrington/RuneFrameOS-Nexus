'use client'

import { ReactNode } from 'react'

interface AppLayoutProps {
  children: ReactNode
  appName: string
  appIcon: string
}

export default function AppLayout({ children, appName, appIcon }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  )
}
