# 🔌 RuneFrameOS API Documentation

## 🎯 **Overview**

This document provides comprehensive API documentation for the entire RuneFrameOS ecosystem. All services follow RESTful design principles with consistent response formats and authentication patterns.

## 🌐 **Service Endpoints Overview**

### **Frontend Applications**
- **Nexus Hub**: http://localhost:3000 (Main dashboard)
- **Distillara**: http://localhost:3001 (Alchemy system)
- **Core Admin**: http://localhost:3002 (Admin dashboard)
- **Feastwell**: http://localhost:3003 (Cooking system)
- **Hoardwell**: http://localhost:3004 (Inventory management)
- **Broke Unicorn Tavern**: http://localhost:3005 (Social hub)
- **Scriptoria**: http://localhost:3006 (Gaming systems)

### **Backend Services**
- **Auth Service**: http://localhost:4001 (Authentication)
- **Core Service**: http://localhost:4002 (Core business logic)
- **User Service**: http://localhost:4003 (User management)

## 🔐 **Authentication & Security**

### **JWT Token Authentication**
All protected endpoints require a valid JWT token in the Authorization header.

```http
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
X-Request-ID: <UUID>
```

### **Token Management**
- **Access Token**: Short-lived (15 minutes)
- **Refresh Token**: Long-lived (7 days)
- **Token Format**: JWT with user ID, roles, and permissions

### **Security Headers**
```http
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

## 📡 **Standard Response Format**

### **Success Response**
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

### **Error Response**
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": "Additional error details",
    "field": "Specific field causing error"
  },
  "timestamp": "2024-01-01T00:00:00.000Z",
  "requestId": "uuid-v4"
}
```

### **HTTP Status Codes**
- **200**: Success
- **201**: Created
- **400**: Bad Request
- **401**: Unauthorized
- **403**: Forbidden
- **404**: Not Found
- **422**: Validation Error
- **500**: Internal Server Error

## 🔑 **Authentication Service (Port 4001)**

### **Base URL**: `http://localhost:4001`

#### **POST /auth/login**
User authentication endpoint.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-uuid",
      "email": "user@example.com",
      "name": "User Name",
      "roles": ["user"],
      "permissions": ["read", "write"]
    },
    "tokens": {
      "accessToken": "jwt-access-token",
      "refreshToken": "jwt-refresh-token",
      "expiresIn": 900
    }
  },
  "message": "Login successful"
}
```

#### **POST /auth/logout**
User logout endpoint.

**Headers:**
```http
Authorization: Bearer <JWT_TOKEN>
```

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

#### **POST /auth/refresh**
Refresh access token.

**Request Body:**
```json
{
  "refreshToken": "jwt-refresh-token"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "new-jwt-access-token",
    "expiresIn": 900
  },
  "message": "Token refreshed successfully"
}
```

#### **GET /auth/verify**
Verify token validity.

**Headers:**
```http
Authorization: Bearer <JWT_TOKEN>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "valid": true,
    "user": {
      "id": "user-uuid",
      "email": "user@example.com",
      "roles": ["user"]
    }
  },
  "message": "Token is valid"
}
```

## ⚙️ **Core Service (Port 4002)**

### **Base URL**: `http://localhost:4002`

#### **GET /api/health**
Service health check.

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "operational",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "uptime": 3600,
    "version": "1.0.0",
    "environment": "development"
  },
  "message": "Service is healthy"
}
```

#### **GET /api/config**
System configuration.

**Headers:**
```http
Authorization: Bearer <JWT_TOKEN>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "system": {
      "name": "RuneFrameOS",
      "version": "1.0.0",
      "environment": "development"
    },
    "features": {
      "moduleIntegration": true,
      "realTimeUpdates": true,
      "userManagement": true
    },
    "limits": {
      "maxModules": 100,
      "maxUsers": 1000,
      "maxFileSize": "10MB"
    }
  },
  "message": "Configuration retrieved successfully"
}
```

#### **POST /api/events**
Process system events.

**Headers:**
```http
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**
```json
{
  "type": "module.connected",
  "data": {
    "moduleId": "distillara",
    "userId": "user-uuid",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "eventId": "event-uuid",
    "processed": true,
    "timestamp": "2024-01-01T00:00:00.000Z"
  },
  "message": "Event processed successfully"
}
```

#### **GET /api/metrics**
System performance metrics.

