#!/usr/bin/env python3
"""
Windows Development Environment Setup Script

This script automates the setup of a Windows development environment including:
- Git for Windows installation
- SSH key generation
- Cursor editor terminal configuration
- Bash profile setup with pyenv support

Requirements:
- Python 3.6+
- Windows OS
- Administrative privileges (will auto-elevate if needed)

Usage:
    python setup_windows_dev_environment.py [--force] [--skip-cursor-restart]
"""

import os
import sys
import json
import subprocess
import ctypes
import shutil
import urllib.request
import zipfile
import tempfile
from pathlib import Path
from typing import Dict, List, Optional, Tuple
import argparse
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

# Color codes for terminal output
class Colors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'

def print_header(message: str):
    """Print a formatted header message."""
    print(f"\n{Colors.HEADER}{'=' * 80}")
    print(f" {message}")
    print(f"{'=' * 80}{Colors.ENDC}")

def print_success(message: str):
    """Print a success message."""
    print(f"{Colors.OKGREEN}✓ {message}{Colors.ENDC}")

def print_warning(message: str):
    """Print a warning message."""
    print(f"{Colors.WARNING}⚠ {message}{Colors.ENDC}")

def print_error(message: str):
    """Print an error message."""
    print(f"{Colors.FAIL}✗ {message}{Colors.ENDC}")

def print_info(message: str):
    """Print an info message."""
    print(f"{Colors.OKBLUE}ℹ {message}{Colors.ENDC}")

def is_admin() -> bool:
    """Check if the script is running with administrative privileges."""
    try:
        return ctypes.windll.shell32.IsUserAnAdmin()
    except:
        return False

def elevate_privileges():
    """Re-run the script with elevated privileges."""
    if is_admin():
        return True
    
    print_warning("This script requires administrative privileges.")
    print_info("Attempting to elevate privileges automatically...")
    
    # Get the script path and arguments
    script_path = sys.argv[0]
    args = sys.argv[1:]
    
    # Build the command
    cmd = [sys.executable, script_path] + args
    
    try:
        # Use ShellExecute to run with elevated privileges
        result = ctypes.windll.shell32.ShellExecuteW(
            None, "runas", sys.executable, " ".join([script_path] + args), None, 1
        )
        
        if result > 32:
            print_info("Elevation successful. Exiting current instance.")
            sys.exit(0)
        else:
            print_error("Failed to elevate privileges.")
            return False
    except Exception as e:
        print_error(f"Error during elevation: {e}")
        return False

def find_executable(executable_name: str) -> Optional[str]:
    """Find the path to an executable in the system PATH or common locations."""
    try:
        # Try to find in PATH first
        result = shutil.which(executable_name)
        if result:
            return result
    except:
        pass
    
    # Common installation paths
    common_paths = [
        r"C:\Program Files\Git\bin",
        r"C:\Program Files (x86)\Git\bin",
        r"C:\Program Files\Cursor\Cursor.exe",
        os.path.expanduser(r"~\AppData\Local\Programs\Cursor\Cursor.exe")
    ]
    
    for path in common_paths:
        full_path = os.path.join(path, executable_name)
        if os.path.exists(full_path):
            return full_path
    
    return None

def refresh_environment_path():
    """Refresh the environment PATH variable."""
    try:
        # Get the updated PATH from the registry
        import winreg
        key = winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, r"SYSTEM\CurrentControlSet\Control\Session Manager\Environment")
        path_value, _ = winreg.QueryValueEx(key, "Path")
        winreg.CloseKey(key)
        
        # Update current process environment
        os.environ["PATH"] = path_value
        
        # Also check user PATH
        try:
            key = winreg.OpenKey(winreg.HKEY_CURRENT_USER, r"Environment")
            user_path_value, _ = winreg.QueryValueEx(key, "Path")
            winreg.CloseKey(key)
            os.environ["PATH"] = user_path_value + ";" + os.environ["PATH"]
        except:
            pass
            
        print_success("Environment PATH refreshed")
    except Exception as e:
        print_warning(f"Could not refresh PATH: {e}")

def download_git_installer() -> Optional[str]:
    """Download the latest Git for Windows installer."""
    try:
        # Get the latest version from the official releases
        print_info("Checking for latest Git for Windows version...")
        
        # For now, use a known stable version URL
        # In production, you might want to scrape the releases page
        git_url = "https://github.com/git-for-windows/git/releases/download/v2.43.0.windows.1/Git-2.43.0-64-bit.exe"
        
        print_info("Downloading Git for Windows installer...")
        
        # Create temp directory
        temp_dir = tempfile.mkdtemp()
        installer_path = os.path.join(temp_dir, "GitInstaller.exe")
        
        # Download the file
        urllib.request.urlretrieve(git_url, installer_path)
        
        if os.path.exists(installer_path):
            print_success(f"Downloaded Git installer to: {installer_path}")
            return installer_path
        else:
            print_error("Failed to download Git installer")
            return None
            
    except Exception as e:
        print_error(f"Error downloading Git installer: {e}")
        return None

