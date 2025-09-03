# Feastwell™ Cookbook Creation Guide

## Overview
This guide ensures all cookbook pages (Level 1, 2, 3, etc.) have identical structure, styling, and functionality. Each page must be a perfect copy of the template with only content changes.

## File Structure
- `Feastwell_Codex_Level_3.html` - **MASTER TEMPLATE** (DO NOT MODIFY STRUCTURE)
- `Feastwell_Codex_Level_2.html` - Copy of Level 3 with Level 2 content
- `Feastwell_Codex_Level_1.html` - Copy of Level 3 with Level 1 content
- Future levels follow same pattern

## PROVEN SUCCESSFUL PROCESS (Level 2 Creation)

### What Actually Worked:
1. **Create Basic HTML Structure First**: Start with minimal HTML (DOCTYPE, head, body, container, header, content, footer, modal)
2. **Add CSS Styles**: Copy ALL CSS from Level 3 exactly - this ensures visual consistency
3. **Add JavaScript**: Add ONLY the JavaScript functions needed (openModal, closeModal, window.onclick)
4. **Add ONE Ingredient**: Start with just one ingredient card and its modal content
5. **Test Before Adding More**: Verify the single ingredient works perfectly before adding others

### Step-by-Step Process (PROVEN METHOD):

#### Step 1: Create Basic File Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Feastwell Codex — Level X Ingredients</title>
    <!-- CSS will be added here -->
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Feastwell™ Codex</h1>
            <h2>Level X — [Tier] Ingredients</h2>
            <div class="subtitle">The Complete Guide to Fantasy Ingredients and Culinary Magic</div>
        </div>
        
        <div class="content">
            <div class="intro">
                <p>[Level-appropriate intro text]</p>
            </div>
            
            <div class="level-section">
                <div class="level-title">Level X — [Tier] Ingredients</div>
                <div class="level-description">[Tier description]</div>
                
                <div class="ingredients-grid">
                    <!-- Ingredient cards will be added here -->
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>Feastwell™ Codex — Level X Ingredients | [Footer text]</p>
        </div>
    </div>
    
    <!-- Modal structure -->
    <div id="ingredientModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <span class="close" onclick="closeModal()">&times;</span>
                <div class="modal-title" id="modalTitle">Ingredient Name</div>
                <div class="modal-subtitle" id="modalSubtitle">Scientific Name — "Nickname"</div>
            </div>
            <div class="modal-body" id="modalBody">
                <!-- Content will be loaded here -->
            </div>
        </div>
    </div>
