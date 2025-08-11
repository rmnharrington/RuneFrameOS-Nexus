# Hoardwell - Character Inventory Manager

## 🏺 RuneFrameOS™ Gaming Ecosystem

**Hoardwell** is a system-agnostic character inventory manager designed to work across multiple characters and any possible genre. It provides comprehensive gear management with visual representation and detailed tracking.

## ✨ Features

### 🎯 Core Functionality
- **Multi-Character Support**: Switch between different characters seamlessly
- **System Agnostic**: Works with any TTRPG system (D&D, Pathfinder, Call of Cthulhu, etc.)
- **Comprehensive Item Tracking**: Image, name, description, location, weight, cost, and durability
- **Visual Inventory Management**: Drag & drop interface with item images
- **Weight & Encumbrance**: Automatic calculation and tracking

### 🛠️ Advanced Features
- **Item Templates**: Pre-built items for common systems
- **Random Generation**: Generate random loot or items
- **Shopping Lists**: Plan purchases and track costs
- **Maintenance Logs**: Track repairs, upgrades, and modifications
- **Import/Export**: JSON, CSV, or system-specific formats
- **Bulk Operations**: Select multiple items for batch actions

### 📱 User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean, intuitive interface following RuneFrameOS design system
- **Quick Actions**: Fast access to common inventory operations
- **Search & Filter**: Find items quickly by various criteria

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd RuneFrameOS-Hoardwell
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🏗️ Architecture

### Component Structure
```
src/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and Tailwind
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page component
├── components/             # React components
│   ├── core/              # Core layout components
│   │   ├── AppLayout.tsx  # Main app wrapper
│   │   ├── HeaderBar.tsx  # Top navigation bar
│   │   ├── LeftSidebar.tsx # Left navigation sidebar
│   │   ├── RightSidebar.tsx # Right inventory controls
│   │   └── AppFooter.tsx  # Footer component
│   └── apps/              # App-specific components
│       ├── CharacterSelector.tsx # Character switching
│       ├── InventoryOverview.tsx # Stats and equipped items
│       └── InventoryGrid.tsx     # Main inventory table
└── types/                  # TypeScript interfaces
    └── index.ts           # Type definitions
```

### Key Components

- **CharacterSelector**: Dropdown for active character selection
- **InventoryOverview**: Summary statistics and equipped items display
- **InventoryGrid**: Main item display with sorting/filtering capabilities
- **RightSidebar**: Inventory management tools and quick stats

## 🎨 Design System

### Color Scheme
- **Primary**: Amber (#f59e0b) - Brand color
- **Secondary**: Orange (#ea580c) - Accents
- **Accent**: Red (#dc2626) - Warnings/errors
- **Backgrounds**: Amber-50 to orange-50 gradients

### Typography
- **Headings**: Fantasy font (Cinzel) for titles
- **Body**: System font stack for readability
- **Consistent sizing**: 36px/30px/24px for headings, 16px for body

### Layout
- **Header**: Fixed 80px height with gradient background
- **Left Sidebar**: Fixed 280px width for navigation
- **Right Sidebar**: Fixed 320px width for controls
- **Center Content**: Dynamic width for main inventory interface

## 📊 Data Models

### InventoryItem Interface
```typescript
interface InventoryItem {
  id: string
  name: string
  description: string
  image: string
  type: string
  rarity: string
  location: string
  weight: number
  cost: number
  durability: number
  properties: Record<string, any>
  characterId: string
  system: string
  createdAt: Date
  updatedAt: Date
}
```

### Character Interface
```typescript
interface Character {
  id: string
  name: string
  level: number
  class: string
  system: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}
```

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting (via ESLint)
- **Tailwind CSS**: Utility-first CSS framework

### Adding New Features
1. Create component in appropriate directory
2. Add TypeScript interfaces to `types/index.ts`
3. Update main page to include new component
4. Follow existing component patterns and styling

## 🌐 Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📱 Responsive Design
- **Desktop (1200px+)**: Full layout with all sidebars
- **Tablet (768px - 1199px)**: Collapsible sidebars
- **Mobile (<768px)**: Stacked layout with hamburger menu

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is part of the RuneFrameOS™ Gaming Ecosystem by Bad Guy Gas.

## 🆘 Support

- **Documentation**: Check the RuneFrameOS documentation
- **Issues**: Report bugs via GitHub issues
- **Discord**: Join our community server
- **Email**: contact@badguygas.com

---

**Hoardwell** - Forge your legend, manage your hoard! 🏺⚔️
