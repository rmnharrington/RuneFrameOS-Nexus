---
template_type: "distilera_reference"
template_name: "Distilera Data Structure Reference"
version: "1.0.0"
description: "Comprehensive reference template for Distilera's mature alchemy data structures"
usage: "Use this template to understand Distilera's data patterns and align with RuneFrameOS standards"
cnc: "ECOSYSTEM.DISTILERA.REFERENCE"
parent_cnc: "ECOSYSTEM.DISTILERA"
context_awareness:
  spatial_hierarchy: true
  temporal_context: true
  cross_references: true
  machine_readable: true
  human_friendly: true
validation:
  required_cnc: true
  cnc_format: "ECOSYSTEM.COMPONENT.SUBSYSTEM"
  max_depth: 3
data_sources:
  - "distilera-new/alchemy_core.json"
  - "distilera-new/Do_not_touch_ingredient_tiers.json"
  - "distilera-new/distilera-ingredients.txt"
  - "distilera-new/distilera-potions.txt"
  - "distilera-new/distilera-alchemy.txt"
  - "distilera-new/api.md"
---

# Distilera Data Structure Reference Template

## Overview

This template documents the mature data structures and patterns found in Distilera, a comprehensive alchemy simulation platform. The data is well-structured and provides excellent reference material for RuneFrameOS ecosystem integration.

## 1. Core Data Structure Patterns

### 1.1 JSON Configuration Files

**Pattern**: Structured JSON with metadata and nested objects
**Location**: `distilera-new/alchemy_core.json`

```json
{
  "created_by": "Master Alchemist Elyndra Sael",
  "inspired_by": "Arthenius Zaal",
  "difficulty_factors": {
    "ingredient_complexity": true,
    "number_of_ingredients": true,
    "workspace_modifier": true,
    "techniques": true
  },
  "failure_table": {
    "0-5": "Minor setback (reduced potency)",
    "6-10": "Serious failure (unstable potion)",
    "11+": "Catastrophic event (explosion, poisonous fumes)"
  }
}
```

**RuneFrameOS Alignment**:
- ✅ **Underscore naming**: `difficulty_factors`, `workspace_modifier`
- ✅ **Machine-readable**: Structured JSON format
- ✅ **Context-aware**: Creator and inspiration metadata
- ✅ **Validation-ready**: Clear data types and constraints

### 1.2 Tiered Data Structures

**Pattern**: Array-based tier systems with consistent properties
**Location**: `distilera-new/Do_not_touch_ingredient_tiers.json`

```json
[
  {
    "level": 1,
    "rarity": "Common",
    "availability": "Weekly",
    "cost": "1–10 copper",
    "examples": ["Basilwort", "Ironbark Sap"],
    "applications": ["Basic healing potions", "Minor antidotes"]
  }
]
```

**RuneFrameOS Alignment**:
- ✅ **Consistent structure**: Each tier has same properties
- ✅ **Scalable design**: Easy to extend with new tiers
- ✅ **Clear categorization**: Level, rarity, availability, cost
- ✅ **Practical examples**: Real-world applications listed

## 2. Ingredient Data Structure

### 2.1 Ingredient Template Pattern

**Source**: `distilera-new/distilera-ingredients.txt`
**Pattern**: Comprehensive ingredient documentation with structured sections

```markdown
# Ingredient Name
Name: [Scientific Name]
Common Name: [Common Name]
Scientific Name: [Scientific Name]
Other Names: [Alternative Names]

## Classification
Type: [Plant/Animal/Mineral/etc.]
Source: [Where/how it's found]
Physical Form: [Appearance and state]

## Rarity Level
Rarity Level: [1-6 scale]

## Precise Description
[Detailed physical description]

## Harvesting Details
Frequency: [How often available]
Environmental Conditions: [Where it grows]
Harvesting Method: [How to collect]
Associated Risks: [Dangers involved]
Harvest Yield: [Amount per harvest]

## Preparation
Steps Required:
- [Preparation method 1]
- [Preparation method 2]

## Primary Properties
Elemental Alignment: [Elements involved]
Potency: [Strength level]
Unique Effects: [Special properties]

## Applications
[Category]: [Specific uses]
[Category]: [Specific uses]

## Effects on Subjects
Immediate Effects: [What happens when used]
Long-Term Effects: [Extended exposure effects]
Toxicity and Side Effects: [Risks and dangers]

## Value
Market Price: [Cost information]
```

**RuneFrameOS Alignment**:
- ✅ **Structured sections**: Clear hierarchy and organization
- ✅ **Comprehensive data**: All necessary information included
- ✅ **Practical focus**: Real-world applications and effects
- ✅ **Safety considerations**: Toxicity and side effects documented

## 3. Potion Data Structure

### 3.1 Potion Template Pattern

**Source**: `distilera-new/distilera-potions.txt`
**Pattern**: Detailed potion recipes with lore and mechanics

```markdown
# Potion Name
Description: [What the potion does]
Appearance and Color: [Visual description]
Storage Requirements: [How to store safely]
Image Prompt for AI Generator: [AI art prompt]

## Ingredients
[Ingredient Name] (Level [X]) – [Quantity]
[Ingredient Name] (Level [X]) – [Quantity]

## Technical Specifications
Complexity Level: [Difficulty number]
Rarity Level: [1-6 scale]
Average Cost: [Price information]
Duration of Effect: [How long it lasts]
Side Effects and Risks: [Dangers involved]
Usage: [How to use]

## Lore
[Background story and history]

## Case Studies or Observations
Studied By: [Researcher name]
Findings: [Research results]

## Quotes
"[Quote]" — [Speaker name]
```

