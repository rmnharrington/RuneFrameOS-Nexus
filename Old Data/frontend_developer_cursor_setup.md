# Front-End Developer Cursor Setup Guide
## RuneFrameOS Sherlock Cluster Access

### Overview
This guide provides complete setup instructions for front-end developer access to the RuneFrameOS sherlock cluster through Cursor IDE with Remote-SSH extension.

---

## Prerequisites

### Required Software
- [x] Cursor IDE (Ultra subscription)
- [x] Remote-SSH extension for Cursor
- [x] SSH client (built into Cursor)

### Security Notice
This access is granted under **Security Exception #001** (see `security_exceptions.md`). All access is logged and monitored.

---

## Step 1: Install Remote-SSH Extension

### Automatic Installation
1. Open Cursor IDE
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Remote - SSH"
4. Install the extension by Microsoft
5. Restart Cursor if prompted

### Manual Installation (if automatic fails)
```bash
# The extension should install automatically, but if needed:
# Download from: https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh
```

---

## Step 2: SSH Key Setup

### Create SSH Directory
```bash
# On Windows
mkdir ~/.ssh
# On macOS/Linux
mkdir -p ~/.ssh
chmod 700 ~/.ssh
```

### Install SSH Keys
Create the following files in your `~/.ssh/` directory:

#### Private Key: `~/.ssh/jonar_key`
```
-----BEGIN OPENSSH PRIVATE KEY-----
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
-----END OPENSSH PRIVATE KEY-----
```

#### Public Key: `~/.ssh/jonar_key.pub`
```
ssh-rsa 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 jonar@runeframe
```

### Set Proper Permissions
```bash
# On Windows (PowerShell)
icacls ~/.ssh/jonar_key /inheritance:r /grant:r "%USERNAME%:F"

# On macOS/Linux
chmod 600 ~/.ssh/jonar_key
chmod 644 ~/.ssh/jonar_key.pub
```

---

## Step 3: SSH Configuration

### Create SSH Config File
Create `~/.ssh/config` with the following content:

```
# Jonar Infrastructure - Primary Control Plane
Host jonar-sherlock
    HostName sherlock.pedantictheory.com
    User jonar
    IdentityFile ~/.ssh/jonar_key
    PubkeyAuthentication yes
    PreferredAuthentications publickey
    ServerAliveInterval 60
    ServerAliveCountMax 3

# Jonar Infrastructure - GPU Worker Node 1
Host jonar-watson
    HostName watson.pedantictheory.com
    User jonar
    IdentityFile ~/.ssh/jonar_key
    PubkeyAuthentication yes
    PreferredAuthentications publickey
    ServerAliveInterval 60
    ServerAliveCountMax 3

# Jonar Infrastructure - GPU Worker Node 2
Host jonar-adler
    HostName adler.pedantictheory.com
    User jonar
    IdentityFile ~/.ssh/jonar_key
    PubkeyAuthentication yes
    PreferredAuthentications publickey
    ServerAliveInterval 60
    ServerAliveCountMax 3

# Jonar Infrastructure - All nodes (for bulk operations)
Host jonar-*
    User jonar
    IdentityFile ~/.ssh/jonar_key
    PubkeyAuthentication yes
    PreferredAuthentications publickey
    ServerAliveInterval 60
    ServerAliveCountMax 3
```

---

## Step 4: Test SSH Connection

### Test Connection
```bash
# Test connection to control plane
ssh jonar-sherlock

# Verify kubectl access
kubectl get nodes
kubectl get pods --all-namespaces
```

### Expected Output
```
Welcome to Ubuntu 22.04.3 LTS (GNU/Linux 5.15.0-88-generic x86_64)
jonar@sherlock:~$
```

---

## Step 5: Cursor Remote-SSH Setup

### Connect to Sherlock Cluster
1. Open Cursor IDE
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS)
3. Type "Remote-SSH: Connect to Host"
4. Select `jonar-sherlock`
5. Choose platform (Linux)
6. Enter password if prompted (should not be needed with key auth)

### Alternative Connection Method
1. Press `Ctrl+Shift+P`
2. Type "Remote-SSH: Open SSH Configuration File"
3. Add the sherlock configuration manually
4. Use "Remote-SSH: Connect to Host" to connect

