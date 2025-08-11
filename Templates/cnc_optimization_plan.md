---
template_type: "cnc_optimization_plan"
template_name: "CNC Integration and PostgreSQL Optimization Plan"
version: "1.0.0"
description: "Comprehensive plan to integrate CNC coordinates and optimize JSON for PostgreSQL performance"
usage: "Reference for migrating Distilera data to CNC-aware, PostgreSQL-optimized format"
cnc: "ECOSYSTEM.DISTILERA.CNC_OPTIMIZATION"
parent_cnc: "ECOSYSTEM.DISTILERA"
data_sources:
  - "distilera-new/alchemy_core.json"
  - "distilera-new/Do_not_touch_ingredient_tiers.json"
  - "distilera-new/distilera-ingredients.txt"
  - "distilera-new/distilera-potions.txt"
  - "RuneFrameOS/templates/distilera_reference_template.md"
---

# CNC Integration and PostgreSQL Optimization Plan

## Overview

This plan addresses the 100% gap in CNC integration while optimizing JSON structures for PostgreSQL performance. The goal is to maintain all existing data while adding spatial coordinates and improving database efficiency.

## 1. Current CNC Gap Analysis

### 1.1 Missing CNC Elements
- ❌ **No spatial coordinates** in any JSON files
- ❌ **No hierarchical context** for entity relationships
- ❌ **No cross-reference linking** between entities
- ❌ **No temporal context** for historical tracking
- ❌ **No machine-readable spatial hierarchy**

### 1.2 PostgreSQL Performance Issues
- ⚠️ **Large JSONB fields** without indexing strategy
- ⚠️ **Nested objects** that don't leverage PostgreSQL strengths
- ⚠️ **Missing UUID relationships** for cross-references
- ⚠️ **No spatial indexing** for location-based queries

## 2. CNC Integration Strategy

### 2.1 CNC Coordinate System for Distilera

**Proposed CNC Structure:**
```
ECOSYSTEM.DISTILERA.INGREDIENT.[SPATIAL_COORDS]
ECOSYSTEM.DISTILERA.POTION.[SPATIAL_COORDS]
ECOSYSTEM.DISTILERA.TECHNIQUE.[SPATIAL_COORDS]
```

**Spatial Coordinate Format:**
```json
{
  "cnc": "ECOSYSTEM.DISTILERA.INGREDIENT.ASHROOT",
  "spatial_coordinates": {
    "galaxy": "MILKY_WAY",
    "sector": "ALPHA_QUADRANT", 
    "system": "SOLAR_SYSTEM",
    "planet": "EARTH",
    "region": "TEMPERATE_FOREST",
    "sub_region": "ROCKY_OUTSKIRTS",
    "coordinates": {
      "latitude": 45.5231,
      "longitude": -122.6765,
      "altitude": 100
    }
  }
}
```

### 2.2 Enhanced JSON Structure

**Current Structure:**
```json
{
  "name": "Ashroot",
  "rarity_level": 1,
  "elemental_alignment": ["Earth", "Fire"]
}
```

