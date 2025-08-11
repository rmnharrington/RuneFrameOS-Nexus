Here is a deep search report on expanding the templates to a science fiction scope, including a hierarchical referencing system.

***

## Deep Search Report: Galactic Scope Expansion

### **Introduction**
This report outlines a comprehensive framework for expanding the existing world-building templates to accommodate a science fiction setting on a galactic scale. The core of this framework is a **hierarchical referencing system** designed to logically connect celestial bodies in a tree-based format, from individual worlds to entire galaxies. This report also proposes a suite of new templates, built in the style of the existing "locked" templates, to manage sci-fi-specific concepts such as starships, galactic factions, and new technologies.

***

### **Part 1: The Hierarchical Referencing System**
To manage the vastness of a sci-fi universe and create clear, machine-readable relationships between locations, a tree-based referencing system is necessary. We will call this the **Celestial Navigation Code (CNC)**.

The CNC is a unique dot-notation address assigned to every significant entity, from a planet to a galaxy. It clearly defines an entity's location and its parent in the cosmic hierarchy.

#### **CNC Structure:**
The proposed format is `GALAXY.SECTOR.SYSTEM.BODY`.

* **GALAXY:** A unique identifier for the galaxy (e.g., `M51` for the Whirlpool Galaxy, or `AYTHERIA` for a custom name).
* **SECTOR:** A defined quadrant, sector, or other large region of the galaxy (e.g., `ALPHA`, `COREWARD`, or a designation like `S77`).
* **SYSTEM:** A specific star system within that sector (e.g., `SOL`, `CYGNUS-X1`, or a designation like `KELT-9`).
* **BODY:** An individual planet, moon, space station, or significant asteroid within that system (e.g., `EARTH`, `LUNA`, `DEEP-SPACE-9`).

#### **Implementation in Templates:**
Every new and existing template that represents a physical location or entity within that location would include two new fields:

* **CNC:** The full, unique Celestial Navigation Code for that entity.
* **Parent CNC:** The CNC of the entity's direct parent. This is the key to creating the tree structure.

**Example Hierarchy:**

* **Galaxy Template**
    * **CNC:** `AYTHERIA`
    * **Parent CNC:** (None)
* **Galactic Sector Template**
    * **CNC:** `AYTHERIA.COREWARD`
    * **Parent CNC:** `AYTHERIA`
* **Star System Template**
    * **CNC:** `AYTHERIA.COREWARD.CYGNUS-X1`
    * **Parent CNC:** `AYTHERIA.COREWARD`
* **World Template (Existing, Unchanged)**
    * **CNC:** `AYTHERIA.COREWARD.CYGNUS-X1.AETHEL`
    * **Parent CNC:** `AYTHERIA.COREWARD.CYGNUS-X1`

This system allows for easy querying and understanding of cosmic geography. For example, a query for all entities with a CNC starting with "`AYTHERIA.COREWARD`" would return everything within that sector.

***

### **Part 2: Proposed New Sci-Fi Templates**
The following new templates are designed to manage galactic-scale concepts without altering the existing template library. They should all include the **CNC** and **Parent CNC** fields where applicable.

---

#### **Galaxy Template**
This is the top-level container for a galactic setting.

