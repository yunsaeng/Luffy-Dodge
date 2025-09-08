// 게임 상수 정의 (이미지 사용)
export const GAME_CONFIG = {
  // 게임 영역 크기
  GAME_WIDTH: 400,
  GAME_HEIGHT: 600,
  
  // 캐릭터 설정
  CHARACTER: {
    WIDTH: 50,
    HEIGHT: 50,
    SPEED: 8,
    INITIAL_X: 200, // 게임 영역 중앙
    INITIAL_Y: 520, // 바닥 위치
    IMAGE: '/luffy.png',
  },
  
  // 장애물 설정
  OBSTACLE: {
    WIDTH: 40,
    HEIGHT: 40,
    SPEED: 4,
    SPAWN_INTERVAL: 1500, // 1.5초마다 생성
    SPAWN_Y: -40, // 게임 영역 위쪽에서 시작
    IMAGE: '/akainu.png',
  },
  
  // 게임 설정
  GAME: {
    FPS: 60,
    SCORE_INCREMENT: 10,
    LEVEL_UP_TIME: 20000, // 20초마다 레벨업
  },
  
  // 레벨 설정
  LEVELS: [
    { level: 1, speed: 4, spawnInterval: 1500, description: "일반인" },
    { level: 2, speed: 5, spawnInterval: 1200, description: "견습 해적" },
    { level: 3, speed: 6, spawnInterval: 1000, description: "초신성" },
    { level: 4, speed: 7, spawnInterval: 800, description: "사황" },
    { level: 5, speed: 8, spawnInterval: 600, description: "해적왕" },
  ],
} as const;

// 게임 상태 타입
export type GameState = 'idle' | 'playing' | 'paused' | 'gameOver';

// 좌표 인터페이스
export interface Position {
  x: number;
  y: number;
}

// 크기 인터페이스
export interface Size {
  width: number;
  height: number;
}

// 게임 오브젝트 기본 인터페이스
export interface GameObject {
  id: string;
  position: Position;
  size: Size;
}

// 캐릭터 인터페이스
export interface Character extends GameObject {
  speed: number;
  isMoving: boolean;
  direction: 'left' | 'right';
}

// 장애물 인터페이스
export interface Obstacle extends GameObject {
  speed: number;
  isActive: boolean;
}

// 게임 데이터 인터페이스
export interface GameData {
  score: number;
  time: number;
  level: number;
  isGameOver: boolean;
  isPaused: boolean;
}
