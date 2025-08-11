@echo off
REM RuneFrameOS Deployment Batch Script for Sherlock Cluster
REM This script transfers the Linux deployment script to the Sherlock cluster and executes it

setlocal enabledelayedexpansion

REM Configuration
set "SSH_TARGET=jonar@sherlock.pedantictheory.com"
set "LOCAL_SCRIPT=deploy_runeframeos_linux.sh"
set "REMOTE_SCRIPT=/home/jonar/deploy_runeframeos.sh"

echo.
echo ========================================
echo RuneFrameOS Deployment to Sherlock Cluster
echo ========================================
echo.

REM Check if the Linux script exists
if not exist "%LOCAL_SCRIPT%" (
    echo ERROR: Linux deployment script not found: %LOCAL_SCRIPT%
    echo Please ensure deploy_runeframeos_linux.sh exists in the current directory
    pause
    exit /b 1
)

echo [1/6] Testing SSH connection...
ssh -o ConnectTimeout=10 %SSH_TARGET% "echo SSH connection successful" >nul 2>&1
if errorlevel 1 (
    echo ERROR: Failed to establish SSH connection to %SSH_TARGET%
    echo Please verify your SSH key configuration and network connectivity
    pause
    exit /b 1
)
echo ✓ SSH connection established

echo.
echo [2/6] Verifying Kubernetes access...
ssh %SSH_TARGET% "kubectl version --client" >nul 2>&1
if errorlevel 1 (
    echo ERROR: kubectl is not available on the remote server
    pause
    exit /b 1
)
echo ✓ Kubernetes access verified

echo.
echo [3/6] Transferring deployment script...
scp "%LOCAL_SCRIPT%" "%SSH_TARGET%:%REMOTE_SCRIPT%" >nul 2>&1
if errorlevel 1 (
    echo ERROR: Failed to transfer script to remote server
    pause
    exit /b 1
)
echo ✓ Script transferred successfully

echo.
echo [4/6] Making script executable...
ssh %SSH_TARGET% "chmod +x %REMOTE_SCRIPT%" >nul 2>&1
if errorlevel 1 (
    echo WARNING: Failed to make script executable
)

echo.
echo [5/6] Executing deployment script...
echo The deployment script will now run on the Sherlock cluster...
echo This may take several minutes depending on the number of applications
echo.
echo Press any key to continue with deployment...
pause >nul

ssh %SSH_TARGET% "%REMOTE_SCRIPT%"
set DEPLOYMENT_EXIT_CODE=%ERRORLEVEL%

echo.
if %DEPLOYMENT_EXIT_CODE%==0 (
    echo ========================================
    echo Deployment Completed Successfully!
    echo ========================================
) else (
    echo ========================================
    echo Deployment Completed with Exit Code: %DEPLOYMENT_EXIT_CODE%
    echo ========================================
)

echo.
echo [6/6] Final status check...
ssh %SSH_TARGET% "%REMOTE_SCRIPT% --status"

echo.
echo [6/6] Cleanup...
ssh %SSH_TARGET% "rm -f %REMOTE_SCRIPT%" >nul 2>&1
if errorlevel 1 (
    echo WARNING: Failed to remove remote script
) else (
    echo ✓ Cleanup completed
)

echo.
echo ========================================
echo Deployment Process Complete
echo ========================================
echo.
echo Next steps:
echo 1. Verify DNS resolution for the deployed domains
echo 2. Check application health endpoints
echo 3. Monitor logs for any deployment issues
echo 4. Configure any additional services or integrations as needed
echo.
echo To check status later, SSH to the cluster and run:
echo   ssh %SSH_TARGET%
echo   kubectl get pods --all-namespaces ^| grep runeframeos
echo.
pause



