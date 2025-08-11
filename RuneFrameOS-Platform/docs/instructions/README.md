# Instructions Directory
## Operational Procedures for RuneFrameOS

### Overview
This directory contains all operational procedures, setup guides, and infrastructure management instructions for the RuneFrameOS ecosystem.

---

## Available Instructions

### Infrastructure Access
- **`machine_instructions.md`** - RuneFrame OS Platform infrastructure access and procedures
  - SSH configuration and access
  - Kubernetes cluster management
  - Infrastructure monitoring and maintenance

### System Integration
- **`windows_server_integration.md`** - Windows server integration
  - Windows-specific configurations
  - Cross-platform compatibility
  - Integration procedures

### Development Standards
- **`file_naming_standard.md`** - File naming conventions and standards
  - Underscore-based naming convention
  - Machine-friendly naming patterns
  - ASCII compatibility requirements

### Front-End Development
- **`frontend_developer_cursor_setup.md`** - Front-end developer Cursor IDE setup
  - Complete Remote-SSH configuration
  - SSH key setup and authentication
  - Cluster access procedures
  - Development environment setup

- **`frontend_developer_access_summary.md`** - Front-end developer access summary
  - Security exception documentation
  - Access limitations and compliance
  - Quick start guide
  - Troubleshooting procedures

- **`github_cli_setup_guide.md`** - GitHub and GitHub CLI setup guide
  - GitHub CLI installation and authentication
  - Cursor IDE GitHub integration
  - Repository setup and workflow
  - Security best practices and troubleshooting

- **`frontend_developer_storage_integration.md`** - Front-end developer storage integration guide
  - Long-term storage infrastructure overview
  - Directory structure preservation solution
  - Volume mounting best practices
  - Troubleshooting and monitoring procedures

---

## Usage Guidelines

### For Infrastructure Management
1. Start with `machine_instructions.md` for cluster access
2. Use `windows_server_integration.md` for Windows-specific tasks
3. Follow `file_naming_standard.md` for all file operations

### For Front-End Developers
1. Read `frontend_developer_access_summary.md` for overview
2. Follow `frontend_developer_cursor_setup.md` for complete setup
3. Use `github_cli_setup_guide.md` for GitHub integration
4. Reference `frontend_developer_storage_integration.md` for storage infrastructure
5. Reference `machine_instructions.md` for cluster operations
6. Adhere to `file_naming_standard.md` for all development work

### For Security Compliance
- All access is logged and audited
- Follow security exception procedures
- Maintain audit trails
- Report security incidents immediately

---

## Security Information

### Access Control
- **SSH Key-based**: No password authentication
- **Limited Scope**: Development namespaces only
- **Monitoring**: All actions logged
- **Review Cycle**: 30-day review schedule

### Compliance Frameworks
- **NIST SSDF**: Software supply chain security
- **SOC 2**: Security and availability controls
- **CISA Secure by Design**: Security-first development
- **OWASP Top 10**: Web application security

---

## Quick Reference

### Essential Commands
```bash
# Connect to cluster
ssh RuneFrame OS Platform-sherlock

# Check cluster status
kubectl get nodes

# Access RuneFrameOS
cd /home/RuneFrame OS Platform/RuneFrameOS

# View applications
kubectl get pods --all-namespaces
```

### Important Files
- `~/.ssh/PLATFORM_key` - Private SSH key
- `~/.ssh/config` - SSH configuration
- `/home/RuneFrame OS Platform/RuneFrameOS/` - Main repository
- `context_use.yaml` - Quick reference guide

### Security Reminders
- ✅ SSH key-based authentication
- ✅ Limited access scope
- ✅ All actions logged
- ✅ 30-day review cycle
- ✅ Compliance maintained

---

## Support Contacts

### Technical Support
- **Infrastructure Issues**: System Administrator
- **Security Concerns**: Security Team
- **Development Questions**: Lead Developer
- **Documentation**: This directory

### Emergency Contacts
- **Security Incidents**: Report immediately
- **System Outages**: Infrastructure team
- **Access Issues**: System Administrator

---

## File Organization

### Naming Convention
- **Format**: `descriptive_name.md`
- **No dashes**: Use underscores only
- **No spaces**: Underscore-based naming
- **Machine-friendly**: Optimized for AI comprehension

### Directory Structure
```
instructions/
├── machine_instructions.md
├── windows_server_integration.md
├── file_naming_standard.md
├── frontend_developer_cursor_setup.md
├── frontend_developer_access_summary.md
├── github_cli_setup_guide.md
└── README.md
```

---

## Version Information

- **Last Updated**: 2025-08-08
- **Purpose**: Operational procedures and setup guides
- **Security Exception**: #001 (approved)
- **Review Cycle**: 30 days

---

*This directory is part of the RuneFrameOS security framework and must be maintained according to established security policies.*

