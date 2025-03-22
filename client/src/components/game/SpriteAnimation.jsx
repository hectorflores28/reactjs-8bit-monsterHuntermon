import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const SpriteCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
`;

const SpriteAnimation = ({ 
  spriteConfig, 
  animation, 
  position, 
  direction = 'right',
  scale = 1,
  onAnimationComplete
}) => {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);
  const lastFrameTimeRef = useRef(0);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const sprite = new Image();
    sprite.src = spriteConfig.sprite;

    const animate = (currentTime) => {
      if (!lastFrameTimeRef.current) {
        lastFrameTimeRef.current = currentTime;
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const deltaTime = currentTime - lastFrameTimeRef.current;
      const frameInterval = 1000 / spriteConfig.frameRate;

      if (deltaTime >= frameInterval) {
        frameRef.current = (frameRef.current + 1) % spriteConfig.frames;
        lastFrameTimeRef.current = currentTime;
      }

      // Limpiar el canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calcular la posición del frame actual en el sprite sheet
      const frameWidth = spriteConfig.width;
      const frameHeight = spriteConfig.height;
      const frameX = frameRef.current * frameWidth;

      // Dibujar el frame actual
      ctx.save();
      ctx.translate(position.x, position.y);
      if (direction === 'left') {
        ctx.scale(-1, 1);
      }
      ctx.scale(scale, scale);
      ctx.drawImage(
        sprite,
        frameX, 0, frameWidth, frameHeight,
        -frameWidth / 2, -frameHeight / 2,
        frameWidth, frameHeight
      );
      ctx.restore();

      // Si la animación ha terminado y hay un callback
      if (frameRef.current === spriteConfig.frames - 1 && onAnimationComplete) {
        onAnimationComplete();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    sprite.onload = () => {
      canvas.width = spriteConfig.width;
      canvas.height = spriteConfig.height;
      animationRef.current = requestAnimationFrame(animate);
    };

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [spriteConfig, position, direction, scale, onAnimationComplete]);

  return (
    <SpriteCanvas
      ref={canvasRef}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        zIndex: position.z || 0
      }}
    />
  );
};

export default SpriteAnimation; 