**CNC-Optimized Structure:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "cnc": "ECOSYSTEM.DISTILERA.INGREDIENT.ASHROOT",
  "metadata": {
    "created_by": "Master Alchemist Elyndra Sael",
    "inspired_by": "Arthenius Zaal",
    "version": "1.0.0",
    "created_at": "2025-08-08T13:00:00Z",
    "updated_at": "2025-08-08T13:00:00Z"
  },
  "spatial_context": {
    "galaxy": "MILKY_WAY",
    "sector": "ALPHA_QUADRANT",
    "system": "SOLAR_SYSTEM", 
    "planet": "EARTH",
    "region": "TEMPERATE_FOREST",
    "sub_region": "ROCKY_OUTSKIRTS",
    "coordinates": {
      "latitude": 45.5231,
      "longitude": -122.6765,
      "altitude": 100
    },
    "harvesting_location": {
      "biome": "temperate_forest",
      "climate": "moderate",
      "soil_type": "rocky_well_drained"
    }
  },
  "properties": {
    "name": "Ashroot",
    "scientific_name": "Radix stabilis",
    "common_names": ["Groundroot", "Stabilizing Root", "Hearthroot"],
    "rarity_level": 1,
    "elemental_alignment": ["Earth", "Fire"],
    "classification": {
      "type": "Plant",
      "source": "Root of hardy herbaceous plant",
      "physical_form": "Fresh or dried root"
    }
  },
  "effects": {
    "primary_properties": {
      "potency": "Low to Moderate",
      "unique_effects": "Strong grounding properties, neutralizing volatile elements"
    },
    "applications": {
      "healing_alchemy": ["Stabilize wounds from magical burns"],
      "transformation_alchemy": ["Stabilize alchemical processes"],
      "combat_alchemy": ["Stabilize volatile potions"],
      "mystical_alchemy": ["Neutralize magical effects"]
    },
    "subject_effects": {
      "immediate": "Calms body's reaction to toxins",
      "long_term": "Improves resilience against chaotic energies",
      "toxicity": "Generally safe, excessive use may cause drowsiness"
    }
  },
  "harvesting": {
    "frequency": "Weekly",
    "environmental_conditions": "Rocky, dry soils",
    "harvesting_method": "Gentle digging from soil",
    "associated_risks": ["Physical injury", "Predator encounters"],
    "harvest_yield": "1-2 roots per plant per season"
  },
  "preparation": {
    "steps": [
      "Fresh use: Cut into small pieces",
      "Drying: Slow dry in shaded area",
      "Powdering: Grind dried root to fine powder"
    ]
  },
  "value": {
    "market_price": {
      "raw_root": "3 copper coins",
      "dried_root": "5 copper coins per bundle of 3"
    }
  },
  "cross_references": {
    "related_ingredients": [
      "550e8400-e29b-41d4-a716-446655440001",
      "550e8400-e29b-41d4-a716-446655440002"
    ],
    "used_in_potions": [
      "550e8400-e29b-41d4-a716-446655440010",
      "550e8400-e29b-41d4-a716-446655440011"
    ],
    "techniques": [
      "550e8400-e29b-41d4-a716-446655440020"
    ]
  }
}
```

## 3. PostgreSQL Optimization Strategy

### 3.1 Database Schema Design

**Ingredients Table:**
```sql
CREATE TABLE distilera.ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cnc VARCHAR(255) NOT NULL UNIQUE,
    
    -- Core properties (indexed for performance)
    name VARCHAR(255) NOT NULL,
    scientific_name VARCHAR(255),
    rarity_level INTEGER CHECK (rarity_level >= 1 AND rarity_level <= 6),
    elemental_alignment TEXT[], -- Array for efficient querying
    
    -- Spatial data (with spatial indexing)
    galaxy VARCHAR(100),
    sector VARCHAR(100),
    system_name VARCHAR(100),
    planet VARCHAR(100),
    region VARCHAR(100),
    sub_region VARCHAR(100),
    coordinates POINT, -- PostgreSQL spatial type
    
    -- JSONB for flexible data (with GIN indexing)
    properties JSONB,
    effects JSONB,
    harvesting JSONB,
    preparation JSONB,
    value_data JSONB,
    
    -- Cross-references (normalized for performance)
    related_ingredients UUID[],
    used_in_potions UUID[],
    techniques UUID[],
    
    -- Metadata
    created_by VARCHAR(255),
    inspired_by VARCHAR(255),
    version VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Performance indexes
