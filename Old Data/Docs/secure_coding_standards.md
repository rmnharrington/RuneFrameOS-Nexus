# Secure Coding Standards for RuneFrameOS

## **Overview**

This document establishes comprehensive secure coding standards for the RuneFrameOS ecosystem. It provides language-specific guidelines, common vulnerability prevention patterns, and security-focused coding practices to ensure secure software development across all components.

**Document Version**: 1.0.0  
**Last Updated**: 2025-01-07  
**Scope**: RuneFrameOS Platform and App Ecosystem  
**Applicability**: All development teams and third-party developers  

## **Core Security Principles**

### **1. Defense in Depth**
- Implement multiple layers of security controls
- Never rely on a single security mechanism
- Assume any single control can be bypassed

### **2. Principle of Least Privilege**
- Grant minimum necessary permissions
- Limit access to resources and functionality
- Use role-based access control (RBAC)

### **3. Fail Securely**
- Default to secure state
- Handle errors gracefully without exposing sensitive information
- Implement proper error handling and logging

### **4. Input Validation and Sanitization**
- Validate all input at boundaries
- Sanitize data before processing
- Use parameterized queries and prepared statements

### **5. Secure by Default**
- Configure secure defaults
- Require explicit opt-in for insecure features
- Implement secure coding patterns by default

## **Language-Specific Secure Coding Guidelines**

### **Python Security Standards**

#### **Input Validation and Sanitization**

```python
# ✅ SECURE: Input validation with proper sanitization
import re
from typing import Optional

def validate_email(email: str) -> Optional[str]:
    """Validate and sanitize email input."""
    if not email or not isinstance(email, str):
        return None
    
    # Remove whitespace and convert to lowercase
    email = email.strip().lower()
    
    # Validate email format
    email_pattern = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
    if not email_pattern.match(email):
        return None
    
    # Additional security checks
    if len(email) > 254:  # RFC 5321 limit
        return None
    
    return email

# ❌ INSECURE: No input validation
def process_email(email):
    return email.lower()  # Vulnerable to injection attacks
```

#### **SQL Injection Prevention**

```python
# ✅ SECURE: Use parameterized queries
import psycopg2
from psycopg2.extras import RealDictCursor

def get_user_by_email(email: str) -> Optional[dict]:
    """Get user by email using parameterized query."""
    try:
        with psycopg2.connect(DATABASE_URL) as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    "SELECT * FROM users WHERE email = %s AND is_active = TRUE",
                    (email,)
                )
                return cur.fetchone()
    except Exception as e:
        logger.error(f"Database error: {e}")
        return None

# ❌ INSECURE: String concatenation (SQL injection)
def get_user_by_email_insecure(email):
    query = f"SELECT * FROM users WHERE email = '{email}'"
    # Vulnerable to SQL injection
```

#### **Authentication and Authorization**

```python
# ✅ SECURE: Proper authentication with session management
import hashlib
import secrets
import time
from typing import Optional

class SecureAuth:
    def __init__(self):
        self.session_store = {}
    
    def hash_password(self, password: str) -> str:
        """Hash password with salt using secure algorithm."""
        salt = secrets.token_hex(16)
        hash_obj = hashlib.pbkdf2_hmac('sha256', password.encode(), salt.encode(), 100000)
        return f"{salt}${hash_obj.hex()}"
    
    def verify_password(self, password: str, hashed: str) -> bool:
        """Verify password against hash."""
        try:
            salt, hash_hex = hashed.split('$')
            hash_obj = hashlib.pbkdf2_hmac('sha256', password.encode(), salt.encode(), 100000)
            return secrets.compare_digest(hash_obj.hex(), hash_hex)
        except Exception:
            return False
    
    def create_session(self, user_id: str) -> str:
        """Create secure session token."""
        token = secrets.token_urlsafe(32)
        expiry = time.time() + 3600  # 1 hour
        self.session_store[token] = {
            'user_id': user_id,
            'expires': expiry,
            'created': time.time()
        }
        return token
    
    def validate_session(self, token: str) -> Optional[str]:
        """Validate session token and return user ID."""
        if token not in self.session_store:
            return None
        
        session = self.session_store[token]
        if time.time() > session['expires']:
            del self.session_store[token]
            return None
        
        return session['user_id']
```

#### **File Operations Security**

