'use client';

import React from 'react';
import { Obstacle as ObstacleType } from '../utils/constants';

interface ObstacleProps {
  obstacle: ObstacleType;
}

export const Obstacle: React.FC<ObstacleProps> = ({ obstacle }) => {
  const obstacleStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${obstacle.position.x - obstacle.size.width / 2}px`,
    top: `${obstacle.position.y - obstacle.size.height / 2}px`,
    width: `${obstacle.size.width}px`,
    height: `${obstacle.size.height}px`,
    borderRadius: '8px',
    border: 'none',
    boxShadow: 'none',
    zIndex: 5,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  };

  return (
    <div style={obstacleStyle}>
      <img
        src="/akainu.png"
        alt="Obstacle"
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
            parent.style.backgroundColor = '#ff4757';
            parent.style.display = 'flex';
            parent.style.alignItems = 'center';
            parent.style.justifyContent = 'center';
            parent.style.color = '#fff';
            parent.style.fontSize = '16px';
            parent.style.fontWeight = 'bold';
            parent.textContent = 'A';
          }
        }}
      />
    </div>
  );
};
