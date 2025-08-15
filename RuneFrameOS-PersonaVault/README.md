# PersonaVault - Character Sheet Binder & Dice Roller

## Overview

PersonaVault is a comprehensive character management system for the RuneFrameOS ecosystem. It allows users to create, manage, and view character sheets from any gaming system, with an integrated dice rolling engine and template management system.

## Features

### 🎭 Character Management
- **Multi-System Support**: Create characters for D&D 5e, Pathfinder 2e, Call of Cthulhu, and custom systems
- **Character Creation**: Build characters using templates or from scratch
- **Character Storage**: Secure storage for all your character data
- **Import/Export**: Transfer characters between systems and devices

### 🎲 Dice Rolling Engine
- **Standard Dice**: Support for d4, d6, d8, d10, d12, d20, d100
- **Custom Expressions**: Roll complex dice expressions like "2d6+3" or "4d10-2"
- **Quick Rolls**: Pre-configured buttons for common dice rolls
- **Roll History**: Track your dice rolling history

### 📋 Template System
- **Pre-built Templates**: Ready-to-use character sheets for popular RPG systems
- **Custom Templates**: Upload and manage your own character sheet templates
- **Template Preview**: See templates before using them
- **System Integration**: Templates automatically integrate with character creation

### 🎮 Gaming System Management
- **System Support**: Manage multiple RPG systems in one place
- **Extensible**: Add support for new gaming systems
- **Cross-Platform**: Access your characters from anywhere

## Technical Details

### Architecture
- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom character sheet theme
- **Layout**: Responsive design following RuneFrameOS GUI specifications
- **API**: RESTful endpoints for all functionality

### Port Configuration
- **Development**: Port 3009
- **Production**: Configurable via environment variables

### Dependencies
- Next.js 14.0.0
- React 18.2.0
- TypeScript 5.0.0
- Tailwind CSS 3.3.0

## Getting Started

### Prerequisites
- Node.js 18+ (LTS recommended)
- Docker Desktop (for containerized deployment)
- RuneFrameOS ecosystem access

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd RuneFrameOS-PersonaVault
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Local: http://localhost:3009
   - Docker: http://localhost:3009

### Docker Deployment

1. **Build the container**
   ```bash
   docker build -t personavault .
   ```

2. **Run the container**
   ```bash
   docker run -p 3009:3009 personavault
   ```

## API Endpoints

### Health Check
- `GET /api/health` - Service health status

### Module Information
- `GET /api/module-info` - Module capabilities and features

### Status
- `GET /api/status` - Current module status and metrics

### Characters (Future)
- `GET /api/characters` - List all characters
- `POST /api/characters` - Create new character
- `PUT /api/characters/:id` - Update character
- `DELETE /api/characters/:id` - Delete character

### Templates (Future)
- `GET /api/templates` - List all templates
- `POST /api/templates` - Upload new template
- `GET /api/templates/:id` - Get template details

### Dice Rolling (Future)
- `POST /api/dice/roll` - Roll dice with expression
- `GET /api/dice/history` - Get roll history

## Design System

### Color Palette
- **Gold**: Warm, character-focused colors for primary elements
- **Grey**: Neutral, professional colors for secondary elements
- **Stats**: Color-coded character statistics

### Typography
- **Fantasy Fonts**: Cinzel for headers, Kalam for handwriting effects
- **Responsive**: Scales appropriately across all device sizes
- **Accessibility**: High contrast and readable text

### Layout
- **Responsive Grid**: Adapts to different screen sizes
- **Sidebar Navigation**: Left sidebar for main navigation
- **Right Panel**: Quick actions and character stats
- **Mobile-First**: Optimized for mobile and tablet devices

## Integration with RuneFrameOS

### Nexus Integration
- **Character Cards**: Display character summaries in Nexus dashboard
- **Quick Actions**: Access PersonaVault features from Nexus
- **Cross-App Navigation**: Seamless movement between applications

### Shared Services
- **Authentication**: Integrated with RuneFrameOS auth system
- **Storage**: Uses centralized storage for character data
- **Templates**: Shares template library across the ecosystem

## Development

### Code Structure
```
src/
├── app/                 # Next.js app router
│   ├── api/            # API endpoints
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main page
├── components/          # React components
│   ├── Header.tsx      # Application header
│   ├── LeftSidebar.tsx # Navigation sidebar
│   ├── RightSidebar.tsx # Stats panel
│   └── CharacterDashboard.tsx # Main content
└── types/               # TypeScript type definitions
```

### Development Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### Contributing
1. Follow RuneFrameOS coding standards
2. Use the established design system
3. Test across different screen sizes
4. Ensure accessibility compliance
5. Update documentation for new features

## Future Enhancements

### Planned Features
- **Advanced Dice Engine**: Complex dice expressions and modifiers
- **Character Sharing**: Share characters with other players
- **Mobile App**: Native mobile application
- **Offline Support**: Work without internet connection
- **Character Analytics**: Track character development over time

### Technical Improvements
- **Real-time Updates**: WebSocket integration for live character updates
- **Advanced Templates**: Drag-and-drop template builder
- **Performance Optimization**: Lazy loading and caching improvements
- **Internationalization**: Multi-language support

## Support

### Documentation
- [RuneFrameOS Architecture](../SERVER_SETUP_ARCHITECTURE.md)
- [GUI Design Standards](../GUI_DESIGN_SPECIFICATION.md)
- [API Documentation](../API_DOCUMENTATION.md)

### Contact
- **Development Team**: dev@badguygas.com
- **Support**: support@badguygas.com
- **Security Issues**: security@badguygas.com

---

**Version**: 1.0.0  
**Last Updated**: Current Development Session  
**Status**: Development - Core Features Complete  
**License**: MIT  
**Author**: Bad Guy Gas LLC
