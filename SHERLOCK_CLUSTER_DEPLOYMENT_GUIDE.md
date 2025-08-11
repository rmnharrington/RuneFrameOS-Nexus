# 🚀 SHERLOCK CLUSTER DEPLOYMENT GUIDE
## Machine File for AI Agent - NEVER FORGET THESE INSTRUCTIONS

---

## ⚠️ **CRITICAL REMINDER - ALWAYS USE JONAR USER**
**NEVER use `wee@` - ALWAYS use `jonar@` for cluster access**

---

## 🔑 **Cluster Access Information**

### **Primary Access Method**
```bash
# ALWAYS use jonar user, never wee
ssh jonar@sherlock.pedantictheory.com
ssh jonar@watson.pedantictheory.com  
ssh jonar@adler.pedantictheory.com
```

### **Cluster Details**
- **Control Plane**: `sherlock.pedantictheory.com` (172.18.254.35)
- **Worker Node 1**: `watson.pedantictheory.com` (172.18.254.36)
- **Worker Node 2**: `adler.pedantictheory.com` (172.18.254.37)
- **Target Domain**: `paul.pedantictheory.com` (172.18.254.40)

### **SSH Keys Location**
- **Private Key**: `C:\Users\Wee\.ssh\jonar_cluster`
- **Public Key**: `C:\Users\Wee\.ssh\jonar_cluster.pub`
- **User**: `jonar` (NOT wee)

---

## 📦 **DEPLOYMENT PROCEDURE - ALWAYS FOLLOW**

### **Step 1: Package Files Before Transfer**
```bash
# NEVER transfer individual files - ALWAYS package first
# Create deployment package
tar -czf deployment_package.tar.gz ./src ./config ./deploy
# OR use zip for Windows
Compress-Archive -Path "./src", "./config", "./deploy" -DestinationPath "deployment_package.zip"
```

### **Step 2: SCP Transfer to Cluster**
```bash
# Transfer packaged files to control plane
scp -i "C:\Users\Wee\.ssh\jonar_cluster" deployment_package.tar.gz jonar@sherlock.pedantictheory.com:/tmp/

# OR for Windows PowerShell
scp -i "C:\Users\Wee\.ssh\jonar_cluster" deployment_package.zip jonar@sherlock.pedantictheory.com:/tmp/
```

### **Step 3: Extract and Deploy on Cluster**
```bash
# SSH to cluster
ssh jonar@sherlock.pedantictheory.com

# Extract package
cd /tmp
tar -xzf deployment_package.tar.gz
# OR for zip
unzip deployment_package.zip

# Proceed with deployment
```

---

## 🚫 **NEVER DO THESE THINGS**

1. **❌ NEVER use `wee@` user** - Always use `jonar@`
2. **❌ NEVER transfer individual files** - Always package first
3. **❌ NEVER forget to use the correct SSH key** (`jonar_cluster`)
4. **❌ NEVER assume SSH aliases work** - Use full hostnames
5. **❌ NEVER deploy without packaging** - This causes deployment failures

---

## ✅ **ALWAYS DO THESE THINGS**

1. **✅ ALWAYS use `jonar@` for cluster access**
2. **✅ ALWAYS package files before SCP transfer**
3. **✅ ALWAYS use full hostnames** (`sherlock.pedantictheory.com`)
4. **✅ ALWAYS use correct SSH key** (`jonar_cluster`)
5. **✅ ALWAYS verify connection before deployment**

---

## 🔍 **Quick Health Checks**

### **Test Cluster Access**
```bash
ssh jonar@sherlock.pedantictheory.com 'echo "Connection successful"'
```

### **Check Cluster Status**
```bash
ssh jonar@sherlock.pedantictheory.com 'kubectl get nodes'
ssh jonar@sherlock.pedantictheory.com 'kubectl get pods --all-namespaces'
```

### **Verify SSH Key**
```bash
ssh -i "C:\Users\Wee\.ssh\jonar_cluster" jonar@sherlock.pedantictheory.com 'echo "SSH key working"'
```

---

## 📋 **Deployment Checklist**

Before every deployment, verify:
- [ ] Using `jonar@` user (NOT wee@)
- [ ] Files are packaged (tar.gz or zip)
- [ ] Using correct SSH key (`jonar_cluster`)
- [ ] Using full hostname (`sherlock.pedantictheory.com`)
- [ ] Connection test successful
- [ ] Cluster health verified

---

## 🆘 **Troubleshooting**

### **Connection Issues**
```bash
# Test basic SSH
ssh jonar@sherlock.pedantictheory.com

# Test with specific key
ssh -i "C:\Users\Wee\.ssh\jonar_cluster" jonar@sherlock.pedantictheory.com

# Check SSH config
Get-Content "C:\Users\Wee\.ssh\config"
```

### **Deployment Issues**
```bash
# Check cluster resources
ssh jonar@sherlock.pedantictheory.com 'kubectl get nodes'
ssh jonar@sherlock.pedantictheory.com 'kubectl get pods --all-namespaces'

# Check specific namespace
ssh jonar@sherlock.pedantictheory.com 'kubectl get pods -n <namespace>'
```

---

## 📝 **Notes for AI Agent**

- **File Created**: 2025-08-10
- **Purpose**: Machine file for Sherlock cluster deployment
- **Key Rule**: ALWAYS use `jonar@` user, NEVER `wee@`
- **Deployment Rule**: ALWAYS package files before SCP transfer
- **SSH Key**: `jonar_cluster` (located in `C:\Users\Wee\.ssh\`)

---

## 🔄 **Update Log**

- **2025-08-10**: Initial creation
- **Key Discovery**: Must use `jonar@` user, not `wee@`
- **Deployment Method**: Package files before SCP transfer
- **SSH Keys**: `jonar_cluster` and `jonar_cluster.pub`

---

**REMEMBER: This is your machine file. Reference it before EVERY deployment to the Sherlock cluster!**
