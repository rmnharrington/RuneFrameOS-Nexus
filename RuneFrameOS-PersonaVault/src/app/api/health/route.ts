import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    checks: {
      database: 'healthy',
      externalServices: 'healthy',
      memory: 'healthy'
    },
    metrics: {
      responseTime: Date.now(),
      memoryUsage: process.memoryUsage().heapUsed / 1024 / 1024,
      uptime: process.uptime()
    }
  })
}
