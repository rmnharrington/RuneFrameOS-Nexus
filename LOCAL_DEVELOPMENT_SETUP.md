# 🏠 RuneFrameOS Local Development Setup

This guide will help you run the entire RuneFrameOS ecosystem locally on your Windows machine using Docker Desktop.

## 🎯 **What You'll Get**

- **Nexus** (Port 3000) - Central hub for all applications
- **Distillara** (Port 3001) - Gaming & alchemy system
- **Core Admin** (Port 3002) - System administration
- **Feastwell** (Port 3003) - Food & recipe management
- **Hoardwell** (Port 3004) - Inventory & character management
- **BrokeUnicorn Tavern** (Port 3005) - Social hub
- **Shared Services** (Ports 4001-4003) - Authentication & APIs

## 🚀 **Quick Start**

### **Option 1: Automated Startup (Recommended)**
1. Make sure Docker Desktop is running
2. Open PowerShell in the `Code_Repository` directory
3. Run: `.\start-runeframeos.ps1`
4. Choose option 1 (Docker Compose)
5. Wait for all services to start
6. Open http://localhost:3000 in your browser

### **Option 2: Manual Startup**
1. Start Docker Desktop
2. Open PowerShell in the `Code_Repository` directory
3. Run: `docker-compose up -d`
4. Wait for all services to start
5. Open http://localhost:3000 in your browser

### **Option 3: Individual App Development**
1. Open multiple PowerShell windows
2. In each window, navigate to an app directory
3. Run `npm run dev` in each
4. Each app will run on its designated port

## 🐳 **Docker Setup**

### **Prerequisites**
- Docker Desktop for Windows
- At least 4GB RAM available for Docker
- Windows 10/11 with WSL2 support

### **Docker Commands**
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Restart a specific service
docker-compose restart nexus

# View running containers
docker-compose ps
```

## 📱 **Individual App Development**

### **Port Configuration**
Each app is configured to run on a specific port:

| Application | Port | Description |
|-------------|------|-------------|
| Nexus | 3000 | Main hub & navigation |
| Distillara | 3001 | Gaming system |
| Core Admin | 3002 | Administration |
| Feastwell | 3003 | Food management |
| Hoardwell | 3004 | Inventory system |
| BrokeUnicorn Tavern | 3005 | Social interface |
| Auth Service | 4001 | Authentication API |
| Core Service | 4002 | Core API |
| User Service | 4003 | User management API |

### **Starting Individual Apps**
```bash
# Navigate to app directory
cd RuneFrameOS-Nexus

# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

## 🔧 **Configuration Files**

### **Package.json Updates**
All apps have been updated with specific port configurations:
```json
{
  "scripts": {
    "dev": "next dev -p 3000",
    "start": "next start -p 3000"
  }
}
```

### **Docker Compose**
The `docker-compose.yml` file manages all services with:
- Port mapping
- Volume mounting for live development
- Network isolation
- Environment variables

## 🌐 **Accessing Your Applications**

### **Main Hub**
- **URL**: http://localhost:3000
- **Purpose**: Central navigation to all apps
- **Features**: Unified dashboard, app switching

### **Individual Apps**
- **Distillara**: http://localhost:3001
- **Core Admin**: http://localhost:3002
- **Feastwell**: http://localhost:3003
- **Hoardwell**: http://localhost:3004
- **BrokeUnicorn Tavern**: http://localhost:3005

### **API Services**
- **Auth Service**: http://localhost:4001
- **Core Service**: http://localhost:4002
- **User Service**: http://localhost:4003

## 🔍 **Troubleshooting**

### **Common Issues**

#### **Port Already in Use**
```bash
# Check what's using a port
netstat -ano | findstr :3000

# Kill the process
taskkill /PID <PID> /F
```

#### **Docker Issues**
```bash
# Restart Docker Desktop
# Clear Docker cache
docker system prune -a

# Rebuild containers
docker-compose build --no-cache
```

#### **Node Modules Issues**
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### **Performance Tips**
- **RAM**: Allocate at least 4GB to Docker Desktop
- **CPU**: Allocate at least 2 cores to Docker
- **Storage**: Use SSD for better performance
- **Background**: Close unnecessary applications

## 🚀 **Development Workflow**

### **1. Daily Development**
1. Start Docker Desktop
2. Run `docker-compose up -d`
3. Make changes to your code
4. Changes auto-reload in the browser
5. Test across all applications

### **2. Adding New Features**
1. Develop in individual app directories
2. Test locally on specific ports
3. Integrate through Nexus navigation
4. Update shared services as needed

### **3. Testing Integration**
1. Use Nexus as the central testing point
2. Navigate between apps using the sidebar
3. Test cross-app functionality
4. Verify shared services communication

## 📚 **Next Steps**

### **Immediate**
- [ ] Test the startup script
- [ ] Verify all apps are accessible
- [ ] Test navigation between apps
- [ ] Check shared services functionality

### **Short Term**
- [ ] Set up development database
- [ ] Configure environment variables
- [ ] Set up debugging tools
- [ ] Create development documentation

### **Long Term**
- [ ] Implement shared authentication
- [ ] Set up data synchronization
- [ ] Add monitoring and logging
- [ ] Create deployment pipelines

## 🆘 **Getting Help**

### **Local Development Issues**
- Check Docker Desktop status
- Verify port availability
- Review application logs
- Check network connectivity

### **Application Issues**
- Review browser console errors
- Check application logs
- Verify API service status
- Test individual app functionality

---

**Happy Coding! 🎉**

Your RuneFrameOS ecosystem is now running locally and ready for development!