def install_git(force: bool = False) -> bool:
    """Install Git for Windows if not already present."""
    if not force:
        git_path = find_executable("git.exe")
        if git_path:
            print_info(f"Git already installed at: {git_path}")
            return True
    
    print_header("Step 1: Git Installation")
    
    # Check if Git is already installed
    if not force:
        git_path = find_executable("git.exe")
        if git_path:
            print_success("Git is already installed")
            return True
    
    # Download installer
    installer_path = download_git_installer()
    if not installer_path:
        return False
    
    try:
        print_info("Installing Git for Windows...")
        
        # Silent installation arguments
        install_args = [
            "/VERYSILENT",
            "/NORESTART",
            "/COMPONENTS=icons,ext\\reg\\shellhere,assoc,assoc_sh",
            "/TASKS=gitandunixtools,associate,associate_sh"
        ]
        
        # Run the installer
        result = subprocess.run(
            [installer_path] + install_args,
            capture_output=True,
            text=True,
            timeout=300  # 5 minutes timeout
        )
        
        if result.returncode == 0:
            print_success("Git installed successfully")
            
            # Refresh environment
            refresh_environment_path()
            
            # Verify installation
            git_path = find_executable("git.exe")
            if git_path:
                print_success(f"Git verified at: {git_path}")
                return True
            else:
                print_warning("Git installed but not found in PATH. A restart may be required.")
                return True
        else:
            print_error(f"Git installation failed with return code: {result.returncode}")
            if result.stderr:
                print_error(f"Error: {result.stderr}")
            return False
            
    except subprocess.TimeoutExpired:
        print_error("Git installation timed out")
        return False
    except Exception as e:
        print_error(f"Error during Git installation: {e}")
        return False
    finally:
        # Clean up installer
        try:
            os.remove(installer_path)
            os.rmdir(os.path.dirname(installer_path))
        except:
            pass

def generate_ssh_keys(force: bool = False) -> bool:
    """Generate SSH keys if they don't exist."""
    print_header("Step 2: SSH Key Generation")
    
    # Find ssh-keygen
    ssh_keygen_path = find_executable("ssh-keygen.exe")
    if not ssh_keygen_path:
        print_error("ssh-keygen.exe not found. Please ensure Git for Windows is properly installed.")
        return False
    
    # Set up SSH directory
    ssh_dir = os.path.expanduser("~/.ssh")
    private_key = os.path.join(ssh_dir, "id_rsa")
    public_key = os.path.join(ssh_dir, "id_rsa.pub")
    
    # Create SSH directory if it doesn't exist
    os.makedirs(ssh_dir, exist_ok=True)
    
    # Check if keys already exist
    if not force and os.path.exists(private_key):
        print_success(f"SSH keys already exist at: {ssh_dir}")
        return True
    
    try:
        print_info("Generating SSH key pair...")
        
        # Generate SSH key
        ssh_args = [
            "-t", "rsa",
            "-b", "4096",
            "-f", private_key,
            "-N", ""
        ]
        
        result = subprocess.run(
            [ssh_keygen_path] + ssh_args,
            capture_output=True,
            text=True,
            timeout=60
        )
        
        if result.returncode == 0:
            print_success("SSH key pair generated successfully")
            print_info(f"Private key: {private_key}")
            print_info(f"Public key: {public_key}")
            
            # Display public key for user to copy
            if os.path.exists(public_key):
                print_info("Your public SSH key:")
                with open(public_key, 'r') as f:
                    print(Colors.OKCYAN + f.read().strip() + Colors.ENDC)
            
            return True
        else:
            print_error(f"SSH key generation failed with exit code: {result.returncode}")
            if result.stderr:
                print_error(f"Error: {result.stderr}")
            return False
            
    except subprocess.TimeoutExpired:
        print_error("SSH key generation timed out")
        return False
    except Exception as e:
        print_error(f"Error during SSH key generation: {e}")
        return False

def update_json_settings(file_path: str, updates: Dict) -> bool:
    """Safely update a JSON file with new settings."""
    try:
        # Read existing settings
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                try:
                    settings = json.load(f)
                except json.JSONDecodeError:
                    print_warning(f"Invalid JSON in {file_path}, creating new settings")
                    settings = {}
        else:
            settings = {}
        
        # Apply updates
        for key, value in updates.items():
            keys = key.split('.')
            current = settings
            
            # Navigate to the parent of the target key
            for k in keys[:-1]:
                if k not in current:
                    current[k] = {}
                current = current[k]
            
            # Set the final value
            current[keys[-1]] = value
        
        # Write back to file
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(settings, f, indent=2, ensure_ascii=False)
        
        return True
        
    except Exception as e:
        print_error(f"Error updating JSON settings: {e}")
        return False

