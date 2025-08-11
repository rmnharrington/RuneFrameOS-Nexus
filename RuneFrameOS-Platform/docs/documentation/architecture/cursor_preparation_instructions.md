# Cursor Preparation Instructions - RuneFrame OS Platform Infrastructure

## 🎯 **Purpose**
This document provides Cursor with comprehensive context about the RuneFrame OS Platform infrastructure to ensure accurate, context-aware assistance. Use this as a reference to avoid assumptions and apply the correct tools and techniques for each environment.

## 🏗️ **Infrastructure Overview**

### **Operating System Distribution**
| Server | OS | Purpose | Access Method | IP Address |
|--------|----|---------|---------------|------------|
| **Sherlock** | Linux (Ubuntu) | Kubernetes Control Plane | SSH | 172.18.254.35 |
| **Watson** | Linux (Ubuntu) | Kubernetes Worker Node (GPU) | SSH | 172.18.254.36 |
| **Adler** | Linux (Ubuntu) | Kubernetes Worker Node (GPU) | SSH | 172.18.254.37 |
| **Honeycut** | Windows Server 2019 | Certificate Authority | WinRM | 172.18.254.20 |
| **Local Machine** | Windows 10 | Development/Management | Local | 172.16.254.140 |

### **SSH Configuration**
- **Location**: `C:\Users\Richard\.ssh\config`
- **Host Aliases**: `RuneFrame OS Platform-sherlock`, `RuneFrame OS Platform-watson`, `RuneFrame OS Platform-adler`
- **User**: `RuneFrame OS Platform` (sudo access, no password)
- **Key**: `~/.ssh/PLATFORM_key`
- **FQDN**: `sherlock.pedantictheory.com`, `watson.pedantictheory.com`, `adler.pedantictheory.com`

### **Network Architecture**
```
Internet
    ↓
Palo Alto Firewall (172.18.254.42)
    ↓
┌─────────────────┬─────────────────┬─────────────────┐
│   Sherlock      │    Watson       │     Adler       │
│ (Control Plane) │  (Worker GPU)   │  (Worker GPU)   │
│  172.18.254.35  │  172.18.254.36  │  172.18.254.37  │
└─────────────────┴─────────────────┴─────────────────┘
    ↓
┌─────────────────┬─────────────────┐
│   Honeycut      │   Local Dev     │
│ (Windows CA)    │   (Windows 10)  │
│ 172.18.254.20   │ 172.16.254.140  │
└─────────────────┴─────────────────┘
```

## 🔧 **Access Methods by Environment**

### **Linux Servers (Sherlock, Watson, Adler)**
```bash
# SSH Access
ssh RuneFrame OS Platform-sherlock
ssh RuneFrame OS Platform-watson
ssh RuneFrame OS Platform-adler

# Linux-specific commands
sudo systemctl status <service>
sudo journalctl -u <service>
timedatectl status
systemctl status ntp
```

### **Windows Server (Honeycut)**
```powershell
# WinRM Access
$credential = New-Object System.Management.Automation.PSCredential("spyhunter@pedantictheory.com", $securePassword)
$session = New-PSSession -ComputerName "honeycut.pedantictheory.com" -Credential $credential

# Windows-specific commands
w32tm /query /status
Get-Service -Name "w32time"
Get-WindowsFeature -Name ADCS*
```

### **Local Windows Machine**
```powershell
# Local PowerShell
Get-Date
w32tm /query /status
Test-Connection -ComputerName <target> -Count 1
```

## 🗄️ **Database Architecture**

### **Current Database Distribution**
| Application | Database Type | Location | Purpose |
|-------------|---------------|----------|---------|
| **Distillara** | MongoDB | Local/Container | Alchemy data |
| **Hoardwell** | MongoDB + Redis | Local/Container | Inventory + Cache |
| **Mercatrix** | PostgreSQL + Redis | Local/Container | Economic data |
| **Tapestry Engine** | MongoDB | Local/Container | World-building data |
| **RuneFrame OS Platform** | Various | Infrastructure | Infrastructure state |

