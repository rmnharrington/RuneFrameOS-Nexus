

# **Agentic Prompt for Secure, Passwordless DNS Automation in Active Directory**

## **Section 1: Foundational Principles and Connectivity Verification**

The initial phase of any robust automation workflow involves establishing a verified baseline. Before any configuration changes are attempted, it is imperative to confirm that the target system is reachable and correctly configured for basic remote management. This preliminary step prevents cascading failures and ensures that the script operates on a known-good foundation.

### **1.1 The Importance of Idempotent Verification in Automation**

A core principle of modern infrastructure automation is idempotency—the property of an operation that allows it to be applied multiple times without changing the result beyond the initial application. In practice, this means an automation script should not blindly execute configuration commands. Instead, it must first query the state of the target system. If the desired configuration is already in place, the script should report success and exit gracefully. This approach makes scripts safe to re-run, resilient to interruptions, and predictable in their behavior.

The first gate in this workflow is validating connectivity to the target host, honeycut.pedantictheory.com. A simple network ping is insufficient as it only confirms ICMP reachability and provides no information about the state of the required management services.1 The Windows Remote Management (WinRM) service is the foundation for all subsequent operations; therefore, verifying its status is the mandatory first action. If this initial connection fails, all subsequent steps are guaranteed to fail, making a hard stop with a clear, actionable error message a critical feature of a professional-grade script.2

### **1.2 Key PowerShell Modules and Cmdlets**

The automation sequence described herein leverages several core PowerShell modules to interact with the Windows operating system, its security features, and Active Directory services. A clear understanding of these components is essential for both implementation and troubleshooting.

| Cmdlet | Module | Purpose |
| :---- | :---- | :---- |
| Test-WSMan | Microsoft.WsMan.Management | Verifies that the WinRM service is running and responsive on a local or remote computer.3 |
| New-SelfSignedCertificate | Pki | Creates self-signed X.509 certificates, essential for establishing the local Certificate Authority (CA) and the client certificate for authentication.4 |
| Export-Certificate | Pki | Exports a certificate's public key to a file, allowing it to be transferred to the target server for trust establishment.4 |
| Set-Item | Microsoft.PowerShell.Management | A versatile cmdlet used here to modify WinRM configuration settings within the WSMan: provider, such as enabling certificate authentication.5 |
| New-Item | Microsoft.PowerShell.Management | Used within the WSMan: provider to create new configuration entries, specifically the crucial mapping between a client certificate and a local user account.6 |
| Get-DnsServerResourceRecord | DnsServer | Retrieves resource records from a specified DNS zone, forming the basis of the IP availability check.7 |
| Add-DnsServerResourceRecordA | DnsServer | Adds a new IPv4 host (A) record to a DNS zone, enabling the automated creation of new DNS entries.7 |
| Remove-DnsServerResourceRecord | DnsServer | Removes a resource record from a DNS zone, facilitating the automated cleanup of DNS entries.7 |
| Invoke-Command | Microsoft.PowerShell.Core | Executes commands on remote computers, serving as the secure transport for all DNS management operations.11 |

### **1.3 Prompt Segment: Validating WinRM on honeycut.pedantictheory.com**

The first operational segment of the prompt will be dedicated to a robust test of the WinRM service on the target host. This is more than a simple connectivity check; it is a validation of the service's identity. The Test-WSMan cmdlet returns a rich XML object containing details about the remote service.3 A reliable script will parse this object to confirm not only that the service is running but also that it is the expected Microsoft implementation. This adds a layer of validation against potential machine-in-the-middle or misconfiguration scenarios.

The code will be structured within a try/catch block. A successful connection will parse the returned object to verify that the ProductVendor is "Microsoft Corporation" and will output a confirmation message. A failure will trigger the catch block, which will terminate the script and output the specific exception details, providing the operator with the necessary information to diagnose the root cause, whether it be a firewall blockage, a stopped service, or a network routing issue.1

## **Section 2: Architecting a Zero-Trust, Passwordless Communication Channel**

The central requirement of the user query is to establish a method of communication that is both "passwordless" and "secure." In the context of Windows remote management, this necessitates moving beyond traditional credential-based authentication to a model based on cryptographic identity. This section details the architectural decisions and implementation steps required to build this zero-trust channel using certificate-based authentication over an encrypted HTTPS transport.

### **2.1 Authentication Deep Dive: A Comparative Analysis of WinRM Security**

WinRM supports several authentication mechanisms, each with distinct security characteristics and use cases. The choice of mechanism is the single most important security decision in the entire workflow.12

