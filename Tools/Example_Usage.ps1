# Example Usage Script for WinRM DNS Management Module
# This script demonstrates how to use the module for common DNS management tasks

#Requires -Version 5.1
#Requires -Modules Pki, DnsServer, ActiveDirectory

<#
.SYNOPSIS
    Example usage script for the WinRM DNS Management Module
    
.DESCRIPTION
    This script demonstrates how to:
    1. Import and initialize the module
    2. Test connectivity
    3. Perform common DNS operations
    4. Handle errors gracefully
    
.EXAMPLE
    .\Example_Usage.ps1
    
.NOTES
    Make sure the module and configuration files are in the same directory
    or adjust the paths accordingly.
#>

# Set error action preference
$ErrorActionPreference = "Stop"

Write-Host "=== WinRM DNS Management Module Example Usage ===" -ForegroundColor Cyan
Write-Host ""

try {
    # Step 1: Import the module
    Write-Host "Step 1: Importing WinRM DNS Management Module..." -ForegroundColor Yellow
    $modulePath = Join-Path $PSScriptRoot "WinRM-DNS-Management.psm1"
    
    if (-not (Test-Path $modulePath)) {
        throw "Module file not found: $modulePath"
    }
    
    Import-Module $modulePath -Force
    Write-Host "Module imported successfully." -ForegroundColor Green
    Write-Host ""
    
    # Step 2: Import configuration
    Write-Host "Step 2: Importing configuration..." -ForegroundColor Yellow
    $configPath = Join-Path $PSScriptRoot "config.yaml"
    
    if (-not (Test-Path $configPath)) {
        throw "Configuration file not found: $configPath"
    }
    
    $configResult = Import-WinRMDnsConfig -ConfigPath $configPath
    if (-not $configResult) {
        throw "Failed to import configuration"
    }
    
    Write-Host "Configuration loaded successfully." -ForegroundColor Green
    Write-Host ""
    
    # Step 3: Initialize certificates
    Write-Host "Step 3: Initializing certificates..." -ForegroundColor Yellow
    $certResult = Initialize-WinRMDnsCertificates
    if (-not $certResult) {
        throw "Failed to initialize certificates"
    }
    
    Write-Host "Certificates initialized successfully." -ForegroundColor Green
    Write-Host ""
    
    # Step 4: Test connectivity
    Write-Host "Step 4: Testing WinRM connectivity..." -ForegroundColor Yellow
    $connectivityResult = Test-WinRMConnectivity
    if (-not $connectivityResult) {
        throw "WinRM connectivity test failed"
    }
    
    Write-Host "Connectivity test passed successfully." -ForegroundColor Green
    Write-Host ""
    
    # Step 5: Demonstrate DNS operations
    Write-Host "Step 5: Demonstrating DNS operations..." -ForegroundColor Yellow
    
    # Get current DNS zone information
    $dnsZone = $script:ModuleConfig.target_environment.dns_zone
    Write-Host "Working with DNS zone: $dnsZone" -ForegroundColor Cyan
    
    # Find an available IP address
    Write-Host "Finding available IP address..." -ForegroundColor Cyan
    $subnetCidr = $script:ModuleConfig.target_environment.subnet_cidr
    $gatewayIp = $script:ModuleConfig.target_environment.gateway_ip
    
    $availableIP = Find-AvailableDnsIPAddress -SubnetCIDR $subnetCidr -DnsZoneName $dnsZone -ExcludedIPs $gatewayIp
    
    if ($availableIP) {
        Write-Host "Available IP found: $availableIP" -ForegroundColor Green
        
        # Create a test hostname
        $testHostname = "cursor-demo-$(Get-Random -Minimum 1000 -Maximum 9999)"
        Write-Host "Creating test DNS record: $testHostname -> $availableIP" -ForegroundColor Cyan
        
        # Add the DNS record
        $addResult = Add-DnsHostRecord -HostName $testHostname -IPAddress $availableIP -DnsZoneName $dnsZone
        if ($addResult) {
            Write-Host "DNS record created successfully." -ForegroundColor Green
            
            # Wait a moment for DNS replication
            Start-Sleep -Seconds 3
            
            # Test the record
            Write-Host "Testing DNS record resolution..." -ForegroundColor Cyan
            $testResult = Test-DnsRecord -HostName $testHostname -DnsZoneName $dnsZone
            
            if ($testResult.Exists) {
                Write-Host "DNS record resolves correctly to: $($testResult.IPAddress)" -ForegroundColor Green
            }
            else {
                Write-Warning "DNS record does not resolve yet."
            }
            
            # Clean up - remove the test record
            Write-Host "Cleaning up test record..." -ForegroundColor Cyan
            $removeResult = Remove-DnsHostRecord -HostName $testHostname -DnsZoneName $dnsZone
            if ($removeResult) {
                Write-Host "Test record removed successfully." -ForegroundColor Green
            }
        }
    }
    else {
        Write-Warning "No available IP addresses found in subnet."
    }
    
    # Step 6: Get current DNS records
    Write-Host "Step 6: Retrieving current DNS records..." -ForegroundColor Yellow
    $records = Get-DnsRecords -DnsZoneName $dnsZone -RecordType "A"
    
    if ($records) {
        Write-Host "Found $($records.Count) DNS A records in zone '$dnsZone':" -ForegroundColor Green
        foreach ($record in $records | Select-Object -First 10) {
            $hostname = if ($record.HostName) { $record.HostName } else { "@" }
            $ip = $record.RecordData.IPv4Address.IPAddressToString
            Write-Host "  $hostname -> $ip" -ForegroundColor Cyan
        }
        
        if ($records.Count -gt 10) {
            Write-Host "  ... and $($records.Count - 10) more records" -ForegroundColor Gray
        }
    }
    else {
        Write-Host "No DNS A records found in zone '$dnsZone'." -ForegroundColor Yellow
    }
    
    Write-Host ""
    Write-Host "=== Example Usage Completed Successfully ===" -ForegroundColor Green
    Write-Host "The WinRM DNS Management Module is working correctly!" -ForegroundColor Green
    
}
catch {
    Write-Error "Example usage failed: $_"
    Write-Host ""
    Write-Host "Troubleshooting tips:" -ForegroundColor Yellow
    Write-Host "1. Ensure all required PowerShell modules are installed" -ForegroundColor Gray
    Write-Host "2. Check that the configuration file is valid" -ForegroundColor Gray
    Write-Host "3. Verify network connectivity to the target server" -ForegroundColor Gray
    Write-Host "4. Ensure WinRM is enabled and configured on the target" -ForegroundColor Gray
    Write-Host "5. Check that certificates are properly installed" -ForegroundColor Gray
    
    exit 1
}
finally {
    # Clean up module
    if (Get-Module -Name "WinRM-DNS-Management") {
        Remove-Module -Name "WinRM-DNS-Management" -Force
        Write-Host "Module unloaded." -ForegroundColor Gray
    }
}
