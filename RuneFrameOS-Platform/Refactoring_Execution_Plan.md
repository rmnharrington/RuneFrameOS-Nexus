# RuneFrame OS Creative Refactoring Execution Plan
## Comprehensive Parameterized Refactoring for New Creative Direction

**Document**: Refactoring Execution Plan  
**Date**: August 9, 2025  
**Status**: PLANNING PHASE - Awaiting Variable Population and Execution Approval  
**Author**: RuneFrame OS Architecture Team  

---

## 📋 Executive Summary

This document provides a comprehensive, step-by-step refactoring plan to align the entire RuneFrame OS ecosystem with the new creative direction. The plan is parameterized using variables as placeholders, enabling precise control over the scope and targets of the refactoring operation.

**New Creative Direction Summary**:
- **Core Platform**: `RuneFrame OS™` - Universal TTRPG hub
- **Core Engine**: `RuneForge` - Rules and mechanics engine
- **User Roles**: Players → **Travelers**, Game Masters → **Architects**
- **Architecture**: 12 independent, interconnected modules

---

## 🔧 Plan Variables Definition

### **Variable Structure Template**
```yaml
# Refactoring Input Variables
# To be populated by the user before executing Phase 2.

# Legacy Context Analysis (from context_use.yaml)
LEGACY_COMPONENTS:
  - "Distillara"    # Alchemy Simulation Platform
  - "hoardwell"    # Multi-Agent Communication Platform  
  - "mercatrix"    # Economic Foundation Engine
  - "RuneFrame OS Platform"        # Infrastructure as Code Platform
  - "Tapestry Engine"     # World-Building Engine

# New Module Ecosystem (12 modules)
NEW_MODULES:
  - "BrokeUnicornTavern"
  - "Cryptwell"
  - "Distillara"      # Note: spelling change from Distillara
  - "Feastwell"
  - "Hoardwell"       # Retained
  - "Loreforge"
  - "Mercatrix"       # Retained
  - "RuneWeaver"
  - "Scriptoria"
  - "TapestryEngine"  # Evolved from Tapestry Engine
  - "TravelersTable"
  - "PersonaVault"

# Specific files to be scanned and updated
TARGET_FILES:
  - "context_use.yaml"
  - "README.md"
  - "CHANGES.md"
  - "ROADMAP.md"
  - "state.yaml"
  - "ecosystem/ECOSYSTEM_OVERVIEW.md"
  # Additional files to be specified by user

# Entire folders to be recursively scanned and updated
TARGET_FOLDERS:
  - "documentation/"
  - "ecosystem/"
  - "instructions/"
  - "best_practices/"
  - "templates/"
  - "scripts/"
  - "infrastructure/"
  # Additional folders to be specified by user

# Repository name mappings (old → new)
REPO_MAPPINGS:
  "RuneFrameOS": "RuneFrameOS-Platform"
  "RuneFrameOS-Core": "RuneFrameOS-Platform" 
  "RuneFrameOS-Service-Distillara": "RuneFrameOS-Module-Distillara"
  "RuneFrameOS-Service-Hoardwell": "RuneFrameOS-Module-Hoardwell"
  "RuneFrameOS-Service-Mercatrix": "RuneFrameOS-Module-Mercatrix"
  "RuneFrameOS-Service-Tapestry Engine": "RuneFrameOS-Module-TapestryEngine"
  "RuneFrameOS-Infrastructure-Shared": "RuneFrameOS-Infrastructure-Shared"
  # Additional mappings to be specified by user

# Terminology mappings (old → new)
TERMINOLOGY_MAPPINGS:
  # User Role Changes
  "Traveler": "Traveler"
  "players": "Travelers"
  "Traveler": "Traveler"
  "Players": "Travelers"
  "Architect": "Architect"
  "Game Masters": "Architects"
  "Architect": "Architect"
  "GMs": "Architects"
  "Architect": "Architect"
  "Dungeon Masters": "Architects"
  "DM": "Architect"
  "DMs": "Architects"
  
  # Legacy Component Updates
  "Distillara": "Distillara"
  "Distillara": "distillara"
  "RuneFrame OS Platform": "RuneFrame OS Platform"
  "RuneFrame OS Platform": "runeframe-platform"
  "Tapestry Engine": "Tapestry Engine Engine"
  "Tapestry Engine": "Tapestry Engine-engine"
  
  # Platform Terminology
  "RuneFrameOS ecosystem": "RuneFrame OS ecosystem"
  "RuneFrameOS platform": "RuneFrame OS platform"
  
  # Additional mappings to be specified by user

# Directory and file name mappings
DIRECTORY_MAPPINGS:
  "ecosystem/Distillara/": "ecosystem/distillara/"
  "ecosystem/RuneFrame OS Platform/": "ecosystem/platform/"
  "ecosystem/Tapestry Engine/": "ecosystem/Tapestry Engine-engine/"
  "infrastructure/RuneFrame OS Platform/": "infrastructure/platform/"
  # Additional mappings to be specified by user

# Service and API endpoint mappings for Kubernetes/Docker configs
SERVICE_MAPPINGS:
  "Distillara-api": "runeframe-module-distillara-api"
  "hoardwell-api": "runeframe-module-hoardwell-api"
  "mercatrix-api": "runeframe-module-mercatrix-api"
  "Tapestry Engine-api": "runeframe-module-tapestryengine-api"
  "RuneFrame OS Platform-infrastructure": "runeframe-platform-infrastructure"
  # Additional mappings to be specified by user

# Configuration and environment variable mappings
CONFIG_MAPPINGS:
  "distillara_": "DISTILLARA_"
  "PLATFORM_": "PLATFORM_"
  "TAPESTRY_": "TAPESTRY_ENGINE_"
  # Additional mappings to be specified by user
```

