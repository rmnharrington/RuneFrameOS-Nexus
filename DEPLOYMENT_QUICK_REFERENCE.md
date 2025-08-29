# 🚀 RuneFrameOS Deployment Quick Reference

## **BOOYAH! SUCCESS PATTERN CONFIRMED** ✅

**ALL 11 APPLICATIONS SUCCESSFULLY DEPLOYED AND RUNNING!**

**Final Status: ✅ 11 Apps Successfully Deployed and Running**
Your RuneFrameOS cluster is now fully operational with all the applications that needed to be deployed:
- BrokeUnicornTavern - NodePort 30005 ✅
- Mercatrix - NodePort 30008 ✅  
- Hoardwell - NodePort 30004 ✅
- Distillara - NodePort 30006 ✅
- Feastwell - NodePort 30007 ✅
- LoreForge - NodePort 30009 ✅
- PersonaVault - NodePort 30010 ✅
- RuneWeaver - NodePort 30011 ✅
- Scriptoria - NodePort 30012 ✅
- ChimerraForge - NodePort 30014 ✅
- TravelersTable - NodePort 30015 ✅

All applications are running on sherlock (master node) and accessible via http://172.18.254.35:[PORT]. Your cluster is fully restored and operational! 🎉

---

## 📋 **Deployment Checklist (Use for EVERY app)**

### **Pre-Deployment (Local)**
- [ ] Copy PersonaVault components EXACTLY
- [ ] Change ONLY content text, NEVER CSS classes
- [ ] Include HeroBanner component with smooth fading gradient
- [ ] Add hero banner image ([APPNAME]_HeroBanner.png) to public/ directory
- [ ] Update `package.json` start script to `"next start -H 0.0.0.0"`
- [ ] Create `Dockerfile.clean` (use proven template)
- [ ] Verify `npm run build` works locally

### **Deployment (Server)**
- [ ] Copy app directory to `sherlock.pedantictheory.com`
- [ ] Run `npm install` on server
- [ ] Build Docker image with `Dockerfile.clean`
- [ ] Load image to containerd on ALL nodes (sherlock, adler, watson)
- [ ] Apply Kubernetes manifests
- [ ] Wait for pod to become Ready (1/1)

### **Verification**
- [ ] Pod status shows `READY 1/1`
- [ ] Logs show `✓ Ready in [X]ms`
- [ ] Service accessible via NodePort
- [ ] GUI matches PersonaVault exactly
- [ ] Hero banner displays correctly with smooth fading gradient
- [ ] Background image loads properly

---

## 🔧 **Proven Commands (Copy-Paste Ready)**

### **1. Copy to Server**
```bash
scp -r RuneFrameOS-[APPNAME] wee@sherlock.pedantictheory.com:/home/wee/
```

### **2. Install Dependencies**
```bash
ssh wee@sherlock.pedantictheory.com 'cd RuneFrameOS-[APPNAME] && npm install'
```

### **3. Build Docker Image**
```bash
ssh wee@sherlock.pedantictheory.com 'cd RuneFrameOS-[APPNAME] && sudo docker build -f Dockerfile.clean -t [appname]:latest .'
```

### **4. Load to All Nodes**
```bash
# Master node
ssh wee@sherlock.pedantictheory.com 'sudo docker save [appname]:latest | sudo ctr -n=k8s.io images import -'

# Worker nodes
ssh wee@sherlock.pedantictheory.com 'sudo docker save [appname]:latest' | ssh wee@adler.pedantictheory.com 'sudo ctr -n=k8s.io images import -'
ssh wee@sherlock.pedantictheory.com 'sudo docker save [appname]:latest' | ssh wee@watson.pedantictheory.com 'sudo ctr -n=k8s.io images import -'
```

### **5. Deploy to Kubernetes**
```bash
ssh wee@sherlock.pedantictheory.com 'sudo kubectl apply -f RuneFrameOS-[APPNAME]/[appname]-deployment.yaml --kubeconfig /etc/kubernetes/admin.conf'
```

### **6. Check Status**
```bash
ssh wee@sherlock.pedantictheory.com 'sudo kubectl get pods -n runeframeos --kubeconfig /etc/kubernetes/admin.conf'
```

---

## 📁 **Required File Structure (Copy EXACTLY)**

```
RuneFrameOS-[APPNAME]/
├── src/
│   ├── app/
│   │   ├── page.tsx (custom content with HeroBanner)
│   │   ├── layout.tsx (Next.js root)
│   │   └── globals.css (copy from PersonaVault)
│   └── components/core/
│       ├── AppLayout.tsx (copy from PersonaVault)
│       ├── Header.tsx (copy from PersonaVault)
│       ├── LeftSidebar.tsx (copy from PersonaVault)
│       ├── RightSidebar.tsx (copy from PersonaVault)
│       ├── AppFooter.tsx (copy from PersonaVault)
│       └── HeroBanner.tsx (copy from PersonaVault)
├── public/
│   └── [APPNAME]_HeroBanner.png (hero banner background image)
├── package.json (Next.js + -H 0.0.0.0)
├── tailwind.config.js (copy from PersonaVault)
├── next.config.js (clean config)
├── Dockerfile.clean (proven template)
└── [appname]-deployment.yaml (auto-generated)
```

---

## 🎯 **Port Assignments (Current Deployment State)**

