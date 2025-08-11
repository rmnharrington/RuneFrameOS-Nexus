#Requires -Version 5.1

<#
.SYNOPSIS
    Windows Development Environment Setup Script (Auto-Elevating)
    
.DESCRIPTION
    Automates the setup of a Windows development environment including:
    - Git installation and configuration
    - SSH key generation
    - Cursor editor terminal configuration
    - Bash profile setup with pyenv configuration
    
    NOTE: This script automatically elevates to Administrator privileges when needed.
    
.PARAMETER Force
    Force reinstallation/regeneration even if components already exist
    
.PARAMETER SkipCursorRestart
    Skip automatic Cursor restart (manual restart required)
    
.EXAMPLE
    .\setup-windows-dev-environment.ps1
    
.EXAMPLE
    .\setup-windows-dev-environment.ps1 -Force
    
.NOTES
    This script requires administrative privileges and PowerShell 5.1 or higher.
    It will automatically elevate privileges if needed.
    It is designed to be idempotent and can be run multiple times safely.
#>

param(
    [switch]$Force,
    [switch]$SkipCursorRestart
)

# Color functions for better output
function Write-Header {
    param([string]$Message)
    Write-Host "`n" -NoNewline
    Write-Host "=" * 80 -ForegroundColor Cyan
    Write-Host " $Message" -ForegroundColor Cyan
    Write-Host "=" * 80 -ForegroundColor Cyan
}

function Write-Success {
    param([string]$Message)
    Write-Host "✓ $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "⚠ $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "✗ $Message" -ForegroundColor Red
}

function Write-Info {
    param([string]$Message)
    Write-Host "ℹ $Message" -ForegroundColor Blue
}

