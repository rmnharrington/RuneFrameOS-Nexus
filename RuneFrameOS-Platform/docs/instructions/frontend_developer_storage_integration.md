# Front-End Developer Storage Integration Guide

## Overview

The RuneFrameOS ecosystem now has a comprehensive long-term storage infrastructure that addresses the kube config directory structure preservation issues you were experiencing. This guide explains how to use the new storage system effectively.

## Problem Solved

**Previous Issue**: Your kube config files were not preserving directory structure, leading to:
- Configuration files being lost or misplaced
- Inconsistent file organization
- Difficulties in maintaining application configurations
- Poor development experience

**Solution Implemented**: A tiered storage system with directory structure preservation using `subPath` mounting.

## Storage Infrastructure Overview

### Storage Classes Available

1. **`storage-fast`** - High-performance storage for databases and critical applications
2. **`storage-standard`** - Standard storage for applications and data (default)
3. **`storage-backup`** - Backup storage for long-term retention
4. **`storage-logs`** - Log storage for application and system logs

### Directory Structure

```
/mnt/storage/
├── fast/           # High-performance storage
│   ├── postgresql/
│   ├── redis/
│   └── elasticsearch/
├── standard/       # Standard application storage
│   ├── applications/
│   ├── configs/
│   ├── uploads/
│   ├── cache/
│   └── development/
├── backup/         # Long-term backup storage
│   ├── databases/
│   ├── applications/
│   └── configs/
└── logs/           # Log storage
    ├── application/
    ├── system/
    └── audit/
```

## How to Use the New Storage System

### 1. Directory Structure Preservation

The key feature that solves your directory structure issues is **subPath mounting**. Each application gets its own subdirectory:

```yaml
volumeMounts:
- name: config-storage
  mountPath: /app/config
  subPath: your-application-name
- name: data-storage
  mountPath: /app/data
  subPath: your-application-name
```

### 2. Application Configuration Storage

For your application configurations, use the `applications-config-pv`:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: your-app-config-pvc
  namespace: applications
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 10Gi
  storageClassName: storage-standard
```

### 3. Volume Mounting Best Practices

#### For Configuration Files
```yaml
volumeMounts:
- name: app-config
  mountPath: /app/config
  subPath: your-app-name
```

#### For Upload Data
```yaml
volumeMounts:
- name: app-uploads
  mountPath: /app/uploads
  subPath: your-app-name
```

#### For Cache Data
```yaml
volumeMounts:
- name: app-cache
  mountPath: /app/cache
  subPath: your-app-name
```

### 4. Proper Permissions

The storage system uses consistent permissions:
```yaml
securityContext:
  runAsUser: 1000
  runAsGroup: 1000
  fsGroup: 1000
```

## Namespace Organization

### Available Namespaces
- **`applications`** - For your application deployments
- **`development`** - For development and testing
- **`postgresql`** - For database storage
- **`monitoring`** - For monitoring and logging

### Using the Applications Namespace

```bash
# Set your default namespace
kubectl config set-context --current --namespace=applications

# Deploy your application
kubectl apply -f your-app-deployment.yaml
```

## Storage Quotas and Limits

### Application Namespace Limits
- **Storage**: 200Gi total
- **PVCs**: 10 persistent volume claims
- **Default Storage Class**: `storage-standard`

### Development Namespace Limits
- **Storage**: 150Gi total
- **PVCs**: 5 persistent volume claims
- **Default Storage Class**: `storage-standard`

## Practical Examples

### Example 1: Deploying a Front-End Application

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-frontend-app
  namespace: applications
spec:
  replicas: 2
  selector:
    matchLabels:
      app: your-frontend-app
  template:
    metadata:
      labels:
        app: your-frontend-app
    spec:
      containers:
      - name: frontend
        image: your-frontend-image:latest
        ports:
        - containerPort: 80
        volumeMounts:
        - name: app-config
          mountPath: /app/config
          subPath: your-frontend-app
        - name: app-uploads
          mountPath: /app/uploads
          subPath: your-frontend-app
        - name: app-cache
          mountPath: /app/cache
          subPath: your-frontend-app
      volumes:
      - name: app-config
        persistentVolumeClaim:
          claimName: your-app-config-pvc
      - name: app-uploads
        persistentVolumeClaim:
          claimName: your-app-uploads-pvc
      - name: app-cache
        persistentVolumeClaim:
          claimName: your-app-cache-pvc
      securityContext:
        runAsUser: 1000
        runAsGroup: 1000
        fsGroup: 1000
```

