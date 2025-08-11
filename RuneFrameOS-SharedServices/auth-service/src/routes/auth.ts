import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { 
  authenticateToken, 
  requireRole, 
  requirePermission,
  optionalAuth,
  AuthenticatedRequest 
} from '../middleware/auth';
import { 
  registrationValidation, 
  loginValidation, 
  emailValidation,
  passwordValidation,
  tokenValidation,
  refreshTokenValidation,
  paginationValidation
} from '../middleware/validation';
import { asyncHandler } from '../middleware/errorHandler';
import { logger } from '../utils/logger';
import { 
  User, 
  mockUsers, 
  rolePermissions,
  CreateUserRequest,
  LoginRequest,
  UpdateUserRequest,
  PasswordResetRequest,
  PasswordResetConfirmRequest,
  EmailVerificationRequest,
  ChangePasswordRequest
} from '../models/User';

const router = Router();

// Generate JWT tokens
const generateTokens = (user: User) => {
  const secret = process.env.JWT_SECRET || 'fallback-secret';
  const accessToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      permissions: user.permissions
    },
    secret,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    {
      id: user.id,
      type: 'refresh'
    },
    secret,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - username
 *               - password
 *               - confirmPassword
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               username:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 20
 *               password:
 *                 type: string
 *                 minLength: 8
 *               confirmPassword:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error
 *       409:
 *         description: User already exists
 */
router.post('/register', registrationValidation, asyncHandler(async (req: Request, res: Response) => {
  const { email, username, password, firstName, lastName }: CreateUserRequest = req.body;

  // Check if user already exists
  const existingUser = mockUsers.find(
    user => user.email === email || user.username === username
  );

  if (existingUser) {
    return res.status(409).json({
      error: {
        message: 'User with this email or username already exists',
        statusCode: 409,
        timestamp: new Date().toISOString(),
        suggestions: [
          'Try using a different email address',
          'Choose a different username',
          'If you already have an account, try logging in instead'
        ]
      }
    });
  }

  // Hash password
  const saltRounds = 12;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // Create new user
  const newUser: User = {
    id: Date.now().toString(),
    email,
    username,
    passwordHash,
    role: 'user',
    permissions: rolePermissions.user,
    isActive: true,
    isEmailVerified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    profile: {
      firstName,
      lastName,
      preferences: {
        theme: 'system',
        language: 'en',
        notifications: {
          email: true,
          push: false,
          sms: false,
          marketing: false
        },
        privacy: {
          profileVisibility: 'friends',
          showEmail: false,
          showLastSeen: true
        }
      }
    }
  };

  // Add to mock data (in real app, save to database)
  mockUsers.push(newUser);

  logger.info('New user registered', {
    userId: newUser.id,
    email: newUser.email,
    username: newUser.username
  });

  // Return user without password hash
  const { passwordHash: _, ...userWithoutPassword } = newUser;
  
  res.status(201).json({
    message: 'User registered successfully',
    user: userWithoutPassword,
    nextSteps: [
      'Check your email for verification link',
      'Complete your profile setup',
      'Explore the system features'
    ]
  });
}));

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate user and get access token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Email or username
 *               password:
 *                 type: string
 *               rememberMe:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *                 expiresIn:
 *                   type: number
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', loginValidation, asyncHandler(async (req: Request, res: Response) => {
  const { username, password, rememberMe }: LoginRequest = req.body;

  // Find user by email or username
  const user = mockUsers.find(
    u => (u.email === username || u.username === username) && u.isActive
  );

  if (!user) {
    logger.warn('Login attempt with non-existent user', { username });
    return res.status(401).json({
      error: {
        message: 'Invalid credentials',
        statusCode: 401,
        timestamp: new Date().toISOString(),
        suggestions: [
          'Check your username/email spelling',
          'Verify your password',
          'Make sure your account is active'
        ]
      }
    });
  }

  // Verify password
  const isValidPassword = await bcrypt.compare(password, user.passwordHash);
  if (!isValidPassword) {
    logger.warn('Login attempt with invalid password', { userId: user.id });
    return res.status(401).json({
      error: {
        message: 'Invalid credentials',
        statusCode: 401,
        timestamp: new Date().toISOString(),
        suggestions: [
          'Check your password spelling',
          'Try using the password reset feature',
          'Contact support if you continue having issues'
        ]
      }
    });
  }

  // Check if email is verified
  if (!user.isEmailVerified) {
    return res.status(403).json({
      error: {
        message: 'Email not verified',
        statusCode: 403,
        timestamp: new Date().toISOString(),
        suggestions: [
          'Check your email for verification link',
          'Request a new verification email',
          'Contact support if you need help'
        ]
      }
    });
  }

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user);

  // Update last login
  user.lastLoginAt = new Date();
  user.updatedAt = new Date();

  logger.info('User logged in successfully', {
    userId: user.id,
    email: user.email,
    username: user.username
  });

  // Return user without password hash
  const { passwordHash: _, ...userWithoutPassword } = user;

  res.json({
    message: 'Login successful',
    user: userWithoutPassword,
    accessToken,
    refreshToken,
    expiresIn: 15 * 60, // 15 minutes in seconds
    nextSteps: [
      'Use the access token in Authorization header',
      'Store refresh token securely',
      'Token expires in 15 minutes'
    ]
  });
}));

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh access token using refresh token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       401:
 *         description: Invalid refresh token
 */
