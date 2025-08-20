# 🚀 Cursor MCP Server Connection Instructions
## Direct Connection Guide for New Cursor Instances

### 🚨 **CRITICAL: READ AND FOLLOW EXACTLY**

**DO NOT attempt to improve on processes unless explicitly instructed by the human user.**
**🚨 ALWAYS ECHO COMMANDS FOR USER EXECUTION - NEVER EXECUTE SSH/SCP COMMANDS DIRECTLY**

---

## 🔍 **Step 1: Validate Your User Identity**

**BEFORE proceeding, you MUST identify which user you are:**

### **Check Your Local SSH Public Key:**
```bash
cat ~/.ssh/id_rsa.pub
```

### **Compare with Valid Users:**

**User: `richard@WADE`**
```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQC12ambz+g4060lybfJhFtyI57hFM/gBJ8wQ0C1ERBtp+3oSVrDIbTbsmMPLFMR1dBtw30kaGx1NMicxDbvjyCYvSj4ffjSbmYaF1hsmRY4xazDaCjG8SECvj0an9boovlPIWvpUG6UrmPmytjEiEC/nhDmRWlJm8WCc6KUbP0jvbLnItt3e43QsHVPY+6lwayYZ1sAIegeZKuekU+XZL/Mb8L5GoIr+EN1gnYOE/lc1WCrube6eUj/pBYPNbM99o7V2GYXjPcLld4UekD1FJkNE9RRYgLObHUZehoeVby+3wNTPsMp0Ef7RVsJqqRRlFH6Oh59J6GEUhyJrqCU8wuFqrwbuQWiDpvb/itULIQSNlJYC6clxwu9iK0laYFlG4Xx3L2ZOlDjXUnzVlCk5tQeN14vtFIjs6Pj5c3oasMkoA8nltgj4yIpPBu6Eu4Zu4m0NXtHiOmh7CBf4/WPM6XAgRowcUE10wOa428A5b/uMBmJl8ZuSEXCWeWzaWxjc88= richard@WADE
```

**User: `wee@capone`**
```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDHBF8r2JWV5sZRA+1NnV6dZoyHllVfP+7ExMfXiRxolhefYqJvDvtc25DwaYKQ5l5OnmiwRlQPygn4Ac8RdBN80Lrlfssj0xiT9AxdEcb7UEMJBNfEFrZPGnSgzPE9bl6pNIFsnEIhrb7JFG7aYtAhL3nXs3dqrYrNJsv2L6NRI9+Z1sbuFVCv8LNsuImc+jXXRFP5OamTPckAYk+h71b0qdhGkDG5cPRsAxlPhSXRFVWeXUyprerTeo5Eb/PyXYit91d+cCVhRBSduit4Ji88zKykZTth319v43O6OGaFYqO1/b08CNiO/BNcRBcUGT17WIg3awgIONzmyzpivZ2RKK7Kn8wWYoCMyKJs5GAXwDnMnnNvf00SoQoXmo1nMT9GTYSbNVrVbI8a7ehuVGNc//okQT8AAZ9qQjdUGXOoQeNERyjQ6u9IIClME6pXrWceMTBuVd/Z79Jfy+S6ioPySjlvmCpdbhtogHy0I8LfInwGQoGulVXZKcLwHITyWVs= wee@capone
```

### **Identity Confirmation:**
- **If your key matches `richard@WADE`**: You are user `richard`
- **If your key matches `wee@capone`**: You are user `wee`
- **If your key doesn't match either**: STOP and contact admin for account setup

---

## 🌐 **Step 2: Test MCP Server Connectivity**

**The MCP server is now running on `sherlock.pedantictheory.com` and answering on `gandalf.pedantictheory.com` at IP `172.18.254.41`**

### **Test Health Endpoint:**
```bash
curl -s "http://gandalf.pedantictheory.com:30021/health"
```

**Expected Response**: Server should respond (even if empty)

### **Test MCP Protocol:**
```bash
curl -s -X POST "http://gandalf.pedantictheory.com:30021/mcp" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {}}'
```

**Expected Response**: JSON-RPC response with protocol version and capabilities

---

## 🔌 **Step 3: Access MCP Server Context**

### **List Available Resources:**
```bash
curl -s -X POST "http://gandalf.pedantictheory.com:30021/mcp" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "id": 2, "method": "resources/list", "params": {}}'
```