# Function to check if running as administrator
function Test-Administrator {
    $currentUser = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = New-Object Security.Principal.WindowsPrincipal($currentUser)
    return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

# Function to self-elevate the script
function Invoke-SelfElevation {
    param(
        [string[]]$Arguments = @()
    )
    
    try {
        # Get the current script path
        $scriptPath = $MyInvocation.MyCommand.Path
        if (-not $scriptPath) {
            $scriptPath = $PSCommandPath
        }
        
        # Validate script path
        if (-not $scriptPath -or -not (Test-Path $scriptPath)) {
            throw "Could not determine script path. Please run from the directory containing the script."
        }
        
        # Build the command line arguments
        $argString = ""
        if ($Arguments.Count -gt 0) {
            $argString = " " + ($Arguments -join " ")
        }
        
        # Create the process start info
        $startInfo = New-Object System.Diagnostics.ProcessStartInfo
        $startInfo.FileName = "powershell.exe"
        $startInfo.Arguments = "-ExecutionPolicy Bypass -File `"$scriptPath`"$argString"
        $startInfo.Verb = "runas"
        $startInfo.UseShellExecute = $true
        
        Write-Info "Elevating privileges to Administrator..."
        Write-Info "A UAC prompt will appear. Please click 'Yes' to continue."
        Write-Info "Script path: $scriptPath"
        Write-Info "Arguments: $argString"
        
        # Start the elevated process
        $process = [System.Diagnostics.Process]::Start($startInfo)
        
        if ($process) {
            Write-Success "Script elevated successfully. The elevated instance will continue execution."
            Write-Info "You can close this PowerShell window."
            Start-Sleep -Seconds 2
            exit 0
        } else {
            throw "Failed to start elevated process"
        }
    }
    catch {
        Write-Error "Failed to elevate privileges: $_"
        Write-Info "Please run PowerShell as Administrator manually and try again."
        Write-Info "Or ensure you're running the script from its directory."
        exit 1
    }
}

# Function to refresh environment PATH
function Refresh-Path {
    $env:PATH = [System.Environment]::GetEnvironmentVariable("PATH","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("PATH","User")
}

# Function to find executable path dynamically
function Find-ExecutablePath {
    param(
        [string]$ExecutableName
    )
    
    # First try Get-Command
    try {
        $cmd = Get-Command $ExecutableName -ErrorAction Stop
        return $cmd.Source
    }
    catch {
        # If not found, check common installation directories
        $commonPaths = @(
            "C:\Program Files\Git\bin",
            "C:\Program Files (x86)\Git\bin",
            "C:\Program Files\Cursor\Cursor.exe",
            "C:\Users\$env:USERNAME\AppData\Local\Programs\Cursor\Cursor.exe"
        )
        
        foreach ($path in $commonPaths) {
            $fullPath = Join-Path $path $ExecutableName
            if (Test-Path $fullPath) {
                return $fullPath
            }
        }
        
        return $null
    }
}

# Function to safely update JSON settings
function Update-JsonSettings {
    param(
        [string]$FilePath,
        [string]$PropertyPath,
        [object]$Value
    )
    
    try {
        # Read existing settings
        if (Test-Path $FilePath) {
            $settings = Get-Content $FilePath -Raw | ConvertFrom-Json
        } else {
            $settings = [PSCustomObject]@{}
        }
        
        # Navigate to the parent property
        $current = $settings
        $pathParts = $PropertyPath.Split('.')
        $lastPart = $pathParts[-1]
        
        for ($i = 0; $i -lt $pathParts.Count - 1; $i++) {
            $part = $pathParts[$i]
            if (-not $current.$part) {
                $current.$part = [PSCustomObject]@{}
            }
            $current = $current.$part
        }
        
        # Set the value
        $current.$lastPart = $Value
        
        # Write back to file
        $settings | ConvertTo-Json -Depth 10 | Set-Content $FilePath -Encoding UTF8
        return $true
    }
    catch {
        Write-Error "Failed to update JSON settings: $_"
        return $false
    }
}

# Function to restart Cursor gracefully
function Restart-Cursor {
    param([string]$CursorPath)
    
    try {
        Write-Info "Attempting to restart Cursor gracefully..."
        
        # Try to close Cursor gracefully first
        $cursorProcesses = Get-Process -Name "Cursor" -ErrorAction SilentlyContinue
        if ($cursorProcesses) {
            Write-Info "Found $($cursorProcesses.Count) Cursor process(es), attempting graceful shutdown..."
            $cursorProcesses | ForEach-Object { $_.CloseMainWindow() }
            
            # Wait for graceful shutdown
            Start-Sleep -Seconds 5
            
            # Force kill if still running
            $remainingProcesses = Get-Process -Name "Cursor" -ErrorAction SilentlyContinue
            if ($remainingProcesses) {
                Write-Warning "Graceful shutdown failed, forcing process termination..."
                $remainingProcesses | Stop-Process -Force
                Start-Sleep -Seconds 2
            }
        }
        
        # Start Cursor
        Write-Info "Starting Cursor..."
        Start-Process -FilePath $CursorPath
        Write-Success "Cursor restarted successfully"
    }
    catch {
        Write-Error "Failed to restart Cursor: $_"
        Write-Info "Please restart Cursor manually to apply the new terminal settings"
    }
}

# Function to setup bash profile
function Setup-BashProfile {
    param([string]$BashPath)
    
    try {
        # Get the home directory from bash
        $homeDir = & $BashPath -c "echo `$HOME" 2>$null
        if (-not $homeDir -or -not (Test-Path $homeDir)) {
            $homeDir = $env:USERPROFILE
        }
        
        $bashProfilePath = Join-Path $homeDir ".bash_profile"
        $bashrcPath = Join-Path $homeDir ".bashrc"
        
        Write-Info "Setting up bash profile at: $bashProfilePath"
        
        # Create or update .bash_profile
        $profileContent = @"
# Bash profile for Windows development environment
# Generated by setup-windows-dev-environment.ps1

# Source .bashrc if it exists
if [ -f ~/.bashrc ]; then
    . ~/.bashrc
fi

# pyenv initialization
if command -v pyenv 1>/dev/null 2>&1; then
    eval "\$(pyenv init -)"
    eval "\$(pyenv init --path)"
fi

# Useful aliases
alias ll='ls -la'
alias la='ls -A'
alias l='ls -CF'
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'

# Welcome message
echo "Welcome to Git Bash with pyenv support!"
echo "Current Python version: \$(python --version 2>/dev/null \|\| echo 'Not installed')"
echo "pyenv versions: \$(pyenv versions 2>/dev/null \|\| echo 'Not installed')"
"@
        
        Set-Content -Path $bashProfilePath -Value $profileContent -Encoding UTF8
        Write-Success "Bash profile created/updated successfully"
        
        # Also create .bashrc if it doesn't exist
        if (-not (Test-Path $bashrcPath)) {
            $bashrcContent = @"
# Bashrc for Windows development environment
# Generated by setup-windows-dev-environment.ps1

# History settings
HISTSIZE=1000
HISTFILESIZE=2000
HISTCONTROL=ignoreboth

# Append to history instead of overwriting
shopt -s histappend

# Check window size after each command
shopt -s checkwinsize

# Make less more friendly for non-text input files
[ -x /usr/bin/lesspipe ] && eval "\$(lesspipe)"
"@
            Set-Content -Path $bashrcPath -Value $bashrcContent -Encoding UTF8
            Write-Success "Bashrc created successfully"
        }
        
        return $true
    }
    catch {
        Write-Error "Failed to setup bash profile: $_"
        return $false
    }
}

# Function to test shell configuration
function Test-ShellConfiguration {
    param(
        [string]$BashPath
    )
    
    try {
        Write-Info "Testing shell configuration..."
        
        # Test if bash.exe is accessible
        if (-not (Test-Path $BashPath)) {
            Write-Error "Bash executable not found at: $BashPath"
            return $false
        }
        
        # Test if bash.exe can be executed
        try {
            $bashVersion = & $BashPath --version 2>&1
            if ($LASTEXITCODE -eq 0) {
                Write-Success "Bash executable is working: $BashPath"
                Write-Info "Bash version: $($bashVersion[0])"
            } else {
                Write-Warning "Bash executable returned non-zero exit code"
                return $false
            }
        }
        catch {
            Write-Error "Failed to execute bash: $_"
            return $false
        }
        
        # Test if the bash path is in PATH
        $bashInPath = $env:PATH -split ';' | Where-Object { $_ -like "*Git*bin*" }
        if ($bashInPath) {
            Write-Success "Git bin directory found in PATH: $($bashInPath[0])"
        } else {
            Write-Warning "Git bin directory not found in PATH"
        }
        
        # Test if we can start a bash session
        try {
            $bashTest = Start-Process -FilePath $BashPath -ArgumentList "--login", "-c", "echo 'Shell test successful'; exit 0" -Wait -PassThru -NoNewWindow
            if ($bashTest.ExitCode -eq 0) {
                Write-Success "Bash session test successful"
            } else {
                Write-Warning "Bash session test failed with exit code: $($bashTest.ExitCode)"
            }
        }
        catch {
            Write-Error "Failed to test bash session: $_"
            return $false
        }
        
        return $true
    }
    catch {
        Write-Error "Shell configuration test failed: $_"
        return $false
    }
}

# Main execution
try {
    Write-Header "Windows Development Environment Setup"
    Write-Info "This script will set up Git, SSH keys, Cursor terminal, and bash profile"
    Write-Info "Running with Force: $Force, SkipCursorRestart: $SkipCursorRestart"
    
    # Check if running as administrator and elevate if needed
    if (-not (Test-Administrator)) {
        Write-Warning "This script requires administrative privileges."
        Write-Info "Attempting to elevate privileges automatically..."
        
        # Build arguments to pass to the elevated instance
        $elevationArgs = @()
        if ($Force) { $elevationArgs += "-Force" }
        if ($SkipCursorRestart) { $elevationArgs += "-SkipCursorRestart" }
        
        Invoke-SelfElevation -Arguments $elevationArgs
    }
    
    Write-Info "Running with administrative privileges ✓"
    
    # Additional safety check
    if (-not (Test-Administrator)) {
        Write-Error "Failed to obtain administrative privileges. Exiting."
        exit 1
    }
    
    # Set error action preference
    $ErrorActionPreference = "Stop"
    
    # Step 1: Check and install Git if not present
    Write-Header "Step 1: Git Installation"
    $gitVersion = $null
    try {
        $gitVersion = git --version 2>$null
        if ($gitVersion) {
            Write-Success "Git is already installed: $gitVersion"
        }
    }
    catch {
        Write-Info "Git not found in PATH"
    }
    
    if (-not $gitVersion -or $Force) {
        Write-Info "Installing Git for Windows..."
        
        # Try to find existing Git installation first
        $gitPath = Find-ExecutablePath "git.exe"
        if ($gitPath -and -not $Force) {
            Write-Info "Found existing Git installation at: $gitPath"
        } else {
            # Download and install Git
            $apiUrl = "https://api.github.com/repos/git-for-windows/git/releases/latest"
            try {
                $release = Invoke-RestMethod -Uri $apiUrl -UseBasicParsing
                $asset = $release.assets | Where-Object { $_.name -like "*64-bit.exe" } | Select-Object -First 1
                
                if ($asset) {
                    $downloadUrl = $asset.browser_download_url
                    $installerPath = Join-Path $env:TEMP "Git-Installer.exe"
                    
                    Write-Info "Downloading Git installer..."
                    Invoke-WebRequest -Uri $downloadUrl -OutFile $installerPath -UseBasicParsing
                    
                    Write-Info "Installing Git silently with elevated privileges..."
                    $installArgs = @(
                        "/VERYSILENT",
                        "/NORESTART",
                        "/COMPONENTS=icons,ext\reg\shellhere,assoc,assoc_sh",
                        "/TASKS=gitandunixtools,associate,associate_sh"
                    )
                    
                    $process = Start-Process -FilePath $installerPath -ArgumentList $installArgs -Verb RunAs -Wait -PassThru
                    
                    if ($process.ExitCode -eq 0) {
                        Write-Success "Git installed successfully"
                        Remove-Item $installerPath -Force -ErrorAction SilentlyContinue
                        Refresh-Path
                        
                        # Verify installation
                        Start-Sleep -Seconds 2
                        $gitVersion = git --version 2>$null
                        if ($gitVersion) {
                            Write-Success "Git verification successful: $gitVersion"
                        } else {
                            throw "Git installation verification failed"
                        }
                    } else {
                        throw "Git installer failed with exit code: $($process.ExitCode)"
                    }
                } else {
                    throw "Failed to find Git installer asset"
                }
            }
            catch {
                Write-Error "Failed to install Git: $_"
                Write-Info "Please install Git manually from https://git-scm.com/download/win"
                exit 1
            }
        }
    }
    
    # Step 2: Find bash.exe path
    Write-Header "Step 2: Bash Configuration"
    $bashPath = Find-ExecutablePath "bash.exe"
    
    if (-not $bashPath) {
        Write-Error "bash.exe not found after Git installation. Please check installation."
        exit 1
    }
    
    Write-Success "Bash found at: $bashPath"
    
    # Step 3: Handle SSH keys
    Write-Header "Step 3: SSH Key Setup"
    $sshDir = Join-Path $env:USERPROFILE ".ssh"
    $privateKey = Join-Path $sshDir "id_rsa"
    $publicKey = Join-Path $sshDir "id_rsa.pub"
    
    if (-not (Test-Path $sshDir)) {
        New-Item -ItemType Directory -Path $sshDir -Force | Out-Null
        Write-Info "Created SSH directory: $sshDir"
    }
    
    if (-not (Test-Path $privateKey) -or $Force) {
        Write-Info "Generating SSH key pair..."
        
        # Find ssh-keygen
        $sshKeygenPath = Find-ExecutablePath "ssh-keygen.exe"
        if (-not $sshKeygenPath) {
            throw "ssh-keygen.exe not found. Please ensure Git for Windows is properly installed."
        }
        
        # Generate SSH key
        $sshArgs = @(
            "-t", "rsa",
            "-b", "4096",
            "-f", $privateKey,
            "-N", '""'
        )
        
        $process = Start-Process -FilePath $sshKeygenPath -ArgumentList $sshArgs -Wait -PassThru -NoNewWindow
        
        if ($process.ExitCode -eq 0) {
            Write-Success "SSH key pair generated successfully"
            Write-Info "Private key: $privateKey"
            Write-Info "Public key: $publicKey"
            
            # Display public key for user to copy
            if (Test-Path $publicKey) {
                Write-Info "Your public SSH key:"
                Write-Host (Get-Content $publicKey) -ForegroundColor White
            }
        } else {
            throw "SSH key generation failed with exit code: $($process.ExitCode)"
        }
    } else {
        Write-Success "SSH keys already exist at: $sshDir"
    }
    
    # Step 4: Configure Cursor terminal
    Write-Header "Step 4: Cursor Terminal Configuration"
    $cursorSettingsPath = Join-Path $env:APPDATA "Cursor\User\settings.json"
    
    if (-not (Test-Path $cursorSettingsPath)) {
        # Create settings directory if it doesn't exist
        $settingsDir = Split-Path $cursorSettingsPath -Parent
        if (-not (Test-Path $settingsDir)) {
            New-Item -ItemType Directory -Path $settingsDir -Force | Out-Null
        }
        
        # Create initial settings file
        $initialSettings = @{
            "terminal.integrated.defaultProfile.windows" = "Git Bash"
            "terminal.integrated.profiles.windows" = @{
                "Git Bash" = @{
                    "path" = $bashPath
                    "args" = @("--login")
                    "icon" = "terminal-bash"
                }
            }
        }
        
        $initialSettings | ConvertTo-Json -Depth 10 | Set-Content $cursorSettingsPath -Encoding UTF8
        Write-Success "Created new Cursor settings file"
    } else {
        # Update existing settings
        Write-Info "Updating existing Cursor settings..."
        
        # Update default profile
        if (Update-JsonSettings -FilePath $cursorSettingsPath -PropertyPath "terminal.integrated.defaultProfile.windows" -Value "Git Bash") {
            Write-Success "Updated default terminal profile"
        }
        
        # Update profiles configuration
        $profileConfig = @{
            "path" = $bashPath
            "args" = @("--login")
            "icon" = "terminal-bash"
        }
        
        if (Update-JsonSettings -FilePath $cursorSettingsPath -PropertyPath "terminal.integrated.profiles.windows.Git Bash" -Value $profileConfig) {
            Write-Success "Updated terminal profiles configuration"
        }
    }
    
    # Step 5: Setup bash profile
    Write-Header "Step 5: Bash Profile Configuration"
    if (Setup-BashProfile -BashPath $bashPath) {
        Write-Success "Bash profile configured with pyenv support"
    } else {
        Write-Warning "Bash profile configuration failed, continuing..."
    }
    
    # Step 6: Restart Cursor if requested
    Write-Header "Step 6: Cursor Restart"
    if (-not $SkipCursorRestart) {
        $cursorPath = Find-ExecutablePath "Cursor.exe"
        if ($cursorPath) {
            Restart-Cursor -CursorPath $cursorPath
        } else {
            Write-Warning "Cursor executable not found, please restart manually to apply settings"
        }
    } else {
        Write-Info "Skipping Cursor restart as requested"
    }
    
    # Step 7: Verify shell configuration
    Write-Header "Step 7: Shell Configuration Verification"
    if (Test-ShellConfiguration -BashPath $bashPath) {
        Write-Success "Shell configuration verification passed ✓"
    } else {
        Write-Warning "Shell configuration verification failed. Please check the configuration manually."
    }
    
    # Final summary
    Write-Header "Setup Complete!"
    Write-Success "Development environment setup completed successfully!"
    Write-Info "Summary of changes:"
    Write-Info "✓ Git installed and configured"
    Write-Info "✓ SSH keys generated at: $sshDir"
    Write-Info "✓ Cursor configured to use Git Bash"
    Write-Info "✓ Bash profile updated with pyenv configuration"
    
    Write-Info "`nNext steps for Python setup:"
    Write-Info "1. Install pyenv-win:"
    Write-Host "   Invoke-WebRequest -UseBasicParsing -Uri 'https://raw.githubusercontent.com/pyenv-win/pyenv-win/master/pyenv-win/install-pyenv-win.ps1' -OutFile './install-pyenv-win.ps1'; & './install-pyenv-win.ps1'" -ForegroundColor White
    
    Write-Info "2. Disable Python app execution aliases in Windows Settings > Apps > Apps & features > App execution aliases"
    
    Write-Info "3. Restart PowerShell and install Python:"
    Write-Host "   pyenv install 3.11.9" -ForegroundColor White
    Write-Host "   pyenv global 3.11.9" -ForegroundColor White
    Write-Host "   pyenv rehash" -ForegroundColor White
    
    Write-Info "4. Verify installation:"
    Write-Host "   python --version" -ForegroundColor White
    
    Write-Success "`nSetup complete! You can now use Git Bash in Cursor with pyenv support."
}

catch {
    Write-Error "Script execution failed: $_"
    Write-Error "Stack trace: $($_.ScriptStackTrace)"
    exit 1
}

finally {
    # Cleanup temporary files
    $tempFiles = @(
        (Join-Path $env:TEMP "Git-Installer.exe"),
        (Join-Path $env:TEMP "install-pyenv-win.ps1")
    )
    
    foreach ($file in $tempFiles) {
        if (Test-Path $file) {
            Remove-Item $file -Force -ErrorAction SilentlyContinue
        }
    }
}

# Standalone function to test shell configuration (can be called independently)
function Test-CurrentShellConfiguration {
    Write-Header "Testing Current Shell Configuration"
    
    # Find bash.exe
    $bashPath = Find-ExecutablePath "bash.exe"
    if (-not $bashPath) {
        Write-Error "bash.exe not found. Please ensure Git for Windows is installed."
        return $false
    }
    
    # Test the configuration
    return Test-ShellConfiguration -BashPath $bashPath
}

# Export the test function for standalone use (only if running as module)
if ($MyInvocation.InvocationName -eq $MyInvocation.MyCommand.Name) {
    Export-ModuleMember -Function Test-CurrentShellConfiguration -ErrorAction SilentlyContinue
}
