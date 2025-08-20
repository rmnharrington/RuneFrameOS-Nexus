# RuneFrameOS Code Style Guide

## 🎯 **Purpose**

This document establishes comprehensive code style and formatting standards for the RuneFrameOS ecosystem, ensuring consistent, secure, and maintainable code across all components. These standards are designed to support security-first development practices and machine-friendly processing.

## 📋 **Core Principles**

### **1. Security-First Development**
- **Secure by Design**: All code must follow secure coding practices
- **Input Validation**: Validate all inputs at boundaries
- **Output Encoding**: Encode all outputs to prevent injection attacks
- **Least Privilege**: Use minimal required permissions and access
- **Defense in Depth**: Implement multiple layers of security controls

### **2. Machine-Friendly Formatting**
- **Consistent Indentation**: Use 2 spaces for indentation (no tabs)
- **ASCII Compatibility**: Use only ASCII characters in code
- **Clear Naming**: Use descriptive, self-documenting names
- **Structured Comments**: Use standardized comment formats

### **3. Human-Machine Coexistence**
- **Readable Code**: Write code for both humans and machines
- **Documentation**: Include comprehensive inline documentation
- **Consistency**: Follow established patterns across all components
- **Maintainability**: Design for long-term maintenance and updates

## 🔧 **Language-Specific Standards**

### **JavaScript/TypeScript Standards**

#### **File Naming**
```
✅ Correct: user_authentication_service.ts
❌ Incorrect: userAuthenticationService.ts, user-authentication-service.ts
```

#### **Variable and Function Naming**
```typescript
// ✅ Correct - Descriptive, underscore-based
const user_authentication_token = 'abc123';
const is_user_authenticated = true;
const validate_user_input = (input: string): boolean => { /* ... */ };

// ❌ Incorrect - Inconsistent naming
const userAuthToken = 'abc123';
const isUserAuthenticated = true;
const validateUserInput = (input: string): boolean => { /* ... */ };
```

#### **Class Naming**
```typescript
// ✅ Correct - PascalCase for classes, descriptive names
class UserAuthenticationService {
  private readonly security_config: SecurityConfig;
  
  constructor(security_config: SecurityConfig) {
    this.security_config = security_config;
  }
}

// ❌ Incorrect - Inconsistent naming
class userAuthService {
  private readonly securityConfig: SecurityConfig;
}
```

#### **Code Structure**
```typescript
// ✅ Correct - Clear structure with security validation
export class DataProcessor {
  private readonly validation_rules: ValidationRule[];
  
  constructor(validation_rules: ValidationRule[]) {
    this.validation_rules = validation_rules;
  }
  
  public process_user_data(input_data: UserInput): ProcessedData {
    // Validate input at boundary
    this.validate_input(input_data);
    
    // Process with security checks
    const processed_data = this.apply_security_filters(input_data);
    
    // Validate output
    this.validate_output(processed_data);
    
    return processed_data;
  }
  
  private validate_input(input: UserInput): void {
    if (!input || typeof input !== 'object') {
      throw new SecurityError('Invalid input format');
    }
    // Additional validation logic
  }
}
```

### **Python Standards**

#### **File Naming**
```
✅ Correct: user_authentication_service.py
❌ Incorrect: userAuthenticationService.py, user-authentication-service.py
```

#### **Variable and Function Naming**
```python
# ✅ Correct - Snake_case for variables and functions
user_authentication_token = "abc123"
is_user_authenticated = True

def validate_user_input(input_data: str) -> bool:
    """Validate user input with security checks."""
    if not input_data or not isinstance(input_data, str):
        return False
    # Additional validation logic
    return True

# ❌ Incorrect - Inconsistent naming
userAuthToken = "abc123"
isUserAuthenticated = True

def validateUserInput(inputData: str) -> bool:
    return True
```

