# PostgreSQL Deployment Plan for Sherlock Cluster
## RuneFrameOS Database Infrastructure Setup

### Overview
This plan provides comprehensive instructions for deploying PostgreSQL infrastructure on the sherlock cluster to support the RuneFrameOS ecosystem. The deployment includes high-availability configuration, security hardening, monitoring integration, and proper resource allocation.

---

## Current Infrastructure Assessment

### Cluster Status
- **Cluster**: RuneFrame OS Platform-cluster (sherlock, watson, adler)
- **Nodes**: 3 nodes (1 control plane, 2 GPU workers)
- **Storage**: 1.7TB available on sherlock (primary)
- **Namespaces**: postgresql namespace exists but empty
- **Storage Classes**: None configured (need to create)

### Infrastructure Gaps
1. **Storage Classes**: No persistent storage configured
2. **PostgreSQL Deployment**: No database instances running
3. **Security**: No RBAC, secrets, or network policies
4. **Monitoring**: No database monitoring configured
5. **Backup**: No backup strategy implemented

---

## Phase 1: Storage Infrastructure Setup

### 1.1 Create Storage Classes
```yaml
# postgresql-storage-class.yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: postgresql-ssd
  annotations:
    storageclass.kubernetes.io/is-default-class: "false"
provisioner: kubernetes.io/no-provisioner
volumeBindingMode: WaitForFirstConsumer
allowVolumeExpansion: true
---
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: postgresql-backup
  annotations:
    storageclass.kubernetes.io/is-default-class: "false"
provisioner: kubernetes.io/no-provisioner
volumeBindingMode: WaitForFirstConsumer
allowVolumeExpansion: true
```

### 1.2 Create Persistent Volumes
```yaml
# postgresql-persistent-volumes.yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: postgresql-primary-pv
  labels:
    type: postgresql-primary
spec:
  capacity:
    storage: 100Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: postgresql-ssd
  hostPath:
    path: /mnt/postgresql/primary
    type: DirectoryOrCreate
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: postgresql-replica-pv
  labels:
    type: postgresql-replica
spec:
  capacity:
    storage: 100Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: postgresql-ssd
  hostPath:
    path: /mnt/postgresql/replica
    type: DirectoryOrCreate
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: postgresql-backup-pv
  labels:
    type: postgresql-backup
spec:
  capacity:
    storage: 200Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: postgresql-backup
  hostPath:
    path: /mnt/postgresql/backup
    type: DirectoryOrCreate
```

### 1.3 Create Storage Directories
```bash
#!/bin/bash
# Storage Directory Setup Script

# Create PostgreSQL storage directories
sudo mkdir -p /mnt/postgresql/{primary,replica,backup}
sudo chown -R 999:999 /mnt/postgresql/
sudo chmod -R 750 /mnt/postgresql/

# Verify directories
ls -la /mnt/postgresql/
```

---

## Phase 2: PostgreSQL Security Configuration

### 2.1 Create PostgreSQL Namespace RBAC
```yaml
# postgresql-rbac.yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: postgresql-sa
  namespace: postgresql
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: postgresql-role
  namespace: postgresql
rules:
- apiGroups: [""]
  resources: ["pods", "services", "endpoints", "persistentvolumeclaims"]
  verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
- apiGroups: [""]
  resources: ["configmaps", "secrets"]
  verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: postgresql-rolebinding
  namespace: postgresql
subjects:
- kind: ServiceAccount
  name: postgresql-sa
  namespace: postgresql
roleRef:
  kind: Role
  name: postgresql-role
  apiGroup: rbac.authorization.k8s.io
```

