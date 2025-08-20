# RuneFrameOS Deployment Methodology

## Overview

This document outlines the improved deployment methodology for RuneFrameOS applications to the Sherlock Kubernetes cluster. The new approach uses Linux shell scripts executed directly on the cluster, eliminating PowerShell syntax issues and providing better reliability.

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Windows PC    │    │   SSH/SCP       │    │  Sherlock      │
│                 │────│   Transfer      │────│  Cluster       │
│ - Batch File    │    │                 │    │                 │
│ - PowerShell    │    │                 │    │ - Linux Script  │
│   Wrapper       │    │                 │    │ - kubectl       │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## Files

### 1. `deploy_runeframeos_linux.sh` (Linux Deployment Script)
- **Purpose**: Core deployment logic executed on the Sherlock cluster
- **Features**:
  - Color-coded output with timestamps
  - Comprehensive error handling
  - Automatic namespace creation
  - Domain and IP address substitution
  - Deployment status monitoring
  - Support for all Kubernetes resource types

### 2. `deploy_runeframeos.bat` (Windows Batch File)
- **Purpose**: Windows-friendly wrapper that transfers and executes the Linux script
- **Features**:
  - No PowerShell syntax issues
  - Step-by-step progress indicators
  - Error handling and user confirmation
  - Automatic cleanup

### 3. `deploy_runeframeos_wrapper.ps1` (PowerShell Wrapper - Optional)
- **Purpose**: Alternative PowerShell wrapper (has known syntax issues)
- **Status**: Not recommended due to persistent linter errors

## Deployment Process

### Phase 1: Preparation
1. **SSH Connection Test**: Verify connectivity to `jonar@sherlock.pedantictheory.com`
2. **Kubernetes Access**: Confirm `kubectl` is available and configured
3. **Script Transfer**: Copy Linux deployment script to remote server

### Phase 2: Execution
1. **Script Execution**: Run deployment script directly on cluster
2. **Application Deployment**: Iterate through configured applications
3. **Resource Creation**: Apply Kubernetes manifests in correct order
4. **Status Monitoring**: Track deployment progress and pod status

### Phase 3: Verification
1. **Final Status Check**: Verify all applications are running
2. **Cluster Overview**: Display comprehensive deployment status
3. **Cleanup**: Remove temporary files and scripts

## Application Configuration

The deployment script automatically configures the following applications:

| Application | Domain | IP Address | Namespace |
|-------------|--------|------------|-----------|
| Nexus | nexus.pedantictheory.com | 172.18.254.78 | runeframeos-nexus |
| Core | core.pedantictheory.com | 172.18.254.71 | runeframeos-core |
| Hoardwell | hoardwell.pedantictheory.com | 172.18.254.75 | runeframeos-hoardwell |
| Distillara | distillara.pedantictheory.com | 172.18.254.73 | runeframeos-distillara |
| Feastwell | feastwell.pedantictheory.com | 172.18.254.74 | runeframeos-feastwell |
| BrokeUnicornTavern | brokeunicorntavern.pedantictheory.com | 172.18.254.70 | runeframeos-brokeunicorntavern |

## Usage

### Option 1: Windows Batch File (Recommended)
```cmd
deploy_runeframeos.bat
```

### Option 2: Direct SSH Execution
```bash
# Transfer script manually
scp deploy_runeframeos_linux.sh jonar@sherlock.pedantictheory.com:/home/jonar/

# SSH to cluster and execute
ssh jonar@sherlock.pedantictheory.com
chmod +x deploy_runeframeos.sh
./deploy_runeframeos.sh
```

### Option 3: Status Check Only
```bash
ssh jonar@sherlock.pedantictheory.com
./deploy_runeframeos.sh --status
```

## Prerequisites

### Local Machine
- SSH client (OpenSSH or PuTTY)
- SSH key configured for `jonar@sherlock.pedantictheory.com`
- Access to the Code_Repository directory

### Remote Cluster
- Kubernetes cluster accessible via `kubectl`
- Available storage classes
- Sufficient resources for all applications

## Advantages of New Methodology

### 1. **Reliability**
- No PowerShell syntax issues
- Direct execution on target platform
- Native Linux commands and tools

### 2. **Maintainability**
- Single source of truth for deployment logic
- Easy to modify and extend
- Clear separation of concerns

### 3. **Debugging**
- Direct access to cluster logs
- Real-time deployment monitoring
- Comprehensive error reporting

### 4. **Flexibility**
- Support for all Kubernetes resource types
- Automatic domain and IP substitution
- Configurable application list

## Troubleshooting

### Common Issues

1. **SSH Connection Failed**
   - Verify SSH key configuration
   - Check network connectivity
   - Confirm SSH config in `~/.ssh/config`

2. **Kubernetes Access Denied**
   - Verify `kubectl` configuration
   - Check cluster permissions
   - Confirm namespace access

3. **Deployment Failures**
   - Check pod logs: `kubectl logs -n <namespace> <pod-name>`
   - Verify resource requirements
   - Check storage class availability

### Debug Commands

```bash
# Check cluster status
kubectl get nodes
kubectl get namespaces

# Check application status
kubectl get pods --all-namespaces | grep runeframeos

# Check specific application
kubectl get all -n runeframeos-nexus

# View logs
kubectl logs -n runeframeos-nexus deployment/nexus

# Check events
kubectl get events -n runeframeos-nexus
```

## Future Enhancements

### Planned Features
1. **Rollback Capability**: Automatic rollback on deployment failures
2. **Health Checks**: Application health monitoring and alerts
3. **Configuration Management**: Environment-specific configurations
4. **CI/CD Integration**: Automated deployment pipelines

### Extensibility
- Easy to add new applications
- Support for custom resource types
- Integration with monitoring and logging systems

## Conclusion

The new Linux-based deployment methodology provides a robust, reliable, and maintainable solution for deploying RuneFrameOS applications to the Sherlock cluster. By eliminating PowerShell syntax issues and leveraging native Linux tools, the deployment process is more predictable and easier to troubleshoot.

For immediate deployment, use the `deploy_runeframeos.bat` file. For advanced usage or troubleshooting, execute the Linux script directly on the cluster via SSH.



