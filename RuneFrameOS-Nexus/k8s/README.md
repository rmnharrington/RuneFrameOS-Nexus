# RuneFrameOS Nexus - Kubernetes Deployment

This directory contains all the Kubernetes manifests needed to deploy RuneFrameOS Nexus to your internal network server (sherlock cluster).

## 🚀 Quick Start

### Prerequisites

- Access to the sherlock cluster via `kubectl`
- SSH access to `sherlock.pedantictheory.com` as user `jonar`
- The new RuneFrameOS storage infrastructure must be deployed

### Deploy Everything at Once

```bash
# Make the deployment script executable
chmod +x deploy.sh

# Run the deployment
./deploy.sh
```

### Deploy Manually (Step by Step)

```bash
# 1. Create namespace and resource quota
kubectl apply -f namespace.yaml

# 2. Create storage PVCs
kubectl apply -f storage.yaml

# 3. Create ConfigMap
kubectl apply -f configmap.yaml

# 4. Create deployment
kubectl apply -f deployment.yaml

# 5. Create services
kubectl apply -f service.yaml

# 6. Create ingress
kubectl apply -f ingress.yaml

# 7. Create HPA
kubectl apply -f hpa.yaml

# 8. Create monitoring
kubectl apply -f monitoring.yaml
```

## 📁 File Structure

```
k8s/
├── namespace.yaml          # Namespace and resource quota
├── storage.yaml            # Persistent Volume Claims
├── configmap.yaml          # Application configuration
├── deployment.yaml         # Main application deployment
├── service.yaml            # Service definitions
├── ingress.yaml            # Ingress configuration
├── hpa.yaml               # Horizontal Pod Autoscaler
├── monitoring.yaml         # Monitoring and observability
├── deploy.sh              # Automated deployment script
└── README.md              # This file
```

## 🏗️ Architecture Overview

### Storage Integration
- **Config Storage**: 10Gi for application configuration
- **Data Storage**: 20Gi for persistent data
- **Cache Storage**: 10Gi for caching
- **Logs Storage**: 10Gi for application logs
- **Uses subPath mounting** for directory structure preservation

### High Availability
- **2 replicas** minimum for redundancy
- **Rolling update strategy** with zero downtime
- **Pod Disruption Budget** ensures availability during maintenance
- **Horizontal Pod Autoscaler** scales from 2-10 pods based on CPU/memory

### Networking
- **Internal access**: `nexus.internal` (no SSL)
- **External access**: `nexus.runeframeos.local` (with SSL)
- **Service mesh ready** for future integration

### Monitoring
- **Prometheus ServiceMonitor** for metrics collection
- **Grafana dashboard** configuration
- **Health checks** with liveness and readiness probes

## 🔧 Configuration

### Environment Variables
The app is configured via ConfigMap with these key settings:

- `NEXT_PUBLIC_APP_NAME`: "RuneFrameOS Nexus"
- `APP_PORT`: "3001"
- `NODE_ENV`: "production"
- `RUNEFRAMEOS_CORE_URL`: Points to Core service
- `RUNEFRAMEOS_SHARED_SERVICES_URL`: Points to Shared Services

### Resource Limits
- **CPU**: 250m request, 500m limit per pod
- **Memory**: 512Mi request, 1Gi limit per pod
- **Storage**: 50Gi total across all PVCs

## 🌐 Access Points

### Internal Network
- **Direct**: `http://nexus.internal`
- **Port Forward**: `kubectl port-forward -n nexus svc/nexus-service 8080:80`
- **Cluster IP**: Accessible from other namespaces

### External Access (if DNS configured)
- **HTTPS**: `https://nexus.runeframeos.local`
- **Internal HTTPS**: `https://nexus.internal.runeframeos.local`

## 📊 Monitoring & Health

### Health Endpoints
- **Health Check**: `/api/health`
- **Metrics**: `/api/metrics`

### Monitoring Stack
- **Prometheus**: Scrapes metrics every 30s
- **Grafana**: Pre-configured dashboard
- **Alerts**: Ready for Prometheus AlertManager

## 🔍 Troubleshooting

### Check Deployment Status
```bash
kubectl get all -n nexus
kubectl describe deployment runeframeos-nexus -n nexus
```

### Check Pod Logs
```bash
POD_NAME=$(kubectl get pods -n nexus -l app=runeframeos-nexus -o jsonpath='{.items[0].metadata.name}')
kubectl logs -n nexus $POD_NAME
```

### Check Storage
```bash
kubectl get pvc -n nexus
kubectl describe pvc nexus-data-pvc -n nexus
```

### Check Ingress
```bash
kubectl get ingress -n nexus
kubectl describe ingress nexus-ingress -n nexus
```

## 🚨 Common Issues

### PVC Not Bound
- Check if storage classes exist: `kubectl get storageclass`
- Verify storage infrastructure is deployed
- Check resource quotas: `kubectl describe quota -n nexus`

### Pods Not Starting
- Check events: `kubectl get events -n nexus --sort-by='.lastTimestamp'`
- Verify image exists: `runeframeos/nexus:0.1.0`
- Check resource limits vs cluster capacity

### Ingress Not Working
- Verify nginx-ingress is deployed
- Check ingress controller logs
- Verify DNS resolution

## 🔄 Updates & Maintenance

### Rolling Update
```bash
# Update the image
kubectl set image deployment/runeframeos-nexus nexus-app=runeframeos/nexus:0.1.1 -n nexus

# Monitor the rollout
kubectl rollout status deployment/runeframeos-nexus -n nexus
```

### Scale Up/Down
```bash
# Manual scaling
kubectl scale deployment runeframeos-nexus --replicas=5 -n nexus

# Check HPA status
kubectl get hpa -n nexus
```

## 🔐 Security

### Network Policies
- **Ingress**: Only HTTP/HTTPS traffic allowed
- **Egress**: Full access (can be restricted if needed)
- **Service Mesh**: Ready for future Istio integration

### RBAC
- **Service Account**: `default` (can be customized)
- **Security Context**: Non-root user (UID 1000)
- **Pod Security Standards**: Compliant with baseline

## 📈 Scaling

### Automatic Scaling
- **CPU threshold**: 70% utilization
- **Memory threshold**: 80% utilization
- **Scale up**: Aggressive (100% increase, 15s intervals)
- **Scale down**: Conservative (10% decrease, 60s intervals)

### Manual Scaling
- **Minimum**: 2 replicas
- **Maximum**: 10 replicas
- **Current**: 2 replicas

## 🔗 Integration Points

### RuneFrameOS Ecosystem
- **Core Service**: Admin dashboard integration
- **Shared Services**: Authentication and data persistence
- **Future Apps**: Plugin architecture ready

### External Services
- **Monitoring**: Prometheus, Grafana
- **Logging**: Ready for ELK stack
- **Tracing**: OpenTelemetry ready

## 📝 Notes

- **Port 3001**: Different from standard Next.js port 3000
- **Storage**: Uses new RuneFrameOS storage integration system
- **DNS**: Requires internal DNS configuration for `nexus.internal`
- **SSL**: Requires cert-manager for automatic certificate generation

## 🆘 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review pod logs and events
3. Check cluster resources and storage
4. Contact the RuneFrameOS team

---

**Version**: 0.1.0  
**Last Updated**: December 2024  
**Status**: Ready for Production Deployment
