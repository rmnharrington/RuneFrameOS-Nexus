import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { createError } from './errorHandler';
import { logger } from '../utils/logger';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    permissions: string[];
  };
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      throw createError('Access token required', 401);
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      logger.error('JWT_SECRET not configured');
      throw createError('Authentication service misconfigured', 500);
    }

    const decoded = jwt.verify(token, secret) as any;
    
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      permissions: decoded.permissions || []
    };

    logger.info('Token authenticated successfully', {
      userId: decoded.id,
      email: decoded.email,
      role: decoded.role
    });

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      logger.warn('Invalid JWT token', { token: req.headers.authorization });
      throw createError('Invalid token', 401);
    } else if (error instanceof jwt.TokenExpiredError) {
      logger.warn('Expired JWT token');
      throw createError('Token expired', 401);
    }
    
    logger.error('Authentication error', { error: error instanceof Error ? error.message : String(error) });
    throw createError('Authentication failed', 401);
  }
};

export const requireRole = (roles: string | string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw createError('Authentication required', 401);
    }

    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    
    if (!allowedRoles.includes(req.user.role)) {
      logger.warn('Insufficient role access', {
        userId: req.user.id,
        userRole: req.user.role,
        requiredRoles: allowedRoles
      });
      throw createError('Insufficient permissions', 403);
    }

    next();
  };
};

export const requirePermission = (permissions: string | string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw createError('Authentication required', 401);
    }

    const requiredPermissions = Array.isArray(permissions) ? permissions : [permissions];
    
    const hasAllPermissions = requiredPermissions.every(permission =>
      req.user!.permissions.includes(permission)
    );

    if (!hasAllPermissions) {
      logger.warn('Insufficient permissions', {
        userId: req.user.id,
        userPermissions: req.user.permissions,
        requiredPermissions
      });
      throw createError('Insufficient permissions', 403);
    }

    next();
  };
};

export const optionalAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const secret = process.env.JWT_SECRET;
      if (secret) {
        const decoded = jwt.verify(token, secret) as any;
        req.user = {
          id: decoded.id,
          email: decoded.email,
          role: decoded.role,
          permissions: decoded.permissions || []
        };
      }
    }
  } catch (error) {
    // Silently fail for optional auth
    logger.debug('Optional authentication failed', { error: error instanceof Error ? error.message : String(error) });
  }
  
  next();
};
