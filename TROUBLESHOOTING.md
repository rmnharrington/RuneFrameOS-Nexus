# 🔧 RuneFrameOS Troubleshooting Guide

## 🎯 **Overview**

This guide provides solutions to common issues you might encounter while developing with the RuneFrameOS ecosystem. Each section includes diagnostic steps, solutions, and prevention tips.

## 🚨 **Emergency Quick Fixes**

### **If Nothing is Working**
```bash
# Nuclear option - restart everything
docker-compose down
docker system prune -a -f
docker-compose up -d
```

### **If Services Won't Start**
```bash
# Check Docker status
docker info

# Restart Docker Desktop completely
# Then restart services
docker-compose up -d
```

## 🐳 **Docker Issues**

### **Service Won't Start**

#### **Symptoms**
- Service shows "Exit" status in `docker-compose ps`
- Error messages in `docker-compose logs [service-name]`
- Port already in use errors

#### **Diagnostic Steps**
```bash
# Check service status
docker-compose ps

# Check service logs
docker-compose logs [service-name]

# Check port usage
netstat -an | findstr :3000  # Windows
lsof -i :3000                 # macOS/Linux
```

#### **Solutions**

**Port Conflict**
```bash
# Find what's using the port
netstat -an | findstr :3000

# Kill the conflicting process
taskkill /PID <PID> /F        # Windows
kill -9 <PID>                 # macOS/Linux

# Restart the service
docker-compose restart [service-name]
```

**Service Build Failure**
```bash
# Clean build
docker-compose stop [service-name]
docker-compose build --no-cache [service-name]
docker-compose up -d [service-name]

# Check Dockerfile syntax
docker build -t test-image ./[service-directory]
```

**Volume Mount Issues**
```bash
# Check volume permissions
docker-compose exec [service-name] ls -la /app

# Fix permissions
docker-compose exec [service-name] chown -R node:node /app

# Restart with fresh volumes
docker-compose down -v
docker-compose up -d
```

### **Container Resource Issues**

#### **Symptoms**
- Containers crash or restart frequently
- High memory usage warnings
- Slow performance

#### **Diagnostic Steps**
```bash
# Check resource usage
docker stats

# Check container logs
docker-compose logs -f [service-name]

# Check system resources
docker system df
```

#### **Solutions**

**Increase Docker Memory**
1. Open Docker Desktop
2. Go to Settings > Resources
3. Increase Memory to 8GB+
4. Apply & Restart

**Clean Up Docker**
```bash
# Remove unused containers, images, networks
docker system prune -a

# Remove specific unused resources
docker container prune
docker image prune
docker network prune
docker volume prune
```

**Optimize Container Resources**
```yaml
# In docker-compose.yml
services:
  nexus:
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: '1.0'
        reservations:
          memory: 1G
          cpus: '0.5'
```

### **Network Issues**

#### **Symptoms**
- Services can't communicate with each other
- Connection refused errors
- Services can't reach external APIs

#### **Diagnostic Steps**
```bash
# Check network status
docker network ls
docker network inspect code_repository_runeframeos-network

# Test inter-service communication
docker-compose exec nexus ping auth-service
docker-compose exec nexus curl http://auth-service:4001/api/health
```

#### **Solutions**

**Network Reset**
```bash
# Remove and recreate network
docker-compose down
docker network rm code_repository_runeframeos-network
docker-compose up -d
```

**Check Network Configuration**
```bash
# Verify network exists
docker network ls | grep runeframeos

# Inspect network details
docker network inspect code_repository_runeframeos-network
```

## 🌐 **Application Issues**

### **Hot Reload Not Working**

#### **Symptoms**
- Code changes don't appear in browser
- Manual refresh required
- No console messages about file changes

#### **Diagnostic Steps**
```bash
# Check if volumes are mounted
docker-compose exec nexus ls -la /app

# Check file permissions
docker-compose exec nexus ls -la /app/src

# Check service logs
docker-compose logs -f nexus
```

#### **Solutions**

**Volume Mount Issues**
```bash
# Restart service
docker-compose restart nexus

# Check docker-compose.yml volumes
volumes:
  - ./RuneFrameOS-Nexus:/app
  - /app/node_modules
```

**File Permission Issues**
```bash
# Fix permissions
docker-compose exec nexus chown -R node:node /app
docker-compose exec nexus chmod -R 755 /app

# Restart service
docker-compose restart nexus
```

**Next.js Configuration**
```javascript
// In next.config.js
module.exports = {
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }
    return config
  },
}
```

### **Module Integration Issues**

#### **Symptoms**
- "Connect" button doesn't work
- Module status shows "down"
- "Open in Nexus" button not functional

