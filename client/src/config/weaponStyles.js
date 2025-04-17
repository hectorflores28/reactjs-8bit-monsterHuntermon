export const WEAPON_COLORS = {
  METAL: {
    primary: '#c0c0c0', // Plateado base
    secondary: '#f1c40f', // Dorado
    tertiary: '#7f8c8d', // Acero oscuro
    highlight: '#ffffff', // Brillo
    shadow: '#2c3e50' // Sombra
  },
  WOOD: {
    primary: '#8b4513', // Marrón madera
    secondary: '#5d4037', // Marrón oscuro
    tertiary: '#d2b48c', // Marrón claro
    highlight: '#e6c8a8', // Brillo madera
    shadow: '#3e2723' // Sombra madera
  },
  LEATHER: {
    primary: '#795548', // Cuero base
    secondary: '#5d4037', // Cuero oscuro
    tertiary: '#a1887f', // Cuero claro
    highlight: '#d7ccc8', // Brillo cuero
    shadow: '#3e2723' // Sombra cuero
  }
};

export const WEAPON_EFFECTS = {
  SHINE: {
    color: '#ffffff',
    opacity: 0.8,
    blur: 2
  },
  GLOW: {
    color: '#f1c40f',
    opacity: 0.6,
    blur: 4
  },
  SHADOW: {
    color: '#000000',
    opacity: 0.4,
    blur: 3
  }
};

export const WEAPON_PALETTES = {
  LONG_SWORD: {
    base: WEAPON_COLORS.METAL,
    effects: [WEAPON_EFFECTS.SHINE, WEAPON_EFFECTS.GLOW],
    style: 'elegant'
  },
  SWORD_SHIELD: {
    base: WEAPON_COLORS.METAL,
    effects: [WEAPON_EFFECTS.SHINE, WEAPON_EFFECTS.SHADOW],
    style: 'balanced'
  },
  HAMMER: {
    base: WEAPON_COLORS.METAL,
    effects: [WEAPON_EFFECTS.SHADOW],
    style: 'brutal'
  },
  LANCE: {
    base: WEAPON_COLORS.METAL,
    effects: [WEAPON_EFFECTS.SHINE],
    style: 'precise'
  },
  GREAT_AXE: {
    base: WEAPON_COLORS.METAL,
    effects: [WEAPON_EFFECTS.SHADOW, WEAPON_EFFECTS.GLOW],
    style: 'powerful'
  },
  DUAL_SWORDS: {
    base: WEAPON_COLORS.METAL,
    effects: [WEAPON_EFFECTS.SHINE, WEAPON_EFFECTS.GLOW],
    style: 'agile'
  },
  BOW: {
    base: WEAPON_COLORS.WOOD,
    effects: [WEAPON_EFFECTS.SHINE],
    style: 'ranged'
  },
  BALLISTA: {
    base: WEAPON_COLORS.METAL,
    effects: [WEAPON_EFFECTS.SHADOW],
    style: 'heavy'
  },
  CURVED_SWORD: {
    base: WEAPON_COLORS.METAL,
    effects: [WEAPON_EFFECTS.GLOW],
    style: 'exotic'
  },
  MACE: {
    base: WEAPON_COLORS.METAL,
    effects: [WEAPON_EFFECTS.SHADOW],
    style: 'brutal'
  },
  HALBERD: {
    base: WEAPON_COLORS.METAL,
    effects: [WEAPON_EFFECTS.SHINE],
    style: 'versatile'
  },
  GREAT_SWORD: {
    base: WEAPON_COLORS.METAL,
    effects: [WEAPON_EFFECTS.SHADOW, WEAPON_EFFECTS.GLOW],
    style: 'massive'
  },
  KATANA: {
    base: WEAPON_COLORS.METAL,
    effects: [WEAPON_EFFECTS.SHINE, WEAPON_EFFECTS.GLOW],
    style: 'elegant'
  },
  PISTON_HAMMER: {
    base: WEAPON_COLORS.METAL,
    effects: [WEAPON_EFFECTS.SHADOW, WEAPON_EFFECTS.GLOW],
    style: 'mechanical'
  }
}; 