---

## 🚀 Phase 1: Planning Phase Complete

### **1.1 Legacy Analysis Results**

Based on `context_use.yaml` analysis, the following legacy concepts have been identified for refactoring:

#### **Legacy Five-Component Model**:
1. **Distillara™** → **Distillara** (spelling change + module structure)
2. **Hoardwell™** → **Hoardwell** (retained in 12-module structure)  
3. **Mercatrix™** → **Mercatrix** (retained in 12-module structure)
4. **RuneFrame OS Platform™** → **RuneFrame OS Platform** (conceptual change)
5. **Tapestry Engine™** → **Tapestry Engine Engine** (renamed + module structure)

#### **Legacy User Terminology**:
- "Traveler" → "Traveler"
- "Architect/Architect/Architect/DM" → "Architect"

#### **Legacy Repository Structure**:
- Monolithic `RuneFrameOS` → Modular `RuneFrameOS-Platform`
- Service-based repos → Module-based repos
- Infrastructure consolidation under platform

---

## 🎯 Phase 2: Execution Plan (Awaiting Approval)

### **Section 1: Pre-Execution Setup**

#### **Step 1.1: Variable Validation**
```bash
# Verify all required variables are populated
- Confirm TARGET_FILES list is complete
- Confirm TARGET_FOLDERS list is complete  
- Validate REPO_MAPPINGS for all affected repositories
- Validate TERMINOLOGY_MAPPINGS for comprehensive coverage
- Verify DIRECTORY_MAPPINGS for folder restructuring
- Confirm SERVICE_MAPPINGS for Kubernetes/Docker configurations
- Validate CONFIG_MAPPINGS for environment variables
```

#### **Step 1.2: Git Branch Creation**
```bash
# Create feature branch across all affected repositories
for repo in $(get_affected_repositories); do
    cd $repo
    git checkout main
    git pull origin main
    git checkout -b feature/creative-refactor
    git push -u origin feature/creative-refactor
done
```

