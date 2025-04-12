import React, { useState, useEffect, useRef } from 'react';

const Sprite = ({ 
  src, 
  width, 
  height, 
  frames, 
  frameWidth, 
  frameHeight, 
  animationSpeed = 100,
  isPlaying = true,
  direction = 'right'
}) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const frameRef = useRef(null);
  const directionStyle = {
    transform: direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)'
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frames);
    }, animationSpeed);

    return () => clearInterval(interval);
  }, [isPlaying, frames, animationSpeed]);

  return (
    <div 
      ref={frameRef}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundImage: `url(${src})`,
        backgroundPosition: `-${currentFrame * frameWidth}px 0px`,
        backgroundSize: 'auto 100%',
        ...directionStyle
      }}
    />
  );
};

export default Sprite; 