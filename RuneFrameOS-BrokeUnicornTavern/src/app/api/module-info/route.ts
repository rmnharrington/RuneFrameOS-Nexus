import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    name: 'Broke Unicorn Tavern',
    description: 'Social Hub & Game Coordination for RuneFrameOS',
    version: '1.0.0',
    port: 3005,
    status: 'running',
    features: [
      'Available Games listing',
      'Post Game functionality',
      'My Games management',
      'Player Ratings system',
      'Community features',
      'Events coordination'
    ],
    color_theme: 'Light yellow/neutral (tavern, warm, neutral)',
    hero_banner: 'Implemented with proper structure',
    layout_compliance: 'Follows GUI_DESIGN_SPECIFICATION.md exactly',
    api_endpoints: [
      '/api/health',
      '/api/module-info',
      '/api/status'
    ],
    last_updated: new Date().toISOString()
  })
}
