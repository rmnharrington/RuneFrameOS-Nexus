# RuneFrameOS GUI Design Specification
## Universal Layout System for All Applications

### Overview
This document defines the consistent GUI layout system that will be used across all RuneFrameOS applications. The layout consists of five main sections that maintain visual consistency while allowing for app-specific content in designated areas.

**Recent Updates (v0.1.1):**
- ✅ Fixed hydration errors in SystemStats component
- ✅ Improved responsive breakpoints for better mobile/tablet experience
- ✅ Optimized right sidebar positioning as floating column
- ✅ Enhanced Docker deployment with production builds

---

## 1. HEADER BAR (Fixed Across All Apps)

### Layout
- **Height**: 80px
- **Width**: 100% of viewport
- **Position**: Fixed at top, always visible

### Content Structure
```
[App Icon] [App Name]                    [Welcome, Username]                    [Settings] [Logout]
```

### Components
- **Left Section**: 
  - App icon (32x32px)
  - App name in fantasy font
  - "RuneFrameOS™ Gaming Ecosystem" subtitle
- **Center Section**: 
  - "Welcome, [Username]" message
  - "Ready to forge your legend?" subtitle
- **Right Section**: 
  - Settings gear icon (clickable)
  - Logout button with icon

### Styling
- **Background**: Gradient from amber-900 via orange-800 to red-900
- **Border**: 2px amber-400/30 at bottom
- **Text Colors**: White, amber-200, orange-200
- **Icons**: 24px, with hover effects and transitions

---

## 2. LEFT SIDEBAR (Fixed Across All Apps)

### Layout
- **Width**: 280px
- **Height**: 100vh - header height
- **Position**: Fixed left, below header

### Content Structure
```
[RuneFrameOS Logo]
Navigation
├── Dashboard
├── Characters  
├── Campaigns
├── Library
├── Tools
└── Social

Quick Actions
├── New Campaign
└── Quick Roll
```

### Components
- **Header**: RuneFrameOS logo (64x64px) with "Navigation" title
- **Navigation Items**: Each with icon, name, and description
- **Quick Actions**: Prominent buttons for common tasks
- **Active State**: Current app highlighted with gradient background

### Styling
- **Background**: Gradient from amber-50 to orange-50
- **Border**: 2px amber-300/30 at right
- **Active Item**: Gradient from amber-200 to orange-200
- **Hover Effects**: Scale, shadow, and border color changes

---

## 3. CENTER CONTENT AREA (Dynamic Based on Active App)

### Layout
- **Width**: Flexible (fills remaining space between sidebars)
- **Height**: 100vh - header height
- **Position**: Between left sidebar and right sidebar
- **Padding**: 24px on all sides
- **Max Width**: Removed constraint for better responsive behavior

### Content by App

#### Nexus (Hub Application)
- **Content**: Grid of application cards
- **Layout**: Responsive grid with improved breakpoints:
  - **Mobile (< 640px)**: 1 column
  - **Small (640px - 768px)**: 2 columns
  - **Medium+ (768px+)**: 3 columns
- **Cards**: Each app with icon, name, description, status, and connect button
- **Responsive Behavior**: Switches to 2 columns much sooner for better tablet experience

#### Distillara (Crafting System)
- **Content**: Crafting interface, recipes, materials
- **Layout**: Tabs or sections for different crafting types
- **Components**: Recipe cards, material inventory, crafting queue

#### Other Apps
- **Content**: App-specific main interface
- **Layout**: Determined by app requirements
- **Components**: Varies by application

---

## 4. RIGHT SIDEBAR (Dynamic Based on Active App)

### Layout
- **Width**: 320px (w-80)
- **Height**: 100vh - header height
- **Position**: Floating right column within main flex container
- **Display**: Hidden on mobile/tablet, visible on desktop (lg+)

### Content by App

#### Nexus (Hub Application)
- **Content**: System Statistics (Floating Right Sidebar)
- **Sections**:
  - System Status (Core Services, Database, API Gateway, Cache)
  - Performance (Response Time, Uptime, Active Users, Memory)
  - Gaming Stats (Active Campaigns, Characters, Dice Rolls, Session Time)
- **Quick Actions**: Detailed Report, System Settings
- **Status Indicator**: "All systems operational" with real-time timestamp
- **Real-time Updates**: Timestamp updates every second after client-side hydration

#### Distillara (Crafting System)
- **Content**: Crafting Menu & Controls
- **Sections**:
  - Active Recipes
  - Material Requirements
  - Crafting Queue
  - Quality Settings
- **Quick Actions**: Start Crafting, Pause Queue, Clear Queue

#### Other Apps
- **Content**: App-specific menu/controls
- **Layout**: Determined by app requirements
- **Components**: Varies by application

### Styling
- **Background**: Gradient from orange-50 to red-50
- **Border**: 2px orange-300/30 at left
- **Sections**: White/60 background with orange borders
- **Status Colors**: Green (online), Yellow (syncing), Red (error)
- **Positioning**: `w-80 flex-shrink-0` for proper floating behavior

