# Certificate Enrollment Guide for RuneFrame OS Platform Infrastructure

## Overview

This guide provides instructions for enrolling certificates from the RuneFrame OS Platform Certificate Authority (CA) for various infrastructure components, including the Sherlock cluster and other tools within the RuneFrame OS Platform ecosystem.

## Certificate Authority Information

- **CA Server**: `honeycut.pedantictheory.com` (172.18.254.20)
- **Web Enrollment URL**: `https://honeycut.pedantictheory.com/certsrv/`
- **CA Name**: `pedantic-CA-Root`
- **CA Type**: Standalone Root CA
- **Certificate Validity**: 5 years
- **Key Length**: 2048 bits
- **Hash Algorithm**: SHA256

## Prerequisites

### Network Access
- Ensure connectivity to `honeycut.pedantictheory.com` on port 443
- Firewall rules should allow HTTPS traffic to the CA server
- DNS resolution for `honeycut.pedantictheory.com`

### Client Preparation
- Windows systems: Ensure the CA certificate is trusted
- Linux systems: Import the CA certificate to the trusted store
- Verify web browser can access the enrollment URL

## Certificate Types and Use Cases

### 1. Web Server Certificates
**Use Case**: HTTPS for web applications, API endpoints
**Key Usage**: Digital Signature, Key Encipherment
**Enhanced Key Usage**: Server Authentication
**Common Names**: 
- `*.pedantictheory.com` (wildcard)
- `api.RuneFrame OS Platform.local`
- `dashboard.RuneFrame OS Platform.local`
- `monitoring.RuneFrame OS Platform.local`

### 2. Client Authentication Certificates
**Use Case**: Mutual TLS, service-to-service authentication
**Key Usage**: Digital Signature, Key Encipherment
**Enhanced Key Usage**: Client Authentication
**Common Names**:
- `sherlock-node-01`
- `sherlock-node-02`
- `kafka-broker-01`
- `elasticsearch-node-01`

### 3. Code Signing Certificates
**Use Case**: Signing applications, scripts, containers
**Key Usage**: Digital Signature
**Enhanced Key Usage**: Code Signing
**Common Names**:
- `RuneFrame OS Platform-deployment`
- `sherlock-deployment`
- `monitoring-deployment`

### 4. Document Signing Certificates
**Use Case**: Signing documents, reports, configurations
**Key Usage**: Digital Signature
**Enhanced Key Usage**: Document Signing
**Common Names**:
- `RuneFrame OS Platform-admin`
- `sherlock-admin`

## Enrollment Methods

### Method 1: Web Enrollment (Recommended for Windows)

1. **Access the Web Enrollment Site**
   ```
   https://honeycut.pedantictheory.com/certsrv/
   ```

2. **Request a Certificate**
   - Click "Request a certificate"
   - Select "Advanced certificate request"

3. **Choose Certificate Template**
   - **Web Server**: Use "Web Server" template
   - **Client Authentication**: Use "Client Authentication" template
   - **Code Signing**: Use "Code Signing" template

4. **Fill Certificate Details**
   - **Common Name**: FQDN or service name
   - **Alternative Names**: Additional DNS names if needed
   - **Key Size**: 2048 bits (minimum)
   - **Key Usage**: As per certificate type

5. **Download and Install**
   - Download the certificate
   - Install to appropriate certificate store
   - Verify installation

### Method 2: Command Line (Linux/Unix Systems)

#### Using OpenSSL
```bash
# Generate private key
openssl genrsa -out server.key 2048

# Generate certificate signing request
openssl req -new -key server.key -out server.csr -subj "/CN=sherlock-node-01.pedantictheory.com"

# Submit CSR to CA (via web enrollment or API)
# Download signed certificate as server.crt

# Combine certificate and key
cat server.crt server.key > server.pem
```

#### Using certreq (Windows)
```powershell
# Generate certificate request
certreq -submit -attrib "SAN=DNS=sherlock-node-01.pedantictheory.com" server.req

# Install certificate
certreq -accept server.cer
```

### Method 3: Automated Enrollment (Infrastructure)

#### PowerShell Script for Windows Services
```powershell
# enroll-service-cert.ps1
param(
    [string]$ServiceName,
    [string]$CommonName,
    [string]$SAN = ""
)

$enrollmentUrl = "https://honeycut.pedantictheory.com/certsrv/"
$caCertPath = "C:\ProgramData\RuneFrame OS Platform\certs\ca-cert.cer"

# Download CA certificate if not present
if (-not (Test-Path $caCertPath)) {
    Invoke-WebRequest -Uri "$enrollmentUrl/certcarc.asp" -OutFile $caCertPath
    Import-Certificate -FilePath $caCertPath -CertStoreLocation Cert:\LocalMachine\Root
}

# Generate certificate request
$csr = New-CertificateRequest -Subject "CN=$CommonName" -KeyLength 2048
if ($SAN) {
    $csr.SubjectAlternativeNames = $SAN
}

# Submit request and install certificate
$cert = Submit-CertificateRequest -CertificateRequest $csr -CAUrl $enrollmentUrl
Install-Certificate -Certificate $cert -CertStoreLocation Cert:\LocalMachine\My
```

