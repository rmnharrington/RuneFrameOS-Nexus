#!/bin/bash
# Monitoring and Certificate Infrastructure Deployment Script
# Addresses front-end developer's certificate performance issues and enhances monitoring

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() { echo -e "${BLUE}[INFO]${NC} $1"; }
print_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
print_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
print_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Function to check if kubectl is available
check_kubectl() {
    if ! command -v kubectl &> /dev/null; then
        print_error "kubectl is not installed or not in PATH"
        exit 1
    fi
    print_success "kubectl is available"
}

# Function to deploy certificate optimization
deploy_certificate_optimization() {
    print_status "Deploying certificate infrastructure optimization..."
    
    # Apply optimized certificate configuration
    kubectl apply -f infrastructure/certificates/certificate-optimization.yaml
    
    # Wait for ClusterIssuer to be ready
    kubectl wait --for=condition=Ready clusterissuer/letsencrypt-prod-optimized --timeout=60s
    
    print_success "Certificate optimization deployed"
}

# Function to deploy logging infrastructure
deploy_logging_infrastructure() {
    print_status "Deploying logging infrastructure enhancement..."
    
    # Apply logging configuration
    kubectl apply -f infrastructure/monitoring/logging-enhancement.yaml
    
    # Wait for Fluentd to be ready
    kubectl wait --for=condition=available deployment/fluentd -n monitoring --timeout=300s
    
    # Wait for Kibana to be ready
    kubectl wait --for=condition=available deployment/kibana -n monitoring --timeout=300s
    
    print_success "Logging infrastructure deployed"
}

# Function to update existing certificates to use optimized issuer
update_existing_certificates() {
    print_status "Updating existing certificates to use optimized issuer..."
    
    # Get all certificates
    certificates=$(kubectl get certificates --all-namespaces -o jsonpath='{range .items[*]}{.metadata.namespace}{" "}{.metadata.name}{"\n"}{end}')
    
    while IFS= read -r line; do
        if [ ! -z "$line" ]; then
            namespace=$(echo $line | awk '{print $1}')
            name=$(echo $line | awk '{print $2}')
            
            print_status "Updating certificate $name in namespace $namespace"
            
            # Patch certificate to use optimized issuer
            kubectl patch certificate $name -n $namespace -p '{"spec":{"issuerRef":{"name":"letsencrypt-prod-optimized"}}}'
        fi
    done <<< "$certificates"
    
    print_success "Existing certificates updated"
}

# Function to create monitoring dashboards
create_monitoring_dashboards() {
    print_status "Creating monitoring dashboards..."
    
    # Create Grafana dashboard for certificate monitoring
    cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ConfigMap
metadata:
  name: certificate-monitoring-dashboard
  namespace: monitoring
  labels:
    grafana_dashboard: "1"
data:
  certificate-monitoring.json: |
    {
      "dashboard": {
        "title": "Certificate Monitoring",
        "panels": [
          {
            "title": "Certificate Status",
            "type": "stat",
            "targets": [
              {
                "expr": "cert_manager_certificate_ready_status",
                "legendFormat": "{{namespace}}/{{name}}"
              }
            ]
          },
          {
            "title": "Certificate Provisioning Time",
            "type": "graph",
            "targets": [
              {
                "expr": "time() - cert_manager_certificate_ready_timestamp_seconds",
                "legendFormat": "{{namespace}}/{{name}}"
              }
            ]
          }
        ]
      }
    }
EOF
    
    print_success "Monitoring dashboards created"
}

# Function to test certificate performance
test_certificate_performance() {
    print_status "Testing certificate performance..."
    
    # Create a test certificate
    cat <<EOF | kubectl apply -f -
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: test-certificate
  namespace: default
spec:
  secretName: test-certificate-tls
  issuerRef:
    name: letsencrypt-prod-optimized
    kind: ClusterIssuer
  dnsNames:
  - test.pedantictheory.com
EOF
    
    # Monitor certificate provisioning time
    start_time=$(date +%s)
    
    # Wait for certificate to be ready (max 10 minutes)
    timeout 600 bash -c 'until kubectl get certificate test-certificate -o jsonpath="{.status.conditions[?(@.type==\"Ready\")].status}" | grep -q "True"; do sleep 10; done'
    
    end_time=$(date +%s)
    provisioning_time=$((end_time - start_time))
    
    print_status "Certificate provisioning time: ${provisioning_time} seconds"
    
    if [ $provisioning_time -lt 300 ]; then
        print_success "Certificate provisioning performance is acceptable (< 5 minutes)"
    else
        print_warning "Certificate provisioning is still slow (> 5 minutes)"
    fi
    
    # Clean up test certificate
    kubectl delete certificate test-certificate
}

