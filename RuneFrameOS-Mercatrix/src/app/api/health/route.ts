import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      status: 'operational',
      module: 'mercatrix',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    },
    message: 'Mercatrix is healthy and operational'
  })
}
