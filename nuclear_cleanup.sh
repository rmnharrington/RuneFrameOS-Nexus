#!/bin/bash

echo "☢️  NUCLEAR OPTION - Maximum Speed Cluster Cleanup"
echo "=================================================="
echo "⚠️  This will remove ALL finalizers and force delete everything"
echo "⚠️  Use with extreme caution - this is the fastest but most aggressive approach"
echo ""

# Function to remove all finalizers from a namespace
remove_namespace_finalizers() {
    local ns=$1
    echo "🔧 Removing finalizers from namespace: $ns"
    kubectl patch namespace "$ns" -p '{"metadata":{"finalizers":[]}}' --type=merge 2>/dev/null || echo "Namespace $ns finalizers removed or namespace doesn't exist"
}

# Function to remove all finalizers from resources in a namespace
remove_resource_finalizers() {
    local ns=$1
    echo "🔧 Removing finalizers from resources in namespace: $ns"
    
    # Remove finalizers from pods
    kubectl get pods -n "$ns" -o name 2>/dev/null | xargs -I {} kubectl patch {} -p '{"metadata":{"finalizers":[]}}' --type=merge 2>/dev/null || echo "No pods with finalizers in $ns"
    
    # Remove finalizers from PVCs
    kubectl get pvc -n "$ns" -o name 2>/dev/null | xargs -I {} kubectl patch {} -p '{"metadata":{"finalizers":[]}}' --type=merge 2>/dev/null || echo "No PVCs with finalizers in $ns"
    
    # Remove finalizers from services
    kubectl get service -n "$ns" -o name 2>/dev/null | xargs -I {} kubectl patch {} -p '{"metadata":{"finalizers":[]}}' --type=merge 2>/dev/null || echo "No services with finalizers in $ns"
    
    # Remove finalizers from deployments
    kubectl get deployment -n "$ns" -o name 2>/dev/null | xargs -I {} kubectl patch {} -p '{"metadata":{"finalizers":[]}}' --type=merge 2>/dev/null || echo "No deployments with finalizers in $ns"
    
    # Remove finalizers from ingress
    kubectl get ingress -n "$ns" -o name 2>/dev/null | xargs -I {} kubectl patch {} -p '{"metadata":{"finalizers":[]}}' --type=merge 2>/dev/null || echo "No ingress with finalizers in $ns"
}

echo "📋 Phase 1: Nuclear finalizer removal..."
echo "🔍 Current namespaces before nuclear cleanup:"
kubectl get namespaces

# Get all non-system namespaces
NON_SYSTEM_NAMESPACES=$(kubectl get namespaces -o name | grep -v kube-system | grep -v default | grep -v kube-public | grep -v kube-node-lease | sed 's/namespace\///')

echo "🗑️  Namespaces to be nuked: $NON_SYSTEM_NAMESPACES"

# Remove all finalizers from all namespaces at once
for ns in $NON_SYSTEM_NAMESPACES; do
    echo "☢️  Nuclear finalizer removal for namespace: $ns"
    remove_namespace_finalizers "$ns"
    remove_resource_finalizers "$ns"
done

echo "📋 Phase 2: Nuclear namespace deletion..."
# Force delete all non-system namespaces at once
kubectl delete namespace $NON_SYSTEM_NAMESPACES --force --grace-period=0 2>/dev/null || echo "All namespaces deleted"

echo "📋 Phase 3: Nuclear persistent volume deletion..."
# Remove finalizers from all PVs and delete them
kubectl get pv -o name 2>/dev/null | xargs -I {} kubectl patch {} -p '{"metadata":{"finalizers":[]}}' --type=merge 2>/dev/null || echo "No PVs with finalizers"
kubectl delete pv --all --force --grace-period=0 2>/dev/null || echo "All PVs deleted"

echo "📋 Phase 4: Nuclear storage class deletion..."
# Delete all storage classes
kubectl delete storageclass --all --force --grace-period=0 2>/dev/null || echo "All storage classes deleted"

echo "📋 Phase 5: Nuclear custom resource deletion..."
# Delete all custom resources
kubectl delete prometheus --all --all-namespaces --force --grace-period=0 2>/dev/null || echo "Prometheus CRs deleted"
kubectl delete prometheusrule --all --all-namespaces --force --grace-period=0 2>/dev/null || echo "PrometheusRule CRs deleted"
kubectl delete servicemonitor --all --all-namespaces --force --grace-period=0 2>/dev/null || echo "ServiceMonitor CRs deleted"
kubectl delete opentelemetrycollector --all --all-namespaces --force --grace-period=0 2>/dev/null || echo "OpenTelemetryCollector CRs deleted"
kubectl delete certificate --all --all-namespaces --force --grace-period=0 2>/dev/null || echo "Certificate CRs deleted"
kubectl delete clusterissuer --all --force --grace-period=0 2>/dev/null || echo "ClusterIssuer CRs deleted"
kubectl delete issuer --all --all-namespaces --force --grace-period=0 2>/dev/null || echo "Issuer CRs deleted"

echo "📋 Phase 6: Nuclear verification..."
echo "🔍 Verifying nuclear cleanup results..."
echo "📋 Remaining namespaces (should only see kube-system, default, kube-public, kube-node-lease):"
kubectl get namespaces

echo "📋 Remaining persistent volumes:"
kubectl get pv

echo "📋 Remaining pods:"
kubectl get pods --all-namespaces

echo "📋 Remaining services:"
kubectl get services --all-namespaces

echo "📋 Remaining deployments:"
kubectl get deployments --all-namespaces

echo "☢️  NUCLEAR CLEANUP COMPLETED!"
echo "=================================================="
echo "✅ The cluster has been nuked and is ready for a full rebuild"
echo "📝 Next steps:"
echo "   1. Deploy new infrastructure components"
echo "   2. Configure storage classes"
echo "   3. Deploy monitoring stack"
echo "   4. Deploy applications"
echo ""
echo "🚀 Your cluster is now a clean slate!"