#### **Diagnostic Steps**
```bash
# Check module health
curl http://localhost:3001/api/health
curl http://localhost:3001/api/module-info

# Check browser console for errors
# Check Network tab for failed requests
```

#### **Solutions**

**API Endpoint Issues**
```bash
# Verify required endpoints exist
curl http://localhost:3001/api/health
curl http://localhost:3001/api/module-info
curl http://localhost:3001/api/status

# Check module is running
docker-compose ps | grep distillara
```

**CORS Issues**
```javascript
// In module's server configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
```

**Module Connection Logic**
```typescript
// Check connection logic in Dashboard.tsx
const handleConnect = async (module: Module) => {
  try {
    const response = await fetch(`${module.url}/api/module-info`);
    if (response.ok) {
      // Connection successful
    }
  } catch (error) {
    console.error('Connection failed:', error);
  }
};
```

### **Responsive Design Issues**

#### **Symptoms**
- Sidebars disappear on mobile
- Grid layouts break on tablet
- Content overlaps with navigation

#### **Diagnostic Steps**
```bash
# Test responsive behavior
# Resize browser window
# Use browser dev tools device simulation
# Check Tailwind classes
```

#### **Solutions**

**Sidebar Visibility Issues**
```tsx
// Ensure left sidebar is always visible
<div className="w-48 lg:w-56 flex-shrink-0">
  <LeftSidebar />
</div>

// Right sidebar hidden on mobile
<div className="hidden lg:block w-64 flex-shrink-0">
  <RightSidebar />
</div>
```

**Grid Layout Issues**
```tsx
// Use correct responsive grid pattern
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
  {/* Content */}
</div>
```

**Fixed Positioning Issues**
```tsx
// NEVER use fixed positioning for sidebars
// ❌ WRONG
<div className="fixed left-0 top-20 w-48">

// ✅ CORRECT
<div className="relative w-48 lg:w-56">
```

## 🔍 **Performance Issues**

### **Slow Build Times**

#### **Symptoms**
- `docker-compose build` takes forever
- npm install is very slow
- Container startup is sluggish

#### **Solutions**

**Optimize Dockerfile**
```dockerfile
# Use multi-stage builds
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS runtime
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

**Use Build Cache**
```bash
# Enable BuildKit
export DOCKER_BUILDKIT=1
docker-compose build

# Use .dockerignore
node_modules
.next
.git
```

**Optimize npm**
```bash
# Use npm cache
npm config set cache ~/.npm-cache

# Use faster registry
npm config set registry https://registry.npmjs.org/
```

### **High Memory Usage**

#### **Symptoms**
- Docker uses excessive RAM
- System becomes slow
- Out of memory errors

#### **Solutions**

**Limit Container Resources**
```yaml
# In docker-compose.yml
services:
  nexus:
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: '1.0'
```

**Optimize Node.js**
```javascript
// In package.json scripts
{
  "scripts": {
    "dev": "NODE_OPTIONS='--max-old-space-size=1024' next dev",
    "build": "NODE_OPTIONS='--max-old-space-size=2048' next build"
  }
}
```

**Clean Up Regularly**
```bash
# Clean Docker resources
docker system prune -a

# Clean npm cache
npm cache clean --force

# Remove unused images
docker image prune -a
```

## 🧪 **Testing Issues**

### **Tests Won't Run**

#### **Symptoms**
- `npm test` fails
- Jest configuration errors
- Test environment not set up

#### **Solutions**

**Install Testing Dependencies**
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

**Create Jest Configuration**
```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
};
```

**Create Jest Setup**
```javascript
// jest.setup.js
import '@testing-library/jest-dom';
```

### **API Tests Failing**

#### **Symptoms**
- Integration tests fail
- Mock API calls don't work
- Test environment variables missing

#### **Solutions**

**Set Up Test Environment**
```bash
# Create .env.test
NODE_ENV=test
API_URL=http://localhost:4001
JWT_SECRET=test-secret
```

**Mock API Calls**
```javascript
// In test files
jest.mock('../api', () => ({
  fetchModuleInfo: jest.fn(() => Promise.resolve({ success: true }))
}));
```

## 🔐 **Authentication Issues**

### **JWT Token Problems**

#### **Symptoms**
- 401 Unauthorized errors
- Token expiration issues
- Login not working

#### **Solutions**

**Check Token Validity**
```bash
# Decode JWT token
echo "your.jwt.token" | cut -d. -f2 | base64 -d

# Check token expiration
# Look for "exp" field in decoded token
```

**Verify JWT Secret**
```bash
# Check environment variable
docker-compose exec auth-service env | grep JWT_SECRET