### **Database Access Patterns**
- **MongoDB**: Document-based, flexible schema
- **PostgreSQL**: ACID transactions, complex queries
- **Redis**: Caching, session storage, pub/sub

## 🔐 **Security Architecture**

### **Authentication Methods**
| Environment | Method | Credentials | Notes |
|-------------|--------|-------------|-------|
| **Linux Cluster** | SSH Key | `~/.ssh/PLATFORM_key` | No password required |
| **Windows Server** | WinRM | `spyhunter@pedantictheory.com` | Domain authentication |
| **Firewall** | API Key | Generated via pan-os-python | Palo Alto management |

### **Certificate Management**
- **CA Server**: Honeycut (Windows Server 2019)
- **Certificate**: `pedantic-CA.p12` (password: `xscdVFWEZA!@12`)
- **Web Enrollment**: `https://honeycut.pedantictheory.com/certsrv`

## ⏰ **Time Synchronization**

### **NTP Configuration**
| Server | Current Source | Target Source | Status |
|--------|----------------|---------------|--------|
| **Sherlock** | `2.debian.pool.ntp.org` | `time.nist.gov` | ⚠️ Using Debian pool |
| **Watson** | `2.debian.pool.ntp.org` | `time.nist.gov` | ⚠️ Using Debian pool |
| **Adler** | `2.debian.pool.ntp.org` | `time.nist.gov` | ⚠️ Using Debian pool |
| **Honeycut** | `time.nist.gov` | `time.nist.gov` | ✅ Configured |

### **Time Validation Commands**
```bash
# Linux servers
ssh RuneFrame OS Platform-sherlock "timedatectl status"
ssh RuneFrame OS Platform-watson "timedatectl status"
ssh RuneFrame OS Platform-adler "timedatectl status"

# Windows server
Invoke-Command -Session $session -ScriptBlock { w32tm /query /status }
```

## 🚀 **Deployment Strategy**

### **Kubernetes Architecture**
```yaml
# Namespace Structure
runeframeos/          # Main ecosystem namespace
├── alchemy/          # Distillara applications
├── communication/    # Hoardwell applications
├── economy/          # Mercatrix applications
├── world-building/   # Tapestry Engine applications
└── infrastructure/   # Shared services
```

### **Application Deployment Pattern**
```yaml
# Standard deployment structure
apiVersion: apps/v1
kind: Deployment
metadata:
  name: <app-name>
  namespace: <ecosystem-namespace>
spec:
  replicas: 2
  selector:
    matchLabels:
      app: <app-name>
  template:
    metadata:
      labels:
        app: <app-name>
    spec:
      containers:
      - name: <app-name>
        image: RuneFrame OS Platform/<app-name>:latest
        ports:
        - containerPort: <port>
        env:
        - name: <env-var>
          valueFrom:
            secretKeyRef:
              name: <secret-name>
              key: <key-name>
```

## 🔍 **Troubleshooting Patterns**

### **Linux Server Issues**
```bash
# Check service status
sudo systemctl status <service>

# View logs
sudo journalctl -u <service> -f

# Check disk space
df -h

# Check memory
free -h

# Check network
ip addr show
```

### **Windows Server Issues**
```powershell
# Check service status
Get-Service -Name <service>

# View event logs
Get-EventLog -LogName Application -Newest 10

# Check disk space
Get-WmiObject -Class Win32_LogicalDisk

# Check memory
Get-WmiObject -Class Win32_ComputerSystem

# Check network
Get-NetAdapter
```

### **Kubernetes Issues**
```bash
# Check pod status
kubectl get pods --all-namespaces

# View pod logs
kubectl logs -f <pod-name> -n <namespace>

# Check events
kubectl get events --all-namespaces

# Check node status
kubectl get nodes -o wide
```

