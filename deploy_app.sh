#!/bin/bash

# RuneFrameOS Application Deployment Script
# This script automates the deployment of new applications using the proven pattern
# Usage: ./deploy_app.sh [APP_NAME] [APP_DIRECTORY] [NODEPORT] [DOMAIN]

set -e  # Exit on any error

# Configuration
APP_NAME=${1:-"app-name"}
APP_DIRECTORY=${2:-"RuneFrameOS-$APP_NAME"}
NODEPORT=${3:-"30000"}
DOMAIN=${4:-"$APP_NAME.pedantictheory.com"}
CLUSTER_MASTER="sherlock.pedantictheory.com"
WORKER_NODES=("adler.pedantictheory.com" "watson.pedantictheory.com")
NAMESPACE="runeframeos"

echo "🚀 RuneFrameOS Application Deployment Script"
echo "============================================="
echo "App Name: $APP_NAME"
echo "Directory: $APP_DIRECTORY"
echo "NodePort: $NODEPORT"
echo "Domain: $DOMAIN"
echo ""

# Color codes for output
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

# Function to check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    if [ ! -d "$APP_DIRECTORY" ]; then
        print_error "App directory $APP_DIRECTORY not found!"
        exit 1
    fi
    
    if [ ! -f "$APP_DIRECTORY/package.json" ]; then
        print_error "package.json not found in $APP_DIRECTORY!"
        exit 1
    fi
    
    if [ ! -f "$APP_DIRECTORY/Dockerfile.clean" ]; then
        print_error "Dockerfile.clean not found in $APP_DIRECTORY!"
        exit 1
    fi
    
    if [ ! -f "$APP_DIRECTORY/src/components/core/HeroBanner.tsx" ]; then
        print_error "HeroBanner.tsx component not found in $APP_DIRECTORY!"
        exit 1
    fi
    
    # CRITICAL: Check for correct hero banner image (NO _wText suffix)
    if [ -f "$APP_DIRECTORY/public/${APP_NAME}_HeroBanner_wText.png" ]; then
        print_error "CRITICAL ERROR: Found ${APP_NAME}_HeroBanner_wText.png in $APP_DIRECTORY/public/!"
        print_error "NEVER use _HeroBanner_wText.png files - these have text overlays and are NOT for hero banners"
        print_error "Use ${APP_NAME}_HeroBanner.png (without _wText suffix) instead"
        exit 1
    fi
    
    if [ ! -f "$APP_DIRECTORY/public/${APP_NAME}_HeroBanner.png" ]; then
        print_error "Hero banner image ${APP_NAME}_HeroBanner.png not found in $APP_DIRECTORY/public/!"
        print_error "CRITICAL: Must use ${APP_NAME}_HeroBanner.png (NO _wText suffix) for hero banner background"
        exit 1
    fi
    
    # Verify it's the correct image (not the _wText version)
    if [ -f "$APP_DIRECTORY/public/${APP_NAME}_HeroBanner_wText.png" ]; then
        print_error "CRITICAL: Found ${APP_NAME}_HeroBanner_wText.png - this is WRONG!"
        print_error "Hero banners need clean background images without text overlays"
        exit 1
    fi
    
    print_success "Prerequisites check passed"
}

# Function to copy files to server
copy_to_server() {
    print_status "Copying application files to server..."
    
    scp -r "$APP_DIRECTORY" "wee@$CLUSTER_MASTER:/home/wee/"
    
    if [ $? -eq 0 ]; then
        print_success "Files copied to server successfully"
    else
        print_error "Failed to copy files to server"
        exit 1
    fi
}

# Function to install dependencies on server
install_dependencies() {
    print_status "Installing dependencies on server..."
    
    ssh "wee@$CLUSTER_MASTER" "cd $APP_DIRECTORY && npm install"
    
    if [ $? -eq 0 ]; then
        print_success "Dependencies installed successfully"
    else
        print_error "Failed to install dependencies"
        exit 1
    fi
}