### 2.2 Create PostgreSQL Secrets
```yaml
# postgresql-secrets.yaml
apiVersion: v1
kind: Secret
metadata:
  name: postgresql-secrets
  namespace: postgresql
type: Opaque
data:
  # Base64 encoded passwords (generate with: echo -n "password" | base64)
  postgres-password: cG9zdGdyZXNfcGFzc3dvcmQ=  # postgres_password
  runeframeos-password: cnVuZWZyYW1lb3NfcGFzc3dvcmQ=  # runeframeos_password
  replication-password: cmVwbGljYXRpb25fcGFzc3dvcmQ=  # replication_password
---
apiVersion: v1
kind: Secret
metadata:
  name: postgresql-certs
  namespace: postgresql
type: Opaque
data:
  # SSL certificates (base64 encoded)
  server.crt: <base64-encoded-cert>
  server.key: <base64-encoded-key>
  ca.crt: <base64-encoded-ca>
```

### 2.3 Create Network Policies
```yaml
# postgresql-network-policies.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: postgresql-network-policy
  namespace: postgresql
spec:
  podSelector:
    matchLabels:
      app: postgresql
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: runeframeos
    ports:
    - protocol: TCP
      port: 5432
  - from:
    - namespaceSelector:
        matchLabels:
          name: observability
    ports:
    - protocol: TCP
      port: 5432
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          name: observability
    ports:
    - protocol: TCP
      port: 9200
```

---

## Phase 3: PostgreSQL Deployment

### 3.1 Primary PostgreSQL Instance
```yaml
# postgresql-primary.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgresql-primary
  namespace: postgresql
spec:
  serviceName: postgresql-primary
  replicas: 1
  selector:
    matchLabels:
      app: postgresql
      role: primary
  template:
    metadata:
      labels:
        app: postgresql
        role: primary
    spec:
      serviceAccountName: postgresql-sa
      securityContext:
        runAsUser: 999
        runAsGroup: 999
        fsGroup: 999
      containers:
      - name: postgresql
        image: postgres:15-alpine
        ports:
        - containerPort: 5432
          name: postgresql
        env:
        - name: POSTGRES_DB
          value: runeframeos_main
        - name: POSTGRES_USER
          value: postgres
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: postgresql-secrets
              key: postgres-password
        - name: PGDATA
          value: /var/lib/postgresql/data/pgdata
        - name: POSTGRES_INITDB_ARGS
          value: "--encoding=UTF8 --lc-collate=C --lc-ctype=C"
        volumeMounts:
        - name: postgresql-data
          mountPath: /var/lib/postgresql/data
        - name: postgresql-config
          mountPath: /etc/postgresql/postgresql.conf
          subPath: postgresql.conf
        - name: postgresql-certs
          mountPath: /etc/postgresql/certs
          readOnly: true
        resources:
          requests:
            memory: "1Gi"
            cpu: "500m"
          limits:
            memory: "4Gi"
            cpu: "2000m"
        livenessProbe:
          exec:
            command:
            - pg_isready
            - -U
            - postgres
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          exec:
            command:
            - pg_isready
            - -U
            - postgres
          initialDelaySeconds: 5
          periodSeconds: 5
      volumes:
      - name: postgresql-config
        configMap:
          name: postgresql-config
      - name: postgresql-certs
        secret:
          secretName: postgresql-certs
  volumeClaimTemplates:
  - metadata:
      name: postgresql-data
    spec:
      accessModes: ["ReadWriteOnce"]
      storageClassName: postgresql-ssd
      resources:
        requests:
          storage: 100Gi
---
apiVersion: v1
kind: Service
metadata:
  name: postgresql-primary
  namespace: postgresql
spec:
  selector:
    app: postgresql
    role: primary
  ports:
  - name: postgresql
    port: 5432
    targetPort: 5432
  type: ClusterIP
```

