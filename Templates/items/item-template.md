---
template_type: "items"
template_name: "Item Template"
version: "1.0.0"
description: "Template for creating detailed magical and technological items with properties and usage"
usage: "Use this template to define magical items, technological artifacts, or hybrid devices"
cnc: "GALAXY.SECTOR.SYSTEM.WORLD.REGION.KINGDOM.ITEM"
parent_cnc: "GALAXY.SECTOR.SYSTEM.WORLD.REGION.KINGDOM"
context_awareness:
  spatial_hierarchy: true
  temporal_context: true
  cross_references: true
  machine_readable: true
  human_friendly: true
validation:
  required_cnc: true
  cnc_format: "GALAXY.SECTOR.SYSTEM.WORLD.REGION.KINGDOM.ITEM"
  max_depth: 8
---

# Item Name: Insert Item Name

## Basic Information
- **Item Type:** Magical Item Type
- **Cost:** Insert Cost
- **Weight:** Insert Weight
- **Material:** Insert Materials Used
- **Volume:** Insert Volume/Capacity

## Description
Provide a detailed description of the item, including its appearance, any damage or imperfections, and how it functions. This should include any aesthetic details and the magical or mundane function of the item.

## Magical Properties
- **[Property Name]**
  - **Power:** Describe the magical power of the item
  - **Effect:** Detailed description of how the power works, including any limitations or special conditions
  - **Cost:** Energy or mana cost per day, week, or for a specific use
- **[Next Property Name]**
  - **Power:** Describe the next magical power of the item
  - **Effect:** Detailed description of how the power works, including any limitations or special conditions
  - **Cost:** Energy or mana cost per day, week, or for a specific use

## Special Features
List any unique features the item has, such as portability, durability, self-repairing, or other quirks.

## Usage
Describe how the item is used, any specific activation methods, or required rituals or tools for its operation.

## Drawbacks
List any disadvantages, side effects, or limitations of using the item.

## Classification
- **Magical/Technological:** Is the item magical, technological, or a hybrid? [Choose: Magical, Technological, Hybrid]
- **Level of Magic/Technology:** Choose one: Minor, Moderate, Great, Artifact
- **Type of Magic/Technology:** Choose one: Celestial (God Magic), Arcane (Wizard Magic), Tech (Technological), Hybrid (if applicable)

## GURPS Stats (Optional)
- **Cost:** Insert cost in gold or other currency
- **Weight:** Insert weight in lbs
- **Energy Maintenance:** Insert energy or mana requirement per day/week/month
- **Enchantments:** Describe enchantment levels required or any magical skills needed to operate/repair

## Image Prompt for AI Image Generator
Describe the visual appearance of the item, including details such as its shape, color, texture, materials, and any unique magical features. Consider adding environmental or contextual details to give the AI a full understanding of how the item should look. For example:

"[Item Name] is a [shape, color, material] item with [details]. The item glows with [magical effect or color], and its surface has [texture or patterns]. The item may be surrounded by [environmental detail] or interacting with [magical effects or surroundings]."
