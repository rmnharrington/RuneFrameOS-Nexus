import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const moduleInfo = {
      id: 'scriptoria',
      name: 'Scriptoria',
      description: 'Comprehensive gaming systems library featuring Third-Party Publishers, the Echeladon system, Homegrown systems, and user-created rulesets.',
      version: '1.0.0',
      status: 'operational',
      port: 3006,
      features: [
        'Gaming Systems Library',
        'Third-Party Publishers (AD&D, GURPS)',
        'Echeladon System (Bad Guy Gas)',
        'Homegrown Systems (Shadowforge, Neon Dreams, Mystic Realms)',
        'User-Created Rulesets',
        'Rules Management',
        'System Integration'
      ],
      endpoints: [
        '/api/health',
        '/api/module-info',
        '/api/status'
      ],
      category: 'Gaming',
      tags: ['gaming', 'rules', 'systems', 'library'],
      lastUpdated: new Date().toISOString()
    }

    return NextResponse.json(moduleInfo, {
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
        message: 'Failed to retrieve module info',
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
