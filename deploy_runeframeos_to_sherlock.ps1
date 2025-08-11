# RuneFrameOS Deployment Script for Sherlock Cluster
# This script deploys RuneFrameOS applications to the jonar-sherlock Kubernetes cluster
# Uses configuration from sherlock_prompt.yaml for domain bindings and network IPs

# 1. Define Environment Variables
$local_base_path = "C:\Users\Richard\Dropbox\Bad Guy Gas\Code_Repository"
$ssh_target = "jonar@sherlock.pedantictheory.com"

# Applications to deploy (matching the DNS records from sherlock_prompt.yaml)
$applications = @(
    @{ Name = "RuneFrameOS-BrokeUnicornTavern"; Domain = "brokeunicorntavern.pedantictheory.com"; IP = "172.18.254.70" },
    @{ Name = "RuneFrameOS-Core"; Domain = "core.pedantictheory.com"; IP = "172.18.254.71" },
    @{ Name = "RuneFrameOS-Hoardwell"; Domain = "hoardwell.pedantictheory.com"; IP = "172.18.254.75" },
    @{ Name = "RuneFrameOS-Distillara"; Domain = "distillara.pedantictheory.com"; IP = "172.18.254.73" },
    @{ Name = "RuneFrameOS-Feastwell"; Domain = "feastwell.pedantictheory.com"; IP = "172.18.254.74" }
)

# 2. Verify SSH Configuration
Write-Output "=== Verifying SSH Configuration ==="
$ssh_config_path = "C:\Users\Wee\.ssh\config"
if (-not (Test-Path $ssh_config_path)) {
    Write-Error "SSH config file not found at $ssh_config_path"
    Write-Output "Please ensure the SSH configuration exists as specified in sherlock_prompt.yaml"
    exit 1
}

# 3. Test SSH Connection
Write-Output "=== Testing SSH Connection to Sherlock Cluster ==="
try {
    $connection_test = ssh -o ConnectTimeout=10 $ssh_target "echo 'SSH connection successful'"
    if ($connection_test -eq "SSH connection successful") {
        Write-Output "SSH connection to $ssh_target established successfully"
    } else {
        Write-Error "SSH connection test failed"
        exit 1
    }
} catch {
    Write-Error "Failed to establish SSH connection to $ssh_target"
    Write-Output "Please verify your SSH key configuration and network connectivity"
    exit 1
}

# 4. Verify Kubernetes Access
Write-Output "=== Verifying Kubernetes Cluster Access ==="
try {
    $k8s_nodes = ssh $ssh_target "kubectl get nodes --no-headers | wc -l"
    Write-Output "Kubernetes cluster accessible. Found $k8s_nodes node(s)"
} catch {
    Write-Error "Failed to access Kubernetes cluster"
    exit 1
}

# 5. Check Available Storage Classes
Write-Output "=== Checking Available Storage Classes ==="
try {
    $storage_classes = ssh $ssh_target "kubectl get storageclass --no-headers | ForEach-Object { `$_.Split()[0] }"
    Write-Output "Available Storage Classes: $storage_classes"
} catch {
    Write-Output "Warning: Could not retrieve storage classes"
}

# 6. Begin Deployment Loop
Write-Output "=== Starting Application Deployments ==="

foreach ($app in $applications) {
    $app_name = $app.Name
    $domain = $app.Domain
    $ip = $app.IP
    
    Write-Output "--- Starting deployment for: $app_name ---"
    Write-Output "Domain: $domain"
    Write-Output "IP Address: $ip"
    
    # Construct the full path to the local application directory
    $local_app_path = Join-Path -Path $local_base_path -ChildPath $app_name
    $local_k8s_path = Join-Path -Path $local_app_path -ChildPath "k8s"
    
    # Check if the k8s directory exists
    if (Test-Path -Path $local_k8s_path) {
        Write-Output "Found k8s configuration directory"
        
        # Define remote temporary directory
        $remote_temp_path = "/home/jonar/temp_deploy/$app_name"
        
        # Create temporary directory on remote server
        Write-Output "Creating remote temporary directory: $remote_temp_path"
        ssh $ssh_target "mkdir -p $remote_temp_path"
        
        # Copy k8s configuration files to remote server
        Write-Output "Copying k8s files from $local_k8s_path to remote server..."
        try {
            scp -r "$local_k8s_path\*" "$ssh_target`:$remote_temp_path"
            Write-Output "Files copied successfully"
        } catch {
            Write-Error "Failed to copy files for $app_name"
            continue
        }
        
        # Update configuration files with correct domain and IP if needed
        Write-Output "Updating configuration with domain: $domain and IP: $ip"
        ssh $ssh_target "cd $remote_temp_path && sed -i 's/placeholder\.pedantictheory\.com/$domain/g' *.yaml 2>/dev/null || true"
        
        # Apply Kubernetes configurations
        Write-Output "Applying Kubernetes configurations on sherlock cluster..."
        try {
            $deploy_result = ssh $ssh_target "kubectl apply -f $remote_temp_path"
            Write-Output "Deployment applied successfully"
            Write-Output $deploy_result
        } catch {
            Write-Error "Failed to apply Kubernetes configurations for $app_name"
        }
        
        # Verify deployment status
        Write-Output "Verifying deployment status..."
        try {
            $app_label = $app_name.ToLower()
            $deployment_status = ssh $ssh_target "kubectl get pods -l app=$app_label --no-headers 2>/dev/null || echo 'No pods found with app label'"
            Write-Output "Deployment Status: $deployment_status"
        } catch {
            Write-Output "Could not verify deployment status"
        }
        
        # Clean up temporary directory
        Write-Output "Cleaning up remote temporary directory..."
        ssh $ssh_target "rm -rf $remote_temp_path"
        
        Write-Output "--- Deployment for $app_name completed successfully. ---"
    } else {
        Write-Error "Deployment skipped for $app_name: 'k8s' directory not found at $local_k8s_path"
    }
    
    Write-Output "" # Add blank line for readability
}

# 7. Final Status Check
Write-Output "=== Final Deployment Status Check ==="
try {
    $all_pods = ssh $ssh_target "kubectl get pods --all-namespaces --no-headers | grep -E '(Pending|Running|Succeeded|Failed)' | wc -l"
    $running_pods = ssh $ssh_target "kubectl get pods --all-namespaces --no-headers | grep 'Running' | wc -l"
    
    Write-Output "Total Pods: $all_pods"
    Write-Output "Running Pods: $running_pods"
    
    if ($running_pods -gt 0) {
        Write-Output "Cluster has active workloads"
    } else {
        Write-Output "No running pods found"
    }
} catch {
    Write-Output "Could not retrieve final cluster status"
}

Write-Output "=== All application deployments have been processed ==="
Write-Output "Applications deployed:"
foreach ($app in $applications) {
    $app_info = "$($app.Name) -> $($app.Domain) ($($app.IP))"
    Write-Output "  - $app_info"
}

Write-Output "Next steps:"
Write-Output "1. Verify DNS resolution for the deployed domains"
Write-Output "2. Check application health endpoints"
Write-Output "3. Monitor logs for any deployment issues"
Write-Output "4. Configure any additional services or integrations as needed"


