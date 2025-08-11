#!/bin/bash
# PostgreSQL Deployment Script for Sherlock Cluster

set -e

echo "=== PostgreSQL Deployment for RuneFrameOS ==="
echo "Target: Sherlock Cluster (RuneFrame OS Platform-cluster)"
echo "Date: $(date)"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
check_command() {
    if ! command -v $1 &> /dev/null; then
        print_error "$1 is not installed or not in PATH"
        exit 1
    fi
}

# Check prerequisites
print_status "Checking prerequisites..."
check_command kubectl
check_command ssh

# Function to execute command on sherlock
execute_on_sherlock() {
    ssh RuneFrame OS Platform-sherlock "$1"
}

# Phase 1: Storage Setup
print_status "Phase 1: Setting up storage infrastructure..."

print_status "Creating PostgreSQL storage directories on sherlock..."
execute_on_sherlock "sudo mkdir -p /mnt/postgresql/{primary,replica,backup}"
execute_on_sherlock "sudo chown -R 999:999 /mnt/postgresql/"
execute_on_sherlock "sudo chmod -R 750 /mnt/postgresql/"

print_status "Verifying storage directories..."
execute_on_sherlock "ls -la /mnt/postgresql/"

# Phase 2: Deploy Storage Classes
print_status "Phase 2: Deploying storage classes..."
kubectl apply -f infrastructure/postgresql/postgresql-storage-class.yaml

print_status "Verifying storage classes..."
kubectl get storageclass

# Phase 3: Deploy Persistent Volumes
print_status "Phase 3: Deploying persistent volumes..."
kubectl apply -f infrastructure/postgresql/postgresql-persistent-volumes.yaml

print_status "Verifying persistent volumes..."
kubectl get pv

# Phase 4: Deploy RBAC
print_status "Phase 4: Deploying RBAC configuration..."
kubectl apply -f infrastructure/postgresql/postgresql-rbac.yaml

print_status "Verifying RBAC..."
kubectl get serviceaccount -n postgresql
kubectl get role -n postgresql
kubectl get rolebinding -n postgresql

# Phase 5: Deploy Secrets
print_status "Phase 5: Deploying secrets..."
kubectl apply -f infrastructure/postgresql/postgresql-secrets.yaml

print_status "Verifying secrets..."
kubectl get secrets -n postgresql

# Phase 6: Deploy ConfigMap
print_status "Phase 6: Deploying PostgreSQL configuration..."
kubectl apply -f infrastructure/postgresql/postgresql-configmap.yaml

print_status "Verifying ConfigMap..."
kubectl get configmap -n postgresql

# Phase 7: Deploy PostgreSQL
print_status "Phase 7: Deploying PostgreSQL primary instance..."
kubectl apply -f infrastructure/postgresql/postgresql-primary.yaml

print_status "Waiting for PostgreSQL pod to be ready..."
kubectl wait --for=condition=ready pod -l app=postgresql,role=primary -n postgresql --timeout=300s

# Phase 8: Verification
print_status "Phase 8: Verifying deployment..."

print_status "Checking PostgreSQL pods..."
kubectl get pods -n postgresql

print_status "Checking PostgreSQL services..."
kubectl get services -n postgresql

print_status "Checking persistent volume claims..."
kubectl get pvc -n postgresql

print_status "Testing database connection..."
kubectl exec -n postgresql deployment/postgresql-primary -- pg_isready -U postgres || {
    print_warning "PostgreSQL connection test failed. Checking pod logs..."
    kubectl logs -n postgresql -l app=postgresql,role=primary
}

# Phase 9: Database Initialization
print_status "Phase 9: Initializing database schemas..."

print_status "Creating database initialization script..."
cat > /tmp/runeframeos-init.sql << 'EOF'
-- Database initialization script
-- runeframeos-init.sql

-- Create databases
CREATE DATABASE runeframeos_main;
CREATE DATABASE runeframeos_test;