* **Kerberos:** This is the default and most secure protocol for interactive sessions within an Active Directory domain. It provides mutual authentication (client and server verify each other's identity) and does not transmit passwords or password-equivalent credentials across the network. However, it is not ideal for non-interactive, automated scripts where a machine needs to act on its own behalf without a logged-on user's Kerberos ticket. Furthermore, Kerberos is susceptible to the "second hop problem," where credentials for the initial connection cannot be delegated to a subsequent connection (e.g., from the target server to a file share).12  
* **NTLM:** A challenge-response protocol used as a fallback when Kerberos is not available, such as in workgroup environments or when connecting via IP address. While it does not transmit the password directly, NTLM is considered weaker than Kerberos and does not, by default, provide server identity verification, making it vulnerable to certain attacks.12  
* **CredSSP (Credential Security Support Provider):** This mechanism was designed to solve the second-hop problem by explicitly delegating the user's credentials to the remote machine. While functional, this is widely considered a significant security risk for automated systems. It requires enabling credential delegation on both the client and server, and if the remote server is compromised, the attacker can capture and reuse the delegated credentials to move laterally through the network.13 It directly contradicts the "passwordless" requirement by design.  
* **Certificate-Based Authentication:** This method authenticates the client using an X.509 certificate instead of a username and password. The client proves its identity by demonstrating possession of the private key corresponding to the certificate's public key. This provides strong, non-reputable cryptographic identity and is the industry best practice for secure, automated, machine-to-machine communication. It is inherently passwordless and, when used over an HTTPS transport, ensures both authentication and end-to-end data encryption.4

| Mechanism | Security Level | Second Hop Handling | Primary Use Case | Configuration Complexity |
| :---- | :---- | :---- | :---- | :---- |
| **Kerberos** | Very High | Not Supported (by default) | Interactive, domain-joined user sessions | Low (automatic in-domain) |
| **NTLM** | Medium | Not Supported | Workgroup or IP-based connections | Medium (requires TrustedHosts or SSL) |
| **CredSSP** | Low | Supported (Insecurely) | Scenarios requiring credential delegation | High (requires GPO changes) |
| **Certificate** | Very High | N/A (Identity-based) | Secure, passwordless machine-to-machine automation | High (requires PKI setup) |

Given the requirements, certificate-based authentication is the only appropriate choice. It provides the highest level of security, is truly passwordless, and is designed for the exact type of automated, non-interactive management scenario requested.

### **2.2 The Core of Passwordless Security: Certificate-Based Authentication**

The workflow for certificate-based authentication involves several distinct stages. First, the client and server must establish a trusted cryptographic relationship. This is achieved by ensuring the server trusts the Certificate Authority (CA) that issued the client's certificate. Second, the server must be configured to listen for connections over HTTPS, as certificate authentication is only supported over an encrypted transport.4 Finally, the server must be configured with a specific rule that maps the incoming client certificate to a local user account, which will define the security context for the remote session.4

### **2.3 Prompt Segment: Building the Certificate Infrastructure**

For a self-contained automation script, establishing a full enterprise Public Key Infrastructure (PKI) is out of scope. Therefore, the prompt will instruct the agent to create a miniature, self-signed PKI for this specific purpose. This involves creating a local root CA certificate and then using that CA to sign a client authentication certificate.

The construction of the client certificate is a point of critical technical detail. Modern Windows operating systems (Windows 10/Server 2016 and newer) enforce strict requirements on certificates used for WinRM authentication. Failure to meet these requirements results in a specific and often confusing error message.4 The certificate

**must** include:

1. An **Extended Key Usage (EKU)** OID of 1.3.6.1.5.5.7.3.2, which signifies "Client Authentication."  
2. A **Subject Alternative Name (SAN)** extension that contains the **User Principal Name (UPN)** of the account to which the certificate will be mapped.

The prompt will use the New-SelfSignedCertificate cmdlet with the \-TextExtension parameter to precisely embed these required OIDs into the certificate structure, ensuring its validity for WinRM authentication on any modern Windows platform.

### **2.4 Prompt Segment: Target Server Hardening and Listener Configuration**

This segment of the prompt focuses on preparing the target server, honeycut.pedantictheory.com, to accept secure, certificate-based connections. It assumes initial administrative access is available to perform this one-time setup.

The process involves several steps executed remotely on the target:

1. **Certificate Deployment:** The public keys of the newly created CA and the client certificate are transferred to the target server. The CA certificate is installed into the LocalMachine\\Root (Trusted Root Certification Authorities) store to establish trust. The client certificate is installed into the LocalMachine\\TrustedPeople store, which makes it available for user mapping.4  
2. **HTTPS Listener Creation:** An HTTPS listener for WinRM is created. This requires a *Server Authentication* certificate to be present on the server with a Common Name (CN) or SAN that matches the server's hostname (honeycut.pedantictheory.com). The script will generate a suitable self-signed certificate for this purpose and then use its thumbprint to create the listener on the standard HTTPS port 5986\.17 The command  
   winrm create winrm/config/Listener?Address=\*+Transport=HTTPS @{Hostname="honeycut.pedantictheory.com";CertificateThumbprint="..."} will be used.  
3. **Enable Certificate Authentication:** By default, the WinRM service does not accept certificate-based authentication. This must be explicitly enabled using the command Set-Item \-Path WSMan:\\localhost\\Service\\Auth\\Certificate \-Value $true.4

### **2.5 Prompt Segment: The User-Mapping Bridge \- The Critical Link**

This subsection addresses the most nuanced and architecturally significant aspect of the entire solution. A recurring and critical point across multiple technical sources is that WinRM certificate authentication can only be mapped to a **local user account** on the target machine; it cannot be mapped directly to an Active Directory domain account.5

This constraint presents a challenge: the ultimate goal is to manage Active Directory DNS records, an operation that requires domain-level permissions. However, the secure transport mechanism forces the remote session into the context of a local user, who, by default, has no such permissions.

The solution is to create an explicit security bridge. The automation must create a dedicated local user on the target server and then grant that specific local user the necessary permissions within the Active Directory domain.

1. **Local User Creation and Mapping:** The prompt will direct the agent to create a new, dedicated, least-privilege local user on honeycut.pedantictheory.com, for example, local-dns-mgr. Subsequently, it will create the certificate-to-user mapping. This is done using the New-Item cmdlet within the WSMan: provider. The command maps the client certificate's Issuer (the thumbprint of our self-signed CA) and its Subject (the UPN embedded in the SAN) to the local-dns-mgr user account.6 When a client authenticates with that certificate, WinRM will automatically place the session into the security context of the  
   local-dns-mgr user.  
2. **Granting Domain Permissions:** To complete the bridge, the local-dns-mgr user needs rights to modify DNS. The prompt will include a command, executed on the target server, to add this local user (honeycut\\local-dns-mgr) as a member of the Active Directory built-in DnsAdmins group for the pedantictheory.com domain. The Add-ADGroupMember cmdlet is used for this purpose.21 Membership in this group grants the necessary permissions to add, remove, and query DNS records within the domain's AD-integrated zones. This step effectively elevates the purpose-built local account, allowing it to perform its designated domain function through the secure, passwordless channel.

## **Section 3: Intelligent DNS and IP Address Automation**

With the secure communication channel established, the focus shifts to the primary operational task: automated management of DNS 'A' records. This requires a robust method for discovering available IP addresses that adheres to the user's constraint of avoiding network-level discovery tools like ping.

### **3.1 The Logic of DNS-Based IP Address Management (IPAM)**

The specified methodology treats the Active Directory DNS zone as the definitive source of truth for IP address allocation. This is a common pattern in automated environments, where infrastructure state is managed declaratively rather than discovered dynamically. An IP address is considered "available" if and only if it does not have a corresponding 'A' record in the specified DNS zone.

A naive approach to implementing this logic would be to iterate through every possible host address in the 172.18.254.0/24 subnet (from .2 to .254) and execute a remote DNS query for each one. This would result in over 250 separate network round-trips, making the process slow and inefficient.

A far more performant and scalable architecture involves minimizing remote operations. The optimal strategy is to:

1. Generate the complete set of all possible IP addresses for the subnet in local memory.  
2. Execute a single remote command to retrieve *all* existing 'A' records from the DNS zone.  
3. Perform a set-difference operation in local memory to identify the addresses that exist in the "possible" set but not in the "used" set.

This approach reduces network latency to a single query and leverages the high speed of in-memory data manipulation, making it suitable for much larger subnets without a significant performance penalty. Using PowerShell's HashSet data type for the sets and its .ExceptWith() method for the difference operation is orders of magnitude faster than filtering arrays with Where-Object.

### **3.2 Prompt Segment: The IP Availability Scanner Function**

The prompt will define a complete, reusable PowerShell function named Find-AvailableDnsIPAddress. This function will encapsulate the high-performance logic described above.

**Function Logic:**

1. **Parameterization:** The function will accept parameters such as \-SubnetCIDR, \-DnsZoneName, and \-ExcludedIPs.  
2. **IP Set Generation:** It will programmatically generate a HashSet\[string\] containing all valid host IP addresses within the given CIDR block. Logic for this can be adapted from established PowerShell IP manipulation scripts.22  
3. **Exclusion Handling:** It will remove the gateway (172.18.254.1) and any other user-specified exclusions from the set of possible IPs.  
4. **Remote DNS Query:** It will use Invoke-Command with the established certificate authentication to execute Get-DnsServerResourceRecord \-ZoneName "pedantictheory.com" \-RRType A on honeycut.pedantictheory.com.8 This single command retrieves all 'A' records.  
5. **Used IP Set Creation:** The IP addresses from the query result will be loaded into a second HashSet\[string\].  
6. **Set-Difference Calculation:** The .ExceptWith() method will be called on the "possible IPs" set, efficiently removing all elements that are present in the "used IPs" set.  
7. **Return Value:** The function will return the first available IP address from the resulting set, or $null if the set is empty, indicating that the subnet is full.

### **3.3 Prompt Segment: DNS Management Functions via Secure Remoting**

To complete the automation toolkit, the prompt will define two wrapper functions, Add-DnsHostRecord and Remove-DnsHostRecord. These functions will provide a clean, abstracted interface for performing DNS modifications.

Internally, these functions will be built upon the Invoke-Command cmdlet, leveraging the secure channel. This is where the entire architecture converges:

* The Invoke-Command will target honeycut.pedantictheory.com.  
* It will authenticate using the \-CertificateThumbprint parameter, referencing the client certificate generated in Section 2\.  
* The command will execute in the security context of the mapped local user, local-dns-mgr.  
* Because local-dns-mgr is a member of the DnsAdmins domain group, it has the necessary permissions to successfully execute the Add-DnsServerResourceRecordA and Remove-DnsServerResourceRecord cmdlets within the remote script block.7

The functions will be designed using the standard PowerShell pattern for parameterized remote execution, passing arguments like hostname and IP address via the \-ArgumentList parameter and accessing them within the script block using the $using: scope modifier. This ensures the functions are robust, secure, and easy to use.

## **Section 4: The Complete Agentic Prompt for @cursor**

The final deliverable is the synthesis of the preceding architectural design into a single, comprehensive, and executable prompt for the @cursor agentic IDE. This prompt is not merely a collection of commands; it is a structured program designed to be understood and executed by an AI agent. It is heavily commented, explaining the intent and rationale behind each step, guiding the agent's execution flow. It follows best practices by defining all variables upfront, encapsulating logic into advanced functions, and providing verbose feedback throughout its operation.

### **4.1 Prompt Structure and Best Practices**

A high-quality agentic prompt should be self-documenting and resilient. It uses PowerShell's advanced function features like \`\` and parameter validation to create a robust interface. Verbose messaging is used extensively (Write-Verbose) to provide a clear audit trail of the agent's actions and decisions. The script is designed to be idempotent, allowing it to be run multiple times without causing errors or unintended side effects. It checks for the existence of certificates, listeners, and user mappings before attempting to create them.

### **4.2 Final Consolidated Prompt**

PowerShell

\<\#  
.SYNOPSIS  
    An agentic script to establish secure, passwordless WinRM communication with a target server  
    and perform automated Active Directory DNS management.

.DESCRIPTION  
    This script performs a complete end-to-end configuration and demonstration of a secure,  
    automated DNS management system for the 'pedantictheory.com' domain.

    It follows these core steps:  
    1\.  Validates basic WinRM connectivity to the target host.  
    2\.  Creates a local, self-signed Certificate Authority (CA) and a Client Authentication Certificate.  
    3\.  Configures the target host for secure communication by:  
        \- Deploying the necessary certificates.  
        \- Creating a WinRM HTTPS listener.  
        \- Enabling certificate-based authentication.  
        \- Creating a dedicated local user for automation.  
        \- Mapping the client certificate to the local user.  
        \- Granting the local user permissions to manage DNS by adding it to the 'DnsAdmins' AD group.  
    4\.  Provides high-performance functions to manage DNS records over the secure channel:  
        \- Find-AvailableDnsIPAddress: Scans the specified subnet for the next available IP by querying DNS records.  
        \- Add-DnsHostRecord: Adds a new 'A' record.  
        \- Remove-DnsHostRecord: Removes an existing 'A' record.  
    5\.  Demonstrates the full workflow by finding an available IP, creating a record, and then cleaning it up.

    This script is designed to be idempotent and can be re-run safely.

.PREREQUISITES  
    \- PowerShell 5.1 or later on both the source and target machines.  
    \- The source machine must have initial administrative access to the target machine to perform the one-time setup.  
    \- The target machine must be a Domain Controller or a member server with the DNS Server role and Active Directory management tools installed.  
    \- Required PowerShell Modules: 'Pki', 'DnsServer', 'ActiveDirectory'.  
\#\>

\#================================================================================  
\# SECTION 1: CONFIGURATION VARIABLES  
\#================================================================================  
\# Define all operational parameters in this section.

\# \--- Target Environment \---  
$targetHost \= "honeycut.pedantictheory.com"  
$dnsZone \= "pedantictheory.com"  
$dnsSubnetCIDR \= "172.18.254.0/24"  
$gatewayIP \= "172.18.254.1"

\# \--- Certificate and User Configuration \---  
$caCertSubject \= "CN=PedanticTheory-Automation-CA"  
$clientCertUpn \= "dns-automation@pedantictheory.com" \# UPN for the certificate's SAN  
$localUserName \= "local-dns-mgr" \# Dedicated local user on the target host

\# \--- Script State Variables \---  
$caCert \= $null  
$clientCert \= $null

\#================================================================================  
\# SECTION 2: HELPER AND MANAGEMENT FUNCTIONS  
\#================================================================================

function Find-AvailableDnsIPAddress {  
     
    param(  
        \[Parameter(Mandatory \= $true)\]  
        \[string\]$SubnetCIDR,

        \[Parameter(Mandatory \= $true)\]  
        \[string\]$DnsZoneName,

        \[Parameter(Mandatory \= $true)\]  
        \[string\]$TargetHost,  
          
        \[Parameter(Mandatory \= $true)\]  
       $ClientCertificate,

        \[string\]$ExcludedIPs  
    )

    Write-Verbose "Finding next available IP in subnet '$SubnetCIDR' for zone '$DnsZoneName'."

    try {  
        \# Step 1: Generate all possible IP addresses in the subnet.  
        $ipNetwork \=::Parse($SubnetCIDR)  
        $allPossibleIPs \=\]::new()  
        for ($i \= 1; $i \-lt $ipNetwork.Total \- 1; $i\++) {  
            $allPossibleIPs.Add($ipNetwork.ListableIPAddress\[$i \- 1\].ToString())  
        }  
        Write-Verbose "Generated $($allPossibleIPs.Count) possible host addresses for subnet."

        \# Step 2: Remove any explicitly excluded IPs.  
        if ($null \-ne $ExcludedIPs) {  
            foreach ($ip in $ExcludedIPs) {  
                if ($allPossibleIPs.Contains($ip)) {  
                    $allPossibleIPs.Remove($ip)  
                    Write-Verbose "Removed excluded IP: $ip"  
                }  
            }  
        }

        \# Step 3: Get all currently used IPs from DNS 'A' records via secure remote command.  
        Write-Verbose "Querying DNS server '$TargetHost' for all 'A' records in zone '$DnsZoneName'."  
        $usedIpsFromDns \= Invoke-Command \-ComputerName $TargetHost \-CertificateThumbprint $ClientCertificate.Thumbprint \-ScriptBlock {  
            param($ZoneName)  
            Get-DnsServerResourceRecord \-ZoneName $ZoneName \-RRType A | ForEach-Object { $\_.RecordData.IPv4Address.IPAddressToString }  
        } \-ArgumentList $DnsZoneName

        $usedIPs \=\]::new($usedIpsFromDns)  
        Write-Verbose "Found $($usedIPs.Count) used IP addresses in DNS."

        \# Step 4: Calculate the difference to find available IPs.  
        $allPossibleIPs.ExceptWith($usedIPs)

        if ($allPossibleIPs.Count \-eq 0) {  
            Write-Warning "No available IP addresses found in subnet '$SubnetCIDR'."  
            return $null  
        }

        \# Step 5: Return the first available IP.  
        $availableIP \= $allPossibleIPs | Select-Object \-First 1  
        Write-Verbose "First available IP address found: $availableIP"  
        return $availableIP  
    }  
    catch {  
        Write-Error "Failed to find available IP address. Error: $\_"  
        throw  
    }  
}

