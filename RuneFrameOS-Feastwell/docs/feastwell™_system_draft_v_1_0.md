# Feastwell™ System Draft v0.1

A rare-and-unique cooking system for normal + fictional ingredients (fantasy & sci‑fi), designed to parallel Distillara™ while staying distinct. Includes mechanics, data schemas, and SLM training formats.

---

## 1) Goals & Scope
- **Purpose:** Power Feastwell’s chef-facing app + a specialized SLM (culinary chemist) for creation, pairing, safety, and effects.
- **Coverage:** Real-world food/drink + exotic/magical/synthetic ingredients; recipes from snacks to artifact-level feasts; beverages (non‑alcoholic, alcoholic, off‑world).
- **Output Modes:** Human-readable recipes, JSON specs, safety sheets, pairing graphs, menu plans, nutritional + meta‑effects.

---

## 2) Parallels vs. Distillara (Deltas Map)
- **Shared DNA:** Rarity tiers, ingredient modeling, workspace tiers, technique modifiers, failure tables, economy.
- **Feastwell Deltas:** Adds taste/flavor vectors, texture, aroma, dietary rules, cuisine/region tags, intoxication/tolerance curves, food safety (microbial/toxic), serving/pairing logic, plating & service, nutritional outcomes.
- **Effect Framing:** Distillara → alchemical potency; Feastwell → taste, nutrition, **culinary boons** (buffs/debuffs), intoxication, ambient effects (aura, illusions), tech-level transformations.

---

## 3) Ingredient Model (Culinary Canon)
Each ingredient is a data object with culinary + worldbuilding attributes.

### 3.1 Core Fields
- **id** (slug/UUID)
- **name**
- **category**: protein | vegetable | fruit | grain | legume | tuber | fungi | algae | dairy | fat/oil | spice | herb | mineral | sweetener | ferment | beverage-base | essence | synthetic | alien | planar
- **origin_plane**: earth | exoplanet | pocket‑realm | astral | infernal | feywild | void | clockwork | oceanic abyss | other
- **rarity_culinary** (1–6): Daily (1) | Seasonal/Regional (2) | Specialty (3) | Rare (4) | Legendary (5) | Singular/Mythic (6)
- **acquisition_cycle**: daily | weekly | seasonal | lunar | stellar | event‑bound | quest‑bound | once‑ever
- **legal_status**: unrestricted | licensed | guild‑controlled | embargoed | forbidden
- **cost_range**: unit, currency (copper/silver/gold ‑or‑ credits), min–max, volatility
- **yield_per_unit**: net edible %; byproduct list
- **shelf_life**: days; storage_temp; storage_method
- **perishability**: low | medium | high | volatile | dimensional
- **hazards**: microbial, toxin, allergen, reactive, magical backlash; **detox_protocols** (steps)
- **dietary_flags**: vegan, vegetarian, kosher/halal‑like, allergen: [nuts, shellfish, lactose, gluten…]
- **cuisine_affinities**: tags (e.g., Sichuan, Andean, Undersea‑Dwarven, Martian‑Hydroponic)
- **technique_affinities**: e.g., sear, cure, lactoferment, sous‑vide, cryo‑fracture, aether‑infusion
- **pairing_synergies**: list<ingredient_id>; **pairing_antagonists**: list<ingredient_id>
- **substitutions**: soft (minor change) vs. hard (significant change)
- **flavor_profile** (0–10): sweet, sour, salty, bitter, umami, fat, heat, astringent, cooling, metallic, floral, earthy, smoky, funky, ozone/ion, numbing
- **texture_profile**: crisp, tender, gelatinous, fibrous, flaky, creamy, airy, crunchy, meaty, custard‑like…
- **aroma_notes**: list of descriptors; intensity 0–10
- **nutritional_profile** (per 100g/ml): kcal, protein, fat, carbs, fiber, micronutrients (map), hydration %, ABV % (if applicable)
- **intoxication_index** (0–10): subjective psychoactive/intoxicating effect; **tolerance_curve** (linear/logistic params)
- **culinary_effects** (fantasy/sci‑fi): buffs/debuffs (e.g., +Focus, Night‑Vision, Fire‑Resist), duration, stacking rules, risks
- **lore_hook**: short narrative anchor

