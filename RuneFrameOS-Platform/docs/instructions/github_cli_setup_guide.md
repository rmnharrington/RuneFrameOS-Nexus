# GitHub and GitHub CLI Setup Guide
## Front-End Developer GitHub Integration

### Overview
This guide provides comprehensive instructions for setting up GitHub and GitHub CLI integration within Cursor IDE for the front-end developer. It covers both scenarios: when GitHub CLI is already installed and when it needs to be installed.

---

## Prerequisites

### Required Software
- [x] Cursor IDE (Ultra subscription)
- [x] GitHub account (already authenticated via web)
- [x] SSH key-based authentication (from `frontend_developer_cursor_setup.md`)
- [x] Remote-SSH connection to sherlock cluster

### Current Status
- **GitHub Web Authentication**: ✅ Already authenticated
- **GitHub CLI**: ⚠️ Likely needs installation
- **SSH Keys**: ✅ Available from previous setup
- **Cursor IDE**: ✅ Ready for integration

---

## Step 1: Verify GitHub CLI Installation

### Check Current Installation
```bash
# Check if GitHub CLI is installed
gh --version

# Expected output if installed:
# gh version 2.40.1 (2024-01-16)
# https://github.com/cli/cli/releases
```

### If GitHub CLI is NOT Installed
If the command returns "command not found", proceed to **Step 2: Install GitHub CLI**

### If GitHub CLI is Installed
Skip to **Step 3: GitHub CLI Authentication**

---

## Step 2: Install GitHub CLI

### Windows Installation (PowerShell)
```powershell
# Method 1: Using winget (recommended)
winget install --id GitHub.cli

# Method 2: Using Chocolatey
choco install gh

# Method 3: Manual installation
# Download from: https://cli.github.com/
# Extract and add to PATH
```

### macOS Installation
```bash
# Method 1: Using Homebrew (recommended)
brew install gh

# Method 2: Using MacPorts
sudo port install gh

# Method 3: Manual installation
# Download from: https://cli.github.com/
```

### Linux Installation (Ubuntu/Debian)
```bash
# Method 1: Using apt (recommended)
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh

# Method 2: Using snap
sudo snap install gh

# Method 3: Manual installation
# Download from: https://cli.github.com/
```

### Verify Installation
```bash
# Check version
gh --version

# Test basic functionality
gh auth status
```

---

## Step 3: GitHub CLI Authentication

### Authenticate with GitHub
```bash
# Start authentication process
gh auth login

# Follow the interactive prompts:
# 1. What account do you want to log into? GitHub.com
# 2. What is your preferred protocol for Git operations? SSH
# 3. Upload your SSH public key to your GitHub account? Yes
# 4. How would you like to authenticate GitHub CLI? Login with a web browser
```

### Alternative Authentication Method
If the interactive method fails, use manual authentication:

```bash
# Generate a token (if needed)
gh auth login --web

# Or use existing token
gh auth login --with-token < your-token-here
```

### Verify Authentication
```bash
# Check authentication status
gh auth status

# Expected output:
# github.com
#   ✓ Logged in to github.com as username (oauth_token)
#   ✓ Git operations for github.com configured to use ssh protocol.
#   ✓ Token: *******************
```

---

## Step 4: Configure Git for GitHub

### Set Git Configuration
```bash
# Set your GitHub username and email
git config --global user.name "Your GitHub Username"
git config --global user.email "your-email@example.com"

# Verify configuration
git config --global user.name
git config --global user.email
```

### Configure SSH for GitHub
```bash
# Test SSH connection to GitHub
ssh -T git@github.com

# Expected output:
# Hi username! You've successfully authenticated, but GitHub does not provide shell access.
```

### If SSH Key Not Added to GitHub
```bash
# Copy your SSH public key
cat ~/.ssh/PLATFORM_key.pub

# Add this key to your GitHub account:
# 1. Go to GitHub.com → Settings → SSH and GPG keys
# 2. Click "New SSH key"
# 3. Paste the public key content
# 4. Give it a descriptive title (e.g., "Cursor IDE - Sherlock Cluster")
# 5. Click "Add SSH key"
```

---

## Step 5: Cursor IDE GitHub Integration

### Install GitHub Extension
1. Open Cursor IDE
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "GitHub"
4. Install "GitHub Pull Requests and Issues" by Microsoft
5. Restart Cursor if prompted

### Configure GitHub in Cursor
```bash
# In Cursor terminal, verify GitHub CLI integration
gh auth status

# Test GitHub CLI commands
gh repo list

# Clone a repository (example)
gh repo clone username/repository-name
```

### Cursor GitHub Features
- **Source Control**: Built-in Git integration
- **Pull Requests**: View and manage PRs directly in Cursor
- **Issues**: Create and track issues
- **Code Review**: Inline comments and suggestions
- **Branch Management**: Easy branch switching and creation

---

## Step 6: RuneFrameOS Repository Setup

### Clone RuneFrameOS Repository
```bash
# Navigate to your development directory
cd ~/development

# Clone the RuneFrameOS repository
gh repo clone packetalien/RuneFrameOS

# Or if you have direct access:
git clone git@github.com:packetalien/RuneFrameOS.git
```

### Set Up Development Branch
```bash
# Navigate to repository
cd RuneFrameOS

# Create and switch to development branch
git checkout -b frontend-development

# Verify branch
git branch
```

