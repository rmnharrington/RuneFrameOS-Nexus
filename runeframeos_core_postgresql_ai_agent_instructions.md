# RuneFrameOS Core PostgreSQL AI Agent Instructions
## Machine AI Agent Database Interaction Guide for Sherlock Cluster

### 📋 Overview

This document provides comprehensive instructions for AI agents to interact with the RuneFrameOS Core PostgreSQL database deployed on the Sherlock Kubernetes cluster. The database serves as the central data store for all RuneFrameOS ecosystem components.

**Database Name**: `runeframeos_core`  
**Cluster**: Sherlock (sherlock.pedantictheory.com)  
**Namespace**: `postgresql`  
**Service**: `postgresql-primary.postgresql.svc.cluster.local`  

---

## 🔧 Connection Information

### Database Access Details
```yaml
Database Configuration:
  host: postgresql-primary.postgresql.svc.cluster.local
  port: 5432
  database: runeframeos_core
  username: runeframeos_core
  password: runeframeos_core_secure_2025
  ssl_mode: prefer
  application_name: "RuneFrameOS-AI-Agent"
```

### Kubernetes Access
```bash
# Direct kubectl access to PostgreSQL pod
kubectl exec -n postgresql postgresql-primary-0 -- psql -U runeframeos_core -d runeframeos_core

# Port forward for external access (if needed)
kubectl port-forward -n postgresql svc/postgresql-primary 5432:5432

# Check database status
kubectl get pods -n postgresql
kubectl get svc -n postgresql
```

---

## 🗂️ Database Schema Structure

### Core Schemas Overview
The RuneFrameOS Core database contains **6 schemas** with **15 tables**:

#### 1. **distilera** (Alchemy Simulation Platform)
- `users` - User accounts and authentication
- `formulas` - Alchemy recipes and processes  
- `user_sessions` - User gameplay sessions and progress

#### 2. **hoardwell** (Multi-Agent Communication Platform)
- `inventory` - User assets and item management
- `channels` - Communication channels
- `messages` - Message history and content

#### 3. **tapestry** (World-Building Engine)
- `worlds` - Virtual worlds with CNC coordinates
- `locations` - Places within worlds
- `characters` - NPCs and player characters

#### 4. **mercatrix** (Economic Foundation Engine)
- `markets` - Trading markets and exchanges
- `transactions` - Trade history and economics

#### 5. **veridicus** (Data Provenance and Attestation)
- `data_lineage` - Complete audit trail and data provenance
- `security_events` - Security monitoring and events

#### 6. **shared** (Common Utilities)
- `config` - Application configuration
- `notifications` - System notifications

---

## 🤖 AI Agent Database Interaction Patterns

### Connection Management
```sql
-- Always use connection pooling for AI agents
-- Maximum concurrent connections: 20 per agent
-- Connection timeout: 30 seconds
-- Query timeout: 60 seconds

-- Test connectivity
SELECT version(), current_database(), current_user;

-- Check schema access
SELECT schema_name FROM information_schema.schemata 
WHERE schema_name IN ('distilera', 'hoardwell', 'tapestry', 'mercatrix', 'veridicus', 'shared');
```

### User Management Operations
```sql
-- Create new user (Distilera component)
INSERT INTO distilera.users (email, username, password_hash, role, stats) 
VALUES ($1, $2, crypt($3, gen_salt('bf')), $4, $5::jsonb)
RETURNING id, username, role, created_at;

-- Authenticate user
SELECT id, username, role, stats, is_active 
FROM distilera.users 
WHERE email = $1 AND password_hash = crypt($2, password_hash) AND is_active = true;

-- Update user statistics
UPDATE distilera.users 
SET stats = stats || $2::jsonb, updated_at = NOW() 
WHERE id = $1
RETURNING stats;
```

