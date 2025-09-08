'use client';

import React from 'react';
import { GameData } from '../utils/constants';
import { LevelingService } from '../models/LevelingService';

interface GameUIProps {
  gameData: GameData;
}

export const GameUI: React.FC<GameUIProps> = ({ gameData }) => {
  const levelingService = new LevelingService();
  
  const uiStyle: React.CSSProperties = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    right: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 20,
    pointerEvents: 'none',
    flexWrap: 'wrap',
    gap: '10px',
  };

  const infoStyle: React.CSSProperties = {
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: '8px 12px',
    borderRadius: '8px',
  };

  const formatTime = (time: number): string => {
    const seconds = Math.floor(time / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div style={uiStyle}>
      <div style={infoStyle}>
        점수: {gameData.score.toLocaleString()}
      </div>
      <div style={infoStyle}>
        시간: {formatTime(gameData.time)}
      </div>
      <div style={{ ...infoStyle, color: '#ffd700' }}>
        레벨: {gameData.level} ({levelingService.getLevelDescription(gameData.level)})
      </div>
    </div>
  );
};
