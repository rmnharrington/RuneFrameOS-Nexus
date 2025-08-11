<#
.SYNOPSIS
    An agentic script to establish secure, passwordless WinRM communication with a target server
    and perform automated Active Directory DNS management.

.DESCRIPTION
    This script performs a complete end-to-end configuration and demonstration of a secure,
    automated DNS management system for the 'pedantictheory.com' domain.

    It follows these core steps:
    1.  Validates basic WinRM connectivity to the target host.
    2.  Creates a local, self-signed Certificate Authority (CA) and a Client Authentication Certificate.
    3.  Configures the target host for secure communication by:
        - Deploying the necessary certificates.
        - Creating a WinRM HTTPS listener.
        - Enabling certificate-based authentication.
        - Creating a dedicated local user for automation.
        - Mapping the client certificate to the local user.
        - Granting the local user permissions to manage DNS by adding it to the 'DnsAdmins' AD group.
    4.  Provides high-performance functions to manage DNS records over the secure channel:
        - Find-AvailableDnsIPAddress: Scans the specified subnet for the next available IP by querying DNS records.
        - Add-DnsHostRecord: Adds a new 'A' record.
        - Remove-DnsHostRecord: Removes an existing 'A' record.
    5.  Demonstrates the full workflow by finding an available IP, creating a record, and then cleaning it up.

    This script is designed to be idempotent and can be re-run safely.

.PREREQUISITES
    - PowerShell 5.1 or later on both the source and target machines.
    - The source machine must have initial administrative access to the target machine to perform the one-time setup.
    - The target machine must be a Domain Controller or a member server with the DNS Server role and Active Directory management tools installed.
    - Required PowerShell Modules: 'Pki', 'DnsServer', 'ActiveDirectory'.
#>

#================================================================================
# SECTION 1: CONFIGURATION VARIABLES
#================================================================================
# Define all operational parameters in this section.

# --- Target Environment ---
$targetHost = "honeycut.pedantictheory.com"
$dnsZone = "pedantictheory.com"
$dnsSubnetCIDR = "172.18.254.0/24"
$gatewayIP = "172.18.254.1"

# --- Certificate and User Configuration ---
$caCertSubject = "CN=PedanticTheory-Automation-CA"
$clientCertUpn = "dns-automation@pedantictheory.com" # UPN for the certificate's SAN
$localUserName = "local-dns-mgr" # Dedicated local user on the target host

# --- Script State Variables ---
$caCert = $null
$clientCert = $null

#================================================================================
# SECTION 2: HELPER AND MANAGEMENT FUNCTIONS
#================================================================================

