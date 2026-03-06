/**
 * Game Types and Interfaces for EvoExplore
 */

// ===== CORE GAME TYPES =====

export enum GamePhase {
  CELL_ARENA = 'CELL_ARENA',        // Phase 1: Lv 1-10
  OPEN_WORLD = 'OPEN_WORLD',        // Phase 2: Lv 11-74
  INDUSTRIAL = 'INDUSTRIAL',        // Phase 3: Lv 75+
  FINAL_BOSS = 'FINAL_BOSS',        // Phase 4: Lv 100
  ENDGAME = 'ENDGAME'               // Phase 5: Post-boss
}

export enum PetalRarity {
  COMMON = 'COMMON',
  RARE = 'RARE',
  ULTRA = 'ULTRA',
  MYTHIC = 'MYTHIC'
}

export enum BiomeType {
  PETRI_DISH = 'PETRI_DISH',        // Phase 1
  GRASSLAND = 'GRASSLAND',
  DESERT = 'DESERT',
  OCEAN = 'OCEAN',
  JUNGLE = 'JUNGLE',
  SAVANNA = 'SAVANNA',
  MARINE = 'MARINE',
  SEWERS = 'SEWERS',
  FACTORY = 'FACTORY',
  SWAMP = 'SWAMP',
  ARCTIC = 'ARCTIC',
  INDUSTRIAL_ZONE = 'INDUSTRIAL_ZONE'
}

export enum ElementType {
  PHYSICAL = 'PHYSICAL',
  POISON = 'POISON',
  FIRE = 'FIRE',
  LIGHTNING = 'LIGHTNING',
  ICE = 'ICE'
}

// ===== PLAYER =====

export interface Player {
  id: string;
  userId: string;
  username: string;
  
  // Position
  x: number;
  y: number;
  rotation: number;
  
  // Core Stats
  level: number;
  experience: number;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  
  // Combat Stats
  damage: number;
  defense: number;
  rpm: number;              // Rotation speed
  reach: number;            // Attack range
  bodyDamage: number;
  
  // Equipment
  petals: EquippedPetal[];
  carapace?: Carapace;
  
  // Progression
  phase: GamePhase;
  currentBiome: BiomeType;
  talentPoints: number;
  talents: TalentTree;
  
  // Abilities
  abilities: Ability[];
  activeAbility?: string;
  
  // Inventory
  inventory: InventoryItem[];
  coins: number;
  
  // State
  isAlive: boolean;
  isDodging: boolean;
  lastDamageTime: number;
}

export interface EquippedPetal {
  slotIndex: number;
  petal: Petal;
  rotation: number;         // Current rotation angle
  orbitDistance: number;    // Distance from core
}

export interface Petal {
  id: string;
  name: string;
  rarity: PetalRarity;
  
  // Stats
  damage: number;
  health: number;
  
  // Properties
  element?: ElementType;
  knockback: number;
  mass: number;             // For physics
  
  // Special
  entries?: PetalEntry[];   // Ultra awakening bonuses
  biomeEssence?: BiomeType;
  
  // Visual
  texture: string;
  color: string;
}

export interface PetalEntry {
  type: 'DAMAGE' | 'HEALTH' | 'RANGE' | 'LIFESTEAL' | 'CRIT';
  value: number;
  description: string;
}

// ===== TALENTS =====

export interface TalentTree {
  // Level 1 Talents
  reloadSpeed: number;
  health: number;
  damage: number;
  medic: number;
  secondChance: number;
  slot: number;
  reach: number;
  
  // Level 2 Talents (unlocked at specific levels)
  overclock?: number;
  manaCapacity?: number;
  elementalType?: ElementType;
  bodyDamage?: number;
  manaGeneration?: number;
  phoenixRebirth?: number;
  xpAbsorb?: number;
  
  // Level 3 Talents
  centrifugalForce?: number;
  shielding?: number;
  explosiveChain?: number;
  spikedCore?: number;
  manaLeech?: number;
  doubleDrop?: number;
  flexibleStem?: number;
}

// ===== ABILITIES =====

export interface Ability {
  id: string;
  name: string;
  description: string;
  
  // Unlock
  biomeSource: BiomeType;
  fragmentsRequired: number;
  fragmentsCollected: number;
  
  // Mechanics
  manaCost: number;
  cooldown: number;
  lastUsed: number;
  
  // Effect
  effect: AbilityEffect;
  
  // Visual
  icon: string;
}

export interface AbilityEffect {
  type: 'DASH' | 'EXPLOSION' | 'SHIELD' | 'CLONE' | 'PUSH' | 'SLAM' | 'SPLIT' | 'SLOW' | 'FREEZE';
  duration?: number;
  damage?: number;
  range?: number;
  count?: number;          // For clones
  stunDuration?: number;
}