### 3.2 PostgreSQL Configuration
```yaml
# postgresql-configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: postgresql-config
  namespace: postgresql
data:
  postgresql.conf: |
    # Connection Settings
    listen_addresses = '*'
    port = 5432
    max_connections = 100
    
    # Memory Settings
    shared_buffers = 256MB
    effective_cache_size = 1GB
    work_mem = 4MB
    maintenance_work_mem = 64MB
    
    # WAL Settings
    wal_level = replica
    max_wal_senders = 3
    max_replication_slots = 3
    
    # Logging
    log_destination = 'stderr'
    logging_collector = on
    log_directory = 'log'
    log_filename = 'postgresql-%Y-%m-%d_%H%M%S.log'
    log_rotation_age = 1d
    log_rotation_size = 100MB
    log_min_duration_statement = 1000
    log_checkpoints = on
    log_connections = on
    log_disconnections = on
    log_lock_waits = on
    log_temp_files = -1
    log_autovacuum_min_duration = 0
    log_error_verbosity = verbose
    log_line_prefix = '%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h '
    
    # Query Planning
    random_page_cost = 1.1
    effective_io_concurrency = 200
    
    # Background Writer
    bgwriter_delay = 200ms
    bgwriter_lru_maxpages = 100
    bgwriter_lru_multiplier = 2.0
    
    # Autovacuum
    autovacuum = on
    autovacuum_max_workers = 3
    autovacuum_naptime = 1min
    autovacuum_vacuum_threshold = 50
    autovacuum_analyze_threshold = 50
    autovacuum_vacuum_scale_factor = 0.2
    autovacuum_analyze_scale_factor = 0.1
    
    # SSL Configuration
    ssl = on
    ssl_cert_file = '/etc/postgresql/certs/server.crt'
    ssl_key_file = '/etc/postgresql/certs/server.key'
    ssl_ca_file = '/etc/postgresql/certs/ca.crt'
    
    # Extensions
    shared_preload_libraries = 'pg_stat_statements,timescaledb'
    
    # Performance
    checkpoint_completion_target = 0.9
    wal_buffers = 16MB
    default_statistics_target = 100
```

---

## Phase 4: Database Initialization

### 4.1 Create Database Schemas
```sql
-- Database initialization script
-- runeframeos-init.sql

-- Create databases
CREATE DATABASE runeframeos_main;
CREATE DATABASE runeframeos_test;

-- Connect to main database
\c runeframeos_main

-- Create schemas
CREATE SCHEMA IF NOT EXISTS Distillara;
CREATE SCHEMA IF NOT EXISTS hoardwell;
CREATE SCHEMA IF NOT EXISTS Tapestry Engine;
CREATE SCHEMA IF NOT EXISTS mercatrix;
CREATE SCHEMA IF NOT EXISTS shared;

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";
CREATE EXTENSION IF NOT EXISTS "timescaledb";

-- Create users and roles
CREATE USER runeframeos_app WITH PASSWORD 'runeframeos_password';
CREATE USER runeframeos_readonly WITH PASSWORD 'readonly_password';
CREATE USER runeframeos_backup WITH PASSWORD 'backup_password';

-- Grant permissions
GRANT CONNECT ON DATABASE runeframeos_main TO runeframeos_app;
GRANT USAGE ON SCHEMA Distillara, hoardwell, Tapestry Engine, mercatrix, shared TO runeframeos_app;
GRANT CREATE ON SCHEMA Distillara, hoardwell, Tapestry Engine, mercatrix, shared TO runeframeos_app;

-- Create basic tables for each schema
-- Distillara tables
CREATE TABLE Distillara.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'Traveler',
    stats JSONB DEFAULT '{"INT": 10, "RES": 10, "APL": 10}',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hoardwell tables
CREATE TABLE hoardwell.inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    quantity INTEGER DEFAULT 0,
    location JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tapestry Engine tables
CREATE TABLE Tapestry Engine.worlds (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    cnc_coordinates JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mercatrix tables (reference)
CREATE TABLE mercatrix.economy (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50),
    value JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_distillara_users_email ON Distillara.users(email);
CREATE INDEX idx_distillara_users_username ON Distillara.users(username);
CREATE INDEX idx_hoardwell_inventory_name ON hoardwell.inventory(name);
CREATE INDEX idx_tapestry_worlds_name ON Tapestry Engine.worlds(name);

-- Grant table permissions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA Distillara TO runeframeos_app;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA hoardwell TO runeframeos_app;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA Tapestry Engine TO runeframeos_app;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA mercatrix TO runeframeos_app;

-- Create sequences
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA Distillara TO runeframeos_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA hoardwell TO runeframeos_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA Tapestry Engine TO runeframeos_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA mercatrix TO runeframeos_app;
```