**Expected Response**: List of 50+ context resources including:
- RuneFrameOS documentation
- Governance policies
- Development plans
- MCP server guides

---

## 📁 **Step 4: Upload New Context Files (If Needed)**

### **For User `richard`:**
**Echo these commands for the user to execute:**

```bash
# Upload context files to sherlock
scp -r ./Docs/* richard@sherlock.pedantictheory.com:/home/richard/RuneFrameOS-Context/

# Restart MCP server on sherlock
ssh richard@sherlock.pedantictheory.com "sudo docker restart mcp-server"
```

### **For User `wee`:**
**Echo these commands for the user to execute:**

```bash
# First, create context directory on sherlock
ssh wee@sherlock.pedantictheory.com "mkdir -p /home/wee/RuneFrameOS-Context"

# Upload context files to sherlock
scp -r ./Docs/* wee@sherlock.pedantictheory.com:/home/wee/RuneFrameOS-Context/
```

---

## 🔐 **Step 5: Verify SSH Connectivity**

### **Test SSH Connection:**
**For `richard`:**
```bash
ssh richard@sherlock.pedantictheory.com "whoami && pwd"
```

**For `wee`:**
```bash
ssh wee@sherlock.pedantictheory.com "whoami && pwd"
```

**Expected Response**: Username and home directory path

---

## 📊 **Step 6: Monitor MCP Server Status**

### **Check Server Health:**
```bash
# From external network
curl -s "http://gandalf.pedantictheory.com:30021/health"

# From sherlock (if SSH access works)
ssh [richard|wee]@sherlock.pedantictheory.com "curl -s http://172.18.254.41:30021/health"
```

### **Check Resource Count:**
```bash
curl -s -X POST "http://gandalf.pedantictheory.com:30021/mcp" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "id": 1, "method": "resources/list", "params": {}}' | jq '.result.resources | length'
```

**Expected Response**: Number should be 50+ resources

---

## 🚫 **CRITICAL RESTRICTIONS**

**DO NOT attempt to:**
- Execute SSH/SCP commands directly
- Assume user identity without SSH key validation
- Improve deployment processes
- Modify server configurations
- Use hardcoded usernames

**ALWAYS:**
- Validate user identity via SSH public key first
- Echo commands for user execution
- Use bash.exe from Git for command generation
- Test connections before proceeding
- Follow exact documented processes

---

## 🔍 **Troubleshooting**

### **Connection Refused:**
```bash
# Check if server is running on sherlock (echo for user)
ssh [richard|wee]@sherlock.pedantictheory.com "sudo docker ps | grep mcp-server"
```

### **Authentication Failed:**
```bash
# Verify SSH key (echo for user)
ssh [richard|wee]@sherlock.pedantictheory.com "echo 'SSH connection successful'"
```

### **Context Not Loading:**
```bash
# Check server logs on sherlock (echo for user)
ssh [richard|wee]@sherlock.pedantictheory.com "sudo docker logs mcp-server"
```

---

## 🎯 **Success Criteria**

Your MCP server connection is successful when:
1. ✅ User identity validated via SSH public key
2. ✅ Health endpoint responds: `http://gandalf.pedantictheory.com:30021/health`
3. ✅ MCP protocol handshake completes successfully
4. ✅ Resources list shows 50+ context files
5. ✅ SSH connections to sherlock work with correct user context
6. ✅ Commands are echoed for user execution

---

## 📞 **Emergency Contact**

**If you encounter issues:**
1. **STOP** - Do not attempt to fix or improve
2. **DOCUMENT** - Note exactly what error occurred
3. **CONTACT** - Admin at richard@sherlock.pedantictheory.com
4. **WAIT** - For proper configuration assistance

---

## 🏆 **Connection Complete!**

**Once successful, you will have:**
- 🟢 **Direct Access** to MCP server at `gandalf.pedantictheory.com:30021`
- 🟢 **Full Context** to 50+ RuneFrameOS resources
- 🟢 **User Context** properly validated and configured
- 🟢 **File Upload** capability for new documentation via sherlock

**Your Cursor instance is now connected to the centralized RuneFrameOS MCP ecosystem!**

---

**Remember: Follow these instructions exactly. Do not improve processes unless explicitly told to do so.**
**Always echo commands for user execution - never execute SSH/SCP commands directly.**