# Function to display infrastructure status
display_infrastructure_status() {
    print_status "Displaying infrastructure status..."
    
    echo "=== Certificate Infrastructure ==="
    kubectl get clusterissuer
    kubectl get certificates --all-namespaces
    
    echo "=== Monitoring Infrastructure ==="
    kubectl get pods -n monitoring
    kubectl get pods -n observability
    
    echo "=== Logging Infrastructure ==="
    kubectl get pods -n monitoring | grep fluentd
    kubectl get pods -n monitoring | grep kibana
    
    echo "=== Storage Infrastructure ==="
    kubectl get storageclass
    kubectl get pv
}

# Function to create performance report
create_performance_report() {
    print_status "Creating performance report..."
    
    report_file="infrastructure_performance_report_$(date +%Y%m%d_%H%M%S).md"
    
    cat <<EOF > $report_file
# Infrastructure Performance Report
Generated: $(date)

## Certificate Infrastructure Performance

### Current Status
- Optimized ClusterIssuer: $(kubectl get clusterissuer letsencrypt-prod-optimized -o jsonpath='{.status.conditions[?(@.type=="Ready")].status}' 2>/dev/null || echo "Not Ready")
- Total Certificates: $(kubectl get certificates --all-namespaces --no-headers | wc -l)
- Failed Certificates: $(kubectl get certificates --all-namespaces -o jsonpath='{.items[?(@.status.conditions[0].status=="False")].metadata.name}' | wc -w)

### Performance Metrics
- Certificate Provisioning Time: ${provisioning_time:-"Not measured"} seconds
- Target Performance: < 300 seconds
- Performance Status: $([ ${provisioning_time:-999} -lt 300 ] && echo "✅ Acceptable" || echo "⚠️ Needs Improvement")

## Monitoring Infrastructure Status

### Components
- Prometheus: $(kubectl get pods -n monitoring | grep prometheus | wc -l) pods
- Grafana: $(kubectl get pods -n monitoring | grep grafana | wc -l) pods
- AlertManager: $(kubectl get pods -n monitoring | grep alertmanager | wc -l) pods
- Fluentd: $(kubectl get pods -n monitoring | grep fluentd | wc -l) pods
- Kibana: $(kubectl get pods -n monitoring | grep kibana | wc -l) pods

### Logging Infrastructure
- Elasticsearch: $(kubectl get pods -n observability | grep elasticsearch | wc -l) pods
- OpenTelemetry: $(kubectl get pods -n observability | grep otel | wc -l) pods

## Recommendations

### Immediate Actions
1. Monitor certificate provisioning performance for 24 hours
2. Review certificate alert rules and thresholds
3. Validate logging pipeline is capturing all relevant events

### Long-term Improvements
1. Implement certificate caching layer
2. Deploy certificate pre-issuance for common domains
3. Enhance monitoring dashboards with custom metrics

## Success Criteria
- [ ] Certificate provisioning time < 300 seconds
- [ ] All monitoring components operational
- [ ] Logging pipeline capturing certificate events
- [ ] Alerting system configured and functional
EOF
    
    print_success "Performance report created: $report_file"
}

# Main deployment function
main() {
    print_status "Starting monitoring and certificate infrastructure deployment..."
    
    # Check prerequisites
    check_kubectl
    
    # Deploy certificate optimization
    deploy_certificate_optimization
    
    # Deploy logging infrastructure
    deploy_logging_infrastructure
    
    # Update existing certificates
    update_existing_certificates
    
    # Create monitoring dashboards
    create_monitoring_dashboards
    
    # Test certificate performance
    test_certificate_performance
    
    # Display infrastructure status
    display_infrastructure_status
    
    # Create performance report
    create_performance_report
    
    print_success "Monitoring and certificate infrastructure deployment completed!"
    print_status "Next steps:"
    print_status "1. Monitor certificate performance for 24 hours"
    print_status "2. Review and adjust alert thresholds"
    print_status "3. Validate logging pipeline functionality"
    print_status "4. Access Kibana at: https://kibana.pedantictheory.com"
}

# Run main function
main "$@"

