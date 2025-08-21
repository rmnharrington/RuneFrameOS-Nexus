# Scriptoria Database Setup & Deployment Guide 🗄️

## Overview
Scriptoria now has its own dedicated PostgreSQL database running on port 5433, separate from other applications. This allows for independent deployment and management of the gaming platform.

## Architecture

### Database Container
- **Container Name**: `scriptoria-postgres`
- **Port**: 5433 (external) → 5432 (internal)
- **Database**: `scriptoria_db`
- **User**: `scriptoria_user`
- **Password**: `scriptoria_secure_pass_2024`
- **Host**: `172.18.254.35:5433`

### Data Persistence
- **Volume**: `scriptoria_postgres_data`
- **Location**: `/home/wee/scriptoria-postgres-data` (on sherlock)
- **Purpose**: Persistent storage for all database data

## Quick Start

### 1. Deploy Everything at Once
```bash
# SSH to sherlock
ssh wee@sherlock.pedantictheory.com

# Navigate to Scriptoria directory
cd RuneFrameOS-Scriptoria

# Run full deployment
./scripts/deploy-scriptoria.sh deploy
```

### 2. Deploy Step by Step
```bash
# Start database only
./scripts/deploy-scriptoria.sh database

# Deploy application only (after database is ready)
./scripts/deploy-scriptoria.sh app
```

## Database Management

### Using the Management Script
```bash
# Check database status
./scripts/manage-database.sh status

# Start database
./scripts/manage-database.sh start

# Stop database
./scripts/manage-database.sh stop

# Restart database
./scripts/manage-database.sh restart

# Create backup
./scripts/manage-database.sh backup

# Restore from backup
./scripts/manage-database.sh restore backups/scriptoria_backup_20241201_143022.sql

# Show logs
./scripts/manage-database.sh logs

# Test connection
./scripts/manage-database.sh check
```

### Manual Docker Commands
```bash
# Start database
docker run --name scriptoria-postgres \
  -e POSTGRES_DB=scriptoria_db \
  -e POSTGRES_USER=scriptoria_user \
  -e POSTGRES_PASSWORD=scriptoria_secure_pass_2024 \
  -p 5433:5432 \
  -v scriptoria_postgres_data:/var/lib/postgresql/data \
  -d postgres:15

# Check status
docker ps | grep scriptoria-postgres

# View logs
docker logs scriptoria-postgres

# Stop database
docker stop scriptoria-postgres

# Remove container
docker rm scriptoria-postgres
```

## Database Schema

### Core Tables
1. **gaming_systems** - Different RPG systems (Echeladon, D&D 5e, etc.)
2. **system_versions** - Versions/editions of each system
3. **rule_books** - Rulebooks, expansions, supplements
4. **game_mechanics** - Game mechanics implementation
5. **content_items** - Actual game content (spells, equipment, rules)
6. **character_templates** - Templates for character creation
7. **system_implementations** - How each system works in Scriptoria

### Key Features
- **Modular Design**: Each gaming system is independent
- **Flexible Content**: JSON storage for game content
- **Character Workflow**: Creation only, no storage (sends to PersonaVault)
- **Extensible**: Easy to add new gaming systems

## Environment Configuration

### .env File
```env
DATABASE_URL="postgresql://scriptoria_user:scriptoria_secure_pass_2024@172.18.254.35:5433/scriptoria_db"
JWT_SECRET="scriptoria-super-secret-jwt-key-2024"
PERSONAVALT_API_URL="http://172.18.254.35:30001/api"
```

### Database Connection String
```
postgresql://scriptoria_user:scriptoria_secure_pass_2024@172.18.254.35:5433/scriptoria_db
```

## Development Workflow

### 1. Local Development
```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Push schema changes
npm run db:push

# Seed database
npm run db:seed

# Test connection
npm run db:test

# Start development server
npm run dev
```

### 2. Database Operations
```bash
# View database in Prisma Studio
npm run db:studio

# Create migration
npm run db:migrate

# Reset database (development only)
npx prisma migrate reset
```

### 3. Testing
```bash
# Test database connection
npm run db:test

# Run seeding
npm run db:seed
```

## Deployment

### Prerequisites
- Docker running on sherlock
- Access to sherlock.pedantictheory.com
- Kubernetes cluster (k3s) running

### Deployment Steps
1. **Database Setup**
   - Start PostgreSQL container
   - Wait for database to be ready
   - Push Prisma schema
   - Seed initial data