### Mobile/Tablet Adaptation
- **Overlay Mode**: Full-screen overlay with close button
- **Trigger**: Toggle button in header bar
- **Animation**: Smooth slide-in from right with backdrop

---

## 5. FOOTER (Fixed Across All Apps)

### Layout
- **Height**: Auto (minimum 200px)
- **Width**: 100% of viewport
- **Position**: Fixed at bottom

### Content Structure
```
Company Info          Quick Links          Contact Information
[Logo] [Name]        Documentation        Email
Description          API Reference        Website  
Social Links         Community Forum      Discord
                     Support Center       Business Contact
                     Developer Portal     [Get in Touch Button]

Legal Disclaimers    Privacy & Terms
Trademark info       Terms of Service
Warranty disclaimers Privacy Policy
Use at own risk      Data protection info

Copyright & Version Info
© 2024 Bad Guy Gas | RuneFrameOS™ | Version 0.1.1
```

### Components
- **Company Section**: Logo, name, description, social links
- **Quick Links**: Common navigation links
- **Contact Section**: Email, website, Discord, business contact
- **Legal Section**: Disclaimers, terms, privacy policy
- **Copyright**: Company info, trademark, version

### Styling
- **Background**: Gradient from amber-900 via orange-800 to red-900
- **Border**: 2px amber-400/30 at top
- **Text Colors**: White, amber-200, orange-200
- **Links**: Hover effects with color transitions

---

## 6. RESPONSIVE DESIGN REQUIREMENTS

### Breakpoints (Updated)
- **Mobile**: < 640px (Single column layout)
- **Small**: 640px - 768px (Two column layout) ⭐ **NEW: Switches to 2 columns sooner**
- **Medium**: 768px+ (Three column layout)
- **Large**: 1024px+ (Full layout with floating right sidebar)

### Mobile Adaptations
- **Header**: Reduced height, smaller text
- **Sidebars**: 
  - Left: Collapsible with overlay
  - Right: Full-screen overlay with close button
- **Content**: Full width, adjusted padding
- **Footer**: Stacked columns

### Tablet Optimizations
- **Center Content**: Switches to 2 columns at 640px for better space utilization
- **Sidebar Management**: Toggle-based visibility for both sidebars
- **Touch-Friendly**: Larger touch targets and spacing

---

## 7. COLOR SCHEME & THEMING

### Primary Colors
- **Amber**: #f59e0b (Primary brand color)
- **Orange**: #ea580c (Secondary brand color)
- **Red**: #dc2626 (Accent color)

### Gradients
- **Header/Footer**: from-amber-900 via-orange-800 to-red-900
- **Left Sidebar**: from-amber-50 to-orange-50
- **Right Sidebar**: from-orange-50 to-red-50