### 3.2 Derived Complexity
- **ingredient_complexity_score (ICS)** = rarity_weight × prep_difficulty × hazard_factor × perishability_factor × handling_precision
- Defaults: rarity_weight: {1:1, 2:1.2, 3:1.5, 4:2.0, 5:3.0, 6:5.0}; hazard_factor: {none:1, low:1.1, medium:1.3, high:1.7, extreme:2.5} (configurable)

---

## 4) Technique Model (Culinary + Exotic)
Each technique contributes to difficulty and modifies taste/texture/effects.

- **Base Set (real):** chop, mince, julienne, sear, sauté, roast, bake, grill, smoke, steam, braise, confit, cure, pickle, ferment (lacto/koji), emulsify, foam, sous‑vide, pressure‑cook, temper, candy, proof, churn, clarify, gel, spherify, cryo‑freeze, centrifuge.
- **Fantasy/Sci‑Fi:** aether‑infuse, mana‑sear, stasis‑steep, phase‑shift, grav‑press, luminesce, chrono‑age, void‑dry, plasma‑caramelize, song‑ferment, rune‑marinate, nano‑sieve.

**Technique Fields:** id, name, **tech_difficulty (TD)** 1–10, **impact_modifiers** (taste, texture, nutrition, effects), **risk_modifiers** (safety, magical/tech), **prereqs** (gear, skill).

---

## 5) Workspace / Kitchen Tiers
- **Field** (+5 difficulty, limited gear)
- **Home** (+2)
- **Pro Kitchen** (0)
- **Lab Kitchen** (–2; centrifuge/rotavap)
- **Starship Galley** (–3; inert atmospheres)
- **Alchemical Gastrolab** (–4; stasis/phase controls)
- **Mythic Hearth** (–5; reality‑stable, ritual aids)

Workspaces provide **workspace_modifier (WM)** and unlock techniques, safety caps, and batch size.

---

## 6) Recipe Complexity & Difficulty (Feastwell Mechanics)
Define a **Recipe Complexity Score (RCS)** and translate to Difficulty Tiers.

**6.1 Base Formula**  
For recipe with ingredients *i = 1..n* and techniques *t = 1..m*:

```
RCS = Σ_i ( ICS_i × prep_factor_i )
      + Σ_t ( TD_t × technique_span_factor_t )
      + workstation_load_factor
      + time_pressure_factor
      + hazard_stack_factor
      + presentation_factor
      – chef_apl_bonus
```

- **prep_factor_i**: 0.8–2.0 (butchery, deboning, precise temp control)
- **technique_span_factor_t**: 1.0–1.5 (multi‑stage, active vs passive time)
- **workstation_load_factor**: 0–6 (parallel burners/ovens, station juggling)
- **time_pressure_factor**: 0–5
- **hazard_stack_factor**: 0–6 (toxins/raw service/alcohol + pressure + flame)
- **presentation_factor**: 0–3 (plating finesse)
- **chef_apl_bonus**: maps Chef **APL**/skill to subtractive bonus (e.g., APL 1→0, 2→1, 3→3, 4→6, 5→10)

**6.2 Difficulty Tiers (Target Numbers or Bands)**
- Casual: RCS ≤ 10
- Tricky: 11–20
- Hard: 21–30
- Very Hard: 31–45
- Extreme: 46–60
- Mythic: 61+

(Calibration will be tuned after we ingest a few dozen examples.)

---

## 7) Outcomes Model
Recipes produce multiple outcome channels:
- **Taste Score (0–100)**: computed from flavor vector synergy, technique impacts, balance (salt/fat/acid/heat), aroma intensity windows, texture delta.
- **Nutrition Score (0–100)**: based on macros + micronutrient density adjusted by technique loss.
- **Culinary Effects**: buffs/debuffs with durations; stack & tolerance rules.
- **Intoxication Curve**: peak time, decay half‑life; cross‑tolerance interactions.
- **Safety Grade**: A–F driven by hazard controls and achieved temps/controls.
- **Service Rating**: plating, timing, serving temp accuracy.

---

## 8) Failure System (Margin‑Based)
Let **M = Chef Result – Required Threshold**.
- **Minor Miss (–1 to –5):** textural issues, underseasoning, flat aroma; light stomach upset if hazardous.
- **Serious Miss (–6 to –12):** curdled emulsion, raw center, over‑extraction bitterness; moderate sickness/intoxication spike; partial effect backlash.
- **Catastrophic (≤ –13):** foodborne illness, toxin activation, magical/tech backlash (hallucinations, time drift, pocket‑realm leaks), fire/pressure mishap.
Mitigation via workspace safety, redundancies, and **Failsafe Techniques** (e.g., “stasis‑hold”, “char‑rescue”).