function Add-DnsHostRecord {  
     
    param(  
        \[Parameter(Mandatory \= $true)\]  
        \[string\]$HostName,

        \[Parameter(Mandatory \= $true)\]  
        \[string\]$IPAddress,

        \[Parameter(Mandatory \= $true)\]  
        \[string\]$DnsZoneName,

        \[Parameter(Mandatory \= $true)\]  
        \[string\]$TargetHost,

        \[Parameter(Mandatory \= $true)\]  
       $ClientCertificate  
    )

    Write-Verbose "Adding DNS 'A' record for '$HostName' with IP '$IPAddress' in zone '$DnsZoneName'."  
      
    try {  
        Invoke-Command \-ComputerName $TargetHost \-CertificateThumbprint $ClientCertificate.Thumbprint \-ScriptBlock {  
            param($Zone, $Name, $IP)  
            Add-DnsServerResourceRecordA \-ZoneName $Zone \-Name $Name \-IPv4Address $IP \-TimeToLive (New-TimeSpan \-Hours 1)  
        } \-ArgumentList $DnsZoneName, $HostName, $IPAddress  
          
        Write-Host "Successfully added DNS record for '$HostName.$DnsZoneName'." \-ForegroundColor Green  
    }  
    catch {  
        Write-Error "Failed to add DNS record. Error: $\_"  
        throw  
    }  
}

