# 🔒 RuneFrameOS Security Checklist

## 🚨 **CRITICAL: Pre-Commit Security Review**

**BEFORE every Git commit, verify:**

### ✅ **SSH Keys & Certificates**
- [ ] **NO SSH private keys** in any files
- [ ] **NO certificate files** (.pem, .p12, .pfx)
- [ ] **NO public keys** with sensitive comments
- [ ] **NO SSH config files** with real hostnames/IPs

### ✅ **Passwords & Secrets**
- [ ] **NO hardcoded passwords** in code
- [ ] **NO API keys** in source files
- [ ] **NO database credentials** in SQL files
- [ ] **NO JWT secrets** in documentation
- [ ] **NO access tokens** in examples

### ✅ **Environment Files**
- [ ] **NO .env files** committed
- [ ] **NO .env.local** committed
- [ ] **NO environment variables** with real values
- [ ] **Use .env.example** with placeholder values

### ✅ **Database & Infrastructure**
- [ ] **NO real database URLs** in code
- [ ] **NO server hostnames** in configs
- [ ] **NO IP addresses** in documentation
- [ ] **NO real domain names** in examples

---

## 🔍 **Security Scanning Tools**

### GitGuardian Integration
```bash
# Install GitGuardian CLI
pip install ggshield

# Scan repository before commit
ggshield scan path .

# Scan specific files
ggshield scan path ./src/
```

### Pre-commit Hooks
```bash
# Install pre-commit
pip install pre-commit

# Install hooks
pre-commit install

# Run all hooks
pre-commit run --all-files
```

---

## 📁 **File Types to NEVER Commit**

### 🚫 **Absolutely Forbidden**
```
*.key          # SSH private keys
*.pem          # Certificates
*.p12          # PKCS#12 files
*.pfx          # Windows certificates
id_rsa*        # SSH keys
*.pub          # Public keys (if sensitive)
*.env          # Environment files
*.secret       # Secret files
secrets/       # Secret directories
```

### 🚫 **Infrastructure Files**
```
k8s/secrets/   # Kubernetes secrets
*.secret.yaml  # Secret YAML files
docker-compose.override.yml  # Local overrides
```

### 🚫 **Database Files**
```
*.sql          # SQL files with credentials
*.db           # Database files
*.sqlite       # SQLite databases
```

---

## ✅ **Safe File Patterns**

### ✅ **Environment Templates**
```bash
# .env.example (safe to commit)
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/db
JWT_SECRET=your-secret-here
API_KEY=your-api-key-here
```

### ✅ **Configuration Templates**
```yaml
# config.example.yaml (safe to commit)
database:
  host: localhost
  port: 5432
  name: database_name
  user: username
  password: password_here
```

### ✅ **Documentation Examples**
```markdown
# Example API call (safe to commit)
curl -H "Authorization: Bearer YOUR_TOKEN" \
     https://api.example.com/endpoint
```

---

## 🚨 **Emergency Security Procedures**

### **If Secrets Are Committed:**
1. **IMMEDIATELY** revoke exposed credentials
2. **IMMEDIATELY** rotate SSH keys
3. **IMMEDIATELY** change database passwords
4. **IMMEDIATELY** regenerate API keys
5. **Contact security team** immediately

### **Git History Cleanup:**
```bash
# Remove file from Git history (DANGEROUS - use with caution)
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch path/to/secret/file' \
  --prune-empty --tag-name-filter cat -- --all

# Force push to remote (DANGEROUS)
git push origin --force --all
```

---

## 📋 **Pre-Push Security Checklist**

### **Before Pushing to GitHub:**
- [ ] **Run security scan**: `ggshield scan path .`
- [ ] **Check .gitignore**: Ensure sensitive files are excluded
- [ ] **Review recent commits**: Look for sensitive data
- [ ] **Check file extensions**: No .key, .pem, .env files
- [ ] **Search for patterns**: Look for "password", "secret", "key"
- [ ] **Verify documentation**: No real credentials in examples

### **Security Commands:**
```bash
# Search for potential secrets
grep -r "password\|secret\|key\|token" . --exclude-dir=node_modules

# Check for SSH keys
find . -name "*.key" -o -name "id_rsa*" -o -name "*.pem"

# Check for environment files
find . -name ".env*" -not -name ".env.example"

# Check for SQL files
find . -name "*.sql"
```

---

## 🔐 **Secure Development Practices**

### **Environment Variables**
```bash
# Use .env.local (never committed)
echo "DATABASE_URL=postgresql://user:pass@localhost/db" > .env.local

# Use .env.example (safe to commit)
echo "DATABASE_URL=postgresql://user:password@localhost:5432/database" > .env.example
```

### **Configuration Management**
```typescript
// config.ts (safe to commit)
export const config = {
  database: {
    url: process.env.DATABASE_URL || 'postgresql://user:pass@localhost/db',
    ssl: process.env.NODE_ENV === 'production'
  }
}
```

### **API Documentation**
```markdown
# API Example (safe to commit)
```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     https://api.runeframeos.com/v1/users
```
```

---

## 📞 **Security Contacts**

### **Immediate Response**
- **Security Team**: security@badguygas.com
- **Infrastructure**: infra@badguygas.com
- **Development Lead**: dev@badguygas.com

### **Escalation Path**
1. **Developer** → **Team Lead** → **Security Team**
2. **Security Team** → **CTO** → **CEO**
3. **External Security** → **Legal Team**

---

## 📚 **Security Resources**

### **Documentation**
- [GitGuardian Security Guide](https://docs.gitguardian.com/)
- [GitHub Security Best Practices](https://docs.github.com/en/security)
- [OWASP Security Guidelines](https://owasp.org/)

### **Tools**
- **GitGuardian**: Secret detection
- **TruffleHog**: Git history scanning
- **Pre-commit**: Automated security checks
- **ESLint Security**: Code security rules

---

**Last Updated**: Current Development Session  
**Security Status**: ✅ Secure - All vulnerabilities removed  
**Next Review**: Before every Git commit
