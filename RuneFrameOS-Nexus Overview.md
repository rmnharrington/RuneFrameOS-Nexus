# RuneFrame OS — Overview

RuneFrame OS™ is a **universal TTRPG platform** that connects modular, themed tools into a single cohesive ecosystem.  
It acts as the **core hub** where players (*Travelers*) and game masters (*Architects*) can access specialized applications, manage campaigns, and integrate rules from any game system.

RuneFrame OS is also the **repository and application layer for multiple gaming systems** — both **homegrown** (e.g., *Echeladon™*) and **third-party published systems** (such as GURPS, Dungeons & Dragons, Pathfinder, etc.).  
These stored systems can be applied directly to your games through **RuneForge**, the rules and mechanics engine within RuneFrame OS that adapts them to your campaigns.

Each connected module is its own independent service with its own UI and API endpoints. RuneFrame OS orchestrates these modules so they appear as **seamless panels/items** inside the platform when called.

---

## Connected Modules

| Module ID | Display Name | Function |
|-----------|--------------|----------|
| **RuneFrameOS-BrokeUnicornTavern** | Broke Unicorn Tavern | Social hub & in-game gathering place for Travelers. |
| **RuneFrameOS-Cryptwell** | Cryptwell | Undead/necromancy management and lore repository. |
| **RuneFrameOS-Distillara** | Distillara | Advanced alchemy crafting system with rarity tiers, economy, and failure mechanics. |
| **RuneFrameOS-Feastwell** | Feastwell | Cooking and recipe management system with immersive flavor text and game mechanics. |
| **RuneFrameOS-Hoardwell** | Hoardwell | Intelligent, immersive inventory management. |
| **RuneFrameOS-Loreforge** | Loreforge | Campaign world and lore creation tool for Architects. |
| **RuneFrameOS-Mercatrix** | Mercatrix | Barter, trade, and merchant system with economy simulation. |
| **RuneFrameOS-RuneWeaver** | RuneWeaver | Modular enchanting system using runes and energy circuits. |
| **RuneFrameOS-Scriptoria** | Scriptoria | Comprehensive gaming system library featuring Third-Party Publishers, the Echeladon system, Homegrown systems, and user-created rulesets. |
| **RuneFrameOS-TapestryEngine** | Tapestry Engine | Narrative engine for weaving interconnected storylines. |
| **RuneFrameOS-TravelersTable** | Travelers’ Table | Party/campaign session manager for group play. |
| **RuneFrameOS-PersonaVault** | PersonaVault | Character binder where all Traveler characters are stored and linked to accounts. |

---

## Core Platform Role

RuneFrame OS:

1. **Manages authentication & linking** between user accounts and their data across all modules.  
2. **Stores, manages, and applies game systems** — homegrown and licensed — via **RuneForge**.  
3. **Calls module APIs** to launch, display, and exchange data in real time.  
4. **Keeps UI consistent** so all modules feel like part of one platform.  
5. **Enables cross-module data sharing** (e.g., a PersonaVault character using items from Hoardwell, cooking in Feastwell, trading in Mercatrix).

---

## RuneForge — System Application Engine

**RuneForge** is the subsystem within RuneFrame OS responsible for:

- **Importing & storing** game system rule sets (homegrown and licensed).  
- **Adapting mechanics** from different systems for use within the RuneFrame OS ecosystem.  
- **Applying rules dynamically** to campaigns, characters, and modules.  
- **Supporting hybrid campaigns** where multiple systems are blended.  
- **Version control & updates** for stored systems to ensure rule integrity.

**Example:**  
A Traveler’s PersonaVault character built using D&D 5e can:  
- Equip items stored in Hoardwell.  
- Cook recipes from Feastwell using system-appropriate skill checks.  
- Engage in trades in Mercatrix using the currency rules from the chosen system.  

All of these interactions are governed by **RuneForge**’s application of the selected game system.

---
