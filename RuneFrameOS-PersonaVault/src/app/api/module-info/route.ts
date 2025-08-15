import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    module: {
      id: "persona-vault",
      name: "PersonaVault",
      version: "1.0.0",
      description: "Character Sheet Binder & Dice Roller for RuneFrameOS",
      author: "Bad Guy Gas LLC",
      repository: "https://github.com/badguygas/runeframeos-personavault"
    },
    status: {
      state: "online",
      lastHeartbeat: new Date().toISOString(),
      uptime: process.uptime()
    },
    capabilities: {
      supportsLaunch: true,
      supportsEmbed: false,
      requiresAuth: false
    },
    endpoints: {
      launch: "/",
      embed: null,
      health: "/api/health"
    }
  })
}
