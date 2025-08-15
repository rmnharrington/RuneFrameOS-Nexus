import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: {
        id: 'mercatrix',
        name: 'Mercatrix',
        description: 'Master economy management and building across all genres and gaming systems. Build, manage, and optimize entire economic structures.',
        version: '1.0.0',
        icon: '💰',
        category: 'gaming',
        capabilities: [
          'economy_building',
          'economic_management',
          'trade_networks',
          'market_analysis',
          'resource_management',
          'currency_systems'
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
        '/api/economy/build',
        '/api/economy/manage',
        '/api/trade/networks'
      ]
    },
    message: 'Module information retrieved successfully'
  })
}