CREATE INDEX idx_ingredients_rarity ON distilera.ingredients(rarity_level);
CREATE INDEX idx_ingredients_elemental ON distilera.ingredients USING GIN(elemental_alignment);
CREATE INDEX idx_ingredients_spatial ON distilera.ingredients USING GIST(coordinates);
CREATE INDEX idx_ingredients_properties ON distilera.ingredients USING GIN(properties);
CREATE INDEX idx_ingredients_effects ON distilera.ingredients USING GIN(effects);
CREATE INDEX idx_ingredients_cross_refs ON distilera.ingredients USING GIN(related_ingredients);
```

**Potions Table:**
```sql
CREATE TABLE distilera.potions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cnc VARCHAR(255) NOT NULL UNIQUE,
    
    -- Core properties
    name VARCHAR(255) NOT NULL,
    complexity_level INTEGER,
    rarity_level INTEGER CHECK (rarity_level >= 1 AND rarity_level <= 6),
    
    -- Spatial data
    galaxy VARCHAR(100),
    sector VARCHAR(100),
    system_name VARCHAR(100),
    planet VARCHAR(100),
    region VARCHAR(100),
    sub_region VARCHAR(100),
    coordinates POINT,
    
    -- JSONB for flexible data
    description TEXT,
    appearance JSONB,
    storage_requirements JSONB,
    technical_specs JSONB,
    lore TEXT,
    case_studies JSONB,
    quotes JSONB,
    
    -- Cross-references
    ingredients JSONB, -- Array of ingredient references
    techniques UUID[],
    
    -- Metadata
    created_by VARCHAR(255),
    inspired_by VARCHAR(255),
    version VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3.2 Performance Optimizations

**1. Spatial Indexing:**
```sql
-- Enable PostGIS extension for spatial queries
CREATE EXTENSION IF NOT EXISTS postgis;

-- Spatial index for location-based queries
CREATE INDEX idx_ingredients_spatial_gist ON distilera.ingredients USING GIST(coordinates);
```

**2. JSONB Indexing:**
```sql
-- GIN indexes for JSONB fields
CREATE INDEX idx_ingredients_properties_gin ON distilera.ingredients USING GIN(properties);
CREATE INDEX idx_ingredients_effects_gin ON distilera.ingredients USING GIN(effects);
CREATE INDEX idx_potions_technical_specs_gin ON distilera.potions USING GIN(technical_specs);
```

**3. Array Indexing:**
```sql
-- GIN indexes for array fields
CREATE INDEX idx_ingredients_elemental_gin ON distilera.ingredients USING GIN(elemental_alignment);
CREATE INDEX idx_ingredients_cross_refs_gin ON distilera.ingredients USING GIN(related_ingredients);
```

## 4. Migration Plan

### 4.1 Phase 1: Data Structure Analysis (Week 1)

**Tasks:**
1. **Inventory all JSON files** in Distilera
2. **Extract spatial context** from existing descriptions
3. **Generate UUIDs** for all entities
4. **Create cross-reference mapping**

**Tools:**
```python
# Spatial context extraction script
def extract_spatial_context(description):
    """Extract spatial coordinates from ingredient descriptions"""
    spatial_keywords = {
        'forest': 'TEMPERATE_FOREST',
        'mountain': 'MOUNTAINOUS_REGION',
        'desert': 'ARID_DESERT',
        'swamp': 'WETLAND_SWAMP'
    }
    # Implementation details...
```

### 4.2 Phase 2: JSON Transformation (Week 2)

**Tasks:**
1. **Transform ingredient data** to CNC-aware format
2. **Transform potion data** to CNC-aware format
3. **Create cross-reference links**
4. **Validate data integrity**

**Transformation Script:**
```python
def transform_ingredient_to_cnc(original_data):
    """Transform ingredient data to CNC-aware format"""
    return {
        "id": generate_uuid(),
        "cnc": f"ECOSYSTEM.DISTILERA.INGREDIENT.{original_data['name'].upper()}",
        "metadata": {
            "created_by": "Master Alchemist Elyndra Sael",
            "inspired_by": "Arthenius Zaal",
            "version": "1.0.0",
            "created_at": datetime.now().isoformat(),
            "updated_at": datetime.now().isoformat()
        },
        "spatial_context": extract_spatial_context(original_data),
        "properties": extract_properties(original_data),
        "effects": extract_effects(original_data),
        # ... rest of structure
    }
```

### 4.3 Phase 3: Database Migration (Week 3)

**Tasks:**
1. **Create PostgreSQL schemas**
2. **Import transformed data**
3. **Create indexes and constraints**
4. **Validate performance**