**Headers:**
```http
Authorization: Bearer <JWT_TOKEN>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "performance": {
      "responseTime": 45,
      "throughput": 1000,
      "errorRate": 0.01
    },
    "resources": {
      "cpu": 25.5,
      "memory": 512,
      "disk": 1024
    },
    "modules": {
      "total": 6,
      "active": 5,
      "connected": 4
    }
  },
  "message": "Metrics retrieved successfully"
}
```

## 👤 **User Service (Port 4003)**

### **Base URL**: `http://localhost:4003**

#### **GET /api/users**
List all users (paginated).

**Headers:**
```http
Authorization: Bearer <JWT_TOKEN>
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `search`: Search term for name/email
- `role`: Filter by user role

**Response:**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "user-uuid",
        "email": "user@example.com",
        "name": "User Name",
        "roles": ["user"],
        "status": "active",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "lastLogin": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "pages": 5
    }
  },
  "message": "Users retrieved successfully"
}
```

#### **POST /api/users**
Create new user.

**Headers:**
```http
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "password": "securepassword",
  "name": "New User",
  "roles": ["user"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "new-user-uuid",
      "email": "newuser@example.com",
      "name": "New User",
      "roles": ["user"],
      "status": "active",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "message": "User created successfully"
}
```

#### **GET /api/users/:id**
Get user by ID.

**Headers:**
```http
Authorization: Bearer <JWT_TOKEN>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-uuid",
      "email": "user@example.com",
      "name": "User Name",
      "roles": ["user"],
      "status": "active",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "lastLogin": "2024-01-01T00:00:00.000Z",
      "preferences": {
        "theme": "dark",
        "language": "en"
      }
    }
  },
  "message": "User retrieved successfully"
}
```

#### **PUT /api/users/:id**
Update user.

**Headers:**
```http
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**
```json
{
  "name": "Updated User Name",
  "roles": ["user", "admin"],
  "preferences": {
    "theme": "light",
    "language": "en"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-uuid",
      "email": "user@example.com",
      "name": "Updated User Name",
      "roles": ["user", "admin"],
      "status": "active",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "message": "User updated successfully"
}
```

#### **DELETE /api/users/:id**
Delete user.

**Headers:**
```http
Authorization: Bearer <JWT_TOKEN>
```

**Response:**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

## 🎮 **Module Integration APIs**

### **Required Endpoints for All Modules**

Every RuneFrameOS module must implement these endpoints to integrate with the ecosystem:

#### **GET /api/health**
Module health check.

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "operational",
    "module": "distillara",
    "version": "1.0.0",
    "timestamp": "2024-01-01T00:00:00.000Z"
  },
  "message": "Module is healthy"
}
```

#### **GET /api/module-info**
Module information and capabilities.

**Response:**
```json
{
  "success": true,
  "data": {
    "module": {
      "id": "distillara",
      "name": "Distillara",
      "description": "Alchemy and potion crafting system",
      "version": "1.0.0",
      "icon": "🧪",
      "category": "gaming",
      "capabilities": [
        "recipe_management",
        "material_tracking",
        "quality_system"
      ]
    },
    "features": {
      "realTime": true,
      "offline": false,
      "multiplayer": true
    },
    "endpoints": [
      "/api/recipes",
      "/api/materials",
      "/api/crafting"
    ]
  },
  "message": "Module information retrieved successfully"
}
```

#### **GET /api/status**
Current module status and data.

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "operational",
    "lastUpdated": "2024-01-01T00:00:00.000Z",
    "metrics": {
      "activeUsers": 25,
      "recipesCreated": 150,
      "materialsTracked": 500
    },
    "recentActivity": [
      {
        "type": "recipe_created",
        "timestamp": "2024-01-01T00:00:00.000Z",
        "data": "New healing potion recipe"
      }
    ]
  },
  "message": "Module status retrieved successfully"
}
```

## 🔄 **Real-Time Communication**

### **WebSocket Endpoints**

#### **Connection**
```javascript
// Connect to real-time updates
const ws = new WebSocket('ws://localhost:4002/ws');