#### **Step 1.3: Backup Creation**
```bash
# Create complete backup before any changes
timestamp=$(date +%Y%m%d_%H%M%S)
backup_dir="./refactor_backup_${timestamp}"
mkdir -p $backup_dir

for target in TARGET_FILES TARGET_FOLDERS; do
    cp -r $target $backup_dir/
done
```

---

### **Section 2: Repository Structure Refactoring**

#### **Step 2.1: Repository Renaming**
```bash
# Execute repository renaming for each mapping in REPO_MAPPINGS
for old_repo in "${!REPO_MAPPINGS[@]}"; do
    new_repo="${REPO_MAPPINGS[$old_repo]}"
    
    echo "Renaming repository: $old_repo → $new_repo"
    
    # GitHub CLI repository rename
    gh repo rename $old_repo $new_repo
    
    # Update local clone remotes
    git remote set-url origin "https://github.com/packetalien/${new_repo}.git"
    
    # Update repository references in documentation
    find TARGET_FOLDERS -type f -name "*.md" -o -name "*.yaml" -o -name "*.yml" | \
        xargs sed -i "s|${old_repo}|${new_repo}|g"
done
```

#### **Step 2.2: Directory Structure Updates**
```bash
# Execute directory renaming for each mapping in DIRECTORY_MAPPINGS
for old_dir in "${!DIRECTORY_MAPPINGS[@]}"; do
    new_dir="${DIRECTORY_MAPPINGS[$old_dir]}"
    
    if [ -d "$old_dir" ]; then
        echo "Moving directory: $old_dir → $new_dir"
        mkdir -p "$(dirname "$new_dir")"
        mv "$old_dir" "$new_dir"
        
        # Update references to moved directories
        find TARGET_FOLDERS -type f -name "*.md" -o -name "*.yaml" -o -name "*.yml" | \
            xargs sed -i "s|${old_dir}|${new_dir}|g"
    fi
done
```

---

### **Section 3: Documentation and Configuration Refactoring**

#### **Step 3.1: Target File Processing**
```bash
# Process each file in TARGET_FILES list
for file in "${TARGET_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "Processing file: $file"
        
        # Create backup of original file
        cp "$file" "${file}.backup"
        
        # Apply terminology mappings
        for old_term in "${!TERMINOLOGY_MAPPINGS[@]}"; do
            new_term="${TERMINOLOGY_MAPPINGS[$old_term]}"
            
            # Context-aware replacement (preserve case, word boundaries)
            sed -i "s/\b${old_term}\b/${new_term}/g" "$file"
        done
        
        # Apply service name mappings
        for old_service in "${!SERVICE_MAPPINGS[@]}"; do
            new_service="${SERVICE_MAPPINGS[$old_service]}"
            sed -i "s/${old_service}/${new_service}/g" "$file"
        done
        
        # Apply configuration variable mappings
        for old_config in "${!CONFIG_MAPPINGS[@]}"; do
            new_config="${CONFIG_MAPPINGS[$old_config]}"
            sed -i "s/${old_config}/${new_config}/g" "$file"
        done
    fi
done
```

#### **Step 3.2: Recursive Folder Processing**
```bash
# Process all files in TARGET_FOLDERS recursively
for folder in "${TARGET_FOLDERS[@]}"; do
    if [ -d "$folder" ]; then
        echo "Processing folder: $folder"
        
        # Find all text-based files for processing
        find "$folder" -type f \( \
            -name "*.md" -o \
            -name "*.txt" -o \
            -name "*.yaml" -o \
            -name "*.yml" -o \
            -name "*.json" -o \
            -name "*.toml" -o \
            -name "*.conf" -o \
            -name "*.ini" \
        \) | while read -r file; do
            
            echo "  Processing: $file"
            
            # Apply all mappings to each file
            for old_term in "${!TERMINOLOGY_MAPPINGS[@]}"; do
                new_term="${TERMINOLOGY_MAPPINGS[$old_term]}"
                sed -i "s/\b${old_term}\b/${new_term}/g" "$file"
            done
            
            for old_service in "${!SERVICE_MAPPINGS[@]}"; do
                new_service="${SERVICE_MAPPINGS[$old_service]}"
                sed -i "s/${old_service}/${new_service}/g" "$file"
            done
            
            for old_config in "${!CONFIG_MAPPINGS[@]}"; do
                new_config="${CONFIG_MAPPINGS[$old_config]}"
                sed -i "s/${old_config}/${new_config}/g" "$file"
            done
        done
    fi
done
```

