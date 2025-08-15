import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    name: 'TravelersTable',
    description: 'GameMaster Campaign & Player Management for RuneFrameOS',
    version: '1.0.0',
    author: 'Bad Guy Gas LLC',
    features: [
      'Campaign Management',
      'Player Tracking',
      'Character Sheet Viewing',
      'Inventory Management',
      'Built-in Dice Roller',
      'GM Notes System'
    ],
    endpoints: [
      '/api/health',
      '/api/module-info',
      '/api/status'
    ]
  })
}
