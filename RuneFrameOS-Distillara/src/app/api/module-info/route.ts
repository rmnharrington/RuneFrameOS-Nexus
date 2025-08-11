import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const moduleInfo = {
      id: 'distillara',
      name: 'Distillara',
      description: 'Advanced alchemy crafting system with rarity tiers, economy, and failure mechanics.',
      version: 'v0.1.0',
      status: 'operational',
      category: 'Crafting',
      features: ['Alchemy Crafting', 'Rarity Tiers', 'Economy System', 'Failure Mechanics'],
      capabilities: ['Create Potions', 'Manage Resources', 'Track Progress', 'Handle Failures'],
      lastUpdated: new Date().toISOString(),
      endpoints: ['/api/health', '/api/module-info', '/api/status']
    }

    return NextResponse.json(moduleInfo, { 
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
        status: 'error', 
        message: 'Failed to retrieve module info',
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