ws.onopen = () => {
  console.log('Connected to RuneFrameOS real-time');
  
  // Subscribe to module updates
  ws.send(JSON.stringify({
    type: 'subscribe',
    module: 'distillara',
    events: ['recipe_created', 'material_updated']
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Real-time update:', data);
};
```

#### **Event Types**
```json
{
  "module.connected": "Module connected to ecosystem",
  "module.disconnected": "Module disconnected from ecosystem",
  "user.login": "User logged in",
  "user.logout": "User logged out",
  "recipe.created": "New recipe created",
  "material.updated": "Material inventory updated"
}
```

## 📊 **Error Handling**

### **Common Error Codes**

#### **Authentication Errors**
```json
{
  "code": "AUTH_TOKEN_EXPIRED",
  "message": "Authentication token has expired",
  "details": "Please refresh your token or log in again"
}
```

#### **Validation Errors**
```json
{
  "code": "VALIDATION_ERROR",
  "message": "Request validation failed",
  "details": "One or more fields are invalid",
  "field": "email",
  "value": "invalid-email"
}
```

#### **Permission Errors**
```json
{
  "code": "INSUFFICIENT_PERMISSIONS",
  "message": "You don't have permission to perform this action",
  "details": "Required role: admin, your role: user"
}
```

#### **Resource Errors**
```json
{
  "code": "RESOURCE_NOT_FOUND",
  "message": "Requested resource not found",
  "details": "User with ID 'user-uuid' does not exist"
}
```

## 🧪 **Testing APIs**

### **Using curl**

#### **Health Check**
```bash
curl http://localhost:4001/api/health
```

#### **Authenticated Request**
```bash
# First, get a token
TOKEN=$(curl -s -X POST http://localhost:4001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}' \
  | jq -r '.data.tokens.accessToken')

# Use the token
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:4002/api/config
```

### **Using Postman**

1. **Import Collection**: Use the provided Postman collection
2. **Set Environment Variables**: Configure base URLs and tokens
3. **Test Endpoints**: Run through all API endpoints
4. **Validate Responses**: Check response formats and status codes

## 📈 **Rate Limiting**

### **Limits by Endpoint**
- **Public Endpoints**: 100 requests per minute
- **Authenticated Endpoints**: 1000 requests per minute
- **Admin Endpoints**: 5000 requests per minute

### **Rate Limit Headers**
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

### **Rate Limit Exceeded Response**
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded",
    "details": "Too many requests, please try again later"
  },
  "retryAfter": 60
}
```

## 🔒 **Security Best Practices**

### **API Security Checklist**
- [ ] **HTTPS Only**: All production endpoints use TLS
- [ ] **Input Validation**: All inputs are validated and sanitized
- [ ] **SQL Injection Protection**: Use parameterized queries
- [ ] **XSS Protection**: Sanitize all output
- [ ] **CORS Configuration**: Restrict cross-origin requests
- [ ] **Rate Limiting**: Prevent abuse and DoS attacks
- [ ] **Logging**: Log all API requests and responses
- [ ] **Monitoring**: Monitor for suspicious activity

### **Development Security**
```bash
# Never commit sensitive data
echo "*.env" >> .gitignore
echo "secrets/" >> .gitignore

# Use environment variables
export JWT_SECRET="your-secret-key"
export DATABASE_URL="postgresql://user:pass@localhost/db"
```

## 📚 **API Versioning**

### **Version Strategy**
- **Current Version**: v1
- **Version Header**: `Accept: application/vnd.runeframeos.v1+json`
- **URL Versioning**: `/api/v1/endpoint`
- **Backward Compatibility**: Maintained for at least 6 months

### **Version Deprecation**
```json
{
  "success": true,
  "data": {
    "deprecation": {
      "version": "v1",
      "deprecated": true,
      "sunset": "2024-07-01T00:00:00.000Z",
      "migration": "https://docs.runeframeos.com/migration-v1-v2"
    }
  },
  "message": "This API version is deprecated"
}
```

## 🚀 **Next Steps**

### **Immediate Actions**
1. ✅ **Test all endpoints** using the provided examples
2. ✅ **Implement required endpoints** in your modules
3. ✅ **Set up authentication** for protected routes
4. ✅ **Configure error handling** for consistent responses

### **Advanced Features**
1. **WebSocket Integration**: Real-time updates
2. **Rate Limiting**: Prevent API abuse
3. **Caching**: Improve performance
4. **Monitoring**: Track API usage and performance

---

**Your APIs are now fully documented and ready for integration!** 🚀

You can now:
- Integrate modules with the ecosystem
- Build client applications
- Implement real-time features
- Monitor and debug API calls
- Scale your services effectively

---

**Last Updated**: Current Development Session  
**Status**: Complete API documentation for all services  
**Next**: Read `TROUBLESHOOTING.md` for common issues and solutions
