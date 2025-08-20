# Database Schema Standards

## 🎯 **Purpose**

This document establishes comprehensive database schema standards for the RuneFrameOS ecosystem, ensuring data integrity, performance, and maintainability across all components.

## 📋 **Table of Contents**

1. [Naming Conventions](#naming-conventions)
2. [Schema Design Principles](#schema-design-principles)
3. [Migration Procedures](#migration-procedures)
4. [Data Validation Standards](#data-validation-standards)
5. [Backup and Recovery Procedures](#backup-and-recovery-procedures)
6. [Performance Optimization](#performance-optimization)
7. [Security Requirements](#security-requirements)
8. [Quality Assurance](#quality-assurance)
9. [Maintenance Procedures](#maintenance-procedures)

## 🏗️ **Naming Conventions**

### **Table Naming**
- **Format**: `{component}_{entity}_{type}`
- **Examples**: 
  - `distilera_users_main`
  - `hoardwell_messages_archive`
  - `mercatrix_transactions_pending`
- **Rules**:
  - Use lowercase with underscores
  - No spaces or special characters
  - Prefix with component name for multi-component databases
  - Use descriptive, clear names

### **Column Naming**
- **Format**: `{descriptive_name}_{type}`
- **Examples**:
  - `user_id_uuid`
  - `created_at_timestamp`
  - `is_active_boolean`
  - `email_address_varchar`
- **Rules**:
  - Use snake_case
  - Include data type suffix for clarity
  - Be descriptive and specific
  - Avoid abbreviations unless widely understood

### **Index Naming**
- **Format**: `idx_{table}_{columns}_{type}`
- **Examples**:
  - `idx_users_email_unique`
  - `idx_transactions_created_at_btree`
  - `idx_messages_user_id_created_at_composite`
- **Rules**:
  - Prefix with `idx_` for indexes
  - Include table name and column names
  - Specify index type (btree, hash, gin, etc.)
  - Use `unique` suffix for unique constraints

### **Constraint Naming**
- **Primary Key**: `pk_{table}`
- **Foreign Key**: `fk_{table}_{referenced_table}_{column}`
- **Check Constraint**: `ck_{table}_{column}_{condition}`
- **Unique Constraint**: `uq_{table}_{columns}`

## 🏗️ **Schema Design Principles**

### **Normalization Standards**
- **First Normal Form (1NF)**: Atomic values, no repeating groups
- **Second Normal Form (2NF)**: No partial dependencies
- **Third Normal Form (3NF)**: No transitive dependencies
- **Boyce-Codd Normal Form (BCNF)**: For complex business rules
- **Fourth Normal Form (4NF)**: For multi-valued dependencies

### **Data Types and Constraints**
```sql
-- UUID for primary keys
id UUID PRIMARY KEY DEFAULT gen_random_uuid()

-- Timestamps with timezone
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()

-- Text fields with appropriate limits
name VARCHAR(255) NOT NULL
description TEXT

-- Boolean flags
is_active BOOLEAN DEFAULT TRUE
is_deleted BOOLEAN DEFAULT FALSE

-- JSON for flexible data
metadata JSONB

-- Enums for constrained values
status ENUM('pending', 'active', 'suspended', 'deleted')
```

### **Audit Trail Requirements**
- **Required Fields**: `created_at`, `updated_at`, `created_by`, `updated_by`
- **Soft Delete**: `is_deleted` boolean flag
- **Version Control**: `version` integer for optimistic locking
- **Change Tracking**: `change_reason` text field for audit purposes

## 🔄 **Migration Procedures**

### **Migration File Naming**
- **Format**: `{timestamp}_{description}_{type}.sql`
- **Examples**:
  - `20250107_001_create_users_table.sql`
  - `20250107_002_add_email_index.sql`
  - `20250107_003_alter_users_add_metadata.sql`

### **Migration Structure**
```sql
-- Up Migration
BEGIN;

-- Add migration logic here
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_deleted BOOLEAN DEFAULT FALSE
);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);

COMMIT;

-- Down Migration (Rollback)
BEGIN;

DROP TABLE IF EXISTS users;

COMMIT;
```

### **Migration Best Practices**
1. **Atomic Operations**: Each migration should be atomic
2. **Rollback Support**: Always include down migration
3. **Testing**: Test migrations in development first
4. **Backup**: Create backup before production migrations
5. **Documentation**: Document complex migrations
6. **Validation**: Verify migration results

### **Migration Tools**
- **Development**: Use migration tools (Flyway, Liquibase, Alembic)
- **Production**: Automated deployment with rollback capability
- **Monitoring**: Track migration success/failure rates
- **Logging**: Comprehensive logging of migration operations

## ✅ **Data Validation Standards**

### **Input Validation**
```sql
-- Check constraints for data validation
ALTER TABLE users ADD CONSTRAINT ck_users_email_format 
    CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

ALTER TABLE users ADD CONSTRAINT ck_users_name_length 
    CHECK (LENGTH(name) >= 2 AND LENGTH(name) <= 255);

ALTER TABLE transactions ADD CONSTRAINT ck_transactions_amount_positive 
    CHECK (amount > 0);
```

### **Referential Integrity**
```sql
-- Foreign key constraints with proper actions
ALTER TABLE messages ADD CONSTRAINT fk_messages_user_id_users_id
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;
```

### **Data Quality Checks**
1. **Null Handling**: Define NOT NULL constraints appropriately
2. **Default Values**: Provide sensible defaults
3. **Range Validation**: Use CHECK constraints for value ranges
4. **Format Validation**: Use regex patterns for format validation
5. **Business Rules**: Enforce business logic at database level

### **Validation Procedures**
```sql
-- Stored procedure for complex validation
CREATE OR REPLACE FUNCTION validate_user_data(
    p_email VARCHAR,
    p_name VARCHAR,
    p_age INTEGER
) RETURNS BOOLEAN AS $$
BEGIN
    -- Email format validation
    IF p_email !~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
        RETURN FALSE;
    END IF;
    
    -- Name validation
    IF LENGTH(p_name) < 2 OR LENGTH(p_name) > 255 THEN
        RETURN FALSE;
    END IF;
    
    -- Age validation
    IF p_age < 0 OR p_age > 150 THEN
        RETURN FALSE;
    END IF;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;
```

## 💾 **Backup and Recovery Procedures**

### **Backup Strategy**
1. **Full Backups**: Daily full database backups
2. **Incremental Backups**: Hourly incremental backups
3. **Transaction Logs**: Continuous transaction log backups
4. **Point-in-Time Recovery**: Support for point-in-time recovery

### **Backup Procedures**
```bash
#!/bin/bash
# Database backup script

# Set variables
DB_NAME="runeframeos"
BACKUP_DIR="/backups/database"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Full backup
pg_dump -h localhost -U postgres -d $DB_NAME \
    --format=custom \
    --compress=9 \
    --file=$BACKUP_DIR/full_backup_$DATE.sql

# Verify backup
pg_restore --list $BACKUP_DIR/full_backup_$DATE.sql > /dev/null

# Cleanup old backups (keep 30 days)
find $BACKUP_DIR -name "full_backup_*.sql" -mtime +30 -delete
```

### **Recovery Procedures**
1. **Full Recovery**: Restore from full backup
2. **Point-in-Time Recovery**: Restore to specific timestamp
3. **Partial Recovery**: Restore specific tables or schemas
4. **Test Recovery**: Regular recovery testing

### **Recovery Testing**
```bash
#!/bin/bash
# Recovery testing script

# Test database name
TEST_DB="runeframeos_test"

# Create test database
createdb $TEST_DB

# Restore backup to test database
pg_restore -h localhost -U postgres -d $TEST_DB \
    --clean --if-exists \
    /backups/database/full_backup_20250107_120000.sql

# Run validation queries
psql -h localhost -U postgres -d $TEST_DB -c "
    SELECT COUNT(*) as user_count FROM users;
    SELECT COUNT(*) as message_count FROM messages;
    SELECT COUNT(*) as transaction_count FROM transactions;
"

# Cleanup test database
dropdb $TEST_DB
```

## ⚡ **Performance Optimization**

### **Indexing Strategy**
1. **Primary Keys**: Automatically indexed
2. **Foreign Keys**: Index foreign key columns
3. **Frequently Queried Columns**: Index based on query patterns
4. **Composite Indexes**: For multi-column queries
5. **Partial Indexes**: For filtered queries

### **Query Optimization**
```sql
-- Use EXPLAIN ANALYZE for query analysis
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'user@example.com';

-- Optimize slow queries
-- Add appropriate indexes
CREATE INDEX idx_users_email ON users(email);

-- Use appropriate data types
-- Use VARCHAR instead of TEXT for short strings
-- Use INTEGER instead of BIGINT when appropriate
```

### **Partitioning Strategy**
```sql
-- Partition large tables by date
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
) PARTITION BY RANGE (created_at);

-- Create partitions
CREATE TABLE messages_2025_01 PARTITION OF messages
    FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');

CREATE TABLE messages_2025_02 PARTITION OF messages
    FOR VALUES FROM ('2025-02-01') TO ('2025-03-01');
```

## 🔒 **Security Requirements**

### **Access Control**
```sql
-- Create application user with limited privileges
CREATE USER runeframeos_app WITH PASSWORD 'secure_password';

-- Grant necessary privileges
GRANT CONNECT ON DATABASE runeframeos TO runeframeos_app;
GRANT USAGE ON SCHEMA public TO runeframeos_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO runeframeos_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO runeframeos_app;
```

### **Data Encryption**
1. **At Rest**: Use database encryption features
2. **In Transit**: Use SSL/TLS connections
3. **Sensitive Data**: Encrypt sensitive fields
4. **Key Management**: Secure key storage and rotation

### **Audit Logging**
```sql
-- Create audit log table
CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_name VARCHAR(255) NOT NULL,
    operation VARCHAR(50) NOT NULL,
    old_data JSONB,
    new_data JSONB,
    user_id UUID,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address INET
);

-- Create audit trigger
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO audit_log (table_name, operation, new_data, user_id)
        VALUES (TG_TABLE_NAME, 'INSERT', to_jsonb(NEW), current_setting('app.user_id', true)::UUID);
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_log (table_name, operation, old_data, new_data, user_id)
        VALUES (TG_TABLE_NAME, 'UPDATE', to_jsonb(OLD), to_jsonb(NEW), current_setting('app.user_id', true)::UUID);
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO audit_log (table_name, operation, old_data, user_id)
        VALUES (TG_TABLE_NAME, 'DELETE', to_jsonb(OLD), current_setting('app.user_id', true)::UUID);
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;
```

## ✅ **Quality Assurance**

### **Schema Validation**
1. **Naming Convention Compliance**: Automated checks
2. **Constraint Validation**: Verify all constraints
3. **Index Optimization**: Review index usage
4. **Performance Testing**: Load testing with realistic data

### **Data Quality Checks**
```sql
-- Data quality validation queries
-- Check for orphaned records
SELECT COUNT(*) as orphaned_messages 
FROM messages m 
LEFT JOIN users u ON m.user_id = u.id 
WHERE u.id IS NULL;

-- Check for duplicate emails
SELECT email, COUNT(*) as count 
FROM users 
GROUP BY email 
HAVING COUNT(*) > 1;

-- Check for invalid data
SELECT COUNT(*) as invalid_emails 
FROM users 
WHERE email !~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';
```

### **Testing Procedures**
1. **Unit Tests**: Test individual database functions
2. **Integration Tests**: Test database interactions
3. **Performance Tests**: Load testing with realistic data
4. **Recovery Tests**: Test backup and recovery procedures

## 🔧 **Maintenance Procedures**

### **Regular Maintenance**
1. **Statistics Updates**: Update table statistics
2. **Index Maintenance**: Rebuild fragmented indexes
3. **Vacuum Operations**: Clean up dead tuples
4. **Log Rotation**: Rotate database logs

### **Monitoring and Alerting**
```sql
-- Database health monitoring queries
-- Check for long-running queries
SELECT pid, now() - pg_stat_activity.query_start AS duration, query 
FROM pg_stat_activity 
WHERE (now() - pg_stat_activity.query_start) > interval '5 minutes';

-- Check for locks
SELECT l.pid, l.mode, l.granted, a.query 
FROM pg_locks l 
JOIN pg_stat_activity a ON l.pid = a.pid 
WHERE NOT l.granted;

-- Check database size
SELECT pg_size_pretty(pg_database_size(current_database()));
```

### **Performance Monitoring**
1. **Query Performance**: Monitor slow queries
2. **Resource Usage**: Monitor CPU, memory, disk usage
3. **Connection Pooling**: Monitor connection usage
4. **Lock Contention**: Monitor lock wait times

## 📋 **Implementation Checklist**

### **Phase 1: Foundation**
- [ ] Establish naming conventions
- [ ] Create schema design principles
- [ ] Implement basic constraints
- [ ] Set up audit trail requirements

### **Phase 2: Migration System**
- [ ] Set up migration tools
- [ ] Create migration templates
- [ ] Implement rollback procedures
- [ ] Set up migration testing

### **Phase 3: Validation and Security**
- [ ] Implement data validation
- [ ] Set up access control
- [ ] Configure audit logging
- [ ] Implement encryption

### **Phase 4: Performance and Maintenance**
- [ ] Optimize indexes
- [ ] Set up backup procedures
- [ ] Implement monitoring
- [ ] Create maintenance procedures

## 🔗 **Related Documents**

- `monitoring_and_alerting_standards.md` - Monitoring database performance
- `deployment_pipeline_standards.md` - Database deployment procedures
- `error_handling_standards.md` - Database error handling
- `testing_standards.md` - Database testing procedures


