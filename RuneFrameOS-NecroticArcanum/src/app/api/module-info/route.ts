import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: {
        id: 'necrotic-arcanum',
        name: 'Necrotic Arcanum',
        description: 'Master the art of undead creation, control, and cataloging. Everything undead across all systems and genres.',
        version: '1.0.0',
        icon: '🧟',
        category: 'gaming',
        capabilities: [
          'undead_creation',
          'undead_control',
          'undead_catalog',
          'necromantic_research',
          'ritual_performance',
          'soul_collection'
        ]
      },
      features: {
        realTime: true,
        offline: false,
        multiplayer: true
      },
      endpoints: [
        '/api/health',
        '/api/module-info',
        '/api/status',
        '/api/undead/create',
        '/api/undead/control',
        '/api/undead/catalog'
      ]
    },
    message: 'Module information retrieved successfully'
  })
}
