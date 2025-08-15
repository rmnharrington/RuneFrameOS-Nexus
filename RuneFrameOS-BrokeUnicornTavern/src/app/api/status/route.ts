import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    service: 'Broke Unicorn Tavern',
    status: 'operational',
    timestamp: new Date().toISOString(),
    metrics: {
      online_players: 24,
      active_games: 8,
      total_members: 156,
      upcoming_events: 3,
      games_posted_today: 2,
      new_members_today: 1
    },
    system_info: {
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      uptime: process.uptime(),
      memory_usage: process.memoryUsage(),
      node_version: process.version
    },
    last_health_check: new Date().toISOString()
  })
}