function Remove-DnsHostRecord {  
     
    param(  
        \[Parameter(Mandatory \= $true)\]  
        \[string\]$HostName,

        \[Parameter(Mandatory \= $true)\]  
        \[string\]$DnsZoneName,

        \[Parameter(Mandatory \= $true)\]  
        \[string\]$TargetHost,

        \[Parameter(Mandatory \= $true)\]  
       $ClientCertificate  
    )

    Write-Verbose "Removing DNS 'A' record for '$HostName' from zone '$DnsZoneName'."

    try {  
        Invoke-Command \-ComputerName $TargetHost \-CertificateThumbprint $ClientCertificate.Thumbprint \-ScriptBlock {  
            param($Zone, $Name)  
            \# \-Force is used to suppress the confirmation prompt.  
            Remove-DnsServerResourceRecord \-ZoneName $Zone \-Name $Name \-RRType A \-Force  
        } \-ArgumentList $DnsZoneName, $HostName

        Write-Host "Successfully removed DNS record for '$HostName.$DnsZoneName'." \-ForegroundColor Green  
    }  
    catch {  
        Write-Error "Failed to remove DNS record. Error: $\_"  
        throw  
    }  
}

\#================================================================================  
\# SECTION 3: SCRIPT EXECUTION WORKFLOW  
\#================================================================================