### Configure Repository Settings
```bash
# Set upstream (if forking)
git remote add upstream git@github.com:packetalien/RuneFrameOS.git

# Verify remotes
git remote -v
```

---

## Step 7: GitHub CLI Workflow Integration

### Common GitHub CLI Commands
```bash
# Repository Management
gh repo list                    # List your repositories
gh repo view                    # View current repository
gh repo clone username/repo     # Clone a repository

# Pull Requests
gh pr list                      # List pull requests
gh pr create                    # Create a new pull request
gh pr view 123                  # View specific PR
gh pr checkout 123              # Checkout PR branch

# Issues
gh issue list                   # List issues
gh issue create                 # Create new issue
gh issue view 456               # View specific issue

# Releases
gh release list                 # List releases
gh release create               # Create new release

# Workflow
gh workflow list                # List workflows
gh workflow run                 # Run a workflow
```

### Development Workflow
```bash
# 1. Create feature branch
git checkout -b feature/new-component

# 2. Make changes and commit
git add .
git commit -m "feat: add new frontend component"

# 3. Push branch
git push origin feature/new-component

# 4. Create pull request
gh pr create --title "Add new frontend component" --body "Implements new UI component for Distillara"

# 5. Review and merge
gh pr view
gh pr merge
```

---

## Step 8: Advanced Configuration

### GitHub CLI Configuration
```bash
# Set default editor
gh config set editor code

# Set default browser
gh config set browser firefox

# Set default repository
gh config set git_protocol ssh

# View all configuration
gh config list
```

### Git Configuration
```bash
# Set default branch name
git config --global init.defaultBranch main

# Set pull strategy
git config --global pull.rebase false

# Set credential helper
git config --global credential.helper store

# Configure line endings
git config --global core.autocrlf true  # Windows
git config --global core.autocrlf input # macOS/Linux
```

### SSH Configuration for Multiple Accounts
```bash
# Create SSH config for multiple GitHub accounts
cat >> ~/.ssh/config << EOF

# Personal GitHub account
Host github-personal
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_rsa_personal

# Work GitHub account
Host github-work
    HostName github.com
    User git
    IdentityFile ~/.ssh/PLATFORM_key
EOF
```

---

## Step 9: Troubleshooting

### Common Issues and Solutions

#### GitHub CLI Not Found
```bash
# Check PATH
echo $PATH

# Add to PATH if needed
export PATH="$PATH:/usr/local/bin"

# Restart terminal/Cursor
```

#### Authentication Issues
```bash
# Re-authenticate
gh auth logout
gh auth login

# Check token
gh auth token
```

#### SSH Connection Issues
```bash
# Test SSH connection
ssh -T git@github.com

# Debug SSH
ssh -vT git@github.com

# Check SSH agent
ssh-add -l
```

#### Git Configuration Issues
```bash
# Reset Git configuration
git config --global --unset user.name
git config --global --unset user.email

# Set again
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

---

## Step 10: Security Best Practices

### SSH Key Management
```bash
# Use different keys for different purposes
# Personal: ~/.ssh/id_rsa
# Work: ~/.ssh/PLATFORM_key
# RuneFrameOS: ~/.ssh/runeframeos_key

# Set proper permissions
chmod 600 ~/.ssh/PLATFORM_key
chmod 644 ~/.ssh/PLATFORM_key.pub
```

### Token Security
```bash
# Use fine-grained personal access tokens
# Scope: repo, workflow, read:org

# Store tokens securely
# Use environment variables or secure storage
```

### Repository Security
```bash
# Never commit sensitive information
# Use .gitignore for secrets
# Use environment variables for configuration
```

---

## Quick Reference

### Essential Commands
```bash
# GitHub CLI
gh auth status              # Check authentication
gh repo list               # List repositories
gh pr create               # Create pull request
gh issue create            # Create issue

# Git
git status                 # Check repository status
git add .                  # Stage all changes
git commit -m "message"    # Commit changes
git push origin branch     # Push to remote
git pull origin main       # Pull latest changes
```

### Important Files
- `~/.ssh/PLATFORM_key` - SSH key for cluster access
- `~/.ssh/id_rsa` - SSH key for GitHub (personal)
- `~/.gitconfig` - Git configuration
- `~/.config/gh/config.yml` - GitHub CLI configuration

### Security Checklist
- ✅ SSH keys properly configured
- ✅ GitHub CLI authenticated
- ✅ Git user configured
- ✅ Repository cloned
- ✅ Development branch created
- ✅ Cursor GitHub extension installed

---

## Support and Resources

### Documentation
- [GitHub CLI Documentation](https://cli.github.com/)
- [GitHub SSH Setup](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- [Cursor IDE GitHub Integration](https://code.visualstudio.com/docs/editor/github)

### Contact Information
- **GitHub Issues**: Report via GitHub Issues
- **Cursor Support**: Cursor IDE documentation
- **RuneFrameOS Team**: Lead Developer

---

## Version Information

- **Created**: 2025-08-08
- **Purpose**: GitHub and GitHub CLI setup for front-end developer
- **Target**: Cursor IDE with Remote-SSH
- **Security**: SSH key-based authentication
- **Review Cycle**: 30 days

---

*This guide is part of the RuneFrameOS development framework and must be maintained according to established security policies.*

