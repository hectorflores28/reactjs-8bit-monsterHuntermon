import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PreviewContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 20px auto;
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid #ffd700;
  border-radius: 10px;
  overflow: hidden;
`;

const CharacterSprite = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.sprite});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  image-rendering: pixelated;
  filter: 
    drop-shadow(2px 2px 0 #000)
    ${props => props.hairColor ? `hue-rotate(${getHueRotation(props.hairColor)})` : ''}
    ${props => props.clothesColor ? `brightness(${getBrightness(props.clothesColor)})` : ''};
`;

const ColorPreview = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;

const ColorBox = styled.div`
  width: 30px;
  height: 30px;
  border: 2px solid #fff;
  border-radius: 5px;
  background-color: ${props => props.color};
`;

const ColorLabel = styled.div`
  font-size: 0.8rem;
  color: #fff;
  text-align: center;
  margin-top: 5px;
`;

// Función para calcular la rotación de tono basada en el color hexadecimal
const getHueRotation = (hexColor) => {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h;
  
  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * ((g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else {
    h = 60 * (4 + (r - g) / (max - min));
  }
  
  return `${h}deg`;
};

// Función para calcular el brillo basado en el color hexadecimal
const getBrightness = (hexColor) => {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? '1.2' : '0.8';
};

const CharacterPreview = ({ gender, characterClass, hairColor, clothesColor }) => {
  const getSpritePath = () => {
    return `/assets/characters/${gender}/${characterClass}/base/character.png`;
  };

  return (
    <PreviewContainer>
      <CharacterSprite
        sprite={getSpritePath()}
        hairColor={hairColor}
        clothesColor={clothesColor}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      <ColorPreview>
        <div>
          <ColorBox color={hairColor} />
          <ColorLabel>Pelo</ColorLabel>
        </div>
        <div>
          <ColorBox color={clothesColor} />
          <ColorLabel>Ropa</ColorLabel>
        </div>
      </ColorPreview>
    </PreviewContainer>
  );
};

export default CharacterPreview; 