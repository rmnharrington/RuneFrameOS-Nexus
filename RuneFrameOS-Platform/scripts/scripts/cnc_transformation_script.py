#!/usr/bin/env python3
"""
CNC Transformation Script for Distillara Data
Transforms Distillara JSON files to CNC-aware, PostgreSQL-optimized format
"""

import json
import uuid
from datetime import datetime
from typing import Dict, List, Any
import re

class CNCdistillaraTransformer:
    """Transform Distillara data to CNC-aware format"""
    
    def __init__(self):
        self.spatial_mapping = {
            'forest': 'TEMPERATE_FOREST',
            'mountain': 'MOUNTAINOUS_REGION', 
            'desert': 'ARID_DESERT',
            'swamp': 'WETLAND_SWAMP',
            'ocean': 'COASTAL_REGION',
            'cave': 'UNDERGROUND_CAVES',
            'volcano': 'VOLCANIC_REGION',
            'tundra': 'ARCTIC_TUNDRA',
            'jungle': 'TROPICAL_JUNGLE',
            'plains': 'GRASSLAND_PLAINS'
        }
        
        self.coordinate_mapping = {
            'TEMPERATE_FOREST': {'lat': 45.5231, 'lng': -122.6765},
            'MOUNTAINOUS_REGION': {'lat': 40.7128, 'lng': -74.0060},
            'ARID_DESERT': {'lat': 36.1699, 'lng': -115.1398},
            'WETLAND_SWAMP': {'lat': 29.7604, 'lng': -95.3698},
            'COASTAL_REGION': {'lat': 34.0522, 'lng': -118.2437},
            'UNDERGROUND_CAVES': {'lat': 37.7749, 'lng': -122.4194},
            'VOLCANIC_REGION': {'lat': 19.8968, 'lng': -155.5828},
            'ARCTIC_TUNDRA': {'lat': 64.2008, 'lng': -149.4937},
            'TROPICAL_JUNGLE': {'lat': 1.3521, 'lng': 103.8198},
            'GRASSLAND_PLAINS': {'lat': 39.8283, 'lng': -98.5795}
        }
    
    def extract_spatial_context(self, description: str) -> Dict[str, Any]:
        """Extract spatial context from ingredient description"""
        description_lower = description.lower()
        
        # Determine region based on keywords
        region = 'TEMPERATE_FOREST'  # Default
        for keyword, mapped_region in self.spatial_mapping.items():
            if keyword in description_lower:
                region = mapped_region
                break
        
        # Get coordinates for the region
        coords = self.coordinate_mapping.get(region, {'lat': 45.5231, 'lng': -122.6765})
        
        return {
            "galaxy": "MILKY_WAY",
            "sector": "ALPHA_QUADRANT", 
            "system": "SOLAR_SYSTEM",
            "planet": "EARTH",
            "region": region,
            "sub_region": f"{region}_OUTSKIRTS",
            "coordinates": {
                "latitude": coords['lat'],
                "longitude": coords['lng'],
                "altitude": 100
            },
            "harvesting_location": {
                "biome": region.lower().replace('_', '_'),
                "climate": "moderate",
                "soil_type": "well_drained"
            }
        }
    
    def extract_properties(self, ingredient_data: Dict[str, Any]) -> Dict[str, Any]:
        """Extract properties from ingredient data"""
        return {
            "name": ingredient_data.get('name', ''),
            "scientific_name": ingredient_data.get('scientific_name', ''),
            "common_names": ingredient_data.get('other_names', []),
            "rarity_level": ingredient_data.get('rarity_level', 1),
            "elemental_alignment": ingredient_data.get('elemental_alignment', []),
            "classification": {
                "type": ingredient_data.get('type', 'Plant'),
                "source": ingredient_data.get('source', ''),
                "physical_form": ingredient_data.get('physical_form', '')
            }
        }
    
    def extract_effects(self, ingredient_data: Dict[str, Any]) -> Dict[str, Any]:
        """Extract effects from ingredient data"""
        return {
            "primary_properties": {
                "potency": ingredient_data.get('potency', 'Low to Moderate'),
                "unique_effects": ingredient_data.get('unique_effects', '')
            },
            "applications": {
                "healing_alchemy": ingredient_data.get('healing_applications', []),
                "transformation_alchemy": ingredient_data.get('transformation_applications', []),
                "combat_alchemy": ingredient_data.get('combat_applications', []),
                "mystical_alchemy": ingredient_data.get('mystical_applications', [])
            },
            "subject_effects": {
                "immediate": ingredient_data.get('immediate_effects', ''),
                "long_term": ingredient_data.get('long_term_effects', ''),
                "toxicity": ingredient_data.get('toxicity', '')
            }
        }
    
    def extract_harvesting(self, ingredient_data: Dict[str, Any]) -> Dict[str, Any]:
        """Extract harvesting information"""
        return {
            "frequency": ingredient_data.get('frequency', 'Weekly'),
            "environmental_conditions": ingredient_data.get('environmental_conditions', ''),
            "harvesting_method": ingredient_data.get('harvesting_method', ''),
            "associated_risks": ingredient_data.get('associated_risks', []),
            "harvest_yield": ingredient_data.get('harvest_yield', '')
        }
    
    def extract_preparation(self, ingredient_data: Dict[str, Any]) -> Dict[str, Any]:
        """Extract preparation information"""
        return {
            "steps": ingredient_data.get('preparation_steps', [])
        }
    
    def extract_value(self, ingredient_data: Dict[str, Any]) -> Dict[str, Any]:
        """Extract value information"""
        return {
            "market_price": ingredient_data.get('market_price', {})
        }
    
    def transform_ingredient(self, original_data: Dict[str, Any]) -> Dict[str, Any]:
        """Transform ingredient data to CNC-aware format"""
        ingredient_name = original_data.get('name', 'UNKNOWN')
        
        return {
            "id": str(uuid.uuid4()),
            "cnc": f"ECOSYSTEM.Distillara.INGREDIENT.{ingredient_name.upper().replace(' ', '_')}",
            "metadata": {
                "created_by": "Master Alchemist Elyndra Sael",
                "inspired_by": "Arthenius Zaal",
                "version": "1.0.0",
                "created_at": datetime.now().isoformat(),
                "updated_at": datetime.now().isoformat()
            },
            "spatial_context": self.extract_spatial_context(original_data.get('description', '')),
            "properties": self.extract_properties(original_data),
            "effects": self.extract_effects(original_data),
            "harvesting": self.extract_harvesting(original_data),
            "preparation": self.extract_preparation(original_data),
            "value": self.extract_value(original_data),
            "cross_references": {
                "related_ingredients": [],
                "used_in_potions": [],
                "techniques": []
            }
        }
    
    def transform_potion(self, original_data: Dict[str, Any]) -> Dict[str, Any]:
        """Transform potion data to CNC-aware format"""
        potion_name = original_data.get('name', 'UNKNOWN')
        
        return {
            "id": str(uuid.uuid4()),
            "cnc": f"ECOSYSTEM.Distillara.POTION.{potion_name.upper().replace(' ', '_')}",
            "metadata": {
                "created_by": "Master Alchemist Elyndra Sael",
                "inspired_by": "Arthenius Zaal",
                "version": "1.0.0",
                "created_at": datetime.now().isoformat(),
                "updated_at": datetime.now().isoformat()
            },
            "spatial_context": self.extract_spatial_context(original_data.get('description', '')),
            "properties": {
                "name": potion_name,
                "complexity_level": original_data.get('complexity_level', 1),
                "rarity_level": original_data.get('rarity_level', 1)
            },
            "description": original_data.get('description', ''),
            "appearance": {
                "color": original_data.get('appearance_and_color', ''),
                "storage_requirements": original_data.get('storage_requirements', ''),
                "image_prompt": original_data.get('image_prompt', '')
            },
            "technical_specs": {
                "average_cost": original_data.get('average_cost', ''),
                "duration_of_effect": original_data.get('duration_of_effect', ''),
                "side_effects_and_risks": original_data.get('side_effects_and_risks', ''),
                "usage": original_data.get('usage', '')
            },
            "lore": original_data.get('lore', ''),
            "case_studies": {
                "studied_by": original_data.get('studied_by', ''),
                "findings": original_data.get('findings', '')
            },
            "quotes": original_data.get('quotes', []),
            "ingredients": original_data.get('ingredients', []),
            "cross_references": {
                "related_potions": [],
                "techniques": []
            }
        }
    
    def parse_ingredient_text(self, text_content: str) -> List[Dict[str, Any]]:
        """Parse ingredient text file and extract structured data"""
        ingredients = []
        current_ingredient = {}
        current_section = ""
        
        lines = text_content.split('\n')
        for line in lines:
            line = line.strip()
            
            # Skip empty lines and headers
            if not line or line.startswith('Alchemical Compounds') or line.startswith('level'):
                continue
            
            # Check for new ingredient (starts with # or is a standalone name)
            if line.startswith('#') or (line and not line.startswith('Name:') and not line.startswith('Common Name:') and not line.startswith('Scientific Name:') and not line.startswith('Other Names:') and not line.startswith('Classification') and not line.startswith('Type:') and not line.startswith('Source:') and not line.startswith('Physical Form:') and not line.startswith('Rarity Level:') and not line.startswith('Precise Description') and not line.startswith('Harvesting Details') and not line.startswith('Frequency:') and not line.startswith('Environmental Conditions:') and not line.startswith('Harvesting Method:') and not line.startswith('Associated Risks:') and not line.startswith('Harvest Yield:') and not line.startswith('Preparation') and not line.startswith('Steps Required:') and not line.startswith('Primary Properties') and not line.startswith('Elemental Alignment:') and not line.startswith('Potency:') and not line.startswith('Unique Effects:') and not line.startswith('Applications') and not line.startswith('Healing Alchemy:') and not line.startswith('Transformation Alchemy:') and not line.startswith('Combat Alchemy:') and not line.startswith('Mystical Alchemy:') and not line.startswith('Culinary Uses:') and not line.startswith('Industrial Uses:') and not line.startswith('Effects on Subjects') and not line.startswith('Immediate Effects:') and not line.startswith('Long-Term Effects:') and not line.startswith('Toxicity and Side Effects:') and not line.startswith('Value') and not line.startswith('Market Price:')):
                # Save current ingredient if exists
                if current_ingredient.get('name'):
                    ingredients.append(current_ingredient)
                
                # Start new ingredient
                current_ingredient = {'name': line.replace('#', '').strip()}
                current_section = ""
                continue
            
            # Parse ingredient data
            if line.startswith('Name:'):
                current_ingredient['scientific_name'] = line.split(':', 1)[1].strip()
            elif line.startswith('Common Name:'):
                current_ingredient['common_name'] = line.split(':', 1)[1].strip()
            elif line.startswith('Scientific Name:'):
                current_ingredient['scientific_name'] = line.split(':', 1)[1].strip()
            elif line.startswith('Other Names:'):
                names = line.split(':', 1)[1].strip()
                current_ingredient['other_names'] = [n.strip() for n in names.split(',')]
            elif line.startswith('Type:'):
                current_ingredient['type'] = line.split(':', 1)[1].strip()
            elif line.startswith('Source:'):
                current_ingredient['source'] = line.split(':', 1)[1].strip()
            elif line.startswith('Physical Form:'):
                current_ingredient['physical_form'] = line.split(':', 1)[1].strip()
            elif line.startswith('Rarity Level:'):
                try:
                    current_ingredient['rarity_level'] = int(line.split(':', 1)[1].strip().split()[0])
                except:
                    current_ingredient['rarity_level'] = 1
            elif line.startswith('Precise Description'):
                current_section = "description"
            elif line.startswith('Elemental Alignment:'):
                alignment = line.split(':', 1)[1].strip()
                current_ingredient['elemental_alignment'] = [a.strip() for a in alignment.split(',')]
            elif line.startswith('Potency:'):
                current_ingredient['potency'] = line.split(':', 1)[1].strip()
            elif line.startswith('Unique Effects:'):
                current_ingredient['unique_effects'] = line.split(':', 1)[1].strip()
            elif line.startswith('Frequency:'):
                current_ingredient['frequency'] = line.split(':', 1)[1].strip()
            elif line.startswith('Environmental Conditions:'):
                current_ingredient['environmental_conditions'] = line.split(':', 1)[1].strip()
            elif line.startswith('Harvesting Method:'):
                current_ingredient['harvesting_method'] = line.split(':', 1)[1].strip()
            elif line.startswith('Market Price:'):
                current_ingredient['market_price'] = line.split(':', 1)[1].strip()
            elif current_section == "description" and line:
                # Accumulate description
                if 'description' not in current_ingredient:
                    current_ingredient['description'] = ""
                current_ingredient['description'] += line + " "
        
        # Add the last ingredient
        if current_ingredient.get('name'):
            ingredients.append(current_ingredient)
        
        return ingredients
    
    def parse_potion_text(self, text_content: str) -> List[Dict[str, Any]]:
        """Parse potion text file and extract structured data"""
        potions = []
        current_potion = {}
        current_section = ""
        
        lines = text_content.split('\n')
        for line in lines:
            line = line.strip()
            
            # Skip empty lines and headers
            if not line or line.startswith('Alchemical Potions') or line.startswith('Combat Potions'):
                continue
            
            # Check for new potion (starts with # or is a standalone name)
            if line.startswith('#') or (line and not line.startswith('Description:') and not line.startswith('Appearance and Color:') and not line.startswith('Storage Requirements:') and not line.startswith('Image Prompt for AI Generator:') and not line.startswith('Ingredients:') and not line.startswith('Complexity Level:') and not line.startswith('Rarity Level:') and not line.startswith('Average Cost:') and not line.startswith('Duration of Effect:') and not line.startswith('Side Effects and Risks:') and not line.startswith('Usage:') and not line.startswith('Lore:') and not line.startswith('Case Studies or Observations:') and not line.startswith('Studied By:') and not line.startswith('Findings:') and not line.startswith('Quotes:')):
                # Save current potion if exists
                if current_potion.get('name'):
                    potions.append(current_potion)
                
                # Start new potion
                current_potion = {'name': line.replace('#', '').strip()}
                current_section = ""
                continue
            
            # Parse potion data
            if line.startswith('Description:'):
                current_potion['description'] = line.split(':', 1)[1].strip()
            elif line.startswith('Appearance and Color:'):
                current_potion['appearance_and_color'] = line.split(':', 1)[1].strip()
            elif line.startswith('Storage Requirements:'):
                current_potion['storage_requirements'] = line.split(':', 1)[1].strip()
            elif line.startswith('Image Prompt for AI Generator:'):
                current_potion['image_prompt'] = line.split(':', 1)[1].strip()
            elif line.startswith('Complexity Level:'):
                try:
                    complexity = line.split(':', 1)[1].strip()
                    current_potion['complexity_level'] = int(complexity.split()[0])
                except:
                    current_potion['complexity_level'] = 1
            elif line.startswith('Rarity Level:'):
                try:
                    rarity = line.split(':', 1)[1].strip()
                    current_potion['rarity_level'] = int(rarity.split()[0])
                except:
                    current_potion['rarity_level'] = 1
            elif line.startswith('Average Cost:'):
                current_potion['average_cost'] = line.split(':', 1)[1].strip()
            elif line.startswith('Duration of Effect:'):
                current_potion['duration_of_effect'] = line.split(':', 1)[1].strip()
            elif line.startswith('Side Effects and Risks:'):
                current_potion['side_effects_and_risks'] = line.split(':', 1)[1].strip()
            elif line.startswith('Usage:'):
                current_potion['usage'] = line.split(':', 1)[1].strip()
            elif line.startswith('Lore:'):
                current_section = "lore"
            elif line.startswith('Studied By:'):
                current_potion['studied_by'] = line.split(':', 1)[1].strip()
            elif line.startswith('Findings:'):
                current_potion['findings'] = line.split(':', 1)[1].strip()
            elif line.startswith('Quotes:'):
                current_section = "quotes"
            elif current_section == "lore" and line:
                # Accumulate lore
                if 'lore' not in current_potion:
                    current_potion['lore'] = ""
                current_potion['lore'] += line + " "
            elif current_section == "quotes" and line.startswith('"'):
                # Parse quotes
                if 'quotes' not in current_potion:
                    current_potion['quotes'] = []
                current_potion['quotes'].append(line)
        
        # Add the last potion
        if current_potion.get('name'):
            potions.append(current_potion)
        
        return potions
    
    def transform_all_ingredients(self, ingredients_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Transform all ingredients to CNC format"""
        transformed = []
        for ingredient in ingredients_data:
            transformed.append(self.transform_ingredient(ingredient))
        return transformed
    
    def transform_all_potions(self, potions_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Transform all potions to CNC format"""
        transformed = []
        for potion in potions_data:
            transformed.append(self.transform_potion(potion))
        return transformed
    
    def save_transformed_data(self, data: List[Dict[str, Any]], filename: str):
        """Save transformed data to JSON file"""
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"Saved {len(data)} transformed records to {filename}")