#### **Class Naming**
```python
# ✅ Correct - PascalCase for classes
class UserAuthenticationService:
    def __init__(self, security_config: SecurityConfig):
        self.security_config = security_config
        self.validation_rules = security_config.get_validation_rules()
    
    def authenticate_user(self, user_credentials: UserCredentials) -> AuthResult:
        """Authenticate user with security validation."""
        # Input validation
        if not self._validate_credentials(user_credentials):
            raise SecurityError("Invalid credentials format")
        
        # Authentication logic
        auth_result = self._perform_authentication(user_credentials)
        
        # Output validation
        if not self._validate_auth_result(auth_result):
            raise SecurityError("Invalid authentication result")
        
        return auth_result
```

### **C# Standards**

#### **File Naming**
```
✅ Correct: UserAuthenticationService.cs
❌ Incorrect: userAuthenticationService.cs, user-authentication-service.cs
```

#### **Variable and Function Naming**
```csharp
// ✅ Correct - PascalCase for public members, camelCase for private
public class UserAuthenticationService
{
    private readonly SecurityConfig _securityConfig;
    private readonly ILogger<UserAuthenticationService> _logger;
    
    public UserAuthenticationService(SecurityConfig securityConfig, ILogger<UserAuthenticationService> logger)
    {
        _securityConfig = securityConfig ?? throw new ArgumentNullException(nameof(securityConfig));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }
    
    public async Task<AuthResult> AuthenticateUserAsync(UserCredentials credentials)
    {
        // Input validation
        if (credentials == null)
            throw new ArgumentNullException(nameof(credentials));
        
        // Security validation
        if (!await ValidateCredentialsAsync(credentials))
            throw new SecurityException("Invalid credentials");
        
        // Authentication logic
        var authResult = await PerformAuthenticationAsync(credentials);
        
        // Output validation
        if (!ValidateAuthResult(authResult))
            throw new SecurityException("Invalid authentication result");
        
        return authResult;
    }
}
```

## 🔒 **Security Coding Standards**

### **Input Validation**
```typescript
// ✅ Correct - Comprehensive input validation
export function validate_user_input(input: unknown): UserInput {
  // Type validation
  if (typeof input !== 'object' || input === null) {
    throw new SecurityError('Input must be an object');
  }
  
  const user_input = input as Record<string, unknown>;
  
  // Required field validation
  if (typeof user_input.username !== 'string' || user_input.username.length === 0) {
    throw new SecurityError('Username is required and must be a string');
  }
  
  // Length validation
  if (user_input.username.length > 50) {
    throw new SecurityError('Username too long');
  }
  
  // Pattern validation
  if (!/^[a-zA-Z0-9_-]+$/.test(user_input.username)) {
    throw new SecurityError('Username contains invalid characters');
  }
  
  // Sanitization
  const sanitized_input: UserInput = {
    username: user_input.username.trim().toLowerCase(),
    email: typeof user_input.email === 'string' ? user_input.email.trim() : undefined
  };
  
  return sanitized_input;
}
```

### **Output Encoding**
```typescript
// ✅ Correct - Output encoding to prevent XSS
export function render_user_data(user_data: UserData): string {
  const encoded_username = encode_uri_component(user_data.username);
  const encoded_email = encode_uri_component(user_data.email);
  
  return `
    <div class="user-profile">
      <h2>${escape_html(user_data.display_name)}</h2>
      <p>Username: ${escape_html(user_data.username)}</p>
      <p>Email: ${escape_html(user_data.email)}</p>
    </div>
  `;
}

function escape_html(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}
```

### **Error Handling**
```typescript
// ✅ Correct - Secure error handling
export class SecureErrorHandler {
  public static handle_error(error: unknown, context: string): void {
    // Log error for debugging (no sensitive data)
    console.error(`Error in ${context}:`, {
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      context: context
    });
    
    // Don't expose internal details to users
    if (error instanceof SecurityError) {
      throw new PublicError('Security validation failed');
    }
    
    // Generic error for unknown issues
    throw new PublicError('An unexpected error occurred');
  }
}
```

