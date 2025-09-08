'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GameArea } from '../components/GameArea';
import { GameUI } from '../components/GameUI';
import { GameControls } from '../components/GameControls';
import { GameService } from '../services/GameService';
import { GameData } from '../utils/constants';
import { GAME_CONFIG } from '../utils/constants';
import { LevelingService } from '../models/LevelingService';

export const GamePage: React.FC = () => {
  const gameServiceRef = useRef<GameService | null>(null);
  const levelingService = new LevelingService();
  const [gameData, setGameData] = useState<GameData>({
    score: 0,
    time: 0,
    level: 1,
    isGameOver: false,
    isPaused: false,
  });
  const [showStartScreen, setShowStartScreen] = useState(true);

  // 게임 서비스 초기화
  useEffect(() => {
    const gameService = new GameService();
    gameService.setOnGameDataChange(setGameData);
    gameServiceRef.current = gameService;

    return () => {
      if (gameServiceRef.current) {
        gameServiceRef.current.destroy();
      }
    };
  }, []);

  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!gameServiceRef.current) return;

      switch (event.code) {
        case 'Space':
          event.preventDefault();
          if (gameData.isPaused) {
            gameServiceRef.current.resumeGame();
          } else if (!gameData.isGameOver) {
            gameServiceRef.current.pauseGame();
          }
          break;
        case 'Enter':
          event.preventDefault();
          if (gameData.isGameOver) {
            gameServiceRef.current.startGame();
            setShowStartScreen(false);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameData]);

  // 마우스 이동 처리 (즉시 반응)
  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    if (!gameServiceRef.current) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    gameServiceRef.current.moveCharacter(x);
  }, []);

  // 터치 이동 처리 (즉시 반응) - 모바일 호환성 개선
  const handleTouchMove = useCallback((x: number) => {
    if (!gameServiceRef.current) return;
    gameServiceRef.current.moveCharacter(x);
  }, []);

  // 게임 액션 핸들러들
  const handleStartGame = useCallback(() => {
    if (gameServiceRef.current) {
      gameServiceRef.current.startGame();
      setShowStartScreen(false);
    }
  }, []);

  const handlePauseGame = useCallback(() => {
    if (gameServiceRef.current) {
      gameServiceRef.current.pauseGame();
    }
  }, []);

  const handleResumeGame = useCallback(() => {
    if (gameServiceRef.current) {
      gameServiceRef.current.resumeGame();
    }
  }, []);

  const handleRestartGame = useCallback(() => {
    if (gameServiceRef.current) {
      gameServiceRef.current.startGame();
      setShowStartScreen(false);
    }
  }, []);

  // 게임 시작 화면
  if (showStartScreen) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: 'linear-gradient(135deg, #87CEEB 0%, #98D8E8 100%)',
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
      }}>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          maxWidth: '600px',
          width: '100%',
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#2c3e50',
            marginBottom: '20px',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
          }}>
            LUFFE DODGE
          </h1>
          
          <p style={{
            fontSize: '18px',
            color: '#34495e',
            marginBottom: '30px',
            lineHeight: '1.6',
          }}>
            마우스나 터치로 캐릭터를 움직여 하늘에서 떨어지는 장애물을 피하는 게임입니다!
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '30px',
            flexWrap: 'wrap',
            gap: '20px',
          }}>
            <div style={{
              flex: '1',
              minWidth: '150px',
              padding: '15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '10px',
              border: '2px solid #e9ecef',
            }}>
              <div style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#495057',
                marginBottom: '8px',
              }}>🎮 조작법</div>
              <div style={{
                fontSize: '14px',
                color: '#6c757d',
                lineHeight: '1.4',
              }}>
                마우스 드래그 또는 터치로 캐릭터를 좌우로 이동하세요
              </div>
            </div>
            
            <div style={{
              flex: '1',
              minWidth: '150px',
              padding: '15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '10px',
              border: '2px solid #e9ecef',
            }}>
              <div style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#495057',
                marginBottom: '8px',
              }}>🎯 목표</div>
              <div style={{
                fontSize: '14px',
                color: '#6c757d',
                lineHeight: '1.4',
              }}>
                장애물을 피하며 최대한 오래 살아남으세요
              </div>
            </div>
            
            <div style={{
              flex: '1',
              minWidth: '150px',
              padding: '15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '10px',
              border: '2px solid #e9ecef',
            }}>
              <div style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#495057',
                marginBottom: '8px',
              }}>⭐ 점수</div>
              <div style={{
                fontSize: '14px',
                color: '#6c757d',
                lineHeight: '1.4',
              }}>
                장애물을 피할 때마다 점수가 증가합니다
              </div>
            </div>
          </div>

          <button 
            onClick={handleStartGame}
            style={{
              padding: '15px 30px',
              fontSize: '20px',
              fontWeight: 'bold',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)',
              transition: 'all 0.3s ease',
            }}
          >
            게임 시작하기
          </button>

          <div style={{
            marginTop: '20px',
            fontSize: '16px',
            color: '#6c757d',
            backgroundColor: '#f8f9fa',
            padding: '10px 20px',
            borderRadius: '8px',
            border: '1px solid #e9ecef',
          }}>
            최고 점수: {typeof window !== 'undefined' ? 
              (localStorage.getItem('luffy-dodge-high-score') || '0') : '0'}
          </div>
        </div>
      </div>
    );
  }

  // 게임 오버 화면
  if (gameData.isGameOver) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
      }}>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          maxWidth: '500px',
          width: '100%',
        }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#e74c3c',
            marginBottom: '20px',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
          }}>
            게임 오버!
          </h1>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '30px',
            flexWrap: 'wrap',
            gap: '15px',
          }}>
            <div style={{
              flex: '1',
              minWidth: '120px',
              padding: '15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '10px',
              border: '2px solid #e9ecef',
            }}>
              <div style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#495057',
                marginBottom: '8px',
              }}>최종 점수</div>
              <div style={{
                fontSize: '20px',
                color: '#e74c3c',
                fontWeight: 'bold',
              }}>
                {gameData.score}
              </div>
            </div>
            
            <div style={{
              flex: '1',
              minWidth: '120px',
              padding: '15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '10px',
              border: '2px solid #e9ecef',
            }}>
              <div style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#495057',
                marginBottom: '8px',
              }}>플레이 시간</div>
              <div style={{
                fontSize: '20px',
                color: '#e74c3c',
                fontWeight: 'bold',
              }}>
                {Math.floor(gameData.time / 1000)}초
              </div>
            </div>
            
            <div style={{
              flex: '1',
              minWidth: '120px',
              padding: '15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '10px',
              border: '2px solid #e9ecef',
            }}>
              <div style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#495057',
                marginBottom: '8px',
              }}>달성 레벨</div>
              <div style={{
                fontSize: '20px',
                color: '#e74c3c',
                fontWeight: 'bold',
              }}>
                {gameData.level}({levelingService.getLevelDescription(gameData.level)})
              </div>
            </div>
          </div>

          <button 
            onClick={handleRestartGame}
            style={{
              padding: '15px 30px',
              fontSize: '20px',
              fontWeight: 'bold',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)',
              transition: 'all 0.3s ease',
            }}
          >
            다시 시작하기
          </button>
        </div>
      </div>
    );
  }

  // 게임 진행 화면
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#87CEEB',
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{ position: 'relative' }}>
        {/* 게임 영역 */}
        {gameServiceRef.current && (
          <GameArea
            character={gameServiceRef.current.getCharacter()}
            obstacles={gameServiceRef.current.getObstacles()}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          />
        )}
        
        {/* 게임 UI */}
        <GameUI gameData={gameData} />
        
        {/* 게임 컨트롤 */}
        <GameControls
          gameData={gameData}
          onStartGame={handleStartGame}
          onPauseGame={handlePauseGame}
          onResumeGame={handleResumeGame}
          onRestartGame={handleRestartGame}
        />
        
        {/* 게임 컨트롤 안내 */}
        {!gameData.isGameOver && gameData.score > 0 && !gameData.isPaused && (
          <div style={{
            position: 'absolute',
            bottom: '-60px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#fff',
            fontSize: '14px',
            textAlign: 'center',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          }}>
            <p>스페이스바: 일시정지 | 엔터: 게임 시작</p>
          </div>
        )}
      </div>
    </div>
  );
};
