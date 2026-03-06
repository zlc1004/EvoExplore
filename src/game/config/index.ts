/**
 * Game Configuration
 * Central place for all game constants and settings
 */

import { GameConfig, BiomeEffect, BiomeType } from '../types';

export const GAME_CONFIG: GameConfig = {
  // Server
  maxPlayers: 100,
  maxVisiblePlayers: 10,
  maxMobs: 150,
  tickRate: 60,
  
  // Phases
  cellArenaMaxWave: 20,
  industrialCogsRequired: 8,
  finalBossLevel: 100,
  
  // World
  worldWidth: 10000,
  worldHeight: 10000,
  chunkSize: 500
};

export const PLAYER_CONFIG = {
  // Starting stats
  startingHealth: 100,
  startingMana: 50,
  startingDamage: 10,
  startingDefense: 5,
  startingRPM: 120,
  startingReach: 100,
  
  // Movement
  baseSpeed: 150,
  sprintMultiplier: 1.5,
  
  // Combat
  invulnerabilityTime: 500, // ms after taking damage
  
  // Visual
  coreSize: 30,
  petalOrbitBase: 60
};

export const BIOME_EFFECTS: Record<BiomeType, BiomeEffect> = {
  [BiomeType.PETRI_DISH]: {
    biome: BiomeType.PETRI_DISH,
    name: 'Microscopic Arena',
    description: 'A controlled environment for cellular growth',
    visualEffect: 'microscope_overlay'
  },
  
  [BiomeType.GRASSLAND]: {
    biome: BiomeType.GRASSLAND,
    name: 'Gravity Potential',
    description: 'Movement speed +25% downward, -15% upward. Body damage +20% when diving down',
    movementSpeedMod: 0, // Applied directionally in game logic
    specialEffect: 'gravity_simulation'
  },
  
  [BiomeType.DESERT]: {
    biome: BiomeType.DESERT,
    name: 'Heat Overload',
    description: 'Armor -50%, but attacks deal +10% fire splash damage and increased reach',
    defenseMod: -0.5,
    damageMod: 0.1,
    reachMod: 0.15,
    specialEffect: 'fire_splash',
    visualEffect: 'heat_waves'
  },
  
  [BiomeType.OCEAN]: {
    biome: BiomeType.OCEAN,
    name: 'Hydraulic Boost',
    description: 'Movement speed -20%, bubble petals +50% size and double knockback',
    movementSpeedMod: -0.2,
    specialEffect: 'bubble_enhance',
    visualEffect: 'water_current'
  },
  
  [BiomeType.JUNGLE]: {
    biome: BiomeType.JUNGLE,
    name: 'Hyper-Photosynthesis',
    description: 'HP regen +100%, but rotation speed -25%',
    healthMod: 1.0,
    reloadSpeedMod: -0.25,
    visualEffect: 'oxygen_particles'
  },
  
  [BiomeType.SAVANNA]: {
    biome: BiomeType.SAVANNA,
    name: 'Tailwind Flow',
    description: 'Movement speed +50% with wind. Attack range +100% with wind',
    movementSpeedMod: 0.5,
    reachMod: 1.0,
    specialEffect: 'wind_direction',
    visualEffect: 'wind_particles'
  },
  
  [BiomeType.SWAMP]: {
    biome: BiomeType.SWAMP,
    name: 'Corrosive Methane',
    description: 'Global damage +30%, but max HP -20%',
    damageMod: 0.3,
    healthMod: -0.2,
    visualEffect: 'toxic_fog'
  },
  
  [BiomeType.SEWERS]: {
    biome: BiomeType.SEWERS,
    name: 'Bio-Mutation',
    description: 'Critical chance +40%, but damage taken +20%',
    critChanceMod: 0.4,
    defenseMod: -0.2,
    visualEffect: 'mutation_aura'
  },
  
  [BiomeType.FACTORY]: {
    biome: BiomeType.FACTORY,
    name: 'Static Overclock',
    description: 'Reload speed +50%, but skill cooldowns +50%',
    reloadSpeedMod: 0.5,
    skillCooldownMod: 0.5,
    visualEffect: 'electric_sparks'
  },
  
  [BiomeType.MARINE]: {
    biome: BiomeType.MARINE,
    name: 'Deep Pressure',
    description: 'Defense +60%, but movement speed -40%',
    defenseMod: 0.6,
    movementSpeedMod: -0.4,
    visualEffect: 'pressure_distortion'
  },
  
  [BiomeType.ARCTIC]: {
    biome: BiomeType.ARCTIC,
    name: 'Superconductive',
    description: 'Skill cooldown -40%, but collision damage +25%',
    skillCooldownMod: -0.4,
    specialEffect: 'collision_damage_increase',
    visualEffect: 'frost_overlay'
  },
  
  [BiomeType.INDUSTRIAL_ZONE]: {
    biome: BiomeType.INDUSTRIAL_ZONE,
    name: 'Industrial Complex',
    description: 'The truth behind the world',
    specialEffect: 'split_dodge_unlock',
    visualEffect: 'industrial_machinery'
  }
};