* **Galaxy Name:** [Name of the galaxy, e.g., Andromeda, Aytheria]
* **CNC:** [Unique galaxy-level code, e.g., M31, AYTH]
* **Parent CNC:** [Usually None, unless in a galactic cluster]
* **Galaxy Type:** [e.g., Spiral, Elliptical, Irregular, Ring]
* **Age:** [In billions of years]
* **Diameter:** [In light-years]
* **Dominant Factions:** [List of the major powers controlling or inhabiting the galaxy]
* **Prevalent Species:** [List of the most widespread or powerful species]
* **Cosmological Features:** [Description of notable nebulae, black holes, unique star clusters, cosmic anomalies, etc.]
* **Galactic History:** [A summary of the galaxy's history, including major wars, extinction events, and the rise of civilizations]
* **Rules of Physics & Magic:** [Any unique universal laws, e.g., "Hyperspace travel is possible," "Psionics are common," "Magic is non-existent"]
* **Tags:** [e.g., Hard Sci-Fi, Space Opera, High-Tech, Post-Apocalyptic]

---

#### **Star System Template**
This template details the contents of a single star system.

* **System Name:** [e.g., Sol, Kepler-186, Trappist-1]
* **CNC:** [e.g., AYTHERIA.COREWARD.TRAPPIST-1]
* **Parent CNC:** [CNC of the Galactic Sector]
* **Primary Star(s):**
    * **Star 1:** [Name, Type (e.g., G-type main-sequence, Red Giant), Size, Luminosity]
    * **Star 2 (if any):** [Details]
* **Planetary Bodies:** [A list of planets, with a brief descriptor. Use the full World Template for detailed planets.]
    * *Planet 1:* [Name] - [Type, e.g., Terrestrial, Gas Giant, Ice Giant]
    * *Planet 2:* [Name] - [Type]
* **Other Celestial Bodies:** [List of asteroid belts, major moons, comets, or other significant objects]
* **Man-Made Structures:** [List of major space stations, orbital habitats, defense platforms, or megastructures]
* **System Traffic:** [e.g., High, Medium, Low, Forbidden] - Describes the level of starship traffic.
* **Controlling Faction:** [Name of the faction that governs or claims the system]
* **Notable Features:** [e.g., "Dense asteroid field makes navigation hazardous," "System is located within a trade-route nebula"]

---

#### **Galactic Faction Template**
This template is for large-scale interstellar organizations.

* **Faction Name:** [e.g., Terran Federation, Xylos Corporate Hegemony, The Nomad Fleet]
* **Faction Type:** [e.g., Galactic Empire, Democratic Federation, Corporate State, Hive Mind, Religious Theocracy]
* **Ideology:** [A summary of the faction's core beliefs and goals]
* **Territory:** [Description of their claimed space, number of systems, or operational range]
* **Seat of Power:** [The capital world, central command station, or headquarters. Use its CNC.]
* **Government Structure:** [How the faction is led, e.g., Emperor, Senate, Board of Directors, Prime Consciousness]
* **Military Doctrine & Fleet Strength:** [Description of their military strategy and the size/composition of their starfleet]
* **Economic Base:** [What powers their economy, e.g., resource mining, technology patents, trade tariffs, conquest]
* **Allies & Enemies:** [List of other major factions and their relationship status]
* **Public Perception:** [How is the faction generally viewed by outsiders?]

---

#### **Starship Template**
This template defines a specific starship or a class of starships.

* **Ship Name/Class:** [e.g., SSV Normandy / Normandy-class]
* **Manufacturer:** [The corporation or faction that built the ship]
* **Role:** [e.g., Freighter, Cruiser, Fighter, Explorer, Colony Ship, Dreadnought]
* **Dimensions:** [Length, Width, Height in meters]
* **Propulsion System:**
    * **FTL Drive:** [Type, e.g., Hyperspace Drive, Jump Drive, Alcubierre Drive] - [Max Speed/Range]
    * **Sublight Drive:** [Type, e.g., Fusion Thrusters, Ion Engines] - [Max Acceleration]
* **Power Plant:** [e.g., Antimatter Reactor, Zero-Point Module, Fusion Core]
* **Armaments:** [List of weapon systems, e.g., Mass Accelerator Cannons, Laser Turrets, Plasma Torpedoes]
* **Defenses:** [e.g., Kinetic Barriers, Ablative Armor, Point-Defense Lasers, ECM Suite]
* **Crew Complement:** [Minimum required crew / Max capacity]
* **Special Features:** [e.g., Stealth Systems, Onboard AI, Medical Bay, Research Lab, Cargo Hold capacity]
* **Known History/Notable Captains:** [Optional: for unique, named vessels]