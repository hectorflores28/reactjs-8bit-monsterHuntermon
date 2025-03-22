// Configuración de tiles
export const TILE_CONFIG = {
  // Tiles de terreno base
  GRASS: {
    id: 1,
    name: 'grass',
    walkable: true,
    color: '#4CAF50',
    sprite: '/assets/maps/tiles/grass.png',
    properties: {
      staminaCost: 1,
      monsterSpawnChance: 0.1
    }
  },
  WATER: {
    id: 2,
    name: 'water',
    walkable: false,
    color: '#2196F3',
    sprite: '/assets/maps/tiles/water.png',
    properties: {
      staminaCost: 2,
      monsterSpawnChance: 0.2
    }
  },
  MOUNTAIN: {
    id: 3,
    name: 'mountain',
    walkable: false,
    color: '#795548',
    sprite: '/assets/maps/tiles/mountain.png',
    properties: {
      staminaCost: 0,
      monsterSpawnChance: 0
    }
  },
  FOREST: {
    id: 4,
    name: 'forest',
    walkable: true,
    color: '#2E7D32',
    sprite: '/assets/maps/tiles/forest.png',
    properties: {
      staminaCost: 1.5,
      monsterSpawnChance: 0.3
    }
  },
  DESERT: {
    id: 5,
    name: 'desert',
    walkable: true,
    color: '#FFC107',
    sprite: '/assets/maps/tiles/desert.png',
    properties: {
      staminaCost: 2,
      monsterSpawnChance: 0.2
    }
  },
  SNOW: {
    id: 6,
    name: 'snow',
    walkable: true,
    color: '#FFFFFF',
    sprite: '/assets/maps/tiles/snow.png',
    properties: {
      staminaCost: 1.5,
      monsterSpawnChance: 0.15
    }
  },

  // Tiles de estructuras
  VILLAGE: {
    id: 7,
    name: 'village',
    walkable: true,
    color: '#8D6E63',
    sprite: '/assets/maps/tiles/village.png',
    properties: {
      staminaCost: 1,
      monsterSpawnChance: 0,
      isSafeZone: true
    }
  },
  SHOP: {
    id: 8,
    name: 'shop',
    walkable: true,
    color: '#FF9800',
    sprite: '/assets/maps/tiles/shop.png',
    properties: {
      staminaCost: 1,
      monsterSpawnChance: 0,
      isShop: true
    }
  },
  QUEST_BOARD: {
    id: 9,
    name: 'quest_board',
    walkable: true,
    color: '#9C27B0',
    sprite: '/assets/maps/tiles/quest_board.png',
    properties: {
      staminaCost: 1,
      monsterSpawnChance: 0,
      isQuestGiver: true
    }
  }
};

// Configuración de capas del mapa
export const MAP_LAYERS = {
  GROUND: 'ground',
  STRUCTURES: 'structures',
  COLLISIONS: 'collisions',
  SPAWNS: 'spawns',
  INTERACTIVES: 'interactives'
};

// Configuración de colisiones
export const COLLISION_TILES = [
  TILE_CONFIG.WATER.id,
  TILE_CONFIG.MOUNTAIN.id
];

// Configuración de zonas seguras
export const SAFE_ZONE_TILES = [
  TILE_CONFIG.VILLAGE.id,
  TILE_CONFIG.SHOP.id,
  TILE_CONFIG.QUEST_BOARD.id
];

// Configuración de spawns de monstruos
export const MONSTER_SPAWN_TILES = [
  TILE_CONFIG.FOREST.id,
  TILE_CONFIG.DESERT.id,
  TILE_CONFIG.SNOW.id
];

// Configuración de tiles interactivos
export const INTERACTIVE_TILES = [
  TILE_CONFIG.SHOP.id,
  TILE_CONFIG.QUEST_BOARD.id
]; 