### Inventory Operations (Hoardwell)
```sql
-- Add item to inventory
INSERT INTO hoardwell.inventory (owner_id, name, description, item_type, quantity, metadata, rarity) 
VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7)
RETURNING id, name, quantity;

-- Transfer items between users
BEGIN;
UPDATE hoardwell.inventory SET quantity = quantity - $3 WHERE owner_id = $1 AND id = $2 AND quantity >= $3;
INSERT INTO hoardwell.inventory (owner_id, name, description, item_type, quantity, metadata, rarity)
SELECT $4, name, description, item_type, $3, metadata, rarity FROM hoardwell.inventory WHERE id = $2;
COMMIT;

-- Get user inventory
SELECT id, name, description, item_type, quantity, rarity, value 
FROM hoardwell.inventory 
WHERE owner_id = $1 AND quantity > 0
ORDER BY rarity DESC, name ASC;
```

### World Building Operations (Tapestry)
```sql
-- Create new world with CNC coordinates
INSERT INTO tapestry.worlds (name, description, cnc_coordinates, world_type, created_by) 
VALUES ($1, $2, $3::jsonb, $4, $5)
RETURNING id, name, cnc_coordinates;

-- Add location to world
INSERT INTO tapestry.locations (world_id, name, description, coordinates, location_type) 
VALUES ($1, $2, $3, $4::jsonb, $5)
RETURNING id, name, coordinates;

-- Create character in world
INSERT INTO tapestry.characters (world_id, location_id, name, description, character_type, stats, created_by) 
VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7)
RETURNING id, name, character_type;
```

### Economic Operations (Mercatrix)
```sql
-- Create marketplace transaction
INSERT INTO mercatrix.transactions (market_id, buyer_id, seller_id, item_id, quantity, price_per_unit, total_price, currency) 
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING id, total_price, status;

-- Get market data
SELECT m.name, m.market_type, m.base_currency,
       COUNT(t.id) as total_transactions,
       AVG(t.total_price) as avg_price
FROM mercatrix.markets m
LEFT JOIN mercatrix.transactions t ON m.id = t.market_id
WHERE m.is_active = true
GROUP BY m.id, m.name, m.market_type, m.base_currency;
```

### Data Provenance Tracking (Veridicus)
```sql
-- Record data lineage for audit trail
INSERT INTO veridicus.data_lineage (entity_type, entity_id, action, actor_id, data_hash, metadata) 
VALUES ($1, $2, $3, $4, $5, $6::jsonb)
RETURNING id, timestamp;

-- Log security event
INSERT INTO veridicus.security_events (event_type, severity, source, description, user_id, ip_address, metadata) 
VALUES ($1, $2, $3, $4, $5, $6::inet, $7::jsonb)
RETURNING id, created_at;

-- Get audit trail for entity
SELECT action, actor_id, data_hash, metadata, timestamp 
FROM veridicus.data_lineage 
WHERE entity_type = $1 AND entity_id = $2 
ORDER BY timestamp DESC;
```

---

## 📊 Monitoring and Maintenance

### Health Check Queries
```sql
-- Database health check
SELECT 
    schemaname,
    COUNT(*) as table_count,
    pg_size_pretty(SUM(pg_total_relation_size(schemaname||'.'||tablename))) as size
FROM pg_tables 
WHERE schemaname IN ('distilera', 'hoardwell', 'tapestry', 'mercatrix', 'veridicus', 'shared')
GROUP BY schemaname;

-- Connection status
SELECT state, count(*) FROM pg_stat_activity WHERE datname = 'runeframeos_core' GROUP BY state;

-- Performance metrics
SELECT query, calls, total_time, mean_time 
FROM pg_stat_statements 
ORDER BY total_time DESC LIMIT 10;
```

### Backup Verification
```bash
# Check backup job status
kubectl get cronjobs -n postgresql

# Manual backup command
kubectl exec -n postgresql postgresql-primary-0 -- pg_dump -U postgres runeframeos_core > backup_$(date +%Y%m%d).sql

# Restore from backup (if needed)
kubectl exec -n postgresql postgresql-primary-0 -- psql -U postgres -d runeframeos_core < backup_file.sql
```

---

## 🔒 Security Guidelines for AI Agents

