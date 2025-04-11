import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useGameStore } from '../../stores/gameStore';
import {
  TILE_TYPES,
  TILE_SIZE,
  INTERACTIVE_ZONES,
  ZONE_CONFIG,
  COLLISION_TILES,
  CAMERA_CONFIG,
  SPAWN_POINTS,
  MONSTER_ZONES
} from '../../config/mapConfig';
import {
  TILE_CONFIG,
  MAP_LAYERS,
  COLLISION_TILES as COLLISION_TILE_IDS,
  SAFE_ZONE_TILES,
  MONSTER_SPAWN_TILES,
  INTERACTIVE_TILES
} from '../../config/tileConfig';
import { PLAYER_SPRITES } from '../../config/spriteConfig';
import SpriteAnimation from './SpriteAnimation';

const GameContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #000;
`;

const GameCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Player = styled.div`
  position: absolute;
  width: ${TILE_SIZE}px;
  height: ${TILE_SIZE}px;
  background-color: ${props => props.theme.colors.primary};
  border: 2px solid ${props => props.theme.colors.text};
  transform: translate(-50%, -50%);
  transition: transform 0.1s linear;
  z-index: 2;
`;

const InteractiveZone = styled.div`
  position: absolute;
  width: ${props => props.radius * 2}px;
  height: ${props => props.radius * 2}px;
  border: 2px dashed ${props => props.theme.colors.primary};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 1;
`;

const GameMap = () => {
  const canvasRef = useRef(null);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0 });
  const [activeZones, setActiveZones] = useState([]);
  const [mapData, setMapData] = useState(null);
  const [tilesetImage, setTilesetImage] = useState(null);
  const { player, isInCombat, startCombat } = useGameStore();
  const [playerAnimation, setPlayerAnimation] = useState('IDLE');
  const [playerDirection, setPlayerDirection] = useState('right');

  useEffect(() => {
    const loadMap = async () => {
      try {
        const response = await fetch('/assets/maps/layers/mainMap.json');
        const data = await response.json();
        setMapData(data);

        const tileset = new Image();
        tileset.src = data.tilesets[0].image;
        tileset.onload = () => setTilesetImage(tileset);
      } catch (error) {
        console.error('Error loading map:', error);
      }
    };

    loadMap();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isInCombat) return;

      const moveAmount = 32; // Tamaño del tile
      let newX = playerPosition.x;
      let newY = playerPosition.y;
      let moved = false;

      switch (e.key) {
        case 'ArrowUp':
          newY -= moveAmount;
          moved = true;
          break;
        case 'ArrowDown':
          newY += moveAmount;
          moved = true;
          break;
        case 'ArrowLeft':
          newX -= moveAmount;
          moved = true;
          setPlayerDirection('left');
          break;
        case 'ArrowRight':
          newX += moveAmount;
          moved = true;
          setPlayerDirection('right');
          break;
        default:
          return;
      }

      if (moved) {
        const tile = getTileAtPosition(newX, newY);
        if (isTileWalkable(tile)) {
          setPlayerPosition({ x: newX, y: newY });
          setPlayerAnimation('WALK');
          checkInteractiveZones(newX, newY);
        }
      }
    };

    const handleKeyUp = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        setPlayerAnimation('IDLE');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [playerPosition, isInCombat]);

  const getTileAtPosition = (x, y) => {
    if (!mapData) return null;
    const tileX = Math.floor(x / 32);
    const tileY = Math.floor(y / 32);
    const index = tileY * mapData.width + tileX;
    return mapData.layers[0].data[index];
  };

  const isTileWalkable = (tileId) => {
    if (!tileId) return false;
    const tileType = TILE_CONFIG[tileId];
    return tileType && tileType.walkable;
  };

  const checkInteractiveZones = (x, y) => {
    if (!mapData) return;
    const tileX = Math.floor(x / 32);
    const tileY = Math.floor(y / 32);
    const index = tileY * mapData.width + tileX;
    const tileId = mapData.layers[4].data[index]; // Capa de interactivos

    if (tileId === 1) { // ID de zona de combate
      startCombat();
    }
  };

  const renderMap = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!mapData || !tilesetImage) return;

    // Ajustar tamaño del canvas
    canvas.width = mapData.width * 32;
    canvas.height = mapData.height * 32;

    // Renderizar capas
    mapData.layers.forEach((layer, layerIndex) => {
      if (!layer.visible) return;

      layer.data.forEach((tileId, index) => {
        if (!tileId) return;

        const x = (index % mapData.width) * 32;
        const y = Math.floor(index / mapData.width) * 32;

        // Calcular posición en el tileset
        const tilesetX = ((tileId - 1) % 8) * 32;
        const tilesetY = Math.floor((tileId - 1) / 8) * 32;

        ctx.drawImage(
          tilesetImage,
          tilesetX, tilesetY, 32, 32,
          x, y, 32, 32
        );
      });
    });
  };

  useEffect(() => {
    renderMap();
  }, [mapData, tilesetImage]);

  return (
    <GameContainer>
      <GameCanvas ref={canvasRef} />
      <SpriteAnimation
        spriteConfig={PLAYER_SPRITES[playerAnimation]}
        position={playerPosition}
        direction={playerDirection}
        scale={1}
      />
      {activeZones.map((zone, index) => (
        <InteractiveZone
          key={index}
          radius={ZONE_CONFIG[zone.type].radius}
          style={{
            left: `${zone.x}px`,
            top: `${zone.y}px`
          }}
        />
      ))}
      <Player
        style={{
          left: `${playerPosition.x}px`,
          top: `${playerPosition.y}px`
        }}
      />
    </GameContainer>
  );
};

export default GameMap; 