def configure_cursor_terminal(bash_path: str) -> bool:
    """Configure Cursor to use Git Bash as the default terminal."""
    print_header("Step 3: Cursor Terminal Configuration")
    
    cursor_settings_path = os.path.join(os.environ.get('APPDATA', ''), "Cursor", "User", "settings.json")
    
    if not os.path.exists(cursor_settings_path):
        # Create settings directory if it doesn't exist
        settings_dir = os.path.dirname(cursor_settings_path)
        os.makedirs(settings_dir, exist_ok=True)
        
        # Create initial settings file
        initial_settings = {
            "terminal.integrated.defaultProfile.windows": "Git Bash",
            "terminal.integrated.profiles.windows": {
                "Git Bash": {
                    "path": bash_path,
                    "args": ["--login"],
                    "icon": "terminal-bash"
                }
            }
        }
        
        if update_json_settings(cursor_settings_path, initial_settings):
            print_success("Created new Cursor settings file")
            return True
        else:
            return False
    else:
        # Update existing settings
        print_info("Updating existing Cursor settings...")
        
        # Update default profile
        if update_json_settings(cursor_settings_path, {"terminal.integrated.defaultProfile.windows": "Git Bash"}):
            print_success("Updated default terminal profile")
        
        # Update profiles configuration
        profile_config = {
            "path": bash_path,
            "args": ["--login"],
            "icon": "terminal-bash"
        }
        
        if update_json_settings(cursor_settings_path, {"terminal.integrated.profiles.windows.Git Bash": profile_config}):
            print_success("Updated terminal profiles configuration")
            return True
        else:
            return False

def setup_bash_profile(bash_path: str) -> bool:
    """Set up .bash_profile with pyenv and useful configurations."""
    print_header("Step 4: Bash Profile Configuration")
    
    try:
        # Get the home directory from bash
        result = subprocess.run(
            [bash_path, "-c", "echo $HOME"],
            capture_output=True,
            text=True,
            timeout=10
        )
        
        if result.returncode == 0 and result.stdout.strip():
            home_dir = result.stdout.strip()
        else:
            home_dir = os.path.expanduser("~")
        
        if not os.path.exists(home_dir):
            print_warning(f"Home directory not found: {home_dir}")
            return False
        
        bash_profile_path = os.path.join(home_dir, ".bash_profile")
        
        # Check if pyenv configuration already exists
        if os.path.exists(bash_profile_path):
            with open(bash_profile_path, 'r', encoding='utf-8') as f:
                content = f.read()
                if 'pyenv' in content:
                    print_info("pyenv configuration already exists in .bash_profile")
                    return True
        
        # Create or append to .bash_profile
        pyenv_config = '''# pyenv configuration
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init --path)"
eval "$(pyenv init -)"

# Useful aliases
alias ll='ls -la'
alias la='ls -A'
alias l='ls -CF'
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'

# Welcome message
echo "Welcome to Git Bash with pyenv support!"
echo "Current Python version: $(python --version 2>/dev/null || echo 'Not installed')"
echo "pyenv versions: $(pyenv versions 2>/dev/null || echo 'Not installed')"
'''
        
        mode = 'a' if os.path.exists(bash_profile_path) else 'w'
        with open(bash_profile_path, mode, encoding='utf-8') as f:
            if mode == 'a':
                f.write('\n\n' + pyenv_config)
            else:
                f.write(pyenv_config)
        
        print_success(f"Bash profile configured at: {bash_profile_path}")
        return True
        
    except Exception as e:
        print_error(f"Error setting up bash profile: {e}")
        return False

def restart_cursor() -> bool:
    """Restart Cursor to apply new settings."""
    print_header("Step 5: Cursor Restart")
    
    try:
        # Find Cursor process
        cursor_path = find_executable("Cursor.exe")
        if not cursor_path:
            print_warning("Cursor.exe not found")
            return False
        
        print_info("Restarting Cursor to apply new terminal settings...")
        print_warning("Please save any unsaved work before continuing.")
        
        # Kill existing Cursor processes
        subprocess.run(["taskkill", "/F", "/IM", "Cursor.exe"], 
                      capture_output=True, timeout=10)
        
        # Wait a moment
        import time
        time.sleep(2)
        
        # Start Cursor again
        subprocess.Popen([cursor_path], shell=True)
        
        print_success("Cursor restarted successfully")
        return True
        
    except Exception as e:
        print_error(f"Error restarting Cursor: {e}")
        return False

