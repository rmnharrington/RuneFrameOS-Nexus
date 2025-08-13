# Sherlock Kube Cluster Deployment Guide

## Overview

This document contains the complete deployment information for the Sherlock kube cluster, including infrastructure details, SSH configuration, and authentication keys for the RuneFrameOS ecosystem.

## 🔍 Sherlock Kube Cluster Configuration

### Cluster Architecture

**Control Plane:**
- **Hostname**: `sherlock.pedantictheory.com`
- **IP Address**: `172.18.254.35`
- **Role**: Kubernetes control plane node

**Worker Nodes:**
- **Node 1**: `watson.pedantictheory.com` (172.18.254.36)
- **Node 2**: `adler.pedantictheory.com` (172.18.254.37)

**Target Domain:**
- **Hostname**: `paul.pedantictheory.com`
- **IP Address**: `172.18.254.40`

### Network Topology

```
Internet
    │
    ▼
paul.pedantictheory.com (172.18.254.40)
    │
    ├── sherlock.pedantictheory.com (172.18.254.35) - Control Plane
    ├── watson.pedantictheory.com (172.18.254.36) - Worker Node
    └── adler.pedantictheory.com (172.18.254.37) - Worker Node
```

## 🔑 SSH Configuration

### SSH Config Location
- **File Path**: `C:/Users/Richard/.ssh/config`
- **User**: `RuneFrame OS Platform`
- **Key Path**: `~/.ssh/PLATFORM_key`

### Host Aliases
The following SSH aliases are configured for easy access:

```bash
# Control Plane
RuneFrame OS Platform-sherlock

# Worker Nodes
RuneFrame OS Platform-watson
RuneFrame OS Platform-adler
```

### SSH Connection Examples

```bash
# Connect to control plane
ssh RuneFrame OS Platform-sherlock

# Connect to worker nodes
ssh RuneFrame OS Platform-watson
ssh RuneFrame OS Platform-adler

# Direct connection using IP
ssh -i ~/.ssh/PLATFORM_key user@172.18.254.35  # sherlock
ssh -i ~/.ssh/PLATFORM_key user@172.18.254.36  # watson
ssh -i ~/.ssh/PLATFORM_key user@172.18.254.37  # adler
```

## 🔐 Jonar Authentication Keys

### Key Locations
- **Private Key**: `C:\Users\Wee\.ssh\jonar_cluster`
- **Public Key**: `C:\Users\Wee\.ssh\jonar_cluster.pub`

### Private Key Details
**File**: `jonar_cluster`
**Type**: OpenSSH RSA Private Key
**Permissions**: 600 (owner read/write only)

