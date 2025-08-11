# RuneFrame OS Platform Infrastructure - Machine Instructions

## 🏗️ Infrastructure Overview

### Kubernetes Cluster Access
- **Primary Control Plane**: sherlock.pedantictheory.com (172.18.254.35)
- **GPU Worker Node 1**: watson.pedantictheory.com (172.18.254.36) 
- **GPU Worker Node 2**: adler.pedantictheory.com (172.18.254.37)
- **Target Domain**: paul.pedantictheory.com (172.18.254.40)

### SSH Configuration
- **SSH Config Location**: `C:\Users\Richard\.ssh\config`
- **Primary Key**: `~/.ssh/PLATFORM_key` (for all RuneFrame OS Platform-* hosts)
- **User**: `RuneFrame OS Platform` (sudo access configured, no password required)
- **Connection Pattern**: `ssh RuneFrame OS Platform-sherlock`, `ssh RuneFrame OS Platform-watson`, `ssh RuneFrame OS Platform-adler`

## 🔧 Access Procedures

### 1. Initial Cluster Access
```bash
# Test connection to control plane
ssh RuneFrame OS Platform-sherlock

# Verify kubectl access
kubectl get nodes
kubectl get pods --all-namespaces
```

### 2. Multi-Node Operations
```bash
# Bulk operations across all nodes
for host in RuneFrame OS Platform-sherlock RuneFrame OS Platform-watson RuneFrame OS Platform-adler; do
    ssh $host "command"
done
```

## 🚀 Deployment Strategy

### Target Configuration
- **Domain**: paul.pedantictheory.com
- **IP**: 172.18.254.40 (Network IP, outside Kube)
- **Service Type**: LoadBalancer or NodePort with external IP
- **SSL**: Let's Encrypt via cert-manager

### Security by Design Principles
1. **Zero Trust**: All access requires authentication
2. **Least Privilege**: Minimal required permissions
3. **Defense in Depth**: Multiple security layers
4. **Secure by Default**: All configurations hardened
5. **Continuous Monitoring**: Real-time security monitoring

### Infrastructure as Code Principles
1. **Version Control**: All configurations in Git
2. **Declarative**: YAML-based configurations
3. **Immutable**: Container-based deployments
4. **Automated**: CI/CD pipeline integration
5. **Testable**: Automated testing for all changes

## 📋 State Management

### Files to Maintain
- `CHANGES.md`: All modifications and updates
- `FIXES.md`: Bug fixes and troubleshooting
- `state.yaml`: Current cluster state and configuration
- `deployment.yaml`: Application deployment configuration
- `ingress.yaml`: Network routing configuration

### State Tracking
- Cluster health status
- Application deployment status
- Network configuration
- Security posture
- Resource utilization

## 🔍 Verification Commands

### Cluster Health
```bash
kubectl get nodes -o wide
kubectl get pods --all-namespaces
kubectl get services --all-namespaces
kubectl get ingress --all-namespaces
```

### Network Verification
```bash
# Test DNS resolution
nslookup paul.pedantictheory.com

# Test network connectivity
ping 172.18.254.40
telnet 172.18.254.40 80
telnet 172.18.254.40 443
```

### Security Verification
```bash
# Check RBAC
kubectl get roles --all-namespaces
kubectl get rolebindings --all-namespaces

# Check network policies
kubectl get networkpolicies --all-namespaces
```

## 🚨 Emergency Procedures

### Cluster Recovery
1. Check cluster status: `kubectl cluster-info`
2. Verify node health: `kubectl get nodes`
3. Restart failed components: `kubectl rollout restart`
4. Scale down/up: `kubectl scale deployment`

### Network Issues
1. Check ingress controller: `kubectl get pods -n ingress-nginx`
2. Verify DNS: `kubectl get svc -n kube-system`
3. Check external IP: `kubectl get svc -o wide`

### Security Incidents
1. Audit logs: `kubectl get events --all-namespaces`
2. Check for unauthorized access
3. Rotate credentials if compromised
4. Update security policies

## 📊 Monitoring and Logging

### Metrics to Track
- CPU/Memory usage per node
- Pod restart counts
- Network latency
- SSL certificate expiration
- Security event frequency

### Log Locations
- Application logs: `kubectl logs -f deployment/`
- System logs: SSH to nodes and check `/var/log/`
- Audit logs: `kubectl get events --all-namespaces`

## 🔄 CI/CD Integration

### Deployment Pipeline
1. Code commit triggers build
2. Security scan of container images
3. Automated testing
4. Deployment to staging
5. Production deployment with rollback capability

### Rollback Procedures
```bash
# Rollback to previous version
kubectl rollout undo deployment/dune-builder

# Check rollout status
kubectl rollout status deployment/dune-builder

# View rollout history
kubectl rollout history deployment/dune-builder
```

## 📝 Documentation Standards

### Change Documentation
- **CHANGES.md**: What was changed, when, why
- **FIXES.md**: What was broken, how it was fixed
- **state.yaml**: Current infrastructure state
- **deployment.yaml**: Application configuration

### Security Documentation
- Access control changes
- Network policy updates
- Certificate renewals
- Security incident reports

---

**Last Updated**: $(date)
**Maintained By**: AI Assistant
**Version**: 1.0.0 
