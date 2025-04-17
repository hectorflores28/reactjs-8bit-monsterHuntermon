import { WEAPON_PALETTES } from '../config/weaponStyles';

const createSprite = (baseImage, palette) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Configurar el tamaño del canvas
  canvas.width = 100;
  canvas.height = 100;
  
  // Dibujar la imagen base
  ctx.drawImage(baseImage, 0, 0, 100, 100);
  
  // Aplicar los efectos de la paleta
  palette.effects.forEach(effect => {
    ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = effect.color;
    ctx.globalAlpha = effect.opacity;
    ctx.filter = `blur(${effect.blur}px)`;
    ctx.fillRect(0, 0, 100, 100);
  });
  
  // Aplicar los colores base
  ctx.globalCompositeOperation = 'multiply';
  ctx.fillStyle = palette.base.primary;
  ctx.globalAlpha = 0.5;
  ctx.fillRect(0, 0, 100, 100);
  
  // Aplicar sombras y brillos
  ctx.globalCompositeOperation = 'overlay';
  ctx.fillStyle = palette.base.highlight;
  ctx.globalAlpha = 0.3;
  ctx.fillRect(0, 0, 100, 100);
  
  ctx.globalCompositeOperation = 'multiply';
  ctx.fillStyle = palette.base.shadow;
  ctx.globalAlpha = 0.3;
  ctx.fillRect(0, 0, 100, 100);
  
  return canvas.toDataURL('image/png');
};

const createPreview = (baseImage, palette) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Configurar el tamaño del canvas
  canvas.width = 200;
  canvas.height = 200;
  
  // Dibujar la imagen base
  ctx.drawImage(baseImage, 0, 0, 200, 200);
  
  // Aplicar efectos más detallados para la vista previa
  palette.effects.forEach(effect => {
    ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = effect.color;
    ctx.globalAlpha = effect.opacity * 1.2;
    ctx.filter = `blur(${effect.blur * 1.5}px)`;
    ctx.fillRect(0, 0, 200, 200);
  });
  
  // Aplicar colores base con más detalle
  ctx.globalCompositeOperation = 'multiply';
  ctx.fillStyle = palette.base.primary;
  ctx.globalAlpha = 0.6;
  ctx.fillRect(0, 0, 200, 200);
  
  // Aplicar sombras y brillos más detallados
  ctx.globalCompositeOperation = 'overlay';
  ctx.fillStyle = palette.base.highlight;
  ctx.globalAlpha = 0.4;
  ctx.fillRect(0, 0, 200, 200);
  
  ctx.globalCompositeOperation = 'multiply';
  ctx.fillStyle = palette.base.shadow;
  ctx.globalAlpha = 0.4;
  ctx.fillRect(0, 0, 200, 200);
  
  // Aplicar efectos adicionales según el estilo
  if (palette.style === 'elegant') {
    ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = '#f1c40f';
    ctx.globalAlpha = 0.2;
    ctx.fillRect(0, 0, 200, 200);
  } else if (palette.style === 'brutal') {
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = '#c0392b';
    ctx.globalAlpha = 0.2;
    ctx.fillRect(0, 0, 200, 200);
  } else if (palette.style === 'mechanical') {
    ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = '#3498db';
    ctx.globalAlpha = 0.2;
    ctx.fillRect(0, 0, 200, 200);
  }
  
  return canvas.toDataURL('image/png');
};

export const generateWeaponSprites = async (baseImages) => {
  const sprites = {};
  const previews = {};
  
  for (const [weaponType, baseImage] of Object.entries(baseImages)) {
    const palette = WEAPON_PALETTES[weaponType];
    if (palette) {
      sprites[weaponType] = await createSprite(baseImage, palette);
      previews[weaponType] = await createPreview(baseImage, palette);
    }
  }
  
  return { sprites, previews };
}; 