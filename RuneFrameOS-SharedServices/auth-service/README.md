# Authentication Service

A microservice for handling authentication and authorization in the RuneFrameOS system. This service provides user registration, login, JWT token management, and role-based access control.

## Features

- 🔐 **JWT Authentication**: Secure token-based authentication
- 👥 **User Management**: Registration, login, profile management
- 🛡️ **Role-Based Access Control**: Granular permissions system
- 📝 **Input Validation**: Comprehensive request validation with AI-friendly error messages
- 📊 **Health Monitoring**: Detailed health checks and metrics
- 📚 **API Documentation**: OpenAPI 3.0 specification with Swagger UI
- 🚀 **Performance**: Rate limiting and security middleware
- 📝 **Logging**: Structured logging with Winston

## Architecture

```
src/
├── index.ts              # Main application entry point
├── middleware/           # Express middleware
│   ├── auth.ts          # Authentication & authorization
│   ├── errorHandler.ts  # Error handling middleware
│   └── validation.ts    # Request validation
├── models/              # Data models and interfaces
│   └── User.ts         # User model and types
├── routes/              # API route handlers
│   ├── auth.ts         # Authentication endpoints
│   └── health.ts       # Health check endpoints
└── utils/               # Utility functions
    └── logger.ts        # Winston logger configuration
```

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone and navigate to the service directory:**
   ```bash
   cd services/auth-service
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

The service will start on `http://localhost:3001` (or the port specified in your `.env` file).

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/auth/register` | User registration | No |
| `POST` | `/auth/login` | User login | No |
| `POST` | `/auth/refresh` | Refresh access token | No |
| `GET` | `/auth/profile` | Get user profile | Yes |
| `PUT` | `/auth/profile` | Update user profile | Yes |
| `POST` | `/auth/logout` | User logout | Yes |
| `GET` | `/auth/users` | List all users (admin) | Yes |

### Health & Monitoring

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Service health status |
| `GET` | `/health/ready` | Readiness probe |
| `GET` | `/health/live` | Liveness probe |
| `GET` | `/health/metrics` | Service metrics |

### API Documentation

Interactive API documentation is available at:
- **Swagger UI**: `http://localhost:3001/docs`
- **OpenAPI Spec**: `http://localhost:3001/docs/swagger.json`

## Authentication Flow

1. **Registration**: User creates account with email, username, and password
2. **Login**: User authenticates and receives JWT access and refresh tokens
3. **API Access**: Include `Authorization: Bearer <access_token>` header
4. **Token Refresh**: Use refresh token to get new access token when expired
5. **Logout**: Invalidate refresh token (client-side cleanup)

## Security Features

- **JWT Tokens**: Secure, stateless authentication
- **Password Hashing**: bcrypt with configurable salt rounds
- **Rate Limiting**: Configurable request rate limiting
- **CORS Protection**: Configurable cross-origin restrictions
- **Input Validation**: Comprehensive request validation
- **Security Headers**: Helmet.js security middleware

## Role-Based Access Control

### User Roles

- **Admin**: Full system access
- **Moderator**: User management and analytics
- **User**: Basic access to own resources
- **Guest**: Limited read-only access

### Permissions

- `read:users` - View user information
- `write:users` - Create/update users
- `delete:users` - Remove users
- `read:admin` - Access admin features
- `write:admin` - Modify admin settings
- `manage:roles` - Manage user roles
- `manage:permissions` - Manage permissions
- `read:analytics` - View analytics data
- `write:analytics` - Modify analytics
- `manage:system` - System administration

## Development

### Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run test         # Run tests
npm run lint         # Lint code
npm run docs:generate # Generate OpenAPI documentation
```

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting (recommended)

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3001` | Service port |
| `NODE_ENV` | `development` | Environment mode |
| `JWT_SECRET` | - | JWT signing secret |
| `JWT_ACCESS_EXPIRES_IN` | `15m` | Access token expiry |
| `JWT_REFRESH_EXPIRES_IN` | `7d` | Refresh token expiry |
| `ALLOWED_ORIGINS` | `http://localhost:3000` | CORS allowed origins |
| `LOG_LEVEL` | `info` | Logging level |
| `BCRYPT_SALT_ROUNDS` | `12` | Password hashing rounds |
| `RATE_LIMIT_MAX_REQUESTS` | `100` | Rate limit per window |

### Logging

The service uses Winston for structured logging with multiple transports:

- **Console**: Colored output for development
- **File**: Error logs and combined logs
- **JSON Format**: Structured logging for production

Log levels: `error`, `warn`, `info`, `debug`

## Monitoring & Health Checks

### Health Endpoints

- **`/health`**: Comprehensive service status
- **`/health/ready`**: Kubernetes readiness probe
- **`/health/live`**: Kubernetes liveness probe
- **`/health/metrics`**: Service metrics for monitoring

### Metrics Collected

- Service uptime
- Memory usage (heap, external)
- Process information
- Environment details

## Error Handling

The service provides AI-friendly error responses with:

- **Structured Error Format**: Consistent error structure
- **Validation Details**: Field-level validation errors
- **Helpful Suggestions**: Actionable error resolution steps
- **Context Information**: Request details and timestamps

### Error Response Format

```json
{
  "error": {
    "message": "Validation failed",
    "statusCode": 400,
    "timestamp": "2024-01-01T00:00:00.000Z",
    "path": "/auth/register",
    "method": "POST",
    "validationErrors": [...],
    "suggestions": [...]
  }
}
```

## API Gateway Integration

This service is designed to work with an API gateway:

- **Route Prefix**: `/auth/*` endpoints
- **Health Checks**: Gateway health monitoring
- **Rate Limiting**: Gateway-level rate limiting
- **Load Balancing**: Multiple service instances

## Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Redis for session management
- [ ] Email verification system
- [ ] Two-factor authentication
- [ ] OAuth integration
- [ ] Audit logging
- [ ] Metrics export (Prometheus)
- [ ] Distributed tracing

## Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation
4. Ensure all tests pass
5. Follow semantic commit messages

## License

This project is part of the RuneFrameOS system and follows the same licensing terms.

## Support

For issues and questions:
- Check the API documentation
- Review the logs
- Check health endpoints
- Contact the development team