**RuneFrameOS Alignment**:
- ✅ **Rich metadata**: Appearance, storage, AI prompts
- ✅ **Technical specifications**: Clear mechanical data
- ✅ **Lore integration**: Story and background included
- ✅ **Research tracking**: Case studies and observations

## 4. API Structure Patterns

### 4.1 Authentication Pattern

**Source**: `distilera-new/api.md`
**Pattern**: JWT-based authentication with comprehensive user management

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "username": "alchemist",
      "email": "alchemist@example.com",
      "role": "player",
      "stats": {
        "INT": 10,
        "RES": 10,
        "APL": 10
      }
    },
    "tokens": {
      "accessToken": "jwt_token",
      "refreshToken": "refresh_token"
    }
  }
}
```

**RuneFrameOS Alignment**:
- ✅ **Consistent response format**: Success/message/data structure
- ✅ **User stats system**: INT/RES/APL character attributes
- ✅ **Token management**: Access and refresh tokens
- ✅ **Role-based access**: Player/admin roles

### 4.2 Error Handling Pattern

**Pattern**: Structured error responses with context

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

## 5. Alchemy Core Mechanics

### 5.1 Difficulty System

**Pattern**: Multi-factor difficulty calculation

```json
{
  "difficulty_factors": {
    "ingredient_complexity": true,
    "number_of_ingredients": true,
    "workspace_modifier": true,
    "techniques": true
  },
  "workspace_modifiers": [
    { "type": "Field Workspace", "modifier": 5 },
    { "type": "Basic Workshop", "modifier": 3 },
    { "type": "Advanced Laboratory", "modifier": 0 },
    { "type": "Master's Laboratory", "modifier": -5 }
  ]
}
```

### 5.2 Technique System

**Pattern**: Named techniques with effects and tradeoffs

```json
{
  "name": "Infusion",
  "effect": "Reduces ingredient complexity by 1 per rare ingredient",
  "notes": "One-time use"
}
```

## 6. RuneFrameOS Integration Recommendations

### 6.1 Data Standardization

**Current Distilera Patterns**:
- ✅ Consistent JSON structure
- ✅ Clear property naming
- ✅ Comprehensive metadata
- ✅ Practical application focus

**RuneFrameOS Enhancements**:
- 🔄 **CNC Integration**: Add spatial coordinates to all entities
- 🔄 **Version Control**: Add template versioning metadata
- 🔄 **Cross-References**: Link ingredients to potions and vice versa
- 🔄 **Machine Learning**: Structure data for AI processing

### 6.2 Template Evolution

**Recommended Structure**:
```yaml
---
template_type: "alchemy_ingredient"
template_name: "Ingredient Template"
version: "1.0.0"
cnc: "ECOSYSTEM.DISTILERA.INGREDIENT"
metadata:
  created_by: "Master Alchemist Elyndra Sael"
  inspired_by: "Arthenius Zaal"
  rarity_level: 1
  elemental_alignment: ["Earth", "Fire"]
validation:
  required_fields: ["name", "rarity_level", "effects"]
  max_rarity_level: 6
---
```

### 6.3 Database Schema Alignment

**PostgreSQL Integration**:
```sql
-- Ingredients table
CREATE TABLE distilera.ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    scientific_name VARCHAR(255),
    rarity_level INTEGER CHECK (rarity_level >= 1 AND rarity_level <= 6),
    elemental_alignment JSONB,
    effects JSONB,
    harvesting_details JSONB,
    preparation_steps JSONB,
    market_price JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Potions table
CREATE TABLE distilera.potions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    complexity_level INTEGER,
    rarity_level INTEGER CHECK (rarity_level >= 1 AND rarity_level <= 6),
    ingredients JSONB,
    effects JSONB,
    lore TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 7. Quality Assessment

### 7.1 Strengths
- ✅ **Comprehensive data**: 180+ ingredients, 150+ potions
- ✅ **Rich lore**: Detailed background and stories
- ✅ **Practical mechanics**: Real game mechanics and effects
- ✅ **Scalable structure**: Easy to extend and modify
- ✅ **AI-ready**: Image prompts and structured data

### 7.2 Integration Opportunities
- 🔄 **RuneFrameOS Standards**: Align with our naming conventions
- 🔄 **CNC System**: Add spatial coordinates for world-building
- 🔄 **Database Migration**: Convert to PostgreSQL schema
- 🔄 **API Enhancement**: Integrate with RuneFrameOS APIs
- 🔄 **Template System**: Create standardized templates

## 8. Next Steps

1. **Extract Core Data**: Convert ingredients and potions to standardized templates
2. **Database Migration**: Create PostgreSQL schemas for all data
3. **API Integration**: Align with RuneFrameOS API standards
4. **Template Creation**: Generate CNC-aware templates for all entities
5. **Documentation Update**: Create comprehensive reference documentation

This template provides a foundation for integrating Distilera's mature data structures into the RuneFrameOS ecosystem while maintaining the rich lore and practical mechanics that make it valuable.

