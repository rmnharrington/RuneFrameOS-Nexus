# 🛠️ RuneFrameOS Development Environment Setup

## 🎯 **Overview**

This guide provides detailed instructions for setting up a complete development environment for the RuneFrameOS ecosystem. Whether you're working on frontend components, backend services, or system integration, this guide will get you fully configured.

## 📋 **Prerequisites Check**

Before proceeding, ensure you have completed the basic setup from `GETTING_STARTED.md`:
- ✅ Docker Desktop installed and running
- ✅ Git configured and repository cloned
- ✅ Basic ecosystem running with `docker-compose up -d`

## 🖥️ **IDE Setup**

### **VS Code (Recommended)**

#### **Essential Extensions**
```json
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "ms-vscode.vscode-json",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-docker"
  ]
}
```

#### **Install Extensions**
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search and install each extension above
4. Restart VS Code

#### **Workspace Settings**
Create `.vscode/settings.json` in your project root:
```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "tailwindCSS.includeLanguages": {
    "typescript": "typescript",
    "typescriptreact": "typescriptreact"
  },
  "tailwindCSS.experimental.classRegex": [
    ["className\\s*=\\s*[\"'`]([^\"'`]*)[\"'`]", "([^\"'`]*)"],
    ["className\\s*=\\s*\\{([^}]*)\\}", "([^}]*)"]
  ]
}
```

### **Cursor (Alternative)**

Cursor comes with many AI-powered features and is built on VS Code:
1. Download from [cursor.sh](https://cursor.sh/)
2. Install the same extensions as VS Code
3. Use the same workspace settings

## 🔧 **Local Development Setup**

### **Node.js Environment**

#### **Install Node.js 18+**
- **Windows**: Download from [nodejs.org](https://nodejs.org/)
- **macOS**: Use Homebrew: `brew install node`
- **Linux**: Use NodeSource: `curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -`

#### **Verify Installation**
```bash
node --version  # Should be 18.x or higher
npm --version   # Should be 9.x or higher
```

#### **Install Global Tools**
```bash
npm install -g typescript
npm install -g @types/node
npm install -g prettier
npm install -g eslint
```

### **Project Dependencies**

#### **Install Dependencies for Each App**
```bash
# Navigate to each app and install dependencies
cd RuneFrameOS-Nexus
npm install

cd ../RuneFrameOS-Distillara
npm install

cd ../RuneFrameOS-Feastwell
npm install

cd ../RuneFrameOS-Hoardwell
npm install

cd ../RuneFrameOS-BrokeUnicornTavern
npm install

cd ../RuneFrameOS-Scriptoria
npm install
```

#### **Install Shared Services Dependencies**
```bash
cd ../RuneFrameOS-SharedServices/auth-service
npm install

cd ../core-service
npm install

cd ../user-service
npm install
```

## 🐳 **Docker Development Workflow**

### **Development vs Production**

#### **Development Mode (Current)**
- Uses volume mounts for live code changes
- Hot reload enabled
- Source code editable from host machine
- Fast iteration cycle

#### **Production Mode**
- Builds optimized containers
- No volume mounts
- Optimized for performance
- Ready for deployment

### **Development Commands**

#### **Start Development Environment**
```bash
# Start all services in development mode
docker-compose up -d

# Start specific service
docker-compose up -d nexus

# Start with rebuild
docker-compose up --build -d
```

#### **Development Workflow**
```bash
# 1. Make code changes in your IDE
# 2. Save file (auto-reload in development mode)
# 3. View changes immediately in browser
# 4. Check logs if issues arise
docker-compose logs -f nexus
```

#### **Rebuilding Services**
```bash
# Rebuild specific service
docker-compose stop nexus
docker-compose build --no-cache nexus
docker-compose up -d nexus

# Rebuild all services
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## 🌐 **Environment Variables**

### **Local Environment Setup**

#### **Create .env Files**
Each service should have its own `.env` file:

**RuneFrameOS-Nexus/.env**
```env
NODE_ENV=development
PORT=3000
NEXT_PUBLIC_API_URL=http://localhost:4002
NEXT_PUBLIC_AUTH_URL=http://localhost:4001
```

**RuneFrameOS-SharedServices/auth-service/.env**
```env
NODE_ENV=development
PORT=4001
JWT_SECRET=your-secret-key-here
CORS_ORIGIN=http://localhost:3000
```

#### **Environment Variable Management**
```bash
# Copy example files
cp .env.example .env

# Edit environment variables
# Never commit .env files to git
# Use .env.example for documentation
```

### **Cross-Service Communication**

#### **Service Discovery**
```typescript
// In your application code
const API_BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:4002' 
  : 'https://api.runeframeos.com';

const response = await fetch(`${API_BASE_URL}/api/health`);
```