---

## Phase 5: Monitoring and Observability

### 5.1 PostgreSQL Exporter
```yaml
# postgresql-exporter.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: postgresql-exporter
  namespace: postgresql
spec:
  replicas: 1
  selector:
    matchLabels:
      app: postgresql-exporter
  template:
    metadata:
      labels:
        app: postgresql-exporter
    spec:
      containers:
      - name: postgresql-exporter
        image: prometheuscommunity/postgres-exporter:latest
        ports:
        - containerPort: 9187
        env:
        - name: DATA_SOURCE_NAME
          value: "postgresql://postgres:postgres_password@postgresql-primary:5432/runeframeos_main?sslmode=disable"
        resources:
          requests:
            memory: "64Mi"
            cpu: "50m"
          limits:
            memory: "128Mi"
            cpu: "100m"
---
apiVersion: v1
kind: Service
metadata:
  name: postgresql-exporter
  namespace: postgresql
spec:
  selector:
    app: postgresql-exporter
  ports:
  - name: metrics
    port: 9187
    targetPort: 9187
  type: ClusterIP
```

### 5.2 ServiceMonitor for Prometheus
```yaml
# postgresql-servicemonitor.yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: postgresql-monitor
  namespace: postgresql
spec:
  selector:
    matchLabels:
      app: postgresql-exporter
  endpoints:
  - port: metrics
    interval: 30s
    path: /metrics
```

---

## Phase 6: Backup and Recovery

### 6.1 Backup CronJob
```yaml
# postgresql-backup.yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: postgresql-backup
  namespace: postgresql
spec:
  schedule: "0 2 * * *"  # Daily at 2 AM
  jobTemplate:
    spec:
      template:
        spec:
          serviceAccountName: postgresql-sa
          containers:
          - name: backup
            image: postgres:15-alpine
            command:
            - /bin/bash
            - -c
            - |
              set -e
              BACKUP_FILE="/backup/postgresql-$(date +%Y%m%d-%H%M%S).sql"
              pg_dump -h postgresql-primary -U postgres -d runeframeos_main > $BACKUP_FILE
              gzip $BACKUP_FILE
              echo "Backup completed: ${BACKUP_FILE}.gz"
            env:
            - name: PGPASSWORD
              valueFrom:
                secretKeyRef:
                  name: postgresql-secrets
                  key: postgres-password
            volumeMounts:
            - name: backup-volume
              mountPath: /backup
          volumes:
          - name: backup-volume
            persistentVolumeClaim:
              claimName: postgresql-backup-pvc
          restartPolicy: OnFailure
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgresql-backup-pvc
  namespace: postgresql
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: postgresql-backup
  resources:
    requests:
      storage: 200Gi
```

---

## Phase 7: Deployment Commands

### 7.1 Apply Infrastructure
```bash
#!/bin/bash
# PostgreSQL Deployment Script

echo "=== Deploying PostgreSQL Infrastructure ==="

# 1. Create storage classes
echo "1. Creating storage classes..."
kubectl apply -f postgresql-storage-class.yaml

# 2. Create persistent volumes
echo "2. Creating persistent volumes..."
kubectl apply -f postgresql-persistent-volumes.yaml

# 3. Apply RBAC
echo "3. Applying RBAC configuration..."
kubectl apply -f postgresql-rbac.yaml

# 4. Create secrets
echo "4. Creating secrets..."
kubectl apply -f postgresql-secrets.yaml

# 5. Apply network policies
echo "5. Applying network policies..."
kubectl apply -f postgresql-network-policies.yaml

# 6. Deploy PostgreSQL
echo "6. Deploying PostgreSQL..."
kubectl apply -f postgresql-configmap.yaml
kubectl apply -f postgresql-primary.yaml

# 7. Deploy monitoring
echo "7. Deploying monitoring..."
kubectl apply -f postgresql-exporter.yaml
kubectl apply -f postgresql-servicemonitor.yaml

# 8. Deploy backup
echo "8. Deploying backup infrastructure..."
kubectl apply -f postgresql-backup.yaml

echo "=== PostgreSQL deployment complete ==="
```