export const LEVEL_UNLOCKS: Record<number, string[]> = {
  11: ['RPG_WORLD', 'OFFHAND_SLOT'],
  15: ['PETAL_SYNTHESIS'],
  20: ['TALENT_TREE'],
  25: ['ACHIEVEMENTS'],
  30: ['SECONDARY_SLOT'],
  42: ['BIOME_EFFECT_MITIGATION'],
  50: ['CARAPACE_SLOT'],
  55: ['ULTIMATE_ABILITY'],
  64: ['DOUBLE_BIOME_BUFF'],
  70: ['CORE_PETAL_SLOT'],
  75: ['INDUSTRIAL_ACCESS', 'FAST_TRAVEL'],
  100: ['FINAL_BOSS_ACCESS']
};

export const XP_CURVE = {
  // Base XP needed for level 2
  baseXP: 100,
  
  // Exponential growth factor
  exponent: 1.5,
  
  // Calculate XP needed for a level
  getXPForLevel: (level: number): number => {
    if (level <= 1) return 0;
    return Math.floor(XP_CURVE.baseXP * Math.pow(level - 1, XP_CURVE.exponent));
  },
  
  // Get total XP needed to reach a level from level 1
  getTotalXP: (level: number): number => {
    let total = 0;
    for (let i = 2; i <= level; i++) {
      total += XP_CURVE.getXPForLevel(i);
    }
    return total;
  }
};

export const PETAL_SYNTHESIS = {
  // Common -> Rare: 5 common petals
  COMMON_TO_RARE: 5,
  
  // Rare -> Ultra: 5 rare petals
  RARE_TO_ULTRA: 5,
  
  // Ultra -> Mythic: 5 ultra petals + essence
  ULTRA_TO_MYTHIC: 5,
  
  // Chance for awakening entry on Ultra synthesis
  AWAKENING_CHANCE: 0.3
};

export const SCENE_KEYS = {
  BOOT: 'Boot',
  PRELOADER: 'Preloader',
  MAIN_MENU: 'MainMenu',
  
  // Phase scenes
  CELL_ARENA: 'CellArena',
  OPEN_WORLD: 'OpenWorld',
  INDUSTRIAL: 'Industrial',
  FINAL_BOSS: 'FinalBoss',
  
  // UI scenes
  HUD: 'HUD',
  INVENTORY: 'Inventory',
  TALENT_TREE: 'TalentTree',
  ACHIEVEMENTS: 'Achievements',
  
  // Transition
  PHASE_TRANSITION: 'PhaseTransition'
};

export const COLORS = {
  // Rarity colors
  COMMON: 0xFFFFFF,
  RARE: 0x0099FF,
  ULTRA: 0xFF0000,
  MYTHIC: 0xFFD700,
  
  // Element colors
  PHYSICAL: 0xAAAAAA,
  POISON: 0x00FF00,
  FIRE: 0xFF4500,
  LIGHTNING: 0xFFFF00,
  ICE: 0x87CEEB,
  
  // UI
  UI_BACKGROUND: 0x1a1a1a,
  UI_TEXT: 0xFFFFFF,
  UI_ACCENT: 0x00AAFF,
  
  // Health
  HEALTH_FULL: 0x00FF00,
  HEALTH_MID: 0xFFFF00,
  HEALTH_LOW: 0xFF0000,
  
  // Mana
  MANA: 0x00AAFF
};

export const ASSET_PATHS = {
  IMAGES: '/assets/images',
  AUDIO: '/assets/audio',
  FONTS: '/assets/fonts',
  LOCALES: '/assets/locales'
};
