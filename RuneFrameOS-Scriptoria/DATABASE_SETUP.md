# Scriptoria Database Setup Guide 🗄️

## Overview
Scriptoria uses PostgreSQL as its primary database with Prisma ORM for type-safe database operations. The database is designed to handle multiple gaming systems, content management, and character creation workflows.

## Database Schema

### Core Tables

#### 1. Gaming Systems (`gaming_systems`)
- **Purpose**: Stores information about different tabletop RPG systems
- **Examples**: Echeladon (proprietary), D&D 5e, Pathfinder
- **Key Fields**: name, publisher, isProprietary, isActive

#### 2. System Versions (`system_versions`)
- **Purpose**: Tracks different editions/versions of gaming systems
- **Examples**: Echeladon 1.0, D&D 5e, Pathfinder 2.0
- **Key Fields**: versionName, releaseDate, gamingSystemId

#### 3. Rule Books (`rule_books`)
- **Purpose**: Manages rulebooks, expansions, and supplements
- **Examples**: Core Rules, Player's Handbook, Monster Manual
- **Key Fields**: title, bookType, price, isPurchasable

#### 4. Game Mechanics (`game_mechanics`)
- **Purpose**: Stores implementation details for game mechanics
- **Examples**: Dice rolling, combat, magic, character creation
- **Key Fields**: name, mechanicType, implementation (JSON)

#### 5. Content Items (`content_items`)
- **Purpose**: Stores actual game content (spells, equipment, rules)
- **Examples**: Longsword, Fireball spell, combat rules
- **Key Fields**: title, content (JSON), contentType, tags

#### 6. Character Templates (`character_templates`)
- **Purpose**: Provides templates for character creation
- **Examples**: Echeladon Warrior, D&D 5e Wizard
- **Key Fields**: name, templateData (JSON), gamingSystemId

## Setup Instructions

### 1. Install Dependencies
```bash
npm install @prisma/client prisma @types/pg pg
```

### 2. Environment Configuration
Create a `.env` file with:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/scriptoria_db"
JWT_SECRET="your-secret-key"
PERSONAVALT_API_URL="http://localhost:3001/api"
```

### 3. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Create database migration
npx prisma migrate dev --name init

# Seed database with initial data
npx ts-node src/lib/db/seeds.ts
```

### 4. Database Operations
```bash
# View database in Prisma Studio
npx prisma studio

# Reset database (development only)
npx prisma migrate reset

# Deploy migrations to production
npx prisma migrate deploy
```

## Key Design Principles

### 1. Modular Architecture
- Each gaming system is independent
- Content is linked to systems and versions
- Mechanics can be shared across systems

### 2. Flexible Content Storage
- Content stored as JSON for flexibility
- Tags for searchability
- Type-safe content categorization

### 3. Character Workflow
- **Scriptoria**: Character creation only
- **PersonaVault**: Character storage and management
- **No character data stored** in Scriptoria database

### 4. Extensibility
- Easy to add new gaming systems
- Support for multiple rulebook types
- Configurable game mechanics

## Data Relationships

```
GamingSystem (1) ←→ (many) SystemVersion
GamingSystem (1) ←→ (many) RuleBook
GamingSystem (1) ←→ (many) GameMechanic
GamingSystem (1) ←→ (many) ContentItem
GamingSystem (1) ←→ (many) CharacterTemplate

RuleBook (1) ←→ (many) ContentItem
GameMechanic (many) ←→ (many) ContentItem
```

## Usage Examples

### Query Gaming Systems
```typescript
import { prisma } from '@/lib/db/prisma'

// Get all active gaming systems
const systems = await prisma.gamingSystem.findMany({
  where: { isActive: true },
  include: {
    versions: true,
    ruleBooks: true,
    mechanics: true
  }
})
```

### Search Content
```typescript
// Search for content by tags
const content = await prisma.contentItem.findMany({
  where: {
    tags: { hasSome: ['weapon', 'martial'] },
    gamingSystemId: 'echeladon-id'
  }
})
```

### Get Character Template
```typescript
// Get template for character creation
const template = await prisma.characterTemplate.findFirst({
  where: {
    name: 'Echeladon Warrior',
    gamingSystemId: 'echeladon-id'
  }
})
```

## Security Considerations

### 1. Data Validation
- All input validated through Prisma schema
- JSON content validated before storage
- SQL injection protection through Prisma

### 2. Access Control
- User authentication required for purchases
- Content access based on ownership
- API rate limiting

### 3. Data Integrity
- Foreign key constraints
- Cascade deletes where appropriate
- Unique constraints on critical fields

## Performance Optimization

### 1. Indexing
- Primary keys automatically indexed
- Consider indexes on frequently searched fields
- Composite indexes for complex queries

### 2. Query Optimization
- Use Prisma's include for related data
- Pagination for large result sets
- Avoid N+1 queries

### 3. Caching
- Redis for session data
- Content caching for frequently accessed items
- Database connection pooling

## Troubleshooting

### Common Issues

#### 1. Connection Errors
```bash
# Check database status
npx prisma db pull

# Verify connection string
npx prisma validate
```

#### 2. Migration Issues
```bash
# Reset migrations
npx prisma migrate reset

# Check migration status
npx prisma migrate status
```

#### 3. Schema Sync Issues
```bash
# Push schema changes
npx prisma db push

# Generate client
npx prisma generate
```

## Next Steps

1. **Set up PostgreSQL database** on your server
2. **Configure environment variables** with real database credentials
3. **Run initial migration** to create tables
4. **Seed database** with Echeladon content
5. **Test database operations** through API endpoints

## Support

For database-related issues:
1. Check Prisma documentation: https://pris.ly/docs
2. Review database logs
3. Use Prisma Studio for data inspection
4. Check migration history
