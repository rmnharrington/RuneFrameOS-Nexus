# 💰 Mercatrix - RuneFrameOS

## 🎯 Overview

Mercatrix is a comprehensive economy management and building system within the RuneFrameOS gaming ecosystem. This application provides everything needed to create, manage, and optimize economic structures across all gaming systems and genres, from fantasy kingdoms to sci-fi colonies.

## 🌟 Features

### **Build Economy**
- **Currency Systems**: Design and implement custom currency types
- **Market Structures**: Create marketplaces, shops, and trading posts
- **Trade Networks**: Establish complex trading relationships
- **Resource Distribution**: Manage commodity flows and supply chains

### **Manage Systems**
- **Supply Chains**: Optimize production and distribution networks
- **Price Controls**: Implement dynamic pricing systems
- **Tax Systems**: Design economic policies and taxation
- **Economic Policies**: Create and enforce trade regulations

### **Trade Networks**
- **Route Optimization**: Design efficient trading routes
- **Market Analysis**: Analyze competition and market conditions
- **Competition Management**: Balance market forces
- **Partnership Building**: Establish trade alliances

### **Economic Analysis**
- **Performance Metrics**: Track economic health indicators
- **Trend Analysis**: Identify market patterns and cycles
- **Risk Assessment**: Evaluate economic vulnerabilities
- **Growth Projections**: Plan for economic expansion

## 🎨 Design Theme

Mercatrix features a sophisticated gold and darker color palette:

- **Gold**: Primary accent color representing wealth and prosperity
- **Wealth**: Rich orange tones for economic success
- **Commerce**: Blue accents for trade and business
- **Economy**: Dark grays for professional sophistication

The design maintains structural consistency with other RuneFrameOS applications while providing a unique visual identity that reflects the professional nature of economic management.

## 🚀 Getting Started

### **Prerequisites**
- Docker Desktop installed and running
- Node.js 18+ (for local development)
- Git repository cloned

### **Quick Start**
```bash
# Navigate to the application directory
cd RuneFrameOS-Mercatrix

# Install dependencies
npm install

# Start development server
npm run dev

# Access the application
# http://localhost:3008
```

### **Docker Deployment**
```bash
# Start the entire RuneFrameOS ecosystem
docker-compose up -d

# Start just Mercatrix
docker-compose up -d mercatrix

# View logs
docker-compose logs -f mercatrix
```

## 🏗️ Architecture

### **Frontend Structure**
- **Next.js 14**: Modern React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling with custom economy theme
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
- `/api/economy/*` - Economy management endpoints
- `/api/trade/*` - Trade network endpoints

## 🎮 Gaming Integration

### **Supported Systems**
- **Fantasy**: Medieval kingdoms, magical economies
- **Sci-Fi**: Space colonies, advanced trade systems
- **Modern**: Contemporary economic models
- **Historical**: Period-accurate economic structures
- **Custom**: Easily adaptable to any RPG system

### **Economic Types**
- **Market Economies**: Free trade and competition
- **Command Economies**: Centralized control and planning
- **Mixed Economies**: Balanced public and private sectors
- **Barter Systems**: Direct exchange without currency
- **Digital Economies**: Cryptocurrency and virtual assets

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
│       └── MercatrixWelcome.tsx # Main welcome component
```

## 🎨 Customization

### **Color Themes**
Each RuneFrameOS application maintains its own unique color scheme while following structural design standards. Mercatrix uses:

- **Primary**: Gold (`#eab308`)
- **Secondary**: Wealth (`#f2750e`)
- **Accent**: Commerce (`#0ea5e9`)
- **Background**: Economy (`#020617`)

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
- **Port Conflicts**: Ensure port 3008 is available
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
1. Create feature branch: `git checkout -b feature/economy-feature`
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

Mercatrix is proudly developed by **Bad Guy Gas**, bringing sophisticated economic management to the gaming community.

---

**Last Updated**: Current Development Session  
**Status**: Complete application setup with proper design standards  
**Next**: Ready for developer contribution and feature development
