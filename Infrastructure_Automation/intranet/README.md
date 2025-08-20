# 🏢 Bad Guy Gas IT Intranet

## Overview

A professional enterprise intranet page for Bad Guy Gas, providing centralized access to all IT resources, monitoring tools, and development services. The intranet is deployed on `gandalf.pedantictheory.com` (sherlock server) with HTTPS/SSL security.

## 🌐 Access Information

- **URL**: https://gandalf.pedantictheory.com
- **Server**: sherlock.pedantictheory.com (172.18.254.41)
- **Port**: 443 (HTTPS)
- **Protocol**: HTTPS with SSL/TLS encryption

## 🚀 Features

### **Professional Design**
- Modern enterprise styling with responsive design
- Professional color scheme and typography
- Smooth animations and transitions
- Mobile-friendly responsive layout

### **Resource Categories**
1. **🔍 Monitoring & Observability**
   - Grafana Dashboards (Port 3001)
   - Kibana Log Analysis (Port 5601)
   - Prometheus Metrics (Port 9090)
   - AlertManager (Port 9093)
   - Elasticsearch (Port 9200)
   - OpenTelemetry (Port 9464)

2. **🛠️ Development Tools**
   - MarkItDown Service (Port 8001)
   - Node Exporter (Port 9100)
   - cAdvisor (Port 8080)

3. **🤖 AI & Machine Learning**
   - ComfyUI (Port 8188)
   - OpenWebUI (Port 8080)

4. **🏗️ Infrastructure & Kubernetes**
   - K3S Cluster (sherlock:6443)
   - MCP Server (Port 30021)

5. **📚 Documentation & Resources**
   - RuneFrame-DevOps Repository
   - Monitoring Stack Guides

### **Technical Features**
- Real-time date/time display
- Service status indicators
- Smooth scrolling navigation
- Performance monitoring
- Accessibility enhancements
- Security headers and HTTPS enforcement

## 🏗️ Architecture

### **Server Configuration**
- **Host**: sherlock.pedantictheory.com
- **IP**: 172.18.254.41
- **Web Server**: Nginx with HTTP/2 support
- **SSL**: Custom certificates from `/etc/ssl/`

### **File Structure**
```
/var/www/gandalf-intranet/
├── index.html          # Main intranet page
├── style.css           # Professional styling
├── script.js           # Interactive functionality
├── health              # Health check endpoint
└── README.md           # This documentation
```

### **Nginx Configuration**
- **Config File**: `/etc/nginx/sites-available/gandalf-intranet`
- **Enabled Site**: `/etc/nginx/sites-enabled/gandalf-intranet`
- **Logs**: `/var/log/nginx/gandalf-intranet-*.log`

## 🔧 Deployment

### **Prerequisites**
- Root/sudo access on sherlock
- SSL certificates in `/etc/ssl/gandalf.crt` and `/etc/ssl/private/gandalf.key`
- Network access to port 443

### **Quick Deployment**
```bash
# 1. Copy files to sherlock
scp -r intranet/* richard@sherlock.pedantictheory.com:~/intranet/

# 2. SSH to sherlock and run deployment
ssh richard@sherlock.pedantictheory.com
cd ~/intranet
sudo ./deploy-intranet-gandalf.sh
```

### **Manual Deployment Steps**
```bash
# 1. Install nginx (if not present)
sudo apt update && sudo apt install -y nginx

# 2. Create intranet directory
sudo mkdir -p /var/www/gandalf-intranet
sudo chown -R www-data:www-data /var/www/gandalf-intranet

# 3. Copy intranet files
sudo cp -r intranet/* /var/www/gandalf-intranet/

# 4. Configure nginx
sudo cp nginx-gandalf.conf /etc/nginx/sites-available/gandalf-intranet
sudo ln -sf /etc/nginx/sites-available/gandalf-intranet /etc/nginx/sites-enabled/

# 5. Test and restart nginx
sudo nginx -t
sudo systemctl restart nginx
```

## 🔒 Security Features

### **SSL/TLS Configuration**
- TLS 1.2 and 1.3 support
- Strong cipher suites
- HSTS headers
- SSL session caching

### **Security Headers**
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Content-Security-Policy
- Referrer-Policy

### **Access Control**
- Rate limiting (10 requests/second)
- Hidden file protection
- Backup file blocking
- Secure error pages

## 📊 Monitoring & Health Checks

### **Health Endpoints**
- **Main Health**: `https://gandalf.pedantictheory.com/health`
- **Nginx Status**: `https://gandalf.pedantictheory.com/status`

### **Log Files**
- **Access Logs**: `/var/log/nginx/gandalf-intranet-access.log`
- **Error Logs**: `/var/log/nginx/gandalf-intranet-error.log`

### **Performance Monitoring**
- Gzip compression enabled
- Static asset caching (1 year)
- HTML caching (1 hour)
- Performance metrics logging

## 🚨 Troubleshooting

### **Common Issues**

#### **SSL Certificate Errors**
```bash
# Check certificate validity
sudo openssl x509 -in /etc/ssl/gandalf.crt -text -noout

# Verify nginx can read certificates
sudo nginx -t
```

#### **Nginx Configuration Issues**
```bash
# Test configuration
sudo nginx -t

# Check nginx status
sudo systemctl status nginx

# View error logs
sudo tail -f /var/log/nginx/gandalf-intranet-error.log
```

#### **Permission Issues**
```bash
# Fix file permissions
sudo chown -R www-data:www-data /var/www/gandalf-intranet
sudo chmod -R 755 /var/www/gandalf-intranet
```

### **Debug Commands**
```bash
# Check nginx processes
sudo ps aux | grep nginx

# Check port binding
sudo netstat -tlnp | grep :443

# Test SSL connection
openssl s_client -connect gandalf.pedantictheory.com:443
```

## 🔄 Maintenance

### **Regular Tasks**
- Monitor SSL certificate expiration
- Review access and error logs
- Update intranet content as needed
- Backup configuration files

### **Updates**
```bash
# Update intranet files
sudo cp -r ~/intranet/* /var/www/gandalf-intranet/
sudo chown -R www-data:www-data /var/www/gandalf-intranet

# Reload nginx (if config changed)
sudo nginx -t && sudo systemctl reload nginx
```

## 📚 Resources

### **Documentation**
- [Nginx Configuration](https://nginx.org/en/docs/)
- [SSL/TLS Best Practices](https://ssl-config.mozilla.org/)
- [Web Security Headers](https://owasp.org/www-project-secure-headers/)

### **Support**
- **Infrastructure Team**: RuneFrameOS Infrastructure Team
- **Server**: sherlock.pedantictheory.com
- **Repository**: RuneFrame-DevOps

## 📋 Change Log

### **Version 1.0.0** (2025-08-18)
- Initial intranet deployment
- Professional enterprise styling
- Complete IT resource integration
- HTTPS/SSL security implementation
- Nginx configuration with security headers

---

**Last Updated**: 2025-08-18  
**Maintainer**: RuneFrameOS Infrastructure Team  
**Status**: ✅ Production Ready
