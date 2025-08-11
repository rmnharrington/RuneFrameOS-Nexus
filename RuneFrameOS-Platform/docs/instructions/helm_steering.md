# Helm Steering Instructions for RuneFrameOS Infrastructure

## Machine-Readable Infrastructure Guide

### Purpose
This document provides machine-readable instructions for AI assistants and automated systems to understand, operate, and maintain the Helm-based certificate and monitoring infrastructure in the RuneFrameOS ecosystem.

### Context Reference
- **Infrastructure**: Kubernetes cluster with Helm-based certificate management
- **Performance Issue**: Front-end developer reported extremely slow certificate provisioning
- **Solution**: Optimized certificate infrastructure with monitoring enhancement
- **Status**: Operational with performance improvements deployed

---

## Infrastructure Components

### Certificate Management System

#### ClusterIssuer Configuration
```yaml
# Primary ClusterIssuer
name: "letsencrypt-prod"
status: "operational"
purpose: "Standard certificate provisioning"

# Optimized ClusterIssuer
name: "letsencrypt-prod-optimized"
status: "deployed"
purpose: "Performance-optimized certificate provisioning"
features:
  - cacheDuration: "24h"
  - retryAfter: "1h"
  - maxConcurrentChallenges: 10
  - challengeTimeout: "300s"
  - propagationTimeout: "60s"
```

#### Certificate Cache System
```yaml
cache_configuration:
  duration: "24h"
  max_size: 1000
  retry_interval: "1h"
  max_concurrent_requests: 10
  challenge_timeout: "300s"
  propagation_timeout: "60s"
```

#### Certificate Monitoring
```yaml
monitoring_components:
  - servicemonitor: "cert-manager-monitor"
  - prometheusrule: "cert-manager-alerts"
  - alert_rules:
    - "CertificateExpiringSoon"
    - "CertificateProvisioningFailed"
    - "CertificateProvisioningSlow"
```

### Monitoring Infrastructure

#### Logging Stack
```yaml
fluentd:
  status: "operational"
  pods: ["fluentd-7xz5h", "fluentd-z625v"]
  purpose: "Log collection and forwarding"
  features:
    - container_log_collection
    - certificate_manager_logging
    - kubernetes_metadata_enrichment
    - elasticsearch_integration

kibana:
  status: "operational"
  pod: "kibana-5d9bdd59c4-fj5m7"
  access_url: "https://kibana.pedantictheory.com"
  purpose: "Log visualization and search"
```

#### Monitoring Stack
```yaml
prometheus:
  status: "operational"
  purpose: "Metrics collection"

grafana:
  status: "operational"
  purpose: "Visualization dashboards"

alertmanager:
  status: "operational"
  purpose: "Alert routing"

elasticsearch:
  status: "operational"
  purpose: "Log storage"

opentelemetry:
  status: "operational"
  purpose: "Distributed tracing"
```

---

## Machine Instructions

### Certificate Management Operations

#### 1. Certificate Status Check
```bash
# Check all certificates
kubectl get certificates --all-namespaces

# Check specific certificate
kubectl get certificate <certificate-name> -n <namespace>

# Check certificate details
kubectl describe certificate <certificate-name> -n <namespace>
```

#### 2. Certificate Performance Monitoring
```bash
# Check certificate provisioning time
kubectl logs -n cert-manager deployment/cert-manager --tail=50

# Monitor certificate events
kubectl get events --all-namespaces | grep certificate

# Check certificate cache status
kubectl get configmap certificate-cache-config -n cert-manager
```

#### 3. Certificate Optimization Operations
```bash
# Apply optimized ClusterIssuer
kubectl apply -f infrastructure/certificates/certificate-optimization.yaml

# Update existing certificates to use optimized issuer
kubectl patch certificate <certificate-name> -n <namespace> -p '{"spec":{"issuerRef":{"name":"letsencrypt-prod-optimized"}}}'

# Test certificate performance
kubectl create certificate test-certificate --issuer=letsencrypt-prod-optimized
```

### Monitoring Operations

#### 1. Log Collection Status
```bash
# Check Fluentd pods
kubectl get pods -n monitoring | grep fluentd

# Check Fluentd logs
kubectl logs -n monitoring daemonset/fluentd

# Check Kibana status
kubectl get pods -n monitoring | grep kibana
```

#### 2. Monitoring Stack Status
```bash
# Check all monitoring components
kubectl get pods -n monitoring
kubectl get pods -n observability

# Check monitoring services
kubectl get services -n monitoring
kubectl get services -n observability
```