## 📊 **Monitoring and Observability**

### **Metrics Collection**
- **Prometheus**: Kubernetes metrics, application metrics
- **Grafana**: Visualization and alerting
- **Jaeger**: Distributed tracing
- **ELK Stack**: Centralized logging

### **Key Metrics**
- CPU/Memory usage per node
- Pod restart counts
- Network latency
- Certificate expiration
- Security events

## 🔄 **CI/CD Pipeline**

### **Deployment Flow**
1. **Code Commit** → GitHub/GitLab
2. **Security Scan** → Container vulnerability scan
3. **Build** → Docker image creation
4. **Test** → Automated testing
5. **Deploy** → Kubernetes deployment
6. **Monitor** → Health checks and rollback

### **Rollback Procedures**
```bash
# Kubernetes rollback
kubectl rollout undo deployment/<app-name>

# Check rollout status
kubectl rollout status deployment/<app-name>

# View history
kubectl rollout history deployment/<app-name>
```

## 🛠️ **Tool Selection Guidelines**

### **When Working with Linux Servers**
- Use **SSH** for remote access
- Use **bash** for scripting
- Use **systemctl** for service management
- Use **timedatectl** for time configuration
- Use **journalctl** for log viewing

### **When Working with Windows Servers**
- Use **WinRM** for remote access
- Use **PowerShell** for scripting
- Use **Get-Service** for service management
- Use **w32tm** for time configuration
- Use **Get-EventLog** for log viewing

### **When Working with Kubernetes**
- Use **kubectl** for cluster management
- Use **Helm** for package management
- Use **ArgoCD/Flux** for GitOps
- Use **Prometheus/Grafana** for monitoring

### **When Working with Databases**
- Use **MongoDB** for document storage
- Use **PostgreSQL** for relational data
- Use **Redis** for caching
- Use **RabbitMQ** for message queuing

## 📝 **Documentation Standards**

### **Change Documentation**
- **CHANGES.md**: What was changed, when, why
- **FIXES.md**: What was broken, how it was fixed
- **state.yaml**: Current infrastructure state

### **Script Naming Conventions**
- **Linux scripts**: `.sh` extension, bash shebang
- **Windows scripts**: `.ps1` extension, PowerShell
- **Python scripts**: `.py` extension, appropriate imports

### **Configuration Files**
- **Kubernetes**: YAML format
- **Terraform**: HCL format
- **Ansible**: YAML format
- **Docker**: Dockerfile format

## 🚨 **Emergency Procedures**

### **Critical Issues**
1. **Cluster Down**: Check node status, restart failed components
2. **Network Issues**: Check firewall rules, DNS resolution
3. **Security Breach**: Audit logs, rotate credentials
4. **Data Loss**: Restore from backups, verify integrity

### **Contact Information**
- **Infrastructure Owner**: Richard
- **Domain**: pedantictheory.com
- **Certificate Authority**: honeycut.pedantictheory.com

## 🎯 **Cursor-Specific Guidelines**

### **Context Awareness**
- **ALWAYS** check the target environment before suggesting commands
- **NEVER** assume Windows commands for Linux servers
- **NEVER** assume Linux commands for Windows servers
- **ALWAYS** verify connectivity before remote operations

### **Error Handling**
- **ALWAYS** include error checking in scripts
- **ALWAYS** provide fallback options
- **ALWAYS** document assumptions and limitations

### **Security First**
- **NEVER** expose credentials in scripts
- **ALWAYS** use secure communication methods
- **ALWAYS** follow least privilege principles

### **Documentation**
- **ALWAYS** update relevant documentation files
- **ALWAYS** include change reasons and timestamps
- **ALWAYS** maintain state tracking

---

**Last Updated**: 2025-01-07
**Version**: 1.0.0
**Maintained By**: Cursor AI Assistant
**Purpose**: Comprehensive infrastructure reference for accurate assistance
