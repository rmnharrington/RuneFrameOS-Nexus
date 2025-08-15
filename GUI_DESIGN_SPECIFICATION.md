# RuneFrameOS GUI Design Specification

## 🎯 **Design Philosophy**

The RuneFrameOS ecosystem follows a **unified structural design language** where all applications maintain consistent layout, spacing, and component behavior while preserving their unique thematic elements and color schemes. **Nexus serves as the structural foundation** that all other applications must follow, but each app defines its own visual identity through colors and theming.

**Key Principle**: **Color flexibility is a core feature** - each application will have its own unique color palette and theme as one of its defining characteristics.

## 🎨 **Color Palette Philosophy**

### **Color Freedom (NEW)**
- **Each app defines its own color scheme** - no centralized color restrictions
- **Colors are a defining feature** of each application's identity
- **Nexus will adapt** to integrate with different app color schemes
- **Maintains visual uniqueness** while preserving structural consistency

### **Current Implementation Examples**
- **Nexus**: Slate/blue theme for system interface
- **Distillara**: Amber/orange theme for alchemy
- **Feastwell**: Warm culinary colors
- **Hoardwell**: Treasure/wealth themed colors
- **Broke Unicorn Tavern**: Social/adventure themed colors
- **Scriptoria**: Knowledge/learning themed colors

### **Future Color Integration**
- **Nexus will adapt** to show app-specific color schemes when integrated
- **Dynamic theming** based on active application
- **Color coordination** between app and Nexus interface
- **Maintains brand identity** while ensuring structural consistency

## 📐 **Layout Standards**

### **Menu Sizing (MANDATORY)**
All applications **MUST** use these exact dimensions:

#### **Left Sidebar**
```css
w-48 lg:w-56
/* Mobile: 192px, Desktop: 224px */
```

#### **Right Sidebar**
```css
w-64
/* Fixed: 256px */
```

#### **Responsive Breakpoints**
- **Mobile**: `< 1024px` (lg breakpoint)
- **Desktop**: `≥ 1024px` (lg breakpoint)

### **Spacing System**
- **Container Padding**: `p-3 lg:p-4`
- **Section Margins**: `mb-4 lg:mb-6`
- **Element Spacing**: `space-y-1 lg:space-y-2`
- **Button Padding**: `p-2 lg:p-3`

### **Typography Scale**
- **Headers**: `text-sm lg:text-base`
- **Body Text**: `text-xs lg:text-sm`
- **Small Text**: `text-xs`
- **Font Family**: `font-fantasy` for headers, system default for body

## 🏗️ **Component Standards**

### **Main Application Header Design (MANDATORY)**
All applications **MUST** include this standardized main header structure, but colors can be customized:

```tsx
<header className="fixed top-0 left-0 right-0 z-50 bg-neutral-900 border-b-2 border-app-accent shadow-lg">
  <div className="flex items-center justify-between px-4 py-3">
    {/* Left Section - App Branding */}
    <div className="flex items-center space-x-3">
      {/* Mobile Menu Button (hidden on desktop) */}
      <button className="lg:hidden p-2 text-app-text hover:text-app-accent transition-colors">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      {/* App Logo and Title */}
      <div className="flex items-center space-x-2">
        <img 
          src="/AppName_Logos_IconOnly.png" 
          alt="App Name" 
          className="w-8 h-8 object-contain"
        />
        <h1 className="text-xl font-bold text-app-text">
          App Name
        </h1>
      </div>
    </div>

    {/* Center Section - App Description */}
    <div className="hidden md:flex items-center">
      <span className="text-sm text-neutral-400">
        App Description
      </span>
    </div>

    {/* Right Section - Controls and Status */}
    <div className="flex items-center space-x-3">
      {/* Status Information */}
      <div className="hidden sm:flex items-center space-x-2 text-xs text-neutral-400">
        <span>Status: Online</span>
        <span>•</span>
        <span>{currentTime}</span>
      </div>

      {/* Settings Gear (MANDATORY) */}
      <button className="p-2 text-app-text hover:text-app-accent hover:bg-neutral-800 rounded-md transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {/* Logout Button (MANDATORY) */}
      <button className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-app-text hover:text-white rounded-md transition-all duration-200 text-sm font-medium border border-neutral-600 hover:border-neutral-500 shadow-sm hover:shadow-md">
        Logout
      </button>
      
      {/* Stats Toggle (hidden on mobile) */}
      <button className="hidden lg:block p-2 text-app-text hover:text-app-accent transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </button>
    </div>
  </div>
</header>
```

