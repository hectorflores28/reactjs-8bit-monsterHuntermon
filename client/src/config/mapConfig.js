// Tipos de tiles
export const TILE_TYPES = {
  GRASS: 1,
  WATER: 2,
  MOUNTAIN: 3,
  FOREST: 4,
  DESERT: 5,
  SNOW: 6
};

// Zonas interactivas
export const INTERACTIVE_ZONES = {
  MONSTER_SPAWN: 'monster_spawn',
  SHOP: 'shop',
  QUEST_GIVER: 'quest_giver',
  SAFE_ZONE: 'safe_zone'
};

// Configuración de zonas interactivas
export const ZONE_CONFIG = {
  [INTERACTIVE_ZONES.MONSTER_SPAWN]: {
    radius: 50,
    monsters: ['rathalos', 'diablos', 'nergigante'],
    spawnChance: 0.3
  },
  [INTERACTIVE_ZONES.SHOP]: {
    radius: 30,
    items: ['potions', 'traps', 'bombs']
  },
  [INTERACTIVE_ZONES.QUEST_GIVER]: {
    radius: 20,
    quests: ['hunt', 'gather', 'delivery']
  },
  [INTERACTIVE_ZONES.SAFE_ZONE]: {
    radius: 40,
    healing: true,
    restock: true
  }
};

// Configuración de colisiones
export const COLLISION_TILES = [
  TILE_TYPES.WATER,
  TILE_TYPES.MOUNTAIN
];

// Tamaño de los tiles
export const TILE_SIZE = 32;

// Configuración de la cámara
export const CAMERA_CONFIG = {
  followSpeed: 0.1,
  zoom: 1,
  bounds: {
    minX: 0,
    minY: 0,
    maxX: 2000,
    maxY: 2000
  }
};

// Configuración de spawns
export const SPAWN_POINTS = [
  { x: 100, y: 100, type: INTERACTIVE_ZONES.SAFE_ZONE },
  { x: 500, y: 300, type: INTERACTIVE_ZONES.MONSTER_SPAWN },
  { x: 800, y: 600, type: INTERACTIVE_ZONES.SHOP },
  { x: 1200, y: 400, type: INTERACTIVE_ZONES.QUEST_GIVER }
];

// Configuración de monstruos por zona
export const MONSTER_ZONES = {
  [TILE_TYPES.FOREST]: ['rathalos', 'anjanath', 'tobi-kadachi'],
  [TILE_TYPES.DESERT]: ['diablos', 'barroth', 'jagras'],
  [TILE_TYPES.SNOW]: ['nergigante', 'legiana', 'odogaron']
}; 