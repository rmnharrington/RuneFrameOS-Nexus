# Hoardwell - Character Inventory Manager Mockup
## RuneFrameOS™ Gaming Ecosystem

---

## 🎯 APP OVERVIEW
**Hoardwell** is a system-agnostic character inventory manager designed to work across multiple characters and any possible genre. It provides comprehensive gear management with visual representation and detailed tracking.

---

## 🏗️ LAYOUT STRUCTURE

### 1. HEADER BAR (Fixed - 80px height)
```
[🏺] Hoardwell - Character Inventory Manager    [Welcome, Username]    [⚙️] [🚪]
     RuneFrameOS™ Gaming Ecosystem               Ready to forge your legend?
```

**Styling**: Gradient from amber-900 via orange-800 to red-900
**Border**: 2px amber-400/30 at bottom

---

### 2. LEFT SIDEBAR (Fixed - 280px width)
```
[🏺] RuneFrameOS
Navigation
├── 📊 Dashboard
├── 👤 Characters  
├── 🎒 Inventories
├── 📚 Item Library
├── 🛠️ Tools
└── 👥 Social

Quick Actions
├── ➕ New Character
└── 🎲 Quick Roll
```

**Styling**: Gradient from amber-50 to orange-50
**Active State**: Current section highlighted with amber-200 to orange-200 gradient

---

### 3. CENTER CONTENT AREA (Dynamic - Flexible width)
**Main Inventory Interface**

#### Character Selection Bar
```
[👤 Character 1] [👤 Character 2] [👤 Character 3] [+ Add Character]
Active: Character 1 - Level 5 Fighter (D&D 5e)
```

#### Inventory Grid Layout
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 📊 INVENTORY OVERVIEW                                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ Total Items: 24 | Total Weight: 45.2 lbs | Total Value: 1,250 gp          │
│ Encumbrance: Medium | Durability Status: 3 items need repair              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ 🎒 EQUIPPED ITEMS                                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ [🛡️] [⚔️] [👕] [👖] [👢] [💍] [💍] [🎒]                                │
│ Shield  Sword   Armor Pants Boots Ring1 Ring2 Bag                         │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ 📦 INVENTORY GRID                                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ [🖼️] Item Name        │ Location │ Weight │ Cost   │ Durability │ Actions │
├─────────────────────────────────────────────────────────────────────────────┤
│ [🖼️] Longsword +1     │ Belt     │ 3.0 lbs│ 50 gp  │ 95%        │ [✏️][🗑️] │
│ [🖼️] Healing Potion   │ Bag      │ 0.5 lbs│ 50 gp  │ 100%       │ [✏️][🗑️] │
│ [🖼️] Leather Armor    │ Worn     │ 10.0 lbs│ 10 gp  │ 80%        │ [✏️][🗑️] │
│ [🖼️] Rope (50ft)     │ Bag      │ 10.0 lbs│ 1 gp   │ 100%       │ [✏️][🗑️] │
│ [🖼️] Torch           │ Bag      │ 1.0 lbs │ 0.1 gp │ 100%       │ [✏️][🗑️] │
│ [🖼️] Gold Coins      │ Purse    │ 0.0 lbs │ 1,089 gp│ N/A        │ [✏️][🗑️] │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Item Detail Modal (When clicking on item)
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🗡️ Longsword +1 - Item Details                                            │
├─────────────────────────────────────────────────────────────────────────────┤
│ [🖼️] Item Image (200x200px)                                              │
│                                                                             │
│ Name: Longsword +1                                                         │
│ Type: Weapon (Sword)                                                       │
│ Rarity: Uncommon                                                            │
│                                                                             │
│ Description: A finely crafted longsword with a +1 magical enhancement.     │
│ The blade gleams with a faint blue light and feels perfectly balanced.     │
│                                                                             │
│ Location: Belt (Quick Access)                                               │
│ Weight: 3.0 lbs                                                            │
│ Cost: 50 gold pieces                                                       │
│ Durability: 95% (Excellent condition)                                      │
│                                                                             │
│ Properties: +1 to attack and damage rolls, Versatile (1d8/1d10)           │
│                                                                             │
│ [✏️ Edit] [📋 Copy] [🗑️ Delete] [❌ Close]                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### 4. RIGHT SIDEBAR (Fixed - 320px width)
**Inventory Management & Controls**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🎒 INVENTORY CONTROLS                                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ ➕ Add New Item                                                            │
│ 📥 Import Items                                                            │
│ 📤 Export Inventory                                                        │
│ 🔍 Search Items                                                            │
│ 🏷️ Filter by Category                                                      │
│                                                                             │
│ 📊 QUICK STATS                                                             │
│ ├── Items by Location                                                      │
│ │   ├── Worn: 5 items                                                     │
│ │   ├── Belt: 3 items                                                     │
│ │   ├── Bag: 12 items                                                     │
│ │   └── Stored: 4 items                                                   │
│ │                                                                          │
│ ├── Weight Distribution                                                    │
│ │   ├── Light: 8 items                                                    │
│ │   ├── Medium: 12 items                                                  │
│ │   └── Heavy: 4 items                                                    │
│ │                                                                          │
│ └── Value Summary                                                          │
│     ├── Weapons: 450 gp                                                   │
│     ├── Armor: 200 gp                                                     │
│     ├── Consumables: 150 gp                                               │
│     └── Misc: 450 gp                                                      │
│                                                                             │
│ ⚠️ ALERTS                                                                  │
│ ├── 3 items need repair                                                    │
│ ├── 2 items are low on charges                                            │
│ └── 1 item is cursed                                                      │
│                                                                             │
│ 🎯 QUICK ACTIONS                                                           │
│ ├── 🎲 Roll for random item                                               │
│ ├── 📋 Generate item list                                                 │
│ ├── ⚖️ Calculate encumbrance                                              │
│ └── 💰 Appraise inventory                                                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎨 DESIGN ELEMENTS