# Function to build Docker image
build_docker_image() {
    print_status "Building Docker image..."
    
    ssh "wee@$CLUSTER_MASTER" "cd $APP_DIRECTORY && sudo docker build -f Dockerfile.clean -t $APP_NAME:latest ."
    
    if [ $? -eq 0 ]; then
        print_success "Docker image built successfully"
    else
        print_error "Failed to build Docker image"
        exit 1
    fi
}

# Function to load image to containerd on all nodes
load_images_to_containerd() {
    print_status "Loading images to containerd on all nodes..."
    
    # Load on master node
    ssh "wee@$CLUSTER_MASTER" "sudo docker save $APP_NAME:latest | sudo ctr -n=k8s.io images import -"
    print_success "Image loaded on master node ($CLUSTER_MASTER)"
    
    # Load on worker nodes
    for node in "${WORKER_NODES[@]}"; do
        print_status "Loading image on worker node: $node"
        ssh "wee@$CLUSTER_MASTER" "sudo docker save $APP_NAME:latest" | ssh "wee@$node" "sudo ctr -n=k8s.io images import -"
        print_success "Image loaded on worker node ($node)"
    done
}

# Function to create Kubernetes manifests
create_kubernetes_manifests() {
    print_status "Creating Kubernetes manifests..."
    
    # Create deployment YAML
    cat > "$APP_DIRECTORY/$APP_NAME-deployment.yaml" << EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: $APP_NAME
  namespace: $NAMESPACE
  labels:
    app: $APP_NAME
spec:
  replicas: 1
  selector:
    matchLabels:
      app: $APP_NAME
  template:
    metadata:
      labels:
        app: $APP_NAME
    spec:
      tolerations:
      - key: "node-role.kubernetes.io/control-plane"
        operator: "Exists"
        effect: "NoSchedule"
      containers:
      - name: $APP_NAME
        image: $APP_NAME:latest
        imagePullPolicy: Never
        ports:
        - containerPort: 3008
        env:
        - name: NODE_ENV
          value: "production"
        - name: PORT
          value: "3008"
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        # Health checks disabled for initial testing
        # livenessProbe: [ADD_LATER]
        # readinessProbe: [ADD_LATER]
---
apiVersion: v1
kind: Service
metadata:
  name: $APP_NAME
  namespace: $NAMESPACE
  labels:
    app: $APP_NAME
spec:
  selector:
    app: $APP_NAME
  ports:
  - port: 3008
    targetPort: 3008
    nodePort: $NODEPORT
    protocol: TCP
  type: NodePort
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: $APP_NAME-ingress
  namespace: $NAMESPACE
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    nginx.ingress.kubernetes.io/ssl-redirect: "false"
spec:
  ingressClassName: nginx
  rules:
  - host: $DOMAIN
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: $APP_NAME
            port:
              number: 3008
EOF
    
    print_success "Kubernetes manifests created"
}

# Function to deploy to Kubernetes
deploy_to_kubernetes() {
    print_status "Deploying to Kubernetes cluster..."
    
    # Copy updated manifests to server
    scp "$APP_DIRECTORY/$APP_NAME-deployment.yaml" "wee@$CLUSTER_MASTER:/home/wee/$APP_DIRECTORY/"
    
    # Apply manifests
    ssh "wee@$CLUSTER_MASTER" "sudo kubectl apply -f $APP_DIRECTORY/$APP_NAME-deployment.yaml --kubeconfig /etc/kubernetes/admin.conf"
    
    if [ $? -eq 0 ]; then
        print_success "Kubernetes manifests applied successfully"
    else
        print_error "Failed to apply Kubernetes manifests"
        exit 1
    fi
}

