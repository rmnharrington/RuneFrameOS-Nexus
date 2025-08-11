import { Router } from 'express';
import { logger } from '../utils/logger';

const router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Get service health status
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "healthy"
 *                 service:
 *                   type: string
 *                   example: "auth-service"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 uptime:
 *                   type: number
 *                   description: Service uptime in seconds
 *                 version:
 *                   type: string
 *                 environment:
 *                   type: string
 *                 checks:
 *                   type: object
 *                   properties:
 *                     database:
 *                       type: object
 *                     memory:
 *                       type: object
 *                     external:
 *                       type: object
 */
router.get('/', (req, res) => {
  const healthData = {
    status: 'healthy',
    service: 'auth-service',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    checks: {
      database: {
        status: 'healthy',
        message: 'Mock data storage is operational',
        timestamp: new Date().toISOString()
      },
      memory: {
        status: 'healthy',
        used: process.memoryUsage().heapUsed,
        total: process.memoryUsage().heapTotal,
        external: process.memoryUsage().external,
        timestamp: new Date().toISOString()
      },
      external: {
        status: 'healthy',
        message: 'No external dependencies',
        timestamp: new Date().toISOString()
      }
    },
    metadata: {
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      pid: process.pid,
      title: process.title
    }
  };

  logger.info('Health check requested', {
    path: req.path,
    userAgent: req.get('User-Agent'),
    ip: req.ip
  });

  res.status(200).json(healthData);
});

/**
 * @swagger
 * /health/ready:
 *   get:
 *     summary: Check if service is ready to accept requests
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is ready
 *       503:
 *         description: Service is not ready
 */
router.get('/ready', (req, res) => {
  // In a real application, you would check:
  // - Database connectivity
  // - External service dependencies
  // - Configuration validation
  // - etc.
  
  const isReady = true; // Mock readiness check
  
  if (isReady) {
    res.status(200).json({
      status: 'ready',
      service: 'auth-service',
      timestamp: new Date().toISOString(),
      message: 'Service is ready to accept requests'
    });
  } else {
    res.status(503).json({
      status: 'not_ready',
      service: 'auth-service',
      timestamp: new Date().toISOString(),
      message: 'Service is not ready to accept requests',
      issues: [
        'Database connection failed',
        'Configuration validation failed'
      ]
    });
  }
});

/**
 * @swagger
 * /health/live:
 *   get:
 *     summary: Check if service is alive (liveness probe)
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is alive
 */
router.get('/live', (req, res) => {
  res.status(200).json({
    status: 'alive',
    service: 'auth-service',
    timestamp: new Date().toISOString(),
    message: 'Service is alive and running'
  });
});

/**
 * @swagger
 * /health/metrics:
 *   get:
 *     summary: Get service metrics for monitoring
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service metrics
 */
router.get('/metrics', (req, res) => {
  const metrics = {
    service: 'auth-service',
    timestamp: new Date().toISOString(),
    metrics: {
      uptime: {
        value: process.uptime(),
        unit: 'seconds',
        description: 'Service uptime'
      },
      memory: {
        heapUsed: {
          value: process.memoryUsage().heapUsed,
          unit: 'bytes',
          description: 'Heap memory used'
        },
        heapTotal: {
          value: process.memoryUsage().heapTotal,
          unit: 'bytes',
          description: 'Total heap memory'
        },
        external: {
          value: process.memoryUsage().external,
          unit: 'bytes',
          description: 'External memory'
        }
      },
      process: {
        cpuUsage: process.cpuUsage(),
        resourceUsage: process.resourceUsage(),
        pid: process.pid,
        title: process.title
      },
      environment: {
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
        env: process.env.NODE_ENV || 'development'
      }
    }
  };

  res.status(200).json(metrics);
});

export { router as healthRoutes };
