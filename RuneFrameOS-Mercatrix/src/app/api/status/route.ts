import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      status: 'operational',
      lastUpdated: new Date().toISOString(),
      metrics: {
        activeUsers: 18,
        marketsCreated: 23,
        tradeRoutes: 47,
        gdpManaged: 2400000,
        economicPolicies: 156
      },
      recentActivity: [
        {
          type: 'market_created',
          timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
          data: 'New marketplace established in fantasy realm'
        },
        {
          type: 'trade_route_established',
          timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          data: 'Trade route created between sci-fi colonies'
        },
        {
          type: 'currency_updated',
          timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
          data: 'Currency values adjusted for medieval setting'
        }
      ]
    },
    message: 'Module status retrieved successfully'
  })
}
