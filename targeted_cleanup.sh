#!/bin/bash

echo "🎯 TARGETED CLEANUP - Stuck runeframeos-frontend Namespace"
echo "=========================================================="

NAMESPACE="runeframeos-frontend"

echo "🔍 Current status of $NAMESPACE namespace:"
kubectl get namespace $NAMESPACE
echo ""

echo "🔍 Resources in $NAMESPACE namespace:"
kubectl get all -n $NAMESPACE 2>/dev/null || echo "No resources found"
echo ""

echo "🔍 PVCs in $NAMESPACE namespace:"
kubectl get pvc -n $NAMESPACE 2>/dev/null || echo "No PVCs found"
echo ""

echo "🔍 Services in $NAMESPACE namespace:"
kubectl get service -n $NAMESPACE 2>/dev/null || echo "No services found"
echo ""

echo "🔍 Ingress in $NAMESPACE namespace:"
kubectl get ingress -n $NAMESPACE 2>/dev/null || echo "No ingress found"
echo ""

echo "☢️  PHASE 1: Aggressive finalizer removal..."
echo "🔧 Removing finalizers from namespace $NAMESPACE..."
kubectl patch namespace $NAMESPACE -p '{"metadata":{"finalizers":[]}}' --type=merge
echo ""

echo "🔧 Removing finalizers from all resources in $NAMESPACE..."
# Remove finalizers from pods
kubectl get pods -n $NAMESPACE -o name 2>/dev/null | xargs -I {} kubectl patch {} -p '{"metadata":{"finalizers":[]}}' --type=merge 2>/dev/null || echo "No pods with finalizers"

# Remove finalizers from PVCs
kubectl get pvc -n $NAMESPACE -o name 2>/dev/null | xargs -I {} kubectl patch {} -p '{"metadata":{"finalizers":[]}}' --type=merge 2>/dev/null || echo "No PVCs with finalizers"

# Remove finalizers from services
kubectl get service -n $NAMESPACE -o name 2>/dev/null | xargs -I {} kubectl patch {} -p '{"metadata":{"finalizers":[]}}' --type=merge 2>/dev/null || echo "No services with finalizers"

# Remove finalizers from deployments
kubectl get deployment -n $NAMESPACE -o name 2>/dev/null | xargs -I {} kubectl patch {} -p '{"metadata":{"finalizers":[]}}' --type=merge 2>/dev/null || echo "No deployments with finalizers"

# Remove finalizers from ingress
kubectl get ingress -n $NAMESPACE -o name 2>/dev/null | xargs -I {} kubectl patch {} -p '{"metadata":{"finalizers":[]}}' --type=merge 2>/dev/null || echo "No ingress with finalizers"

echo ""

echo "☢️  PHASE 2: Force delete all resources..."
echo "🗑️  Force deleting all resources in $NAMESPACE..."
kubectl delete all --all -n $NAMESPACE --force --grace-period=0 2>/dev/null || echo "All resources deleted"

echo "🗑️  Force deleting all PVCs in $NAMESPACE..."
kubectl delete pvc --all -n $NAMESPACE --force --grace-period=0 2>/dev/null || echo "All PVCs deleted"

echo "🗑️  Force deleting all services in $NAMESPACE..."
kubectl delete service --all -n $NAMESPACE --force --grace-period=0 2>/dev/null || echo "All services deleted"

echo "🗑️  Force deleting all ingress in $NAMESPACE..."
kubectl delete ingress --all -n $NAMESPACE --force --grace-period=0 2>/dev/null || echo "All ingress deleted"

echo ""

echo "☢️  PHASE 3: Force delete namespace..."
echo "🗑️  Force deleting namespace $NAMESPACE..."
kubectl delete namespace $NAMESPACE --force --grace-period=0

echo ""

echo "🔍 Verification - checking if $NAMESPACE is gone:"
kubectl get namespace $NAMESPACE 2>/dev/null || echo "✅ Namespace $NAMESPACE has been successfully deleted!"

echo "🎯 Targeted cleanup completed!"