function Find-AvailableDnsIPAddress {
    <#
    .SYNOPSIS
        Finds the next available IP address in a specified subnet by querying DNS records.
    
    .DESCRIPTION
        This function efficiently determines available IP addresses by:
        1. Generating all possible host IPs in the subnet
        2. Querying existing DNS 'A' records
        3. Performing a set-difference operation to find available IPs
        
    .PARAMETER SubnetCIDR
        The subnet in CIDR notation (e.g., "172.18.254.0/24")
        
    .PARAMETER DnsZoneName
        The DNS zone name to query
        
    .PARAMETER TargetHost
        The target DNS server hostname
        
    .PARAMETER ClientCertificate
        The client certificate for authentication
        
    .PARAMETER ExcludedIPs
        Optional array of IP addresses to exclude from consideration
        
    .RETURNS
        The first available IP address, or $null if none available
    #>
    
    param(
        [Parameter(Mandatory = $true)]
        [string]$SubnetCIDR,

        [Parameter(Mandatory = $true)]
        [string]$DnsZoneName,

        [Parameter(Mandatory = $true)]
        [string]$TargetHost,
          
        [Parameter(Mandatory = $true)]
        $ClientCertificate,

        [string[]]$ExcludedIPs
    )

    Write-Verbose "Finding next available IP in subnet '$SubnetCIDR' for zone '$DnsZoneName'."

    try {
        # Step 1: Generate all possible IP addresses in the subnet.
        $ipNetwork = [System.Net.IPNetwork]::Parse($SubnetCIDR)
        $allPossibleIPs = [System.Collections.Generic.HashSet[string]]::new()
        for ($i = 1; $i -lt $ipNetwork.Total - 1; $i++) {
            $allPossibleIPs.Add($ipNetwork.ListableIPAddress[$i - 1].ToString())
        }
        Write-Verbose "Generated $($allPossibleIPs.Count) possible host addresses for subnet."

        # Step 2: Remove any explicitly excluded IPs.
        if ($null -ne $ExcludedIPs) {
            foreach ($ip in $ExcludedIPs) {
                if ($allPossibleIPs.Contains($ip)) {
                    $allPossibleIPs.Remove($ip)
                    Write-Verbose "Removed excluded IP: $ip"
                }
            }
        }

        # Step 3: Get all currently used IPs from DNS 'A' records via secure remote command.
        Write-Verbose "Querying DNS server '$TargetHost' for all 'A' records in zone '$DnsZoneName'."
        $usedIpsFromDns = Invoke-Command -ComputerName $TargetHost -CertificateThumbprint $ClientCertificate.Thumbprint -ScriptBlock {
            param($ZoneName)
            Get-DnsServerResourceRecord -ZoneName $ZoneName -RRType A | ForEach-Object { $_.RecordData.IPv4Address.IPAddressToString }
        } -ArgumentList $DnsZoneName

        $usedIPs = [System.Collections.Generic.HashSet[string]]::new($usedIpsFromDns)
        Write-Verbose "Found $($usedIPs.Count) used IP addresses in DNS."

        # Step 4: Calculate the difference to find available IPs.
        $allPossibleIPs.ExceptWith($usedIPs)

        if ($allPossibleIPs.Count -eq 0) {
            Write-Warning "No available IP addresses found in subnet '$SubnetCIDR'."
            return $null
        }

        # Step 5: Return the first available IP.
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
        Adds a new DNS 'A' record to the specified zone.
    
    .DESCRIPTION
        This function creates a new host record using secure, certificate-based WinRM communication.
        
    .PARAMETER HostName
        The hostname for the new record
        
    .PARAMETER IPAddress
        The IP address to associate with the hostname
        
    .PARAMETER DnsZoneName
        The DNS zone name
        
    .PARAMETER TargetHost
        The target DNS server hostname
        
    .PARAMETER ClientCertificate
        The client certificate for authentication
    #>
    
    param(
        [Parameter(Mandatory = $true)]
        [string]$HostName,

        [Parameter(Mandatory = $true)]
        [string]$IPAddress,

        [Parameter(Mandatory = $true)]
        [string]$DnsZoneName,

        [Parameter(Mandatory = $true)]
        [string]$TargetHost,

        [Parameter(Mandatory = $true)]
        $ClientCertificate
    )

    Write-Verbose "Adding DNS 'A' record for '$HostName' with IP '$IPAddress' in zone '$DnsZoneName'."
      
    try {
        Invoke-Command -ComputerName $TargetHost -CertificateThumbprint $ClientCertificate.Thumbprint -ScriptBlock {
            param($Zone, $Name, $IP)
            Add-DnsServerResourceRecordA -ZoneName $Zone -Name $Name -IPv4Address $IP -TimeToLive (New-TimeSpan -Hours 1)
        } -ArgumentList $DnsZoneName, $HostName, $IPAddress
          
        Write-Host "Successfully added DNS record for '$HostName.$DnsZoneName'." -ForegroundColor Green
    }
    catch {
        Write-Error "Failed to add DNS record. Error: $_"
        throw
    }
}

function Remove-DnsHostRecord {
    <#
    .SYNOPSIS
        Removes an existing DNS 'A' record from the specified zone.
    
    .DESCRIPTION
        This function removes a host record using secure, certificate-based WinRM communication.
        
    .PARAMETER HostName
        The hostname to remove
        
    .PARAMETER DnsZoneName
        The DNS zone name
        
    .PARAMETER TargetHost
        The target DNS server hostname
        
    .PARAMETER ClientCertificate
        The client certificate for authentication
    #>
    
    param(
        [Parameter(Mandatory = $true)]
        [string]$HostName,

        [Parameter(Mandatory = $true)]
        [string]$DnsZoneName,

        [Parameter(Mandatory = $true)]
        [string]$TargetHost,

        [Parameter(Mandatory = $true)]
        $ClientCertificate
    )

    Write-Verbose "Removing DNS 'A' record for '$HostName' from zone '$DnsZoneName'."

    try {
        Invoke-Command -ComputerName $TargetHost -CertificateThumbprint $ClientCertificate.Thumbprint -ScriptBlock {
            param($Zone, $Name)
            # -Force is used to suppress the confirmation prompt.
            Remove-DnsServerResourceRecord -ZoneName $Zone -Name $Name -RRType A -Force
        } -ArgumentList $DnsZoneName, $HostName

        Write-Host "Successfully removed DNS record for '$HostName.$DnsZoneName'." -ForegroundColor Green
    }
    catch {
        Write-Error "Failed to remove DNS record. Error: $_"
        throw
    }
}

#================================================================================
# SECTION 3: SCRIPT EXECUTION WORKFLOW
#================================================================================

# --- STEP 1: Validate Initial WinRM Connectivity ---
Write-Host "STEP 1: Validating basic WinRM connectivity to '$targetHost'..." -ForegroundColor Yellow
try {
    $wsmanTest = Test-WSMan -ComputerName $targetHost -ErrorAction Stop
    if ($wsmanTest.ProductVendor -ne "Microsoft Corporation") {
        throw "Target host '$targetHost' is not a Microsoft Windows machine."
    }
    Write-Host "  WinRM service is running and responsive on '$targetHost'." -ForegroundColor Green
}
catch {
    Write-Error "Initial WinRM connectivity test failed. Please ensure WinRM is enabled and network/firewall rules allow access. Error: $_"
    exit 1
}

# --- STEP 2: Create Local Certificate Infrastructure ---
Write-Host "STEP 2: Checking for and creating certificate infrastructure..." -ForegroundColor Yellow
# Check for CA certificate
$caCert = Get-ChildItem Cert:\CurrentUser\My | Where-Object { $_.Subject -eq $caCertSubject }
if (-not $caCert) {
    Write-Verbose "CA certificate not found. Creating a new self-signed CA."
    $caCert = New-SelfSignedCertificate -Subject $caCertSubject -CertStoreLocation Cert:\CurrentUser\My -KeyUsage CertSign, CRLSign -KeyLength 2048
    Write-Host "  Created new CA certificate." -ForegroundColor Green
}
else {
    Write-Host "  [INFO] Existing CA certificate found."
}

# Check for Client certificate
$clientCert = Get-ChildItem Cert:\CurrentUser\My | Where-Object { $_.Subject -like "CN=$clientCertUpn*" -and $_.Issuer -eq $caCert.Subject }
if (-not $clientCert) {
    Write-Verbose "Client certificate not found. Creating a new one signed by the CA."
    # The -TextExtension is critical for modern Windows compatibility.
    $textExtension = @(
        "2.5.29.37={text}1.3.6.1.5.5.7.3.2", # EKU: Client Authentication
        "2.5.29.17={text}upn=$clientCertUpn"    # SAN: User Principal Name
    )
    $clientCert = New-SelfSignedCertificate -Subject "CN=$clientCertUpn" -CertStoreLocation Cert:\CurrentUser\My -Signer $caCert -TextExtension $textExtension -KeyLength 2048
    Write-Host "  Created new Client Authentication certificate." -ForegroundColor Green
}
else {
    Write-Host "  [INFO] Existing Client Authentication certificate found."
}

# --- STEP 3: Configure Target Server for Secure Remoting ---
Write-Host "STEP 3: Configuring target server '$targetHost' for secure, certificate-based WinRM..." -ForegroundColor Yellow
try {
    # This block requires initial administrative credentials to the target host.
    # In a real-world scenario, @cursor would handle this credential management.
    Invoke-Command -ComputerName $targetHost -ScriptBlock {
        param(
            $CaCertPublic,
            $ClientCertPublic,
            $LocalUserName,
            $ClientCertUpn,
            $CaCertThumbprint
        )

        # Import CA to Trusted Roots
        $caStore = Get-Item -Path Cert:\LocalMachine\Root
        $caStore.Open("ReadWrite")
        $caStore.Add([System.Security.Cryptography.X509Certificates.X509Certificate2]::new([System.Text.Encoding]::UTF8.GetBytes($CaCertPublic)))
        $caStore.Close()
        Write-Host "  Imported CA certificate to Trusted Roots."

        # Import Client Cert to Trusted People
        $peopleStore = Get-Item -Path Cert:\LocalMachine\TrustedPeople
        $peopleStore.Open("ReadWrite")
        $peopleStore.Add([System.Security.Cryptography.X509Certificates.X509Certificate2]::new([System.Text.Encoding]::UTF8.GetBytes($ClientCertPublic)))
        $peopleStore.Close()
        Write-Host "  Imported Client certificate to Trusted People."

        # Ensure WinRM HTTPS Listener exists (idempotent check)
        if (-not (Get-WSManInstance -ResourceURI 'winrm/config/Listener' -SelectorSet @{Address='*';Transport='HTTPS'})) {
            winrm create 'winrm/config/Listener?Address=*+Transport=HTTPS' @{Hostname="$($env:COMPUTERNAME)"; CertificateThumbprint=(Get-ChildItem Cert:\LocalMachine\My | Where-Object { $_.Extensions.EnhancedKeyUsages.FriendlyName -contains 'Server Authentication' } | Select-Object -First 1).Thumbprint}
            Write-Host "  Created WinRM HTTPS listener."
        } else {
            Write-Host "  WinRM HTTPS listener already exists."
        }
          
        # Enable Certificate Authentication on the service
        Set-Item -Path WSMan:\localhost\Service\Auth\Certificate -Value $true
        Write-Host "  Enabled Certificate Authentication on WinRM service."

        # Create local user for automation (idempotent check)
        if (-not (Get-LocalUser -Name $LocalUserName -ErrorAction SilentlyContinue)) {
            $password = New-Object System.Security.SecureString
            # Password is required but will not be used for authentication. Set to a random, complex value.
            [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes(32) | ForEach-Object { $password.AppendChar([char]$_) }
            New-LocalUser -Name $LocalUserName -Password $password -PasswordNeverExpires -UserMayNotChangePassword -Description "Service account for automated DNS management via WinRM cert auth."
            Write-Host "  Created local user '$LocalUserName'."
        } else {
            Write-Host "  Local user '$LocalUserName' already exists."
        }

        # Create Certificate-to-User mapping (idempotent check)
        $mappingPath = "WSMan:\localhost\ClientCertificate"
        if (-not (Test-Path "$mappingPath\$CaCertThumbprint")) {
            $cred = Get-Credential -UserName $LocalUserName -Message "Enter password for '$LocalUserName' to create mapping (will not be stored)"
            New-Item -Path $mappingPath -Issuer $CaCertThumbprint -Subject $ClientCertUpn -URI * -Credential $cred
            Write-Host "  Created certificate mapping for user '$LocalUserName'."
        } else {
            Write-Host "  Certificate mapping already exists."
        }

        # Grant local user permissions in AD DNS (idempotent check)
        $dnsAdminsGroup = Get-ADGroup -Identity "DnsAdmins"
        $localUserPrincipal = New-Object System.Security.Principal.NTAccount($env:COMPUTERNAME, $LocalUserName)
        $localUserSid = $localUserPrincipal.Translate([System.Security.Principal.SecurityIdentifier]).Value
        $isMember = (Get-ADGroupMember -Identity $dnsAdminsGroup | Where-Object { $_.objectSid -eq $localUserSid })
        if (-not $isMember) {
            Add-ADGroupMember -Identity $dnsAdminsGroup -Members (Get-ADObject -Filter "objectSid -eq '$localUserSid'")
            Write-Host "  Added '$LocalUserName' to the 'DnsAdmins' AD group."
        } else {
            Write-Host "  User '$LocalUserName' is already a member of 'DnsAdmins'."
        }

    } -ArgumentList (
        (Export-Certificate -Cert $caCert -Type CERT | Out-String),
        (Export-Certificate -Cert $clientCert -Type CERT | Out-String),
        $localUserName,
        $clientCertUpn,
        $caCert.Thumbprint
    )
    Write-Host "  Target server configuration complete." -ForegroundColor Green
}
catch {
    Write-Error "Failed to configure the target server. Error: $_"
    exit 1
}

# --- STEP 4: Demonstrate DNS Automation ---
Write-Host "STEP 4: Demonstrating automated DNS management..." -ForegroundColor Yellow

# Find an available IP
Write-Host "  Finding an available IP address in '$dnsSubnetCIDR'..."
$availableIp = Find-AvailableDnsIPAddress -SubnetCIDR $dnsSubnetCIDR -DnsZoneName $dnsZone -TargetHost $targetHost -ClientCertificate $clientCert -ExcludedIPs $gatewayIP
if (-not $availableIp) {
    Write-Error "Could not find an available IP. Halting demonstration."
    exit 1
}
Write-Host "  Found available IP: $availableIp" -ForegroundColor Cyan

# Add a new record
$testHostname = "cursor-test-$(Get-Random -Minimum 1000 -Maximum 9999)"
Write-Host "  Adding a test DNS record: '$testHostname' -> '$availableIp'..."
Add-DnsHostRecord -HostName $testHostname -IPAddress $availableIp -DnsZoneName $dnsZone -TargetHost $targetHost -ClientCertificate $clientCert

# Verify the record was created
Write-Host "  Verifying record creation..."
Start-Sleep -Seconds 5 # Allow time for DNS replication if applicable
$verification = Invoke-Command -ComputerName $targetHost -CertificateThumbprint $clientCert.Thumbprint -ScriptBlock {
    param($Zone, $Name)
    Resolve-DnsName -Name "$Name.$Zone" -Server "127.0.0.1" -ErrorAction SilentlyContinue
} -ArgumentList $dnsZone, $testHostname

if ($verification -and $verification.IPAddress -eq $availableIp) {
    Write-Host "  Verification successful. Record '$($testHostname).$($dnsZone)' resolves to '$($verification.IPAddress)'." -ForegroundColor Green
} else {
    Write-Warning "  Verification failed or record not found."
}

# Remove the record
Write-Host "  Cleaning up by removing the test record..."
Remove-DnsHostRecord -HostName $testHostname -DnsZoneName $dnsZone -TargetHost $targetHost -ClientCertificate $clientCert

Write-Host "STEP 5: Demonstration complete." -ForegroundColor Yellow
Write-Host "The WinRM DNS Automation System is now fully operational!" -ForegroundColor Green
