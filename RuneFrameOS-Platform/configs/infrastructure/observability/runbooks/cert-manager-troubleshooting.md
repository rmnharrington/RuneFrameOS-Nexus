# cert-manager Troubleshooting Runbook

Version: 1.0.0
Security Level: SECURE
Scope: cert-manager troubleshooting and maintenance

## Overview
cert-manager is a critical component for OpenTelemetry Operator webhook TLS certificates.

## Prerequisites
- Kubernetes cluster access
- cert-manager namespace access
- OpenTelemetry Operator namespace access

## Common Issues and Solutions

### 1. cert-manager Pods Not Running

**Symptoms**:
- cert-manager pods in CrashLoopBackOff or Pending state
- Webhook failures in OpenTelemetry Operator

**Diagnosis**:
```bash
# Check cert-manager pods
kubectl get pods -n cert-manager

# Check cert-manager logs
kubectl logs -n cert-manager deployment/cert-manager

# Check cert-manager-webhook logs
kubectl logs -n cert-manager deployment/cert-manager-webhook
```

**Solutions**:
- Verify resource limits and requests
- Check for RBAC issues
- Verify image pull permissions
- Check for conflicting webhooks

### 2. Certificate Issues

**Symptoms**:
- Certificate not issued or expired
- Webhook connection failures

**Diagnosis**:
```bash
# Check certificate status
kubectl get certificates -n cert-manager

# Check certificate requests
kubectl get certificaterequests -n cert-manager

# Check certificate events
kubectl describe certificate -n cert-manager <certificate-name>
```

**Solutions**:
- Verify ClusterIssuer/Issuer configuration
- Check certificate expiry dates
- Verify DNS resolution for certificate domains
- Check for certificate renewal issues

### 3. Webhook Failures

**Symptoms**:
- OpenTelemetry Operator webhook timeouts
- Admission webhook errors

**Diagnosis**:
```bash
# Check webhook configuration
kubectl get validatingwebhookconfigurations
kubectl get mutatingwebhookconfigurations

# Check webhook endpoints
kubectl get endpoints -n cert-manager
```

**Solutions**:
- Verify webhook service is running
- Check webhook certificate validity
- Verify network policies allow webhook traffic
- Check webhook timeout settings

## Maintenance Procedures

### Certificate Renewal
```bash
# Force certificate renewal
kubectl patch certificate <certificate-name> -n cert-manager -p '{"spec":{"renewBefore":"720h"}}'

# Check renewal status
kubectl get certificate -n cert-manager -o yaml
```

### Backup and Restore
```bash
# Backup cert-manager resources
kubectl get all -n cert-manager -o yaml > cert-manager-backup.yaml

# Backup certificates and issuers
kubectl get certificates,certificaterequests,clusterissuers,issuers -A -o yaml > certificates-backup.yaml
```

## Security Considerations

### Certificate Rotation
- Monitor certificate expiry dates
- Implement automated renewal
- Use short-lived certificates where possible

### Access Control
- Limit cert-manager RBAC permissions
- Monitor cert-manager audit logs
- Use network policies to restrict access

## Monitoring and Alerting

### Key Metrics
- Certificate expiry time
- Certificate renewal success rate
- Webhook response time
- Pod health status

### Alerts
- Certificate expires within 30 days
- Certificate renewal failures
- Webhook timeout errors
- cert-manager pod restarts

## Emergency Procedures

### cert-manager Complete Failure
1. Document the failure
2. Check cluster-wide impact
3. Restore from backup if necessary
4. Reinstall cert-manager if required
5. Verify all certificates are reissued

### Certificate Emergency Renewal
1. Identify affected certificates
2. Force renewal of critical certificates
3. Monitor renewal process
4. Verify webhook functionality
5. Update documentation

## Contact Information
- **Primary**: Infrastructure Team
- **Escalation**: Security Team
- **Emergency**: On-call Engineer