### Example 2: Creating PVCs for Your Application

```yaml
# Config PVC
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: your-app-config-pvc
  namespace: applications
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 10Gi
  storageClassName: storage-standard
---
# Uploads PVC
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: your-app-uploads-pvc
  namespace: applications
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 20Gi
  storageClassName: storage-standard
---
# Cache PVC
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: your-app-cache-pvc
  namespace: applications
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 10Gi
  storageClassName: storage-standard
```

## Monitoring and Debugging

### Check Storage Status
```bash
# View all storage classes
kubectl get storageclass

# View persistent volumes
kubectl get pv

# View persistent volume claims
kubectl get pvc --all-namespaces

# Check storage usage
ssh RuneFrame OS Platform-sherlock "df -h /mnt/storage"
```

### Debug Directory Structure Issues
```bash
# Check if your application's directory exists
kubectl exec -n applications your-pod-name -- ls -la /app/config

# Verify file permissions
kubectl exec -n applications your-pod-name -- ls -la /app/

# Check storage mounting
kubectl describe pod your-pod-name -n applications
```

## Benefits for Front-End Development

### 1. Directory Structure Preservation
- ✅ Each application gets its own subdirectory
- ✅ No file conflicts between applications
- ✅ Consistent directory structure across deployments

### 2. Predictable File Organization
- ✅ Files are always where expected
- ✅ Clear separation of configs by application
- ✅ Easy to locate and manage files

### 3. Improved Development Experience
- ✅ No more lost configuration files
- ✅ Consistent file organization
- ✅ Better debugging capabilities

## Troubleshooting Common Issues

### Issue: Files Not Appearing in Expected Location
**Solution**: Check that you're using `subPath` correctly:
```yaml
volumeMounts:
- name: config-storage
  mountPath: /app/config
  subPath: your-application-name  # This is crucial
```

### Issue: Permission Denied Errors
**Solution**: Ensure proper security context:
```yaml
securityContext:
  runAsUser: 1000
  runAsGroup: 1000
  fsGroup: 1000
```

### Issue: PVC Not Binding
**Solution**: Check storage class and namespace:
```bash
kubectl get pvc -n applications
kubectl describe pvc your-pvc-name -n applications
```

## Migration from Old Storage

If you have existing applications using the old storage system:

1. **Backup your data**:
   ```bash
   kubectl exec -n your-namespace your-pod -- tar -czf /tmp/backup.tar.gz /app/config
   kubectl cp your-namespace/your-pod:/tmp/backup.tar.gz ./backup.tar.gz
   ```

2. **Create new PVCs** using the examples above

3. **Update your deployments** to use the new storage classes

4. **Restore your data**:
   ```bash
   kubectl cp ./backup.tar.gz your-namespace/your-new-pod:/tmp/
   kubectl exec -n your-namespace your-new-pod -- tar -xzf /tmp/backup.tar.gz -C /app/config
   ```

## Next Steps

### Immediate Actions
1. **Test the new storage system** with a simple application
2. **Migrate existing applications** to use the new storage classes
3. **Update your deployment scripts** to include proper volume mounting

### Long-term Benefits
1. **Scalable storage** that grows with your applications
2. **Organized infrastructure** with clear separation of concerns
3. **Monitoring and alerting** for storage issues
4. **Backup and recovery** procedures

## Support and Resources

### Documentation
- `LONG_TERM_STORAGE_PLAN.md` - Comprehensive storage plan
- `LONG_TERM_STORAGE_SUMMARY.md` - Implementation summary
- `infrastructure/storage/` - Storage YAML files

### Commands for Quick Reference
```bash
# Connect to cluster
ssh RuneFrame OS Platform-sherlock

# Check storage status
kubectl get pv,pvc,sc

# View your application's storage
kubectl get pvc -n applications

# Check storage usage
df -h /mnt/storage
```

## Conclusion

The new long-term storage infrastructure resolves your directory structure preservation issues while providing a robust, scalable storage solution for the entire RuneFrameOS ecosystem. The key improvements are:

1. **subPath mounting** ensures each application maintains its directory structure
2. **Proper permissions** prevent file access issues
3. **Namespace isolation** prevents conflicts between applications
4. **Storage quotas** prevent resource overuse
5. **Monitoring and alerting** for proactive issue detection

Your kube config files will now preserve their directory structure, and you'll have a much more predictable and organized development experience.