\# \--- STEP 1: Validate Initial WinRM Connectivity \---  
Write-Host "STEP 1: Validating basic WinRM connectivity to '$targetHost'..." \-ForegroundColor Yellow  
try {  
    $wsmanTest \= Test-WSMan \-ComputerName $targetHost \-ErrorAction Stop  
    if ($wsmanTest.ProductVendor \-ne "Microsoft Corporation") {  
        throw "Target host '$targetHost' is not a Microsoft Windows machine."  
    }  
    Write-Host "  WinRM service is running and responsive on '$targetHost'." \-ForegroundColor Green  
}  
catch {  
    Write-Error "Initial WinRM connectivity test failed. Please ensure WinRM is enabled and network/firewall rules allow access. Error: $\_"  
    exit 1  
}

\# \--- STEP 2: Create Local Certificate Infrastructure \---  
Write-Host "STEP 2: Checking for and creating certificate infrastructure..." \-ForegroundColor Yellow  
\# Check for CA certificate  
$caCert \= Get-ChildItem Cert:\\CurrentUser\\My | Where-Object { $\_.Subject \-eq $caCertSubject }  
if (\-not $caCert) {  
    Write-Verbose "CA certificate not found. Creating a new self-signed CA."  
    $caCert \= New-SelfSignedCertificate \-Subject $caCertSubject \-CertStoreLocation Cert:\\CurrentUser\\My \-KeyUsage CertSign, CRLSign \-KeyLength 2048  
    Write-Host "  Created new CA certificate." \-ForegroundColor Green  
}  
else {  
    Write-Host "  \[INFO\] Existing CA certificate found."  
}

