#!/bin/bash

# Enable verbose output
set -x

echo "🧹 Starting comprehensive Kubernetes cluster cleanup..."
echo "=================================================="

# Function to safely delete namespace with verbose output
delete_namespace() {
    local ns=$1
    echo "🗑️  Deleting namespace: $ns"
    echo "📋 Current resources in namespace $ns:"
    kubectl get all -n "$ns" 2>/dev/null || echo "No resources found in namespace $ns"
    echo "📋 Current PVCs in namespace $ns:"
    kubectl get pvc -n "$ns" 2>/dev/null || echo "No PVCs found in namespace $ns"
    echo "🗑️  Force deleting namespace $ns..."
    kubectl delete namespace "$ns" --force --grace-period=0 2>/dev/null || echo "Namespace $ns already deleted or doesn't exist"
    echo "✅ Namespace $ns deletion completed"
}

# Function to safely delete persistent volume with verbose output
delete_pv() {
    local pv=$1
    echo "🗑️  Deleting persistent volume: $pv"
    echo "📋 PV details for $pv:"
    kubectl describe pv "$pv" 2>/dev/null || echo "PV $pv not found or already deleted"
    echo "🗑️  Force deleting PV $pv..."
    kubectl delete pv "$pv" --force --grace-period=0 2>/dev/null || echo "PV $pv already deleted or doesn't exist"
    echo "✅ PV $pv deletion completed"
}

# Phase 1: Remove all application namespaces
echo "📋 Phase 1: Removing application namespaces..."
echo "🔍 Current namespaces before cleanup:"
kubectl get namespaces

delete_namespace "applications"
delete_namespace "distilera"
delete_namespace "hoardwell"
delete_namespace "nexus"
delete_namespace "runeframeos"
delete_namespace "runeframeos-frontend"
delete_namespace "development"
delete_namespace "database"

# Phase 2: Remove monitoring and observability namespaces
echo "📋 Phase 2: Removing monitoring and observability namespaces..."
delete_namespace "monitoring"
delete_namespace "observability"
delete_namespace "opentelemetry"

# Phase 3: Remove infrastructure namespaces
echo "📋 Phase 3: Removing infrastructure namespaces..."
delete_namespace "cert-manager"
delete_namespace "postgresql"

# Phase 4: Remove persistent volumes
echo "📋 Phase 4: Removing persistent volumes..."
echo "🔍 Current persistent volumes before cleanup:"
kubectl get pv

delete_pv "applications-cache-pv"
delete_pv "applications-config-pv"
delete_pv "applications-uploads-pv"
delete_pv "backup-applications-pv"
delete_pv "backup-configs-pv"
delete_pv "development-builds-pv"
delete_pv "development-data-pv"
delete_pv "logs-application-pv"
delete_pv "logs-audit-pv"
delete_pv "logs-system-pv"
delete_pv "postgresql-backup-pv"
delete_pv "postgresql-primary-pv"
delete_pv "postgresql-replica-pv"

# Phase 5: Remove custom resources (CRDs)
echo "📋 Phase 5: Removing custom resources..."
echo "🔍 Current Prometheus resources before cleanup:"
kubectl get prometheus --all-namespaces 2>/dev/null || echo "No Prometheus resources found"
kubectl get prometheusrule --all-namespaces 2>/dev/null || echo "No PrometheusRule resources found"
kubectl get servicemonitor --all-namespaces 2>/dev/null || echo "No ServiceMonitor resources found"

echo "🗑️  Removing Prometheus CRDs..."
kubectl delete prometheus --all --all-namespaces --force --grace-period=0 2>/dev/null || echo "Prometheus CRs already deleted"
kubectl delete prometheusrule --all --all-namespaces --force --grace-period=0 2>/dev/null || echo "PrometheusRule CRs already deleted"
kubectl delete servicemonitor --all --all-namespaces --force --grace-period=0 2>/dev/null || echo "ServiceMonitor CRs already deleted"

echo "🔍 Current OpenTelemetry resources before cleanup:"
kubectl get opentelemetrycollector --all-namespaces 2>/dev/null || echo "No OpenTelemetryCollector resources found"

