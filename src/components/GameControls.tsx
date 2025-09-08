'use client';

import React from 'react';
import { GameData } from '../utils/constants';

interface GameControlsProps {
  gameData: GameData;
  onStartGame: () => void;
  onPauseGame: () => void;
  onResumeGame: () => void;
  onRestartGame: () => void;
}

export const GameControls: React.FC<GameControlsProps> = ({
  gameData,
  onStartGame,
  onPauseGame,
  onResumeGame,
  onRestartGame,
}) => {
  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: '#fff',
    zIndex: 30,
    fontFamily: 'Arial, sans-serif',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '12px 24px',
    margin: '8px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '36px',
    marginBottom: '20px',
    textAlign: 'center',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  };

  const scoreStyle: React.CSSProperties = {
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#ffd700',
  };

  // 게임 시작 화면
  if (!gameData.isGameOver && gameData.score === 0 && gameData.time === 0) {
    return (
      <div style={overlayStyle}>
        <h1 style={titleStyle}>🏃‍♂️ 루피 도지 게임</h1>
        <p style={{ fontSize: '18px', marginBottom: '30px', textAlign: 'center' }}>
          마우스나 터치로 캐릭터를 움직여 장애물을 피하세요!
        </p>
        <button style={buttonStyle} onClick={onStartGame}>
          게임 시작
        </button>
      </div>
    );
  }

  // 게임 오버 화면
  if (gameData.isGameOver) {
    const formatTime = (time: number): string => {
      const seconds = Math.floor(time / 1000);
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
      <div style={overlayStyle}>
        <h1 style={titleStyle}>게임 오버!</h1>
        <div style={scoreStyle}>
          최종 점수: {gameData.score.toLocaleString()}
        </div>
        <div style={{ fontSize: '18px', marginBottom: '20px', textAlign: 'center' }}>
          플레이 시간: {formatTime(gameData.time)}
        </div>
        <div style={{ fontSize: '16px', marginBottom: '30px', textAlign: 'center', color: '#ffd700' }}>
          레벨: {gameData.level}
        </div>
        <button style={buttonStyle} onClick={onRestartGame}>
          다시 시작
        </button>
      </div>
    );
  }

  // 게임 일시정지 화면
  if (gameData.isPaused) {
    return (
      <div style={overlayStyle}>
        <h1 style={titleStyle}>일시정지</h1>
        <button style={buttonStyle} onClick={onResumeGame}>
          계속하기
        </button>
        <button 
          style={{ ...buttonStyle, backgroundColor: '#f44336' }} 
          onClick={onRestartGame}
        >
          다시 시작
        </button>
      </div>
    );
  }

  // 게임 진행 중에는 컨트롤 숨김
  return null;
};
