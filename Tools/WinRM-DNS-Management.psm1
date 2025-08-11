# WinRM DNS Management PowerShell Module
# This module provides secure DNS management capabilities through WinRM

#Requires -Version 5.1
#Requires -Modules Pki, DnsServer, ActiveDirectory

<#
.SYNOPSIS
    WinRM DNS Management PowerShell Module
    
.DESCRIPTION
    This module provides secure, certificate-based DNS management capabilities
    through Windows Remote Management (WinRM). It includes functions for:
    - Finding available IP addresses in subnets
    - Adding and removing DNS records
    - Managing certificate infrastructure
    - Configuring WinRM security
    
.NOTES
    Author: Bad Guy Gas Infrastructure Team
    Version: 1.0.0
    Requires: PowerShell 5.1+, Pki, DnsServer, ActiveDirectory modules
#>

# Module variables
$script:ModuleConfig = $null
$script:ClientCertificate = $null
$script:TargetHost = $null

# Import configuration
function Import-WinRMDnsConfig {
    <#
    .SYNOPSIS
        Imports configuration from config.yaml file
        
    .DESCRIPTION
        Loads configuration settings from the config.yaml file and validates
        the configuration for use with the module.
        
    .PARAMETER ConfigPath
        Path to the configuration file. Defaults to "config.yaml" in the current directory.
        
    .EXAMPLE
        Import-WinRMDnsConfig -ConfigPath "C:\Config\myconfig.yaml"
        
    .NOTES
        This function must be called before using other module functions.
    #>
    
    param(
        [Parameter(Mandatory = $false)]
        [string]$ConfigPath = "config.yaml"
    )
    
    try {
        if (-not (Test-Path $ConfigPath)) {
            throw "Configuration file not found: $ConfigPath"
        }
        
        # Read and parse YAML configuration
        $yamlContent = Get-Content $ConfigPath -Raw
        $script:ModuleConfig = [System.Management.Automation.PSSerializer]::Deserialize($yamlContent)
        
        # Validate required configuration sections
        $requiredSections = @('target_environment', 'certificates', 'users', 'winrm')
        foreach ($section in $requiredSections) {
            if (-not $script:ModuleConfig.ContainsKey($section)) {
                throw "Missing required configuration section: $section"
            }
        }
        
        # Set module variables
        $script:TargetHost = $script:ModuleConfig.target_environment.hostname
        
        Write-Host "Configuration loaded successfully from: $ConfigPath" -ForegroundColor Green
        Write-Host "Target host: $($script:ModuleConfig.target_environment.hostname)" -ForegroundColor Cyan
        
        return $true
    }
    catch {
        Write-Error "Failed to import configuration: $_"
        return $false
    }
}

function Initialize-WinRMDnsCertificates {
    <#
    .SYNOPSIS
        Initializes certificate infrastructure for WinRM DNS management
        
    .DESCRIPTION
        Creates or loads the necessary certificates for secure WinRM communication.
        This includes a CA certificate and a client authentication certificate.
        
    .EXAMPLE
        Initialize-WinRMDnsCertificates
        
    .NOTES
        Requires configuration to be loaded via Import-WinRMDnsConfig
    #>
    
    if (-not $script:ModuleConfig) {
        throw "Configuration not loaded. Please run Import-WinRMDnsConfig first."
    }
    
    try {
        Write-Host "Initializing certificate infrastructure..." -ForegroundColor Yellow
        
        # Check for CA certificate
        $caSubject = $script:ModuleConfig.certificates.ca_subject
        $script:CaCertificate = Get-ChildItem Cert:\CurrentUser\My | Where-Object { $_.Subject -eq $caSubject }
        
        if (-not $script:CaCertificate) {
            Write-Verbose "CA certificate not found. Creating new self-signed CA."
            $script:CaCertificate = New-SelfSignedCertificate -Subject $caSubject -CertStoreLocation Cert:\CurrentUser\My -KeyUsage CertSign, CRLSign -KeyLength $script:ModuleConfig.certificates.key_length
            Write-Host "Created new CA certificate." -ForegroundColor Green
        }
        else {
            Write-Host "Using existing CA certificate." -ForegroundColor Cyan
        }
        
        # Check for Client certificate
        $clientUpn = $script:ModuleConfig.certificates.client_upn
        $script:ClientCertificate = Get-ChildItem Cert:\CurrentUser\My | Where-Object { $_.Subject -like "CN=$clientUpn*" -and $_.Issuer -eq $script:CaCertificate.Subject }
        
        if (-not $script:ClientCertificate) {
            Write-Verbose "Client certificate not found. Creating new one signed by the CA."
            $textExtension = @(
                "2.5.29.37={text}1.3.6.1.5.5.7.3.2", # EKU: Client Authentication
                "2.5.29.17={text}upn=$clientUpn"    # SAN: User Principal Name
            )
            $script:ClientCertificate = New-SelfSignedCertificate -Subject "CN=$clientUpn" -CertStoreLocation Cert:\CurrentUser\My -Signer $script:CaCertificate -TextExtension $textExtension -KeyLength $script:ModuleConfig.certificates.key_length
            Write-Host "Created new Client Authentication certificate." -ForegroundColor Green
        }
        else {
            Write-Host "Using existing Client Authentication certificate." -ForegroundColor Cyan
        }
        
        Write-Host "Certificate infrastructure initialized successfully." -ForegroundColor Green
        return $true
    }
    catch {
        Write-Error "Failed to initialize certificates: $_"
        return $false
    }
}