# Restart service if secret changed
docker-compose restart auth-service
```

**Token Refresh Logic**
```typescript
// Implement automatic token refresh
const refreshToken = async () => {
  try {
    const response = await fetch('/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: getRefreshToken() })
    });
    // Handle new token
  } catch (error) {
    // Redirect to login
  }
};
```

## 📱 **Mobile/Tablet Issues**

### **Touch Interaction Problems**

#### **Symptoms**
- Buttons don't respond to touch
- Scrolling is jerky
- Tap targets too small

#### **Solutions**

**Touch-Friendly Sizing**
```tsx
// Minimum 44px touch targets
<button className="min-h-[44px] min-w-[44px] p-3">
  Click Me
</button>
```

**Touch Event Handling**
```tsx
// Add touch event handlers
<button 
  onTouchStart={handleTouchStart}
  onTouchEnd={handleTouchEnd}
  className="touch-manipulation"
>
  Touch Me
</button>
```

**Mobile-Specific Styles**
```tsx
// Use mobile-first responsive design
<div className="p-2 md:p-4 lg:p-6">
  <button className="w-full md:w-auto">
    Mobile Optimized
  </button>
</div>
```

## 🚀 **Deployment Issues**

### **Production Build Problems**

#### **Symptoms**
- Build fails in production
- Environment variables missing
- Static assets not found

#### **Solutions**

**Environment Variables**
```bash
# Create production .env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.runeframeos.com
NEXT_PUBLIC_AUTH_URL=https://auth.runeframeos.com
```

**Build Optimization**
```javascript
// In next.config.js
module.exports = {
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
}
```

**Static Asset Handling**
```javascript
// Ensure images are in public folder
// Use correct image paths
<img src="/BrokeUnicornTavern.png" alt="Tavern" />
```

## 📊 **Monitoring & Debugging**

### **Log Analysis**

#### **View Service Logs**
```bash
# Real-time logs
docker-compose logs -f [service-name]

# Last 100 lines
docker-compose logs --tail=100 [service-name]

# Logs with timestamps
docker-compose logs -t [service-name]
```

#### **Common Log Patterns**
```bash
# Look for these patterns
grep "ERROR" docker-compose logs [service-name]
grep "WARN" docker-compose logs [service-name]
grep "Exception" docker-compose logs [service-name]
```

### **Performance Monitoring**

#### **Docker Stats**
```bash
# Monitor resource usage
docker stats

# Monitor specific service
docker stats [service-name]
```

#### **Application Metrics**
```bash
# Check health endpoints
curl http://localhost:4002/api/metrics
curl http://localhost:4002/api/health
```

## 🆘 **Getting Help**

### **Before Asking for Help**

1. ✅ **Check this troubleshooting guide**
2. ✅ **Check service logs** with `docker-compose logs`
3. ✅ **Verify Docker status** with `docker info`
4. ✅ **Test basic connectivity** with health endpoints
5. ✅ **Check browser console** for JavaScript errors

### **When Asking for Help**

Include this information:
- **What you're trying to do**
- **What error you're seeing**
- **Your operating system and version**
- **Docker version** (`docker --version`)
- **Service logs** (`docker-compose logs [service-name]`)
- **Steps you've already tried**

### **Helpful Commands for Debugging**

```bash
# System information
docker info
docker version
docker-compose version

# Service status
docker-compose ps
docker-compose ps -a

# Resource usage
docker stats --no-stream
docker system df

# Network information
docker network ls
docker network inspect code_repository_runeframeos-network

# Volume information
docker volume ls
docker volume inspect [volume-name]
```

## 🎯 **Prevention Tips**

### **Regular Maintenance**
```bash
# Weekly cleanup
docker system prune -a
docker image prune -a
docker volume prune

# Monthly cleanup
docker builder prune -a
docker system prune -a --volumes
```

### **Best Practices**
1. **Always use `docker-compose down`** before major changes
2. **Check logs first** when troubleshooting
3. **Test changes locally** before committing
4. **Keep Docker Desktop updated**
5. **Monitor resource usage** regularly
6. **Backup important data** before major operations

---

**You're now equipped to handle most issues!** 🚀

This troubleshooting guide covers the most common problems you'll encounter. Remember:
- **Start with the basics** (Docker status, service logs)
- **Use diagnostic commands** to identify the issue
- **Apply targeted solutions** rather than guessing
- **Document new issues** to help other developers

---

**Last Updated**: Current Development Session  
**Status**: Complete troubleshooting guide for common issues  
**Next**: Use this guide whenever you encounter problems
