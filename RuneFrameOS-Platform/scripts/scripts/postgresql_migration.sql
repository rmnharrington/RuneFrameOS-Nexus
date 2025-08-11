-- PostgreSQL Migration Script for CNC-Optimized Distillara Data
-- This script creates the database schema and indexes for optimal performance

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS postgis;

-- Create Distillara schema
CREATE SCHEMA IF NOT EXISTS Distillara;

-- Create ingredients table with CNC optimization
CREATE TABLE Distillara.ingredients (
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

-- Create potions table with CNC optimization
CREATE TABLE Distillara.potions (
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

-- Create techniques table
CREATE TABLE Distillara.techniques (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cnc VARCHAR(255) NOT NULL UNIQUE,
    
    -- Core properties
    name VARCHAR(255) NOT NULL,
    effect TEXT,
    tradeoff TEXT,
    notes TEXT,
    
    -- JSONB for flexible data
    properties JSONB,
    
    -- Metadata
    created_by VARCHAR(255),
    inspired_by VARCHAR(255),
    version VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create alchemy core table
CREATE TABLE Distillara.alchemy_core (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cnc VARCHAR(255) NOT NULL UNIQUE,
    
    -- Core properties
    difficulty_factors JSONB,
    failure_table JSONB,
    workspace_modifiers JSONB,
    techniques JSONB,
    difficulty_scale JSONB,
    
    -- Metadata
    created_by VARCHAR(255),
    inspired_by VARCHAR(255),
    version VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ingredient tiers table
CREATE TABLE Distillara.ingredient_tiers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cnc VARCHAR(255) NOT NULL UNIQUE,
    
    -- Core properties
    level INTEGER NOT NULL,
    rarity VARCHAR(100),
    availability VARCHAR(100),
    cost VARCHAR(100),
    examples TEXT[],
    applications TEXT[],
    
    -- Metadata
    created_by VARCHAR(255),
    inspired_by VARCHAR(255),
    version VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Performance indexes for ingredients table
CREATE INDEX idx_ingredients_rarity ON Distillara.ingredients(rarity_level);
CREATE INDEX idx_ingredients_elemental ON Distillara.ingredients USING GIN(elemental_alignment);
CREATE INDEX idx_ingredients_spatial ON Distillara.ingredients USING GIST(coordinates);
CREATE INDEX idx_ingredients_properties ON Distillara.ingredients USING GIN(properties);
CREATE INDEX idx_ingredients_effects ON Distillara.ingredients USING GIN(effects);
CREATE INDEX idx_ingredients_cross_refs ON Distillara.ingredients USING GIN(related_ingredients);
CREATE INDEX idx_ingredients_used_in_potions ON Distillara.ingredients USING GIN(used_in_potions);
CREATE INDEX idx_ingredients_techniques ON Distillara.ingredients USING GIN(techniques);
CREATE INDEX idx_ingredients_cnc ON Distillara.ingredients(cnc);
CREATE INDEX idx_ingredients_name ON Distillara.ingredients(name);

-- Performance indexes for potions table
CREATE INDEX idx_potions_rarity ON Distillara.potions(rarity_level);
CREATE INDEX idx_potions_complexity ON Distillara.potions(complexity_level);
CREATE INDEX idx_potions_spatial ON Distillara.potions USING GIST(coordinates);
CREATE INDEX idx_potions_technical_specs ON Distillara.potions USING GIN(technical_specs);
CREATE INDEX idx_potions_appearance ON Distillara.potions USING GIN(appearance);
CREATE INDEX idx_potions_ingredients ON Distillara.potions USING GIN(ingredients);
CREATE INDEX idx_potions_techniques ON Distillara.potions USING GIN(techniques);
CREATE INDEX idx_potions_cnc ON Distillara.potions(cnc);
CREATE INDEX idx_potions_name ON Distillara.potions(name);

-- Performance indexes for techniques table
CREATE INDEX idx_techniques_name ON Distillara.techniques(name);
CREATE INDEX idx_techniques_properties ON Distillara.techniques USING GIN(properties);
CREATE INDEX idx_techniques_cnc ON Distillara.techniques(cnc);

-- Performance indexes for alchemy_core table
CREATE INDEX idx_alchemy_core_difficulty_factors ON Distillara.alchemy_core USING GIN(difficulty_factors);
CREATE INDEX idx_alchemy_core_failure_table ON Distillara.alchemy_core USING GIN(failure_table);
CREATE INDEX idx_alchemy_core_workspace_modifiers ON Distillara.alchemy_core USING GIN(workspace_modifiers);
CREATE INDEX idx_alchemy_core_techniques ON Distillara.alchemy_core USING GIN(techniques);
CREATE INDEX idx_alchemy_core_difficulty_scale ON Distillara.alchemy_core USING GIN(difficulty_scale);
CREATE INDEX idx_alchemy_core_cnc ON Distillara.alchemy_core(cnc);

-- Performance indexes for ingredient_tiers table
CREATE INDEX idx_ingredient_tiers_level ON Distillara.ingredient_tiers(level);
CREATE INDEX idx_ingredient_tiers_rarity ON Distillara.ingredient_tiers(rarity);
CREATE INDEX idx_ingredient_tiers_examples ON Distillara.ingredient_tiers USING GIN(examples);
CREATE INDEX idx_ingredient_tiers_applications ON Distillara.ingredient_tiers USING GIN(applications);
CREATE INDEX idx_ingredient_tiers_cnc ON Distillara.ingredient_tiers(cnc);

-- Create views for common queries
CREATE VIEW Distillara.ingredients_by_region AS
SELECT 
    id,
    name,
    rarity_level,
    elemental_alignment,
    region,
    sub_region,
    coordinates
FROM Distillara.ingredients
WHERE region IS NOT NULL;

CREATE VIEW Distillara.potions_by_complexity AS
SELECT 
    id,
    name,
    complexity_level,
    rarity_level,
    region,
    ingredients
FROM Distillara.potions
WHERE complexity_level IS NOT NULL;

CREATE VIEW Distillara.ingredient_cross_references AS
SELECT 
    i.id as ingredient_id,
    i.name as ingredient_name,
    i.used_in_potions,
    i.related_ingredients,
    i.techniques
FROM Distillara.ingredients i
WHERE array_length(i.used_in_potions, 1) > 0 
   OR array_length(i.related_ingredients, 1) > 0
   OR array_length(i.techniques, 1) > 0;

-- Create functions for common operations
CREATE OR REPLACE FUNCTION Distillara.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic updated_at
CREATE TRIGGER update_ingredients_updated_at
    BEFORE UPDATE ON Distillara.ingredients
    FOR EACH ROW
    EXECUTE FUNCTION Distillara.update_updated_at();

CREATE TRIGGER update_potions_updated_at
    BEFORE UPDATE ON Distillara.potions
    FOR EACH ROW
    EXECUTE FUNCTION Distillara.update_updated_at();

CREATE TRIGGER update_techniques_updated_at
    BEFORE UPDATE ON Distillara.techniques
    FOR EACH ROW
    EXECUTE FUNCTION Distillara.update_updated_at();

CREATE TRIGGER update_alchemy_core_updated_at
    BEFORE UPDATE ON Distillara.alchemy_core
    FOR EACH ROW
    EXECUTE FUNCTION Distillara.update_updated_at();

CREATE TRIGGER update_ingredient_tiers_updated_at
    BEFORE UPDATE ON Distillara.ingredient_tiers
    FOR EACH ROW
    EXECUTE FUNCTION Distillara.update_updated_at();

-- Create function to find ingredients by spatial proximity
CREATE OR REPLACE FUNCTION Distillara.find_ingredients_near(
    lat DOUBLE PRECISION,
    lng DOUBLE PRECISION,
    radius_meters INTEGER DEFAULT 1000
)
RETURNS TABLE(
    id UUID,
    name VARCHAR(255),
    rarity_level INTEGER,
    region VARCHAR(100),
    distance_meters DOUBLE PRECISION
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        i.id,
        i.name,
        i.rarity_level,
        i.region,
        ST_Distance(
            ST_SetSRID(ST_MakePoint(i.coordinates[0], i.coordinates[1]), 4326),
            ST_SetSRID(ST_MakePoint(lng, lat), 4326)
        ) * 111000 as distance_meters
    FROM Distillara.ingredients i
    WHERE ST_DWithin(
        ST_SetSRID(ST_MakePoint(i.coordinates[0], i.coordinates[1]), 4326),
        ST_SetSRID(ST_MakePoint(lng, lat), 4326),
        radius_meters
    )
    ORDER BY distance_meters;
END;
$$ LANGUAGE plpgsql;

-- Create function to find potions by ingredient
CREATE OR REPLACE FUNCTION Distillara.find_potions_by_ingredient(
    ingredient_name VARCHAR(255)
)
RETURNS TABLE(
    id UUID,
    name VARCHAR(255),
    complexity_level INTEGER,
    rarity_level INTEGER,
    ingredients JSONB
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.name,
        p.complexity_level,
        p.rarity_level,
        p.ingredients
    FROM Distillara.potions p
    WHERE p.ingredients::text ILIKE '%' || ingredient_name || '%';
END;
$$ LANGUAGE plpgsql;

-- Create function to get ingredient statistics by region
CREATE OR REPLACE FUNCTION Distillara.get_ingredient_stats_by_region()
RETURNS TABLE(
    region VARCHAR(100),
    total_ingredients INTEGER,
    avg_rarity_level NUMERIC,
    common_elements TEXT[]
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        i.region,
        COUNT(*) as total_ingredients,
        AVG(i.rarity_level::NUMERIC) as avg_rarity_level,
        array_agg(DISTINCT unnest(i.elemental_alignment)) as common_elements
    FROM Distillara.ingredients i
    WHERE i.region IS NOT NULL
    GROUP BY i.region
    ORDER BY total_ingredients DESC;
END;
$$ LANGUAGE plpgsql;

-- Grant permissions (adjust as needed)
GRANT USAGE ON SCHEMA Distillara TO runeframeos_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA Distillara TO runeframeos_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA Distillara TO runeframeos_user;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA Distillara TO runeframeos_user;

-- Insert sample data for testing (optional)
INSERT INTO Distillara.alchemy_core (cnc, created_by, inspired_by, version, difficulty_factors, failure_table, workspace_modifiers, techniques, difficulty_scale) 
VALUES (
    'ECOSYSTEM.Distillara.CORE.ALCHEMY',
    'Master Alchemist Elyndra Sael',
    'Arthenius Zaal',
    '1.0.0',
    '{"ingredient_complexity": true, "number_of_ingredients": true, "workspace_modifier": true, "techniques": true}'::jsonb,
    '{"0-5": "Minor setback (reduced potency)", "6-10": "Serious failure (unstable potion)", "11+": "Catastrophic event (explosion, poisonous fumes)"}'::jsonb,
    '[{"type": "Field Workspace", "modifier": 5}, {"type": "Basic Workshop", "modifier": 3}, {"type": "Advanced Laboratory", "modifier": 0}, {"type": "Master''s Laboratory", "modifier": -5}]'::jsonb,
    '[{"name": "Infusion", "effect": "Reduces ingredient complexity by 1 per rare ingredient", "notes": "One-time use"}]'::jsonb,
    '{"Beginner": 10, "Intermediate": 20, "Master": 30}'::jsonb
);

-- Create indexes for performance monitoring
CREATE INDEX CONCURRENTLY idx_ingredients_created_at ON Distillara.ingredients(created_at);
CREATE INDEX CONCURRENTLY idx_potions_created_at ON Distillara.potions(created_at);

-- Add comments for documentation
COMMENT ON SCHEMA Distillara IS 'Distillara alchemy system with CNC optimization';
COMMENT ON TABLE Distillara.ingredients IS 'Alchemy ingredients with spatial coordinates and cross-references';
COMMENT ON TABLE Distillara.potions IS 'Alchemy potions with ingredient relationships and spatial context';
COMMENT ON TABLE Distillara.techniques IS 'Alchemy techniques and methods';
COMMENT ON TABLE Distillara.alchemy_core IS 'Core alchemy system configuration';
COMMENT ON TABLE Distillara.ingredient_tiers IS 'Ingredient rarity and availability tiers';

COMMENT ON COLUMN Distillara.ingredients.cnc IS 'Celestial Navigation Code for spatial hierarchy';
COMMENT ON COLUMN Distillara.ingredients.coordinates IS 'Spatial coordinates for location-based queries';
COMMENT ON COLUMN Distillara.ingredients.elemental_alignment IS 'Array of elemental alignments for efficient querying';

-- Performance monitoring queries
-- Query to check index usage
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes 
WHERE schemaname = 'Distillara'
ORDER BY idx_scan DESC;

-- Query to check table sizes
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables 
WHERE schemaname = 'Distillara'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