function Test-WinRMConnectivity {
    <#
    .SYNOPSIS
        Tests WinRM connectivity to the target server
        
    .DESCRIPTION
        Performs connectivity tests to verify WinRM is accessible and properly configured
        on the target server.
        
    .EXAMPLE
        Test-WinRMConnectivity
        
    .NOTES
        Requires configuration and certificates to be initialized
    #>
    
    if (-not $script:ModuleConfig -or -not $script:ClientCertificate) {
        throw "Module not properly initialized. Please run Import-WinRMDnsConfig and Initialize-WinRMDnsCertificates first."
    }
    
    try {
        Write-Host "Testing WinRM connectivity to $($script:TargetHost)..." -ForegroundColor Yellow
        
        # Test basic WinRM connectivity
        $wsmanTest = Test-WSMan -ComputerName $script:TargetHost -ErrorAction Stop
        if ($wsmanTest.ProductVendor -ne "Microsoft Corporation") {
            throw "Target host is not a Microsoft Windows machine."
        }
        Write-Host "WinRM service is running and responsive." -ForegroundColor Green
        
        # Test certificate-based authentication
        $testCommand = Invoke-Command -ComputerName $script:TargetHost -CertificateThumbprint $script:ClientCertificate.Thumbprint -ScriptBlock { $env:COMPUTERNAME } -ErrorAction Stop
        Write-Host "Certificate authentication successful. Connected to: $testCommand" -ForegroundColor Green
        
        # Test DNS service availability
        $dnsTest = Invoke-Command -ComputerName $script:TargetHost -CertificateThumbprint $script:ClientCertificate.Thumbprint -ScriptBlock { Get-Service -Name "DNS" | Select-Object Name, Status } -ErrorAction Stop
        if ($dnsTest.Status -eq "Running") {
            Write-Host "DNS service is running on target server." -ForegroundColor Green
        }
        else {
            Write-Warning "DNS service is not running on target server."
        }
        
        Write-Host "WinRM connectivity test completed successfully." -ForegroundColor Green
        return $true
    }
    catch {
        Write-Error "WinRM connectivity test failed: $_"
        return $false
    }
}

function Find-AvailableDnsIPAddress {
    <#
    .SYNOPSIS
        Finds the next available IP address in a specified subnet by querying DNS records
        
    .DESCRIPTION
        This function efficiently determines available IP addresses by:
        1. Generating all possible host IPs in the subnet
        2. Querying existing DNS 'A' records
        3. Performing a set-difference operation to find available IPs
        
    .PARAMETER SubnetCIDR
        The subnet in CIDR notation (e.g., "172.18.254.0/24")
        
    .PARAMETER DnsZoneName
        The DNS zone name to query
        
    .PARAMETER ExcludedIPs
        Optional array of IP addresses to exclude from consideration
        
    .EXAMPLE
        Find-AvailableDnsIPAddress -SubnetCIDR "172.18.254.0/24" -DnsZoneName "pedantictheory.com"
        
    .NOTES
        Requires module to be properly initialized
    #>
    
    param(
        [Parameter(Mandatory = $true)]
        [string]$SubnetCIDR,

        [Parameter(Mandatory = $true)]
        [string]$DnsZoneName,

        [string[]]$ExcludedIPs
    )
    
    if (-not $script:ModuleConfig -or -not $script:ClientCertificate) {
        throw "Module not properly initialized. Please run Import-WinRMDnsConfig and Initialize-WinRMDnsCertificates first."
    }
    
    Write-Verbose "Finding next available IP in subnet '$SubnetCIDR' for zone '$DnsZoneName'."
    
    try {
        # Step 1: Generate all possible IP addresses in the subnet
        $ipNetwork = [System.Net.IPNetwork]::Parse($SubnetCIDR)
        $allPossibleIPs = [System.Collections.Generic.HashSet[string]]::new()
        for ($i = 1; $i -lt $ipNetwork.Total - 1; $i++) {
            $allPossibleIPs.Add($ipNetwork.ListableIPAddress[$i - 1].ToString())
        }
        Write-Verbose "Generated $($allPossibleIPs.Count) possible host addresses for subnet."
        
        # Step 2: Remove any explicitly excluded IPs
        if ($null -ne $ExcludedIPs) {
            foreach ($ip in $ExcludedIPs) {
                if ($allPossibleIPs.Contains($ip)) {
                    $allPossibleIPs.Remove($ip)
                    Write-Verbose "Removed excluded IP: $ip"
                }
            }
        }
        
        # Step 3: Get all currently used IPs from DNS 'A' records via secure remote command
        Write-Verbose "Querying DNS server '$script:TargetHost' for all 'A' records in zone '$DnsZoneName'."
        $usedIpsFromDns = Invoke-Command -ComputerName $script:TargetHost -CertificateThumbprint $script:ClientCertificate.Thumbprint -ScriptBlock {
            param($ZoneName)
            Get-DnsServerResourceRecord -ZoneName $ZoneName -RRType A | ForEach-Object { $_.RecordData.IPv4Address.IPAddressToString }
        } -ArgumentList $DnsZoneName
        
        $usedIPs = [System.Collections.Generic.HashSet[string]]::new($usedIpsFromDns)
        Write-Verbose "Found $($usedIPs.Count) used IP addresses in DNS."
        
        # Step 4: Calculate the difference to find available IPs
        $allPossibleIPs.ExceptWith($usedIPs)
        
        if ($allPossibleIPs.Count -eq 0) {
            Write-Warning "No available IP addresses found in subnet '$SubnetCIDR'."
            return $null
        }
        
        # Step 5: Return the first available IP
        $availableIP = $allPossibleIPs | Select-Object -First 1
        Write-Verbose "First available IP address found: $availableIP"
        return $availableIP
    }
    catch {
        Write-Error "Failed to find available IP address. Error: $_"
        throw
    }
}