def main():
    """Main transformation process"""
    transformer = CNCdistillaraTransformer()
    
    # Example transformation of alchemy_core.json
    try:
        with open('alchemy_core.json', 'r', encoding='utf-8') as f:
            core_data = json.load(f)
        
        # Transform core data
        transformed_core = {
            "id": str(uuid.uuid4()),
            "cnc": "ECOSYSTEM.Distillara.CORE.ALCHEMY",
            "metadata": {
                "created_by": core_data.get('created_by', 'Master Alchemist Elyndra Sael'),
                "inspired_by": core_data.get('inspired_by', 'Arthenius Zaal'),
                "version": "1.0.0",
                "created_at": datetime.now().isoformat(),
                "updated_at": datetime.now().isoformat()
            },
            "difficulty_factors": core_data.get('difficulty_factors', {}),
            "failure_table": core_data.get('failure_table', {}),
            "workspace_modifiers": core_data.get('workspace_modifiers', []),
            "techniques": core_data.get('techniques', []),
            "difficulty_scale": core_data.get('difficulty_scale', {})
        }
        
        transformer.save_transformed_data([transformed_core], 'transformed_alchemy_core.json')
        print("✅ Transformed alchemy_core.json")
        
    except FileNotFoundError:
        print("⚠️ alchemy_core.json not found, skipping...")
    
    # Example transformation of ingredient tiers
    try:
        with open('Do_not_touch_ingredient_tiers.json', 'r', encoding='utf-8') as f:
            tiers_data = json.load(f)
        
        transformed_tiers = []
        for tier in tiers_data:
            transformed_tier = {
                "id": str(uuid.uuid4()),
                "cnc": f"ECOSYSTEM.Distillara.TIER.LEVEL_{tier['level']}",
                "metadata": {
                    "created_by": "Master Alchemist Elyndra Sael",
                    "inspired_by": "Arthenius Zaal",
                    "version": "1.0.0",
                    "created_at": datetime.now().isoformat(),
                    "updated_at": datetime.now().isoformat()
                },
                "properties": {
                    "level": tier['level'],
                    "rarity": tier['rarity'],
                    "availability": tier['availability'],
                    "cost": tier['cost'],
                    "examples": tier['examples'],
                    "applications": tier['applications']
                }
            }
            transformed_tiers.append(transformed_tier)
        
        transformer.save_transformed_data(transformed_tiers, 'transformed_ingredient_tiers.json')
        print("✅ Transformed ingredient tiers")
        
    except FileNotFoundError:
        print("⚠️ Do_not_touch_ingredient_tiers.json not found, skipping...")
    
    # Transform ingredients from text file
    try:
        with open('Distillara-ingredients.txt', 'r', encoding='utf-8') as f:
            ingredients_text = f.read()
        
        print("📖 Parsing ingredients text file...")
        ingredients_data = transformer.parse_ingredient_text(ingredients_text)
        print(f"📊 Found {len(ingredients_data)} ingredients")
        
        transformed_ingredients = transformer.transform_all_ingredients(ingredients_data)
        transformer.save_transformed_data(transformed_ingredients, 'transformed_ingredients.json')
        print("✅ Transformed ingredients")
        
    except FileNotFoundError:
        print("⚠️ Distillara-ingredients.txt not found, skipping...")
    
    # Transform potions from text file
    try:
        with open('Distillara-potions.txt', 'r', encoding='utf-8') as f:
            potions_text = f.read()
        
        print("📖 Parsing potions text file...")
        potions_data = transformer.parse_potion_text(potions_text)
        print(f"📊 Found {len(potions_data)} potions")
        
        transformed_potions = transformer.transform_all_potions(potions_data)
        transformer.save_transformed_data(transformed_potions, 'transformed_potions.json')
        print("✅ Transformed potions")
        
    except FileNotFoundError:
        print("⚠️ Distillara-potions.txt not found, skipping...")
    
    print("\n🎉 CNC transformation completed!")
    print("📁 Check the generated files:")
    print("   - transformed_alchemy_core.json")
    print("   - transformed_ingredient_tiers.json")
    print("   - transformed_ingredients.json")
    print("   - transformed_potions.json")

if __name__ == "__main__":
    main()
