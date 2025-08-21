#!/bin/bash

# Scriptoria Deployment Script
# This script deploys Scriptoria with its dedicated PostgreSQL database

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="scriptoria"
APP_PORT="30006"
DOMAIN="scriptoria.pedantictheory.com"
DB_CONTAINER="scriptoria-postgres"

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

# Function to check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    # Check if Docker is running
    if ! docker info &> /dev/null; then
        print_error "Docker is not running!"
        exit 1
    fi
    
    # Check if we're on sherlock
    if [[ "$(hostname)" != "sherlock" ]]; then
        print_warning "This script should be run on sherlock.pedantictheory.com"
        print_status "SSH to sherlock and run this script there"
        exit 1
    fi
    
    print_success "Prerequisites check passed!"
}

# Function to start database
start_database() {
    print_status "Starting Scriptoria PostgreSQL database..."
    
    cd "$PROJECT_DIR"
    
    # Check if database container is already running
    if docker ps | grep -q "$DB_CONTAINER"; then
        print_status "Database container is already running"
        return 0
    fi
    
    # Check if container exists but is stopped
    if docker ps -a | grep -q "$DB_CONTAINER"; then
        print_status "Starting existing database container..."
        docker start "$DB_CONTAINER"
    else
        print_status "Creating new database container..."
        docker run --name "$DB_CONTAINER" \
            -e POSTGRES_DB=scriptoria_db \
            -e POSTGRES_USER=scriptoria_user \
            -e POSTGRES_PASSWORD=scriptoria_secure_pass_2024 \
            -p 5433:5432 \
            -v scriptoria_postgres_data:/var/lib/postgresql/data \
            -d postgres:15
    fi
    
    # Wait for database to be ready
    print_status "Waiting for database to be ready..."
    local attempts=0
    while [ $attempts -lt 30 ]; do
        if docker exec "$DB_CONTAINER" pg_isready -U scriptoria_user -d scriptoria_db &> /dev/null; then
            print_success "Database is ready!"
            return 0
        fi
        attempts=$((attempts + 1))
        sleep 2
    done
    
    print_error "Database failed to start within 60 seconds!"
    exit 1
}

# Function to setup database schema
setup_database() {
    print_status "Setting up database schema..."
    
    cd "$PROJECT_DIR"
    
    # Generate Prisma client
    print_status "Generating Prisma client..."
    npm run db:generate
    
    # Push schema to database
    print_status "Pushing database schema..."
    npm run db:push
    
    # Seed database with initial data
    print_status "Seeding database with initial data..."
    npm run db:seed
    
    print_success "Database setup completed!"
}

# Function to build application
build_application() {
    print_status "Building Scriptoria application..."
    
    cd "$PROJECT_DIR"
    
    # Install dependencies
    print_status "Installing dependencies..."
    npm install
    
    # Build application
    print_status "Building application..."
    npm run build
    
    print_success "Application build completed!"
}

# Function to deploy to Kubernetes
deploy_to_kubernetes() {
    print_status "Deploying Scriptoria to Kubernetes..."
    
    cd "$PROJECT_DIR"
    
    # Check if namespace exists
    if ! sudo k3s kubectl get namespace runeframeos &> /dev/null; then
        print_status "Creating runeframeos namespace..."
        sudo k3s kubectl create namespace runeframeos
    fi
    
    # Apply deployment
    print_status "Applying Kubernetes deployment..."
    sudo k3s kubectl apply -f scriptoria-deployment.yaml
    
    # Wait for deployment to be ready
    print_status "Waiting for deployment to be ready..."
    sudo k3s kubectl wait --for=condition=available --timeout=300s deployment/scriptoria -n runeframeos
    
    print_success "Kubernetes deployment completed!"
}

# Function to verify deployment
verify_deployment() {
    print_status "Verifying deployment..."
    
    # Check pod status
    print_status "Pod status:"
    sudo k3s kubectl get pods -n runeframeos -l app=scriptoria
    
    # Check service status
    print_status "Service status:"
    sudo k3s kubectl get services -n runeframeos -l app=scriptoria
    
    # Check if application is accessible
    print_status "Testing application accessibility..."
    if curl -s "http://172.18.254.35:$APP_PORT" &> /dev/null; then
        print_success "Application is accessible at http://172.18.254.35:$APP_PORT"
    else
        print_warning "Application may not be accessible yet, please wait a moment"
    fi
    
    print_success "Deployment verification completed!"
}

# Function to show deployment status
show_status() {
    print_status "Scriptoria deployment status:"
    echo
    
    # Database status
    print_status "Database status:"
    if docker ps | grep -q "$DB_CONTAINER"; then
        print_success "Database container is running"
        docker ps | grep "$DB_CONTAINER"
    else
        print_error "Database container is not running"
    fi
    
    echo
    
    # Kubernetes status
    print_status "Kubernetes deployment status:"
    sudo k3s kubectl get pods,services -n runeframeos -l app=scriptoria
    
    echo
    
    # Application accessibility
    print_status "Application accessibility:"
    if curl -s "http://172.18.254.35:$APP_PORT" &> /dev/null; then
        print_success "Application is accessible"
    else
        print_error "Application is not accessible"
    fi
}

# Function to cleanup
cleanup() {
    print_status "Cleaning up deployment..."
    
    # Remove Kubernetes resources
    print_status "Removing Kubernetes resources..."
    sudo k3s kubectl delete -f scriptoria-deployment.yaml --ignore-not-found=true
    
    # Stop database
    print_status "Stopping database..."
    docker stop "$DB_CONTAINER" 2>/dev/null || true
    docker rm "$DB_CONTAINER" 2>/dev/null || true
    
    print_success "Cleanup completed!"
}

# Function to show help
show_help() {
    echo "Scriptoria Deployment Script"
    echo
    echo "Usage: $0 <command>"
    echo
    echo "Commands:"
    echo "  deploy      Full deployment (database + app)"
    echo "  database    Setup database only"
    echo "  app         Deploy application only"
    echo "  status      Show deployment status"
    echo "  cleanup     Remove all resources"
    echo "  help        Show this help message"
    echo
    echo "Examples:"
    echo "  $0 deploy"
    echo "  $0 status"
    echo "  $0 cleanup"
    echo
}

# Main deployment function
deploy_full() {
    print_status "Starting full Scriptoria deployment..."
    
    check_prerequisites
    start_database
    setup_database
    build_application
    deploy_to_kubernetes
    verify_deployment
    
    print_success "🎉 Scriptoria deployment completed successfully!"
    echo
    print_status "Your application is available at:"
    echo "  - Local: http://172.18.254.35:$APP_PORT"
    echo "  - Domain: http://$DOMAIN"
    echo
    print_status "Database is running on port 5433"
    echo
    print_status "Use '$0 status' to check deployment status"
    print_status "Use '$0 cleanup' to remove all resources"
}

# Main script logic
case "${1:-help}" in
    deploy)
        deploy_full
        ;;
    database)
        check_prerequisites
        start_database
        setup_database
        ;;
    app)
        check_prerequisites
        build_application
        deploy_to_kubernetes
        verify_deployment
        ;;
    status)
        show_status
        ;;
    cleanup)
        cleanup
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
