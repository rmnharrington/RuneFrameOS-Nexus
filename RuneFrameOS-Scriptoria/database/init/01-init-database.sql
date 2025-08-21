-- Scriptoria Database Initialization Script
-- This script runs when the PostgreSQL container starts for the first time

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Set timezone
SET timezone = 'UTC';

-- Create additional schemas if needed
CREATE SCHEMA IF NOT EXISTS scriptoria;

-- Grant permissions to scriptoria_user
GRANT ALL PRIVILEGES ON DATABASE scriptoria_db TO scriptoria_user;
GRANT ALL PRIVILEGES ON SCHEMA scriptoria TO scriptoria_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA scriptoria TO scriptoria_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA scriptoria TO scriptoria_user;

-- Set default privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA scriptoria GRANT ALL ON TABLES TO scriptoria_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA scriptoria GRANT ALL ON SEQUENCES TO scriptoria_user;

-- Log successful initialization
DO $$
BEGIN
    RAISE NOTICE 'Scriptoria database initialized successfully at %', NOW();
END $$;