```python
# ✅ SECURE: Safe file operations with path validation
import os
from pathlib import Path
from typing import Optional

def secure_file_read(file_path: str, allowed_directory: str) -> Optional[str]:
    """Securely read file with path validation."""
    try:
        # Normalize and validate path
        normalized_path = os.path.normpath(file_path)
        full_path = os.path.join(allowed_directory, normalized_path)
        
        # Ensure path is within allowed directory
        if not os.path.commonpath([full_path, allowed_directory]) == allowed_directory:
            raise ValueError("Path traversal attempt detected")
        
        # Validate file exists and is readable
        if not os.path.isfile(full_path):
            return None
        
        # Read file with size limit
        with open(full_path, 'r', encoding='utf-8') as f:
            content = f.read(1024 * 1024)  # 1MB limit
            return content
            
    except Exception as e:
        logger.error(f"File read error: {e}")
        return None

# ❌ INSECURE: Direct file access without validation
def insecure_file_read(file_path):
    with open(file_path, 'r') as f:
        return f.read()  # Vulnerable to path traversal
```

### **JavaScript Security Standards**

#### **XSS Prevention**

```javascript
// ✅ SECURE: XSS prevention with proper encoding
function sanitizeHtml(input) {
    if (typeof input !== 'string') {
        return '';
    }
    
    // Use DOMPurify or similar library for HTML sanitization
    return DOMPurify.sanitize(input, {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
        ALLOWED_ATTR: ['href', 'title']
    });
}

function displayUserContent(content) {
    const sanitized = sanitizeHtml(content);
    document.getElementById('user-content').innerHTML = sanitized;
}

// ❌ INSECURE: Direct innerHTML assignment
function displayUserContentInsecure(content) {
    document.getElementById('user-content').innerHTML = content; // XSS vulnerable
}
```

#### **CSRF Protection**

```javascript
// ✅ SECURE: CSRF token implementation
class SecureAPI {
    constructor() {
        this.csrfToken = this.getCsrfToken();
    }
    
    getCsrfToken() {
        return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    }
    
    async makeRequest(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': this.csrfToken
            },
            body: JSON.stringify(data),
            credentials: 'same-origin'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return response.json();
    }
}

// ❌ INSECURE: No CSRF protection
async function insecureRequest(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response.json();
}
```

#### **Content Security Policy (CSP)**

```javascript
// ✅ SECURE: CSP implementation
// Add to HTML head:
// <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">

// ✅ SECURE: Nonce-based CSP
function loadSecureScript(scriptContent) {
    const nonce = generateNonce();
    const script = document.createElement('script');
    script.nonce = nonce;
    script.textContent = scriptContent;
    document.head.appendChild(script);
}

// ❌ INSECURE: Dynamic script injection
function loadInsecureScript(scriptContent) {
    const script = document.createElement('script');
    script.textContent = scriptContent; // Vulnerable to XSS
    document.head.appendChild(script);
}
```

### **SQL Security Standards**

#### **Parameterized Queries**

```sql
-- ✅ SECURE: Parameterized query (Python example)
SELECT * FROM users WHERE email = %s AND is_active = TRUE

-- ✅ SECURE: Named parameters (Node.js example)
SELECT * FROM users WHERE email = $1 AND is_active = TRUE

-- ❌ INSECURE: String concatenation
SELECT * FROM users WHERE email = 'user@example.com' AND is_active = TRUE
```

#### **Access Control**

```sql
-- ✅ SECURE: Row-level security
CREATE POLICY user_access_policy ON users
    FOR ALL
    USING (auth.uid() = id OR auth.uid() IN (
        SELECT user_id FROM user_permissions WHERE permission = 'admin'
    ));

-- ✅ SECURE: Function-based access control
CREATE OR REPLACE FUNCTION get_user_data(user_id UUID)
RETURNS TABLE(id UUID, name TEXT, email TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Check if current user has permission
    IF NOT EXISTS (
        SELECT 1 FROM user_permissions 
        WHERE user_id = auth.uid() AND target_user_id = get_user_data.user_id
    ) THEN
        RAISE EXCEPTION 'Access denied';
    END IF;
    
    RETURN QUERY
    SELECT u.id, u.name, u.email
    FROM users u
    WHERE u.id = get_user_data.user_id;
END;
$$;
```

## **Common Vulnerability Prevention Patterns**

### **1. Injection Prevention**

#### **SQL Injection**

```python
# ✅ SECURE: Use ORM or parameterized queries
from sqlalchemy import create_engine, text

def get_user_secure(user_id: int) -> Optional[dict]:
    engine = create_engine(DATABASE_URL)
    with engine.connect() as conn:
        result = conn.execute(
            text("SELECT * FROM users WHERE id = :user_id"),
            {"user_id": user_id}
        )
        return result.fetchone()

# ❌ INSECURE: String concatenation
def get_user_insecure(user_id):
    query = f"SELECT * FROM users WHERE id = {user_id}"
    # Vulnerable to SQL injection
```

