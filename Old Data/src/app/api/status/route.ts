import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    service: 'Tapestry Engine',
    status: 'operational',
    health: 'healthy',
    performance: {
      responseTime: '45ms',
      memoryUsage: '128MB',
      cpuUsage: '2.3%'
    },
    metrics: {
      totalWorlds: 3,
      activeCampaigns: 7,
      totalNPCs: 42,
      totalLocations: 18,
      totalEvents: 12,
      totalLoreEntries: 25
    },
    recentActivity: [
      {
        type: 'world_updated',
        target: 'Eldoria',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        type: 'campaign_created',
        target: 'Shadow War',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      },
      {
        type: 'npc_added',
        target: 'Captain Thorne',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    lastUpdated: new Date().toISOString()
  })
}