\# Check for Client certificate  
$clientCert \= Get-ChildItem Cert:\\CurrentUser\\My | Where-Object { $\_.Subject \-like "CN=$clientCertUpn\*" \-and $\_.Issuer \-eq $caCert.Subject }  
if (\-not $clientCert) {  
    Write-Verbose "Client certificate not found. Creating a new one signed by the CA."  
    \# The \-TextExtension is critical for modern Windows compatibility.  
    $textExtension \= @(  
        "2.5.29.37={text}1.3.6.1.5.5.7.3.2", \# EKU: Client Authentication  
        "2.5.29.17={text}upn=$clientCertUpn"    \# SAN: User Principal Name  
    )  
    $clientCert \= New-SelfSignedCertificate \-Subject "CN=$clientCertUpn" \-CertStoreLocation Cert:\\CurrentUser\\My \-Signer $caCert \-TextExtension $textExtension \-KeyLength 2048  
    Write-Host "  Created new Client Authentication certificate." \-ForegroundColor Green  
}  
else {  
    Write-Host "  \[INFO\] Existing Client Authentication certificate found."  
}

\# \--- STEP 3: Configure Target Server for Secure Remoting \---  
Write-Host "STEP 3: Configuring target server '$targetHost' for secure, certificate-based WinRM..." \-ForegroundColor Yellow  
try {  
    \# This block requires initial administrative credentials to the target host.  
    \# In a real-world scenario, @cursor would handle this credential management.  
    Invoke-Command \-ComputerName $targetHost \-ScriptBlock {  
        param(  
            $CaCertPublic,  
            $ClientCertPublic,  
            $LocalUserName,  
            $ClientCertUpn,  
            $CaCertThumbprint  
        )

        \# Import CA to Trusted Roots  
        $caStore \= Get-Item \-Path Cert:\\LocalMachine\\Root  
        $caStore.Open("ReadWrite")  
        $caStore.Add(::new(::UTF8.GetBytes($CaCertPublic)))  
        $caStore.Close()  
        Write-Host "  Imported CA certificate to Trusted Roots."

        \# Import Client Cert to Trusted People  
        $peopleStore \= Get-Item \-Path Cert:\\LocalMachine\\TrustedPeople  
        $peopleStore.Open("ReadWrite")  
        $peopleStore.Add(::new(::UTF8.GetBytes($ClientCertPublic)))  
        $peopleStore.Close()  
        Write-Host "  Imported Client certificate to Trusted People."

        \# Ensure WinRM HTTPS Listener exists (idempotent check)  
        if (\-not (Get-WSManInstance \-ResourceURI 'winrm/config/Listener' \-SelectorSet @{Address='\*';Transport='HTTPS'})) {  
            winrm create 'winrm/config/Listener?Address=\*+Transport=HTTPS' @{Hostname="$($env:COMPUTERNAME)"; CertificateThumbprint=(Get-ChildItem Cert:\\LocalMachine\\My | Where-Object { $\_.Extensions.EnhancedKeyUsages.FriendlyName \-contains 'Server Authentication' } | Select-Object \-First 1).Thumbprint}  
            Write-Host "  Created WinRM HTTPS listener."  
        } else {  
            Write-Host "  WinRM HTTPS listener already exists."  
        }  
          
        \# Enable Certificate Authentication on the service  
        Set-Item \-Path WSMan:\\localhost\\Service\\Auth\\Certificate \-Value $true  
        Write-Host "  Enabled Certificate Authentication on WinRM service."

        \# Create local user for automation (idempotent check)  
        if (\-not (Get-LocalUser \-Name $LocalUserName \-ErrorAction SilentlyContinue)) {  
            $password \= New-Object System.Security.SecureString  
            \# Password is required but will not be used for authentication. Set to a random, complex value.  
           ::Create().GetBytes(32) | ForEach-Object { $password.AppendChar(\[char\]$\_) }  
            New-LocalUser \-Name $LocalUserName \-Password $password \-PasswordNeverExpires \-UserMayNotChangePassword \-Description "Service account for automated DNS management via WinRM cert auth."  
            Write-Host "  Created local user '$LocalUserName'."  
        } else {  
            Write-Host "  Local user '$LocalUserName' already exists."  
        }

        \# Create Certificate-to-User mapping (idempotent check)  
        $mappingPath \= "WSMan:\\localhost\\ClientCertificate"  
        if (\-not (Test-Path "$mappingPath\\$CaCertThumbprint")) {  
            $cred \= Get-Credential \-UserName $LocalUserName \-Message "Enter password for '$LocalUserName' to create mapping (will not be stored)"  
            New-Item \-Path $mappingPath \-Issuer $CaCertThumbprint \-Subject $ClientCertUpn \-URI \* \-Credential $cred  
            Write-Host "  Created certificate mapping for user '$LocalUserName'."  
        } else {  
            Write-Host "  Certificate mapping already exists."  
        }

        \# Grant local user permissions in AD DNS (idempotent check)  
        $dnsAdminsGroup \= Get-ADGroup \-Identity "DnsAdmins"  
        $localUserPrincipal \= New-Object System.Security.Principal.NTAccount($env:COMPUTERNAME, $LocalUserName)  
        $localUserSid \= $localUserPrincipal.Translate().Value  
        $isMember \= (Get-ADGroupMember \-Identity $dnsAdminsGroup | Where-Object { $\_.objectSid \-eq $localUserSid })  
        if (\-not $isMember) {  
            Add-ADGroupMember \-Identity $dnsAdminsGroup \-Members (Get-ADObject \-Filter "objectSid \-eq '$localUserSid'")  
            Write-Host "  Added '$LocalUserName' to the 'DnsAdmins' AD group."  
        } else {  
            Write-Host "  User '$LocalUserName' is already a member of 'DnsAdmins'."  
        }

    } \-ArgumentList (  
        (Export-Certificate \-Cert $caCert \-Type CERT | Out-String),  
        (Export-Certificate \-Cert $clientCert \-Type CERT | Out-String),  
        $localUserName,  
        $clientCertUpn,  
        $caCert.Thumbprint  
    )  
    Write-Host "  Target server configuration complete." \-ForegroundColor Green  
}  
catch {  
    Write-Error "Failed to configure the target server. Error: $\_"  
    exit 1  
}

