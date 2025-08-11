# Windows Server 2019 Integration Guide

This document describes how to integrate the Windows Server 2019 (172.18.254.20) into the RuneFrame OS Platform infrastructure for certificate services.

## Overview

The Windows Server 2019 will serve as a Certificate Authority (CA) for the RuneFrame OS Platform infrastructure, providing:
- Active Directory Certificate Services (AD CS)
- Web enrollment interface for certificate requests
- Integration with the existing RuneFrame OS Platform infrastructure

## Prerequisites

1. **Certificate File**: The `cert_pedantic-CA.p12` file (password-protected)
2. **Network Access**: Ability to reach 172.18.254.20
3. **Administrator Access**: Local administrator credentials for the Windows server
4. **PowerShell**: PowerShell 5.1 or later on the Windows server

## Infrastructure Components

### Windows Server Details
- **IP Address**: 172.18.254.20
- **Hostname**: cert-server
- **OS**: Windows Server 2019
- **Purpose**: Certificate Authority and Web Enrollment

### Network Configuration
- **RDP Port**: 3389
- **WinRM HTTP**: 5985
- **WinRM HTTPS**: 5986
- **Certificate Web Enrollment**: 80, 443

## Deployment Options

### Option 1: Manual PowerShell Deployment

1. **Set up Remote PowerShell Access**:
   ```powershell
   # Run on the Windows server (172.18.254.20)
   .\Setup-RemotePowerShell.ps1
   ```

2. **Deploy Certificate Services Remotely**:
   ```powershell
   # Run from your management machine
   .\Deploy-CertServices-Remote.ps1 -ServerIP 172.18.254.20 -CertFilePath "path\to\cert_pedantic-CA.p12" -CertPassword "your_password"
   ```

### Option 2: Ansible Deployment

1. **Configure Ansible Vault**:
   ```bash
   ansible-vault create ansible/vars/windows_secrets.yml
   ```
   
   Add the following variables:
   ```yaml
   vault_windows_admin_password: "your_admin_password"
   vault_cert_password: "your_certificate_password"
   ```

2. **Run the Ansible Playbook**:
   ```bash
   ansible-playbook -i ansible/inventory/windows_servers.yml ansible/playbooks/windows-server-setup.yml --ask-vault-pass
   ```

### Option 3: Terraform + Ansible

1. **Deploy Infrastructure**:
   ```bash
   cd terraform/environments/windows-server
   terraform init
   terraform plan
   terraform apply
   ```

2. **Run Ansible Playbook**:
   ```bash
   ansible-playbook -i ansible/inventory/windows_servers.yml ansible/playbooks/windows-server-setup.yml --ask-vault-pass
   ```

## Verification Steps

### 1. Test Remote PowerShell Access
```powershell
# Test connection
Test-WSMan -ComputerName 172.18.254.20 -Credential (Get-Credential)

# Enter remote session
Enter-PSSession -ComputerName 172.18.254.20 -Credential (Get-Credential)
```

### 2. Verify Certificate Services
```powershell
# Check AD CS services
Get-Service -Name ADCS*

# Check IIS services
Get-Service -Name W3SVC

# Test web enrollment
Invoke-WebRequest -Uri "https://172.18.254.20/certsrv" -SkipCertificateCheck
```

### 3. Test Certificate Enrollment
1. Open a web browser
2. Navigate to `https://172.18.254.20/certsrv`
3. Verify the certificate enrollment interface loads

## Security Considerations

### Firewall Configuration
- Ensure ports 5985/5986 are open for WinRM
- Ensure ports 80/443 are open for web enrollment
- Restrict access to trusted networks

### Certificate Security
- Store the `cert_pedantic-CA.p12` file securely
- Use strong passwords for the certificate
- Regularly rotate certificate passwords

### WinRM Security
- Use HTTPS WinRM when possible
- Restrict TrustedHosts to specific IP ranges
- Use strong authentication credentials

## Troubleshooting

### Common Issues

1. **WinRM Connection Failed**
   - Verify WinRM is enabled on the Windows server
   - Check firewall rules
   - Ensure credentials are correct

2. **Certificate Import Failed**
   - Verify the certificate file exists
   - Check the certificate password
   - Ensure the certificate has a private key

3. **Web Enrollment Not Accessible**
   - Check IIS service status
   - Verify SSL certificate binding
   - Check firewall rules for ports 80/443

### Logs and Debugging

1. **Windows Event Logs**:
   - Application logs for AD CS
   - System logs for WinRM
   - Security logs for authentication

2. **PowerShell Debugging**:
   ```powershell
   # Enable verbose logging
   $VerbosePreference = "Continue"
   
   # Test WinRM with verbose output
   Test-WSMan -ComputerName 172.18.254.20 -Verbose
   ```

## Integration with RuneFrame OS Platform Infrastructure

### Monitoring
- Add the Windows server to monitoring systems
- Configure alerts for certificate services
- Monitor certificate expiration

### Backup
- Include certificate files in backup strategy
- Backup AD CS configuration
- Document certificate recovery procedures

### Documentation
- Update infrastructure documentation
- Document certificate enrollment procedures
- Maintain runbooks for certificate management

## Maintenance

### Regular Tasks
1. **Certificate Renewal**: Monitor certificate expiration dates
2. **Security Updates**: Apply Windows updates regularly
3. **Backup Verification**: Test certificate recovery procedures
4. **Performance Monitoring**: Monitor certificate service performance

### Certificate Management
1. **New Certificate Requests**: Process through web enrollment
2. **Certificate Revocation**: Use AD CS management tools
3. **Certificate Templates**: Configure as needed for RuneFrame OS Platform services

## Support

For issues with the Windows server integration:
1. Check this documentation first
2. Review Windows Event Logs
3. Test connectivity and services
4. Contact the infrastructure team

## References

- [Active Directory Certificate Services Documentation](https://docs.microsoft.com/en-us/windows-server/networking/core-network-guide/cncg/server-certs/server-certificate-deployment)
- [PowerShell Remoting Guide](https://docs.microsoft.com/en-us/powershell/scripting/learn/remoting/winrmsecurity)
- [Windows Server 2019 Administration](https://docs.microsoft.com/en-us/windows-server/) 
