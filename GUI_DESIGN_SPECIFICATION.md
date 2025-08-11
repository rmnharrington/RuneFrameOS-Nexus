# RuneFrameOS GUI Design Specification

## 🎯 **Design Philosophy**

The RuneFrameOS ecosystem follows a **unified design language** where all applications maintain visual consistency while preserving their unique thematic elements. **Nexus serves as the design foundation** that all other applications must follow.

## 🎨 **Color Palette**

### **Primary Colors**
- **Amber**: `#f59e0b` - Primary brand color, warmth, energy
- **Orange**: `#ea580c` - Secondary brand color, creativity, adventure
- **Red**: `#dc2626` - Accent color, power, intensity

### **Gradient Combinations**
- **Primary Gradient**: `from-amber-500 via-orange-500 to-red-500`
- **Sidebar Gradients**: 
  - Left: `from-amber-50 to-orange-50`
  - Right: `from-orange-50 to-red-50`
- **Button Gradients**: `from-amber-500 to-orange-600`

### **Semantic Colors**
- **Success**: `#16a34a` (green-600)
- **Warning**: `#ca8a04` (yellow-600)
- **Error**: `#dc2626` (red-600)
- **Info**: `#2563eb` (blue-600)

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

### **Header Design (MANDATORY)**
All sidebars **MUST** include this standardized header:

```tsx
<div className="mb-4 lg:mb-6 text-center">
  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-2 lg:mb-4 shadow-lg">
    <img
      src="/runeframeos_logo2.png"
      alt="RuneFrameOS"
      className="w-6 h-6 lg:w-8 lg:h-8 object-contain"
    />
  </div>
  <h2 className="text-sm lg:text-base font-fantasy font-bold text-amber-800">
    Navigation
  </h2>
</div>
```

### **Navigation Items**
- **Icon Size**: `w-4 h-4 lg:w-5 lg:h-5`
- **Active State**: `bg-gradient-to-r from-amber-200 to-orange-200`
- **Hover State**: `hover:bg-amber-100/50`
- **Border**: `border border-amber-200/50`

### **Buttons**
- **Primary**: `bg-gradient-to-r from-amber-500 to-orange-600`
- **Secondary**: `bg-white/60 border border-amber-200/50`
- **Hover Effects**: `hover:scale-105 transition-all duration-200`

## 🎭 **Application-Specific Theming**

### **Distillara (Alchemy)**
- **Theme**: Warm, mystical, scientific
- **Colors**: Amber to orange gradients
- **Icons**: Flask, book, clock, settings
- **Features**: Recipe management, material tracking, quality settings

### **Feastwell (Cooking)**
- **Theme**: Culinary, warm, inviting
- **Colors**: Amber to red gradients
- **Icons**: Utensils, food, nutrition
- **Features**: Recipe database, flavor system, meal planning

### **Hoardwell (Inventory)**
- **Theme**: Treasure, wealth, organization
- **Colors**: Amber to orange gradients
- **Icons**: Gem, scale, bag, chart
- **Features**: Smart categorization, weight tracking, value estimation

### **Broke Unicorn Tavern (Social)**
- **Theme**: Social, gathering, adventure
- **Colors**: Slate to blue gradients
- **Icons**: Castle, chat, mission board, character
- **Features**: Party chat, event planning, character meetups

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

### **Content Adaptation**
- **Icons**: Scale from `w-4 h-4` to `lg:w-5 lg:h-5`
- **Text**: Scale from `text-xs` to `lg:text-sm`
- **Spacing**: Scale from compact to comfortable
- **Padding**: Scale from `p-2` to `lg:p-3`

## 🔧 **Implementation Guidelines**

### **CSS Class Naming**
- **Use Tailwind utilities** for consistency
- **Avoid custom CSS** unless absolutely necessary
- **Follow responsive pattern**: `base-class lg:enhanced-class`

### **Component Structure**
```tsx
// Standard sidebar structure
<aside className="w-48 lg:w-56 bg-gradient-to-b from-amber-50 to-orange-50 border-r-2 border-amber-300/30 shadow-lg">
  <div className="p-3 lg:p-4">
    {/* Header - MANDATORY */}
    {/* Navigation Items */}
    {/* Quick Actions */}
    {/* Status Indicators */}
  </div>
</aside>
```

### **State Management**
- **Active states**: Use consistent color schemes
- **Hover effects**: Implement `hover:scale-105` for buttons
- **Transitions**: Use `transition-all duration-200` for smooth animations

## ✅ **Compliance Checklist**

Before deploying any application, ensure:

- [ ] **Menu sizing** matches Nexus standards exactly
- [ ] **Header design** follows mandatory template
- [ ] **Responsive breakpoints** use `lg:` prefix correctly
- [ ] **Color palette** stays within approved ranges
- [ ] **Typography scale** follows responsive pattern
- [ ] **Spacing system** uses standardized values
- [ ] **Component structure** matches Nexus patterns
- **No custom CSS** that could break consistency

## 🚫 **Forbidden Practices**

- **Custom sidebar widths** outside of `w-48 lg:w-56` and `w-64`
- **Hardcoded pixel values** instead of Tailwind utilities
- **Inconsistent color schemes** that don't match the palette
- **Non-responsive designs** that don't scale properly
- **Custom fonts** that break the fantasy theme
- **Inconsistent spacing** that doesn't follow the system

## 🔄 **Update Process**

When updating the design specification:

1. **Test changes** in Nexus first
2. **Update this document** with new standards
3. **Apply changes** to all applications
4. **Verify consistency** across the ecosystem
5. **Document any exceptions** with clear reasoning

---

**Last Updated**: Current Development Session  
**Status**: All applications compliant with Nexus standards  
**Next Review**: After major design changes or new applications added