// ===== MOBS =====

export interface Mob {
  id: string;
  type: string;
  rarity: PetalRarity;
  
  // Position
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  
  // Stats
  health: number;
  maxHealth: number;
  damage: number;
  defense: number;
  speed: number;
  
  // Drops
  xpDrop: number;
  lootTable: LootDrop[];
  
  // Behavior
  biome: BiomeType;
  behavior: MobBehavior;
  aggroRange: number;
  targetPlayerId?: string;
  
  // State
  isAlive: boolean;
  isBoss: boolean;
  isElite: boolean;
}

export enum MobBehavior {
  PASSIVE = 'PASSIVE',
  AGGRESSIVE = 'AGGRESSIVE',
  DEFENSIVE = 'DEFENSIVE',
  CHASE = 'CHASE',
  PATROL = 'PATROL'
}

export interface LootDrop {
  itemType: 'PETAL' | 'ESSENCE' | 'FRAGMENT' | 'COIN' | 'GEAR';
  itemId: string;
  dropChance: number;       // 0-1
  quantity: number;
}

// ===== BIOME EFFECTS =====

export interface BiomeEffect {
  biome: BiomeType;
  name: string;
  description: string;
  
  // Stat Modifiers
  movementSpeedMod?: number;
  damageMod?: number;
  defenseMod?: number;
  reloadSpeedMod?: number;
  healthMod?: number;
  reachMod?: number;
  critChanceMod?: number;
  skillCooldownMod?: number;
  
  // Special Effects
  specialEffect?: string;
  visualEffect?: string;
}

// ===== INVENTORY =====

export interface InventoryItem {
  id: string;
  type: 'PETAL' | 'ESSENCE' | 'FRAGMENT' | 'CONSUMABLE' | 'MATERIAL';
  itemId: string;
  quantity: number;
  locked?: boolean;         // Prevent loss in PVP
}

export interface Carapace {
  id: string;
  name: string;
  bossSource: BiomeType;
  defense: number;
  passiveEffect: string;
}

// ===== WORLD =====

export interface WorldState {
  phase: GamePhase;
  wave?: number;            // For cell arena phase
  players: Map<string, Player>;
  mobs: Map<string, Mob>;
  
  // Spatial partitioning for performance
  chunks: Map<string, Chunk>;
}

export interface Chunk {
  x: number;
  y: number;
  playerIds: string[];
  mobIds: string[];
}

// ===== NETWORK =====

export enum NetworkEvent {
  PLAYER_JOIN = 'PLAYER_JOIN',
  PLAYER_LEAVE = 'PLAYER_LEAVE',
  PLAYER_MOVE = 'PLAYER_MOVE',
  PLAYER_ATTACK = 'PLAYER_ATTACK',
  PLAYER_USE_ABILITY = 'PLAYER_USE_ABILITY',
  PLAYER_DAMAGE = 'PLAYER_DAMAGE',
  PLAYER_DEATH = 'PLAYER_DEATH',
  PLAYER_LEVEL_UP = 'PLAYER_LEVEL_UP',
  
  MOB_SPAWN = 'MOB_SPAWN',
  MOB_MOVE = 'MOB_MOVE',
  MOB_DAMAGE = 'MOB_DAMAGE',
  MOB_DEATH = 'MOB_DEATH',
  
  WORLD_UPDATE = 'WORLD_UPDATE',
  PHASE_TRANSITION = 'PHASE_TRANSITION',
  
  CHAT_MESSAGE = 'CHAT_MESSAGE',
  
  ERROR = 'ERROR'
}

export interface NetworkMessage {
  event: NetworkEvent;
  timestamp: number;
  data: any;
}

// ===== DATABASE MODELS =====

export interface PlayerDocument {
  userId: string;
  username: string;
  createdAt: Date;
  lastLogin: Date;
  
  // Saved Progress
  level: number;
  experience: number;
  phase: GamePhase;
  
  // Inventory
  petals: Petal[];
  carapace?: Carapace;
  inventory: InventoryItem[];
  coins: number;
  
  // Progression
  talents: TalentTree;
  unlockedAbilities: string[];
  
  // Achievements
  achievements: Achievement[];
  
  // Stats
  totalPlayTime: number;
  totalKills: number;
  totalDeaths: number;
  bossesDefeated: string[];
}

export interface Achievement {
  id: string;
  unlockedAt: Date;
  progress?: number;
}

// ===== CONFIGURATION =====

export interface GameConfig {
  maxPlayers: number;
  maxVisiblePlayers: number;
  maxMobs: number;
  
  tickRate: number;
  
  // Phase configs
  cellArenaMaxWave: number;
  industrialCogsRequired: number;
  finalBossLevel: number;
  
  // Physics
  worldWidth: number;
  worldHeight: number;
  chunkSize: number;
}