</body>
</html>
```

#### Step 2: Add CSS Styles
- Copy ALL CSS from `Feastwell_Codex_Level_3.html` between `<style>` tags
- This ensures 100% visual consistency
- DO NOT modify any CSS classes or properties

#### Step 3: Add JavaScript Functions
```javascript
<script>
    function openModal(ingredientId) {
        const modal = document.getElementById('ingredientModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalSubtitle = document.getElementById('modalSubtitle');
        const modalBody = document.getElementById('modalBody');
        
        // Add ingredient data here (see Ingredient Addition Process below)
        
        modal.style.display = 'block';
    }
    
    function closeModal() {
        document.getElementById('ingredientModal').style.display = 'none';
    }
    
    // Close modal when clicking outside of it
    window.onclick = function(event) {
        const modal = document.getElementById('ingredientModal');
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
</script>
```

#### Step 4: Add ONE Ingredient Card
```html
<div class="ingredient-card" onclick="openModal('ingredient_name')">
    <div class="card-background" style="background-image: url('ingredients/img/ingredient_name.png')"></div>
    <div class="card-overlay"></div>
    <div class="card-content">
        <div class="card-name">Ingredient Name</div>
        <div class="card-scientific">(Scientific Name — "Nickname")</div>
        <div class="card-description">Brief description for card display</div>
    </div>
</div>
```

#### Step 5: Add Modal Content for That Ingredient
- Add the ingredient's modal content to the JavaScript (see Ingredient Addition Process below)
- Test that the modal opens and displays correctly
- Only after confirming it works, add the next ingredient

### What NEVER Changes
- All CSS classes and styling
- HTML structure and div hierarchy  
- JavaScript function names and logic
- Modal structure and layout
- Card design and overlay system
- Photo section structure
- Section titles and formatting

### Step 3: What NEVER Changes
- All CSS classes and styling
- HTML structure and div hierarchy
- JavaScript function names and logic
- Modal structure and layout
- Card design and overlay system
- Photo section structure
- Section titles and formatting

## Ingredient Addition Process

### For Each Ingredient:
1. **Add Card to Grid**:
   ```javascript
   addIngredientCard('Ingredient Name', 'Scientific Name — "Nickname"', 'Brief description for card', 'image_name.png');
   ```

2. **Add Modal Content** (EXACT STRUCTURE - DO NOT MODIFY):
   ```javascript
   if (ingredientId === 'ingredient_name') {
       modalTitle.textContent = 'Ingredient Name';
       modalSubtitle.textContent = '(Scientific Name — "Nickname")';
       modalBody.innerHTML = `
           <div class="photo-section">
               <div class="photo-grid">
                   <div class="photo-placeholder">
                       <img src="ingredients/img/image_name.png" alt="Atmospheric description">
                       <div class="photo-caption">Poetic, atmospheric caption text</div>
                   </div>
                   <div class="photo-placeholder">
                       <img src="ingredients/img/image_name.png" alt="Close-up description">
                       <div class="photo-caption">Another poetic caption</div>
                   </div>
                   <div class="photo-placeholder">
                       <img src="ingredients/img/image_name.png" alt="Culinary use description">
                       <div class="photo-caption">Final atmospheric caption</div>
                   </div>
               </div>
           </div>
           
           <div class="section">
               <div class="section-title">Description</div>
               <div class="description">
                   Rich, narrative, story-driven description that reads like a fantasy novel. Use vivid imagery, poetic language, and atmospheric details. This should be 2-3 paragraphs of beautiful prose that makes the reader feel like they're experiencing the ingredient.
               </div>
           </div>
           
           <div class="section">
               <div class="section-title">Culinary Notes</div>
               <div class="culinary-notes">
                   <p>Rich, narrative description of flavor experience. Use poetic language to describe taste, texture, and sensation. This should read like a food critic's most beautiful review.</p>
                   
                   <p>Continue with more narrative about preparation methods, pairing suggestions, and culinary philosophy. Always use story-driven language, not technical data.</p>
                   
                   <p>End with pairing advice and warnings, all written in the same rich, narrative style.</p>
               </div>
           </div>
           
           <div class="section">
               <div class="section-title">Uses in the Kitchen</div>
               <div class="uses-grid">
                   <div class="use-item">
                       <h4>Daily Fare</h4>
                       <p>Narrative description of everyday use, written like a story.</p>
                   </div>
                   <div class="use-item">
                       <h4>Festival Table</h4>
                       <p>Rich description of special occasion use with atmospheric details.</p>
                   </div>
                   <div class="use-item">
                       <h4>Street Food</h4>
                       <p>Vivid description of street food applications with cultural context.</p>
                   </div>
                   <div class="use-item">
                       <h4>Gourmet Experiment</h4>
                       <p>Creative, imaginative description of advanced culinary applications.</p>
                   </div>
               </div>
           </div>
           
           <div class="section">
               <div class="section-title">Effects</div>
               <div class="effects">
                   <p>Rich, narrative description of magical/culinary effects. Write like describing a mystical experience, not technical data. Use poetic language to describe sensations, benefits, and any warnings.</p>
               </div>
           </div>
           
           <div class="section">
               <div class="section-title">Lore & Tradition</div>
               <div class="lore">
                   <p>Beautiful, story-driven lore that reads like fantasy worldbuilding. Include legends, cultural significance, and traditional uses. This should feel like reading a fantasy novel's worldbuilding section.</p>
               </div>
           </div>
           
           <div class="section">
               <div class="section-title">Practical Notes</div>
               <div class="practical-notes">
                   <p><strong>Harvest:</strong> Narrative description of harvesting methods and timing, written like a guide's wisdom.</p>
                   <p><strong>Storage:</strong> Rich description of storage methods and preservation techniques.</p>
                   <p><strong>Price:</strong> Atmospheric description of market value and economic context.</p>
               </div>
           </div>
           
           <div class="section">
               <div class="section-title">Quoted Wisdom</div>
               <div class="quotes">
                   <div class="quote">
                       "Beautiful, poetic quote that captures the essence of the ingredient" — Character Name
                   </div>
                   <div class="quote">
                       "Second atmospheric quote with different perspective" — Another Character
                   </div>
               </div>
           </div>
       `;
   }
   ```

## Image Requirements
- All images go in: `docs/ingredients/img/`
- File naming: `ingredient_name.png` (lowercase, underscores)
- Each ingredient needs 2-3 photos for the photo section
- Card background uses same image as first photo

## Modal Visual Structure & Styling

### Modal Layout (DO NOT MODIFY)
- **Header**: Purple gradient background with white text
- **Photo Section**: 3 images in a grid with atmospheric captions
- **Section Titles**: Purple underline, large serif font
- **Use Items**: Light gray background with purple left border
- **Quotes Section**: Gradient background with purple left border
- **All Text**: Rich, narrative style - NO technical/bland content

### Content Guidelines
- **Narrative Style**: Rich, story-driven descriptions that read like fantasy novels
- **No JSON Data**: Pure cookbook entries, not technical data or flavor profiles
- **Consistent Sections**: Always include all 7 sections with exact structure
- **Photo Captions**: Poetic, atmospheric text that enhances the mood
- **Quotes**: 2 quotes per ingredient, attributed to fantasy characters
- **Language**: Use vivid imagery, poetic language, and atmospheric details
- **Tone**: Should feel like reading a beautiful fantasy cookbook, not a technical manual

## CRITICAL: What Went Wrong Before (AVOID THESE MISTAKES)

### Previous Failed Attempts:
1. **Copying Entire Level 3 File**: This led to leftover Level 3 content mixed with Level 2 content
2. **Large File Edits**: Trying to remove all Level 3 content at once caused timeouts and corruption
3. **Inconsistent Modal Content**: Adding Level 3 modal content to Level 2 files
4. **Structural Modifications**: Changing CSS or HTML structure instead of just content
5. **Adding Multiple Ingredients at Once**: Should add ONE ingredient, test, then add the next

### Why the New Process Works:
- **Build from Scratch**: Start with basic structure, add components incrementally
- **Copy CSS Exactly**: Ensures 100% visual consistency with Level 3
- **One Ingredient at a Time**: Test each ingredient before adding the next
- **No File Copying**: Build new file from template, don't copy existing files
- **Incremental Testing**: Verify each step works before proceeding

## Quality Checklist
- [ ] File built using PROVEN SUCCESSFUL PROCESS above
- [ ] Basic HTML structure created first
- [ ] ALL CSS copied exactly from Level 3
- [ ] JavaScript functions added (openModal, closeModal, window.onclick)
- [ ] ONE ingredient added and tested before adding more
- [ ] Modal opens correctly for each ingredient
- [ ] All sections present and properly formatted
- [ ] Photo section has 2-3 images with captions
- [ ] Quotes section has 2 attributed quotes
- [ ] Rich, narrative content (not technical/JSON data)
- [ ] Visual consistency with Level 3 confirmed

## Future Integration
Once all individual level files are complete, they will be combined into a single master cookbook with navigation between levels.

---
**Remember**: Consistency is key. Every page must look and function identically to provide a seamless user experience across hundreds of ingredients.
