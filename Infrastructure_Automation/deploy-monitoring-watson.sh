#!/bin/bash

# RuneFrameOS Monitoring Stack Deployment Script for Watson
# Deploys comprehensive monitoring solution with Docker Compose
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

print_header "RuneFrameOS Monitoring Stack Deployment on Watson"
echo "=========================================================="
echo "This script will deploy a comprehensive monitoring stack"
echo "with OpenTelemetry, Prometheus, Grafana, and Elasticsearch"
echo ""

# Check if we're in the right directory
if [[ ! -f "$DOCKER_COMPOSE_FILE" ]]; then
    print_error "Docker Compose file not found: $DOCKER_COMPOSE_FILE"
    exit 1
fi

print_success "Found Docker Compose file"

# Check Docker availability
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed or not available"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed or not available"
    exit 1
fi

print_success "Docker and Docker Compose are available"

# Check available disk space
AVAILABLE_SPACE=$(df / | awk 'NR==2 {print $4}')
if [[ $AVAILABLE_SPACE -lt 52428800 ]]; then  # 50GB in KB
    print_warning "Available disk space is less than 50GB: $((AVAILABLE_SPACE / 1024 / 1024))GB"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    print_success "Available disk space: $((AVAILABLE_SPACE / 1024 / 1024))GB"
fi

# Navigate to project directory
cd "$PROJECT_DIR"
print_status "Working directory: $(pwd)"

# Create necessary directories
print_status "Creating necessary directories..."
mkdir -p data/{elasticsearch,prometheus,grafana}
mkdir -p logs/{otel,filebeat}
mkdir -p configs/prometheus-rules

print_success "Directories created"

# Set proper permissions
print_status "Setting proper permissions..."
sudo chown -R 1000:1000 data/elasticsearch
sudo chown -R 1000:1000 data/grafana
sudo chown -R 65534:65534 data/prometheus

print_success "Permissions set"

# Deploy monitoring stack
print_header "Deploying monitoring stack..."

print_status "Starting services with Docker Compose..."
docker-compose -f "$DOCKER_COMPOSE_FILE" up -d

print_success "Services started"

# Wait for services to be ready
print_status "Waiting for services to be ready..."
sleep 30

# Check service status
print_header "Checking service status..."
docker-compose -f "$DOCKER_COMPOSE_FILE" ps

# Test endpoints
print_header "Testing monitoring endpoints..."

# Test Elasticsearch
print_status "Testing Elasticsearch..."
if curl -s http://localhost:9200/_cluster/health > /dev/null; then
    print_success "Elasticsearch is accessible"
else
    print_warning "Elasticsearch is not yet accessible, waiting..."
    sleep 30
    if curl -s http://localhost:9200/_cluster/health > /dev/null; then
        print_success "Elasticsearch is now accessible"
    else
        print_error "Elasticsearch failed to start"
    fi
fi

# Test Prometheus
print_status "Testing Prometheus..."
if curl -s http://localhost:9090/api/v1/query?query=up > /dev/null; then
    print_success "Prometheus is accessible"
else
    print_warning "Prometheus is not yet accessible, waiting..."
    sleep 30
    if curl -s http://localhost:9090/api/v1/query?query=up > /dev/null; then
        print_success "Prometheus is now accessible"
    else
        print_error "Prometheus failed to start"
    fi
fi

# Test Grafana
print_status "Testing Grafana..."
if curl -s http://localhost:3000 > /dev/null; then
    print_success "Grafana is accessible"
else
    print_warning "Grafana is not yet accessible, waiting..."
    sleep 30
    if curl -s http://localhost:3000 > /dev/null; then
        print_success "Grafana is now accessible"
    else
        print_error "Grafana failed to start"
    fi
fi

# Test OpenTelemetry Collector
print_status "Testing OpenTelemetry Collector..."
if curl -s http://localhost:9464/metrics > /dev/null; then
    print_success "OpenTelemetry Collector is accessible"
else
    print_warning "OpenTelemetry Collector is not yet accessible, waiting..."
    sleep 30
    if curl -s http://localhost:9464/metrics > /dev/null; then
        print_success "OpenTelemetry Collector is now accessible"
    else
        print_error "OpenTelemetry Collector failed to start"
    fi
fi

# Display final information
print_header "Monitoring Stack Deployment Complete!"
echo ""
echo "🎉 RuneFrameOS Monitoring Stack has been successfully deployed on Watson!"
echo ""
echo "📊 Access Information:"
echo "   Grafana Dashboard:    http://watson.pedantictheory.com:3001"
echo "   Prometheus Metrics:   http://watson.pedantictheory.com:9090"
echo "   Elasticsearch:        http://watson.pedantictheory.com:9200"
echo "   Kibana:               http://watson.pedantictheory.com:5601"
echo "   OpenTelemetry:        http://watson.pedantictheory.com:9464"
echo ""
echo "🔐 Grafana Credentials:"
echo "   Username: admin"
echo "   Password: runeframeos2025!"
echo ""
echo "📋 Management Commands:"
echo "   Check status:         docker-compose -f $DOCKER_COMPOSE_FILE ps"
echo "   View logs:            docker-compose -f $DOCKER_COMPOSE_FILE logs -f [service]"
echo "   Stop services:        docker-compose -f $DOCKER_COMPOSE_FILE down"
echo "   Restart services:     docker-compose -f $DOCKER_COMPOSE_FILE restart"
echo ""
echo "🧪 Testing Commands:"
echo "   Test syslog:          echo 'Test message' | nc -u localhost 514"
echo "   Test OTLP:            curl -X POST http://localhost:4318/v1/traces"
echo "   Test metrics:         curl http://localhost:9090/api/v1/query?query=up"
echo ""
echo "📈 Next Steps:"
echo "   1. Access Grafana at http://watson.pedantictheory.com:3001"
echo "   2. Configure dashboards for RuneFrameOS monitoring"
echo "   3. Set up alerting rules in Prometheus"
echo "   4. Configure log aggregation in Elasticsearch"
echo "   5. Integrate with existing RuneFrameOS applications"
echo ""
echo "🔧 Configuration Files:"
echo "   Docker Compose:       $DOCKER_COMPOSE_FILE"
echo "   OpenTelemetry Config: $PROJECT_DIR/configs/otel-collector-config.yaml"
echo "   Prometheus Config:    $PROJECT_DIR/configs/prometheus.yml"
echo "   Filebeat Config:      $PROJECT_DIR/configs/filebeat.yml"
echo ""

print_success "Deployment completed successfully!"
