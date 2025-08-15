"use client"

import AppLayout from '@/components/core/AppLayout'
import CampaignDashboard from '@/components/CampaignDashboard'

export default function HomePage() {
  return (
    <AppLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative mb-8">
          <div className="relative h-64 lg:h-80 rounded-xl overflow-hidden">
            <img
              src="/TravelersTable_HeroBanner.png"
              alt="TravelersTable - GameMaster Campaign Mastery"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brown-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-3xl lg:text-4xl font-bold text-tan-100 text-shadow-brown mb-2">
                TravelersTable
              </h1>
              <p className="text-lg lg:text-xl text-tan-200 text-shadow-tan max-w-2xl">
                Master your campaigns and track your World Travelers. Manage multiple campaigns, view character sheets, and roll dice with built-in GM tools.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <CampaignDashboard />
      </div>
    </AppLayout>
  )
}
