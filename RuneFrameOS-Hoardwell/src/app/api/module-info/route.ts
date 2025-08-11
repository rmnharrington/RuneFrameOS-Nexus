import { NextResponse } from 'next/server'

export async function GET() {
  const response = NextResponse.json(
    {
      status: 'operational',
      service: 'Hoardwell',
      version: '0.1.0',
      timestamp: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      uptime: process.uptime(),
      port: 3004,
      description: 'Intelligent, immersive inventory management',
      features: ['Smart categorization', 'Weight tracking', 'Value estimation', 'Loot management']
    },
    { status: 200 }
  )

  // Add CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  return response
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 200 })
  
  // Add CORS headers for preflight requests
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  
  return response
}
