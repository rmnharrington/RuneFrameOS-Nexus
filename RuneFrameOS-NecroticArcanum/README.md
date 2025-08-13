# 🧟 Necrotic Arcanum - RuneFrameOS

## 🎯 Overview

Necrotic Arcanum is a comprehensive undead creation, control, and cataloging system within the RuneFrameOS gaming ecosystem. This application provides everything needed to master the dark arts of necromancy across all gaming systems and genres.

## 🌟 Features

### **Create Undead**
- **Zombie Hordes**: Mass undead creation and management
- **Skeleton Warriors**: Animated skeletal constructs
- **Ghostly Apparitions**: Ethereal undead entities
- **Vampiric Thralls**: Blood-bound undead servants

### **Control Undead**
- **Mental Domination**: Direct control over undead minions
- **Group Coordination**: Tactical formation and behavior programming
- **Behavioral Programming**: Customize undead actions and responses
- **Command Hierarchies**: Establish leadership structures

### **Undead Catalog**
- **Comprehensive Bestiary**: Complete undead creature database
- **Cross-System Compatibility**: Works with D&D, Pathfinder, and more
- **Ability Documentation**: Detailed powers, weaknesses, and stats
- **Creation Methods**: Step-by-step undead creation guides

### **Necromantic Research**
- **Ritual Development**: Create and improve necromantic ceremonies
- **Power Enhancement**: Strengthen existing undead abilities
- **Ancient Knowledge**: Unlock forgotten necromantic techniques
- **Experimental Procedures**: Test new undead creation methods

## 🎨 Design Theme

Necrotic Arcanum features a dark, undead-themed color palette:

- **Sickly Green**: Primary accent color representing decay and necromantic energy
- **Dark Grays**: Undead and shadow themes
- **Corpse Browns**: Earthy, death-related tones
- **Necrotic Greens**: Darker green shades for depth

The design maintains structural consistency with other RuneFrameOS applications while providing a unique visual identity that reflects the dark nature of necromancy.

## 🚀 Getting Started

### **Prerequisites**
- Docker Desktop installed and running
- Node.js 18+ (for local development)
- Git repository cloned

### **Quick Start**
```bash
# Navigate to the application directory
cd RuneFrameOS-NecroticArcanum

# Install dependencies
npm install

# Start development server
npm run dev

# Access the application
# http://localhost:3007
```

### **Docker Deployment**
```bash
# Start the entire RuneFrameOS ecosystem
docker-compose up -d

# Start just NecroticArcanum
docker-compose up -d necrotic-arcanum

# View logs
docker-compose logs -f necrotic-arcanum
```

## 🏗️ Architecture

### **Frontend Structure**
- **Next.js 14**: Modern React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling with custom undead theme
- **Responsive Design**: Mobile-first approach with proper sidebar handling

### **Layout Standards**
- **Left Sidebar**: `w-48 lg:w-56` (192px mobile, 224px desktop) - Always visible
- **Right Sidebar**: `w-64` (256px) - Hidden on mobile/tablet
- **Center Panel**: Responsive grid layout following `md:grid-cols-2` pattern
- **No Fixed Positioning**: Sidebars use relative positioning for consistency

### **API Endpoints**
- `/api/health` - Service health check
- `/api/module-info` - Module information and capabilities
- `/api/status` - Current status and metrics
- `/api/undead/*` - Undead management endpoints

## 🎮 Gaming Integration

### **Supported Systems**
- **Dungeons & Dragons**: 5e, 3.5e, Pathfinder
- **Generic Systems**: GURPS, Savage Worlds
- **Custom Systems**: Easily adaptable to any RPG system

### **Undead Types**
- **Mindless Undead**: Zombies, skeletons, animated objects
- **Intelligent Undead**: Vampires, liches, ghosts
- **Hybrid Undead**: Ghouls, wights, death knights
- **Construct Undead**: Bone golems, flesh abominations

## 🔧 Development

### **Code Standards**
- Follow RuneFrameOS design specifications
- Maintain responsive design patterns
- Use TypeScript for all components
- Implement proper error handling
- Follow established git workflow

### **Testing Requirements**
- Test on mobile, tablet, and desktop
- Verify sidebar visibility and functionality
- Ensure responsive grid layouts work correctly
- Test module integration with Nexus

### **File Structure**
```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API endpoints
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/             # React components
│   ├── core/              # Core layout components
│   │   ├── AppLayout.tsx  # Main layout wrapper
│   │   ├── Header.tsx     # Application header
│   │   ├── LeftSidebar.tsx # Left navigation
│   │   └── RightSidebar.tsx # Right tools panel
│   └── apps/              # Application-specific components
│       └── NecroticArcanumWelcome.tsx # Main welcome component
```

## 🎨 Customization

### **Color Themes**
Each RuneFrameOS application maintains its own unique color scheme while following structural design standards. Necrotic Arcanum uses:

- **Primary**: Sickly green (`#22c55e`)
- **Secondary**: Necrotic green (`#3d8f3d`)
- **Accent**: Undead gray (`#6d6d6d`)
- **Background**: Corpse brown (`#0c0a09`)

### **Adding New Features**
1. Create new components in appropriate directories
2. Follow established responsive design patterns
3. Use custom color classes from Tailwind config
4. Test across all screen sizes
5. Update API endpoints as needed

## 📚 Documentation

### **Related Files**
- `SERVER_SETUP_ARCHITECTURE.md` - System overview
- `GUI_DESIGN_SPECIFICATION.md` - Design standards
- `API_DOCUMENTATION.md` - API reference
- `CONTRIBUTING.md` - Development guidelines

### **API Reference**
All endpoints follow the standard RuneFrameOS response format:
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation completed successfully",
  "timestamp": "ISO timestamp",
  "requestId": "uuid-v4"
}
```

## 🚨 Troubleshooting

### **Common Issues**
- **Port Conflicts**: Ensure port 3007 is available
- **Build Errors**: Check Node.js version and dependencies
- **Styling Issues**: Verify Tailwind CSS is properly configured
- **API Errors**: Check endpoint implementations and responses

### **Getting Help**
1. Check the troubleshooting guide in the main documentation
2. Verify Docker services are running correctly
3. Check application logs for error details
4. Ensure all dependencies are installed

## 🤝 Contributing

### **Development Workflow**
1. Create feature branch: `git checkout -b feature/undead-feature`
2. Follow design standards and responsive patterns
3. Test changes across all screen sizes
4. Update documentation as needed
5. Submit pull request with clear description

### **Design Compliance**
- ✅ Maintain sidebar widths (`w-48 lg:w-56` and `w-64`)
- ✅ Use responsive grid patterns (`md:grid-cols-2`)
- ✅ Ensure left sidebar is always visible
- ✅ Hide right sidebar on mobile/tablet
- ✅ Follow established color theme

## 📄 License

This project is part of the RuneFrameOS ecosystem and follows the same licensing terms.

## 🏷️ Bad Guy Gas

Necrotic Arcanum is proudly developed by **Bad Guy Gas**, bringing dark magic and undead mastery to the gaming community.

---

**Last Updated**: Current Development Session  
**Status**: Complete application setup with proper design standards  
**Next**: Ready for developer contribution and feature development