**Header Requirements (MANDATORY):**
- **Fixed positioning**: `fixed top-0 left-0 right-0 z-50`
- **App branding**: Logo + app name on left
- **Mobile menu button**: Hidden on desktop (`lg:hidden`)
- **App description**: Centered (hidden on small screens)
- **Settings gear**: Always visible, right side
- **Logout button**: Always visible, right side
- **Stats toggle**: Hidden on mobile (`hidden lg:block`)
- **Status info**: Hidden on small screens
- **Color customization**: Use app-specific color variables

### **Sidebar Header Design (MANDATORY)**
All sidebars **MUST** include this standardized header structure, but colors can be customized:

```tsx
<div className="mb-4 lg:mb-6 text-center">
  <div className="w-10 h-10 lg:w-12 lg:h-12 mx-auto rounded-full flex items-center justify-center shadow-lg mb-2">
    <img 
      src="/AppName_Logos_IconOnly.png" 
      alt="App Name"
      className="w-6 h-6 lg:w-8 lg:h-8 object-contain"
    />
  </div>
  <h3 className="text-sm lg:text-base font-semibold">
    Navigation
  </h3>
  <p className="text-xs">
    Choose your path
  </p>
</div>
```

**Note**: Colors, gradients, and specific styling can be customized per app.

### **Navigation Items**
- **Icon Size**: `text-lg lg:text-xl`
- **Active State**: Customizable colors with consistent structure
- **Hover State**: Customizable colors with consistent behavior
- **Border**: Customizable colors with consistent sizing

### **Buttons**
- **Primary**: Customizable colors with consistent sizing and hover effects
- **Secondary**: Customizable colors with consistent structure
- **Hover Effects**: `hover:scale-105 transition-all duration-200` (mandatory)

## 🎭 **Application-Specific Theming**

### **Distillara (Alchemy)**
- **Theme**: Warm, mystical, scientific
- **Colors**: **Custom amber/orange theme** (app-defined)
- **Icons**: Flask, book, clock, settings
- **Features**: Recipe management, material tracking, quality settings

### **Feastwell (Cooking)**
- **Theme**: Culinary, warm, inviting
- **Colors**: **Custom culinary theme** (app-defined)
- **Icons**: Utensils, food, nutrition
- **Features**: Recipe database, flavor system, meal planning

### **Hoardwell (Inventory)**
- **Theme**: Treasure, wealth, organization
- **Colors**: **Custom treasure theme** (app-defined)
- **Icons**: Gem, scale, bag, chart
- **Features**: Smart categorization, weight tracking, value estimation

### **Broke Unicorn Tavern (Social)**
- **Theme**: Social, gathering, adventure
- **Colors**: **Custom social theme** (app-defined)
- **Icons**: Castle, chat, mission board, character
- **Features**: Party chat, event planning, character meetups

### **Scriptoria (Gaming Systems)**
- **Theme**: Knowledge, learning, systems
- **Colors**: **Custom knowledge theme** (app-defined)
- **Icons**: Book, sword, castle, star
- **Features**: Gaming system library, rulesets, documentation

## 📱 **Responsive Design Requirements**

### **Mobile-First Approach**
- **Base styles**: Mobile-first (default)
- **Progressive enhancement**: Desktop styles added with `lg:` prefix
- **Touch-friendly**: Minimum 44px touch targets

### **Breakpoint Strategy**
```css
/* Mobile (default) */
w-48 p-3 mb-4 space-y-1 text-xs

/* Desktop (lg: 1024px+) */
lg:w-56 lg:p-4 lg:mb-6 lg:space-y-2 lg:text-sm
```

### **Responsive Grid Standards (MANDATORY)**
All grid layouts **MUST** use this exact pattern to ensure consistent column behavior:

```tsx
// Standard responsive grid pattern (CURRENTLY IMPLEMENTED)
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
```

**Why this pattern is critical:**
- **`md:grid-cols-2`** ensures 2 columns on medium screens (768px+) - perfect for iPad
- **Prevents 3 narrow columns** that create poor user experience
- **Maintains consistent behavior** across all applications
- **Matches Nexus dashboard** exactly