# Function to wait for deployment
wait_for_deployment() {
    print_status "Waiting for deployment to be ready..."
    
    local max_attempts=30
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        print_status "Checking deployment status (attempt $attempt/$max_attempts)..."
        
        local pod_status=$(ssh "wee@$CLUSTER_MASTER" "sudo kubectl get pods -n $NAMESPACE --kubeconfig /etc/kubernetes/admin.conf" | grep "$APP_NAME" | awk '{print $2}')
        
        if [ "$pod_status" = "1/1" ]; then
            print_success "Deployment is ready! Pod status: $pod_status"
            return 0
        elif [ "$pod_status" = "0/1" ]; then
            print_status "Pod is running but not ready yet. Status: $pod_status"
        else
            print_warning "Pod status: $pod_status"
        fi
        
        sleep 10
        ((attempt++))
    done
    
    print_error "Deployment did not become ready within expected time"
    return 1
}

# Function to verify deployment
verify_deployment() {
    print_status "Verifying deployment..."
    
    # Get pod name
    local pod_name=$(ssh "wee@$CLUSTER_MASTER" "sudo kubectl get pods -n $NAMESPACE --kubeconfig /etc/kubernetes/admin.conf" | grep "$APP_NAME" | awk '{print $1}')
    
    if [ -z "$pod_name" ]; then
        print_error "Could not find pod name"
        return 1
    fi
    
    print_status "Pod name: $pod_name"
    
    # Check pod logs
    print_status "Checking pod logs..."
    ssh "wee@$CLUSTER_MASTER" "sudo kubectl logs -n $NAMESPACE $pod_name --kubeconfig /etc/kubernetes/admin.conf" | tail -10
    
    # Check service status
    print_status "Checking service status..."
    ssh "wee@$CLUSTER_MASTER" "sudo kubectl get service $APP_NAME -n $NAMESPACE --kubeconfig /etc/kubernetes/admin.conf"
    
    print_success "Deployment verification completed"
}

# Function to test access
test_access() {
    print_status "Testing application access..."
    
    # Test on master node
    print_status "Testing on master node..."
    ssh "wee@$CLUSTER_MASTER" "curl -s http://localhost:3008 | head -5"
    
    # Test on worker nodes
    for node in "${WORKER_NODES[@]}"; do
        print_status "Testing on worker node: $node"
        ssh "wee@$node" "curl -s http://localhost:$NODEPORT | head -5"
    done
    
    print_success "Access testing completed"
}

# Main deployment function
main() {
    echo "Starting deployment process for $APP_NAME..."
    echo ""
    
    check_prerequisites
    copy_to_server
    install_dependencies
    build_docker_image
    load_images_to_containerd
    create_kubernetes_manifests
    deploy_to_kubernetes
    wait_for_deployment
    verify_deployment
    test_access
    
                echo ""
            print_success "🎉 Deployment completed successfully!"
            echo ""
            echo "Application Details:"
            echo "  Name: $APP_NAME"
            echo "  Access URL: http://[NODE_IP]:$NODEPORT"
            echo "  Domain: $DOMAIN"
            echo "  Namespace: $NAMESPACE"
            echo ""
            echo "Next steps:"
            echo "  1. Verify the GUI matches PersonaVault exactly"
            echo "  2. Verify the hero banner displays correctly with smooth fading gradient"
            echo "  3. Test all functionality"
            echo "  4. Configure health checks if needed"
            echo "  5. Set up domain access via ingress"
}

# Check if script is run with correct parameters
if [ $# -lt 4 ]; then
    echo "Usage: $0 [APP_NAME] [APP_DIRECTORY] [NODEPORT] [DOMAIN]"
    echo ""
    echo "Example:"
    echo "  $0 distillara RuneFrameOS-Distillara 30003 distillara.pedantictheory.com"
    echo ""
    echo "Available NodePorts:"
    echo "  30001 - feastwell"
    echo "  30002 - reserved"
    echo "  30003 - distillara"
    echo "  30004 - hoardwell"
    echo "  30005 - brokeunicorn_tavern (deployed)"
    echo "  30006 - reserved"
    echo "  30007 - reserved"
    echo "  30008 - mercatrix (deployed)"
    echo "  30009-30020 - available"
    exit 1
fi

# Run main function
main "$@"