### Authentication Best Practices
```sql
-- Always use prepared statements to prevent SQL injection
-- Use connection pooling with authentication
-- Rotate passwords regularly (monthly recommended)

-- Check current user permissions
SELECT grantee, privilege_type, table_schema, table_name 
FROM information_schema.role_table_grants 
WHERE grantee = 'runeframeos_core';
```

### Data Protection
```sql
-- Hash sensitive data
SELECT crypt('sensitive_data', gen_salt('bf'));

-- Generate secure UUIDs
SELECT uuid_generate_v4();

-- Encrypt JSON data (example)
UPDATE shared.config SET value = pgp_sym_encrypt(value::text, 'encryption_key')::jsonb 
WHERE key = 'sensitive_config';
```

### Audit Logging
```sql
-- Log all significant operations in Veridicus
-- Always include: entity_type, entity_id, action, actor_id, timestamp
-- Include data hash for integrity verification

-- Example audit log entry
INSERT INTO veridicus.data_lineage (entity_type, entity_id, action, actor_id, data_hash, metadata) 
VALUES ('user', $1, 'login', $1, encode(sha256($2::bytea), 'hex'), 
        jsonb_build_object('ip_address', $3, 'user_agent', $4, 'ai_agent', true));
```

---

## ⚡ Performance Optimization

### Query Optimization
```sql
-- Use indexes effectively
EXPLAIN ANALYZE SELECT * FROM distilera.users WHERE email = 'user@example.com';

-- Batch operations for efficiency
INSERT INTO hoardwell.inventory (owner_id, name, item_type, quantity) 
VALUES 
    ($1, 'item1', 'material', 10),
    ($1, 'item2', 'tool', 1),
    ($1, 'item3', 'potion', 5);

-- Use CTEs for complex queries
WITH user_stats AS (
    SELECT u.id, u.username, u.stats,
           COUNT(i.id) as inventory_count,
           SUM(i.value) as total_value
    FROM distilera.users u
    LEFT JOIN hoardwell.inventory i ON u.id = i.owner_id
    GROUP BY u.id, u.username, u.stats
)
SELECT * FROM user_stats WHERE total_value > 1000;
```

### Connection Pooling Configuration
```yaml
# AI Agent Connection Pool Settings
pool_size: 5
max_overflow: 10
pool_timeout: 30
pool_recycle: 3600
pool_pre_ping: true
```

---

## 🚀 Kubernetes Integration Commands

### Pod Management
```bash
# Get PostgreSQL pod status
kubectl get pods -n postgresql -l app=postgresql

# Check pod logs
kubectl logs -n postgresql postgresql-primary-0 -f

# Get pod resource usage
kubectl top pod -n postgresql postgresql-primary-0

# Describe pod for troubleshooting
kubectl describe pod -n postgresql postgresql-primary-0
```

### Service Discovery
```bash
# Get service information
kubectl get svc -n postgresql postgresql-primary

# Check service endpoints
kubectl get endpoints -n postgresql postgresql-primary

# Test service connectivity from another pod
kubectl run test-pod --image=postgres:15-alpine --rm -it -- psql -h postgresql-primary.postgresql.svc.cluster.local -U runeframeos_core -d runeframeos_core
```

### Storage Management
```bash
# Check persistent volume claims
kubectl get pvc -n postgresql

# Check persistent volumes
kubectl get pv | grep postgresql

# Monitor storage usage
kubectl exec -n postgresql postgresql-primary-0 -- df -h /var/lib/postgresql/data
```

---

## 📝 Common AI Agent Use Cases

