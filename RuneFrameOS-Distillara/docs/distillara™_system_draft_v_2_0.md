# Distillara™ System Draft v0.1

A deep alchemy crafting system of rare and dangerous precision, designed around Arthenius Zaal’s mythos and the elusive Zaalic Codex. Provides mechanics, data schemas, and SLM training structures to power Distillara’s alchemical specialist.

---

## 1) Goals & Scope
- **Purpose:** Provide a structured mechanics + dataset for Distillara’s app and a specialized SLM (alchemy chemist).
- **Coverage:** 100+ ingredients (L1–L6 rarity), 100+ potions, elixirs, salves, and failures. Includes harvesting cycles, economy, hazards, and techniques.
- **Output Modes:** Recipe sheets, JSON specs, safety protocols, effect matrices, economy logs.

---

## 2) Core Philosophy
- **Tone:** Reverent, punishing, and beautiful — alchemy as dangerous truth‑seeking.
- **Framing:** Ingredients are rare, cyclical, often deadly; potions are transformative, experimental, mythic.
- **Failure as Meaning:** Mistakes yield insight and narrative consequences.

---

## 3) Ingredient Model (Zaalic Canon)
Each ingredient carries metaphysical, practical, and economic attributes.

### 3.1 Core Fields
- **id** (slug/UUID)
- **name**
- **category**: mineral | plant | animal | fungal | essence | synthetic | singular
- **rarity_level (1–6):** Common, Uncommon, Rare, Very Rare, Legendary, Singular
- **harvest_cycle:** weekly | monthly | seasonal | bi‑annual | yearly | once‑ever
- **harvest_conditions:** e.g., lunar eclipse, volcanic vent, dream‑realm
- **cost_range:** copper → gold (tiered)
- **yield**: % usable; byproducts list
- **perishability:** stable | unstable | volatile | self‑reactive
- **hazards:** poison, curse, psychic backlash, mutagenic; **handling_protocols**
- **alchemy_affinities:** fire, water, air, earth, void, astral, blood, time, entropy, etc.
- **technique_affinities:** distill, decoct, ferment, infuse, calcine, dissolve, cohere, bind
- **pairings:** synergies + antagonists
- **effects_base:** primary metaphysical properties (healing, clarity, flame, shadow)
- **lore_hook:** mythic/narrative anchor

### 3.2 Ingredient Complexity Score (ICS)
```
ICS = rarity_weight × hazard_factor × handling_difficulty × perishability_factor
```
- rarity_weight: {1:1, 2:1.5, 3:2, 4:3, 5:5, 6:8}
- hazard_factor: {none:1, low:1.2, medium:1.5, high:2, extreme:3}
- perishability_factor: {stable:1, unstable:1.3, volatile:1.7, self‑reactive:2.2}

---

## 4) Technique Model (Alchemical Arts)

- **Base Set:** infuse, decoct, distill, calcine, cohobate, ferment, bind, seal, dissolve, transmute, crystallize, scry, sublimation, coagulation.
- **Exotic Set:** dream‑infuse, astral‑distill, void‑calcine, chrono‑age, essence‑bind.

**Technique Fields:** id, name, difficulty (TD 1–10), impact (on potency, stability, duration), risk_modifiers (explosive, toxic, dimensional), prereqs (gear, proficiency).

---

## 5) Workspace / Laboratory Tiers
- **Field** (+5 diff, open fire, makeshift glass)
- **Apprentice Bench** (+2)
- **Journeyman’s Lab** (0)
- **Master’s Lab** (–3, controlled environment)
- **Guild Sanctum** (–5, stabilized wards)
- **Codex Altar** (–8, reality‑anchored, mythic)

---

## 6) Potion Complexity & Difficulty

**6.1 Formula (Potion Complexity Score, PCS)**
```
PCS = Σ_i (ICS_i × prep_factor_i)
    + Σ_t (TD_t × technique_span_factor_t)
    + workspace_modifier
    + hazard_stack_factor
    + ritual_factor
    – alchemist_apl_bonus
```

- prep_factor_i: 1.0–2.0 (grinding, filtering, double extraction)
- technique_span_factor: 1.0–1.5
- workspace_modifier: +5 to –8 depending on lab tier
- hazard_stack_factor: 0–10 (toxicity, volatility, dimensional rifts)
- ritual_factor: 0–6 (chants, circles, astrological timing)
- alchemist_apl_bonus: subtractive bonus per skill level (APL 1→0, 2→1, 3→3, 4→6, 5→10)

