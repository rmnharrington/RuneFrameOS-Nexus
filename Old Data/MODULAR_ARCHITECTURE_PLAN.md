# RuneFrameOS Modular Architecture Plan

## 🎯 Overview
RuneFrameOS is designed as a **modular RPG platform** that will support multiple gaming systems, not just Echeladon™. Each gaming system will have its own rules for character creation, mechanics, and gameplay while sharing common infrastructure.

## 🏗️ Current Architecture (Good for Modularity)

### 1. Generic CharacterSheet Component
The main `CharacterSheet.tsx` component handles the three core modes without hardcoding any specific gaming system rules:
- **Creation Mode**: Generic character creation flow
- **Viewing Mode**: Static character display
- **Editing Mode**: Character modification interface

### 2. System-Specific Logic Implementation
Echeladon-specific mechanics are implemented as features within the generic framework:
- Game Power Level (GPL) selection
- Stat hierarchy assignment (Four Pillars system)
- Bonus points allocation
- Basic character details (name, player name, description, height, weight)

### 3. Flexible Database Schema
The `characters` table uses JSONB fields that can store different data structures for different gaming systems:
- `stats`: Flexible stat storage (Echeladon uses Four Pillars, other systems may use different structures)
- `hierarchy`: System-specific stat relationships
- `bonus_points`: Gaming system-specific point allocation
- `zeroed_stats`: System-specific stat modifications

## 🔮 Future Gaming Systems Architecture

### 1. System-Specific Components
When adding other systems, create dedicated components:
```
src/components/
├── CharacterSheet.tsx          # Generic framework (current)
├── EcheladonCharacterSheet.tsx # Echeladon-specific implementation
├── DnDCharacterSheet.tsx       # Dungeons & Dragons implementation
├── PathfinderCharacterSheet.tsx # Pathfinder implementation
├── SavageWorldsCharacterSheet.tsx # Savage Worlds implementation
└── ...
```

### 2. Shared Database Infrastructure
All gaming systems will use the same database structure:
- **Consistent Tables**: `users`, `characters`, `user_modules`
- **Flexible Data Storage**: JSONB fields accommodate different character data structures
- **Unified API**: Same CRUD operations for all systems
- **User Management**: Shared authentication and user profiles

### 3. System Detection and Routing
Implement intelligent routing based on gaming system selection:
- **Character Creation**: Route to appropriate system-specific sheet
- **Character Loading**: Detect system from stored data and load correct component
- **Module Management**: Users can enable/disable different gaming systems

### 4. Shared Infrastructure Reuse
Common functionality shared across all gaming systems:
- Save/load operations
- Editing modes and state management
- Basic UI patterns and components
- User authentication and session management
- Character export/import (system-specific formats)
- Database operations and error handling

## 📋 Implementation Guidelines

### Do's ✅
- Keep core components system-agnostic
- Use JSONB for flexible data storage
- Implement shared utility functions
- Maintain consistent user experience patterns
- Design for easy system addition

### Don'ts ❌
- Hardcode gaming system rules in generic components
- Create separate databases for each system
- Duplicate common functionality across systems
- Mix system-specific logic in shared components

## 🚀 Benefits of This Approach

1. **Scalability**: Easy to add new gaming systems
2. **Maintainability**: Common code is centralized and shared
3. **User Experience**: Consistent interface across all systems
4. **Development Efficiency**: Reuse existing infrastructure
5. **Future-Proofing**: Architecture supports unknown future systems

## 🔄 Migration Path

### Phase 1: Current State ✅
- Generic CharacterSheet component
- Echeladon implementation embedded
- Basic modular structure in place

### Phase 2: System Separation
- Extract Echeladon logic to dedicated component
- Implement system detection and routing
- Maintain backward compatibility

### Phase 3: Multi-System Support
- Add new gaming system components
- Implement system-specific character sheets
- Enable user system selection and management

## 📚 Example: Adding a New Gaming System

1. **Create System Component**: `NewSystemCharacterSheet.tsx`
2. **Define Data Structure**: What goes in the JSONB fields
3. **Implement System Logic**: Character creation rules, calculations
4. **Add System Detection**: How to identify this system's characters
5. **Update Routing**: Direct users to correct component
6. **Test Integration**: Ensure it works with existing infrastructure

This modular approach ensures RuneFrameOS can grow to support any gaming system while maintaining a clean, maintainable codebase and consistent user experience.