#### **Command Injection**

```python
# ✅ SECURE: Use subprocess with proper arguments
import subprocess
from typing import List

def run_command_secure(command: List[str]) -> Optional[str]:
    """Run command securely with argument list."""
    try:
        result = subprocess.run(
            command,
            capture_output=True,
            text=True,
            timeout=30,
            check=True
        )
        return result.stdout
    except subprocess.TimeoutExpired:
        logger.error("Command timed out")
        return None
    except subprocess.CalledProcessError as e:
        logger.error(f"Command failed: {e}")
        return None

# ❌ INSECURE: Shell command execution
def run_command_insecure(command):
    import os
    return os.system(command)  # Vulnerable to command injection
```

### **2. Authentication and Session Management**

```python
# ✅ SECURE: JWT token implementation
import jwt
import time
from datetime import datetime, timedelta

class SecureJWT:
    def __init__(self, secret_key: str):
        self.secret_key = secret_key
    
    def create_token(self, user_id: str, expires_in: int = 3600) -> str:
        """Create JWT token with expiration."""
        payload = {
            'user_id': user_id,
            'exp': datetime.utcnow() + timedelta(seconds=expires_in),
            'iat': datetime.utcnow(),
            'iss': 'runeframeos'
        }
        return jwt.encode(payload, self.secret_key, algorithm='HS256')
    
    def verify_token(self, token: str) -> Optional[str]:
        """Verify JWT token and return user ID."""
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=['HS256'])
            return payload['user_id']
        except jwt.ExpiredSignatureError:
            logger.warning("Token expired")
            return None
        except jwt.InvalidTokenError:
            logger.warning("Invalid token")
            return None
```

### **3. Data Encryption**

```python
# ✅ SECURE: AES encryption implementation
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
import base64

class SecureEncryption:
    def __init__(self, key: bytes):
        self.cipher = Fernet(key)
    
    @classmethod
    def generate_key(cls, password: str, salt: bytes) -> bytes:
        """Generate encryption key from password."""
        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,
            salt=salt,
            iterations=100000,
        )
        key = base64.urlsafe_b64encode(kdf.derive(password.encode()))
        return key
    
    def encrypt(self, data: str) -> str:
        """Encrypt data."""
        return self.cipher.encrypt(data.encode()).decode()
    
    def decrypt(self, encrypted_data: str) -> Optional[str]:
        """Decrypt data."""
        try:
            decrypted = self.cipher.decrypt(encrypted_data.encode())
            return decrypted.decode()
        except Exception as e:
            logger.error(f"Decryption failed: {e}")
            return None
```

### **4. Input Validation and Sanitization**

```python
# ✅ SECURE: Comprehensive input validation
import re
from typing import Optional, Union
from dataclasses import dataclass

@dataclass
class ValidationResult:
    is_valid: bool
    sanitized_value: Optional[str] = None
    error_message: Optional[str] = None

class InputValidator:
    def __init__(self):
        self.email_pattern = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
        self.username_pattern = re.compile(r'^[a-zA-Z0-9_-]{3,20}$')
        self.password_pattern = re.compile(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$')
    
    def validate_email(self, email: str) -> ValidationResult:
        """Validate and sanitize email address."""
        if not email or not isinstance(email, str):
            return ValidationResult(False, error_message="Invalid email format")
        
        # Sanitize
        email = email.strip().lower()
        
        # Validate
        if not self.email_pattern.match(email):
            return ValidationResult(False, error_message="Invalid email format")
        
        if len(email) > 254:
            return ValidationResult(False, error_message="Email too long")
        
        return ValidationResult(True, sanitized_value=email)
    
    def validate_username(self, username: str) -> ValidationResult:
        """Validate and sanitize username."""
        if not username or not isinstance(username, str):
            return ValidationResult(False, error_message="Invalid username")
        
        # Sanitize
        username = username.strip()
        
        # Validate
        if not self.username_pattern.match(username):
            return ValidationResult(False, error_message="Invalid username format")
        
        return ValidationResult(True, sanitized_value=username)
    
    def validate_password(self, password: str) -> ValidationResult:
        """Validate password strength."""
        if not password or not isinstance(password, str):
            return ValidationResult(False, error_message="Invalid password")
        
        if len(password) < 8:
            return ValidationResult(False, error_message="Password too short")
        
        if not self.password_pattern.match(password):
            return ValidationResult(False, error_message="Password does not meet requirements")
        
        return ValidationResult(True, sanitized_value=password)
```

