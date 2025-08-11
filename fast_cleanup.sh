#!/bin/bash

echo "🚀 Fast Kubernetes Cluster Cleanup - Direct Resource Deletion"
echo "============================================================="

# Function to force delete all resources in a namespace
force_delete_namespace_resources() {
    local ns=$1
    echo "🗑️  Force deleting all resources in namespace: $ns"
    
    # Delete all resources directly (faster than namespace deletion)
    kubectl delete all --all -n "$ns" --force --grace-period=0 2>/dev/null || echo "No resources in $ns"
    kubectl delete pvc --all -n "$ns" --force --grace-period=0 2>/dev/null || echo "No PVCs in $ns"
    kubectl delete ingress --all -n "$ns" --force --grace-period=0 2>/dev/null || echo "No ingress in $ns"
    kubectl delete secret --all -n "$ns" --force --grace-period=0 2>/dev/null || echo "No secrets in $ns"
    kubectl delete configmap --all -n "$ns" --force --grace-period=0 2>/dev/null || echo "No configmaps in $ns"
    
    # Now delete the namespace (should be much faster)
    kubectl delete namespace "$ns" --force --grace-period=0 2>/dev/null || echo "Namespace $ns already deleted"
}

# Function to remove finalizers from stuck resources
remove_finalizers() {
    local ns=$1
    echo "🔧 Removing finalizers from resources in namespace: $ns"
    
    # Remove finalizers from stuck resources
    kubectl patch namespace "$ns" -p '{"metadata":{"finalizers":[]}}' --type=merge 2>/dev/null || echo "No finalizers to remove from namespace $ns"
    
    # Remove finalizers from stuck pods
    kubectl get pods -n "$ns" -o name 2>/dev/null | xargs -I {} kubectl patch {} -p '{"metadata":{"finalizers":[]}}' --type=merge 2>/dev/null || echo "No pods with finalizers in $ns"
    
    # Remove finalizers from stuck PVCs
    kubectl get pvc -n "$ns" -o name 2>/dev/null | xargs -I {} kubectl patch {} -p '{"metadata":{"finalizers":[]}}' --type=merge 2>/dev/null || echo "No PVCs with finalizers in $ns"
}

echo "📋 Phase 1: Fast deletion of application namespaces..."
force_delete_namespace_resources "applications"
force_delete_namespace_resources "distilera"
force_delete_namespace_resources "hoardwell"
force_delete_namespace_resources "nexus"
force_delete_namespace_resources "runeframeos"
force_delete_namespace_resources "runeframeos-frontend"
force_delete_namespace_resources "development"
force_delete_namespace_resources "database"

echo "📋 Phase 2: Fast deletion of monitoring namespaces..."
force_delete_namespace_resources "monitoring"
force_delete_namespace_resources "observability"
force_delete_namespace_resources "opentelemetry"

echo "📋 Phase 3: Fast deletion of infrastructure namespaces..."
force_delete_namespace_resources "cert-manager"
force_delete_namespace_resources "postgresql"

echo "📋 Phase 4: Direct deletion of persistent volumes..."
kubectl delete pv --all --force --grace-period=0 2>/dev/null || echo "All PVs already deleted"

echo "📋 Phase 5: Direct deletion of storage classes..."
kubectl delete storageclass --all --force --grace-period=0 2>/dev/null || echo "All storage classes already deleted"

echo "📋 Phase 6: Direct deletion of custom resources..."
kubectl delete prometheus --all --all-namespaces --force --grace-period=0 2>/dev/null || echo "Prometheus CRs deleted"
kubectl delete prometheusrule --all --all-namespaces --force --grace-period=0 2>/dev/null || echo "PrometheusRule CRs deleted"
kubectl delete servicemonitor --all --all-namespaces --force --grace-period=0 2>/dev/null || echo "ServiceMonitor CRs deleted"
kubectl delete opentelemetrycollector --all --all-namespaces --force --grace-period=0 2>/dev/null || echo "OpenTelemetryCollector CRs deleted"
kubectl delete certificate --all --all-namespaces --force --grace-period=0 2>/dev/null || echo "Certificate CRs deleted"
kubectl delete clusterissuer --all --force --grace-period=0 2>/dev/null || echo "ClusterIssuer CRs deleted"
kubectl delete issuer --all --all-namespaces --force --grace-period=0 2>/dev/null || echo "Issuer CRs deleted"

echo "✅ Fast cleanup completed!"
echo "🔍 Verifying cleanup..."
kubectl get namespaces
kubectl get pv
kubectl get pods --all-namespaces