---

## 9) Economy & Sourcing
- **Currencies:** copper/silver/gold or credits. Optional **Guild Scrip** for rare markets.
- **Price Drivers:** rarity, legality, volatility, distance, storage cold‑chain, guild fees.
- **Contracts:** supply tiers (apprentice/home/pro/master), weekly allotments, embargo events.

---

## 10) JSON Schemas (v0.1)

### 10.1 Ingredient JSON
```json
{
  "id": "void_citrus_01",
  "name": "Void Citrus",
  "category": "fruit",
  "origin_plane": "void",
  "rarity_culinary": 5,
  "acquisition_cycle": "stellar",
  "legal_status": "licensed",
  "cost_range": {"currency": "credits", "unit": "each", "min": 50, "max": 120, "volatility": 0.4},
  "yield_per_unit": 0.72,
  "shelf_life": {"days": 14, "storage_temp_c": -5, "method": "stasis"},
  "perishability": "volatile",
  "hazards": ["vacuum‑burn oils"],
  "detox_protocols": ["rinse in inert gas", "peel under stasis dome"],
  "dietary_flags": ["vegan"],
  "cuisine_affinities": ["Martian‑Hydroponic", "Coastal‑Elven"],
  "technique_affinities": ["zest", "stasis‑steep", "clarify"],
  "pairing_synergies": ["deep_reef_scallop", "moon_milk"],
  "pairing_antagonists": ["demon_basil"],
  "substitutions": {"soft": ["yuzu"], "hard": ["ion_pear"]},
  "flavor_profile": {"sweet": 3, "sour": 9, "salty": 0, "bitter": 2, "umami": 0, "fat": 0, "heat": 0, "astringent": 2, "cooling": 1, "metallic": 3, "floral": 5, "earthy": 0, "smoky": 0, "funky": 0, "ozone_ion": 8, "numbing": 0},
  "texture_profile": ["juicy", "popping vesicles"],
  "aroma_notes": [{"note": "ozone", "intensity": 8}, {"note": "violet", "intensity": 4}],
  "nutritional_profile": {"kcal": 42, "protein_g": 0.8, "fat_g": 0.2, "carb_g": 10, "fiber_g": 2.1, "micros": {"vitC_mg": 90}},
  "intoxication_index": 0,
  "tolerance_curve": {"type": "none"},
  "culinary_effects": [{"effect": "+Focus", "magnitude": 1, "duration_min": 30}],
  "lore_hook": "Harvested at solar terminator in void‑orchards"
}
```

### 10.2 Technique JSON
```json
{
  "id": "plasma_caramelize",
  "name": "Plasma Caramelize",
  "tech_difficulty": 7,
  "impact_modifiers": {"taste": {"sweet": 2, "bitter": 1}, "texture": ["crisp_shell"], "aroma": ["toffee"]},
  "risk_modifiers": {"safety": 2, "magitech": 1},
  "prereqs": {"gear": ["micro‑plasma torch"], "skill_min_apl": 3}
}
```

### 10.3 Recipe JSON
```json
{
  "id": "stasis_cured_reef_scallop",
  "name": "Stasis‑Cured Deep Reef Scallop with Void Citrus Zest",
  "servings": 4,
  "cuisine": ["Martian‑Hydroponic", "Coastal‑Elven"],
  "course": "appetizer",
  "tech_level": "lab_kitchen",
  "workspace": "Lab Kitchen",
  "ingredients": [
    {"id": "deep_reef_scallop", "qty": 8, "unit": "pieces", "prep": ["shuck", "de‑sand"], "prep_factor": 1.3},
    {"id": "void_citrus_01", "qty": 2, "unit": "each", "prep": ["zest under stasis"], "prep_factor": 1.5},
    {"id": "moon_milk", "qty": 120, "unit": "ml", "prep": ["clarify"], "prep_factor": 1.1}
  ],
  "techniques": [
    {"id": "stasis_steep", "technique_span_factor": 1.2},
    {"id": "clarify", "technique_span_factor": 1.0}
  ],
  "workspace_load": 2,
  "time_pressure": 1,
  "hazard_stack": 2,
  "presentation_factor": 1,
  "chef_apl": 3,
  "targets": {"taste": ["bright", "mineral", "toffee_finish"], "effects": ["+Focus"]},
  "safety_controls": ["stasis dome", "–5°C cold chain"],
  "method_steps": [
    {"order": 1, "action": "Clarify moon milk; chill to 1°C."},
    {"order": 2, "action": "Zest void citrus under stasis; reserve oils."},
    {"order": 3, "action": "Stasis‑steep scallops 6 min with void oils."}
  ]
}
```

