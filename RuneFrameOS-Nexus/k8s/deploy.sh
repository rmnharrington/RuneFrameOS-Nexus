#!/bin/bash

# RuneFrameOS Nexus Deployment Script
# This script deploys the Nexus app to the Kubernetes cluster

set -e

echo "🚀 Starting RuneFrameOS Nexus deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Check if kubectl is available
if ! command -v kubectl &> /dev/null; then
    print_error "kubectl is not installed or not in PATH"
    exit 1
fi

# Check if we're connected to the cluster
if ! kubectl cluster-info &> /dev/null; then
    print_error "Cannot connect to Kubernetes cluster. Please check your kubeconfig."
    exit 1
fi

print_status "Connected to cluster: $(kubectl cluster-info | head -n1)"

# Create namespace and resource quota
print_status "Creating namespace and resource quota..."
kubectl apply -f namespace.yaml

# Wait for namespace to be ready
kubectl wait --for=condition=Active namespace/nexus --timeout=60s
print_success "Namespace 'nexus' created successfully"

# Create storage PVCs
print_status "Creating persistent volume claims..."
kubectl apply -f storage.yaml

# Wait for PVCs to be bound
print_status "Waiting for PVCs to be bound..."
kubectl wait --for=condition=Bound pvc/nexus-config-pvc -n nexus --timeout=120s
kubectl wait --for=condition=Bound pvc/nexus-data-pvc -n nexus --timeout=120s
kubectl wait --for=condition=Bound pvc/nexus-cache-pvc -n nexus --timeout=120s
kubectl wait --for=condition=Bound pvc/nexus-logs-pvc -n nexus --timeout=120s
print_success "All PVCs are bound successfully"

# Create ConfigMap
print_status "Creating ConfigMap..."
kubectl apply -f configmap.yaml

# Create deployment
print_status "Creating deployment..."
kubectl apply -f deployment.yaml

# Wait for deployment to be ready
print_status "Waiting for deployment to be ready..."
kubectl wait --for=condition=available deployment/runeframeos-nexus -n nexus --timeout=300s
print_success "Deployment is ready"

# Create services
print_status "Creating services..."
kubectl apply -f service.yaml

# Create ingress (if nginx-ingress is available)
print_status "Creating ingress..."
kubectl apply -f ingress.yaml

# Create HPA
print_status "Creating Horizontal Pod Autoscaler..."
kubectl apply -f hpa.yaml

# Create monitoring resources
print_status "Creating monitoring resources..."
kubectl apply -f monitoring.yaml

# Wait for all pods to be ready
print_status "Waiting for all pods to be ready..."
kubectl wait --for=condition=ready pod -l app=runeframeos-nexus -n nexus --timeout=300s

# Get service information
print_status "Getting service information..."
kubectl get svc -n nexus

# Get ingress information
print_status "Getting ingress information..."
kubectl get ingress -n nexus

# Get pod status
print_status "Getting pod status..."
kubectl get pods -n nexus

print_success "🎉 RuneFrameOS Nexus deployment completed successfully!"
print_status "The app should be accessible at:"
print_status "  - Internal: http://nexus.internal"
print_status "  - External: https://nexus.runeframeos.local (if DNS is configured)"
print_status "  - Direct: kubectl port-forward -n nexus svc/nexus-service 8080:80"

# Show logs for verification
print_status "Showing recent logs from the main pod..."
POD_NAME=$(kubectl get pods -n nexus -l app=runeframeos-nexus -o jsonpath='{.items[0].metadata.name}')
kubectl logs -n nexus $POD_NAME --tail=20

echo ""
print_success "Deployment complete! Check the status with: kubectl get all -n nexus"