#### 3. Alert Management
```bash
# Check alert rules
kubectl get prometheusrule -n monitoring

# Check alert manager
kubectl get pods -n monitoring | grep alertmanager

# View alert status
kubectl port-forward -n monitoring svc/alertmanager-operated 9093:9093
```

### Infrastructure Health Checks

#### 1. Certificate Infrastructure Health
```yaml
health_check_commands:
  - "kubectl get clusterissuer"
  - "kubectl get certificates --all-namespaces"
  - "kubectl get pods -n cert-manager"
  - "kubectl logs -n cert-manager deployment/cert-manager --tail=10"
```

#### 2. Monitoring Infrastructure Health
```yaml
health_check_commands:
  - "kubectl get pods -n monitoring"
  - "kubectl get pods -n observability"
  - "kubectl get services -n monitoring"
  - "kubectl get ingress -n monitoring"
```

#### 3. Storage Infrastructure Health
```yaml
health_check_commands:
  - "kubectl get storageclass"
  - "kubectl get pv"
  - "kubectl get pvc --all-namespaces"
  - "kubectl get sc"
```

---

## Performance Optimization Commands

### Certificate Performance
```bash
# Analyze certificate provisioning performance
kubectl logs -n cert-manager deployment/cert-manager | grep -E "(challenge|provisioning|timeout)"

# Check certificate cache hit rate
kubectl exec -n cert-manager deployment/cert-manager -- cat /tmp/cert-manager-metrics | grep cache

# Monitor certificate renewal times
kubectl get events --all-namespaces | grep -E "(certificate|renewal|expiration)"
```

### Monitoring Performance
```bash
# Check log collection performance
kubectl logs -n monitoring daemonset/fluentd | grep -E "(buffer|flush|retry)"

# Monitor Elasticsearch performance
kubectl exec -n observability deployment/elasticsearch -- curl -s localhost:9200/_cluster/health

# Check Prometheus metrics collection
kubectl port-forward -n monitoring svc/prometheus-operated 9090:9090
```

---

## Troubleshooting Instructions

### Certificate Issues

#### 1. Certificate Provisioning Failed
```yaml
diagnostic_steps:
  1: "Check certificate status: kubectl get certificate <name> -n <namespace>"
  2: "Check certificate events: kubectl describe certificate <name> -n <namespace>"
  3: "Check cert-manager logs: kubectl logs -n cert-manager deployment/cert-manager"
  4: "Check ingress configuration: kubectl get ingress -n <namespace>"
  5: "Verify DNS resolution: nslookup <domain>"
```

#### 2. Certificate Provisioning Slow
```yaml
diagnostic_steps:
  1: "Check certificate cache: kubectl get configmap certificate-cache-config -n cert-manager"
  2: "Monitor cert-manager performance: kubectl logs -n cert-manager deployment/cert-manager --tail=100"
  3: "Check cluster resources: kubectl top nodes"
  4: "Verify network connectivity: kubectl exec -it <pod> -- curl -I https://acme-v02.api.letsencrypt.org"
  5: "Check certificate issuer: kubectl get clusterissuer"
```

### Monitoring Issues

#### 1. Log Collection Problems
```yaml
diagnostic_steps:
  1: "Check Fluentd pods: kubectl get pods -n monitoring | grep fluentd"
  2: "Check Fluentd logs: kubectl logs -n monitoring daemonset/fluentd"
  3: "Verify Elasticsearch connectivity: kubectl exec -it <fluentd-pod> -- curl elasticsearch:9200"
  4: "Check log buffer status: kubectl exec -it <fluentd-pod> -- ls -la /var/log/fluentd-buffers/"
```

#### 2. Dashboard Access Issues
```yaml
diagnostic_steps:
  1: "Check Kibana pod: kubectl get pods -n monitoring | grep kibana"
  2: "Check Kibana logs: kubectl logs -n monitoring deployment/kibana"
  3: "Verify service: kubectl get service kibana -n monitoring"
  4: "Check ingress: kubectl get ingress kibana-ingress -n monitoring"
  5: "Test connectivity: kubectl port-forward -n monitoring svc/kibana 5601:5601"
```

---

## Automation Commands

### Certificate Management Automation
```bash
# Automated certificate health check
kubectl get certificates --all-namespaces -o jsonpath='{range .items[*]}{.metadata.namespace}{" "}{.metadata.name}{" "}{.status.conditions[0].status}{"\n"}{end}'

# Automated certificate performance test
kubectl create certificate test-performance --issuer=letsencrypt-prod-optimized --dns-names=test.pedantictheory.com

# Automated certificate cleanup
kubectl delete certificate test-performance
```

