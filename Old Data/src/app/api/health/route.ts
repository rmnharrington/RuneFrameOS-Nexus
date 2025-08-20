import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'operational',
    service: 'Tapestry Engine',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  })
}

