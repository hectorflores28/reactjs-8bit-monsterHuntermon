import React, { useEffect, useState } from 'react';
import { generateWeaponSprites } from '../utils/weaponSpriteGenerator';
import '../styles/weaponSpriteLoader.css';

const WeaponSpriteLoader = ({ onSpritesLoaded }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadSprites = async () => {
      try {
        const baseImages = {};
        const totalWeapons = 14;
        let loadedCount = 0;

        // Cargar imágenes base de Monster Hunter World
        const weaponTypes = [
          'LONG_SWORD',
          'SWORD_SHIELD',
          'HAMMER',
          'LANCE',
          'GREAT_AXE',
          'DUAL_SWORDS',
          'BOW',
          'BALLISTA',
          'CURVED_SWORD',
          'MACE',
          'HALBERD',
          'GREAT_SWORD',
          'KATANA',
          'PISTON_HAMMER'
        ];

        for (const weaponType of weaponTypes) {
          const baseImage = new Image();
          baseImage.src = `/assets/weapons/base/${weaponType.toLowerCase()}.png`;
          
          await new Promise((resolve) => {
            baseImage.onload = () => {
              baseImages[weaponType] = baseImage;
              loadedCount++;
              setProgress((loadedCount / totalWeapons) * 100);
              resolve();
            };
          });
        }

        // Generar sprites y vistas previas
        const { sprites, previews } = await generateWeaponSprites(baseImages);
        
        // Guardar los sprites generados
        for (const [weaponType, spriteData] of Object.entries(sprites)) {
          const link = document.createElement('a');
          link.href = spriteData;
          link.download = `${weaponType.toLowerCase()}_sprite.png`;
          link.click();
        }

        for (const [weaponType, previewData] of Object.entries(previews)) {
          const link = document.createElement('a');
          link.href = previewData;
          link.download = `${weaponType.toLowerCase()}_preview.png`;
          link.click();
        }

        onSpritesLoaded({ sprites, previews });
        setLoading(false);
      } catch (error) {
        console.error('Error loading weapon sprites:', error);
        setLoading(false);
      }
    };

    loadSprites();
  }, [onSpritesLoaded]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-bar">
          <div 
            className="loading-progress" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="loading-text">
          Generando sprites de armas... {Math.round(progress)}%
        </div>
      </div>
    );
  }

  return null;
};

export default WeaponSpriteLoader; 