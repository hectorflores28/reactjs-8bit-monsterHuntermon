// Configuración de sprites del jugador
export const PLAYER_SPRITES = {
  IDLE: {
    name: 'idle',
    frames: 4,
    frameRate: 8,
    sprite: '/assets/sprites/player/idle.png',
    width: 32,
    height: 32
  },
  WALK: {
    name: 'walk',
    frames: 6,
    frameRate: 10,
    sprite: '/assets/sprites/player/walk.png',
    width: 32,
    height: 32
  },
  ATTACK_LIGHT: {
    name: 'attack_light',
    frames: 4,
    frameRate: 12,
    sprite: '/assets/sprites/player/attack_light.png',
    width: 32,
    height: 32
  },
  ATTACK_HEAVY: {
    name: 'attack_heavy',
    frames: 6,
    frameRate: 10,
    sprite: '/assets/sprites/player/attack_heavy.png',
    width: 32,
    height: 32
  },
  COMBO: {
    name: 'combo',
    frames: 8,
    frameRate: 15,
    sprite: '/assets/sprites/player/combo.png',
    width: 32,
    height: 32
  },
  BLOCK: {
    name: 'block',
    frames: 2,
    frameRate: 8,
    sprite: '/assets/sprites/player/block.png',
    width: 32,
    height: 32
  },
  DODGE: {
    name: 'dodge',
    frames: 4,
    frameRate: 12,
    sprite: '/assets/sprites/player/dodge.png',
    width: 32,
    height: 32
  }
};

// Configuración de sprites de monstruos
export const MONSTER_SPRITES = {
  RATHALOS: {
    name: 'rathalos',
    animations: {
      IDLE: {
        frames: 4,
        frameRate: 8,
        sprite: '/assets/sprites/monsters/rathalos/idle.png'
      },
      WALK: {
        frames: 6,
        frameRate: 10,
        sprite: '/assets/sprites/monsters/rathalos/walk.png'
      },
      ATTACK: {
        frames: 6,
        frameRate: 12,
        sprite: '/assets/sprites/monsters/rathalos/attack.png'
      },
      FLY: {
        frames: 4,
        frameRate: 8,
        sprite: '/assets/sprites/monsters/rathalos/fly.png'
      }
    },
    width: 64,
    height: 64
  },
  DIABLOS: {
    name: 'diablos',
    animations: {
      IDLE: {
        frames: 4,
        frameRate: 8,
        sprite: '/assets/sprites/monsters/diablos/idle.png'
      },
      WALK: {
        frames: 6,
        frameRate: 10,
        sprite: '/assets/sprites/monsters/diablos/walk.png'
      },
      ATTACK: {
        frames: 6,
        frameRate: 12,
        sprite: '/assets/sprites/monsters/diablos/attack.png'
      },
      BURROW: {
        frames: 4,
        frameRate: 8,
        sprite: '/assets/sprites/monsters/diablos/burrow.png'
      }
    },
    width: 64,
    height: 64
  },
  NERGIGANTE: {
    name: 'nergigante',
    animations: {
      IDLE: {
        frames: 4,
        frameRate: 8,
        sprite: '/assets/sprites/monsters/nergigante/idle.png'
      },
      WALK: {
        frames: 6,
        frameRate: 10,
        sprite: '/assets/sprites/monsters/nergigante/walk.png'
      },
      ATTACK: {
        frames: 6,
        frameRate: 12,
        sprite: '/assets/sprites/monsters/nergigante/attack.png'
      },
      DIVE: {
        frames: 4,
        frameRate: 8,
        sprite: '/assets/sprites/monsters/nergigante/dive.png'
      }
    },
    width: 64,
    height: 64
  }
};

// Configuración de sprites de armas
export const WEAPON_SPRITES = {
  GREAT_SWORD: {
    name: 'great_sword',
    animations: {
      IDLE: {
        frames: 1,
        frameRate: 1,
        sprite: '/assets/sprites/weapons/great_sword/idle.png'
      },
      ATTACK_LIGHT: {
        frames: 4,
        frameRate: 12,
        sprite: '/assets/sprites/weapons/great_sword/attack_light.png'
      },
      ATTACK_HEAVY: {
        frames: 6,
        frameRate: 10,
        sprite: '/assets/sprites/weapons/great_sword/attack_heavy.png'
      },
      COMBO: {
        frames: 8,
        frameRate: 15,
        sprite: '/assets/sprites/weapons/great_sword/combo.png'
      }
    },
    width: 32,
    height: 32
  },
  LANCE: {
    name: 'lance',
    animations: {
      IDLE: {
        frames: 1,
        frameRate: 1,
        sprite: '/assets/sprites/weapons/lance/idle.png'
      },
      ATTACK_LIGHT: {
        frames: 4,
        frameRate: 12,
        sprite: '/assets/sprites/weapons/lance/attack_light.png'
      },
      ATTACK_HEAVY: {
        frames: 6,
        frameRate: 10,
        sprite: '/assets/sprites/weapons/lance/attack_heavy.png'
      },
      COMBO: {
        frames: 8,
        frameRate: 15,
        sprite: '/assets/sprites/weapons/lance/combo.png'
      }
    },
    width: 32,
    height: 32
  }
};

// Configuración de efectos visuales
export const EFFECT_SPRITES = {
  HIT: {
    name: 'hit',
    frames: 4,
    frameRate: 12,
    sprite: '/assets/sprites/effects/hit.png',
    width: 32,
    height: 32
  },
  COMBO: {
    name: 'combo',
    frames: 6,
    frameRate: 15,
    sprite: '/assets/sprites/effects/combo.png',
    width: 64,
    height: 64
  },
  LEVEL_UP: {
    name: 'level_up',
    frames: 8,
    frameRate: 10,
    sprite: '/assets/sprites/effects/level_up.png',
    width: 64,
    height: 64
  }
}; 