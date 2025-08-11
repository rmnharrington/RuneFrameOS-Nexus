#!/bin/bash

# RuneFrameOS Deployment Script for Sherlock Cluster
# This script deploys RuneFrameOS applications to the jonar-sherlock Kubernetes cluster
# Run this script directly on the Sherlock cluster via SSH: ssh jonar@sherlock.pedantictheory.com

set -e  # Exit on any error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

log_success() {
    echo -e "${GREEN}✓${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

log_error() {
    echo -e "${RED}✗${NC} $1"
}

# Configuration
CLUSTER_NAME="sherlock"
NAMESPACE_PREFIX="runeframeos"
TEMP_DIR="/home/jonar/temp_deploy"

# Applications to deploy with their domain and IP mappings
declare -A APPLICATIONS=(
    ["nexus"]="nexus.pedantictheory.com:172.18.254.78"
    ["core"]="core.pedantictheory.com:172.18.254.71"
    ["hoardwell"]="hoardwell.pedantictheory.com:172.18.254.75"
    ["distillara"]="distillara.pedantictheory.com:172.18.254.73"
    ["feastwell"]="feastwell.pedantictheory.com:172.18.254.74"
    ["brokeunicorntavern"]="brokeunicorntavern.pedantictheory.com:172.18.254.70"
)

# Function to check prerequisites
check_prerequisites() {
    log "Checking prerequisites..."
    
    # Check if kubectl is available
    if ! command -v kubectl &> /dev/null; then
        log_error "kubectl is not installed or not in PATH"
        exit 1
    fi
    
    # Check if we can access the cluster
    if ! kubectl cluster-info &> /dev/null; then
        log_error "Cannot access Kubernetes cluster"
        exit 1
    fi
    
    # Check cluster nodes
    NODE_COUNT=$(kubectl get nodes --no-headers 2>/dev/null | wc -l)
    if [ "$NODE_COUNT" -eq 0 ]; then
        log_error "No nodes found in cluster"
        exit 1
    fi
    
    log_success "Cluster accessible with $NODE_COUNT node(s)"
    
    # Check available storage classes
    log "Available storage classes:"
    kubectl get storageclass --no-headers | awk '{print "  - " $1 " (" $2 ")"}'
    
    # Check available namespaces
    log "Available namespaces:"
    kubectl get namespaces --no-headers | awk '{print "  - " $1}'
}

# Function to create namespace if it doesn't exist
create_namespace() {
    local namespace=$1
    if ! kubectl get namespace "$namespace" &> /dev/null; then
        log "Creating namespace: $namespace"
        kubectl create namespace "$namespace"
        log_success "Namespace $namespace created"
    else
        log "Namespace $namespace already exists"
    fi
}

# Function to deploy an application
deploy_application() {
    local app_name=$1
    local domain_ip=$2
    local domain=$(echo "$domain_ip" | cut -d: -f1)
    local ip=$(echo "$domain_ip" | cut -d: -f2)
    local namespace="${NAMESPACE_PREFIX}-${app_name}"
    
    log "=== Deploying $app_name ==="
    log "Domain: $domain"
    log "IP: $ip"
    log "Namespace: $namespace"
    
    # Create namespace
    create_namespace "$namespace"
    
    # Check if k8s directory exists locally
    local k8s_dir="./k8s"
    if [ ! -d "$k8s_dir" ]; then
        log_warning "No k8s directory found for $app_name, skipping..."
        return 1
    fi
    
    # Create temporary directory
    local temp_app_dir="$TEMP_DIR/$app_name"
    mkdir -p "$temp_app_dir"
    
    # Copy k8s files to temp directory
    log "Copying Kubernetes configuration files..."
    cp -r "$k8s_dir"/* "$temp_app_dir/"
    
    # Update configuration files with correct domain and IP
    log "Updating configuration with domain: $domain and IP: $ip"
    find "$temp_app_dir" -name "*.yaml" -exec sed -i "s/placeholder\.pedantictheory\.com/$domain/g" {} \;
    find "$temp_app_dir" -name "*.yaml" -exec sed -i "s/PLACEHOLDER_IP/$ip/g" {} \;
    
    # Apply namespace first if it exists
    if [ -f "$temp_app_dir/namespace.yaml" ]; then
        log "Applying namespace configuration..."
        kubectl apply -f "$temp_app_dir/namespace.yaml"
    fi
    
    # Apply storage configuration if it exists
    if [ -f "$temp_app_dir/storage.yaml" ]; then
        log "Applying storage configuration..."
        kubectl apply -f "$temp_app_dir/storage.yaml"
    fi
    
    # Apply configmap if it exists
    if [ -f "$temp_app_dir/configmap.yaml" ]; then
        log "Applying configmap configuration..."
        kubectl apply -f "$temp_app_dir/configmap.yaml"
    fi
    
    # Apply deployment
    if [ -f "$temp_app_dir/deployment.yaml" ]; then
        log "Applying deployment configuration..."
        kubectl apply -f "$temp_app_dir/deployment.yaml"
    fi
    
    # Apply service
    if [ -f "$temp_app_dir/service.yaml" ]; then
        log "Applying service configuration..."
        kubectl apply -f "$temp_app_dir/service.yaml"
    fi
    
    # Apply ingress
    if [ -f "$temp_app_dir/ingress.yaml" ]; then
        log "Applying ingress configuration..."
        kubectl apply -f "$temp_app_dir/ingress.yaml"
    fi
    
    # Apply HPA if it exists
    if [ -f "$temp_app_dir/hpa.yaml" ]; then
        log "Applying HPA configuration..."
        kubectl apply -f "$temp_app_dir/hpa.yaml"
    fi
    
    # Apply monitoring if it exists
    if [ -f "$temp_app_dir/monitoring.yaml" ]; then
        log "Applying monitoring configuration..."
        kubectl apply -f "$temp_app_dir/monitoring.yaml"
    fi
    
    # Wait for deployment to be ready
    log "Waiting for deployment to be ready..."
    if kubectl get deployment -n "$namespace" &> /dev/null; then
        kubectl rollout status deployment -n "$namespace" --timeout=300s
        log_success "Deployment ready"
    fi
    
    # Check pod status
    log "Pod status:"
    kubectl get pods -n "$namespace" --no-headers | while read -r line; do
        pod_name=$(echo "$line" | awk '{print $1}')
        status=$(echo "$line" | awk '{print $3}')
        if [ "$status" = "Running" ]; then
            log_success "Pod $pod_name: $status"
        else
            log_warning "Pod $pod_name: $status"
        fi
    done
    
    # Clean up temp directory
    rm -rf "$temp_app_dir"
    
    log_success "Deployment of $app_name completed"
}

# Function to check deployment status
check_deployment_status() {
    log "=== Checking deployment status ==="
    
    for app_name in "${!APPLICATIONS[@]}"; do
        local namespace="${NAMESPACE_PREFIX}-${app_name}"
        log "Checking $app_name in namespace $namespace..."
        
        if kubectl get namespace "$namespace" &> /dev/null; then
            local pod_count=$(kubectl get pods -n "$namespace" --no-headers 2>/dev/null | wc -l)
            local running_pods=$(kubectl get pods -n "$namespace" --no-headers 2>/dev/null | grep -c "Running" || echo "0")
            
            if [ "$pod_count" -gt 0 ]; then
                log_success "$app_name: $running_pods/$pod_count pods running"
            else
                log_warning "$app_name: No pods found"
            fi
        else
            log_warning "$app_name: Namespace not found"
        fi
    done
}

# Function to show cluster overview
show_cluster_overview() {
    log "=== Cluster Overview ==="
    
    # Show all namespaces
    log "All namespaces:"
    kubectl get namespaces --no-headers | grep "$NAMESPACE_PREFIX" | awk '{print "  - " $1}'
    
    # Show all pods across namespaces
    log "All pods across RuneFrameOS namespaces:"
    for namespace in $(kubectl get namespaces --no-headers | grep "$NAMESPACE_PREFIX" | awk '{print $1}'); do
        echo "  Namespace: $namespace"
        kubectl get pods -n "$namespace" --no-headers 2>/dev/null | while read -r line; do
            echo "    $line"
        done || echo "    No pods found"
    done
    
    # Show services
    log "Services:"
    for namespace in $(kubectl get namespaces --no-headers | grep "$NAMESPACE_PREFIX" | awk '{print $1}'); do
        kubectl get services -n "$namespace" --no-headers 2>/dev/null | while read -r line; do
            echo "  $namespace: $line"
        done
    done
    
    # Show ingress
    log "Ingress resources:"
    for namespace in $(kubectl get namespaces --no-headers | grep "$NAMESPACE_PREFIX" | awk '{print $1}'); do
        kubectl get ingress -n "$namespace" --no-headers 2>/dev/null | while read -r line; do
            echo "  $namespace: $line"
        done
    done
}

# Main execution
main() {
    log "Starting RuneFrameOS deployment to $CLUSTER_NAME cluster"
    
    # Check prerequisites
    check_prerequisites
    
    # Create temp directory
    mkdir -p "$TEMP_DIR"
    
    # Deploy each application
    for app_name in "${!APPLICATIONS[@]}"; do
        deploy_application "$app_name" "${APPLICATIONS[$app_name]}"
        echo  # Add blank line for readability
    done
    
    # Check final status
    check_deployment_status
    
    # Show cluster overview
    show_cluster_overview
    
    # Clean up temp directory
    rm -rf "$TEMP_DIR"
    
    log_success "All deployments completed successfully!"
    log "Next steps:"
    log "1. Verify DNS resolution for the deployed domains"
    log "2. Check application health endpoints"
    log "3. Monitor logs for any deployment issues"
    log "4. Configure any additional services or integrations as needed"
}

# Handle script arguments
case "${1:-}" in
    --status)
        check_deployment_status
        show_cluster_overview
        ;;
    --help|-h)
        echo "Usage: $0 [OPTIONS]"
        echo ""
        echo "Options:"
        echo "  --status    Show deployment status only"
        echo "  --help, -h  Show this help message"
        echo ""
        echo "Examples:"
        echo "  $0                    # Deploy all applications"
        echo "  $0 --status           # Show status only"
        echo ""
        echo "This script deploys RuneFrameOS applications to the Sherlock cluster."
        exit 0
        ;;
    "")
        # No arguments, run full deployment
        main
        ;;
    *)
        log_error "Unknown option: $1"
        echo "Use --help for usage information"
        exit 1
        ;;
esac