## 📝 **Comment Standards**

### **Function Documentation**
```typescript
/**
 * Validates user authentication credentials with security checks.
 * 
 * @param credentials - User credentials to validate
 * @param security_config - Security configuration for validation rules
 * @returns Promise<ValidationResult> - Validation result with security status
 * 
 * @throws SecurityError - When credentials fail security validation
 * @throws ValidationError - When credentials format is invalid
 * 
 * @security This function performs input validation and sanitization
 * to prevent injection attacks and ensure data integrity.
 */
export async function validate_user_credentials(
  credentials: UserCredentials,
  security_config: SecurityConfig
): Promise<ValidationResult> {
  // Implementation
}
```

### **Security Comments**
```typescript
// SECURITY: Input validation at boundary
if (!is_valid_input_format(user_input)) {
  throw new SecurityError('Invalid input format');
}

// SECURITY: Output encoding to prevent XSS
const encoded_output = encode_for_html(user_data);

// SECURITY: Least privilege principle
const minimal_permissions = get_minimal_required_permissions(user_role);
```

## 🧪 **Testing Standards**

### **Test File Naming**
```
✅ Correct: user_authentication_service.test.ts
❌ Incorrect: userAuthenticationService.test.ts, user-authentication-service.test.ts
```

### **Test Structure**
```typescript
// ✅ Correct - Comprehensive test structure
describe('UserAuthenticationService', () => {
  let auth_service: UserAuthenticationService;
  let mock_security_config: SecurityConfig;
  
  beforeEach(() => {
    mock_security_config = createMockSecurityConfig();
    auth_service = new UserAuthenticationService(mock_security_config);
  });
  
  describe('authenticate_user', () => {
    it('should validate input format', async () => {
      // Test input validation
      const invalid_input = { username: '', password: null };
      
      await expect(auth_service.authenticate_user(invalid_input))
        .rejects.toThrow(SecurityError);
    });
    
    it('should prevent injection attacks', async () => {
      // Test security validation
      const malicious_input = {
        username: '<script>alert("xss")</script>',
        password: 'password123'
      };
      
      await expect(auth_service.authenticate_user(malicious_input))
        .rejects.toThrow(SecurityError);
    });
  });
});
```

## 🔍 **Code Review Checklist**

### **Security Review**
- [ ] Input validation at all boundaries
- [ ] Output encoding for all user data
- [ ] Proper error handling without information disclosure
- [ ] Least privilege principle applied
- [ ] No hardcoded secrets or credentials
- [ ] Secure communication protocols used

### **Code Quality Review**
- [ ] Consistent naming conventions followed
- [ ] Proper indentation and formatting
- [ ] Comprehensive documentation
- [ ] Unit tests for all functions
- [ ] Integration tests for security features
- [ ] No code duplication

### **Performance Review**
- [ ] Efficient algorithms and data structures
- [ ] Proper resource management
- [ ] No memory leaks
- [ ] Scalable design patterns
- [ ] Appropriate error handling

## 📊 **Compliance Integration**

### **NIST SSDF Alignment**
- **PW.1.1**: Secure coding practices implemented
- **PW.1.2**: Input validation at boundaries
- **PW.1.3**: Output encoding for security
- **PW.2.1**: Secure error handling
- **PW.2.2**: Least privilege implementation

### **CISA Secure by Design**
- **Principle 1**: Take ownership of customer security outcomes
- **Principle 2**: Embrace radical transparency and accountability
- **Principle 3**: Lead from the top

## 🔄 **Maintenance and Updates**

### **Review Schedule**
- **Monthly**: Code style compliance review
- **Quarterly**: Security standard updates
- **Annually**: Comprehensive standard review

### **Change Management**
- All style changes documented in CHANGES.md
- Automated linting and formatting tools
- Code review requirements for all changes
- Security validation for all updates

---

**Last Updated**: 2025-01-07
**Version**: 1.0.0
**Status**: Active
**Next Review**: 2025-02-07