**Responsive behavior:**
- **Mobile (< 640px)**: 1 column
- **Small (640px+)**: 2 columns  
- **Medium (768px+)**: 2 columns ← **iPad size shows 2 columns!**
- **Large (1024px+)**: 2 columns
- **XL (1280px+)**: 3+ columns

### **Content Adaptation**
- **Icons**: Scale from `text-lg` to `lg:text-xl`
- **Text**: Scale from `text-xs` to `lg:text-sm`
- **Spacing**: Scale from compact to comfortable
- **Padding**: Scale from `p-2` to `lg:p-3`

## 🔧 **Implementation Guidelines**

### **CSS Class Naming**
- **Use Tailwind utilities** for consistency
- **Avoid custom CSS** unless absolutely necessary
- **Follow responsive pattern**: `base-class lg:enhanced-class`

### **Layout Structure (MANDATORY)**
All applications **MUST** use this exact layout structure to ensure consistent behavior:

```tsx
// Main layout container (CURRENTLY IMPLEMENTED)
<div className="flex flex-1 relative">
  {/* Left Sidebar - Always visible, fixed width */}
  {showSidebar && (
    <div className="relative">
      <LeftSidebar />
    </div>
  )}
  
  {/* Center Content - Takes remaining width */}
  <main className="flex-1 p-4 md:p-6 overflow-auto">
    {children}
  </main>
  
  {/* Desktop Stats Panel - Floating right sidebar */}
  {showStats && (
    <div className="hidden lg:block w-64 flex-shrink-0">
      <RightSidebar />
    </div>
  )}
</div>
```

### **Sidebar Positioning (CRITICAL)**
- **NEVER use `fixed` positioning** for sidebars - this causes layout issues
- **Use normal document flow** with `flex-shrink-0` to maintain width
- **Left sidebar must always be visible** at all screen sizes
- **Right sidebar hidden on mobile/tablet** using `hidden lg:block`

### **Component Structure**
```tsx
// Standard sidebar structure (CURRENTLY IMPLEMENTED)
<aside className="w-48 lg:w-56 border-r-2 shadow-lg">
  <div className="p-3 lg:p-4">
    {/* Header - MANDATORY */}
    {/* Navigation Items */}
    {/* Quick Actions */}
    {/* Status Indicators */}
  </div>
</aside>
```

**Note**: Colors, gradients, and specific styling can be customized per app.

### **State Management**
- **Active states**: Use consistent structure with customizable colors
- **Hover effects**: Implement `hover:scale-105` for buttons (mandatory)
- **Transitions**: Use `transition-all duration-200` for smooth animations (mandatory)

## 🖼️ **Image Organization Standards (CURRENT)**

### **Image File Structure (MANDATORY)**
All applications **MUST** follow this image organization:

```
Images/
├── AppName.png              # Regular image (main app icon)
├── AppName_HeroBanner.png   # Hero banner image
└── AppName_Logos_IconOnly.png # Outline/icon-only version
```

### **Image Usage Guidelines**
- **Regular Images**: Use for main app icons and primary branding
- **Hero Banners**: Use for large header images and promotional content
- **Icon-Only Logos**: Use for sidebars, navigation, and compact spaces

### **Image Implementation in Components**
```tsx
// Header/Logo usage (CURRENTLY IMPLEMENTED)
<img 
  src="/AppName_Logos_IconOnly.png" 
  alt="App Name" 
  className="w-6 h-6 lg:w-8 lg:h-8 object-contain"
/>

// Hero banner usage
<div className="bg-cover bg-center bg-no-repeat" 
     style={{backgroundImage: "url('/AppName_HeroBanner.png')"}}>
  {/* Content */}
</div>

// Sidebar icon usage
<img 
  src="/AppName_Logos_IconOnly.png" 
  alt="App Name" 
  className="w-6 h-6 object-contain"
/>
```

### **Image File Naming Convention**
- **Use PascalCase**: `Scriptoria.png`, `BrokeUnicornTavern.png`
- **Be specific**: `Distillara.png` not `distillara.png`
- **Include all three versions**: Regular, HeroBanner, Logos_IconOnly

## 🔌 **Module Integration Standards (CURRENT)**