### 1. User Registration and Authentication
```python
# Example Python code for AI agents
import psycopg2
import hashlib
import json

def create_user(email, username, password, role='player'):
    conn = psycopg2.connect(
        host="postgresql-primary.postgresql.svc.cluster.local",
        port=5432,
        database="runeframeos_core",
        user="runeframeos_core",
        password="runeframeos_core_secure_2025"
    )
    
    with conn.cursor() as cur:
        # Hash password and create user
        cur.execute("""
            INSERT INTO distilera.users (email, username, password_hash, role, stats) 
            VALUES (%s, %s, crypt(%s, gen_salt('bf')), %s, %s)
            RETURNING id, username, created_at
        """, (email, username, password, role, json.dumps({"INT": 10, "RES": 10, "APL": 10, "level": 1})))
        
        result = cur.fetchone()
        
        # Log user creation in audit trail
        cur.execute("""
            INSERT INTO veridicus.data_lineage (entity_type, entity_id, action, actor_id, data_hash, metadata) 
            VALUES ('user', %s, 'created', %s, %s, %s)
        """, (result[0], result[0], hashlib.sha256(f"{email}{username}".encode()).hexdigest(), 
              json.dumps({"ai_agent": True, "registration_source": "api"})))
        
        conn.commit()
        return result
```

### 2. Game State Management
```python
def update_game_session(user_id, formula_id, progress_data):
    conn = psycopg2.connect(connection_params)
    
    with conn.cursor() as cur:
        # Update or create session
        cur.execute("""
            INSERT INTO distilera.user_sessions (user_id, current_formula_id, progress, started_at) 
            VALUES (%s, %s, %s, NOW())
            ON CONFLICT (user_id) DO UPDATE SET
                current_formula_id = EXCLUDED.current_formula_id,
                progress = EXCLUDED.progress,
                started_at = NOW()
            RETURNING id
        """, (user_id, formula_id, json.dumps(progress_data)))
        
        session_id = cur.fetchone()[0]
        
        # Log session update
        cur.execute("""
            INSERT INTO veridicus.data_lineage (entity_type, entity_id, action, actor_id, metadata) 
            VALUES ('session', %s, 'updated', %s, %s)
        """, (session_id, user_id, json.dumps({"progress_percentage": progress_data.get("completion", 0)})))
        
        conn.commit()
        return session_id
```

### 3. Economic Transactions
```python
def process_trade(buyer_id, seller_id, item_id, quantity, price_per_unit, market_id):
    conn = psycopg2.connect(connection_params)
    
    with conn.cursor() as cur:
        try:
            # Start transaction
            cur.execute("BEGIN")
            
            # Check seller has items
            cur.execute("""
                SELECT quantity FROM hoardwell.inventory 
                WHERE owner_id = %s AND id = %s AND quantity >= %s
            """, (seller_id, item_id, quantity))
            
            if not cur.fetchone():
                raise ValueError("Insufficient inventory")
            
            # Update seller inventory
            cur.execute("""
                UPDATE hoardwell.inventory SET quantity = quantity - %s 
                WHERE owner_id = %s AND id = %s
            """, (quantity, seller_id, item_id))
            
            # Create transaction record
            cur.execute("""
                INSERT INTO mercatrix.transactions 
                (market_id, buyer_id, seller_id, item_id, quantity, price_per_unit, total_price, status) 
                VALUES (%s, %s, %s, %s, %s, %s, %s, 'completed')
                RETURNING id
            """, (market_id, buyer_id, seller_id, item_id, quantity, price_per_unit, quantity * price_per_unit))
            
            transaction_id = cur.fetchone()[0]
            
            # Add item to buyer inventory
            cur.execute("""
                INSERT INTO hoardwell.inventory (owner_id, name, item_type, quantity, metadata)
                SELECT %s, name, item_type, %s, metadata 
                FROM hoardwell.inventory WHERE id = %s
            """, (buyer_id, quantity, item_id))
            
            # Log transaction
            cur.execute("""
                INSERT INTO veridicus.data_lineage (entity_type, entity_id, action, actor_id, metadata) 
                VALUES ('transaction', %s, 'completed', %s, %s)
            """, (transaction_id, buyer_id, json.dumps({
                "seller_id": seller_id, "item_id": item_id, "quantity": quantity, "total_price": quantity * price_per_unit
            })))
            
            cur.execute("COMMIT")
            return transaction_id
            
        except Exception as e:
            cur.execute("ROLLBACK")
            raise e
```

