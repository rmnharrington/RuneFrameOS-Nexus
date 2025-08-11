import { NextResponse } from 'next/server'

export async function GET() {
  const response = NextResponse.json(
    {
      status: 'operational',
      service: 'Feastwell',
      version: '0.1.0',
      timestamp: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      uptime: process.uptime(),
      port: 3003,
      description: 'Cooking and recipe management system with immersive flavor text and game mechanics',
      features: ['Recipe database', 'Flavor system', 'Nutrition tracking', 'Meal planning']
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
