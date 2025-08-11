#!/bin/bash

# Build and Deploy Nexus to Sherlock Cluster
# This script runs on the Sherlock cluster

set -e

echo "🚀 Starting Nexus deployment on Sherlock cluster..."

# Build the Docker image
echo "📦 Building Docker image..."
docker build -t runeframeos/nexus:0.1.0 .

# Verify the image was built
echo "✅ Docker image built successfully:"
docker images | grep runeframeos/nexus

# Apply Kubernetes configurations
echo "🔧 Applying Kubernetes configurations..."

# Create namespace if it doesn't exist
kubectl create namespace nexus --dry-run=client -o yaml | kubectl apply -f -

# Apply storage and ConfigMap
kubectl apply -f k8s/storage.yaml
kubectl apply -f k8s/configmap.yaml

# Apply the deployment
kubectl apply -f k8s/deployment.yaml

# Apply the service
kubectl apply -f k8s/service.yaml

# Apply the ingress
kubectl apply -f k8s/ingress.yaml

# Apply HPA
kubectl apply -f k8s/hpa.yaml

# Apply monitoring
kubectl apply -f k8s/monitoring.yaml

echo "✅ All Kubernetes resources applied successfully!"

# Wait for deployment to be ready
echo "⏳ Waiting for deployment to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/nexus -n nexus

# Show status
echo "📊 Current status:"
kubectl get pods -n nexus
kubectl get services -n nexus
kubectl get ingress -n nexus

echo "🎉 Nexus deployment completed successfully!"
echo "🌐 Access your application at: http://paul.pedantictheory.com"