### Status Colors
- **Success/Online**: Green (#10b981)
- **Warning/Syncing**: Yellow (#f59e0b)
- **Error/Offline**: Red (#ef4444)
- **Info**: Blue (#3b82f6)

---

## 8. TYPOGRAPHY

### Fonts
- **Primary**: Fantasy font for headings and titles
- **Secondary**: System font stack for body text
- **Monospace**: For code, technical information

### Font Sizes
- **H1**: 4xl (36px) - Main page titles
- **H2**: 3xl (30px) - Section headers
- **H3**: 2xl (24px) - Subsection headers
- **Body**: Base (16px) - Main content
- **Small**: Sm (14px) - Secondary information
- **Caption**: Xs (12px) - Labels, timestamps

---

## 9. ICONS & IMAGERY

### Icon System
- **Size Standard**: 24px for most UI elements
- **Style**: Consistent stroke width, rounded corners
- **Colors**: Inherit from parent text color
- **Hover Effects**: Scale, color changes, animations

### Image Requirements
- **Formats**: PNG, SVG, WebP
- **Optimization**: Compressed for web
- **Alt Text**: Descriptive for accessibility
- **Loading**: Lazy loading for performance

---

## 10. ANIMATIONS & TRANSITIONS

### Hover Effects
- **Buttons**: Scale (105%), shadow changes
- **Cards**: Lift effect, border color changes
- **Links**: Color transitions, underline effects

### Transitions
- **Duration**: 200ms for most interactions
- **Easing**: Smooth, natural curves
- **Properties**: Transform, opacity, colors

### Loading States
- **Skeletons**: Placeholder content while loading
- **Spinners**: For async operations
- **Progress Bars**: For long-running tasks

---

## 11. ACCESSIBILITY REQUIREMENTS

### Color Contrast
- **Text**: Minimum 4.5:1 contrast ratio
- **Interactive Elements**: Minimum 3:1 contrast ratio
- **Status Indicators**: Not color-only (include text/icons)

### Keyboard Navigation
- **Tab Order**: Logical flow through interface
- **Focus Indicators**: Visible focus states
- **Skip Links**: Jump to main content

### Screen Readers
- **Alt Text**: Descriptive for all images
- **ARIA Labels**: For complex interactions
- **Semantic HTML**: Proper heading structure

---

## 12. IMPLEMENTATION GUIDELINES

### Component Structure (Updated)
```typescript
// Base layout component with floating right sidebar
<AppLayout>
  <HeaderBar />
  <div className="flex flex-1 relative">
    <LeftSidebar />
    <main className="flex-1 p-4 md:p-6 overflow-auto">
      <div className="w-full"> {/* Removed max-width constraint */}
        {appSpecificContent}
      </div>
    </main>
    {/* Desktop Stats Panel - Floating right sidebar */}
    {showStats && (
      <div className="hidden lg:block w-80 flex-shrink-0">
        <SystemStats />
      </div>
    )}
  </div>
  <AppFooter />
  
  {/* Mobile/Tablet Stats Panel - Overlay */}
  {showStats && showStatsPanel && (
    <div className="fixed inset-0 bg-black/20 z-40 md:hidden">
      {/* Overlay content */}
    </div>
  )}
</AppLayout>
```

### Props Interface
```typescript
interface AppLayoutProps {
  appName: string
  userName?: string
  appIcon?: string
  showSidebar?: boolean
  showStats?: boolean
  onSettings?: () => void
  onLogout?: () => void
  onNavigate?: (destination: string) => void
}
```

### State Management
- **Current App**: Determines right sidebar content
- **User Info**: Username, preferences, permissions
- **Navigation State**: Active routes, breadcrumbs
- **App-Specific State**: Managed by individual applications
- **Stats Panel**: Toggle state for mobile/tablet overlay

---

## 13. INTEGRATION WITH NEXUS

### API Integration
- **Authentication**: JWT tokens, user sessions
- **Data Fetching**: React Query/SWR for server state
- **Real-time Updates**: WebSocket connections for live data
- **Error Handling**: Consistent error boundaries and fallbacks

### Navigation System
- **Routing**: Next.js App Router
- **Deep Linking**: Direct access to app sections
- **Breadcrumbs**: Navigation context
- **Back Navigation**: Consistent back button behavior

### Data Flow
- **Global State**: User info, app settings, notifications
- **Local State**: App-specific data, form inputs
- **Server State**: API responses, cached data
- **Real-time**: Live updates, notifications

### Hydration & SSR
- **Server-Side Rendering**: Consistent initial render
- **Client-Side Hydration**: No mismatches between server and client
- **Dynamic Content**: Real-time updates after mounting
- **Performance**: Optimized for Core Web Vitals

---

## 14. TESTING REQUIREMENTS

### Visual Testing
- **Cross-browser**: Chrome, Firefox, Safari, Edge
- **Responsive**: All breakpoints and orientations
- **Accessibility**: Screen reader compatibility
- **Performance**: Lighthouse scores, load times

### Functional Testing
- **Navigation**: All routes and interactions
- **State Management**: Data flow and updates
- **Error Handling**: Graceful degradation
- **Integration**: API calls and responses
- **Hydration**: Server/client render consistency

### Responsive Testing
- **Breakpoint Transitions**: Smooth column changes at 640px and 768px
- **Sidebar Behavior**: Proper overlay and floating behavior
- **Touch Interactions**: Mobile-friendly interactions

---

## 15. DEPLOYMENT CONSIDERATIONS

### Build Process
- **Optimization**: Code splitting, tree shaking
- **Assets**: Image optimization, font loading
- **Environment**: Development, staging, production
- **Monitoring**: Error tracking, performance metrics

### Docker Deployment
- **Production Builds**: `npm run build` in Dockerfile
- **Multi-stage**: Optimized for production
- **Port Configuration**: Consistent port mapping (3000)
- **Health Checks**: Application readiness verification

### Performance Targets
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1
- **Time to Interactive**: <3.5s
- **Hydration Success**: 100% server/client consistency

---

## 16. RECENT IMPROVEMENTS (v0.1.1)

### Hydration Error Resolution
- **Problem**: Server/client render mismatch in SystemStats timestamp
- **Solution**: Client-side state management with useEffect
- **Result**: No more hydration errors, consistent rendering

### Responsive Layout Optimization
- **Problem**: Cards stayed single column too long on resize
- **Solution**: Updated breakpoints from `md:grid-cols-2` to `sm:grid-cols-2`
- **Result**: Better tablet experience, switches to 2 columns at 640px

### Right Sidebar Positioning
- **Problem**: SystemStats appeared below footer instead of floating
- **Solution**: Moved sidebar inside main flex container with proper constraints
- **Result**: Floating right sidebar that stays in position

### Docker Production Builds
- **Problem**: Development mode in production containers
- **Solution**: Updated Dockerfile with build step and production start
- **Result**: Optimized production deployments

---

This specification ensures that all RuneFrameOS applications will have a consistent, professional appearance while maintaining the flexibility needed for app-specific functionality. The right sidebar's dynamic content will allow each app to provide contextually relevant controls and information while keeping the overall navigation structure familiar to users.

**Current Status**: ✅ All major layout issues resolved, responsive design optimized, production deployment ready.
