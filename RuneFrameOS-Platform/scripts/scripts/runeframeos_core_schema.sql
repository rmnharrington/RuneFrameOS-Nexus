-- RuneFrameOS Core Database Schema
-- PostgreSQL 15+ initialization script for RuneFrameOS Core applications

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create schemas for RuneFrameOS Core components
CREATE SCHEMA IF NOT EXISTS Distillara;
CREATE SCHEMA IF NOT EXISTS hoardwell;
CREATE SCHEMA IF NOT EXISTS Tapestry Engine;
CREATE SCHEMA IF NOT EXISTS mercatrix;
CREATE SCHEMA IF NOT EXISTS shared;
CREATE SCHEMA IF NOT EXISTS veridicus;

-- Create application user for RuneFrameOS Core
CREATE USER runeframeos_core WITH PASSWORD 'runeframeos_core_secure_2025';

-- Grant permissions to schemas
GRANT CONNECT ON DATABASE runeframeos_core TO runeframeos_core;
GRANT USAGE ON SCHEMA Distillara, hoardwell, Tapestry Engine, mercatrix, shared, veridicus TO runeframeos_core;
GRANT CREATE ON SCHEMA Distillara, hoardwell, Tapestry Engine, mercatrix, shared, veridicus TO runeframeos_core;

-- ========================================
-- Distillara SCHEMA (Alchemy Simulation Platform)
-- ========================================

-- Users and Authentication
CREATE TABLE Distillara.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'Traveler' CHECK (role IN ('Traveler', 'alchemist', 'master', 'admin')),
    stats JSONB DEFAULT '{"INT": 10, "RES": 10, "APL": 10, "level": 1}',
    profile JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Alchemy Formulas and Recipes
CREATE TABLE Distillara.formulas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    ingredients JSONB NOT NULL,
    process JSONB NOT NULL,
    difficulty_level INTEGER DEFAULT 1 CHECK (difficulty_level BETWEEN 1 AND 10),
    required_stats JSONB DEFAULT '{"INT": 0, "RES": 0, "APL": 0}',
    success_rate DECIMAL(5,2) DEFAULT 50.00,
    created_by UUID REFERENCES Distillara.users(id),
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Sessions and Progress
CREATE TABLE Distillara.user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES Distillara.users(id) ON DELETE CASCADE,
    session_data JSONB DEFAULT '{}',
    current_formula_id UUID REFERENCES Distillara.formulas(id),
    progress JSONB DEFAULT '{}',
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    success BOOLEAN,
    result JSONB
);

-- ========================================
-- HOARDWELL SCHEMA (Multi-Agent Communication Platform)
-- ========================================

