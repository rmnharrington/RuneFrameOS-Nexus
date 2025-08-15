import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    name: 'Tapestry Engine',
    description: 'World Building & Campaign Management for RuneFrameOS',
    version: '1.0.0',
    port: 3011,
    status: 'operational',
    capabilities: [
      'World Management',
      'Campaign Creation',
      'NPC Management',
      'Location Design',
      'Story Timeline',
      'Lore Documentation'
    ],
    integrations: [
      'Mercatrix (Economy)',
      'LoreForge (World Creation)',
      'TravelersTable (Campaign Management)'
    ],
    features: {
      worlds: 3,
      campaigns: 7,
      npcs: 42,
      locations: 18,
      events: 12,
      loreEntries: 25
    },
    lastUpdated: new Date().toISOString()
  })
}

