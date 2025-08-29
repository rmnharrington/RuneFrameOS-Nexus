import { prisma } from './prisma'

export async function testDatabaseConnection() {
  try {
    console.log('🔌 Testing database connection...')
    
    // Test basic connection
    await prisma.$connect()
    console.log('✅ Database connection successful!')
    
    // Test simple query
    const systemCount = await prisma.gamingSystem.count()
    console.log(`📊 Found ${systemCount} gaming systems in database`)
    
    // Test gaming systems query
    const systems = await prisma.gamingSystem.findMany({
      select: {
        id: true,
        name: true,
        isActive: true,
        _count: {
          select: {
            versions: true,
            ruleBooks: true,
            mechanics: true,
            content: true
          }
        }
      }
    })
    
    console.log('🎮 Gaming Systems:')
    systems.forEach(system => {
      console.log(`  - ${system.name}: ${system._count.versions} versions, ${system._count.ruleBooks} books, ${system._count.mechanics} mechanics, ${system._count.content} content items`)
    })
    
    await prisma.$disconnect()
    console.log('🔌 Database connection closed')
    
    return { success: true, systems }
    
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    await prisma.$disconnect()
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  testDatabaseConnection()
    .then((result) => {
      if (result.success) {
        console.log('🎉 Database test completed successfully!')
        process.exit(0)
      } else {
        console.error('💥 Database test failed!')
        process.exit(1)
      }
    })
    .catch((error) => {
      console.error('💥 Unexpected error:', error)
      process.exit(1)
    })
}