router.post('/refresh', refreshTokenValidation, asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  try {
    const secret = process.env.JWT_SECRET || 'fallback-secret';
    const decoded = jwt.verify(refreshToken, secret) as any;

    if (decoded.type !== 'refresh') {
      throw new Error('Invalid token type');
    }

    const user = mockUsers.find(u => u.id === decoded.id && u.isActive);
    if (!user) {
      throw new Error('User not found');
    }

    const tokens = generateTokens(user);

    logger.info('Token refreshed successfully', { userId: user.id });

    res.json({
      message: 'Token refreshed successfully',
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresIn: 15 * 60
    });
  } catch (error) {
    logger.warn('Token refresh failed', { error: error instanceof Error ? error.message : String(error) });
    res.status(401).json({
      error: {
        message: 'Invalid refresh token',
        statusCode: 401,
        timestamp: new Date().toISOString(),
        suggestions: [
          'Try logging in again',
          'Check if your refresh token is valid',
          'Contact support if the issue persists'
        ]
      }
    });
  }
}));

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get current user profile
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/profile', authenticateToken, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const user = mockUsers.find(u => u.id === req.user!.id);
  
  if (!user) {
    return res.status(404).json({
      error: {
        message: 'User not found',
        statusCode: 404,
        timestamp: new Date().toISOString()
      }
    });
  }

  const { passwordHash: _, ...userWithoutPassword } = user;
  
  res.json({
    message: 'Profile retrieved successfully',
    user: userWithoutPassword
  });
}));

/**
 * @swagger
 * /auth/profile:
 *   put:
 *     summary: Update current user profile
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               bio:
 *                 type: string
 *               preferences:
 *                 type: object
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized
 */
router.put('/profile', authenticateToken, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const updateData: UpdateUserRequest = req.body;
  const user = mockUsers.find(u => u.id === req.user!.id);

  if (!user) {
    return res.status(404).json({
      error: {
        message: 'User not found',
        statusCode: 404,
        timestamp: new Date().toISOString()
      }
    });
  }

  // Update user data
  if (updateData.firstName) user.profile!.firstName = updateData.firstName;
  if (updateData.lastName) user.profile!.lastName = updateData.lastName;
  if (updateData.bio) user.profile!.bio = updateData.bio;
  if (updateData.preferences) {
    user.profile!.preferences = { ...user.profile!.preferences, ...updateData.preferences };
  }

  user.updatedAt = new Date();

  logger.info('User profile updated', { userId: user.id });

  const { passwordHash: _, ...userWithoutPassword } = user;

  res.json({
    message: 'Profile updated successfully',
    user: userWithoutPassword
  });
}));

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user (invalidate refresh token)
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post('/logout', authenticateToken, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  // In a real application, you would invalidate the refresh token
  // For now, we'll just return a success message
  
  logger.info('User logged out', { userId: req.user!.id });

  res.json({
    message: 'Logout successful',
    nextSteps: [
      'Remove the access token from your client',
      'Remove the refresh token from your client',
      'You will need to log in again to access protected resources'
    ]
  });
}));

/**
 * @swagger
 * /auth/users:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Number of users per page
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *       403:
 *         description: Insufficient permissions
 */
router.get('/users', 
  authenticateToken, 
  requirePermission('read:users'),
  paginationValidation,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const users = mockUsers
      .map(({ passwordHash: _, ...user }) => user)
      .slice(startIndex, endIndex);

    const totalUsers = mockUsers.length;
    const totalPages = Math.ceil(totalUsers / limit);

    res.json({
      message: 'Users retrieved successfully',
      users,
      pagination: {
        page,
        limit,
        totalUsers,
        totalPages,
        hasNext: endIndex < totalUsers,
        hasPrev: page > 1
      }
    });
  })
);

export { router as authRoutes };
