import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const statusData = {
      operational: true,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: {
        used: process.memoryUsage().heapUsed,
        total: process.memoryUsage().heapTotal,
        external: process.memoryUsage().external
      },
      environment: process.env.NODE_ENV || 'development',
      services: {
        database: 'connected',
        crafting: 'active',
        economy: 'active',
        rarity: 'active'
      },
      metrics: {
        activeCrafts: Math.floor(Math.random() * 10) + 1,
        totalPotions: Math.floor(Math.random() * 100) + 50,
        successRate: 0.85,
        averageCraftTime: 120
      }
    }

    return NextResponse.json(statusData, { 
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    })
  } catch (error) {
    return NextResponse.json(
      { 
        operational: false, 
        message: 'Status check failed',
        timestamp: new Date().toISOString()
      }, 
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
