#!/bin/bash

# Long-Term Storage Deployment Script for RuneFrameOS Ecosystem
# This script addresses the front-end developer's kube config directory structure issues

set -e

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

# Function to check if kubectl is available
check_kubectl() {
    if ! command -v kubectl &> /dev/null; then
        print_error "kubectl is not installed or not in PATH"
        exit 1
    fi
    print_success "kubectl is available"
}

# Function to create storage directories on all nodes
create_storage_directories() {
    print_status "Creating storage directories on all nodes..."
    
    # Define the storage directory structure
    local nodes=("sherlock" "adler" "watson")
    
    for node in "${nodes[@]}"; do
        print_status "Setting up storage directories on node: $node"
        
        ssh "RuneFrame OS Platform-$node" << 'EOF'
            # Create main storage directory structure
            sudo mkdir -p /mnt/storage/{fast,standard,backup,logs}
            
            # Create fast storage subdirectories
            sudo mkdir -p /mnt/storage/fast/{postgresql,redis,elasticsearch}
            
            # Create standard storage subdirectories
            sudo mkdir -p /mnt/storage/standard/{applications,configs,uploads,cache,development/{builds,data}}
            
            # Create backup storage subdirectories
            sudo mkdir -p /mnt/storage/backup/{databases,applications,configs}
            
            # Create log storage subdirectories
            sudo mkdir -p /mnt/storage/logs/{application,system,audit}
            
            # Set proper permissions
            sudo chown -R 1000:1000 /mnt/storage
            sudo chmod -R 755 /mnt/storage
            
            # Create symbolic links for easier access
            sudo ln -sf /mnt/storage /storage
            
            print_success "Storage directories created on $node"
EOF
    done
    
    print_success "Storage directories created on all nodes"
}

# Function to deploy storage classes
deploy_storage_classes() {
    print_status "Deploying storage classes..."
    
    kubectl apply -f infrastructure/storage/storage-classes.yaml
    
    # Verify storage classes
    print_status "Verifying storage classes..."
    kubectl get storageclass
    
    print_success "Storage classes deployed successfully"
}

# Function to deploy persistent volumes
deploy_persistent_volumes() {
    print_status "Deploying persistent volumes..."
    
    kubectl apply -f infrastructure/storage/persistent-volumes.yaml
    
    # Wait for volumes to be available
    print_status "Waiting for persistent volumes to be available..."
    kubectl wait --for=condition=Available pv --all --timeout=300s
    
    # Verify persistent volumes
    print_status "Verifying persistent volumes..."
    kubectl get pv
    
    print_success "Persistent volumes deployed successfully"
}

# Function to create namespaces for applications
create_application_namespaces() {
    print_status "Creating application namespaces..."
    
    # Create namespaces for different applications
    kubectl create namespace postgresql --dry-run=client -o yaml | kubectl apply -f -
    kubectl create namespace applications --dry-run=client -o yaml | kubectl apply -f -
    kubectl create namespace development --dry-run=client -o yaml | kubectl apply -f -
    kubectl create namespace monitoring --dry-run=client -o yaml | kubectl apply -f -
    
    print_success "Application namespaces created"
}

# Function to create storage quotas
create_storage_quotas() {
    print_status "Creating storage quotas for namespaces..."
    
    # PostgreSQL namespace quota
    cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ResourceQuota
metadata:
  name: postgresql-storage-quota
  namespace: postgresql
spec:
  hard:
    requests.storage: 400Gi
    persistentvolumeclaims: 5
EOF

    # Applications namespace quota
    cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ResourceQuota
metadata:
  name: applications-storage-quota
  namespace: applications
spec:
  hard:
    requests.storage: 200Gi
    persistentvolumeclaims: 10
EOF

    # Development namespace quota
    cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ResourceQuota
metadata:
  name: development-storage-quota
  namespace: development
spec:
  hard:
    requests.storage: 150Gi
    persistentvolumeclaims: 5
EOF

    print_success "Storage quotas created"
}

# Function to create example PVCs for testing
create_example_pvcs() {
    print_status "Creating example PVCs for testing..."
    
    # Example PVC for application configs
    cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: app-config-pvc
  namespace: applications
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 10Gi
  storageClassName: storage-standard
EOF

    # Example PVC for application uploads
    cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: app-uploads-pvc
  namespace: applications
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 20Gi
  storageClassName: storage-standard
EOF

    print_success "Example PVCs created"
}

# Function to create storage monitoring
create_storage_monitoring() {
    print_status "Creating storage monitoring..."
    
    # Create monitoring namespace if it doesn't exist
    kubectl create namespace monitoring --dry-run=client -o yaml | kubectl apply -f -
    
    # Create ConfigMap for storage monitoring
    cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ConfigMap
metadata:
  name: storage-monitoring-config
  namespace: monitoring
data:
  storage-check.sh: |
    #!/bin/bash
    # Storage monitoring script
    echo "Checking storage usage..."
    df -h /mnt/storage
    echo "Checking persistent volumes..."
    kubectl get pv
    echo "Checking persistent volume claims..."
    kubectl get pvc --all-namespaces
EOF

    # Create CronJob for storage monitoring
    cat <<EOF | kubectl apply -f -
apiVersion: batch/v1
kind: CronJob
metadata:
  name: storage-monitor
  namespace: monitoring
spec:
  schedule: "*/30 * * * *"
  jobTemplate:
    spec:
      template:
        spec:
          serviceAccountName: storage-monitor-sa
          containers:
          - name: storage-monitor
            image: alpine:latest
            command:
            - /bin/sh
            - -c
            - |
              apk add --no-cache curl
              echo "Storage monitoring check at $(date)"
              kubectl get pv
              kubectl get pvc --all-namespaces
              df -h /mnt/storage
          restartPolicy: OnFailure
EOF

    print_success "Storage monitoring created"
}

