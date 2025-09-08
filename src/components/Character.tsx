'use client';

import React from 'react';
import { Character as CharacterType } from '../utils/constants';

interface CharacterProps {
  character: CharacterType;
}

export const Character: React.FC<CharacterProps> = ({ character }) => {
  const characterStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${character.position.x - character.size.width / 2}px`,
    top: `${character.position.y - character.size.height / 2}px`,
    width: `${character.size.width}px`,
    height: `${character.size.height}px`,
    border: 'none',
    boxShadow: 'none',
    zIndex: 10,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    borderRadius: '8px',
    transition: 'transform 0.2s ease',
    transform: character.direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
  };

  return (
    <div style={characterStyle}>
      <img
        src="/luffy.png"
        alt="Character"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          borderRadius: '6px',
          backgroundColor: 'transparent',
          mixBlendMode: 'multiply',
        }}
        onError={(e) => {
          // 이미지 로딩 실패 시 폴백 처리
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent) {
            parent.style.backgroundColor = '#ff6b6b';
            parent.style.display = 'flex';
            parent.style.alignItems = 'center';
            parent.style.justifyContent = 'center';
            parent.style.color = '#fff';
            parent.style.fontSize = '20px';
            parent.style.fontWeight = 'bold';
            parent.textContent = 'L';
          }
        }}
      />
    </div>
  );
};
