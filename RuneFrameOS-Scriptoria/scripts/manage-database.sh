#!/bin/bash

# Scriptoria Database Management Script
# This script provides easy commands to manage the Scriptoria PostgreSQL database

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Database configuration
DB_HOST="172.18.254.35"
DB_PORT="5433"
DB_NAME="scriptoria_db"
DB_USER="scriptoria_user"
DB_PASSWORD="scriptoria_secure_pass_2024"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if database is accessible
check_connection() {
    print_status "Checking database connection..."
    
    if command -v psql &> /dev/null; then
        PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "SELECT 1;" &> /dev/null
        if [ $? -eq 0 ]; then
            print_success "Database connection successful!"
            return 0
        else
            print_error "Database connection failed!"
            return 1
        fi
    else
        print_warning "psql not found, using Docker to test connection..."
        docker exec scriptoria-postgres pg_isready -U "$DB_USER" -d "$DB_NAME" &> /dev/null
        if [ $? -eq 0 ]; then
            print_success "Database connection successful via Docker!"
            return 0
        else
            print_error "Database connection failed via Docker!"
            return 1
        fi
    fi
}

# Function to start database
start_database() {
    print_status "Starting Scriptoria database..."
    
    cd "$PROJECT_DIR"
    
    if [ -f "docker-compose.database.yml" ]; then
        docker-compose -f docker-compose.database.yml up -d
        print_success "Database started using docker-compose!"
    else
        print_warning "docker-compose.database.yml not found, starting manually..."
        docker run --name scriptoria-postgres \
            -e POSTGRES_DB="$DB_NAME" \
            -e POSTGRES_USER="$DB_USER" \
            -e POSTGRES_PASSWORD="$DB_PASSWORD" \
            -p "$DB_PORT:5432" \
            -v scriptoria_postgres_data:/var/lib/postgresql/data \
            -d postgres:15
        print_success "Database started manually!"
    fi
    
    # Wait for database to be ready
    print_status "Waiting for database to be ready..."
    sleep 10
    
    if check_connection; then
        print_success "Database is ready!"
    else
        print_error "Database failed to start properly!"
        exit 1
    fi
}

# Function to stop database
stop_database() {
    print_status "Stopping Scriptoria database..."
    
    cd "$PROJECT_DIR"
    
    if [ -f "docker-compose.database.yml" ]; then
        docker-compose -f docker-compose.database.yml down
        print_success "Database stopped using docker-compose!"
    else
        docker stop scriptoria-postgres 2>/dev/null || true
        docker rm scriptoria-postgres 2>/dev/null || true
        print_success "Database stopped manually!"
    fi
}

# Function to restart database
restart_database() {
    print_status "Restarting Scriptoria database..."
    stop_database
    sleep 2
    start_database
}

# Function to show database status
show_status() {
    print_status "Scriptoria database status:"
    echo
    
    # Check if container is running
    if docker ps | grep -q scriptoria-postgres; then
        print_success "Container is running"
        docker ps | grep scriptoria-postgres
    else
        print_error "Container is not running"
    fi
    
    echo
    
    # Check database connection
    if check_connection; then
        print_success "Database is accessible"
    else
        print_error "Database is not accessible"
    fi
    
    echo
    
    # Show database info
    if command -v psql &> /dev/null; then
        print_status "Database information:"
        PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "
            SELECT 
                datname as database,
                usename as user,
                client_addr as client,
                state,
                query_start,
                now() - query_start as duration
            FROM pg_stat_activity 
            WHERE datname = '$DB_NAME';
        " 2>/dev/null || print_warning "Could not retrieve database information"
    fi
}

# Function to backup database
backup_database() {
    local backup_file="$PROJECT_DIR/backups/scriptoria_backup_$(date +%Y%m%d_%H%M%S).sql"
    
    print_status "Creating database backup..."
    
    # Create backups directory if it doesn't exist
    mkdir -p "$PROJECT_DIR/backups"
    
    if command -v pg_dump &> /dev/null; then
        PGPASSWORD="$DB_PASSWORD" pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" > "$backup_file"
        if [ $? -eq 0 ]; then
            print_success "Backup created: $backup_file"
        else
            print_error "Backup failed!"
            exit 1
        fi
    else
        print_warning "pg_dump not found, using Docker to create backup..."
        docker exec scriptoria-postgres pg_dump -U "$DB_USER" -d "$DB_NAME" > "$backup_file"
        if [ $? -eq 0 ]; then
            print_success "Backup created: $backup_file"
        else
            print_error "Backup failed!"
            exit 1
        fi
    fi
}

# Function to restore database
restore_database() {
    local backup_file="$1"
    
    if [ -z "$backup_file" ]; then
        print_error "Please specify a backup file to restore from"
        echo "Usage: $0 restore <backup_file>"
        exit 1
    fi
    
    if [ ! -f "$backup_file" ]; then
        print_error "Backup file not found: $backup_file"
        exit 1
    fi
    
    print_warning "This will overwrite the current database. Are you sure? (y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        print_status "Restore cancelled"
        exit 0
    fi
    
    print_status "Restoring database from backup: $backup_file"
    
    if command -v psql &> /dev/null; then
        PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" < "$backup_file"
        if [ $? -eq 0 ]; then
            print_success "Database restored successfully!"
        else
            print_error "Restore failed!"
            exit 1
        fi
    else
        print_warning "psql not found, using Docker to restore..."
        docker exec -i scriptoria-postgres psql -U "$DB_USER" -d "$DB_NAME" < "$backup_file"
        if [ $? -eq 0 ]; then
            print_success "Database restored successfully!"
        else
            print_error "Restore failed!"
            exit 1
        fi
    fi
}

# Function to show logs
show_logs() {
    print_status "Showing database logs..."
    docker logs scriptoria-postgres --tail 50 -f
}

# Function to show help
show_help() {
    echo "Scriptoria Database Management Script"
    echo
    echo "Usage: $0 <command> [options]"
    echo
    echo "Commands:"
    echo "  start       Start the database"
    echo "  stop        Stop the database"
    echo "  restart     Restart the database"
    echo "  status      Show database status"
    echo "  backup      Create a database backup"
    echo "  restore     Restore database from backup"
    echo "  logs        Show database logs"
    echo "  check       Check database connection"
    echo "  help        Show this help message"
    echo
    echo "Examples:"
    echo "  $0 start"
    echo "  $0 status"
    echo "  $0 backup"
    echo "  $0 restore backups/scriptoria_backup_20241201_143022.sql"
    echo
}

# Main script logic
case "${1:-help}" in
    start)
        start_database
        ;;
    stop)
        stop_database
        ;;
    restart)
        restart_database
        ;;
    status)
        show_status
        ;;
    backup)
        backup_database
        ;;
    restore)
        restore_database "$2"
        ;;
    logs)
        show_logs
        ;;
    check)
        check_connection
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        echo
        show_help
        exit 1
        ;;
esac
