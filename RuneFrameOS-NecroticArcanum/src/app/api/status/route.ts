import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      status: 'operational',
      lastUpdated: new Date().toISOString(),
      metrics: {
        activeUsers: 12,
        undeadCreated: 47,
        soulsCollected: 23,
        ritualsPerformed: 12,
        newTechniques: 8
      },
      recentActivity: [
        {
          type: 'undead_created',
          timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
          data: 'Zombie horde created successfully'
        },
        {
          type: 'soul_collected',
          timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          data: 'Soul essence harvested from fallen warrior'
        },
        {
          type: 'ritual_performed',
          timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
          data: 'Binding ritual completed for new skeleton warrior'
        }
      ]
    },
    message: 'Module status retrieved successfully'
  })
}
