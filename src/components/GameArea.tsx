'use client';

import React, { useEffect, useRef } from 'react';
import { Character } from './Character';
import { Obstacle } from './Obstacle';
import { Character as CharacterType, Obstacle as ObstacleType } from '../utils/constants';
import { GAME_CONFIG } from '../utils/constants';

interface GameAreaProps {
  character: CharacterType;
  obstacles: ObstacleType[];
  onMouseMove: (event: React.MouseEvent) => void;
  onTouchMove?: (x: number) => void;
}

export const GameArea: React.FC<GameAreaProps> = ({
  character,
  obstacles,
  onMouseMove,
  onTouchMove,
}) => {
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const gameAreaStyle: React.CSSProperties = {
    position: 'relative',
    width: `${GAME_CONFIG.GAME_WIDTH}px`,
    height: `${GAME_CONFIG.GAME_HEIGHT}px`,
    backgroundColor: '#87CEEB',
    border: '4px solid #fff',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',
    cursor: 'none',
    userSelect: 'none',
  };

  // 터치 이벤트 처리
  useEffect(() => {
    const gameArea = gameAreaRef.current;
    if (!gameArea || !onTouchMove) return;

    const handleTouch = (event: TouchEvent) => {
      event.preventDefault();
      if (event.touches.length > 0) {
        const rect = gameArea.getBoundingClientRect();
        const x = event.touches[0].clientX - rect.left;
        onTouchMove(x);
      }
    };

    gameArea.addEventListener('touchstart', handleTouch, { passive: false });
    gameArea.addEventListener('touchmove', handleTouch, { passive: false });

    return () => {
      gameArea.removeEventListener('touchstart', handleTouch);
      gameArea.removeEventListener('touchmove', handleTouch);
    };
  }, [onTouchMove]);

  return (
    <div
      ref={gameAreaRef}
      className="game-area"
      style={gameAreaStyle}
      onMouseMove={onMouseMove}
    >
      {/* 캐릭터 */}
      <Character character={character} />
      
      {/* 장애물들 */}
      {obstacles.map((obstacle) => (
        <Obstacle key={obstacle.id} obstacle={obstacle} />
      ))}
    </div>
  );
};