---

### **Section 4: Codebase Refactoring**

#### **Step 4.1: Source Code Processing**
```bash
# Process source code files in code-specific directories
code_extensions=("*.py" "*.js" "*.ts" "*.tsx" "*.jsx" "*.go" "*.java" "*.cpp" "*.c" "*.h")

for folder in "${TARGET_FOLDERS[@]}"; do
    for subdir in "src" "app" "lib" "components" "services" "utils" "core"; do
        code_dir="${folder}/${subdir}"
        
        if [ -d "$code_dir" ]; then
            echo "Processing code directory: $code_dir"
            
            for ext in "${code_extensions[@]}"; do
                find "$code_dir" -name "$ext" | while read -r file; do
                    echo "  Processing code file: $file"
                    
                    # Update code comments
                    for old_term in "${!TERMINOLOGY_MAPPINGS[@]}"; do
                        new_term="${TERMINOLOGY_MAPPINGS[$old_term]}"
                        # Update comments (// and /* */ style)
                        sed -i "s|//.*${old_term}|//.*${new_term}|g" "$file"
                        sed -i "s|/\*.*${old_term}.*\*/|/*.*${new_term}.**/|g" "$file"
                    done
                    
                    # Update string literals
                    for old_term in "${!TERMINOLOGY_MAPPINGS[@]}"; do
                        new_term="${TERMINOLOGY_MAPPINGS[$old_term]}"
                        sed -i "s|\".*${old_term}.*\"|\".*${new_term}.*\"|g" "$file"
                        sed -i "s|'.*${old_term}.*'|'.*${new_term}.*'|g" "$file"
                    done
                    
                    # Update variable names (with caution)
                    sed -i "s/platform_config/platform_config/g" "$file"
                    sed -i "s/platformConfig/platformConfig/g" "$file"
                    sed -i "s/PLATFORM_/PLATFORM_/g" "$file"
                    sed -i "s/distillara_/distillara_/g" "$file"
                    sed -i "s/distillaraConfig/distillaraConfig/g" "$file"
                done
            done
        fi
    done
done
```

#### **Step 4.2: Kubernetes and Docker Configuration Updates**
```bash
# Process Kubernetes manifests and Docker configurations
k8s_files=$(find TARGET_FOLDERS -name "*.yaml" -o -name "*.yml" | grep -E "(k8s|kubernetes|docker|helm)")

for file in $k8s_files; do
    echo "Processing K8s/Docker file: $file"
    
    # Update service names
    for old_service in "${!SERVICE_MAPPINGS[@]}"; do
        new_service="${SERVICE_MAPPINGS[$old_service]}"
        
        # Update service definitions
        sed -i "s/name: ${old_service}/name: ${new_service}/g" "$file"
        sed -i "s/app: ${old_service}/app: ${new_service}/g" "$file"
        sed -i "s/service: ${old_service}/service: ${new_service}/g" "$file"
        
        # Update container names and images
        sed -i "s|image: .*/${old_service}:|image: .*/${new_service}:|g" "$file"
    done
    
    # Update environment variables
    for old_config in "${!CONFIG_MAPPINGS[@]}"; do
        new_config="${CONFIG_MAPPINGS[$old_config]}"
        sed -i "s/name: ${old_config}/name: ${new_config}/g" "$file"
        sed -i "s|${old_config}|${new_config}|g" "$file"
    done
done
```