echo "🗑️  Removing OpenTelemetry CRDs..."
kubectl delete opentelemetrycollector --all --all-namespaces --force --grace-period=0 2>/dev/null || echo "OpenTelemetryCollector CRs already deleted"

echo "🔍 Current Cert-Manager resources before cleanup:"
kubectl get certificate --all-namespaces 2>/dev/null || echo "No Certificate resources found"
kubectl get clusterissuer 2>/dev/null || echo "No ClusterIssuer resources found"
kubectl get issuer --all-namespaces 2>/dev/null || echo "No Issuer resources found"

echo "🗑️  Removing Cert-Manager CRDs..."
kubectl delete certificate --all --all-namespaces --force --grace-period=0 2>/dev/null || echo "Certificate CRs already deleted"
kubectl delete clusterissuer --all --force --grace-period=0 2>/dev/null || echo "ClusterIssuer CRs already deleted"
kubectl delete issuer --all --all-namespaces --force --grace-period=0 2>/dev/null || echo "Issuer CRs already deleted"

# Phase 6: Remove storage classes
echo "📋 Phase 6: Removing storage classes..."
echo "🔍 Current storage classes before cleanup:"
kubectl get storageclass

kubectl delete storageclass postgresql-backup --force --grace-period=0 2>/dev/null || echo "StorageClass postgresql-backup already deleted"
kubectl delete storageclass postgresql-ssd --force --grace-period=0 2>/dev/null || echo "StorageClass postgresql-ssd already deleted"
kubectl delete storageclass storage-backup --force --grace-period=0 2>/dev/null || echo "StorageClass storage-backup already deleted"
kubectl delete storageclass storage-fast --force --grace-period=0 2>/dev/null || echo "StorageClass storage-fast already deleted"
kubectl delete storageclass storage-logs --force --grace-period=0 2>/dev/null || echo "StorageClass storage-logs already deleted"
kubectl delete storageclass storage-standard --force --grace-period=0 2>/dev/null || echo "StorageClass storage-standard already deleted"

# Phase 7: Clean up any remaining resources
echo "📋 Phase 7: Cleaning up remaining resources..."
echo "🔍 Current PVCs before final cleanup:"
kubectl get pvc --all-namespaces 2>/dev/null || echo "No PVCs found"

echo "🗑️  Removing any remaining PVCs..."
kubectl delete pvc --all --all-namespaces --force --grace-period=0 2>/dev/null || echo "All PVCs already deleted"

echo "🔍 Current services before final cleanup:"
kubectl get service --all-namespaces 2>/dev/null || echo "No services found"

echo "🗑️  Removing any remaining services..."
kubectl delete service --all --all-namespaces --force --grace-period=0 2>/dev/null || echo "All services already deleted"

echo "🔍 Current deployments before final cleanup:"
kubectl get deployment --all-namespaces 2>/dev/null || echo "No deployments found"

echo "🗑️  Removing any remaining deployments..."
kubectl delete deployment --all --all-namespaces --force --grace-period=0 2>/dev/null || echo "All deployments already deleted"

echo "🔍 Current pods before final cleanup:"
kubectl get pod --all-namespaces 2>/dev/null || echo "No pods found"

echo "🗑️  Removing any remaining pods..."
kubectl delete pod --all --all-namespaces --force --grace-period=0 2>/dev/null || echo "All pods already deleted"

# Phase 8: Verify cleanup
echo "📋 Phase 8: Verifying cleanup..."
echo "🔍 Checking remaining namespaces (should only see kube-system, default, kube-public, kube-node-lease):"
kubectl get namespaces

echo "🔍 Checking remaining persistent volumes:"
kubectl get pv

echo "🔍 Checking remaining pods:"
kubectl get pods --all-namespaces

echo "🔍 Checking remaining services:"
kubectl get services --all-namespaces

echo "🔍 Checking remaining deployments:"
kubectl get deployments --all-namespaces

echo "🧹 Cluster cleanup completed!"
echo "=================================================="
echo "✅ The cluster is now ready for a full rebuild"
echo "📝 Next steps:"
echo "   1. Deploy new infrastructure components"
echo "   2. Configure storage classes"
echo "   3. Deploy monitoring stack"
echo "   4. Deploy applications"

# Disable verbose output
set +x