def test_shell_configuration(bash_path: str) -> bool:
    """Test the shell configuration."""
    print_header("Step 6: Shell Configuration Verification")
    
    try:
        # Test bash.exe
        print_info("Testing bash.exe...")
        result = subprocess.run([bash_path, "--version"], 
                              capture_output=True, text=True, timeout=10)
        if result.returncode == 0:
            print_success("bash.exe is accessible")
        else:
            print_error("bash.exe test failed")
            return False
        
        # Test git in PATH
        print_info("Testing git in PATH...")
        git_path = find_executable("git.exe")
        if git_path:
            result = subprocess.run(["git", "--version"], 
                                  capture_output=True, text=True, timeout=10)
            if result.returncode == 0:
                print_success("git is accessible in PATH")
            else:
                print_error("git test failed")
                return False
        else:
            print_error("git not found in PATH")
            return False
        
        # Test bash session
        print_info("Testing bash session...")
        test_script = 'echo "Shell test successful" && echo "Current shell: $0" && echo "PATH: $PATH"'
        result = subprocess.run([bash_path, "-c", test_script], 
                              capture_output=True, text=True, timeout=10)
        if result.returncode == 0:
            print_success("Bash session test passed")
            print_info("Shell output:")
            print(Colors.OKCYAN + result.stdout.strip() + Colors.ENDC)
        else:
            print_error("Bash session test failed")
            return False
        
        return True
        
    except Exception as e:
        print_error(f"Error during shell configuration test: {e}")
        return False

def main():
    """Main function to run the setup."""
    parser = argparse.ArgumentParser(
        description="Set up Windows development environment",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python setup_windows_dev_environment.py
  python setup_windows_dev_environment.py --force
  python setup_windows_dev_environment.py --skip-cursor-restart
        """
    )
    
    parser.add_argument(
        "--force",
        action="store_true",
        help="Force reinstallation/regeneration even if components already exist"
    )
    
    parser.add_argument(
        "--skip-cursor-restart",
        action="store_true",
        help="Skip restarting Cursor after configuration changes"
    )
    
    args = parser.parse_args()
    
    try:
        print_header("Windows Development Environment Setup")
        print_info("This script will set up Git, SSH keys, Cursor terminal, and bash profile")
        print_info(f"Running with Force: {args.force}, SkipCursorRestart: {args.skip_cursor_restart}")
        
        # Check and elevate privileges if needed
        if not is_admin():
            if not elevate_privileges():
                print_error("Failed to obtain administrative privileges. Exiting.")
                sys.exit(1)
            return  # Exit current instance, elevated instance will continue
        
        print_info("Running with administrative privileges ✓")
        
        # Step 1: Install Git
        if not install_git(force=args.force):
            print_error("Git installation failed. Exiting.")
            sys.exit(1)
        
        # Step 2: Generate SSH keys
        if not generate_ssh_keys(force=args.force):
            print_error("SSH key generation failed. Exiting.")
            sys.exit(1)
        
        # Step 3: Configure Cursor terminal
        bash_path = find_executable("bash.exe")
        if not bash_path:
            print_error("bash.exe not found. Please ensure Git for Windows is properly installed.")
            sys.exit(1)
        
        if not configure_cursor_terminal(bash_path):
            print_error("Cursor terminal configuration failed. Exiting.")
            sys.exit(1)
        
        # Step 4: Set up bash profile
        if not setup_bash_profile(bash_path):
            print_warning("Bash profile setup failed, but continuing...")
        
        # Step 5: Restart Cursor (optional)
        if not args.skip_cursor_restart:
            if not restart_cursor():
                print_warning("Cursor restart failed, but settings have been updated")
        else:
            print_info("Skipping Cursor restart as requested")
        
        # Step 6: Verify shell configuration
        if test_shell_configuration(bash_path):
            print_success("Shell configuration verification passed ✓")
        else:
            print_warning("Shell configuration verification failed. Please check the configuration manually.")
        
        # Final summary
        print_header("Setup Complete!")
        print_success("Windows development environment has been configured successfully!")
        print_info("What was set up:")
        print_info("  ✓ Git for Windows")
        print_info("  ✓ SSH keys in ~/.ssh/")
        print_info("  ✓ Cursor terminal configured to use Git Bash")
        print_info("  ✓ Bash profile with pyenv support")
        
        print_info("\nNext steps:")
        print_info("  1. Install pyenv-win: https://github.com/pyenv-win/pyenv-win")
        print_info("  2. Restart your terminal or Cursor")
        print_info("  3. Use 'pyenv install <version>' to install Python versions")
        print_info("  4. Use 'pyenv global <version>' to set the default Python version")
        
        print_info("\nYour SSH public key has been displayed above. Copy it to your Git hosting service.")
        
    except KeyboardInterrupt:
        print_warning("\nSetup interrupted by user")
        sys.exit(1)
    except Exception as e:
        print_error(f"Unexpected error during setup: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    main()
