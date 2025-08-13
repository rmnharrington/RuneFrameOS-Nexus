# 🚀 RuneFrameOS Server Setup & Architecture Documentation

## 📋 Table of Contents
- [Overview](#overview)
- [System Architecture](#system-architecture)
- [Frontend Applications](#frontend-applications)
- [Backend Services](#backend-services)
- [API Structure](#api-structure)
- [Development Environment](#development-environment)
- [Production Deployment](#production-deployment)
- [Monitoring & Observability](#monitoring--observability)
- [Security Considerations](#security-considerations)
- [Troubleshooting](#troubleshooting)

---

## 🌟 Overview

RuneFrameOS is a comprehensive gaming ecosystem built with a microservices architecture, featuring multiple frontend applications and backend services that work together to provide a seamless gaming experience. The system is designed for scalability, maintainability, and high availability.

### **Key Features:**
- **Microservices Architecture** - Independent, scalable services
- **Containerized Deployment** - Docker-based containerization
- **Kubernetes Ready** - Production-grade orchestration
- **Real-time Communication** - WebSocket support for gaming features
- **Modular Design** - Easy to extend and maintain

---

## 🏗️ System Architecture

### **High-Level Architecture Diagram:**
```
┌─────────────────────────────────────────────────────────────────┐
│                    RuneFrameOS Ecosystem                       │
├─────────────────────────────────────────────────────────────────┤
│  Frontend Applications (Next.js)                              │
│  ┌─────────────┬─────────────┬─────────────┬─────────────┐    │
│  │    Nexus   │ Distillara  │   Core     │ Feastwell   │    │
│  │   (3000)   │   (3001)    │   (3002)   │   (3003)    │    │
│  └─────────────┴─────────────┴─────────────┴─────────────┘    │
│  ┌─────────────┬─────────────┬─────────────┬─────────────┐    │
│  │  Hoardwell │   Tavern    │ Scriptoria  │   Other     │    │
│  │   (3004)   │   (3005)    │   (3006)    │   Apps      │    │
│  └─────────────┴─────────────┴─────────────┴─────────────┘    │
├─────────────────────────────────────────────────────────────────┤
│  Backend Services (Node.js/Express)                           │
│  ┌─────────────┬─────────────┬─────────────┐                  │
│  │    Auth    │    Core     │    User     │                  │
│  │  Service   │  Service    │  Service    │                  │
│  │   (4001)   │   (4002)   │   (4003)    │                  │
│  └─────────────┴─────────────┴─────────────┘                  │
├─────────────────────────────────────────────────────────────────┤
│  Infrastructure Layer                                         │
│  ┌─────────────┬─────────────┬─────────────┐                  │
│  │   Docker   │ Kubernetes  │ Monitoring  │                  │
│  │ Containers │ Orchestration│ & Logging   │                  │
│  └─────────────┴─────────────┴─────────────┘                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Frontend Applications

### **1. Nexus Hub (Port 3000)**
- **Purpose**: Central access point and navigation hub
- **Technology**: Next.js 15, React 19, TypeScript
- **Features**: 
  - Dashboard overview
  - Application navigation
  - System statistics
  - User management interface
- **Key Components**:
  - `AppLayout.tsx` - Main layout wrapper
  - `Dashboard.tsx` - Central dashboard
  - `LeftSidebar.tsx` - Navigation sidebar
  - `HeaderBar.tsx` - Top navigation bar

### **2. Distillara (Port 3001)**
- **Purpose**: Gaming application and campaign management
- **Features**: 
  - Campaign creation and management
  - Character sheets
  - Game mechanics
  - Real-time gaming sessions

### **3. Core Admin (Port 3002)**
- **Purpose**: Administrative dashboard and system management
- **Features**: 
  - User management
  - System configuration
  - Performance monitoring
  - Security settings

### **4. Feastwell (Port 3003)**
- **Purpose**: Food and resource management system
- **Features**: 
  - Recipe management
  - Resource tracking
  - Nutritional information
  - Meal planning

### **5. Hoardwell (Port 3004)**
- **Purpose**: Inventory and asset management
- **Features**: 
  - Item catalog
  - Inventory tracking
  - Asset management
  - Trade system

### **6. Broke Unicorn Tavern (Port 3005)**
- **Purpose**: Social hub and player interaction
- **Features**: 
  - Chat rooms
  - Event planning
  - Character meetups
  - Tavern games

### **7. Scriptoria (Port 3006)**
- **Purpose**: Gaming systems library and rules engine
- **Features**: 
  - Rule sets
  - Game mechanics
  - System documentation
  - API reference

---

## ⚙️ Backend Services

### **1. Authentication Service (Port 4001)**
- **Purpose**: User authentication and authorization
- **Technology**: Node.js, Express, JWT
- **Features**:
  - User login/logout
  - JWT token management
  - Role-based access control
  - Session management
- **Endpoints**:
  - `POST /auth/login` - User authentication
  - `POST /auth/logout` - User logout
  - `POST /auth/refresh` - Token refresh
  - `GET /auth/verify` - Token verification

### **2. Core Service (Port 4002)**
- **Purpose**: Core business logic and system operations
- **Technology**: Node.js, Express, TypeScript
- **Features**:
  - System configuration
  - Business logic orchestration
  - Data aggregation
  - Service communication
- **Endpoints**:
  - `GET /api/health` - Health check
  - `GET /api/config` - System configuration
  - `POST /api/events` - Event processing
  - `GET /api/metrics` - System metrics

### **3. User Service (Port 4003)**
- **Purpose**: User management and profile operations
- **Technology**: Node.js, Express, TypeScript
- **Features**:
  - User CRUD operations
  - Profile management
  - Preferences storage
  - User analytics
- **Endpoints**:
  - `GET /api/users` - List users
  - `POST /api/users` - Create user
  - `PUT /api/users/:id` - Update user
  - `DELETE /api/users/:id` - Delete user
  - `GET /api/users/:id/profile` - Get user profile

---

## 🔌 API Structure

### **API Design Principles:**
- **RESTful Design** - Standard HTTP methods and status codes
- **JSON Response Format** - Consistent data structure
- **JWT Authentication** - Secure token-based authentication
- **Rate Limiting** - API usage protection
- **Versioning** - API version management

### **Standard Response Format:**
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation completed successfully",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "requestId": "uuid-v4"
}
```

### **Error Response Format:**
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": "Additional error details"
  },
  "timestamp": "2024-01-01T00:00:00.000Z",
  "requestId": "uuid-v4"
}
```

### **Authentication Headers:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
X-Request-ID: <UUID>
```

---

## 🛠️ Development Environment

### **Prerequisites:**
- Docker Desktop
- Node.js 18+
- npm or yarn
- Git

### **Local Development Setup:**
```bash
# Clone the repository
git clone <repository-url>
cd Code_Repository

# Start all services
docker-compose up -d

# Check service status
docker-compose ps

# View logs for specific service
docker-compose logs -f <service-name>

# Stop all services
docker-compose down
```

### **Individual Service Development:**
```bash
# Navigate to specific service
cd RuneFrameOS-Nexus

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### **Environment Variables:**
Create `.env` files in each service directory:
```env
# Example .env file
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/db
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000
```

---

## 🚀 Production Deployment

### **Docker Deployment:**
```bash
# Build and start services
docker-compose -f docker-compose.prod.yml up -d

# Scale services
docker-compose up -d --scale nexus=3 --scale auth-service=2
```

### **Kubernetes Deployment:**
```bash
# Apply namespace
kubectl apply -f k8s/namespace.yaml

# Apply configurations
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/storage.yaml

# Deploy services
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml

# Apply monitoring
kubectl apply -f k8s/monitoring.yaml
kubectl apply -f k8s/hpa.yaml
```

### **Production Configuration:**
- **Environment**: `NODE_ENV=production`
- **Port Binding**: External port mapping
- **Health Checks**: `/health` endpoints
- **Logging**: Structured logging with correlation IDs
- **Metrics**: Prometheus metrics collection

---

## 📊 Monitoring & Observability

### **Health Monitoring:**
- **Health Endpoints**: `/health` on all services
- **Readiness Probes**: Kubernetes readiness checks
- **Liveness Probes**: Kubernetes liveness checks
- **Startup Probes**: Kubernetes startup checks

### **Logging Strategy:**
- **Structured Logging**: JSON format logs
- **Log Levels**: ERROR, WARN, INFO, DEBUG
- **Correlation IDs**: Request tracing
- **Centralized Logging**: ELK stack or similar

### **Metrics Collection:**
- **Prometheus Metrics**: Custom business metrics
- **System Metrics**: CPU, memory, disk usage
- **Application Metrics**: Request rates, response times
- **Business Metrics**: User activity, game sessions

### **Alerting:**
- **Service Down**: Immediate notification
- **High Error Rates**: Threshold-based alerts
- **Performance Degradation**: Response time alerts
- **Resource Usage**: Memory/CPU threshold alerts

---

## 🔒 Security Considerations

### **Authentication & Authorization:**
- **JWT Tokens**: Secure token-based authentication
- **Role-Based Access Control**: Granular permissions
- **Token Expiration**: Configurable token lifetimes
- **Refresh Tokens**: Secure token renewal

### **API Security:**
- **HTTPS Only**: TLS encryption for all communications
- **CORS Configuration**: Restricted cross-origin requests
- **Rate Limiting**: API abuse prevention
- **Input Validation**: Request data sanitization

### **Data Protection:**
- **Data Encryption**: At-rest and in-transit encryption
- **PII Handling**: Personal data protection
- **Audit Logging**: Security event tracking
- **Vulnerability Scanning**: Regular security assessments

---

## 🐛 Troubleshooting

### **Common Issues & Solutions:**

#### **Service Won't Start:**
```bash
# Check Docker status
docker info

# Check service logs
docker-compose logs <service-name>

# Verify port availability
netstat -an | findstr :3000
```

#### **Database Connection Issues:**
```bash
# Check database service
docker-compose ps postgres

# Verify connection string
docker-compose exec <service> env | grep DATABASE
```

#### **Memory Issues:**
```bash
# Check container resource usage
docker stats

# Increase memory limits in docker-compose.yml
services:
  nexus:
    deploy:
      resources:
        limits:
          memory: 2G
```

#### **Network Issues:**
```bash
# Check network configuration
docker network ls
docker network inspect code_repository_runeframeos-network

# Restart network
docker-compose down
docker-compose up -d
```

### **Debug Commands:**
```bash
# Enter running container
docker-compose exec <service-name> sh

# View real-time logs
docker-compose logs -f <service-name>

# Check service health
curl http://localhost:3000/health

# Monitor resource usage
docker stats --no-stream
```

---

## 📚 Additional Resources

### **Documentation:**
- [Next.js Documentation](https://nextjs.org/docs)
- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Node.js Documentation](https://nodejs.org/docs/)

### **Configuration Files:**
- `docker-compose.yml` - Service orchestration
- `k8s/` - Kubernetes deployment manifests
- `package.json` - Dependencies and scripts
- `.env.example` - Environment variable templates

### **Support:**
- **Development Team**: Internal support channels
- **Documentation**: This file and related docs
- **Monitoring**: System health dashboards
- **Logs**: Service-specific log files

---

## 🔄 Version History

| Version | Date | Changes | Author |
|---------|------|---------|---------|
| 1.0.0 | 2024-01-01 | Initial documentation | Development Team |
| 1.1.0 | 2024-01-15 | Added monitoring section | Development Team |
| 1.2.0 | 2024-01-30 | Updated deployment guides | Development Team |

---

*This document is maintained by the RuneFrameOS Development Team. For questions or updates, please contact the team or submit a pull request.*
