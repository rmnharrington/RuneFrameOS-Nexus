import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    service: 'TravelersTable',
    status: 'operational',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    port: 3010
  })
}

