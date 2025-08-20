# RuneFrame-DevOps Services & Port Map
# Comprehensive port mapping to avoid conflicts
# Author: RuneFrameOS Infrastructure Team
# Version: 1.0.0
# Last Updated: 2025-08-18

## 🚨 **PORT CONFLICT RESOLUTION**
**Port 8000 is commonly used and should be avoided** - We've reassigned MarkItDown to port **8001**

## 📊 **CURRENT SERVICE STATUS**

### ✅ **HEALTHY SERVICES**
| Service | Port | Status | Health | Description |
|---------|------|--------|---------|-------------|
| **Grafana** | **3001** | ✅ Running | Healthy | Dashboard & Visualization |
| **Elasticsearch** | **9200** | ✅ Running | Healthy | Search & Analytics Engine |
| **Kibana** | **5601** | ✅ Running | Unhealthy | Log Visualization |
| **Node Exporter** | **9100** | ✅ Running | Healthy | Host Metrics Collection |
| **cAdvisor** | **8080** | ✅ Running | Healthy | Container Metrics |

### ⚠️ **SERVICES WITH ISSUES**
| Service | Port | Status | Health | Issue |
|---------|------|--------|---------|-------|
| **Prometheus** | **9090** | 🔄 Restarting | N/A | Configuration/Startup Issue |
| **OpenTelemetry** | **9464** | 🔄 Restarting | N/A | Configuration/Startup Issue |
| **Filebeat** | **N/A** | 🔄 Restarting | N/A | Configuration/Startup Issue |
| **MarkItDown** | **8001** | 🔄 Restarting | N/A | Startup Script Issue |

## 🌐 **COMPLETE PORT MAPPING**

### **MONITORING STACK PORTS**
| Port | Service | Protocol | External Access | Purpose |
|-------|---------|----------|-----------------|---------|
| **3001** | Grafana | HTTP | ✅ `http://watson.pedantictheory.com:3001` | Dashboards & Visualization |
| **5601** | Kibana | HTTP | ✅ `http://watson.pedantictheory.com:5601` | Log Analysis & Search |
| **9200** | Elasticsearch | HTTP | ✅ `http://watson.pedantictheory.com:9200` | Search Engine API |
| **9300** | Elasticsearch | TCP | ❌ Internal Only | Node Communication |
| **9090** | Prometheus | HTTP | ✅ `http://watson.pedantictheory.com:9090` | Metrics Collection |
| **9093** | AlertManager | HTTP | ✅ `http://watson.pedantictheory.com:9093` | Alert Management |
| **9464** | OpenTelemetry | HTTP | ✅ `http://watson.pedantictheory.com:9464` | Telemetry Collection |
| **4317** | OpenTelemetry | gRPC | ✅ `watson.pedantictheory.com:4317` | OTLP gRPC |
| **4318** | OpenTelemetry | HTTP | ✅ `watson.pedantictheory.com:4318` | OTLP HTTP |
| **514** | OpenTelemetry | UDP | ✅ `watson.pedantictheory.com:514` | Syslog Collection |
| **9100** | Node Exporter | HTTP | ✅ `http://watson.pedantictheory.com:9100` | Host Metrics |
| **8080** | cAdvisor | HTTP | ✅ `http://watson.pedantictheory.com:8080` | Container Metrics |
| **8001** | MarkItDown | HTTP | ✅ `http://watson.pedantictheory.com:8001` | PDF to Markdown API |

### **SYSTEM PORTS (NON-MONITORING)**
| Port | Service | Protocol | Purpose | Notes |
|-------|---------|----------|---------|-------|
| **22** | SSH | TCP | Remote Access | Standard SSH port |
| **8188** | ComfyUI | HTTP | AI/ML Service | Rich's AI workflow tool |
| **10010** | System Service | TCP | Internal | Kubernetes/System |
| **10248** | System Service | TCP | Internal | Kubernetes/System |
| **10249** | System Service | TCP | Internal | Kubernetes/System |
| **10256** | System Service | TCP | Internal | Kubernetes/System |
| **10250** | System Service | TCP | Internal | Kubernetes/System |
| **6444** | System Service | TCP | Internal | Kubernetes/System |
| **631** | CUPS | TCP | Printing | Local printing service |

## 🔧 **PORT CONFLICT RESOLUTION ACTIONS**

### **1. MarkItDown Port Change (8000 → 8001)**
- **Reason**: Port 8000 is commonly used by many services
- **Action**: Updated docker-compose.yml to use port 8001
- **Impact**: Minimal - just need to update documentation and API calls

### **2. Grafana Port Change (3000 → 3001)**
- **Reason**: Port 3000 had conflicts
- **Action**: Already resolved - using port 3001
- **Impact**: None - already working

### **3. Port Range Recommendations**
- **3000-3999**: Web UIs (Grafana, Kibana, etc.)
- **8000-8999**: Application APIs (MarkItDown, custom services)
- **9000-9999**: Monitoring tools (Prometheus, AlertManager, etc.)
- **10000+**: System services, custom applications

## 📋 **SERVICE DEPENDENCIES**

### **Core Dependencies**
```
Elasticsearch (9200) ← Kibana (5601)
Elasticsearch (9200) ← Filebeat
Elasticsearch (9200) ← MarkItDown (8001)
Prometheus (9090) ← Grafana (3001)
```

### **Data Flow**
```
Network Devices → OpenTelemetry (514) → Elasticsearch (9200)
Host Metrics → Node Exporter (9100) → Prometheus (9090)
Container Metrics → cAdvisor (8080) → Prometheus (9090)
Documents → MarkItDown (8001) → Elasticsearch (9200)
```

## 🚀 **NEXT STEPS**

### **Immediate Actions**
1. ✅ **Update MarkItDown port to 8001** (already done)
2. 🔄 **Fix MarkItDown startup script** (in progress)
3. 🔄 **Resolve Prometheus startup issues**
4. 🔄 **Resolve OpenTelemetry startup issues**
5. 🔄 **Resolve Filebeat startup issues**

### **Port Assignment Rules**
- **Never use port 8000** - too commonly used
- **Avoid ports 3000, 5000, 8000, 9000** - common defaults
- **Use port ranges** for related services
- **Document all port assignments** in this file

## 📞 **TROUBLESHOOTING**

### **Port Conflict Detection**
```bash
# Check what's using a specific port
sudo netstat -tlnp | grep :PORT_NUMBER

# Check all listening ports
sudo netstat -tlnp | grep LISTEN

# Check Docker container ports
docker compose ps
```

### **Service Health Checks**
```bash
# Check all services
docker compose ps

# Check specific service logs
docker compose logs SERVICE_NAME

# Restart specific service
docker compose restart SERVICE_NAME
```

## 🔒 **SECURITY NOTES**

### **External Access**
- **Ports 3001, 5601, 9200, 9090, 9464, 8001**: External access enabled
- **Ports 9300, 4317, 4318**: Internal cluster communication only
- **Port 514**: UDP syslog collection (firewall rules needed)

### **Authentication**
- **Grafana**: admin/runeframeos2025!
- **Elasticsearch**: No authentication (development mode)
- **MarkItDown**: No authentication (API key recommended for production)

---
**Last Updated**: 2025-08-18 21:23 UTC  
**Next Review**: 2025-08-25  
**Maintainer**: RuneFrameOS Infrastructure Team