#### **Step 4.3: API Endpoint and Route Updates**
```bash
# Identify and update API endpoints in configuration files
api_files=$(find TARGET_FOLDERS -name "*.json" -o -name "*.yaml" -o -name "*.yml" | \
           xargs grep -l "api\|endpoint\|route" 2>/dev/null)

for file in $api_files; do
    echo "Processing API configuration: $file"
    
    # Update API endpoint paths
    sed -i "s|/api/Distillara/|/api/distillara/|g" "$file"
    sed -i "s|/api/RuneFrame OS Platform/|/api/platform/|g" "$file"
    sed -i "s|/api/Tapestry Engine/|/api/Tapestry Engine-engine/|g" "$file"
    
    # Update service discovery endpoints
    for old_service in "${!SERVICE_MAPPINGS[@]}"; do
        new_service="${SERVICE_MAPPINGS[$old_service]}"
        sed -i "s|http://${old_service}|http://${new_service}|g" "$file"
        sed -i "s|https://${old_service}|https://${new_service}|g" "$file"
    done
done
```

---

### **Section 5: Special File Processing**

#### **Step 5.1: Context Use YAML Complete Overhaul**
```bash
# Special handling for context_use.yaml - complete rewrite needed
echo "Performing complete overhaul of context_use.yaml"

# Backup original
cp context_use.yaml context_use.yaml.legacy

# Update core project information
sed -i 's/name: "RuneFrameOS"/name: "RuneFrame OS"/' context_use.yaml
sed -i 's/description: "Security-first, privacy-by-design application ecosystem"/description: "Universal TTRPG hub with RuneForge engine"/' context_use.yaml

# Update ecosystem components section
# Replace legacy 5-component model with 12-module model
# This requires detailed manual intervention based on new structure
```

#### **Step 5.2: Ecosystem Overview Document Update**
```bash
# Update ECOSYSTEM_OVERVIEW.md with new 12-module structure
echo "Updating ECOSYSTEM_OVERVIEW.md"

# Replace component architecture diagram
# Update component descriptions
# Add new module descriptions for:
# - BrokeUnicornTavern, Cryptwell, Feastwell, Loreforge
# - RuneWeaver, Scriptoria, TravelersTable, PersonaVault
```

#### **Step 5.3: Corporate Resources Cross-References**
```bash
# Update references to Corporate-Resources repository
echo "Updating Corporate-Resources cross-references"

# Update all references to moved corporate documents
# Ensure policy documents reflect new terminology
# Update compliance matrices with new module structure
```

---

### **Section 6: Post-Execution Verification**

#### **Step 6.1: Syntax and Build Verification**
```bash
echo "Running post-refactor verification checks"

# Run linters on all modified files
for folder in "${TARGET_FOLDERS[@]}"; do
    # YAML/JSON validation
    find "$folder" -name "*.yaml" -o -name "*.yml" | xargs yamllint
    find "$folder" -name "*.json" | xargs jq . >/dev/null
    
    # Markdown validation
    find "$folder" -name "*.md" | xargs markdownlint
done

# Run build scripts if available
if [ -f "scripts/build.sh" ]; then
    echo "Running build verification"
    ./scripts/build.sh --verify-only
fi

# Check for broken internal links
echo "Checking for broken internal links"
find TARGET_FOLDERS -name "*.md" | xargs grep -n "\[.*\](\./" | \
    while read -r link; do
        # Validate that referenced files exist
        file_path=$(echo "$link" | sed -n 's/.*(\.\//\1/p' | sed 's/).*//')
        if [ ! -f "$file_path" ]; then
            echo "BROKEN LINK: $link"
        fi
    done
```

#### **Step 6.2: Change Impact Analysis**
```bash
echo "Generating change impact analysis"

# Count total files modified
modified_files=$(git diff --name-only | wc -l)
echo "Total files modified: $modified_files"

# Generate diff summary
git diff --stat > refactor_changes_summary.txt

# Identify potential breaking changes
echo "Identifying potential breaking changes:"
git diff | grep -E "^-.*[A-Z_]+.*=" | head -20
```