# Function to create RBAC for storage access
create_storage_rbac() {
    print_status "Creating RBAC for storage access..."
    
    # Create ServiceAccount for storage monitoring
    cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ServiceAccount
metadata:
  name: storage-monitor-sa
  namespace: monitoring
EOF

    # Create Role for storage monitoring
    cat <<EOF | kubectl apply -f -
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: storage-monitor-role
  namespace: monitoring
rules:
- apiGroups: [""]
  resources: ["persistentvolumes", "persistentvolumeclaims"]
  verbs: ["get", "list"]
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list"]
EOF

    # Create RoleBinding
    cat <<EOF | kubectl apply -f -
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: storage-monitor-rolebinding
  namespace: monitoring
subjects:
- kind: ServiceAccount
  name: storage-monitor-sa
  namespace: monitoring
roleRef:
  kind: Role
  name: storage-monitor-role
  apiGroup: rbac.authorization.k8s.io
EOF

    print_success "RBAC for storage access created"
}

# Function to test storage functionality
test_storage_functionality() {
    print_status "Testing storage functionality..."
    
    # Test PVC creation
    kubectl get pvc -n applications
    
    # Test volume mounting
    cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: storage-test-pod
  namespace: applications
spec:
  containers:
  - name: test-container
    image: alpine:latest
    command: ["/bin/sh", "-c", "sleep 3600"]
    volumeMounts:
    - name: test-config
      mountPath: /app/config
      subPath: test-app
    - name: test-data
      mountPath: /app/data
      subPath: test-app
  volumes:
  - name: test-config
    persistentVolumeClaim:
      claimName: app-config-pvc
  - name: test-data
    persistentVolumeClaim:
      claimName: app-uploads-pvc
  securityContext:
    runAsUser: 1000
    runAsGroup: 1000
    fsGroup: 1000
EOF

    # Wait for pod to be ready
    print_status "Waiting for test pod to be ready..."
    kubectl wait --for=condition=Ready pod/storage-test-pod -n applications --timeout=300s
    
    # Test directory structure preservation
    print_status "Testing directory structure preservation..."
    kubectl exec -n applications storage-test-pod -- mkdir -p /app/config/subdir
    kubectl exec -n applications storage-test-pod -- mkdir -p /app/data/subdir
    kubectl exec -n applications storage-test-pod -- touch /app/config/subdir/test-file
    kubectl exec -n applications storage-test-pod -- touch /app/data/subdir/test-file
    
    # Verify files were created
    kubectl exec -n applications storage-test-pod -- ls -la /app/config/subdir/
    kubectl exec -n applications storage-test-pod -- ls -la /app/data/subdir/
    
    print_success "Storage functionality test completed"
}

# Function to clean up test resources
cleanup_test_resources() {
    print_status "Cleaning up test resources..."
    
    kubectl delete pod storage-test-pod -n applications --ignore-not-found=true
    kubectl delete pvc app-config-pvc app-uploads-pvc -n applications --ignore-not-found=true
    
    print_success "Test resources cleaned up"
}

# Function to display storage status
display_storage_status() {
    print_status "Displaying storage status..."
    
    echo -e "\n${BLUE}=== Storage Classes ===${NC}"
    kubectl get storageclass
    
    echo -e "\n${BLUE}=== Persistent Volumes ===${NC}"
    kubectl get pv
    
    echo -e "\n${BLUE}=== Persistent Volume Claims ===${NC}"
    kubectl get pvc --all-namespaces
    
    echo -e "\n${BLUE}=== Storage Usage ===${NC}"
    ssh RuneFrame OS Platform-sherlock "df -h /mnt/storage"
    
    echo -e "\n${BLUE}=== Storage Directory Structure ===${NC}"
    ssh RuneFrame OS Platform-sherlock "tree /mnt/storage -L 3"
}

# Main deployment function
main() {
    print_status "Starting long-term storage deployment for RuneFrameOS ecosystem..."
    
    # Check prerequisites
    check_kubectl
    
    # Deploy storage infrastructure
    create_storage_directories
    deploy_storage_classes
    deploy_persistent_volumes
    create_application_namespaces
    create_storage_quotas
    create_storage_rbac
    create_storage_monitoring
    create_example_pvcs
    
    # Test functionality
    test_storage_functionality
    
    # Display final status
    display_storage_status
    
    # Cleanup test resources
    cleanup_test_resources
    
    print_success "Long-term storage deployment completed successfully!"
    print_status "The front-end developer's directory structure preservation issues should now be resolved."
    print_status "Storage is organized with proper permissions and subPath mounting for directory structure preservation."
}

# Run main function
main "$@"

