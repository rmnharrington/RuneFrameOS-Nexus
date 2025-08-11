# RuneFrameOS GUI Design Specification
## Universal Layout System for All Applications

### Overview
This document defines the consistent GUI layout system that will be used across all RuneFrameOS applications. The layout consists of five main sections that maintain visual consistency while allowing for app-specific content in designated areas.

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

### Content by App

#### Nexus (Hub Application)
- **Content**: Grid of application cards
- **Layout**: Responsive grid (3-4 columns on desktop)
- **Cards**: Each app with icon, name, description, status, and connect button

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
- **Width**: 320px
- **Height**: 100vh - header height
- **Position**: Fixed right, below header

### Content by App

#### Nexus (Hub Application)
- **Content**: System Statistics
- **Sections**:
  - System Status (Core Services, Database, API Gateway, Cache)
  - Performance (Response Time, Uptime, Active Users, Memory)
  - Gaming Stats (Active Campaigns, Characters, Dice Rolls, Session Time)
- **Quick Actions**: Detailed Report, System Settings
- **Status Indicator**: "All systems operational" with timestamp

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
© 2024 Bad Guy Gas | RuneFrameOS™ | Version 0.1.0
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

### Breakpoints
- **Desktop**: 1200px+ (Full layout with all sidebars)
- **Tablet**: 768px - 1199px (Collapsible sidebars)
- **Mobile**: <768px (Stacked layout, hamburger menu)

### Mobile Adaptations
- **Header**: Reduced height, smaller text
- **Sidebars**: Collapsible with overlay
- **Content**: Full width, adjusted padding
- **Footer**: Stacked columns

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

### Component Structure
```typescript
// Base layout component
<AppLayout>
  <HeaderBar />
  <div className="flex">
    <LeftSidebar />
    <main className="flex-1">
      {appSpecificContent}
    </main>
    <RightSidebar appType={currentApp} />
  </div>
  <AppFooter />
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

---

## 15. DEPLOYMENT CONSIDERATIONS

### Build Process
- **Optimization**: Code splitting, tree shaking
- **Assets**: Image optimization, font loading
- **Environment**: Development, staging, production
- **Monitoring**: Error tracking, performance metrics

### Performance Targets
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1
- **Time to Interactive**: <3.5s

---

This specification ensures that all RuneFrameOS applications will have a consistent, professional appearance while maintaining the flexibility needed for app-specific functionality. The right sidebar's dynamic content will allow each app to provide contextually relevant controls and information while keeping the overall navigation structure familiar to users.