---

## 11) Complexity → Difficulty Mapping (Worked Example)
Given ingredient ICS and technique TD pulled from the database, compute RCS with configured factors and map to Difficulty Tiers. Export both **debug breakdown** and **final rating** for transparency.

---

## 12) Pairing Engine (Vector Logic)
- Represent each ingredient’s **flavor vector** (14+ dims).  
- Pairing score = cosine similarity × balancing weight (acid vs fat, sugar vs bitterness) + cultural affinity bonus – antagonist penalties.  
- Offer *contrast* and *complement* modes.

---

## 13) Safety Engine
- HACCP‑like checkpoints + magical/tech constraints (min core temps; toxin neutralization steps; pressure/ABV limits; stasis integrity).
- Risk budget per recipe; warn on exceeds; auto‑insert mitigation steps.

---

## 14) Chef APL & Skills
- **APL 1–5**; adds **chef_apl_bonus** to RCS subtraction, unlocks techniques/workspaces; grants **Failsafe Techniques** at higher tiers.

---

## 15) SLM Training Data Formats

### 15.1 Task Types
- **Ingredient Insight:** given JSON, explain handling/safety/pairings.
- **Pairing Suggestions:** generate top‑k synergies + avoid list.
- **Recipe Generation:** constrained by workspace, APL, budget, dietary rules.
- **Recipe Review:** compute RCS, predict outcomes, suggest mitigations.
- **Menu Planning:** multi‑course balance, prep concurrency, batch scaling.
- **Conversion:** transform Distillara ingredient → Feastwell ingredient (see §16).

### 15.2 Sample Prompt → Output (JSON‑first)
```json
{
  "task": "generate_recipe",
  "constraints": {
    "workspace": "Home",
    "chef_apl": 2,
    "dietary": ["vegetarian"],
    "budget_max": {"currency": "credits", "amount": 40},
    "servings": 2,
    "target_effects": ["+Calm"],
    "flavor_targets": ["umami", "floral"]
  },
  "pantry": ["lion_mane", "void_citrus_01", "buckwheat", "moon_milk"]
}
```
**Model Output (sketch):** recipe JSON per 10.3 + RCS breakdown + safety list.

---

## 16) Distillara → Feastwell Mapping Layer
- **Rarity:** Distillara L1–L6 → Feastwell 1–6 (rename tiers: Daily, Seasonal/Regional, Specialty, Rare, Legendary, Singular).
- **Economy:** copper/silver/gold mapping 1:10:100; credits as parallel scale.
- **Hazards:** Distillara toxins/reactives → Feastwell hazards + detox_protocols.
- **Effects:** Distillara potion effects → Feastwell culinary_effects (scaled by edible plausibility).
- **Workspace:** Field/Master’s Lab → Field/Home/Pro/Lab/Starship/Gastrolab/Mythic.
- **Technique:** Alchemical techniques → Culinary+Exotic technique set with TD mapping.
- **Complexity:** Distillara ingredient complexity → Feastwell ICS via rarity_weight × hazard × perishability × handling.

---

## 17) Evaluation & Tuning
- **Calibration Set:** 30 baseline recipes (real‑world) + 30 exotic; hand‑score difficulty and taste to fit bands.
- **Safety Tests:** ensure all “raw” hazard cases flag correctly.
- **A/B for SLM:** compare JSON‑first outputs vs prose‑first; prefer JSON‑first for tool use.

---

## 18) Next Steps
1) Import a handful of Distillara ingredients to test §16 mapping.  
2) Define initial technique TD table (both real + exotic).  
3) Implement RCS calculator + pairing engine.  
4) Create seed dataset (≥100 Feastwell ingredients; ≥80 recipes incl. drinks/booze).  
5) Train/evaluate SLM on task set in §15.

---

*End v0.1*

