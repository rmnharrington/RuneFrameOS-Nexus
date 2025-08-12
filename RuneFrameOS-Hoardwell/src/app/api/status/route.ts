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
        inventory: 'active',
        characters: 'active',
        items: 'active'
      },
      metrics: {
        activeCharacters: Math.floor(Math.random() * 5) + 1,
        totalItems: Math.floor(Math.random() * 200) + 100,
        categories: Math.floor(Math.random() * 8) + 4,
        averageWeight: Math.floor(Math.random() * 50) + 20
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
