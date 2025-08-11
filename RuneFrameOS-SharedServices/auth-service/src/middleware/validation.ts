import { Request, Response, NextFunction } from 'express';
import { body, param, query, validationResult } from 'express-validator';
import { createError } from './errorHandler';
import { logger } from '../utils/logger';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorDetails = errors.array().map(error => ({
      field: error.type === 'field' ? error.path : 'unknown',
      message: error.msg,
      value: (error as any).value,
      location: (error as any).location
    }));

    logger.warn('Validation failed', {
      path: req.path,
      method: req.method,
      errors: errorDetails
    });

    // AI-friendly error response with structured validation details
    const errorResponse = {
      error: {
        message: 'Validation failed',
        statusCode: 400,
        timestamp: new Date().toISOString(),
        path: req.path,
        method: req.method,
        validationErrors: errorDetails,
        suggestions: generateValidationSuggestions(errorDetails)
      }
    };

    return res.status(400).json(errorResponse);
  }

  next();
};

const generateValidationSuggestions = (errors: any[]) => {
  const suggestions: string[] = [];
  
  errors.forEach(error => {
    switch (error.field) {
      case 'email':
        suggestions.push('Email should be a valid email address (e.g., user@example.com)');
        break;
      case 'password':
        suggestions.push('Password should be at least 8 characters long and contain letters, numbers, and special characters');
        break;
      case 'username':
        suggestions.push('Username should be 3-20 characters long and contain only letters, numbers, and underscores');
        break;
      default:
        suggestions.push(`Please check the ${error.field} field and ensure it meets the requirements`);
    }
  });

  return suggestions;
};

// Common validation rules
export const emailValidation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
    .trim(),
  validateRequest
];

export const passwordValidation = [
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one letter, one number, and one special character'),
  validateRequest
];

export const usernameValidation = [
  body('username')
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  validateRequest
];

export const loginValidation = [
  body('username')
    .notEmpty()
    .withMessage('Username or email is required')
    .trim(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  validateRequest
];

export const registrationValidation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
    .trim(),
  body('username')
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one letter, one number, and one special character'),
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
  validateRequest
];

export const tokenValidation = [
  param('token')
    .isString()
    .withMessage('Token must be a string')
    .isLength({ min: 1 })
    .withMessage('Token is required'),
  validateRequest
];

export const refreshTokenValidation = [
  body('refreshToken')
    .notEmpty()
    .withMessage('Refresh token is required')
    .isString()
    .withMessage('Refresh token must be a string'),
  validateRequest
];

export const paginationValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  validateRequest
];
