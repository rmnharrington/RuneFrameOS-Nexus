# 🧪 Testing and Deployment Strategy

## Overview
This document outlines the testing approach and deployment strategy for RuneFrameOS, including how to handle local vs. server environments and testing accounts.

## 🎯 Testing Strategy

### **Option 1: Keep Local Accounts (Recommended)**

**Pros:**
- ✅ No data loss during development
- ✅ Quick testing without database setup
- ✅ Consistent test data across team members
- ✅ Easy rollback if issues arise

**Cons:**
- ⚠️ Need to maintain mock data
- ⚠️ Potential confusion between mock and real data

### **Option 2: Create New Database Accounts**

**Pros:**
- ✅ Real-world testing scenarios
- ✅ Database integration testing
- ✅ Production-like environment

**Cons:**
- ⚠️ Need to set up PostgreSQL locally
- ⚠️ Data loss when switching environments
- ⚠️ More complex setup process

## 🔄 Recommended Approach: Hybrid Strategy

### **Phase 1: Development (Current)**
- Keep existing mock accounts for quick testing
- Use environment variables to switch between mock and real API
- Maintain backward compatibility

### **Phase 2: Integration Testing**
- Set up local PostgreSQL database
- Create test accounts in database
- Test both mock and real API paths

### **Phase 3: Production**
- Use real database only
- Remove mock accounts
- Full production deployment

## 🏗️ Environment Configuration

### **Environment Variables**

Create `.env.local` for local development:
```bash
# API Configuration
REACT_APP_API_URL=http://localhost:3001
REACT_APP_USE_MOCK_API=true

# Database Configuration (for backend)
DB_USER=postgres
DB_HOST=localhost
DB_NAME=runeframeos
DB_PASSWORD=your_password
DB_PORT=5432

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
```

Create `.env.production` for production:
```bash
# API Configuration
REACT_APP_API_URL=https://api.runeframe-os.com
REACT_APP_USE_MOCK_API=false

# Database Configuration
DB_USER=runeframe_user
DB_HOST=your-production-db-host
DB_NAME=runeframeos
DB_PASSWORD=your_secure_password
DB_PORT=5432

# JWT Configuration
JWT_SECRET=your_production_jwt_secret
```

## 🧪 Testing Accounts

### **Mock Accounts (Development)**
```javascript
const mockAccounts = {
  'Builder1@badguygas.com': { password: 'builder123', role: 'builder' },
  'Traveler1@badguygas.com': { password: 'traveler123', role: 'traveler' },
  'betaTester@badguygas.com': { password: '12358', role: 'builder' },
  'dev@badguygas.com': { password: '12358', role: 'builder' }
}
```

### **Database Accounts (Testing/Production)**
```sql
-- Test accounts for database
INSERT INTO users (email, username, password_hash, user_role) VALUES
('test-builder@runeframeos.com', 'testbuilder', '$2b$12$hashed_password', 'builder'),
('test-traveler@runeframeos.com', 'testtraveler', '$2b$12$hashed_password', 'traveler'),
('test-dev@runeframeos.com', 'testdev', '$2b$12$hashed_password', 'developer');
```

## 🚀 Deployment Strategy

### **Local Development**
1. **Frontend**: `npm run dev` (localhost:3000)
2. **Backend**: `npm run dev` (localhost:3001)
3. **Database**: Local PostgreSQL or mock API
4. **Environment**: Development with mock accounts

### **Staging Environment**
1. **Frontend**: Deployed to staging server
2. **Backend**: Deployed to staging server
3. **Database**: Staging PostgreSQL instance
4. **Environment**: Staging with real database

### **Production Environment**
1. **Frontend**: Deployed to production server
2. **Backend**: Deployed to production server
3. **Database**: Production PostgreSQL instance
4. **Environment**: Production with real database

## 🔧 Implementation Steps

### **Step 1: Environment-Based API Switching**

Update `src/services/api.ts`:
```typescript
// Environment-based API configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.runeframe-os.com' 
  : process.env.REACT_APP_API_URL || 'http://localhost:3001'

// Check if we should use mock API
const USE_MOCK_API = process.env.REACT_APP_USE_MOCK_API === 'true' || process.env.NODE_ENV === 'development'
```

### **Step 2: Conditional API Calls**

```typescript
login: async (credentials: { email: string; password: string }) => {
  if (USE_MOCK_API) {
    // Use mock authentication
    return mockLogin(credentials)
  } else {
    // Use real API call
    return realApiLogin(credentials)
  }
}
```

### **Step 3: Database Setup Scripts**

Create `scripts/setup-database.sh`:
```bash
#!/bin/bash

# Create database and user
psql -U postgres -c "CREATE DATABASE runeframeos;"
psql -U postgres -c "CREATE USER runeframe_user WITH PASSWORD 'your_password';"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE runeframeos TO runeframe_user;"

# Run migrations
psql -U runeframe_user -d runeframeos -f database/schema/01_users.sql
psql -U runeframe_user -d runeframeos -f database/schema/02_user_modules.sql

# Create test accounts
psql -U runeframe_user -d runeframeos -f scripts/test-accounts.sql
```

## 🎯 Testing Workflow

### **Development Testing**
1. Start frontend: `npm run dev`
2. Start backend: `cd backend && npm run dev`
3. Use mock accounts for quick testing
4. Test new features with mock data

### **Integration Testing**
1. Set up local PostgreSQL database
2. Configure environment variables
3. Create test accounts in database
4. Test with real API endpoints
5. Verify data persistence

### **Production Testing**
1. Deploy to staging environment
2. Test with production-like data
3. Verify all functionality
4. Deploy to production

## 🔄 Migration Strategy

### **Phase 1: Parallel Development**
- Keep mock API working
- Add real API alongside
- Use environment variables to switch
- Test both paths

### **Phase 2: Gradual Migration**
- Start using real API for new features
- Keep mock API for existing features
- Test thoroughly before switching

### **Phase 3: Full Migration**
- Remove mock API
- Use real database only
- Update all components
- Deploy to production

## 🐛 Troubleshooting

### **Common Issues**

1. **CORS Errors**
   - Check CORS configuration in backend
   - Verify frontend URL in environment variables
   - Test with Postman

2. **Database Connection**
   - Verify PostgreSQL is running
   - Check credentials in .env
   - Test connection with psql

3. **Environment Variables**
   - Check .env file exists
   - Verify variable names
   - Restart development server

4. **API Switching**
   - Check REACT_APP_USE_MOCK_API value
   - Verify API_BASE_URL
   - Check network requests in browser

## 📊 Monitoring and Logging

### **Development Logging**
```typescript
// Add logging to API calls
console.log('🔐 API CALL:', endpoint, data)
console.log('✅ API RESPONSE:', response)
console.log('❌ API ERROR:', error)
```

### **Production Monitoring**
- API response times
- Error rates
- User activity
- Database performance

## 🎯 Next Steps

1. **Implement environment-based API switching**
2. **Set up local PostgreSQL database**
3. **Create test accounts in database**
4. **Test both mock and real API paths**
5. **Deploy to staging environment**
6. **Deploy to production**

This strategy ensures a smooth transition from development to production while maintaining testing capabilities throughout the process.