\# \--- STEP 4: Demonstrate DNS Automation \---  
Write-Host "STEP 4: Demonstrating automated DNS management..." \-ForegroundColor Yellow

\# Find an available IP  
Write-Host "  Finding an available IP address in '$dnsSubnetCIDR'..."  
$availableIp \= Find-AvailableDnsIPAddress \-SubnetCIDR $dnsSubnetCIDR \-DnsZoneName $dnsZone \-TargetHost $targetHost \-ClientCertificate $clientCert \-ExcludedIPs $gatewayIP  
if (\-not $availableIp) {  
    Write-Error "Could not find an available IP. Halting demonstration."  
    exit 1  
}  
Write-Host "  Found available IP: $availableIp" \-ForegroundColor Cyan

\# Add a new record  
$testHostname \= "cursor-test-$(Get-Random \-Minimum 1000 \-Maximum 9999)"  
Write-Host "  Adding a test DNS record: '$testHostname' \-\> '$availableIp'..."  
Add-DnsHostRecord \-HostName $testHostname \-IPAddress $availableIp \-DnsZoneName $dnsZone \-TargetHost $targetHost \-ClientCertificate $clientCert

\# Verify the record was created  
Write-Host "  Verifying record creation..."  
Start-Sleep \-Seconds 5 \# Allow time for DNS replication if applicable  
$verification \= Invoke-Command \-ComputerName $targetHost \-CertificateThumbprint $clientCert.Thumbprint \-ScriptBlock {  
    param($Zone, $Name)  
    Resolve-DnsName \-Name "$Name.$Zone" \-Server "127.0.0.1" \-ErrorAction SilentlyContinue  
} \-ArgumentList $dnsZone, $testHostname

if ($verification \-and $verification.IPAddress \-eq $availableIp) {  
    Write-Host "  Verification successful. Record '$($testHostname).$($dnsZone)' resolves to '$($verification.IPAddress)'." \-ForegroundColor Green  
} else {  
    Write-Warning "  Verification failed or record not found."  
}

\# Remove the record  
Write-Host "  Cleaning up by removing the test record..."  
Remove-DnsHostRecord \-HostName $testHostname \-DnsZoneName $dnsZone \-TargetHost $targetHost \-ClientCertificate $clientCert

Write-Host "STEP 5: Demonstration complete." \-ForegroundColor Yellow

#### **Works cited**