```ssh
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABlwAAAAdzc2gtcn
NhAAAAAwEAAQAAAYEAre/kM6cParjvEfEEszpNAHsImUB2suj0U9i8Ycg7fsEYDL+w6NEc
JIcGPiwls9T50Ex5buAk+BtS4EqNX5N0qzI4ndGDPt8MDK86MgTazaeD9L5pm8j6Z4egg9
AuNClIS8/akbyblsBOhGlmchjbS+o03ySSeB0pdXTHHx+YX630tbc7DbZXyhrA4Tl0Pk5k
F+oZfxrHbX/We0EmgfIr1Cp88XKEDEgJOd79J9DG89dRhW8mlJHlcqAmu0HeQ8RgmdzkwL
fAh/PVHq0t13ITyYq+WgQ3yZFKY5SJSZ3EIZsf0zBq+GSxASomevWtPPMae7Jy8ej2/FPy
SHUF8MWwA6HoUuHY2YLxy3cpWvi/C5wii0VOdQ7LUtYGgQJD7sA6/8BrZG0iM6R+/MIpPS
LFb6W+mejBQfL1wBSHE26f3HiVjus1kZC+fw1FICtRjKzlNF62C2K/Xj7LSCKJbydM7cN6
Dq3sU+ssapX+3mchr0tJ4sWpWGq/1esI+xSgCozPAAAFgBWTCAgVkwgIAAAAB3NzaC1yc2
EAAAGBAK3v5DOnD2q47xHxBLM6TQB7CJlAdrLo9FPYvGHIO37BGAy/sOjRHCSHBj4sJbPU
+dBMeW7gJPgbUuBKjV+TdKsyOJ3Rgz7fDAyvOjIE2s2ng/S+aZvI+meHoIPQLjQpSEvP2p
G8m5bAToRpZnIY20vqNN8kkngdKXV0xx8fmF+t9LW3Ow22V8oawOE5dD5OZBfqGX8ax21/
1ntBJoHyK9QqfPFyhAxICTne/SfQxvPXUYVvJpSR5XKgJrtB3kPEYJnc5MC3wIfz1R6tLd
dyE8mKvloEN8mRSmOUiUmdxCGbH9MwavhksQEqJnr1rTzzGnuycvHo9vxT8kh1BfDFsAOh
6FLh2NmC8ct3KVr4vwucIotFTnUOy1LWBoECQ+7AOv/Aa2RtIjOkfvzCKT0ixW+lvpnowU
Hy9cAUhxNun9x4lY7rNZGQvn8NRSArUYys5TRetgtiv14+y0giiW8nTO3Deg6t7FPrLGqV
/t5nIa9LSeLFqVhqv9XrCPsUoAqMzwAAAAMBAAEAAAGAKI+/xLfZpYaY4bM16GHZIRqP58
UbqR8gEwmA7MCX9zgqVpbBN5nEGVSPhSIgbK5mz0d2LgABPwaILhvUmgw18dJVV6BLHfc/
xRl71bxCFiFRaVqaICUfF9OOAA8lJy7VWDCRhNjZ467W4JP/uu3G/g4Q5FSP/4i1aVmhMc
XZb76OSW4ATHNQR6YzgpI2ZG09dEI4Tea9yPA94SJRS45g4CpEVr3gw0htNlyk5osOSkDV
FuvTsGPRgQiN3689mMoLZnh301aKhYq+MbhRZ5PHcqcoSN3UKqo+nztrA2fmLN0HRWsaqp
qDGN7djTo5OIOB5l67pwZX2DCToUTtkZbeLXX2XBbHUwbSsriVSVuEB6WBUfDXN1b94GIc
vryF2aCLafuo9zrR8NB3uT6k2xzQ1CrlNZvEiYIKzoLMwZtCzbku8tUhnGzveX05R/LuJn
iqkQXjcmsmU637eypqAxtms67DjHsFgF89y/N6D/ibRv+xY0R0SCX2wBhc8OQPhBYBAAAA
wQC23Ul4CLJsn7KwUfrMjscV5rTgaWjlLbQif4EDeZAzfezmT98nGCy9VSfL2kDjy5JDnm
2W5TILmxqIHcTZCFrjIpOPn7UB0tAAFJPF95VLyORMucX84YMMpmFf4VFJ8QhvLi44gszo
CcmrlQ8uAcDw7Hhgg5eD6OkQq7/YMm5Ppc1YtDqdkpGoQZrl5MtbyD7ioI+QKj5+Esw+GI
pF/M8AlwqRUIZ/r3QQCUPKlgbuK/LLaoByI459t8X21mVl0KAAAADBANtIbcAcnm1f4RXv
OZULv/WL5bHGGHyqvczjN40QSAT15G0PbgF7UNpZJ6ji9UzkPNNvJzqhczE6szxLJkBtEU
mxx8Jo/kjzPH5iAQcRd82ynQmQh9g03SGR0KSu7jBkzadWEwOskoNw6z7qIM4UfzGY+rAA
0lhAFtGKC2bt+6v1x6XM+ipVM44HiBC23kacpLonl3mIVlDlssyw5ksBbMfcp+WIMyIn5q
cKRPuueCP3pPVj+v5R7ZGYjoLb5qIrzwAAAMEAyw+2CcvDPlpV4jT7aeUHY0DpcOFBlKdG
9wqpv1FoRDC2W56zRD8PY/Cp7UNfIVfO1cOFgns+M8h2AknAwi2kTHyrBjXCssOBe3XgJn
ZWyKHLvBAMJD5DXPgTm64p8Cq7em9JmxCTg3huEv96oIJXLXRg4B++ctwn57JPx8Wyhz74
QYbQyvk2Pj93DnrUo29CxwaveW//cTXMogFwQsLdolFNBcb3IbQGz819KDViJJQtkBmTve
ju16z2+Qz7RM8BAAAACndlZUBjYXBvbmU=
-----END OPENSSH PRIVATE KEY-----
```

### Public Key Details
**File**: `jonar_cluster.pub`
**Type**: SSH RSA Public Key
**Permissions**: 644 (owner read/write, group/others read)