### Monitoring Automation
```bash
# Automated monitoring health check
kubectl get pods -n monitoring -o jsonpath='{range .items[*]}{.metadata.name}{" "}{.status.phase}{"\n"}{end}'

# Automated log analysis
kubectl logs -n cert-manager deployment/cert-manager --since=1h | grep -E "(error|failed|timeout)"

# Automated alert check
kubectl get prometheusrule -n monitoring -o jsonpath='{range .items[*]}{.metadata.name}{" "}{.spec.groups[0].rules[0].alert}{"\n"}{end}'
```

---

## Configuration Management

### Certificate Configuration
```yaml
certificate_configuration:
  issuer_ref:
    name: "letsencrypt-prod-optimized"
    kind: "ClusterIssuer"
  secret_name: "<certificate-name>-tls"
  dns_names:
    - "<domain-name>"
  usages:
    - "digital signature"
    - "key encipherment"
```

### Monitoring Configuration
```yaml
monitoring_configuration:
  namespace: "monitoring"
  retention_policy:
    logs: "30 days"
    metrics: "90 days"
    alerts: "1 year"
  alert_thresholds:
    certificate_expiration: "30 days"
    certificate_provisioning_time: "300 seconds"
    log_buffer_usage: "80%"
```

---

## Success Criteria

### Certificate Infrastructure
- [ ] Certificate provisioning time < 300 seconds
- [ ] Certificate cache hit rate > 80%
- [ ] Certificate renewal success rate > 95%
- [ ] Certificate monitoring alerts functional

### Monitoring Infrastructure
- [ ] All monitoring pods running
- [ ] Log collection operational
- [ ] Dashboard access functional
- [ ] Alert system operational

### Performance Metrics
- [ ] Certificate provisioning time reduced by 80%
- [ ] Log collection latency < 5 seconds
- [ ] Dashboard response time < 2 seconds
- [ ] Alert response time < 2 minutes

---

## Machine Learning Integration

### Performance Prediction
```yaml
ml_integration:
  certificate_performance:
    input_features:
      - "certificate_cache_hit_rate"
      - "concurrent_certificate_requests"
      - "cluster_resource_usage"
      - "network_latency"
    output_prediction:
      - "certificate_provisioning_time"
      - "certificate_success_probability"
  
  monitoring_performance:
    input_features:
      - "log_volume"
      - "buffer_usage"
      - "elasticsearch_health"
      - "fluentd_pod_count"
    output_prediction:
      - "log_processing_latency"
      - "storage_usage_prediction"
```

### Anomaly Detection
```yaml
anomaly_detection:
  certificate_anomalies:
    - "unusual_provisioning_time"
    - "high_failure_rate"
    - "cache_miss_spike"
  
  monitoring_anomalies:
    - "log_volume_spike"
    - "dashboard_response_time_increase"
    - "alert_frequency_change"
```

---

## Security Considerations

### Certificate Security
```yaml
security_measures:
  certificate_rotation:
    automatic: true
    interval: "90 days"
    grace_period: "7 days"
  
  certificate_validation:
    dns_validation: true
    http_validation: true
    tls_validation: true
```

### Monitoring Security
```yaml
security_measures:
  access_control:
    rbac_enabled: true
    service_accounts: true
    network_policies: true
  
  data_protection:
    log_encryption: true
    metrics_encryption: true
    audit_logging: true
```

---

## Maintenance Procedures

### Regular Maintenance
```yaml
maintenance_schedule:
  daily:
    - "certificate_status_check"
    - "monitoring_health_check"
    - "log_retention_cleanup"
  
  weekly:
    - "certificate_performance_analysis"
    - "monitoring_dashboard_review"
    - "alert_threshold_adjustment"
  
  monthly:
    - "certificate_issuer_review"
    - "monitoring_infrastructure_audit"
    - "performance_optimization"
```

### Emergency Procedures
```yaml
emergency_procedures:
  certificate_emergency:
    - "disable_certificate_auto_renewal"
    - "switch_to_backup_issuer"
    - "manual_certificate_provisioning"
  
  monitoring_emergency:
    - "disable_log_collection"
    - "switch_to_basic_monitoring"
    - "manual_alert_management"
```

---

**Document Version**: 1.0  
**Last Updated**: 2025-08-08  
**Machine Readable**: ✅ Yes  
**AI Assistant Compatible**: ✅ Yes  
**Infrastructure Status**: ✅ Operational