function Add-DnsHostRecord {
    <#
    .SYNOPSIS
        Adds a new DNS 'A' record to the specified zone
        
    .DESCRIPTION
        This function creates a new host record using secure, certificate-based WinRM communication.
        
    .PARAMETER HostName
        The hostname for the new record
        
    .PARAMETER IPAddress
        The IP address to associate with the hostname
        
    .PARAMETER DnsZoneName
        The DNS zone name
        
    .EXAMPLE
        Add-DnsHostRecord -HostName "newserver" -IPAddress "172.18.254.100" -DnsZoneName "pedantictheory.com"
        
    .NOTES
        Requires module to be properly initialized
    #>
    
    param(
        [Parameter(Mandatory = $true)]
        [string]$HostName,

        [Parameter(Mandatory = $true)]
        [string]$IPAddress,

        [Parameter(Mandatory = $true)]
        [string]$DnsZoneName
    )
    
    if (-not $script:ModuleConfig -or -not $script:ClientCertificate) {
        throw "Module not properly initialized. Please run Import-WinRMDnsConfig and Initialize-WinRMDnsCertificates first."
    }
    
    Write-Verbose "Adding DNS 'A' record for '$HostName' with IP '$IPAddress' in zone '$DnsZoneName'."
    
    try {
        $ttlHours = $script:ModuleConfig.dns_management.default_ttl_hours
        $ttl = New-TimeSpan -Hours $ttlHours
        
        Invoke-Command -ComputerName $script:TargetHost -CertificateThumbprint $script:ClientCertificate.Thumbprint -ScriptBlock {
            param($Zone, $Name, $IP, $TTL)
            Add-DnsServerResourceRecordA -ZoneName $Zone -Name $Name -IPv4Address $IP -TimeToLive $TTL
        } -ArgumentList $DnsZoneName, $HostName, $IPAddress, $ttl
        
        Write-Host "Successfully added DNS record for '$HostName.$DnsZoneName'." -ForegroundColor Green
        return $true
    }
    catch {
        Write-Error "Failed to add DNS record. Error: $_"
        throw
    }
}

function Remove-DnsHostRecord {
    <#
    .SYNOPSIS
        Removes an existing DNS 'A' record from the specified zone
        
    .DESCRIPTION
        This function removes a host record using secure, certificate-based WinRM communication.
        
    .PARAMETER HostName
        The hostname to remove
        
    .PARAMETER DnsZoneName
        The DNS zone name
        
    .EXAMPLE
        Remove-DnsHostRecord -HostName "oldserver" -DnsZoneName "pedantictheory.com"
        
    .NOTES
        Requires module to be properly initialized
    #>
    
    param(
        [Parameter(Mandatory = $true)]
        [string]$HostName,

        [Parameter(Mandatory = $true)]
        [string]$DnsZoneName
    )
    
    if (-not $script:ModuleConfig -or -not $script:ClientCertificate) {
        throw "Module not properly initialized. Please run Import-WinRMDnsConfig and Initialize-WinRMDnsCertificates first."
    }
    
    Write-Verbose "Removing DNS 'A' record for '$HostName' from zone '$DnsZoneName'."
    
    try {
        Invoke-Command -ComputerName $script:TargetHost -CertificateThumbprint $script:ClientCertificate.Thumbprint -ScriptBlock {
            param($Zone, $Name)
            Remove-DnsServerResourceRecord -ZoneName $Zone -Name $Name -RRType A -Force
        } -ArgumentList $DnsZoneName, $HostName
        
        Write-Host "Successfully removed DNS record for '$HostName.$DnsZoneName'." -ForegroundColor Green
        return $true
    }
    catch {
        Write-Error "Failed to remove DNS record. Error: $_"
        throw
    }
}