**6.2 Difficulty Bands**
- Trivial: PCS ≤ 10
- Simple: 11–20
- Complex: 21–35
- Dangerous: 36–50
- Deadly: 51–70
- Mythic: 71+

---

## 7) Outcomes Model
- **Effect Potency:** base effect + scaling from synergy and technique.
- **Duration:** time unit; modifiable by stabilizers.
- **Side‑Effects:** mild (headache) → catastrophic (soul fracture).
- **Stability Index (0–100):** chance potion holds vs decays/explodes.
- **Market Value:** rarity × potency × stability.

---

## 8) Failure System
Let **M = Result – Threshold**.
- **Minor Miss (–1 to –5):** potion weak, cloudy, off‑smell, mild nausea.
- **Serious Miss (–6 to –12):** unstable concoction, partial effect reversal, psychic backlash.
- **Catastrophic Miss (≤ –13):** explosion, curse, rift tears, permanent character affliction.

Failsafe options: neutralizing salts, stasis bottles, guild wards.

---

## 9) Economy & Sourcing
- **Currencies:** copper/silver/gold; guild credits.
- **Price Bands:**
  - Common: 1–10 cp
  - Uncommon: 5–50 cp
  - Rare: 1–5 sp
  - Very Rare: 5–20 sp (up to 2 gp)
  - Legendary: 1–10 gp
  - Singular: 50+ gp, priceless
- **Dynamics:** seasonal, guild‑controlled, black markets.

---

## 10) JSON Schemas

### 10.1 Ingredient JSON
```json
{
  "id": "sunfire_root",
  "name": "Sunfire Root",
  "category": "plant",
  "rarity_level": 4,
  "harvest_cycle": "bi-annual",
  "harvest_conditions": "harvested under summer solstice at dawn",
  "cost_range": {"currency": "silver", "min": 8, "max": 15},
  "yield": 0.65,
  "perishability": "unstable",
  "hazards": ["combustion when dry"],
  "handling_protocols": ["store submerged in oil"],
  "alchemy_affinities": ["fire", "life"],
  "technique_affinities": ["infuse", "calcine"],
  "pairings": {"synergies": ["moonwater"], "antagonists": ["icebloom"]},
  "effects_base": ["vitality boost", "fire resistance"],
  "lore_hook": "Said to be the last gift of the Dawn Titan."
}
```

### 10.2 Technique JSON
```json
{
  "id": "astral_distill",
  "name": "Astral Distillation",
  "difficulty": 8,
  "impact": {"potency": 2, "duration": 1},
  "risk_modifiers": {"dimensional": 2},
  "prereqs": {"gear": ["crystal alembic"], "apl_min": 4}
}
```

### 10.3 Potion JSON
```json
{
  "id": "elixir_scorching_vitality",
  "name": "Elixir of Scorching Vitality",
  "ingredients": [
    {"id": "sunfire_root", "qty": 3, "unit": "roots", "prep": ["calcine to ash"], "prep_factor": 1.5},
    {"id": "moonwater", "qty": 250, "unit": "ml", "prep": ["distill"], "prep_factor": 1.2}
  ],
  "techniques": [
    {"id": "calcine", "technique_span_factor": 1.2},
    {"id": "astral_distill", "technique_span_factor": 1.3}
  ],
  "workspace": "Journeyman’s Lab",
  "workspace_modifier": 0,
  "hazard_stack": 3,
  "ritual_factor": 2,
  "alchemist_apl": 3,
  "targets": {"effects": ["+Vitality", "+FireResist"]},
  "safety_controls": ["oil bath storage", "protective wards"],
  "method_steps": [
    {"order": 1, "action": "Calcine sunfire root to fine ash."},
    {"order": 2, "action": "Astral distill moonwater under solstice light."},
    {"order": 3, "action": "Combine in crystal crucible, chant Dawn Hymn."}
  ]
}
```

---

## 11) Evaluation & Tuning
- Hand‑score 50 potion recipes across PCS bands.
- Adjust rarity weights, hazard factors to align with playtest outcomes.
- Build training prompts for SLM (ingredient analysis, recipe creation, failure explanation).

---

## 12) SLM Training Tasks
- **Ingredient Analysis:** given JSON, explain hazards, affinities, lore.
- **Potion Generation:** given pantry, create potion with PCS & safety.
- **Potion Review:** analyze PCS, effects, risks, economy.
- **Experiment Simulation:** predict outcomes of unorthodox pairings.
- **Lore Integration:** weave Codex hooks into explanations.

---

*End v0.1*

