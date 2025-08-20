#!/bin/bash

# RuneFrame-DevOps Alerting Setup Script
# Configures email and SMS alerting for the monitoring stack
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

print_header "RuneFrame-DevOps Alerting System Setup"
echo "=============================================="
echo "This script will configure email and SMS alerting"
echo "for your monitoring stack"
echo ""

# Configuration variables
PROJECT_DIR="$HOME/monitoring-stack"
CONFIGS_DIR="$PROJECT_DIR/configs"

# Check if we're in the right directory
if [[ ! -d "$CONFIGS_DIR" ]]; then
    print_error "Configs directory not found: $CONFIGS_DIR"
    exit 1
fi

print_status "Setting up alerting configuration..."

# Create alerting directories
mkdir -p "$PROJECT_DIR/data/alertmanager"
mkdir -p "$PROJECT_DIR/configs/prometheus-rules"

print_status "Creating alerting configuration files..."

# Copy alerting configs
cp "$CONFIGS_DIR/alertmanager.yml" "$CONFIGS_DIR/alertmanager.yml.backup" 2>/dev/null || true
cp "$CONFIGS_DIR/grafana-alerting.yml" "$CONFIGS_DIR/grafana-alerting.yml.backup" 2>/dev/null || true

print_success "Alerting configuration files created"

print_status "Configuring email alerting..."

# Get email configuration
echo ""
echo "=== EMAIL ALERTING CONFIGURATION ==="
read -p "Enter SMTP server (e.g., smtp.gmail.com:587): " SMTP_SERVER
read -p "Enter SMTP username (email): " SMTP_USERNAME
read -s -p "Enter SMTP password/app password: " SMTP_PASSWORD
echo ""
read -p "Enter from email address: " FROM_EMAIL
read -p "Enter recipient email(s) (comma-separated): " RECIPIENT_EMAILS

# Update AlertManager config with email settings
sed -i "s|smtp_smarthost: 'smtp.gmail.com:587'|smtp_smarthost: '$SMTP_SERVER'|g" "$CONFIGS_DIR/alertmanager.yml"
sed -i "s|smtp_from: 'alerts@runeframeos.com'|smtp_from: '$FROM_EMAIL'|g" "$CONFIGS_DIR/alertmanager.yml"
sed -i "s|smtp_auth_username: 'alerts@runeframeos.com'|smtp_auth_username: '$SMTP_USERNAME'|g" "$CONFIGS_DIR/alertmanager.yml"
sed -i "s|smtp_auth_password: 'your_app_password'|smtp_auth_password: '$SMTP_PASSWORD'|g" "$CONFIGS_DIR/alertmanager.yml"
sed -i "s|admin@runeframeos.com,ops@runeframeos.com|$RECIPIENT_EMAILS|g" "$CONFIGS_DIR/alertmanager.yml"

print_success "Email alerting configured"

print_status "Configuring SMS alerting..."

echo ""
echo "=== SMS ALERTING CONFIGURATION ==="
echo "SMS alerts are sent via Twilio webhook"
read -p "Do you want to configure SMS alerts? (y/n): " CONFIGURE_SMS

if [[ "$CONFIGURE_SMS" =~ ^[Yy]$ ]]; then
    read -p "Enter Twilio Account SID: " TWILIO_SID
    read -p "Enter Twilio Auth Token: " TWILIO_TOKEN
    read -p "Enter phone number(s) for SMS (comma-separated): " SMS_NUMBERS
    
    # Update AlertManager config with Twilio settings
    sed -i "s|ACCOUNT_SID|$TWILIO_SID|g" "$CONFIGS_DIR/alertmanager.yml"
    sed -i "s|AUTH_TOKEN|$TWILIO_TOKEN|g" "$CONFIGS_DIR/alertmanager.yml"
    
    print_success "SMS alerting configured"
else
    print_status "SMS alerting skipped"
fi

print_status "Configuring Slack integration..."

echo ""
echo "=== SLACK INTEGRATION ==="
read -p "Do you want to configure Slack alerts? (y/n): " CONFIGURE_SLACK

if [[ "$CONFIGURE_SLACK" =~ ^[Yy]$ ]]; then
    read -p "Enter Slack webhook URL: " SLACK_WEBHOOK
    read -p "Enter Slack channel (e.g., #alerts): " SLACK_CHANNEL
    
    # Update AlertManager config with Slack settings
    sed -i "s|YOUR_WEBHOOK_URL|$SLACK_WEBHOOK|g" "$CONFIGS_DIR/alertmanager.yml"
    sed -i "s|#alerts|$SLACK_CHANNEL|g" "$CONFIGS_DIR/alertmanager.yml"
    
    print_success "Slack integration configured"
else
    print_status "Slack integration skipped"
fi

print_status "Setting up alerting rules..."

# Copy alerting rules
if [[ -f "$CONFIGS_DIR/prometheus-rules/alerts.yml" ]]; then
    print_success "Alerting rules already exist"
else
    print_error "Alerting rules file not found"
    exit 1
fi

print_status "Restarting services to apply alerting configuration..."

# Restart AlertManager and Prometheus
cd "$PROJECT_DIR"
docker compose restart alertmanager prometheus

print_success "Alerting system setup complete!"
echo ""
echo "=== NEXT STEPS ==="
echo "1. Test email alerts: http://watson.pedantictheory.com:9093"
echo "2. View Prometheus alerts: http://watson.pedantictheory.com:9090/alerts"
echo "3. Configure Grafana alerting: http://watson.pedantictheory.com:3001"
echo "4. Check AlertManager status: docker compose logs alertmanager"
echo ""
echo "=== ALERTING CHANNELS ==="
echo "✅ Email: Configured"
if [[ "$CONFIGURE_SMS" =~ ^[Yy]$ ]]; then
    echo "✅ SMS: Configured (Twilio)"
else
    echo "❌ SMS: Not configured"
fi
if [[ "$CONFIGURE_SLACK" =~ ^[Yy]$ ]]; then
    echo "✅ Slack: Configured"
else
    echo "❌ Slack: Not configured"
fi
echo ""
echo "=== TESTING ALERTS ==="
echo "To test the alerting system:"
echo "1. Create a test alert in Prometheus"
echo "2. Check if notifications are received"
echo "3. Verify AlertManager routing"
echo ""
print_success "Setup complete! Your monitoring stack now has email and SMS alerting capabilities."
