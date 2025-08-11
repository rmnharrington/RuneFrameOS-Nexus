export interface User {
  id: string;
  email: string;
  username: string;
  passwordHash: string;
  role: UserRole;
  permissions: Permission[];
  isActive: boolean;
  isEmailVerified: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  profile?: UserProfile;
}

export interface UserProfile {
  firstName?: string;
  lastName?: string;
  avatar?: string;
  bio?: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  marketing: boolean;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'friends';
  showEmail: boolean;
  showLastSeen: boolean;
}

export type UserRole = 'admin' | 'moderator' | 'user' | 'guest';

export type Permission = 
  | 'read:users'
  | 'write:users'
  | 'delete:users'
  | 'read:admin'
  | 'write:admin'
  | 'manage:roles'
  | 'manage:permissions'
  | 'read:analytics'
  | 'write:analytics'
  | 'manage:system';

export interface CreateUserRequest {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
}

export interface UpdateUserRequest {
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  preferences?: Partial<UserPreferences>;
}

export interface LoginRequest {
  username: string; // Can be email or username
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  user: Omit<User, 'passwordHash'>;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirmRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface EmailVerificationRequest {
  token: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Mock data for development
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@runeframeos.com',
    username: 'admin',
    passwordHash: '$2b$10$hashedpassword123',
    role: 'admin',
    permissions: [
      'read:users',
      'write:users',
      'delete:users',
      'read:admin',
      'write:admin',
      'manage:roles',
      'manage:permissions',
      'read:analytics',
      'write:analytics',
      'manage:system'
    ],
    isActive: true,
    isEmailVerified: true,
    lastLoginAt: new Date(),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
    profile: {
      firstName: 'System',
      lastName: 'Administrator',
      bio: 'System administrator for RuneFrameOS',
      preferences: {
        theme: 'dark',
        language: 'en',
        notifications: {
          email: true,
          push: true,
          sms: false,
          marketing: false
        },
        privacy: {
          profileVisibility: 'public',
          showEmail: false,
          showLastSeen: false
        }
      }
    }
  },
  {
    id: '2',
    email: 'user@example.com',
    username: 'testuser',
    passwordHash: '$2b$10$hashedpassword456',
    role: 'user',
    permissions: [
      'read:users'
    ],
    isActive: true,
    isEmailVerified: true,
    lastLoginAt: new Date(Date.now() - 86400000), // 1 day ago
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date(),
    profile: {
      firstName: 'Test',
      lastName: 'User',
      bio: 'Regular user account for testing',
      preferences: {
        theme: 'light',
        language: 'en',
        notifications: {
          email: true,
          push: false,
          sms: false,
          marketing: false
        },
        privacy: {
          profileVisibility: 'friends',
          showEmail: true,
          showLastSeen: true
        }
      }
    }
  }
];

export const rolePermissions: Record<UserRole, Permission[]> = {
  admin: [
    'read:users',
    'write:users',
    'delete:users',
    'read:admin',
    'write:admin',
    'manage:roles',
    'manage:permissions',
    'read:analytics',
    'write:analytics',
    'manage:system'
  ],
  moderator: [
    'read:users',
    'write:users',
    'read:admin',
    'read:analytics'
  ],
  user: [
    'read:users'
  ],
  guest: []
};