### **Nexus Module Integration Pattern (MANDATORY)**
When integrating external modules into Nexus, **NEVER** embed the full application. Instead, create a **Nexus-native view** that fetches data via API:

```tsx
// CORRECT: Nexus-native integration (CURRENTLY IMPLEMENTED)
function ScriptoriaView({ onReturnToNexus }: ScriptoriaViewProps) {
  const [data, setData] = useState(null)
  
  // Fetch data from external app API
  const fetchData = async () => {
    const response = await fetch('http://localhost:PORT/api/module-info')
    const data = await response.json()
    setData(data)
  }
  
  // Return Nexus-native UI, not external app layout
  return (
    <div className="w-full h-full">
      {/* Nexus-styled content using external data */}
    </div>
  )
}

// WRONG: Full app embedding
function ScriptoriaView() {
  return (
    <div className="flex flex-col h-full">
      {/* External app header */}
      {/* External app left sidebar */}
      {/* External app content */}
    </div>
  )
}
```

### **Required Components for Module Integration**
1. **Main View Component**: `AppNameView` with `onReturnToNexus` prop
2. **Sidebar Component**: `AppNameView.Sidebar` for right panel
3. **API Integration**: Fetch data from external app endpoints
4. **Loading States**: Show loading spinners during API calls
5. **Error Handling**: Display error messages with retry options

### **API Endpoints Required**
All integrated modules **MUST** provide these endpoints:
- `/api/health` - Health check
- `/api/module-info` - Module information and data
- `/api/status` - Current status

### **Module View Structure**
```tsx
// Standard module view structure (CURRENTLY IMPLEMENTED)
<div className="w-full h-full">
  {/* Module Header */}
  <div className="mb-6 p-4 rounded-lg border">
    <div className="flex items-center space-x-3">
      <div className="w-12 h-12 flex items-center justify-center">
        <img src="/appname_logo_IconOnly.png" alt="App Name" className="w-full h-full object-contain" />
      </div>
      <div>
        <h1 className="text-2xl font-bold">App Name</h1>
        <p className="text-muted">App Description</p>
      </div>
    </div>
  </div>

  {/* Main Content */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Content sections */}
  </div>
</div>
```

**Note**: Colors and specific styling can be customized per app.

## 🎯 **Center Panel Layout Standards (UPDATED)**

### **Dashboard Grid Layout (CURRENTLY IMPLEMENTED)**
The main dashboard uses a sophisticated grid system with background images:

```tsx
// Dashboard grid layout (CURRENTLY IMPLEMENTED)
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
  {modules.map((module) => (
    <div
      key={module.id}
      className="relative overflow-hidden rounded-xl border-2 p-4 hover:shadow-lg transition-all duration-200 flex flex-col"
      style={{
        minHeight: '280px',
        backgroundImage: `url('/${getModuleImage(module.id)}.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Content with relative positioning for overlay */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Module content */}
      </div>
    </div>
  ))}
