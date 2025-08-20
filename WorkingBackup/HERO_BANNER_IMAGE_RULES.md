# 🚨 **CRITICAL HERO BANNER IMAGE RULES**

## **NEVER VIOLATE THESE RULES - THEY ARE ABSOLUTE**

### **✅ CORRECT FILES TO USE**
- **`[APPNAME]_HeroBanner.png`** - Clean background image for hero banner
- **NO text overlay** - Just the background image
- **Purpose**: HeroBanner component background

### **❌ NEVER USE THESE FILES**
- **`[APPNAME]_HeroBanner_wText.png`** - Has text overlay
- **NOT for hero banners** - Text will interfere with component text
- **Purpose**: Marketing materials, other UI elements

---

## **File Copy Instructions**

### **CORRECT COPY COMMAND**
```bash
# ✅ RIGHT - Copy clean hero banner image
cp Images/Hoardwell_HeroBanner.png RuneFrameOS-Hoardwell/public/

# ❌ WRONG - Never copy the _wText version
cp Images/Hoardwell_HeroBanner_wText.png RuneFrameOS-Hoardwell/public/
```

### **Verification Steps**
1. **Check file name**: Must end with `_HeroBanner.png` (NO `_wText`)
2. **Check file size**: `_wText` files are usually larger due to text overlay
3. **Check content**: Hero banner images should be clean backgrounds

---

## **Why This Matters**

### **Hero Banner Component**
- Uses `[APPNAME]_HeroBanner.png` as background
- Overlays its own text content on top
- If image has text overlay, it creates **double text** (ugly and confusing)

### **Marketing Images**
- `[APPNAME]_HeroBanner_wText.png` are for other uses
- Perfect for social media, documentation, etc.
- **NOT for hero banner backgrounds**

---

## **Examples**

### **✅ CORRECT**
```
Hoardwell_HeroBanner.png → Clean background for hero banner
Distillara_HeroBanner.png → Clean background for hero banner
Feastwell_HeroBanner.png → Clean background for hero banner
```

### **❌ WRONG**
```
Hoardwell_HeroBanner_wText.png → Has text overlay (WRONG!)
Distillara_HeroBanner_wText.png → Has text overlay (WRONG!)
Feastwell_HeroBanner_wText.png → Has text overlay (WRONG!)
```

---

## **Automated Checks**

The deployment scripts now include automatic checks to prevent this error:
- ✅ Verifies correct image exists
- ❌ Blocks deployment if `_wText` version is found
- 🚨 Provides clear error messages

---

## **Remember**

**Hero Banner = Clean Background Image (NO text overlay)**
**Marketing Image = Text Overlay Image (NOT for hero banners)**

**NEVER MIX THESE UP!** 🎯
