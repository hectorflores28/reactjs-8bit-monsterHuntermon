import { WEAPON_SPRITES } from '../config/weaponSprites';

const generateBaseSprite = (weaponType, canvas) => {
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  // Limpiar el canvas
  ctx.clearRect(0, 0, width, height);

  // Dibujar el fondo
  ctx.fillStyle = '#2c3e50';
  ctx.fillRect(0, 0, width, height);

  // Dibujar el arma base
  ctx.fillStyle = '#f1c40f';
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;

  switch (weaponType) {
    case 'LONG_SWORD':
      // Espada larga
      ctx.beginPath();
      ctx.moveTo(width/2, height/4);
      ctx.lineTo(width/2, height*3/4);
      ctx.stroke();
      break;
    case 'SWORD_SHIELD':
      // Espada y escudo
      ctx.beginPath();
      ctx.moveTo(width/2, height/4);
      ctx.lineTo(width/2, height*3/4);
      ctx.stroke();
      ctx.fillRect(width/4, height/2, width/2, height/4);
      break;
    case 'HAMMER':
      // Martillo
      ctx.beginPath();
      ctx.arc(width/2, height/2, width/4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      break;
    case 'LANCE':
      // Lanza
      ctx.beginPath();
      ctx.moveTo(width/2, height/4);
      ctx.lineTo(width/2, height*3/4);
      ctx.stroke();
      break;
    case 'GREAT_AXE':
      // Hacha grande
      ctx.beginPath();
      ctx.moveTo(width/2, height/4);
      ctx.lineTo(width/2, height*3/4);
      ctx.lineTo(width*3/4, height/2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      break;
    case 'DUAL_SWORDS':
      // Espadas dobles
      ctx.beginPath();
      ctx.moveTo(width/3, height/4);
      ctx.lineTo(width/3, height*3/4);
      ctx.moveTo(width*2/3, height/4);
      ctx.lineTo(width*2/3, height*3/4);
      ctx.stroke();
      break;
    case 'BOW':
      // Arco
      ctx.beginPath();
      ctx.arc(width/2, height/2, width/3, 0, Math.PI);
      ctx.stroke();
      break;
    case 'BALLISTA':
      // Ballesta
      ctx.beginPath();
      ctx.moveTo(width/4, height/2);
      ctx.lineTo(width*3/4, height/2);
      ctx.stroke();
      break;
    case 'CURVED_SWORD':
      // Espada curva
      ctx.beginPath();
      ctx.moveTo(width/2, height/4);
      ctx.quadraticCurveTo(width*3/4, height/2, width/2, height*3/4);
      ctx.stroke();
      break;
    case 'MACE':
      // Maza
      ctx.beginPath();
      ctx.arc(width/2, height/2, width/4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      break;
    case 'HALBERD':
      // Alabarda
      ctx.beginPath();
      ctx.moveTo(width/2, height/4);
      ctx.lineTo(width/2, height*3/4);
      ctx.moveTo(width/4, height/2);
      ctx.lineTo(width*3/4, height/2);
      ctx.stroke();
      break;
    case 'GREAT_SWORD':
      // Espada gigante
      ctx.beginPath();
      ctx.moveTo(width/2, height/4);
      ctx.lineTo(width/2, height*3/4);
      ctx.stroke();
      break;
    case 'KATANA':
      // Katana
      ctx.beginPath();
      ctx.moveTo(width/2, height/4);
      ctx.lineTo(width/2, height*3/4);
      ctx.stroke();
      break;
    case 'PISTON_HAMMER':
      // Martillo de pistón
      ctx.beginPath();
      ctx.arc(width/2, height/2, width/4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      break;
  }

  return canvas.toDataURL('image/png');
};

export const generateAllBaseSprites = () => {
  const sprites = {};
  const canvas = document.createElement('canvas');
  canvas.width = 100;
  canvas.height = 100;

  for (const [weaponType] of Object.entries(WEAPON_SPRITES)) {
    sprites[weaponType] = generateBaseSprite(weaponType, canvas);
  }

  return sprites;
}; 