```ssh
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCt7+Qzpw9quO8R8QSzOk0AewiZQHay6PRT2LxhyDt+wRgMv7Do0RwkhwY+LCWz1PnQTHlu4CT4G1LgSo1fk3SrMjid0YM+3wwMrzoyBNrNp4P0vmmbyPpnh6CD0C40KUhLz9qRvJuWwE6EaWZyGNtL6jTfJJJ4HSl1dMcfH5hfrfS1tzsNtlfKGsDhOXQ+TmQX6hl/Gsdtf9Z7QSaB8ivUKnzxcoQMSAk53v0n0Mbz11GFbyaUkeVyoCa7Qd5DxGCZ3OTAt8CH89UerS3XchPJir5aBDfJkUpjlIlJncQhmx/TMGr4ZLEBKiZ69a088xp7snLx6Pb8U/JIdQXwxbADoehS4djZgvHLdyla+L8LnCKLRU51DstS1gaBAkPuwDr/wGtkbSIzpH78wik9IsVvpb6Z6MFB8vXAFIcTbp/ceJWO6zWRkL5/DUUgK1GMrOU0XrYLYr9ePstIIolvJ0ztw3oOrexT6yxqlf7eZyGvS0nixalYar/V6wj7FKAKjM8= wee@capone
```

## 🚀 Deployment Instructions

### Prerequisites
- SSH client with key-based authentication support
- Access to the jonar_cluster private key
- Network access to the 172.18.254.x subnet

### Step-by-Step Deployment

1. **Verify SSH Key Permissions**
   ```bash
   # Set correct permissions for private key
   chmod 600 ~/.ssh/jonar_cluster
   
   # Set correct permissions for public key
   chmod 644 ~/.ssh/jonar_cluster.pub
   ```

2. **Test SSH Connectivity**
   ```bash
   # Test connection to control plane
   ssh -i ~/.ssh/jonar_cluster user@sherlock.pedantictheory.com
   
   # Test connection to worker nodes
   ssh -i ~/.ssh/jonar_cluster user@watson.pedantictheory.com
   ssh -i ~/.ssh/jonar_cluster user@adler.pedantictheory.com
   ```

3. **Deploy Kubernetes Components**
   ```bash
   # Connect to control plane
   ssh -i ~/.ssh/jonar_cluster user@sherlock.pedantictheory.com
   
   # Verify cluster status
   kubectl get nodes
   kubectl get pods --all-namespaces
   ```

4. **Deploy Applications**
   ```bash
   # Apply Kubernetes manifests
   kubectl apply -f namespace.yaml
   kubectl apply -f deployments/
   kubectl apply -f services/
   kubectl apply -f ingress/
   ```

## 📋 Cluster Health Monitoring

### Basic Health Checks
```bash
# Check node status
kubectl get nodes -o wide

# Check pod status
kubectl get pods --all-namespaces

# Check service status
kubectl get services --all-namespaces

# Check cluster events
kubectl get events --all-namespaces
```

### Advanced Monitoring
```bash
# Check resource usage
kubectl top nodes
kubectl top pods --all-namespaces

# Check cluster capacity
kubectl describe nodes

# Check storage classes
kubectl get storageclass
```

## 🔒 Security Considerations

### Key Management
- **Private Key**: Keep secure and never share
- **Public Key**: Can be distributed to authorized systems
- **Permissions**: Ensure private key has 600 permissions
- **Backup**: Secure backup of private key

### Network Security
- **Firewall Rules**: Ensure 172.18.254.x subnet is accessible
- **SSH Security**: Use key-based authentication only
- **Port Access**: Verify required ports are open (22, 6443, 80, 443)

## 📚 Additional Resources

### Documentation Sources
- **Context File**: `RuneFrameOS-Platform/context_use.yaml`
- **Platform README**: `RuneFrameOS-Platform/src/jonar/README.md`
- **Infrastructure Docs**: `RuneFrameOS-Platform/docs/`

### Related Components
- **RuneFrameOS Platform**: Infrastructure as Code platform
- **Distillara**: Alchemy simulation platform
- **Hoardwell**: Multi-agent communication platform
- **Mercatrix**: Economic foundation engine

## 📝 Notes

- The jonar keys are named `jonar_cluster` and `jonar_cluster.pub` rather than the exact `jonar_key` and `jonar_key.pub` mentioned in some documentation
- The cluster uses the 172.18.254.x private subnet
- All nodes are accessible via the `pedantictheory.com` domain
- The cluster supports the full RuneFrameOS ecosystem deployment

---

**Document Generated**: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
**Source**: Sherlock Kube Cluster deployment information from RuneFrameOS Platform context
**Maintained By**: RuneFrameOS Infrastructure Team