## 🧪 **Testing Environment**

### **Unit Testing Setup**

#### **Install Testing Dependencies**
```bash
cd RuneFrameOS-Nexus
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

#### **Jest Configuration**
Create `jest.config.js`:
```javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
};
```

#### **Run Tests**
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### **Integration Testing**

#### **API Testing**
```bash
# Test API endpoints
curl http://localhost:4001/api/health
curl http://localhost:4002/api/health
curl http://localhost:4003/api/health
```

#### **End-to-End Testing**
```bash
# Start all services
docker-compose up -d

# Test complete user flow
# 1. Open Nexus at http://localhost:3000
# 2. Add modules
# 3. Connect to modules
# 4. Navigate between views
```

## 🔍 **Debugging Tools**

### **Browser Developer Tools**

#### **React Developer Tools**
1. Install [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) extension
2. Use Components tab to inspect React component tree
3. Use Profiler tab to analyze performance

#### **Network Tab**
1. Open DevTools (F12)
2. Go to Network tab
3. Monitor API calls and responses
4. Check for failed requests or slow responses

### **VS Code Debugging**

#### **Launch Configuration**
Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Nexus",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/RuneFrameOS-Nexus/node_modules/.bin/next",
      "args": ["dev"],
      "cwd": "${workspaceFolder}/RuneFrameOS-Nexus",
      "console": "integratedTerminal",
      "env": {
        "NODE_ENV": "development"
      }
    }
  ]
}
```

#### **Debugging Workflow**
1. Set breakpoints in your code
2. Press F5 to start debugging
3. Use step-through debugging
4. Inspect variables and call stack

## 📊 **Performance Monitoring**

### **Development Performance**

#### **Bundle Analyzer**
```bash
# Install bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Analyze bundle size
npm run build
npm run analyze
```

#### **Performance Metrics**
```bash
# Check build performance
npm run build

# Monitor memory usage
docker stats

# Check service response times
curl -w "@curl-format.txt" -o /dev/null -s "http://localhost:3000"
```

### **Monitoring Tools**

#### **Docker Monitoring**
```bash
# Monitor container resources
docker stats

# Check container logs
docker-compose logs -f --tail=100

# Monitor network usage
docker network ls
docker network inspect code_repository_runeframeos-network
```

## 🔧 **Troubleshooting Development Issues**

### **Common Development Problems**

#### **Hot Reload Not Working**
```bash
# Check if volumes are mounted correctly
docker-compose exec nexus ls -la /app

# Restart the service
docker-compose restart nexus

# Check for file permission issues
docker-compose exec nexus chown -R node:node /app
```

#### **Port Conflicts**
```bash
# Check what's using a port
netstat -an | findstr :3000  # Windows
lsof -i :3000                 # macOS/Linux

# Kill conflicting process
taskkill /PID <PID> /F        # Windows
kill -9 <PID>                 # macOS/Linux
```

#### **Build Failures**
```bash
# Clean Docker cache
docker system prune -a

# Rebuild from scratch
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### **Performance Issues**

#### **Slow Build Times**
```bash
# Use Docker BuildKit
export DOCKER_BUILDKIT=1
docker-compose build

# Optimize Dockerfile
# Use multi-stage builds
# Cache dependencies properly
```

#### **High Memory Usage**
```bash
# Check Docker memory allocation
docker info | grep -i memory

# Increase Docker memory in Docker Desktop
# Settings > Resources > Memory: 8GB+
```

## 📚 **Next Steps**

### **Immediate Actions**
1. ✅ **Install IDE extensions** for optimal development experience
2. ✅ **Set up environment variables** for local development
3. ✅ **Install testing framework** for code quality
4. ✅ **Configure debugging tools** for troubleshooting

### **Advanced Setup**
1. **Database Integration**: Set up local database for development
2. **Mock Services**: Create mock APIs for offline development
3. **CI/CD Pipeline**: Set up automated testing and deployment
4. **Monitoring Stack**: Implement comprehensive logging and metrics

### **Learning Resources**
- **React**: [React Documentation](https://react.dev/)
- **Next.js**: [Next.js Documentation](https://nextjs.org/docs)
- **TypeScript**: [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- **Tailwind CSS**: [Tailwind Documentation](https://tailwindcss.com/docs)
- **Docker**: [Docker Documentation](https://docs.docker.com/)

---

**Your development environment is now fully configured!** 🚀

You can now:
- Develop features with hot reload
- Debug code effectively
- Test your changes thoroughly
- Monitor performance and resources
- Contribute to the RuneFrameOS ecosystem

---

**Last Updated**: Current Development Session  
**Status**: Complete development environment setup guide  
**Next**: Read `API_DOCUMENTATION.md` to understand the API structure