-- Connect to main database
\c runeframeos_main

-- Create schemas
CREATE SCHEMA IF NOT EXISTS Distillara;
CREATE SCHEMA IF NOT EXISTS hoardwell;
CREATE SCHEMA IF NOT EXISTS Tapestry Engine;
CREATE SCHEMA IF NOT EXISTS mercatrix;
CREATE SCHEMA IF NOT EXISTS shared;

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";

-- Create users and roles
CREATE USER runeframeos_app WITH PASSWORD 'runeframeos_password';
CREATE USER runeframeos_readonly WITH PASSWORD 'readonly_password';
CREATE USER runeframeos_backup WITH PASSWORD 'backup_password';

-- Grant permissions
GRANT CONNECT ON DATABASE runeframeos_main TO runeframeos_app;
GRANT USAGE ON SCHEMA Distillara, hoardwell, Tapestry Engine, mercatrix, shared TO runeframeos_app;
GRANT CREATE ON SCHEMA Distillara, hoardwell, Tapestry Engine, mercatrix, shared TO runeframeos_app;

-- Create basic tables for each schema
-- Distillara tables
CREATE TABLE Distillara.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'Traveler',
    stats JSONB DEFAULT '{"INT": 10, "RES": 10, "APL": 10}',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hoardwell tables
CREATE TABLE hoardwell.inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    quantity INTEGER DEFAULT 0,
    location JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tapestry Engine tables
CREATE TABLE Tapestry Engine.worlds (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    cnc_coordinates JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mercatrix tables (reference)
CREATE TABLE mercatrix.economy (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50),
    value JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_distilera_users_email ON Distillara.users(email);
CREATE INDEX idx_distilera_users_username ON Distillara.users(username);
CREATE INDEX idx_hoardwell_inventory_name ON hoardwell.inventory(name);
CREATE INDEX idx_tapestry_worlds_name ON Tapestry Engine.worlds(name);

-- Grant table permissions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA Distillara TO runeframeos_app;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA hoardwell TO runeframeos_app;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA Tapestry Engine TO runeframeos_app;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA mercatrix TO runeframeos_app;

-- Create sequences
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA Distillara TO runeframeos_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA hoardwell TO runeframeos_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA Tapestry Engine TO runeframeos_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA mercatrix TO runeframeos_app;
EOF

print_status "Applying database initialization..."
kubectl cp /tmp/runeframeos-init.sql postgresql/postgresql-primary-0:/tmp/
kubectl exec -n postgresql postgresql-primary-0 -- psql -U postgres -f /tmp/runeframeos-init.sql

# Phase 10: Final Verification
print_status "Phase 10: Final verification..."

print_status "Testing database connectivity..."
kubectl exec -n postgresql postgresql-primary-0 -- psql -U postgres -d runeframeos_main -c "SELECT version();"

print_status "Checking database schemas..."
kubectl exec -n postgresql postgresql-primary-0 -- psql -U postgres -d runeframeos_main -c "\dn"

print_status "Checking database users..."
kubectl exec -n postgresql postgresql-primary-0 -- psql -U postgres -d runeframeos_main -c "\du"

# Cleanup
rm -f /tmp/runeframeos-init.sql

print_status "=== PostgreSQL deployment completed successfully! ==="
print_status "Database endpoint: postgresql-primary.postgresql.svc.cluster.local:5432"
print_status "Database name: runeframeos_main"
print_status "Application user: runeframeos_app"
print_status ""

print_status "Next steps:"
print_status "1. Configure application connection strings"
print_status "2. Set up monitoring and alerting"
print_status "3. Configure backup and recovery procedures"
print_status "4. Test application connectivity"
print_status ""

print_status "Useful commands:"
print_status "  kubectl get pods -n postgresql"
print_status "  kubectl logs -n postgresql postgresql-primary-0"
print_status "  kubectl exec -n postgresql postgresql-primary-0 -- psql -U postgres -d runeframeos_main"
print_status ""