## **Security Testing and Code Review**

### **Automated Security Testing**

```python
# ✅ SECURE: Security test examples
import pytest
from unittest.mock import patch, MagicMock

class TestSecurityFeatures:
    def test_sql_injection_prevention(self):
        """Test SQL injection prevention."""
        malicious_input = "'; DROP TABLE users; --"
        
        # Test that malicious input is handled safely
        result = validate_user_input(malicious_input)
        assert result.is_valid is False
        assert "SQL injection" in result.error_message
    
    def test_xss_prevention(self):
        """Test XSS prevention."""
        malicious_input = "<script>alert('xss')</script>"
        
        # Test that malicious script is sanitized
        sanitized = sanitize_html(malicious_input)
        assert "<script>" not in sanitized
        assert "alert" not in sanitized
    
    def test_authentication_bypass(self):
        """Test authentication bypass prevention."""
        # Test that unauthenticated requests are rejected
        with patch('auth.validate_token') as mock_validate:
            mock_validate.return_value = None
            
            response = make_authenticated_request("/admin", None)
            assert response.status_code == 401
    
    def test_privilege_escalation(self):
        """Test privilege escalation prevention."""
        # Test that users cannot access resources they don't own
        user_id = "user123"
        resource_id = "resource456"
        
        with patch('auth.get_current_user') as mock_user:
            mock_user.return_value = {"id": user_id}
            
            response = access_resource(resource_id)
            assert response.status_code == 403
```

### **Code Review Security Checklist**

#### **Authentication and Authorization**
- [ ] All endpoints require proper authentication
- [ ] Authorization checks are implemented for all resources
- [ ] Session management is secure
- [ ] Password policies are enforced
- [ ] Multi-factor authentication is implemented where required

#### **Input Validation**
- [ ] All user inputs are validated
- [ ] Input sanitization is implemented
- [ ] Length limits are enforced
- [ ] Type checking is performed
- [ ] Malicious input patterns are blocked

#### **Data Protection**
- [ ] Sensitive data is encrypted at rest
- [ ] Data is encrypted in transit
- [ ] Access controls are implemented
- [ ] Audit logging is enabled
- [ ] Data retention policies are followed

#### **Error Handling**
- [ ] Errors are handled gracefully
- [ ] Sensitive information is not exposed in error messages
- [ ] Proper logging is implemented
- [ ] Error responses are consistent

#### **Security Headers**
- [ ] Content Security Policy is implemented
- [ ] HTTPS is enforced
- [ ] Security headers are set
- [ ] CORS is configured properly

## **Security Tools and Automation**

### **Static Analysis Tools**

```yaml
# .bandit configuration
exclude_dirs: ['tests', 'venv', 'node_modules']
skips: ['B101']  # Skip assert_used warnings in tests

# .pylintrc security settings
[MESSAGES CONTROL]
disable=C0114,C0115,C0116  # Disable docstring warnings

[FORMAT]
max-line-length=100

[BASIC]
good-names=i,j,k,ex,Run,_,id,db

[SIMILARITIES]
min-similarity-lines=4
ignore-comments=yes
ignore-docstrings=yes
ignore-imports=no
```

### **Dependency Scanning**

```python
# requirements-security.txt
# Security-focused requirements with version pinning
cryptography>=3.4.8
pyjwt>=2.3.0
bcrypt>=3.2.0
passlib>=1.7.4
python-multipart>=0.0.5
```

### **CI/CD Security Integration**

```yaml
# .github/workflows/security.yml
name: Security Scan

on: [push, pull_request]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Run Bandit
        run: |
          pip install bandit
          bandit -r . -f json -o bandit-report.json
      
      - name: Run Safety Check
        run: |
          pip install safety
          safety check --json --output safety-report.json
      
      - name: Run OWASP ZAP
        run: |
          docker run -v $(pwd):/zap/wrk/:rw -t owasp/zap2docker-stable zap-baseline.py -t http://localhost:8000
```

## **Conclusion**

These secure coding standards provide a comprehensive foundation for secure software development across the RuneFrameOS ecosystem. All developers must follow these standards to ensure the security and integrity of the platform and applications.

---

**Document Control**  
- **Version**: 1.0.0  
- **Last Updated**: 2025-01-07  
- **Next Review**: 2025-04-07  
- **Owner**: RuneFrameOS Security Team  
- **Approver**: CISO