#### Python Script for Linux Services
```python
#!/usr/bin/env python3
# enroll_service_cert.py

import requests
import subprocess
import os
from cryptography import x509
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import rsa

def enroll_certificate(common_name, san_list=None):
    """Enroll a certificate from the RuneFrame OS Platform CA"""
    
    # Generate private key
    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048
    )
    
    # Create certificate signing request
    csr = x509.CertificateSigningRequestBuilder().subject_name(
        x509.Name([x509.NameAttribute(x509.NameOID.COMMON_NAME, common_name)])
    ).add_extension(
        x509.BasicConstraints(ca=False, path_length=None),
        critical=True
    ).add_extension(
        x509.KeyUsage(
            digital_signature=True,
            key_encipherment=True,
            key_agreement=False,
            key_cert_sign=False,
            crl_sign=False,
            content_commitment=False,
            data_encipherment=False,
            encipher_only=False,
            decipher_only=False
        ),
        critical=True
    )
    
    if san_list:
        san_extension = x509.SubjectAlternativeName([
            x509.DNSName(name) for name in san_list
        ])
        csr = csr.add_extension(san_extension, critical=False)
    
    csr = csr.sign(private_key, hashes.SHA256())
    
    # Submit to CA (implementation depends on CA API)
    # This is a placeholder for the actual submission logic
    return csr, private_key

if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Usage: python enroll_service_cert.py <common_name> [san1,san2,...]")
        sys.exit(1)
    
    common_name = sys.argv[1]
    san_list = sys.argv[2].split(',') if len(sys.argv) > 2 else None
    
    csr, private_key = enroll_certificate(common_name, san_list)
    print(f"Certificate request generated for {common_name}")
```

## Sherlock Cluster Certificate Enrollment

### Cluster Components Requiring Certificates

1. **Kubernetes API Server**
   - **Common Name**: `kubernetes.default.svc.cluster.local`
   - **SANs**: `kubernetes.default.svc`, `kubernetes.default.svc.cluster.local`, `kubernetes`, `kubernetes.default`, `kubernetes.default.svc.cluster.local`
   - **Usage**: TLS termination for API server

2. **etcd Cluster**
   - **Common Name**: `etcd-server`
   - **SANs**: `localhost`, `127.0.0.1`, `etcd-server`, `etcd-server.default.svc.cluster.local`
   - **Usage**: etcd server authentication

3. **Kubelet Certificates**
   - **Common Name**: `system:node:<node-name>`
   - **Usage**: Kubelet client authentication

4. **Service Account Tokens**
   - **Common Name**: `system:serviceaccount:<namespace>:<serviceaccount>`
   - **Usage**: Service account authentication

### Automated Enrollment for Sherlock

#### Kubernetes Certificate Manager Integration
```yaml
# cert-manager-config.yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: RuneFrame OS Platform-ca-issuer
spec:
  ca:
    secretName: RuneFrame OS Platform-ca-secret
---
apiVersion: v1
kind: Secret
metadata:
  name: RuneFrame OS Platform-ca-secret
  namespace: cert-manager
type: kubernetes.io/tls
data:
  tls.crt: <base64-encoded-ca-cert>
  tls.key: <base64-encoded-ca-key>
```

#### Certificate Requests
```yaml
# sherlock-api-cert.yaml
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: sherlock-api-cert
  namespace: default
spec:
  secretName: sherlock-api-tls
  issuerRef:
    name: RuneFrame OS Platform-ca-issuer
    kind: ClusterIssuer
  commonName: kubernetes.default.svc.cluster.local
  dnsNames:
  - kubernetes.default.svc
  - kubernetes.default.svc.cluster.local
  - kubernetes
  - kubernetes.default
  - kubernetes.default.svc.cluster.local
```

### Manual Enrollment for Sherlock Nodes

#### Node Certificate Enrollment Script
```bash
#!/bin/bash
# enroll_sherlock_node.sh

NODE_NAME=$1
CA_URL="https://honeycut.pedantictheory.com/certsrv"

if [ -z "$NODE_NAME" ]; then
    echo "Usage: $0 <node-name>"
    exit 1
fi

# Create certificate directory
mkdir -p /etc/sherlock/certs

# Generate private key
openssl genrsa -out /etc/sherlock/certs/node.key 2048

# Generate CSR
openssl req -new -key /etc/sherlock/certs/node.key \
    -out /etc/sherlock/certs/node.csr \
    -subj "/CN=system:node:$NODE_NAME/O=system:nodes"

# Submit CSR to CA (manual process via web enrollment)
echo "Please submit the CSR at $CA_URL"
echo "CSR content:"
cat /etc/sherlock/certs/node.csr

# After receiving certificate, install it
# cp node.crt /etc/sherlock/certs/
# chmod 600 /etc/sherlock/certs/node.key
# chmod 644 /etc/sherlock/certs/node.crt
```

