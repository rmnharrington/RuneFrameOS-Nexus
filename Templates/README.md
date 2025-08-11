# RuneFrameOS Templates Directory

This directory contains organized, machine-readable templates for world-building and content creation within the RuneFrameOS ecosystem. All templates are designed to be both human-friendly and AI-processable.

## Directory Structure

```
templates/
├── cosmology/               # Cosmological entities
│   ├── megaverse-template.md
│   ├── universe-template.md
│   └── CNC_Navigation_and_methods.md
├── world-building/          # Geographic and political entities
│   ├── world-template.md
│   ├── region-template.md
│   ├── kingdom-template.md
│   └── economy-template.md
├── characters/              # Individual and group entities
│   ├── npc-template.md
│   ├── historical-figure-template.md
│   └── race-template.md
├── organizations/           # Institutional entities
│   ├── government-organization-template.md
│   ├── religion-template.md
│   └── guild-template.md
├── items/                   # Objects and materials
│   ├── item-template.md
│   └── botanical-research-template.md
├── creatures/               # Living entities
│   └── fauna-template.md
├── galaxy-building/         # Galactic-scale entities
│   └── galaxy_building_draft.md
├── master_templates_file.md # Original master file with citations
├── WorldTemplates.txt      # Original source file
└── README.md               # This file
```

## Template Categories

### Cosmology Templates
- **Megaverse Template**: Top-level cosmological entities with bulk properties and inter-universal travel methods
- **Universe Template**: Individual universes with metaphysical and physical laws defined by resonance signatures

### World-Building Templates
- **World Template**: Complete world descriptions with physical characteristics, history, and unique traits
- **Region Template**: Specific areas within worlds with local culture and geography
- **Kingdom Template**: Political entities with cultural significance and campaign hooks
- **Economy Template**: Economic systems and trade relationships

### Character Templates
- **NPC Template**: Detailed non-player characters with personality and campaign integration
- **Historical Figure Template**: Important historical figures with legacy and impact
- **Race Template**: Intelligent species with cultural and biological characteristics

### Organization Templates
- **Government Organization Template**: Military, law enforcement, and administrative bodies
- **Religion Template**: Religious systems with beliefs, practices, and societal impact
- **Guild Template**: Trade guilds, professional organizations, and secret societies

### Item Templates
- **Item Template**: Magical and technological items with properties and usage
- **Botanical Research Template**: Plants and herbs with alchemical and magical properties

### Creature Templates
- **Fauna Template**: Animals and monsters with behavior and ecological roles

## Template Format

Each template includes:
- **YAML Frontmatter**: Metadata for machine processing including CNC (Celestial Navigation Code)
- **Structured Sections**: Clear headings and bullet points
- **Examples**: Sample content where appropriate
- **Optional Fields**: Clearly marked optional sections
- **Context Awareness**: CNC-based spatial hierarchy and cross-references

## CNC (Celestial Navigation Code) System

The CNC system provides hierarchical spatial context for all templates, enabling both human and machine understanding of relationships between entities. The system has been expanded to support **Megaversal CNC** with cosmological coordinates and resonance signatures.

### CNC Structure
- **Format**: `MEGA.VERSE[κ,λ,μ|ω,ψ,ξ].GALAXY.SECTOR.SYSTEM.BODY`
- **Purpose**: Unique identification and spatial hierarchy tracking across multiple universes
- **Validation**: Each template includes validation rules for CNC format and depth

### CNC Hierarchy Levels

#### **Cosmological Levels**
1. **MEGA**: Megaverse identifier (e.g., "AEON", "YGGDRASIL")
2. **VERSE**: Universe identifier with coordinates (e.g., "U734[117,45,982|1.21,9.8,3.1]")

#### **Bulk Coordinate System**
- **Kappa (κ)**: Bulk Latitude (north-south axis in the Bulk)
- **Lambda (λ)**: Bulk Longitude (east-west axis in the Bulk)
- **Mu (μ)**: Bulk Depth (radial distance from Megaversal Core)

