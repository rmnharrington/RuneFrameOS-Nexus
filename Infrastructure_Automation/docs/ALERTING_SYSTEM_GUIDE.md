# RuneFrame-DevOps Alerting System Guide
# Comprehensive guide for email, SMS, and notification alerting
# Author: RuneFrameOS Infrastructure Team
# Version: 1.0.0

## 🚨 **OVERVIEW**

The RuneFrame-DevOps monitoring stack includes a comprehensive alerting system that can send notifications via:
- **Email** (SMTP)
- **SMS** (via Twilio)
- **Slack** (webhooks)
- **Discord** (webhooks)
- **Custom webhooks**

## 📧 **EMAIL ALERTING**

### **Configuration**
Email alerts are configured through AlertManager and can use any SMTP server:

```yaml
# Example Gmail configuration
smtp_smarthost: 'smtp.gmail.com:587'
smtp_from: 'alerts@yourdomain.com'
smtp_auth_username: 'alerts@yourdomain.com'
smtp_auth_password: 'your_app_password'
```

### **Popular SMTP Providers**

#### **Gmail**
- **Server**: `smtp.gmail.com:587`
- **Authentication**: App Password required
- **Setup**: Enable 2FA, generate App Password

#### **Office 365**
- **Server**: `smtp.office365.com:587`
- **Authentication**: Username/password or OAuth2

#### **SendGrid**
- **Server**: `smtp.sendgrid.net:587`
- **Authentication**: API key as password

#### **AWS SES**
- **Server**: `email-smtp.us-east-1.amazonaws.com:587`
- **Authentication**: SMTP credentials

## 📱 **SMS ALERTING**

### **Twilio Integration**
SMS alerts are sent via Twilio webhooks:

```yaml
webhook_configs:
  - url: 'https://api.twilio.com/2010-04-01/Accounts/ACCOUNT_SID/Messages.json'
    http_config:
      basic_auth:
        username: 'ACCOUNT_SID'
        password: 'AUTH_TOKEN'
```

### **Setup Steps**
1. Create Twilio account
2. Get Account SID and Auth Token
3. Configure phone numbers
4. Update AlertManager config

### **Alternative SMS Providers**
- **AWS SNS**: Direct SMS integration
- **Vonage**: Global SMS service
- **MessageBird**: European SMS provider

## 🔔 **SLACK INTEGRATION**

### **Webhook Configuration**
```yaml
webhook_configs:
  - url: 'https://hooks.slack.com/services/YOUR_WEBHOOK_URL'
    recipient: '#alerts'
    mentionChannel: "here"
    mentionUsers: "U1234567890"
```

### **Setup Steps**
1. Create Slack app
2. Enable incoming webhooks
3. Configure webhook URL
4. Set up notification channel

## 📊 **ALERTING RULES**

### **Sample Alert Rules**
```yaml
# High CPU Usage
- alert: HighCPUUsage
  expr: 100 - (avg by(instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80
  for: 5m
  labels:
    severity: warning
  annotations:
    summary: "High CPU usage on {{ $labels.instance }}"
```

### **Severity Levels**
- **Critical**: Immediate attention required
- **Warning**: Monitor and investigate
- **Info**: Informational alerts

## 🎯 **ALERT ROUTING**

### **Routing Rules**
```yaml
routes:
  - match:
      severity: critical
    receiver: 'team-urgent'
    repeat_interval: 15m
  - match:
      severity: warning
    receiver: 'team-standard'
    repeat_interval: 1h
```

### **Grouping and Inhibition**
- **Group by**: `alertname`, `cluster`, `service`
- **Group wait**: 10s (initial delay)
- **Group interval**: 10s (between groups)
- **Repeat interval**: 1h (resend frequency)

## 🚀 **QUICK SETUP**

### **1. Run Setup Script**
```bash
chmod +x setup-alerting.sh
./setup-alerting.sh
```

### **2. Manual Configuration**
```bash
# Copy configs to Watson
scp configs/alertmanager.yml richard@watson.pedantictheory.com:~/monitoring-stack/configs/
scp configs/grafana-alerting.yml richard@watson.pedantictheory.com:~/monitoring-stack/configs/

# Restart services
ssh richard@watson.pedantictheory.com "cd ~/monitoring-stack && docker compose restart alertmanager prometheus"
```

### **3. Test Configuration**
```bash
# Check AlertManager
curl http://watson.pedantictheory.com:9093/api/v1/status

# Check Prometheus alerts
curl http://watson.pedantictheory.com:9090/api/v1/alerts
```

## 🔧 **TROUBLESHOOTING**

### **Common Issues**

#### **Email Not Sending**
- Check SMTP credentials
- Verify firewall rules
- Check authentication method
- Test SMTP connection

#### **SMS Not Sending**
- Verify Twilio credentials
- Check phone number format
- Verify webhook URL
- Check AlertManager logs

#### **Alerts Not Triggering**
- Verify Prometheus rules
- Check AlertManager targets
- Verify alerting configuration
- Check service health

### **Debug Commands**
```bash
# Check AlertManager logs
docker compose logs alertmanager

# Check Prometheus configuration
docker compose exec prometheus promtool check config /etc/prometheus/prometheus.yml

# Test SMTP connection
telnet smtp.gmail.com 587

# Check webhook delivery
docker compose logs alertmanager | grep webhook
```

## 📋 **BEST PRACTICES**

### **Alert Design**
- **Clear naming**: Use descriptive alert names
- **Appropriate thresholds**: Set realistic limits
- **Meaningful descriptions**: Include context and actions
- **Runbook links**: Link to resolution procedures

### **Notification Management**
- **Escalation policies**: Route critical alerts appropriately
- **Quiet hours**: Respect team schedules
- **Deduplication**: Avoid alert spam
- **Acknowledgment**: Track alert handling

### **Security**
- **Encrypted SMTP**: Use TLS/SSL
- **API key rotation**: Regular credential updates
- **Access control**: Limit AlertManager access
- **Audit logging**: Track alert actions

## 🌐 **INTEGRATION EXAMPLES**

### **Custom Webhook**
```yaml
webhook_configs:
  - url: 'https://your-api.com/alerts'
    http_config:
      basic_auth:
        username: 'api_user'
        password: 'api_key'
    send_resolved: true
```

### **PagerDuty Integration**
```yaml
webhook_configs:
  - url: 'https://events.pagerduty.com/v2/enqueue'
    http_config:
      headers:
        Content-Type: 'application/json'
    send_resolved: true
```

### **Microsoft Teams**
```yaml
webhook_configs:
  - url: 'https://your-domain.webhook.office.com/webhookb2/...'
    send_resolved: true
```

## 📚 **RESOURCES**

### **Documentation**
- [AlertManager Configuration](https://prometheus.io/docs/alerting/latest/configuration/)
- [Grafana Alerting](https://grafana.com/docs/grafana/latest/alerting/)
- [Twilio SMS API](https://www.twilio.com/docs/sms/api)

### **Tools**
- **SMTP Testing**: `swaks` or `telnet`
- **Webhook Testing**: `curl` or Postman
- **Alert Testing**: Prometheus test alerts

---

**Last Updated**: 2025-08-18  
**Next Review**: 2025-08-25  
**Maintainer**: RuneFrameOS Infrastructure Team
