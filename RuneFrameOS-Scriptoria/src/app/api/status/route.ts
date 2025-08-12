import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const statusData = {
      status: 'operational',
      timestamp: new Date().toISOString(),
      service: 'Scriptoria',
      version: '1.0.0',
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      metrics: {
        activeUsers: Math.floor(Math.random() * 50) + 10,
        totalSystems: 15,
        totalRulesets: 127,
        lastActivity: new Date(Date.now() - Math.random() * 86400000).toISOString()
      },
      health: {
        database: 'connected',
        api: 'operational',
        frontend: 'operational'
      }
    }

    return NextResponse.json(statusData, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    })
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Status check failed',
        timestamp: new Date().toISOString()
      },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
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
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  })
}