-- Inventory and Asset Management
CREATE TABLE hoardwell.inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID REFERENCES Distillara.users(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    item_type VARCHAR(50) NOT NULL,
    quantity INTEGER DEFAULT 0 CHECK (quantity >= 0),
    metadata JSONB DEFAULT '{}',
    location JSONB,
    rarity VARCHAR(20) DEFAULT 'common' CHECK (rarity IN ('common', 'uncommon', 'rare', 'epic', 'legendary')),
    value DECIMAL(10,2) DEFAULT 0.00,
    tradeable BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Communication Channels and Messages
CREATE TABLE hoardwell.channels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    channel_type VARCHAR(30) DEFAULT 'public' CHECK (channel_type IN ('public', 'private', 'guild', 'system')),
    metadata JSONB DEFAULT '{}',
    created_by UUID REFERENCES Distillara.users(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE hoardwell.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    channel_id UUID REFERENCES hoardwell.channels(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES Distillara.users(id),
    content TEXT NOT NULL,
    message_type VARCHAR(20) DEFAULT 'text' CHECK (message_type IN ('text', 'system', 'trade', 'formula')),
    metadata JSONB DEFAULT '{}',
    reply_to UUID REFERENCES hoardwell.messages(id),
    is_edited BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- Tapestry Engine SCHEMA (World-Building Engine)
-- ========================================

-- Worlds and Realms with CNC Integration
CREATE TABLE Tapestry Engine.worlds (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    cnc_coordinates JSONB NOT NULL, -- Celestial Navigation Code coordinates
    world_type VARCHAR(50) DEFAULT 'realm',
    metadata JSONB DEFAULT '{}',
    is_public BOOLEAN DEFAULT FALSE,
    created_by UUID REFERENCES Distillara.users(id),
    parent_world_id UUID REFERENCES Tapestry Engine.worlds(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Locations within Worlds
CREATE TABLE Tapestry Engine.locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    world_id UUID REFERENCES Tapestry Engine.worlds(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    coordinates JSONB,
    location_type VARCHAR(50) DEFAULT 'area',
    properties JSONB DEFAULT '{}',
    is_accessible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Characters and NPCs
CREATE TABLE Tapestry Engine.characters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    world_id UUID REFERENCES Tapestry Engine.worlds(id),
    location_id UUID REFERENCES Tapestry Engine.locations(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    character_type VARCHAR(30) DEFAULT 'npc' CHECK (character_type IN ('Traveler', 'npc', 'companion', 'entity')),
    stats JSONB DEFAULT '{}',
    inventory JSONB DEFAULT '[]',
    relationships JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES Distillara.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- MERCATRIX SCHEMA (Economic Foundation Engine)
-- ========================================

-- Economic Systems and Markets
CREATE TABLE mercatrix.markets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    world_id UUID REFERENCES Tapestry Engine.worlds(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    market_type VARCHAR(50) DEFAULT 'general',
    base_currency VARCHAR(20) DEFAULT 'gold',
    exchange_rates JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trading and Transactions
CREATE TABLE mercatrix.transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    market_id UUID REFERENCES mercatrix.markets(id),
    buyer_id UUID REFERENCES Distillara.users(id),
    seller_id UUID REFERENCES Distillara.users(id),
    item_id UUID REFERENCES hoardwell.inventory(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price_per_unit DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    currency VARCHAR(20) DEFAULT 'gold',
    transaction_type VARCHAR(30) DEFAULT 'trade' CHECK (transaction_type IN ('trade', 'auction', 'direct')),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled', 'failed')),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- ========================================
-- VERIDICUS SCHEMA (Data Provenance and Attestation)
-- ========================================

-- Data Provenance Tracking
CREATE TABLE veridicus.data_lineage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type VARCHAR(50) NOT NULL, -- 'user', 'formula', 'transaction', etc.
    entity_id UUID NOT NULL,
    action VARCHAR(50) NOT NULL, -- 'created', 'updated', 'deleted', 'accessed'
    actor_id UUID REFERENCES Distillara.users(id),
    data_hash VARCHAR(64), -- SHA-256 hash of the data
    previous_hash VARCHAR(64), -- Previous state hash for chain integrity
    metadata JSONB DEFAULT '{}',
    attestation JSONB DEFAULT '{}', -- Digital signatures and verification data
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Security Events and Audit Log
CREATE TABLE veridicus.security_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type VARCHAR(50) NOT NULL,
    severity VARCHAR(20) DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'error', 'critical')),
    source VARCHAR(100) NOT NULL,
    description TEXT,
    user_id UUID REFERENCES Distillara.users(id),
    ip_address INET,
    user_agent TEXT,
    metadata JSONB DEFAULT '{}',
    resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- SHARED SCHEMA (Common Utilities)
-- ========================================

-- Application Configuration
CREATE TABLE shared.config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(100) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    updated_by UUID REFERENCES Distillara.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System Notifications
CREATE TABLE shared.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipient_id UUID REFERENCES Distillara.users(id),
    title VARCHAR(255) NOT NULL,
    content TEXT,
    notification_type VARCHAR(30) DEFAULT 'info',
    priority INTEGER DEFAULT 1 CHECK (priority BETWEEN 1 AND 5),
    read_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- INDEXES FOR PERFORMANCE
-- ========================================

-- Distillara indexes
CREATE INDEX idx_distilera_users_email ON Distillara.users(email);
CREATE INDEX idx_distilera_users_username ON Distillara.users(username);
CREATE INDEX idx_distilera_users_active ON Distillara.users(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_distilera_formulas_public ON Distillara.formulas(is_public) WHERE is_public = TRUE;
CREATE INDEX idx_distilera_formulas_creator ON Distillara.formulas(created_by);

-- Hoardwell indexes
CREATE INDEX idx_hoardwell_inventory_owner ON hoardwell.inventory(owner_id);
CREATE INDEX idx_hoardwell_inventory_type ON hoardwell.inventory(item_type);
CREATE INDEX idx_hoardwell_messages_channel ON hoardwell.messages(channel_id);
CREATE INDEX idx_hoardwell_messages_sender ON hoardwell.messages(sender_id);
CREATE INDEX idx_hoardwell_messages_created ON hoardwell.messages(created_at);

-- Tapestry Engine indexes
CREATE INDEX idx_tapestry_worlds_public ON Tapestry Engine.worlds(is_public) WHERE is_public = TRUE;
CREATE INDEX idx_tapestry_worlds_creator ON Tapestry Engine.worlds(created_by);
CREATE INDEX idx_tapestry_locations_world ON Tapestry Engine.locations(world_id);
CREATE INDEX idx_tapestry_characters_world ON Tapestry Engine.characters(world_id);
CREATE INDEX idx_tapestry_characters_location ON Tapestry Engine.characters(location_id);

-- Mercatrix indexes
CREATE INDEX idx_mercatrix_markets_world ON mercatrix.markets(world_id);
CREATE INDEX idx_mercatrix_transactions_market ON mercatrix.transactions(market_id);
CREATE INDEX idx_mercatrix_transactions_buyer ON mercatrix.transactions(buyer_id);
CREATE INDEX idx_mercatrix_transactions_seller ON mercatrix.transactions(seller_id);
CREATE INDEX idx_mercatrix_transactions_status ON mercatrix.transactions(status);

-- Veridicus indexes
CREATE INDEX idx_veridicus_lineage_entity ON veridicus.data_lineage(entity_type, entity_id);
CREATE INDEX idx_veridicus_lineage_actor ON veridicus.data_lineage(actor_id);
CREATE INDEX idx_veridicus_lineage_timestamp ON veridicus.data_lineage(timestamp);
CREATE INDEX idx_veridicus_events_type ON veridicus.security_events(event_type);
CREATE INDEX idx_veridicus_events_user ON veridicus.security_events(user_id);
CREATE INDEX idx_veridicus_events_severity ON veridicus.security_events(severity);

-- Shared indexes
CREATE INDEX idx_shared_config_key ON shared.config(key);
CREATE INDEX idx_shared_notifications_recipient ON shared.notifications(recipient_id);
CREATE INDEX idx_shared_notifications_unread ON shared.notifications(recipient_id, read_at) WHERE read_at IS NULL;

-- ========================================
-- GRANT PERMISSIONS TO APPLICATION USER
-- ========================================

-- Grant table permissions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA Distillara TO runeframeos_core;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA hoardwell TO runeframeos_core;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA Tapestry Engine TO runeframeos_core;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA mercatrix TO runeframeos_core;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA veridicus TO runeframeos_core;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA shared TO runeframeos_core;

-- Grant sequence permissions
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA Distillara TO runeframeos_core;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA hoardwell TO runeframeos_core;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA Tapestry Engine TO runeframeos_core;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA mercatrix TO runeframeos_core;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA veridicus TO runeframeos_core;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA shared TO runeframeos_core;

-- ========================================
-- INITIAL DATA
-- ========================================

-- Insert default configuration
INSERT INTO shared.config (key, value, description, is_public) VALUES
('app_version', '"1.0.0"', 'RuneFrameOS Core application version', true),
('maintenance_mode', 'false', 'System maintenance mode flag', true),
('max_inventory_size', '100', 'Maximum inventory size per user', false),
('default_currency', '"gold"', 'Default economic system currency', true),
('session_timeout', '3600', 'User session timeout in seconds', false);

-- Insert default market
INSERT INTO mercatrix.markets (id, name, description, market_type, base_currency) VALUES
(uuid_generate_v4(), 'Central Exchange', 'Main trading hub for all realms', 'central', 'gold');

-- Create default admin user (password: admin_secure_2025)
INSERT INTO Distillara.users (id, email, username, password_hash, role, stats, is_active, email_verified) VALUES
(uuid_generate_v4(), 'admin@runeframeos.com', 'admin', crypt('admin_secure_2025', gen_salt('bf')), 'admin', '{"INT": 100, "RES": 100, "APL": 100, "level": 99}', true, true);

-- ========================================
-- SCHEMA VALIDATION
-- ========================================

-- Verify all tables were created
SELECT 
    schemaname,
    tablename,
    tableowner
FROM pg_tables 
WHERE schemaname IN ('Distillara', 'hoardwell', 'Tapestry Engine', 'mercatrix', 'veridicus', 'shared')
ORDER BY schemaname, tablename;

-- Display total table count
SELECT 
    schemaname,
    COUNT(*) as table_count
FROM pg_tables 
WHERE schemaname IN ('Distillara', 'hoardwell', 'Tapestry Engine', 'mercatrix', 'veridicus', 'shared')
GROUP BY schemaname
ORDER BY schemaname;

COMMIT;
