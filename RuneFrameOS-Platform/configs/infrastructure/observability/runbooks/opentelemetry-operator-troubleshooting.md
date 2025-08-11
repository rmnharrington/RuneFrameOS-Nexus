# OpenTelemetry Operator Troubleshooting Runbook

Version: 1.0.0
Security Level: SECURE
Scope: OpenTelemetry Operator troubleshooting and maintenance

## Overview
OpenTelemetry Operator manages the lifecycle of OpenTelemetry Collectors and provides auto-instrumentation capabilities.

## Prerequisites
- Kubernetes cluster access
- OpenTelemetry namespace access
- cert-manager namespace access

## Common Issues and Solutions

### 1. OpenTelemetry Operator Pods Not Running

**Symptoms**:
- Operator pods in CrashLoopBackOff or Pending state
- Collector CRDs not recognized

**Diagnosis**:
```bash
# Check operator pods
kubectl get pods -n opentelemetry

# Check operator logs
kubectl logs -n opentelemetry deployment/opentelemetry-operator-controller-manager

# Check operator events
kubectl get events -n opentelemetry --sort-by='.lastTimestamp'
```

**Solutions**:
- Verify cert-manager is running and healthy
- Check for RBAC issues
- Verify image pull permissions
- Check resource limits and requests

### 2. Collector Deployment Issues

**Symptoms**:
- Collector pods not starting
- Collector configuration errors
- OTLP endpoints not accessible

**Diagnosis**:
```bash
# Check collector resources
kubectl get opentelemetrycollectors -n opentelemetry

# Check collector pods
kubectl get pods -n opentelemetry -l app=opentelemetry-collector

# Check collector logs
kubectl logs -n opentelemetry deployment/otel-collector
```

**Solutions**:
- Verify Collector CRD configuration
- Check for configuration syntax errors
- Verify OTLP endpoint connectivity
- Check for resource constraints

### 3. Auto-instrumentation Issues

**Symptoms**:
- Applications not auto-instrumented
- Missing traces or metrics
- Instrumentation sidecar not injected

**Diagnosis**:
```bash
# Check instrumentation CRDs
kubectl get instrumentation -n opentelemetry

# Check for auto-instrumentation annotations
kubectl get pods -A -o jsonpath='{range .items[*]}{.metadata.namespace}{"\t"}{.metadata.name}{"\t"}{.metadata.annotations.instrumentation\.opentelemetry\.io/inject}{"\n"}{end}'

# Check instrumentation webhook
kubectl get validatingwebhookconfigurations | grep opentelemetry
```

**Solutions**:
- Verify auto-instrumentation is enabled
- Check for proper annotations on deployments
- Verify instrumentation webhook is working
- Check for instrumentation configuration errors

## Maintenance Procedures

### Collector Configuration Updates
```bash
# Update collector configuration
kubectl patch opentelemetrycollector <collector-name> -n opentelemetry --type='merge' -p='{"spec":{"config":"<new-config>"}}'

# Verify configuration applied
kubectl get opentelemetrycollector <collector-name> -n opentelemetry -o yaml
```

### Operator Upgrade
```bash
# Backup current configuration
kubectl get opentelemetrycollectors -A -o yaml > collectors-backup.yaml

# Upgrade operator
helm upgrade opentelemetry-operator open-telemetry/opentelemetry-operator \
  --namespace opentelemetry \
  --version <new-version>

# Verify upgrade
kubectl get pods -n opentelemetry
```

## Security Considerations

### RBAC Verification
```bash
# Check operator RBAC
kubectl get clusterrole,clusterrolebinding | grep opentelemetry

# Verify minimal permissions
kubectl auth can-i --as=system:serviceaccount:opentelemetry:opentelemetry-operator-controller-manager <resource> <verb>
```

### Network Policy Verification
```bash
# Check network policies
kubectl get networkpolicies -n opentelemetry

# Test connectivity
kubectl run test-pod --image=busybox --rm -it --restart=Never -- nslookup <service-name>
```

## Monitoring and Alerting

### Key Metrics
- Operator pod health status
- Collector deployment success rate
- Auto-instrumentation injection rate
- Webhook response time

### Alerts
- Operator pod restarts
- Collector deployment failures
- Auto-instrumentation injection failures
- Webhook timeout errors

## Emergency Procedures

### Operator Complete Failure
1. Document the failure
2. Check cert-manager status
3. Restore from backup if necessary
4. Reinstall operator if required
5. Verify all collectors are redeployed

### Collector Emergency Recovery
1. Identify affected collectors
2. Check collector configuration
3. Restart collector pods if needed
4. Verify telemetry flow
5. Update documentation

### Auto-instrumentation Emergency
1. Identify affected applications
2. Check instrumentation configuration
3. Manually inject instrumentation if needed
4. Verify telemetry generation
5. Update documentation

## Configuration Best Practices

### Collector Configuration
- Use resource limits and requests
- Implement proper sampling strategies
- Configure secure OTLP endpoints
- Use appropriate processors for your use case

### Auto-instrumentation
- Enable only necessary instrumentations
- Use proper annotations for injection
- Monitor instrumentation overhead
- Test instrumentation in staging first

## Contact Information
- **Primary**: Infrastructure Team
- **Escalation**: Security Team
- **Emergency**: On-call Engineer