---

## Step 6: Development Environment Setup

### Access RuneFrameOS Repository
```bash
# Navigate to RuneFrameOS directory
cd /home/jonar/RuneFrameOS

# List available projects
ls -la

# Access specific components
cd distilera-new
cd ../ecosystem
cd ../infrastructure
```

### Available Namespaces
- **runeframeos**: Main application namespace
- **observability**: Monitoring and logging
- **postgresql**: Database infrastructure
- **cert-manager**: SSL certificate management

### Useful Commands
```bash
# Check cluster status
kubectl get nodes
kubectl get pods --all-namespaces

# Check specific namespace
kubectl get pods -n runeframeos
kubectl get pods -n observability

# View logs
kubectl logs -n runeframeos <pod-name>
kubectl logs -n observability elasticsearch-<pod-id>

# Port forwarding for local development
kubectl port-forward -n runeframeos svc/<service-name> 8080:80
```

---

## Step 7: Documentation Access

### Download Documentation Package
The complete RuneFrameOS documentation package is available on the sherlock cluster:

```bash
# Access documentation package
cd /home/jonar/RuneFrameOS
ls runeframeos_documentation_package.zip

# Extract if needed
unzip runeframeos_documentation_package.zip
```

### Key Documentation Files
- `context_use.yaml` - Quick reference guide
- `CHANGES.md` - Change tracking system
- `ROADMAP.md` - Strategic development roadmap
- `state.yaml` - Context-aware state management
- `best_practices/` - Development standards
- `instructions/` - Operational procedures
- `documentation/` - Research and architecture docs

---

## Step 8: Security and Compliance

### Access Limitations
- **Read/Write**: Development namespaces only
- **Monitoring**: All access logged and audited
- **Temporary**: 30-day review cycle
- **Secure**: Key-based authentication only

### Compliance Requirements
- Follow NIST SSDF principles
- Maintain SOC 2 compliance
- Adhere to CISA Secure by Design
- Document all changes in `CHANGES.md`

### Security Best Practices
- Never share SSH keys
- Use secure connections only
- Follow file naming standards
- Maintain audit trails
- Report security incidents immediately

---

## Troubleshooting

### Common Issues

#### SSH Connection Failed
```bash
# Test basic connectivity
ping sherlock.pedantictheory.com

# Test SSH with verbose output
ssh -v jonar-sherlock

# Check key permissions
ls -la ~/.ssh/jonar_key*
```

#### Cursor Remote-SSH Issues
1. Restart Cursor IDE
2. Reinstall Remote-SSH extension
3. Clear SSH known_hosts if needed
4. Check firewall settings

#### Kubernetes Access Issues
```bash
# Check kubectl configuration
kubectl config view

# Test cluster access
kubectl cluster-info

# Check namespace access
kubectl auth can-i get pods -n runeframeos
```

### Support Contacts
- **Infrastructure Issues**: System Administrator
- **Security Concerns**: Security Team
- **Development Questions**: Lead Developer

---

## Quick Reference

### Essential Commands
```bash
# Connect to cluster
ssh jonar-sherlock

# Check cluster status
kubectl get nodes

# View applications
kubectl get pods --all-namespaces

# Access RuneFrameOS
cd /home/jonar/RuneFrameOS

# View documentation
cat context_use.yaml
```

### Important Files
- `~/.ssh/jonar_key` - Private SSH key
- `~/.ssh/config` - SSH configuration
- `/home/jonar/RuneFrameOS/` - Main repository
- `context_use.yaml` - Quick reference guide

### Security Reminders
- ✅ SSH key-based authentication
- ✅ Limited access scope
- ✅ All actions logged
- ✅ 30-day review cycle
- ✅ Compliance maintained

---

## Next Steps

1. **Complete Setup**: Follow all steps above
2. **Test Access**: Verify SSH and kubectl access
3. **Download Documentation**: Access the documentation package
4. **Review Standards**: Read `best_practices/` and `instructions/`
5. **Begin Development**: Start working on front-end components
6. **Maintain Security**: Follow all security guidelines

---

*This setup guide is part of Security Exception #001 and must be reviewed every 30 days.*