## Certificate Management

### Certificate Lifecycle

1. **Enrollment**: Initial certificate request and issuance
2. **Installation**: Deploy certificate to target system
3. **Monitoring**: Track certificate expiration
4. **Renewal**: Request new certificate before expiration
5. **Revocation**: Remove compromised certificates

### Monitoring and Renewal

#### Certificate Expiration Monitoring
```yaml
# cert-monitor.yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: certificate-monitor
  namespace: monitoring
spec:
  selector:
    matchLabels:
      app: certificate-monitor
  endpoints:
  - port: https
    interval: 1h
    tlsConfig:
      insecureSkipVerify: true
```

#### Automated Renewal Script
```python
#!/usr/bin/env python3
# cert_renewal_monitor.py

import ssl
import socket
import datetime
import smtplib
from email.mime.text import MIMEText

def check_certificate_expiry(hostname, port=443):
    """Check certificate expiration for a hostname"""
    context = ssl.create_default_context()
    with socket.create_connection((hostname, port)) as sock:
        with context.wrap_socket(sock, server_hostname=hostname) as ssock:
            cert = ssock.getpeercert()
            expire_date = datetime.datetime.strptime(cert['notAfter'], '%b %d %H:%M:%S %Y %Z')
            days_until_expiry = (expire_date - datetime.datetime.now()).days
            return days_until_expiry

def send_alert(hostname, days_until_expiry):
    """Send alert for expiring certificates"""
    message = f"""
    Certificate Alert:
    Hostname: {hostname}
    Days until expiry: {days_until_expiry}
    
    Please renew the certificate at:
    https://honeycut.pedantictheory.com/certsrv/
    """
    
    # Configure email settings
    # Send alert via email or other notification method
    print(message)

# Monitor critical services
services = [
    "honeycut.pedantictheory.com",
    "sherlock-api.RuneFrame OS Platform.local",
    "monitoring.RuneFrame OS Platform.local"
]

for service in services:
    try:
        days_left = check_certificate_expiry(service)
        if days_left < 30:
            send_alert(service, days_left)
    except Exception as e:
        print(f"Error checking {service}: {e}")
```

## Security Best Practices

### Certificate Storage
- Store private keys securely with appropriate permissions
- Use hardware security modules (HSM) for critical certificates
- Encrypt private keys at rest
- Limit access to certificate stores

### Certificate Validation
- Verify certificate chain before installation
- Check certificate purpose matches intended use
- Validate subject alternative names
- Confirm key usage restrictions

### Access Control
- Implement role-based access for certificate enrollment
- Audit certificate requests and issuances
- Monitor certificate usage and access patterns
- Regular security reviews of certificate policies

## Troubleshooting

### Common Issues

1. **Certificate Not Trusted**
   - Import CA certificate to trusted store
   - Verify certificate chain
   - Check certificate purpose

2. **Enrollment Fails**
   - Verify network connectivity to CA
   - Check firewall rules
   - Validate certificate request format

3. **Certificate Expired**
   - Request new certificate
   - Update application configurations
   - Verify renewal process

4. **Private Key Issues**
   - Check file permissions
   - Verify key format
   - Ensure key matches certificate

### Diagnostic Commands

#### Windows
```powershell
# Check certificate store
Get-ChildItem Cert:\LocalMachine\My | Where-Object { $_.Subject -like "*RuneFrame OS Platform*" }

# Verify certificate chain
certutil -verify -urlfetch certificate.cer

# Check certificate details
certutil -dump certificate.cer
```

#### Linux
```bash
# Check certificate details
openssl x509 -in certificate.crt -text -noout

# Verify certificate chain
openssl verify -CAfile ca-cert.crt certificate.crt

# Check certificate expiration
openssl x509 -in certificate.crt -noout -dates
```

## Support and Maintenance

### Documentation
- Maintain certificate inventory
- Document enrollment procedures
- Update security policies
- Track certificate renewals

### Training
- Train administrators on enrollment procedures
- Provide security awareness training
- Document troubleshooting procedures
- Regular policy reviews

### Contact Information
- **CA Administrator**: RuneFrame OS Platform-admin@pedantictheory.com
- **Security Team**: security@pedantictheory.com
- **Emergency Contact**: emergency@pedantictheory.com

---

*This document should be updated regularly to reflect changes in the RuneFrame OS Platform infrastructure and certificate policies.*
