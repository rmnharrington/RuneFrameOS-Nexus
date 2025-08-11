# External App Implementation Guide

## Overview
This guide shows you exactly how to implement the required standardized endpoints in your external application. Follow these steps to make your app compatible with RuneFrameOS-Core.

## Quick Start Checklist
- [ ] Add the required API endpoints to your app
- [ ] Implement the JSON response format
- [ ] Add health check functionality
- [ ] Configure CORS headers
- [ ] Test your endpoints

## Implementation Examples

### Option 1: Node.js/Express (Recommended for beginners)

#### Step 1: Install Dependencies
```bash
npm install express cors
```

#### Step 2: Create Your App
```javascript
// app.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Parse JSON
app.use(express.json());

// Your existing routes go here
app.get('/', (req, res) => {
  res.send('Hello World, my name is [Your Module Name]');
});

// REQUIRED: Module Info Endpoint
app.get('/api/module-info', (req, res) => {
  res.json({
    module: {
      id: "your-module-id",
      name: "Your Module Name",
      version: "1.0.0",
      description: "Brief description of what your module does",
      author: "Your Name or Company",
      repository: "https://github.com/yourusername/your-repo"
    },
    status: {
      state: "online",
      lastHeartbeat: new Date().toISOString(),
      uptime: process.uptime()
    },
    capabilities: {
      supportsLaunch: true,
      supportsEmbed: false,
      requiresAuth: false
    },
    endpoints: {
      launch: "/",
      embed: null,
      health: "/api/health"
    }
  });
});

// REQUIRED: Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    checks: {
      database: "healthy",
      externalServices: "healthy",
      memory: "healthy"
    },
    metrics: {
      responseTime: Date.now(),
      memoryUsage: process.memoryUsage().heapUsed / 1024 / 1024,
      cpuUsage: process.cpuUsage()
    }
  });
});

// OPTIONAL: Launch Endpoint
app.get('/api/launch', (req, res) => {
  res.json({
    launchUrl: "http://localhost:3000",
    windowOptions: {
      width: 1200,
      height: 800,
      resizable: true,
      scrollbars: true
    },
    authRequired: false,
    authToken: null
  });
});

app.listen(PORT, () => {
  console.log(`Your module is running on port ${PORT}`);
  console.log(`Module info available at: http://localhost:${PORT}/api/module-info`);
  console.log(`Health check available at: http://localhost:${PORT}/api/health`);
});
```

#### Step 3: Run Your App
```bash
node app.js
```

### Option 2: Python/Flask

#### Step 1: Install Dependencies
```bash
pip install flask flask-cors
```

#### Step 2: Create Your App
```python
# app.py
from flask import Flask, jsonify
from flask_cors import CORS
import time
import psutil
import os

app = Flask(__name__)
CORS(app)

# Your existing routes go here
@app.route('/')
def home():
    return 'Hello World, my name is [Your Module Name]'

# REQUIRED: Module Info Endpoint
@app.route('/api/module-info')
def module_info():
    return jsonify({
        "module": {
            "id": "your-module-id",
            "name": "Your Module Name",
            "version": "1.0.0",
            "description": "Brief description of what your module does",
            "author": "Your Name or Company",
            "repository": "https://github.com/yourusername/your-repo"
        },
        "status": {
            "state": "online",
            "lastHeartbeat": time.strftime('%Y-%m-%dT%H:%M:%SZ'),
            "uptime": time.time()
        },
        "capabilities": {
            "supportsLaunch": True,
            "supportsEmbed": False,
            "requiresAuth": False
        },
        "endpoints": {
            "launch": "/",
            "embed": None,
            "health": "/api/health"
        }
    })

# REQUIRED: Health Check Endpoint
@app.route('/api/health')
def health_check():
    return jsonify({
        "status": "healthy",
        "timestamp": time.strftime('%Y-%m-%dT%H:%M:%SZ'),
        "checks": {
            "database": "healthy",
            "externalServices": "healthy",
            "memory": "healthy"
        },
        "metrics": {
            "responseTime": time.time(),
            "memoryUsage": psutil.virtual_memory().used / 1024 / 1024,
            "cpuUsage": psutil.cpu_percent()
        }
    })