2. **Application Build**
   - Install dependencies
   - Build Next.js application
   - Generate Prisma client

3. **Kubernetes Deployment**
   - Create namespace if needed
   - Apply deployment YAML
   - Wait for pods to be ready
   - Verify accessibility

### Verification
```bash
# Check deployment status
./scripts/deploy-scriptoria.sh status

# Verify database
./scripts/manage-database.sh check

# Test application
curl http://172.18.254.35:30006
```

## Monitoring & Maintenance

### Health Checks
- **Database**: `pg_isready` command
- **Application**: HTTP endpoint checks
- **Kubernetes**: Pod readiness probes

### Logs
```bash
# Database logs
docker logs scriptoria-postgres

# Application logs
sudo k3s kubectl logs -n runeframeos -l app=scriptoria

# Follow logs
docker logs scriptoria-postgres -f
sudo k3s kubectl logs -n runeframeos -l app=scriptoria -f
```

### Backups
```bash
# Create backup
./scripts/manage-database.sh backup

# List backups
ls -la backups/

# Restore from backup
./scripts/manage-database.sh restore backups/scriptoria_backup_YYYYMMDD_HHMMSS.sql
```

## Troubleshooting

### Common Issues

#### 1. Database Connection Failed
```bash
# Check if container is running
docker ps | grep scriptoria-postgres

# Check container logs
docker logs scriptoria-postgres

# Test connection manually
docker exec scriptoria-postgres pg_isready -U scriptoria_user -d scriptoria_db
```

#### 2. Application Not Accessible
```bash
# Check pod status
sudo k3s kubectl get pods -n runeframeos -l app=scriptoria

# Check service status
sudo k3s kubectl get services -n runeframeos -l app=scriptoria

# Check pod logs
sudo k3s kubectl logs -n runeframeos deployment/scriptoria
```

#### 3. Prisma Issues
```bash
# Regenerate client
npm run db:generate

# Reset database (development only)
npx prisma migrate reset

# Check schema
npx prisma validate
```

### Reset Everything
```bash
# Clean up all resources
./scripts/deploy-scriptoria.sh cleanup

# Start fresh
./scripts/deploy-scriptoria.sh deploy
```

## Security Considerations

### Database Security
- **Port**: Only accessible on sherlock (172.18.254.35:5433)
- **Credentials**: Stored in environment variables
- **Network**: Isolated Docker network
- **Data**: Persistent volume storage

### Application Security
- **JWT**: Secure token-based authentication
- **API**: Rate limiting and validation
- **Content**: Access control based on ownership

## Performance

### Database Optimization
- **Connection Pooling**: Prisma client optimization
- **Indexing**: Automatic primary key indexing
- **Queries**: Optimized with Prisma ORM
- **Caching**: Redis for session data (future)

### Application Performance
- **Next.js**: Built-in optimization
- **Static Generation**: Pre-built pages where possible
- **API Routes**: Efficient database queries
- **CDN**: Static asset delivery (future)

## Future Enhancements

### Planned Features
- **Redis Cache**: Session and content caching
- **Monitoring**: Prometheus metrics
- **Alerting**: Automated health notifications
- **Scaling**: Horizontal pod autoscaling
- **Backup Automation**: Scheduled backups
- **Disaster Recovery**: Multi-region replication

### Integration Points
- **PersonaVault**: Character data transfer
- **Nexus**: Centralized app management
- **Other Apps**: Cross-application features

## Support

### Documentation
- **Prisma**: https://pris.ly/docs
- **PostgreSQL**: https://www.postgresql.org/docs/
- **Docker**: https://docs.docker.com/
- **Kubernetes**: https://kubernetes.io/docs/

### Commands Reference
```bash
# Database management
./scripts/manage-database.sh [command]

# Application deployment
./scripts/deploy-scriptoria.sh [command]

# Prisma operations
npm run db:[operation]

# Kubernetes operations
sudo k3s kubectl [command] -n runeframeos
```

### Getting Help
1. Check this README first
2. Review script help: `./scripts/manage-database.sh help`
3. Check deployment status: `./scripts/deploy-scriptoria.sh status`
4. Review logs for errors
5. Check Prisma and Docker documentation

---

**🎯 Ready to deploy?** Run `./scripts/deploy-scriptoria.sh deploy` to get started!
