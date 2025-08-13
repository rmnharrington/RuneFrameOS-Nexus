# Module API Specification

## Overview
This document defines the standardized API contract that all external modules must implement to integrate with RuneFrameOS-Core. All modules must expose these endpoints and return data in the specified format.

## Base Requirements
- All modules must be accessible via HTTP/HTTPS
- All endpoints must return JSON responses
- All endpoints must support CORS for cross-origin requests
- All endpoints must return appropriate HTTP status codes

## Required Endpoints

### 1. Module Information Endpoint
**Endpoint:** `GET /api/module-info`  
**Purpose:** Returns basic module identification and status information

**Response Format:**
```json
{
  "module": {
    "id": "string",
    "name": "string",
    "version": "string",
    "description": "string",
    "author": "string",
    "repository": "string"
  },
  "status": {
    "state": "online|offline|maintenance",
    "lastHeartbeat": "ISO8601-timestamp",
    "uptime": "number-seconds"
  },
  "capabilities": {
    "supportsLaunch": "boolean",
    "supportsEmbed": "boolean",
    "requiresAuth": "boolean"
  },
  "endpoints": {
    "launch": "string-url",
    "embed": "string-url",
    "health": "string-url"
  }
}
```

**Field Descriptions:**
- `module.id`: Unique identifier for the module (e.g., "user-management", "inventory-system")
- `module.name`: Human-readable name (e.g., "User Management System")
- `module.version`: Semantic version (e.g., "1.0.0")
- `module.description`: Brief description of the module's purpose
- `module.author`: Module developer/company name
- `module.repository`: URL to source code repository
- `status.state`: Current operational state
- `status.lastHeartbeat`: Last successful health check timestamp
- `status.uptime`: Module uptime in seconds
- `capabilities.supportsLaunch`: Whether module can be launched in new window/tab
- `capabilities.supportsEmbed`: Whether module can be embedded in iframe
- `capabilities.requiresAuth`: Whether module requires authentication
- `endpoints.launch`: URL to launch the module interface
- `endpoints.embed`: URL for embedded view (if supported)
- `endpoints.health`: URL for health check endpoint

### 2. Health Check Endpoint
**Endpoint:** `GET /api/health`  
**Purpose:** Returns current module health status

**Response Format:**
```json
{
  "status": "healthy|degraded|unhealthy",
  "timestamp": "ISO8601-timestamp",
  "checks": {
    "database": "healthy|unhealthy",
    "externalServices": "healthy|unhealthy",
    "memory": "healthy|unhealthy"
  },
  "metrics": {
    "responseTime": "number-ms",
    "memoryUsage": "number-mb",
    "cpuUsage": "number-percent"
  }
}
```

### 3. Launch Endpoint (Optional)
**Endpoint:** `GET /api/launch`  
**Purpose:** Returns the main module interface URL

**Response Format:**
```json
{
  "launchUrl": "string-url",
  "windowOptions": {
    "width": "number",
    "height": "number",
    "resizable": "boolean",
    "scrollbars": "boolean"
  },
  "authRequired": "boolean",
  "authToken": "string|null"
}
```

## HTTP Status Codes

All endpoints must return appropriate HTTP status codes:

- `200 OK`: Successful response
- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Access denied
- `404 Not Found`: Endpoint not found
- `500 Internal Server Error`: Server error
- `503 Service Unavailable`: Module temporarily unavailable

## Error Response Format

When errors occur, use this standardized format:

```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": "object|null",
    "timestamp": "ISO8601-timestamp"
  }
}
```

## CORS Headers

All endpoints must include these CORS headers:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400
```

## Rate Limiting

Modules should implement reasonable rate limiting:
- Health check: Maximum 1 request per 30 seconds
- Module info: Maximum 10 requests per minute
- Launch: Maximum 5 requests per minute

## Authentication (If Required)

If a module requires authentication, it must:
1. Return `401 Unauthorized` for unauthenticated requests
2. Accept Bearer tokens in the Authorization header
3. Validate tokens against RuneFrameOS-Core's authentication system

## Example Implementation

### Node.js/Express Example
```javascript
app.get('/api/module-info', (req, res) => {
  res.json({
    module: {
      id: "user-management",
      name: "User Management System",
      version: "1.0.0",
      description: "Manages user accounts and permissions",
      author: "Your Company",
      repository: "https://github.com/yourcompany/user-management"
    },
    status: {
      state: "online",
      lastHeartbeat: new Date().toISOString(),
      uptime: process.uptime()
    },
    capabilities: {
      supportsLaunch: true,
      supportsEmbed: false,
      requiresAuth: true
    },
    endpoints: {
      launch: "/launch",
      embed: null,
      health: "/api/health"
    }
  });
});
```

### Python/Flask Example
```python
from flask import Flask, jsonify
import time

app = Flask(__name__)

@app.route('/api/module-info')
def module_info():
    return jsonify({
        "module": {
            "id": "inventory-system",
            "name": "Inventory Management",
            "version": "1.0.0",
            "description": "Tracks inventory and stock levels",
            "author": "Your Company",
            "repository": "https://github.com/yourcompany/inventory"
        },
        "status": {
            "state": "online",
            "lastHeartbeat": time.strftime('%Y-%m-%dT%H:%M:%SZ'),
            "uptime": time.time()
        },
        "capabilities": {
            "supportsLaunch": True,
            "supportsEmbed": True,
            "requiresAuth": False
        },
        "endpoints": {
            "launch": "/launch",
            "embed": "/embed",
            "health": "/api/health"
        }
    })
```

## Testing Your Implementation

Use these test cases to verify your module meets the specification:

1. **Module Info Test:**
   - Call `GET /api/module-info`
   - Verify all required fields are present
   - Check JSON is valid
   - Confirm CORS headers are set

2. **Health Check Test:**
   - Call `GET /api/health`
   - Verify status field is present
   - Check timestamp is recent

3. **Error Handling Test:**
   - Test with invalid endpoints
   - Verify proper HTTP status codes
   - Check error response format

## Compliance Checklist

- [ ] Module info endpoint implemented at `/api/module-info`
- [ ] Health check endpoint implemented at `/api/health`
- [ ] All required fields present in responses
- [ ] CORS headers properly configured
- [ ] Proper HTTP status codes returned
- [ ] Error responses follow standard format
- [ ] Rate limiting implemented
- [ ] Authentication handled (if required)
- [ ] Endpoints tested and working

## Support

For questions about this specification or help with implementation, contact the RuneFrameOS-Core development team.
