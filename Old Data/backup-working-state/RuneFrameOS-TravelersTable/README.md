# TravelersTable - GameMaster Campaign Management

## 🎯 **Overview**

TravelersTable is a comprehensive GameMaster (GM) application designed for managing multiple tabletop RPG campaigns and tracking World Travelers (players). Built specifically for RuneFrameOS, it provides GMs with powerful tools to oversee their gaming sessions, manage player characters, and maintain campaign continuity.

## ✨ **Key Features**

### **Campaign Management**
- **Multi-Campaign Support**: Manage 3-10+ campaigns simultaneously
- **Session Tracking**: Keep track of session numbers and progress
- **System Integration**: Support for D&D 5e, Pathfinder, and other RPG systems
- **Player Count Management**: Track active players per campaign

### **World Traveler Tracking**
- **Player Profiles**: Comprehensive player and character information
- **Real-time Stats**: HP, AC, level, and other vital statistics
- **Campaign Assignment**: Link players to specific campaigns
- **Quick Status Overview**: At-a-glance player health and status

### **Character Sheet Integration**
- **Full Character Viewing**: Access complete character sheets
- **Race & Class Information**: Detailed character background data
- **Level Progression**: Track character advancement
- **Combat Stats**: HP, AC, and other combat-related information

### **Inventory Management**
- **Categorized Items**: Weapons, armor, consumables, treasure
- **Item Counts**: Quick overview of player possessions
- **Campaign-Specific**: Separate inventories per campaign
- **Loot Tracking**: Monitor treasure distribution

### **Built-in Dice Roller**
- **Quick Dice**: Instant access to common dice (d4, d6, d8, d10, d12, d20, d100)
- **Custom Rolls**: Support for complex dice expressions (e.g., 2d6+3)
- **Two-Tone Design**: Beautiful dice-themed button styling
- **Responsive Layout**: Works on all device sizes

### **GM Notes System**
- **Session Notes**: Record important events and decisions
- **NPC Ideas**: Track character concepts and story elements
- **Encounter Planning**: Plan future challenges and battles
- **Campaign Continuity**: Maintain story consistency across sessions

## 🎨 **Design System**

### **Color Palette**
- **Primary**: Dark brown to light tan gradient theme
- **Accent**: Campaign blue for management features
- **Dice**: Purple/pink for dice roller and gaming elements
- **Text**: High contrast tan and brown for readability

### **Layout Standards**
- **Strict GUI Compliance**: Follows RuneFrameOS GUI_DESIGN_SPECIFICATION.md
- **Responsive Grid**: MANDATORY responsive pattern implementation
- **Sidebar Dimensions**: Left (w-48 lg:w-56), Right (w-64)
- **Component Consistency**: Unified design language across all views

### **Visual Elements**
- **Hero Banner**: TravelersTable_HeroBanner.png integration
- **App Icon**: TravelersTable_Logos_IconOnly.png branding
- **Custom Fonts**: Cinzel (fantasy) and Kalam (handwriting)
- **Text Shadows**: Enhanced readability with custom shadow effects

## 🏗️ **Technical Architecture**

### **Framework & Dependencies**
- **Next.js 14**: Modern React framework with App Router
- **React 18**: Latest React features and hooks
- **TypeScript**: Full type safety and development experience
- **Tailwind CSS**: Utility-first CSS framework with custom theme

### **Port Configuration**
- **Development**: Port 3010 (configurable in package.json)
- **Docker**: Exposed on port 3010
- **API Endpoints**: /api/health, /api/module-info, /api/status

### **Component Structure**
```
src/
├── app/
│   ├── api/           # API endpoints
│   ├── globals.css    # Global styles and theme
│   ├── layout.tsx     # Root layout
│   └── page.tsx       # Main page with hero section
├── components/
│   ├── core/          # Layout components (Header, Sidebars, Footer)
│   └── CampaignDashboard.tsx  # Main content area
```

## 🚀 **Installation & Setup**

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Docker (for containerized deployment)

### **Local Development**
```bash
# Clone and navigate to directory
cd RuneFrameOS-TravelersTable

# Install dependencies
npm install

# Start development server
npm run dev

# Access at http://localhost:3010
```

### **Docker Deployment**
```bash
# Build the container
docker build -t travelerstable .

# Run the container
docker run -d -p 3010:3010 --name travelerstable travelerstable

# Or use docker-compose
docker-compose up -d travelerstable
```

## 🔧 **Configuration**

### **Environment Variables**
- `NODE_ENV`: Set to 'production' for production builds
- `PORT`: Override default port 3010 if needed

### **Tailwind Configuration**
- Custom color palette defined in `tailwind.config.js`
- Responsive breakpoints following RuneFrameOS standards
- Custom text and box shadow utilities

### **API Configuration**
- Health check endpoint for monitoring
- Module information for RuneFrameOS integration
- Status endpoint for operational monitoring

## 📱 **Responsive Design**

### **Breakpoint System**
- **Mobile**: < 1024px (lg breakpoint)
- **Desktop**: ≥ 1024px (lg breakpoint)

### **Grid Patterns**
- **MANDATORY**: `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4`
- **Mobile-First**: Responsive design starting from mobile
- **Flexible Layouts**: Adapts to different screen sizes

## 🔌 **RuneFrameOS Integration**

### **Module Standards**
- Follows RuneFrameOS module architecture
- Compatible with Nexus dashboard
- Standardized API endpoints
- Consistent design language

### **Navigation Integration**
- Left sidebar navigation following GUI specifications
- Right sidebar with campaign overview and quick tools
- Mobile-responsive sidebar overlay

## 🎮 **Gaming Features**

### **Campaign Management**
- Create and manage multiple campaigns
- Track session progress and player levels
- Monitor campaign status and health

### **Player Tracking**
- Real-time player statistics
- Character sheet integration
- Inventory management
- Health and status monitoring

### **Dice Rolling**
- Quick access to common dice
- Custom dice expressions
- Beautiful dice-themed interface
- Responsive dice button grid

### **GM Tools**
- Session note taking
- NPC idea tracking
- Encounter planning
- Campaign continuity management

## 🚀 **Future Enhancements**

### **Planned Features**
- **Database Integration**: Full backend for persistent data
- **Character Sheet Editor**: Create and edit character sheets
- **Campaign Templates**: Pre-built campaign structures
- **Player Communication**: In-app messaging system
- **Advanced Dice**: Complex dice mechanics and modifiers
- **Campaign Analytics**: Session statistics and player progress

### **Integration Plans**
- **Scriptoria Connection**: Template downloads and sharing
- **Nexus Dashboard**: Enhanced integration with main platform
- **Multi-User Support**: Collaborative GM tools
- **Export Features**: Campaign data portability

## 📄 **License & Attribution**

- **License**: MIT
- **Author**: Bad Guy Gas LLC
- **Trademark**: Trademarked by Bad Guy Gas LLC
- **Copyright**: © 2024 Bad Guy Gas LLC. All rights reserved.

## 🤝 **Support & Contributing**

For support, feature requests, or contributions, please refer to the RuneFrameOS documentation or contact the development team through the official channels.

---

**TravelersTable** - Empowering GameMasters to create epic adventures and manage their World Travelers with style and efficiency. 🗺️✨