# OPTIONAL: Launch Endpoint
@app.route('/api/launch')
def launch():
    return jsonify({
        "launchUrl": "http://localhost:5000",
        "windowOptions": {
            "width": 1200,
            "height": 800,
            "resizable": True,
            "scrollbars": True
        },
        "authRequired": False,
        "authToken": None
    })

if __name__ == '__main__':
    print("Your module is running on port 5000")
    print("Module info available at: http://localhost:5000/api/module-info")
    print("Health check available at: http://localhost:5000/api/health")
    app.run(debug=True, host='0.0.0.0', port=5000)
```

#### Step 3: Run Your App
```bash
python app.py
```

### Option 3: PHP

#### Step 1: Create Your App
```php
<?php
// index.php
header('Content-Type: text/html');
echo 'Hello World, my name is [Your Module Name]';
?>

<?php
// api/module-info.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

echo json_encode([
    'module' => [
        'id' => 'your-module-id',
        'name' => 'Your Module Name',
        'version' => '1.0.0',
        'description' => 'Brief description of what your module does',
        'author' => 'Your Name or Company',
        'repository' => 'https://github.com/yourusername/your-repo'
    ],
    'status' => [
        'state' => 'online',
        'lastHeartbeat' => date('c'),
        'uptime' => time()
    ],
    'capabilities' => [
        'supportsLaunch' => true,
        'supportsEmbed' => false,
        'requiresAuth' => false
    ],
    'endpoints' => [
        'launch' => '/',
        'embed' => null,
        'health' => '/api/health.php'
    ]
]);
?>

<?php
// api/health.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

echo json_encode([
    'status' => 'healthy',
    'timestamp' => date('c'),
    'checks' => [
        'database' => 'healthy',
        'externalServices' => 'healthy',
        'memory' => 'healthy'
    ],
    'metrics' => [
        'responseTime' => microtime(true),
        'memoryUsage' => memory_get_usage(true) / 1024 / 1024,
        'cpuUsage' => 0
    ]
]);
?>
```

## Customization Guide

### 1. Update Module Information
Replace these values with your actual module details:
- `id`: Unique identifier (e.g., "user-management", "inventory-system")
- `name`: Human-readable name (e.g., "User Management System")
- `description`: What your module does
- `author`: Your name or company
- `repository`: Your source code location

### 2. Configure Capabilities
Set these based on what your module supports:
- `supportsLaunch`: Can it be opened in a new window?
- `supportsEmbed`: Can it be embedded in an iframe?
- `requiresAuth`: Does it need authentication?

### 3. Set Endpoint URLs
Update the URLs to match your actual endpoints:
- `launch`: Where users go to use your module
- `embed`: Where to embed your module (if supported)
- `health`: Your health check endpoint

## Testing Your Implementation

### 1. Test Module Info
```bash
curl http://localhost:3000/api/module-info
```

### 2. Test Health Check
```bash
curl http://localhost:3000/api/health
```

### 3. Verify CORS
Open your browser's developer tools and check that the requests work from different origins.

## Common Issues and Solutions

### Issue: CORS errors
**Solution:** Make sure you've enabled CORS in your framework

### Issue: JSON parsing errors
**Solution:** Verify your JSON is valid using a JSON validator

### Issue: Endpoints not found
**Solution:** Check your route definitions and server configuration

### Issue: Health check shows unhealthy
**Solution:** Implement proper health checks for your dependencies

## Next Steps

1. **Test your endpoints** using the curl commands above
2. **Update the module information** with your actual details
3. **Deploy your app** to a web server
4. **Register your module** with RuneFrameOS-Core
5. **Test integration** with the main system

## Support

If you run into issues:
1. Check the [Module API Specification](../Module_API_Specification.md)
2. Verify your JSON responses match the required format
3. Test your endpoints independently before integration
4. Check your server logs for error messages

Remember: Your module must be accessible via HTTP/HTTPS for RuneFrameOS-Core to communicate with it!