**Migration Script:**
```sql
-- Batch import script
COPY distilera.ingredients FROM '/path/to/transformed_ingredients.csv' 
WITH (FORMAT csv, HEADER true);

-- Create indexes after import
CREATE INDEX CONCURRENTLY idx_ingredients_rarity ON distilera.ingredients(rarity_level);
```

### 4.4 Phase 4: API Integration (Week 4)

**Tasks:**
1. **Update API endpoints** for CNC-aware queries
2. **Implement spatial queries**
3. **Add cross-reference endpoints**
4. **Performance testing**

## 5. CNC Coordinate Assignment Strategy

### 5.1 Spatial Context Mapping

**Biome-Based Coordinates:**
```json
{
  "temperate_forest": {
    "galaxy": "MILKY_WAY",
    "sector": "ALPHA_QUADRANT",
    "system": "SOLAR_SYSTEM",
    "planet": "EARTH",
    "region": "TEMPERATE_FOREST",
    "coordinates": {"latitude": 45.5231, "longitude": -122.6765}
  },
  "mountainous_region": {
    "galaxy": "MILKY_WAY", 
    "sector": "ALPHA_QUADRANT",
    "system": "SOLAR_SYSTEM",
    "planet": "EARTH",
    "region": "MOUNTAINOUS_REGION",
    "coordinates": {"latitude": 40.7128, "longitude": -74.0060}
  }
}
```

### 5.2 Cross-Reference Strategy

**Ingredient-to-Potion Links:**
```json
{
  "ashroot_id": {
    "used_in_potions": [
      "stabilizing_elixir_id",
      "grounding_tonic_id"
    ],
    "related_ingredients": [
      "ironbark_sap_id",
      "basilwort_id"
    ]
  }
}
```

## 6. Performance Benefits

### 6.1 Query Performance Improvements

**Before (Current JSON):**
```sql
-- Slow: Full table scan for spatial queries
SELECT * FROM ingredients WHERE properties->>'harvesting_location' LIKE '%forest%';
```

**After (CNC-Optimized):**
```sql
-- Fast: Indexed spatial queries
SELECT * FROM ingredients WHERE region = 'TEMPERATE_FOREST';
SELECT * FROM ingredients WHERE coordinates <-> point(45.5231, -122.6765) < 1000;
```

### 6.2 Storage Optimization

**Before:**
- Large JSONB fields without structure
- Redundant data across entities
- No spatial indexing

**After:**
- Normalized spatial coordinates
- Efficient cross-references
- Spatial indexing for location queries
- GIN indexes for JSONB performance

## 7. Implementation Timeline

### Week 1: Analysis and Planning
- [ ] Inventory all Distilera JSON files
- [ ] Extract spatial context from descriptions
- [ ] Design CNC coordinate system
- [ ] Create transformation scripts

### Week 2: Data Transformation
- [ ] Transform ingredient data (180+ entries)
- [ ] Transform potion data (150+ entries)
- [ ] Create cross-reference mappings
- [ ] Validate data integrity

### Week 3: Database Migration
- [ ] Create PostgreSQL schemas
- [ ] Import transformed data
- [ ] Create performance indexes
- [ ] Run performance tests

### Week 4: API Integration
- [ ] Update API endpoints
- [ ] Implement spatial queries
- [ ] Add cross-reference endpoints
- [ ] Performance optimization

## 8. Success Metrics

### 8.1 CNC Integration
- ✅ **100% spatial coverage** for all entities
- ✅ **Cross-reference linking** between all related entities
- ✅ **Machine-readable hierarchy** for AI processing
- ✅ **Temporal context** for historical tracking

### 8.2 PostgreSQL Performance
- 🚀 **50% faster** spatial queries
- 🚀 **75% faster** cross-reference queries
- 🚀 **90% faster** JSONB field searches
- 🚀 **Efficient indexing** for all query patterns

This plan will close the CNC gap while significantly improving PostgreSQL performance and maintaining all existing data integrity.