### 7.2 Verification Commands
```bash
#!/bin/bash
# PostgreSQL Verification Script

echo "=== Verifying PostgreSQL Deployment ==="

# Check pods
echo "1. Checking PostgreSQL pods..."
kubectl get pods -n postgresql

# Check services
echo "2. Checking PostgreSQL services..."
kubectl get services -n postgresql

# Check persistent volumes
echo "3. Checking persistent volumes..."
kubectl get pvc -n postgresql
kubectl get pv

# Check secrets
echo "4. Checking secrets..."
kubectl get secrets -n postgresql

# Test database connection
echo "5. Testing database connection..."
kubectl exec -n postgresql deployment/postgresql-primary -- pg_isready -U postgres

# Check monitoring
echo "6. Checking monitoring..."
kubectl get pods -n postgresql -l app=postgresql-exporter

echo "=== Verification complete ==="
```

---

## Phase 8: Integration with RuneFrameOS

### 8.1 Update Application Configurations
```yaml
# Application database configuration
database:
  host: postgresql-primary.postgresql.svc.cluster.local
  port: 5432
  database: runeframeos_main
  username: runeframeos_app
  password: ${POSTGRESQL_PASSWORD}
  ssl_mode: require
  max_connections: 20
  connection_timeout: 30
```

### 8.2 Environment Variables
```bash
# Set environment variables for applications
export POSTGRESQL_HOST=postgresql-primary.postgresql.svc.cluster.local
export POSTGRESQL_PORT=5432
export POSTGRESQL_DATABASE=runeframeos_main
export POSTGRESQL_USERNAME=runeframeos_app
export POSTGRESQL_PASSWORD=runeframeos_password
```

---

## Success Criteria

### Infrastructure Metrics
- ✅ PostgreSQL primary instance running and healthy
- ✅ Persistent storage properly configured and mounted
- ✅ Network policies restricting access appropriately
- ✅ Monitoring and metrics collection operational
- ✅ Backup jobs scheduled and functional
- ✅ SSL/TLS encryption enabled

### Performance Metrics
- ✅ Database response time < 100ms for simple queries
- ✅ Connection pool properly configured
- ✅ Resource utilization within limits
- ✅ Backup completion within SLA
- ✅ Monitoring alerts configured

### Security Metrics
- ✅ Secrets properly encrypted and managed
- ✅ Network policies blocking unauthorized access
- ✅ SSL certificates valid and auto-renewing
- ✅ RBAC preventing privilege escalation
- ✅ Audit logging enabled

---

## Troubleshooting Guide

### Common Issues
1. **Storage Issues**: Check PV/PVC status, verify hostPath permissions
2. **Connection Issues**: Verify network policies, check service endpoints
3. **Performance Issues**: Monitor resource usage, adjust PostgreSQL configuration
4. **Backup Failures**: Check CronJob logs, verify backup volume permissions

### Support Contacts
- **Infrastructure Issues**: System Administrator
- **Database Issues**: Database Administrator
- **Monitoring Issues**: Observability Team
- **Security Issues**: Security Team

---

## Version Information

- **Created**: 2025-08-08
- **Purpose**: PostgreSQL deployment for RuneFrameOS ecosystem
- **Target**: Sherlock cluster (RuneFrame OS Platform-cluster)
- **Security**: SSL/TLS, RBAC, network policies
- **Review Cycle**: 30 days

---

*This deployment plan is part of the RuneFrameOS infrastructure framework and must be maintained according to established security policies.*