1. How to test WinRM connectivity using PowerShell? \- Tutorialspoint, accessed August 10, 2025, [https://www.tutorialspoint.com/how-to-test-winrm-connectivity-using-powershell](https://www.tutorialspoint.com/how-to-test-winrm-connectivity-using-powershell)  
2. PowerShell Remoting With WinRM \- csariyildiz.github.io, accessed August 10, 2025, [https://csariyildiz.github.io/powershell-remoting-with-winrm](https://csariyildiz.github.io/powershell-remoting-with-winrm)  
3. Test-WSMan \- PowerShell \- Microsoft Learn, accessed August 10, 2025, [https://learn.microsoft.com/en-us/powershell/module/microsoft.wsman.management/test-wsman?view=powershell-7.5](https://learn.microsoft.com/en-us/powershell/module/microsoft.wsman.management/test-wsman?view=powershell-7.5)  
4. Certificate (password-less) based authentication in WinRM \- Hurry Up and Wait\!, accessed August 10, 2025, [http://www.hurryupandwait.io/blog/certificate-password-less-based-authentication-in-winrm](http://www.hurryupandwait.io/blog/certificate-password-less-based-authentication-in-winrm)  
5. WinRM Certificate Authentication — Ansible Community Documentation, accessed August 10, 2025, [https://docs.ansible.com/ansible/latest/os\_guide/windows\_winrm\_certificate.html](https://docs.ansible.com/ansible/latest/os_guide/windows_winrm_certificate.html)  
6. WinRM with non-domain joined machine using Certs \- PowerShell Forums, accessed August 10, 2025, [https://forums.powershell.org/t/winrm-with-non-domain-joined-machine-using-certs/1832](https://forums.powershell.org/t/winrm-with-non-domain-joined-machine-using-certs/1832)  
7. DnsServer Module | Microsoft Learn, accessed August 10, 2025, [https://learn.microsoft.com/en-us/powershell/module/dnsserver/?view=windowsserver2025-ps](https://learn.microsoft.com/en-us/powershell/module/dnsserver/?view=windowsserver2025-ps)  
8. Get-DnsServerResourceRecord (DnsServer) | Microsoft Learn, accessed August 10, 2025, [https://learn.microsoft.com/en-us/powershell/module/dnsserver/get-dnsserverresourcerecord?view=windowsserver2025-ps](https://learn.microsoft.com/en-us/powershell/module/dnsserver/get-dnsserverresourcerecord?view=windowsserver2025-ps)  
9. DNS Management with PowerShell \- ScriptWizards.Net, accessed August 10, 2025, [https://www.scriptwizards.net/dns-management-with-powershell/](https://www.scriptwizards.net/dns-management-with-powershell/)  
10. 10 PowerShell Commands for Managing Your DNS Server \- Jotelulu, accessed August 10, 2025, [https://jotelulu.com/en-gb/blog/10-powershell-commands-managing-dns-server/](https://jotelulu.com/en-gb/blog/10-powershell-commands-managing-dns-server/)  
11. Enable and Test PowerShell Remoting on a Windows Host \- Support and Troubleshooting, accessed August 10, 2025, [https://support.servicenow.com/kb?id=kb\_article\_view\&sysparm\_article=KB0813330](https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB0813330)  
12. Security considerations for PowerShell Remoting using WinRM \- Microsoft Learn, accessed August 10, 2025, [https://learn.microsoft.com/en-us/powershell/scripting/security/remoting/winrm-security?view=powershell-7.5](https://learn.microsoft.com/en-us/powershell/scripting/security/remoting/winrm-security?view=powershell-7.5)  
13. Resolve Double-Hop Issue in PowerShell Remoting \- CodeProject, accessed August 10, 2025, [https://www.codeproject.com/Tips/847119/Resolve-Double-Hop-Issue-in-PowerShell-Remoting?display=Print\&PageFlow=Fluid](https://www.codeproject.com/Tips/847119/Resolve-Double-Hop-Issue-in-PowerShell-Remoting?display=Print&PageFlow=Fluid)  
14. Solve the PowerShell multi-hop problem without using CredSSP \- Reddit, accessed August 10, 2025, [https://www.reddit.com/r/PowerShell/comments/7pv9xh/solve\_the\_powershell\_multihop\_problem\_without/](https://www.reddit.com/r/PowerShell/comments/7pv9xh/solve_the_powershell_multihop_problem_without/)  
15. The Infamous Double-Hop Problem in PowerShell \- Progress Software, accessed August 10, 2025, [https://www.progress.com/blogs/the-infamous-double-hop-problem-in-powershell](https://www.progress.com/blogs/the-infamous-double-hop-problem-in-powershell)  
16. Certificate-based Authentication over WinRM | by Nairuz Abulhul | R3d Buck3T \- Medium, accessed August 10, 2025, [https://medium.com/r3d-buck3t/certificate-based-authentication-over-winrm-13197265c790](https://medium.com/r3d-buck3t/certificate-based-authentication-over-winrm-13197265c790)  
17. How to configure WINRM for HTTPS \- Windows Client \- Microsoft Learn, accessed August 10, 2025, [https://learn.microsoft.com/en-us/troubleshoot/windows-client/system-management-components/configure-winrm-for-https](https://learn.microsoft.com/en-us/troubleshoot/windows-client/system-management-components/configure-winrm-for-https)  
18. Certificate-based WinRM in Windows 10 Pro? : r/PowerShell \- Reddit, accessed August 10, 2025, [https://www.reddit.com/r/PowerShell/comments/5v0h6n/certificatebased\_winrm\_in\_windows\_10\_pro/](https://www.reddit.com/r/PowerShell/comments/5v0h6n/certificatebased_winrm_in_windows_10_pro/)  
19. Configure Server Monitoring Using WinRM \- Palo Alto Networks, accessed August 10, 2025, [https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/user-id/map-ip-addresses-to-users/configure-server-monitoring-using-winrm](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/user-id/map-ip-addresses-to-users/configure-server-monitoring-using-winrm)  
20. README.md \- WinRM Client Certificate Authentication \- GitHub, accessed August 10, 2025, [https://github.com/jborean93/winrm-cert-auth/blob/main/README.md](https://github.com/jborean93/winrm-cert-auth/blob/main/README.md)  
21. Huge List Of PowerShell Commands for Active Directory, Office 365 and more, accessed August 10, 2025, [https://activedirectorypro.com/powershell-commands/](https://activedirectorypro.com/powershell-commands/)  
22. Functions/Get-IpRange.ps1 2.2.1.6 \- PowerShell Gallery, accessed August 10, 2025, [https://www.powershellgallery.com/packages/PoshFunctions/2.2.1.6/Content/Functions%5CGet-IpRange.ps1](https://www.powershellgallery.com/packages/PoshFunctions/2.2.1.6/Content/Functions%5CGet-IpRange.ps1)  
23. Public/Get-Subnet.ps1 1.0.13 \- PowerShell Gallery, accessed August 10, 2025, [https://www.powershellgallery.com/packages/Subnet/1.0.13/Content/Public%5CGet-Subnet.ps1](https://www.powershellgallery.com/packages/Subnet/1.0.13/Content/Public%5CGet-Subnet.ps1)  
24. Generate list of all DNS records in specified subnet \- Stack Overflow, accessed August 10, 2025, [https://stackoverflow.com/questions/22521283/generate-list-of-all-dns-records-in-specified-subnet](https://stackoverflow.com/questions/22521283/generate-list-of-all-dns-records-in-specified-subnet)  
25. Query DNS for A records and ping test all machines : r/PowerShell \- Reddit, accessed August 10, 2025, [https://www.reddit.com/r/PowerShell/comments/82eu3f/query\_dns\_for\_a\_records\_and\_ping\_test\_all\_machines/](https://www.reddit.com/r/PowerShell/comments/82eu3f/query_dns_for_a_records_and_ping_test_all_machines/)