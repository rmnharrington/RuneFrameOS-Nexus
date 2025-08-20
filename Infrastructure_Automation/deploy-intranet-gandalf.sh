#!/bin/bash

# Bad Guy Gas Intranet Deployment Script for Gandalf (Sherlock)
# Deploys professional intranet with HTTPS/nginx on port 443
# Author: RuneFrameOS Infrastructure Team
# Version: 1.0.0

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() { echo -e "${BLUE}[INFO]${NC} $1"; }
print_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
print_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
print_error() { echo -e "${RED}[ERROR]${NC} $1"; }
print_header() { echo -e "${PURPLE}[HEADER]${NC} $1"; }

# Configuration variables
SERVER="sherlock.pedantictheory.com"
SERVER_IP="172.18.254.41"
INTRA_DIR="/var/www/gandalf-intranet"
NGINX_CONF="/etc/nginx/sites-available/gandalf-intranet"
NGINX_ENABLED="/etc/nginx/sites-enabled/gandalf-intranet"

print_header "Bad Guy Gas Intranet Deployment on Gandalf (Sherlock)"
echo "============================================================="
echo "This script will deploy a professional intranet page with:"
echo "- HTTPS/SSL on port 443"
echo "- Professional enterprise styling"
echo "- All IT resource links"
echo "- Nginx with security headers"
echo ""

# Check if we're running as root
if [[ $EUID -ne 0 ]]; then
    print_error "This script must be run as root (use sudo)"
    exit 1
fi

# Check prerequisites
print_status "Checking prerequisites..."

# Check if nginx is installed
if ! command -v nginx &> /dev/null; then
    print_status "Installing nginx..."
    apt update
    apt install -y nginx
    print_success "Nginx installed successfully"
else
    print_success "Nginx is already installed"
fi

# Check SSL certificates
if [[ ! -f "/etc/ssl/gandalf.crt" ]] || [[ ! -f "/etc/ssl/private/gandalf.key" ]]; then
    print_error "SSL certificates not found!"
    print_error "Expected: /etc/ssl/gandalf.crt and /etc/ssl/private/gandalf.key"
    exit 1
fi
print_success "SSL certificates found"

# Create intranet directory
print_status "Creating intranet directory..."
mkdir -p "$INTRA_DIR"
chown -R www-data:www-data "$INTRA_DIR"
chmod -R 755 "$INTRA_DIR"
print_success "Intranet directory created: $INTRA_DIR"

# Copy intranet files
print_status "Copying intranet files..."
cp -r intranet/* "$INTRA_DIR/"
chown -R www-data:www-data "$INTRA_DIR"
print_success "Intranet files copied"

# Configure nginx
print_status "Configuring nginx..."

# Copy nginx configuration
cp nginx-gandalf.conf "$NGINX_CONF"

# Enable the site
ln -sf "$NGINX_CONF" "$NGINX_ENABLED"

# Test nginx configuration
if nginx -t; then
    print_success "Nginx configuration is valid"
else
    print_error "Nginx configuration test failed"
    exit 1
fi

# Restart nginx
print_status "Restarting nginx..."
systemctl restart nginx
systemctl enable nginx
print_success "Nginx restarted and enabled"

# Configure firewall (if ufw is active)
if command -v ufw &> /dev/null && ufw status | grep -q "Status: active"; then
    print_status "Configuring firewall..."
    ufw allow 80/tcp
    ufw allow 443/tcp
    print_success "Firewall configured for HTTP and HTTPS"
fi

# Create health check
print_status "Creating health check endpoint..."
cat > "$INTRA_DIR/health" << 'EOF'
healthy
EOF

# Test the deployment
print_status "Testing deployment..."

# Test HTTP to HTTPS redirect
if curl -s -I "http://$SERVER_IP" | grep -q "301"; then
    print_success "HTTP to HTTPS redirect working"
else
    print_warning "HTTP to HTTPS redirect may not be working"
fi

# Test HTTPS access
if curl -s -k "https://$SERVER_IP" | grep -q "Bad Guy Gas"; then
    print_success "HTTPS access working"
else
    print_warning "HTTPS access may not be working"
fi

# Final status
print_success "Intranet deployment completed!"
echo ""
echo "🌐 Access your intranet at: https://gandalf.pedantictheory.com"
echo "📁 Files located at: $INTRA_DIR"
echo "🔧 Nginx config: $NGINX_CONF"
echo "📊 Health check: https://gandalf.pedantictheory.com/health"
echo ""
echo "📋 Next steps:"
echo "1. Verify SSL certificate is valid"
echo "2. Test all resource links"
echo "3. Configure monitoring alerts"
echo "4. Update DNS if needed"
echo ""
print_success "Bad Guy Gas Intranet is now live on Gandalf!"