#### **Step 6.3: Generate Comprehensive Refactoring Report**
```bash
echo "Generating final refactoring report"

cat > Creative_Refactor_Summary.md << EOF
# RuneFrame OS Creative Refactoring Summary
## Execution Report - $(date)

### Repository Architecture Changes
$(for old_repo in "${!REPO_MAPPINGS[@]}"; do
    echo "- $old_repo → ${REPO_MAPPINGS[$old_repo]}"
done)

### Terminology Change Log
| Old Term | New Term | Context |
|----------|----------|---------|
$(for old_term in "${!TERMINOLOGY_MAPPINGS[@]}"; do
    echo "| $old_term | ${TERMINOLOGY_MAPPINGS[$old_term]} | User roles and documentation |"
done)

### Files Modified
- Total files processed: $(git diff --name-only | wc -l)
- Documentation files: $(git diff --name-only | grep -c "\.md$")
- Configuration files: $(git diff --name-only | grep -c -E "\.(yaml|yml|json)$")
- Code files: $(git diff --name-only | grep -c -E "\.(py|js|ts|go)$")

### Service and API Changes
$(for old_service in "${!SERVICE_MAPPINGS[@]}"; do
    echo "- $old_service → ${SERVICE_MAPPINGS[$old_service]}"
done)

### Verification Results
- Syntax checks: $(echo "PASSED" if all linting passed)
- Build verification: $(echo "PASSED" if build successful)
- Link validation: $(echo "PASSED" if no broken links)

### Next Steps
1. Review all changes in feature/creative-refactor branch
2. Test all affected systems and integrations
3. Update CI/CD pipelines for new repository structure
4. Communicate changes to all development teams
5. Merge to main branch after approval

EOF
```

---

## ⚠️ Safety and Rollback Procedures

### **Rollback Plan**
```bash
# If refactoring needs to be rolled back
echo "Executing rollback procedure"

# Restore from backup
timestamp=$(ls refactor_backup_* | sort -r | head -1 | sed 's/refactor_backup_//')
cp -r "refactor_backup_${timestamp}/"* .

# Reset Git branch
git checkout main
git branch -D feature/creative-refactor

# Restore repository names (manual GitHub operation required)
```

### **Risk Mitigation**
- All changes isolated to feature branch
- Complete backup created before execution
- Verification checks at each step
- Granular rollback capability
- Manual approval required for critical changes

---

## 🎯 Execution Readiness Checklist

### **Before Execution**:
- [ ] All plan variables populated completely
- [ ] Backup strategy confirmed
- [ ] Team notification completed
- [ ] CI/CD pipeline adjustments planned
- [ ] Rollback procedures tested

### **During Execution**:
- [ ] Monitor each step for errors
- [ ] Validate changes incrementally
- [ ] Document any deviations from plan
- [ ] Maintain communication log

### **After Execution**:
- [ ] Complete verification checks passed
- [ ] Documentation updated
- [ ] Team training completed
- [ ] Monitoring adjusted for new structure

---

## 📞 Execution Commands

**Status**: READY FOR EXECUTION  
**Awaiting**: Populated plan variables and execution approval  
**Branch**: feature/creative-refactor (to be created)  
**Estimated Duration**: 4-6 hours for complete refactoring  
**Risk Level**: Medium (comprehensive changes with robust rollback)  

---

**To execute this plan, provide the populated PLAN_VARIABLES and issue the command:**
```
@cursor Please execute the 'Refactoring_Execution_Plan.md' using the provided variables.
```

---

*This refactoring execution plan ensures systematic, safe, and comprehensive transformation of the RuneFrame OS ecosystem to align with the new creative direction while maintaining operational integrity and rollback capability.*