### Color Scheme
- **Primary**: Amber (#f59e0b) - Brand color
- **Secondary**: Orange (#ea580c) - Accents
- **Accent**: Red (#dc2626) - Warnings/errors
- **Backgrounds**: Amber-50 to orange-50 gradients
- **Status Colors**: Green (good), Yellow (warning), Red (critical)

### Typography
- **Headings**: Fantasy font, 36px/30px/24px
- **Body**: System font stack, 16px
- **Labels**: 14px, secondary information
- **Captions**: 12px, timestamps and metadata

### Icons & Imagery
- **Item Images**: 200x200px, rounded corners, drop shadows
- **UI Icons**: 24px, consistent stroke width
- **Status Icons**: Color-coded with text labels
- **Action Icons**: Hover effects with scale and color changes

---

## 🔧 FUNCTIONAL FEATURES

### Item Management
- **Add/Edit/Delete**: Full CRUD operations for items
- **Image Upload**: Drag & drop or file picker
- **Bulk Operations**: Select multiple items for batch actions
- **Search & Filter**: By name, type, location, rarity, etc.

### Character Support
- **Multiple Characters**: Switch between different characters
- **System Agnostic**: Works with any TTRPG system
- **Custom Fields**: Add system-specific properties
- **Import/Export**: JSON, CSV, or system-specific formats

### Inventory Features
- **Weight Tracking**: Automatic encumbrance calculation
- **Durability System**: Track item condition and repairs
- **Location Management**: Organize items by storage location
- **Value Tracking**: Currency conversion and total worth

### Advanced Features
- **Item Templates**: Pre-built items for common systems
- **Random Generation**: Generate random loot or items
- **Shopping Lists**: Plan purchases and track costs
- **Maintenance Logs**: Track repairs, upgrades, and modifications

---

## 📱 RESPONSIVE DESIGN

### Desktop (1200px+)
- Full layout with all sidebars visible
- Grid layout with 4-6 columns for items
- Detailed item information always visible

### Tablet (768px - 1199px)
- Collapsible sidebars with overlay
- Grid reduces to 2-3 columns
- Item details in expandable rows

### Mobile (<768px)
- Stacked layout with hamburger menu
- Single column item grid
- Swipe gestures for item actions
- Bottom navigation for main sections

---

## 🚀 IMPLEMENTATION NOTES

### Component Structure
```typescript
<AppLayout appName="Hoardwell" appIcon="🏺">
  <HeaderBar />
  <div className="flex">
    <LeftSidebar />
    <main className="flex-1">
      <CharacterSelector />
      <InventoryOverview />
      <InventoryGrid />
      <ItemDetailModal />
    </main>
    <RightSidebar appType="hoardwell" />
  </div>
  <AppFooter />
</AppLayout>
```

### Key Components
- **CharacterSelector**: Dropdown for active character
- **InventoryOverview**: Summary statistics and status
- **InventoryGrid**: Main item display with sorting/filtering
- **ItemDetailModal**: Detailed item view and editing
- **InventoryControls**: Right sidebar management tools

### Data Structure
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

---

This mockup provides a comprehensive foundation for the Hoardwell character inventory manager, following the established RuneFrameOS design system while delivering powerful inventory management capabilities across any gaming system or genre.
