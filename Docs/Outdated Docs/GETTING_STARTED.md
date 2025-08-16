# 🚀 RuneFrameOS - Getting Started Guide

## 🎯 **Welcome to RuneFrameOS!**

This guide will help you get the RuneFrameOS gaming ecosystem up and running on your local machine in under 30 minutes. Whether you're a frontend developer, backend developer, or just curious about the project, this guide will get you started.

## 📋 **Prerequisites**

Before you begin, ensure you have the following installed:

### **Required Software**
- **Docker Desktop** - [Download here](https://www.docker.com/products/docker-desktop/)
- **Git** - [Download here](https://git-scm.com/downloads)
- **VS Code or Cursor** - [VS Code](https://code.visualstudio.com/) or [Cursor](https://cursor.sh/)

### **System Requirements**
- **Operating System**: Windows 10/11, macOS 10.15+, or Ubuntu 18.04+
- **RAM**: Minimum 8GB, Recommended 16GB+
- **Storage**: At least 5GB free space
- **Docker**: At least 4GB RAM allocated to Docker

## 🔧 **Step 1: Clone the Repository**

```bash
# Clone the repository
git clone <your-repository-url>
cd Code_Repository

# Verify you're in the right directory
ls
# You should see: RuneFrameOS-Nexus/, docker-compose.yml, etc.
```

## 🐳 **Step 2: Start the Ecosystem**

### **Option A: Start All Services (Recommended for first time)**
```bash
# Start all RuneFrameOS services
docker-compose up -d

# Check that all services are running
docker-compose ps
```

**Expected Output**: You should see 10 services running:
- nexus (Port 3000)
- distillara (Port 3001)
- core (Port 3002)
- feastwell (Port 3003)
- hoardwell (Port 3004)
- tavern (Port 3005)
- scriptoria (Port 3006)
- auth-service (Port 4001)
- core-service (Port 4002)
- user-service (Port 4003)

### **Option B: Start Individual Services**
```bash
# Start just the main Nexus hub
docker-compose up -d nexus

# Start a specific app
docker-compose up -d distillara
```

## 🌐 **Step 3: Access Your Applications**

Once all services are running, you can access them in your browser:

### **Main Applications**
- **Nexus Hub**: http://localhost:3000 (Main dashboard)
- **Distillara**: http://localhost:3001 (Alchemy system)
- **Feastwell**: http://localhost:3003 (Cooking system)
- **Hoardwell**: http://localhost:3004 (Inventory management)
- **Broke Unicorn Tavern**: http://localhost:3005 (Social hub)
- **Scriptoria**: http://localhost:3006 (Gaming systems)

### **Backend Services**
- **Auth Service**: http://localhost:4001
- **Core Service**: http://localhost:4002
- **User Service**: http://localhost:4003

## 🎮 **Step 4: Explore the Ecosystem**

1. **Open Nexus Hub** (http://localhost:3000)
2. **Click "Add Modules"** in the left sidebar
3. **Subscribe to modules** you want to explore
4. **Click "Connect"** on modules to establish connections
5. **Click "Open in Nexus"** to view modules within the dashboard

## 🛠️ **Step 5: Development Workflow**

### **Making Changes to an App**
```bash
# Navigate to the app you want to modify
cd RuneFrameOS-Nexus

# Install dependencies (if needed)
npm install

# Start development mode
npm run dev
```

### **Rebuilding After Changes**
```bash
# Stop the service
docker-compose stop nexus

# Rebuild and start
docker-compose up --build -d nexus
```

### **Viewing Logs**
```bash
# View logs for a specific service
docker-compose logs -f nexus

# View logs for all services
docker-compose logs -f
```

## 🔍 **Step 6: Verify Everything is Working**

### **Health Checks**
- **Nexus Dashboard**: Should show module cards with connection status
- **Module Integration**: "Open in Nexus" buttons should work
- **Navigation**: Left sidebar should be visible and functional
- **Responsive Design**: Try resizing your browser window

### **Common Success Indicators**
- ✅ All 10 services show "Up" status in `docker-compose ps`
- ✅ Nexus loads at http://localhost:3000
- ✅ Module cards display with background images
- ✅ "Add Modules" modal opens and shows available modules
- ✅ Left sidebar navigation works on all screen sizes

## 🚨 **Troubleshooting Common Issues**

### **Docker Issues**
```bash
# Check Docker status
docker info

# Restart Docker Desktop if needed
# Then restart services
docker-compose down
docker-compose up -d
```

### **Port Conflicts**
```bash
# Check what's using a port
netstat -an | findstr :3000  # Windows
lsof -i :3000                 # macOS/Linux

# If port is in use, stop the conflicting service
```

### **Service Won't Start**
```bash
# Check service logs
docker-compose logs [service-name]

# Common issues:
# - Port already in use
# - Insufficient Docker memory
# - Missing environment variables
```

### **Build Errors**
```bash
# Clean and rebuild
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## 📚 **Next Steps**

Once you have the ecosystem running:

1. **Read the Documentation**:
   - `SERVER_SETUP_ARCHITECTURE.md` - Complete system overview
   - `GUI_DESIGN_SPECIFICATION.md` - Design standards
   - `CONTRIBUTING.md` - How to contribute

2. **Explore the Codebase**:
   - Start with `RuneFrameOS-Nexus/src/components/core/`
   - Look at `AppLayout.tsx` for main structure
   - Examine `Dashboard.tsx` for module management

3. **Join Development**:
   - Check the project roadmap in `README.md`
   - Look for issues or features to work on
   - Set up your development environment

## 🆘 **Need Help?**

### **Before Asking for Help**
1. ✅ Check this guide thoroughly
2. ✅ Check the troubleshooting section
3. ✅ Look at service logs with `docker-compose logs`
4. ✅ Verify Docker has enough resources

### **When Asking for Help**
Include:
- What you're trying to do
- What error you're seeing
- Your operating system
- Docker version (`docker --version`)
- Service logs (`docker-compose logs [service-name]`)

## 🎉 **Congratulations!**

You now have the entire RuneFrameOS gaming ecosystem running locally! You can:
- Explore different gaming applications
- Understand the modular architecture
- Start developing new features
- Contribute to the project

---

**Last Updated**: Current Development Session  
**Status**: Complete setup guide for new developers  
**Next**: Read `CONTRIBUTING.md` to learn how to contribute