function Get-DnsRecords {
    <#
    .SYNOPSIS
        Retrieves DNS records from the specified zone
        
    .DESCRIPTION
        Gets all DNS records of a specified type from the target zone using secure WinRM communication.
        
    .PARAMETER DnsZoneName
        The DNS zone name to query
        
    .PARAMETER RecordType
        The type of DNS records to retrieve (default: A)
        
    .EXAMPLE
        Get-DnsRecords -DnsZoneName "pedantictheory.com" -RecordType "A"
        
    .NOTES
        Requires module to be properly initialized
    #>
    
    param(
        [Parameter(Mandatory = $true)]
        [string]$DnsZoneName,

        [Parameter(Mandatory = $false)]
        [string]$RecordType = "A"
    )
    
    if (-not $script:ModuleConfig -or -not $script:ClientCertificate) {
        throw "Module not properly initialized. Please run Import-WinRMDnsConfig and Initialize-WinRMDnsCertificates first."
    }
    
    try {
        Write-Verbose "Retrieving DNS '$RecordType' records from zone '$DnsZoneName'."
        
        $records = Invoke-Command -ComputerName $script:TargetHost -CertificateThumbprint $script:ClientCertificate.Thumbprint -ScriptBlock {
            param($Zone, $Type)
            Get-DnsServerResourceRecord -ZoneName $Zone -RRType $Type
        } -ArgumentList $DnsZoneName, $RecordType
        
        Write-Host "Retrieved $($records.Count) DNS records from zone '$DnsZoneName'." -ForegroundColor Green
        return $records
    }
    catch {
        Write-Error "Failed to retrieve DNS records. Error: $_"
        throw
    }
}

function Test-DnsRecord {
    <#
    .SYNOPSIS
        Tests if a DNS record exists and resolves correctly
        
    .DESCRIPTION
        Verifies the existence and resolution of a DNS record using the target DNS server.
        
    .PARAMETER HostName
        The hostname to test
        
    .PARAMETER DnsZoneName
        The DNS zone name
        
    .EXAMPLE
        Test-DnsRecord -HostName "testserver" -DnsZoneName "pedantictheory.com"
        
    .NOTES
        Requires module to be properly initialized
    #>
    
    param(
        [Parameter(Mandatory = $true)]
        [string]$HostName,

        [Parameter(Mandatory = $true)]
        [string]$DnsZoneName
    )
    
    if (-not $script:ModuleConfig -or -not $script:ClientCertificate) {
        throw "Module not properly initialized. Please run Import-WinRMDnsConfig and Initialize-WinRMDnsCertificates first."
    }
    
    try {
        Write-Verbose "Testing DNS record for '$HostName.$DnsZoneName'."
        
        $result = Invoke-Command -ComputerName $script:TargetHost -CertificateThumbprint $script:ClientCertificate.Thumbprint -ScriptBlock {
            param($Zone, $Name)
            Resolve-DnsName -Name "$Name.$Zone" -Server "127.0.0.1" -ErrorAction SilentlyContinue
        } -ArgumentList $DnsZoneName, $HostName
        
        if ($result) {
            Write-Host "DNS record '$HostName.$DnsZoneName' resolves to '$($result.IPAddress)'." -ForegroundColor Green
            return @{
                Exists = $true
                IPAddress = $result.IPAddress
                RecordType = $result.Type
            }
        }
        else {
            Write-Host "DNS record '$HostName.$DnsZoneName' does not exist." -ForegroundColor Yellow
            return @{
                Exists = $false
                IPAddress = $null
                RecordType = $null
            }
        }
    }
    catch {
        Write-Error "Failed to test DNS record. Error: $_"
        throw
    }
}

# Export functions
Export-ModuleMember -Function @(
    'Import-WinRMDnsConfig',
    'Initialize-WinRMDnsCertificates',
    'Test-WinRMConnectivity',
    'Find-AvailableDnsIPAddress',
    'Add-DnsHostRecord',
    'Remove-DnsHostRecord',
    'Get-DnsRecords',
    'Test-DnsRecord'
)
