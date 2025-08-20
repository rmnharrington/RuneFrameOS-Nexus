#!/bin/bash

# RuneFrame-DevOps MarkItDown Service Deployment Script
# Deploys PDF to Markdown conversion service with NIST document processing
# Author: RuneFrameOS Infrastructure Team
# Version: 1.0.0

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() { echo -e "${BLUE}[INFO]${NC} $1"; }
print_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
print_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
print_error() { echo -e "${RED}[ERROR]${NC} $1"; }
print_header() { echo -e "${PURPLE}[HEADER]${NC} $1"; }

# Configuration variables
PROJECT_DIR="$HOME/monitoring-stack"
DOCKER_COMPOSE_FILE="$PROJECT_DIR/docker-compose.yml"

print_header "RuneFrame-DevOps MarkItDown Service Deployment"
echo "====================================================="
echo "This script will deploy the MarkItDown PDF to Markdown"
echo "conversion service with NIST document processing"
echo ""

# Check if we're in the right directory
if [[ ! -f "$DOCKER_COMPOSE_FILE" ]]; then
    print_error "Docker Compose file not found: $DOCKER_COMPOSE_FILE"
    exit 1
fi

print_success "Found Docker Compose file"

# Check if Dockerfile exists
if [[ ! -f "$PROJECT_DIR/Dockerfile.markitdown" ]]; then
    print_error "MarkItDown Dockerfile not found"
    exit 1
fi

print_success "Found MarkItDown Dockerfile"

# Check Docker availability
if ! command -v docker &> /dev/null; then
    print_error "Docker is not available"
    exit 1
fi

print_success "Docker is available"

# Navigate to project directory
cd "$PROJECT_DIR"
print_status "Working directory: $(pwd)"

# Create necessary directories if they don't exist
print_status "Creating MarkItDown directories..."
mkdir -p data/markitdown/{documents,output,cache}
mkdir -p configs/markitdown

print_success "Directories created"

# Copy configuration if it doesn't exist
if [[ ! -f "configs/markitdown/markitdown-config.yml" ]]; then
    print_status "Copying MarkItDown configuration..."
    cp markitdown-config.yml configs/markitdown/
    print_success "Configuration copied"
fi

# Build and deploy MarkItDown service
print_header "Building and Deploying MarkItDown Service..."

print_status "Building MarkItDown Docker image..."
docker compose build markitdown

print_success "MarkItDown image built"

print_status "Starting MarkItDown service..."
docker compose up -d markitdown

print_success "MarkItDown service started"

# Wait for service to be ready
print_status "Waiting for MarkItDown service to be ready..."
sleep 30

# Check service status
print_header "Checking MarkItDown Service Status..."
docker compose ps markitdown

# Test the API endpoints
print_header "Testing MarkItDown API Endpoints..."

# Test health endpoint
print_status "Testing health endpoint..."
if curl -s http://localhost:8000/health > /dev/null; then
    print_success "Health endpoint is accessible"
else
    print_warning "Health endpoint is not yet accessible, waiting..."
    sleep 30
    if curl -s http://localhost:8000/health > /dev/null; then
        print_success "Health endpoint is now accessible"
    else
        print_error "Health endpoint failed to respond"
    fi
fi

# Test status endpoint
print_status "Testing status endpoint..."
if curl -s http://localhost:8000/status > /dev/null; then
    print_success "Status endpoint is accessible"
else
    print_warning "Status endpoint is not yet accessible"
fi

# Display final information
print_header "MarkItDown Service Deployment Complete!"
echo ""
echo "🎉 MarkItDown PDF to Markdown service has been successfully deployed!"
echo ""
echo "📊 Service Information:"
echo "   API Endpoint:        http://watson.pedantictheory.com:8001"
echo "   Health Check:        http://watson.pedantictheory.com:8001/health"
echo "   Status:              http://watson.pedantictheory.com:8001/status"
echo "   Convert API:         http://watson.pedantictheory.com:8001/convert"
echo ""
echo "📁 Storage Directories:"
echo "   Documents Input:     $PROJECT_DIR/data/markitdown/documents"
echo "   Converted Output:    $PROJECT_DIR/data/markitdown/output"
echo "   Cache:               $PROJECT_DIR/data/markitdown/cache"
echo "   Configuration:       $PROJECT_DIR/configs/markitdown"
echo ""
echo "🔧 Management Commands:"
echo "   Check status:        docker compose ps markitdown"
echo "   View logs:           docker compose logs -f markitdown"
echo "   Restart service:     docker compose restart markitdown"
echo "   Stop service:        docker compose stop markitdown"
echo ""
echo "📚 Supported File Formats:"
echo "   PDF, DOCX, PPTX, XLSX, HTML, TXT, CSV, JSON, XML"
echo ""
echo "🧪 Testing the Service:"
echo "   # Test health endpoint"
echo "   curl http://localhost:8001/health"
echo ""
echo "   # Test status endpoint"
echo "   curl http://localhost:8001/status"
echo ""
echo "   # Convert a PDF (example)"
echo "   curl -X POST -F 'file=@document.pdf' http://localhost:8001/convert"
echo ""
echo "📈 Integration with Monitoring Stack:"
echo "   - Documents automatically indexed in Elasticsearch"
echo "   - Logs integrated with Filebeat"
echo "   - Metrics available in Prometheus"
echo "   - Dashboards can be created in Grafana"
echo ""
echo "🎯 Next Steps:"
echo "   1. Upload NIST documents to the documents directory"
echo "   2. Use the API to convert documents to Markdown"
echo "   3. Search converted documents in Elasticsearch"
echo "   4. Create compliance dashboards in Grafana"
echo "   5. Integrate with your RuneFrame-DevOps workflows"
echo ""

print_success "MarkItDown service deployment completed successfully!"
