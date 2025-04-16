import { useState, useEffect } from 'react';

export const useSpriteAnimation = ({
  frames,
  frameWidth,
  frameHeight,
  animationSpeed = 100,
  isPlaying = true
}) => {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frames);
    }, animationSpeed);

    return () => clearInterval(interval);
  }, [isPlaying, frames, animationSpeed]);

  const getFrameStyle = () => ({
    backgroundPosition: `-${currentFrame * frameWidth}px 0px`,
    width: `${frameWidth}px`,
    height: `${frameHeight}px`
  });

  return {
    currentFrame,
    getFrameStyle
  };
}; 