---

## 🔧 Troubleshooting Guide

### Common Issues and Solutions

#### Connection Issues
```bash
# Test basic connectivity
kubectl exec -n postgresql postgresql-primary-0 -- pg_isready -U postgres

# Check service DNS resolution
kubectl exec -n postgresql postgresql-primary-0 -- nslookup postgresql-primary.postgresql.svc.cluster.local

# Verify credentials
kubectl get secret -n postgresql postgresql-secrets -o yaml
```

#### Performance Issues
```sql
-- Check for blocking queries
SELECT blocked_locks.pid AS blocked_pid,
       blocked_activity.usename AS blocked_user,
       blocking_locks.pid AS blocking_pid,
       blocking_activity.usename AS blocking_user,
       blocked_activity.query AS blocked_statement,
       blocking_activity.query AS current_statement_in_blocking_process
FROM pg_catalog.pg_locks blocked_locks
JOIN pg_catalog.pg_stat_activity blocked_activity ON blocked_activity.pid = blocked_locks.pid
JOIN pg_catalog.pg_locks blocking_locks ON blocking_locks.locktype = blocked_locks.locktype
JOIN pg_catalog.pg_stat_activity blocking_activity ON blocking_activity.pid = blocking_locks.pid
WHERE NOT blocked_locks.granted;

-- Check index usage
SELECT schemaname, tablename, indexname, idx_tup_read, idx_tup_fetch 
FROM pg_stat_user_indexes 
ORDER BY idx_tup_read DESC;
```

#### Storage Issues
```bash
# Check storage usage
kubectl exec -n postgresql postgresql-primary-0 -- du -sh /var/lib/postgresql/data

# Check available space
kubectl exec -n postgresql postgresql-primary-0 -- df -h

# Clean up old WAL files (if needed)
kubectl exec -n postgresql postgresql-primary-0 -- pg_archivecleanup /var/lib/postgresql/data/pg_wal $(ls /var/lib/postgresql/data/pg_wal/*.backup | head -1)
```

---

## 📚 Reference Materials

### SQL Standards Compliance
- PostgreSQL 15.13 compatibility
- ACID transaction support
- JSONB for flexible data structures
- UUID primary keys for distributed systems
- Comprehensive indexing strategy

### Security Features
- Password hashing with bcrypt
- Row-level security (RLS) ready
- SSL/TLS encryption support
- Audit logging with Veridicus
- Data lineage tracking

### Backup and Recovery
- Automated daily backups via CronJob
- Point-in-time recovery capability
- WAL archiving for data durability
- Cross-region backup storage ready

---

## 🚨 Emergency Procedures

### Database Recovery
```bash
# Emergency database restart
kubectl delete pod -n postgresql postgresql-primary-0

# Check pod restart status
kubectl get pods -n postgresql -w

# Verify data integrity after restart
kubectl exec -n postgresql postgresql-primary-0 -- psql -U postgres -d runeframeos_core -c "SELECT COUNT(*) FROM distilera.users;"
```

### Data Export (Emergency Backup)
```bash
# Full database dump
kubectl exec -n postgresql postgresql-primary-0 -- pg_dump -U postgres runeframeos_core > emergency_backup_$(date +%Y%m%d_%H%M%S).sql

# Schema-specific backup
kubectl exec -n postgresql postgresql-primary-0 -- pg_dump -U postgres -n distilera runeframeos_core > distilera_backup.sql
```

### Contact Information
- **Infrastructure Team**: infrastructure@runeframeos.com
- **Database Team**: dba@runeframeos.com  
- **Security Team**: security@runeframeos.com
- **Emergency Escalation**: +1-555-RUNEFRAME

---

**Document Version**: 1.0  
**Last Updated**: August 9, 2025  
**Next Review**: September 9, 2025  
**Approved By**: Database Architecture Team  
**Classification**: Internal Use - AI Agents  

*This document is part of the RuneFrameOS infrastructure framework and must be maintained according to established security policies.*