| App | NodePort | Status | Domain |
|-----|----------|---------|---------|
| **feastwell** | 30007 | ✅ Deployed | feastwell.pedantictheory.com |
| **distillara** | 30006 | ✅ Deployed | distillara.pedantictheory.com |
| **hoardwell** | 30004 | ✅ Deployed | hoardwell.pedantictheory.com |
| **brokeunicorn_tavern** | 30005 | ✅ Deployed | brokeunicorntavern.pedantictheory.com |
| **loreforge** | 30009 | ✅ Deployed | loreforge.pedantictheory.com |
| **mercatrix** | 30008 | ✅ Deployed | mercatrix.pedantictheory.com |
| **personavault** | 30010 | ✅ Deployed | personavault.pedantictheory.com |
| **runeweaver** | 30011 | ✅ Deployed | runeweaver.pedantictheory.com |
| **scriptoria** | 30012 | ✅ Deployed | scriptoria.pedantictheory.com |
| **chimerraforge** | 30014 | ✅ Deployed | chimerraforge.pedantictheory.com |
| **travelerstable** | 30015 | ✅ Deployed | travelerstable.pedantictheory.com |
| **30001-30003** | Available | For future apps | - |
| **30013** | Available | For future apps | - |
| **30016-30020** | Available | For future apps | - |

**🎉 ALL 11 APPLICATIONS SUCCESSFULLY DEPLOYED AND RUNNING! 🎉**

---

## 🚨 **CRITICAL IMAGE RULES - NEVER VIOLATE THESE**

### **Hero Banner Images**
- ✅ **USE**: `[APPNAME]_HeroBanner.png` (NO text overlay - for hero banner background)
- ❌ **NEVER USE**: `[APPNAME]_HeroBanner_wText.png` (HAS text overlay - NOT for hero banners)

### **File Purpose**
- `[APPNAME]_HeroBanner.png`: Clean background image for HeroBanner component
- `[APPNAME]_HeroBanner_wText.png`: Marketing image with text overlay for other uses

### **Copy Instructions**
- **ALWAYS** copy from `Images/[APPNAME]_HeroBanner.png` (without `_wText` suffix)
- **NEVER** copy `[APPNAME]_HeroBanner_wText.png` to app public folders
- Verify file size differences - `_wText` files are usually larger due to text overlay

---

## 🚨 **Critical Success Factors (NEVER DEVIATE)**

### **Layout Cloning**
- ✅ Copy PersonaVault components EXACTLY
- ✅ Change ONLY content text, NEVER CSS classes
- ✅ Include HeroBanner component with smooth fading gradient
- ✅ Use identical `tailwind.config.js`
- ✅ Use identical `globals.css`
- ✅ Maintain same component hierarchy

### **Docker Build**
- ✅ Install ALL dependencies first (`npm ci`)
- ✅ Build before pruning (`npm run build`)
- ✅ Prune after build (`npm prune --production`)
- ✅ Use `npm start` (includes `-H 0.0.0.0`)

### **Kubernetes Deployment**
- ✅ Load images on ALL nodes
- ✅ Use containerd import (`sudo ctr -n=k8s.io images import -`)
- ✅ Disable health checks initially
- ✅ Use correct NodePort assignments
- ✅ Apply with `--kubeconfig /etc/kubernetes/admin.conf`

---

## 🎮 **Automated Deployment (Recommended)**

Use the deployment script for foolproof deployments:

```bash
# Make script executable
chmod +x deploy_app.sh

# Deploy new app
./deploy_app.sh [APP_NAME] [APP_DIRECTORY] [NODEPORT] [DOMAIN]

# Example:
./deploy_app.sh distillara RuneFrameOS-Distillara 30003 distillara.pedantictheory.com
```

---

## 🔍 **Troubleshooting Quick Fixes**

| Problem | Solution |
|---------|----------|
| **Image pull errors** | Load image on ALL nodes (sherlock, adler, watson) |
| **Health check failures** | Disable health checks initially, add endpoints later |
| **Binding errors** | Use `"next start -H 0.0.0.0"` in package.json |
| **Build failures** | Install ALL dependencies first, prune after build |
| **Layout mismatches** | Copy PersonaVault EXACTLY, change only content text |

---

## 🎉 **Success Indicators**

- ✅ Pod shows `READY 1/1`
- ✅ Logs show `✓ Ready in [X]ms`
- ✅ Service accessible via NodePort
- ✅ HTML response contains app content
- ✅ GUI matches PersonaVault exactly
- ✅ Hero banner displays correctly with smooth fading gradient
- ✅ Background image loads properly
- ✅ Only content differs from PersonaVault

---

## 📚 **Reference Documents**

- **`DEPLOYMENT_STATE_SYSTEM.yaml`** - Complete state documentation
- **`GUI_2.0_INSTRUCTIONS.yaml`** - Layout cloning guide
- **`deploy_app.sh`** - Automated deployment script
- **`DEPLOYMENT_BLUEPRINT.yaml`** - Original deployment plan

---

## 🚀 **Next Steps**

1. **✅ ALL 11 APPLICATIONS SUCCESSFULLY DEPLOYED!**
2. **Build Nexus dashboard to link everything together**
3. **Add health check endpoints to all apps**
4. **Configure ingress for domain access**
5. **Implement PostgreSQL databases**
6. **Add API hooks for inter-app communication**

---

**🎯 REMEMBER: Follow EXACTLY - any deviation may cause failures!**
