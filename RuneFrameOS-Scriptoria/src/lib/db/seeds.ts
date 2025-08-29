import { prisma } from './prisma'

export async function seedDatabase() {
  console.log('🌱 Seeding database...')

  try {
         // Create Echeladon gaming system
     const echeladon = await prisma.gamingSystem.create({
       data: {
         name: 'Echeladon',
         description: 'Proprietary fantasy roleplaying system with deep lore and innovative mechanics',
         publisher: 'Proprietary',
         isProprietary: true,
         isActive: true,
       },
     })

         // Create Echeladon version
     const echeladonVersion = await prisma.systemVersion.create({
       data: {
         versionName: '1.0',
         description: 'Initial release of Echeladon',
         releaseDate: new Date('2024-01-01'),
         isActive: true,
         gamingSystemId: echeladon.id,
       },
     })

    // Create Echeladon core rulebook
    const echeladonCore = await prisma.ruleBook.create({
      data: {
        title: 'Echeladon Core Rules',
        description: 'Complete core rulebook for the Echeladon system',
        bookType: 'CORE',
        pageCount: 300,
        price: 0.00, // Free for core rules
        isActive: true,
        isPurchasable: false, // Core rules are free
        gamingSystemId: echeladon.id,
        systemVersionId: echeladonVersion.id,
      },
    })

    // Create core game mechanics
         const mechanics = [
       {
         name: 'Dice Rolling',
         description: 'Core dice mechanics for Echeladon',
         mechanicType: 'DICE_ROLLING' as const,
         implementation: JSON.stringify({
           primaryDie: 'd20',
           secondaryDice: ['d6', 'd8', 'd10', 'd12'],
           criticalRange: [19, 20],
           fumbleRange: [1],
         }),
         gamingSystemId: echeladon.id,
         systemVersionId: echeladonVersion.id,
       },
       {
         name: 'Combat System',
         description: 'Turn-based tactical combat mechanics',
         mechanicType: 'COMBAT' as const,
         implementation: JSON.stringify({
           initiative: 'd20 + Dexterity modifier',
           actionPoints: 3,
           movement: 'Speed in squares',
           attackRoll: 'd20 + Attack Bonus',
         }),
         gamingSystemId: echeladon.id,
         systemVersionId: echeladonVersion.id,
       },
       {
         name: 'Character Creation',
         description: 'Step-by-step character creation process',
         mechanicType: 'CHARACTER_CREATION' as const,
         implementation: JSON.stringify({
           steps: [
             'Choose Race',
             'Determine Attributes',
             'Select Class',
             'Choose Skills',
             'Select Equipment',
             'Calculate Derived Values',
           ],
           attributePoints: 25,
           skillPoints: 'Class base + Intelligence modifier',
         }),
         gamingSystemId: echeladon.id,
         systemVersionId: echeladonVersion.id,
       },
       {
         name: 'Magic System',
         description: 'Spellcasting and magical abilities',
         mechanicType: 'MAGIC' as const,
         implementation: JSON.stringify({
           spellcasting: 'Intelligence-based',
           spellSlots: 'Per level',
           manaPoints: 'Intelligence × 2',
           spellSchools: ['Elemental', 'Divine', 'Arcane', 'Nature'],
         }),
         gamingSystemId: echeladon.id,
         systemVersionId: echeladonVersion.id,
       },
     ]

    for (const mechanic of mechanics) {
      await prisma.gameMechanic.create({
        data: mechanic,
      })
    }

    // Create sample content items
    const contentItems = [
      {
        title: 'Longsword',
        description: 'A versatile one-handed sword',
        content: JSON.stringify({
          type: 'Weapon',
          damage: '1d8 slashing',
          weight: 3,
          properties: ['Versatile (1d10)'],
          cost: '15 gold pieces',
        }),
                 contentType: 'EQUIPMENT' as const,
        tags: ['weapon', 'sword', 'martial', 'versatile'],
        gamingSystemId: echeladon.id,
        ruleBookId: echeladonCore.id,
      },
      {
        title: 'Fireball',
        description: 'A powerful area-of-effect fire spell',
        content: JSON.stringify({
          type: 'Spell',
          level: 3,
          school: 'Elemental',
          castingTime: '1 action',
          range: '150 feet',
          components: ['V', 'S', 'M'],
          duration: 'Instantaneous',
          damage: '8d6 fire damage',
          save: 'Dexterity',
        }),
                 contentType: 'SPELL' as const,
        tags: ['spell', 'fire', 'damage', 'area', 'elemental'],
        gamingSystemId: echeladon.id,
        ruleBookId: echeladonCore.id,
      },
    ]

    for (const item of contentItems) {
      await prisma.contentItem.create({
        data: item,
      })
    }

    // Create character template for Echeladon
    await prisma.characterTemplate.create({
      data: {
        name: 'Echeladon Warrior',
        description: 'Template for creating a warrior character in Echeladon',
        templateData: JSON.stringify({
          class: 'Warrior',
          startingAttributes: {
            strength: 16,
            dexterity: 14,
            constitution: 14,
            intelligence: 10,
            wisdom: 12,
            charisma: 8,
          },
          startingSkills: ['Athletics', 'Intimidation', 'Perception'],
          startingEquipment: ['Longsword', 'Shield', 'Leather Armor'],
          hitPoints: '1d10 + Constitution modifier',
          proficiencies: ['Light Armor', 'Medium Armor', 'Shields', 'Simple Weapons', 'Martial Weapons'],
        }),
        gamingSystemId: echeladon.id,
        systemVersionId: echeladonVersion.id,
      },
    })

    // Create D&D 5e system (example of third-party system)
    const dnd5e = await prisma.gamingSystem.create({
      data: {
        name: 'D&D 5e',
        description: 'Fifth edition of Dungeons & Dragons',
        publisher: 'Wizards of the Coast',
        isProprietary: false,
        isActive: true,
      },
    })

         const dnd5eVersion = await prisma.systemVersion.create({
       data: {
         versionName: '5e',
         description: 'Fifth edition',
         releaseDate: new Date('2014-08-19'),
         isActive: true,
         gamingSystemId: dnd5e.id,
       },
     })

    console.log('✅ Database seeded successfully!')
    console.log(`📚 Created ${echeladon.name} system with ${mechanics.length} mechanics`)
    console.log(`🎲 Created ${dnd5e.name} system for future integration`)

  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}