#### **Resonance Signature System**
- **Omega (ω)**: Fundamental Frequency (physical constants and energy levels)
- **Psi (ψ)**: Metaphysical Resonance (magic, psionics, divine forces)
- **Xi (ξ)**: Dimensional Phase (spatial/temporal structure)

#### **Galactic Levels**
3. **GALAXY**: Top-level container (e.g., "MILKY_WAY", "ANDROMEDA")
4. **SECTOR**: Large region within galaxy (e.g., "COREWARD", "ALPHA")
5. **SYSTEM**: Star system (e.g., "SOL", "CYGNUS-X1")
6. **BODY**: Planet, realm, or specific location (e.g., "EARTH", "AETHEL")

### Context Awareness Features
- **Spatial Hierarchy**: Clear parent-child relationships
- **Temporal Context**: Support for historical tracking
- **Cross References**: Links between related templates
- **Machine Readable**: Structured for AI processing
- **Human Friendly**: Maintains readability and usability

## Master Files

### WorldTemplates.txt
The original source file containing all templates in plain text format. This file serves as the authoritative source for template content and structure.

### master_templates_file.md
A processed version of the templates with citation references (`[cite_start]` and `[cite: X]`). This file maintains the original formatting with additional metadata for reference tracking.

## Usage Guidelines

### For Humans
1. Choose the appropriate template category
2. Select the specific template for your content type
3. Fill in each section with detailed information
4. Use the examples as guidance for appropriate detail level
5. Add optional sections as needed

### For AI Systems
1. Templates include YAML frontmatter for metadata extraction
2. Structured sections enable consistent data parsing
3. Clear field names support automated content generation
4. Optional fields allow for flexible content creation

### For Integration with RuneFrameOS Ecosystem
- Templates are designed to integrate with Tapestry™ world-building engine
- Structured data supports Distilera™ alchemy simulation
- Organization templates align with Hoardwell™ multi-agent communication
- Item templates support Mercatrix™ economic foundation engine

## Template Standards

### Metadata Fields
- `template_type`: Category classification
- `template_name`: Human-readable name
- `version`: Template version number
- `description`: Brief description of purpose
- `usage`: Instructions for use
- `cnc`: Celestial Navigation Code for spatial hierarchy
- `parent_cnc`: Parent entity's CNC for relationship tracking
- `context_awareness`: Configuration for AI processing capabilities
- `validation`: Rules for CNC format and depth validation

### Content Structure
- Clear hierarchical headings (##, ###)
- Consistent bullet point formatting
- Descriptive field names
- Example content where helpful
- Optional sections clearly marked

### Machine Readability
- Consistent YAML frontmatter with CNC support
- Structured field names
- Clear data types (strings, lists, objects)
- Standardized formatting patterns
- Hierarchical spatial relationships via CNC
- Cross-reference capabilities for AI processing

## Integration with RuneFrameOS Architecture

These templates are designed to work seamlessly with the RuneFrameOS ecosystem:

- **Tapestry™**: World-building engine can use these templates for content generation
- **Distilera™**: Alchemy simulation can reference botanical and item templates
- **Hoardwell™**: Multi-agent communication can use organization templates
- **Mercatrix™**: Economic foundation can utilize economy and trade templates
- **Jonar™**: Infrastructure can reference world and region templates

## Maintenance

- Templates should be updated in both individual files and master files
- Version numbers should be incremented when templates are modified
- New templates should follow the established format and structure
- Template changes should be documented in the project's CHANGES.md file

## Contributing

When adding new templates:
1. Follow the established naming convention
2. Include appropriate YAML frontmatter
3. Use clear, descriptive section headings
4. Provide examples where helpful
5. Update this README.md file
6. Add the template to both master files

## Version History

- **v1.0.0**: Initial template organization and conversion from WorldTemplates.txt
- All templates converted to clean markdown format
- Added YAML frontmatter for machine processing
- Organized into logical directory structure
- Created comprehensive documentation