</div>
```

### **Module Card Structure**
Each module card includes:
- **Background Image**: Full-size app logo as background
- **Dark Overlay**: `bg-black/50` for text readability
- **Content Layout**: Flexbox column with proper spacing
- **Status Indicators**: Connection status and live data
- **Action Buttons**: Connect/Open in Nexus functionality

### **Responsive Behavior**
- **Mobile**: Single column layout
- **Tablet**: Two columns (md:grid-cols-2)
- **Desktop**: Two columns with option for more on larger screens
- **Touch Optimization**: Proper spacing for mobile interaction

## ✅ **Compliance Checklist**

Before deploying any application, ensure:

- [ ] **Menu sizing** matches Nexus standards exactly (`w-48 lg:w-56`)
- [ ] **Main header design** follows mandatory template structure (colors customizable)
- [ ] **Main header includes** settings gear and logout button (MANDATORY)
- [ ] **Main header positioning** uses `fixed top-0 left-0 right-0 z-50`
- [ ] **Sidebar header design** follows mandatory template structure (colors customizable)
- [ ] **Layout structure** uses mandatory flexbox pattern
- [ ] **Sidebar positioning** uses normal document flow (no `fixed` positioning)
- [ ] **Responsive grids** use `md:grid-cols-2` pattern for medium screens
- [ ] **Left sidebar always visible** at all screen sizes
- [ ] **Right sidebar hidden** on mobile/tablet (`hidden lg:block`)
- [ ] **Responsive breakpoints** use `lg:` prefix correctly
- [ ] **Typography scale** follows responsive pattern
- [ ] **Spacing system** uses standardized values
- [ ] **Component structure** matches Nexus patterns
- [ ] **Image organization** follows file structure standards
- [ ] **Module integration** uses Nexus-native pattern, not full app embedding
- [ ] **API endpoints** provide required health/status/module-info data
- [ ] **Dashboard grid** uses current responsive pattern
- [ ] **Module cards** include background images and dark overlays
- [ ] **No custom CSS** that could break consistency
- [ ] **Colors and themes** are app-specific and unique (no restrictions)

## 🚫 **Forbidden Practices**

- **Missing main header elements** - settings gear and logout button are MANDATORY
- **Incorrect header positioning** - must use `fixed top-0 left-0 right-0 z-50`
- **Custom sidebar widths** outside of `w-48 lg:w-56` and `w-64`
- **Fixed positioning** for sidebars (`fixed left-0 top-20`) - causes layout issues
- **Grid layouts without `md:grid-cols-2`** - creates 3 narrow columns on iPad
- **Left sidebar hidden** on any screen size
- **Right sidebar visible** on mobile/tablet (should be `hidden lg:block`)
- **Hardcoded pixel values** instead of Tailwind utilities
- **Non-responsive designs** that don't scale properly
- **Custom fonts** that break the fantasy theme
- **Inconsistent spacing** that doesn't follow the system
- **Embedding full external apps** instead of creating Nexus-native views
- **Missing API endpoints** for module integration
- **Inconsistent image naming** or missing image versions
- **Dashboard grids** that don't use the current responsive pattern
- **Module cards** without proper background images and overlays

## 🔄 **Update Process**

When updating the design specification:

1. **Test changes** in Nexus first
2. **Update this document** with new standards
3. **Apply changes** to all applications
4. **Verify consistency** across the ecosystem
5. **Document any exceptions** with clear reasoning

---

**Last Updated**: Current Development Session - Color Theme Restrictions Removed  
**Status**: All applications must follow current layout, grid, image, and module integration standards. Colors and themes are app-specific and unrestricted.  
**Next Review**: After major design changes or new applications added

## 📋 **Recent Updates (Current Session)**

### **Color Theme Freedom (NEW)**
- **Removed centralized color restrictions** - each app defines its own theme
- **Color flexibility is now a core feature** of the RuneFrameOS ecosystem
- **Each app maintains unique visual identity** through custom color schemes
- **Nexus will adapt** to integrate with different app color schemes in the future

### **Layout Structure Standardization (CURRENT)**
- **Updated to match current AppLayout implementation** with proper flexbox structure
- **Confirmed sidebar positioning** uses normal document flow (no `fixed` positioning)
- **Verified responsive grid behavior** uses `md:grid-cols-2` pattern correctly
- **Confirmed left sidebar always visible** at all screen sizes

### **Current Implementation Status**
- **AppLayout**: Uses proper flexbox with `relative` positioning for sidebars
- **LeftSidebar**: Implements current theme with proper sizing (colors customizable)
- **Dashboard**: Uses current responsive grid with background images and overlays
- **Module Integration**: All views properly integrated with Nexus-native patterns

### **Dashboard Grid System (CURRENT)**
- **Responsive Grid**: `grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4`
- **Module Cards**: Background images with dark overlays for readability
- **Touch Optimization**: Proper spacing and sizing for mobile devices
- **Status Integration**: Live connection status and module information

### **Standards to Maintain**
1. **Use exact layout structure** from current AppLayout implementation
2. **Never use `fixed` positioning** for sidebars
3. **Always use `md:grid-cols-2`** for responsive grids
4. **Ensure left sidebar visibility** at all screen sizes
5. **Hide right sidebar** on mobile/tablet with `hidden lg:block`
6. **Follow image organization standards** with all three image versions
7. **Use Nexus-native integration** for external modules, not full app embedding
8. **Provide required API endpoints** for health, status, and module-info
9. **Maintain current dashboard grid** with background images and overlays
10. **Colors and themes are completely customizable** per application
11. **Maintain structural consistency** while allowing visual uniqueness
