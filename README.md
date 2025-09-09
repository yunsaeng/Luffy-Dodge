# 🏴‍☠️ LUFFE DODGE

> **원피스 테마의 장애물 피하기 게임**

마우스나 터치로 루피를 조작하여 하늘에서 떨어지는 아카이누를 피하는 액션 게임입니다!

## 🎮 게임 소개

**LUFFE DODGE**는 원피스의 주인공 루피가 해군 대장 아카이누의 공격을 피하는 게임입니다. 시간이 지날수록 난이도가 급격히 상승하며, 플레이어는 최대한 오래 살아남아 높은 점수를 획득해야 합니다.

## 🌐 게임 플레이

**🎮 [지금 플레이하기](https://luffy-dodge.vercel.app/)**

### 🌟 주요 특징

- **실시간 조작**: 마우스 드래그 또는 터치로 즉시 반응하는 캐릭터 이동
- **시선 시스템**: 캐릭터가 이동 방향에 따라 자연스럽게 시선 변경
- **지수적 난이도**: 레벨업 시마다 속도와 생성 간격이 2배씩 증가
- **레벨 시스템**: 플레이 시간에 따른 해적 등급 시스템
- **반응형 디자인**: 데스크톱과 모바일 모두 지원

## 🎯 게임 방법

### 조작법
- **데스크톱**: 마우스 드래그로 캐릭터 이동
- **모바일**: 터치 드래그로 캐릭터 이동
- **키보드**: 스페이스바로 일시정지, 엔터로 게임 시작

### 목표
- 하늘에서 떨어지는 아카이누를 피하며 최대한 오래 살아남기
- 장애물을 피할 때마다 점수 획득
- 높은 레벨 달성으로 해적왕 등급 도전

## 🏆 레벨 시스템

플레이 시간에 따라 해적 등급이 결정됩니다:

| 시간 | 레벨 | 등급 | 난이도 |
|------|------|------|--------|
| 0~10초 | 1 | 일반인 | 기본 |
| 10~30초 | 2 | 견습 해적 | 2배 |
| 30~60초 | 3 | 초신성 | 4배 |
| 60~120초 | 4 | 사황 | 8배 |
| 120초+ | 5 | 해적왕 | 16배 |

> ⚠️ **주의**: 레벨이 올라갈수록 장애물 속도와 생성 빈도가 급격히 증가합니다!

## 🎨 게임 화면

### 시작 화면
- 게임 제목 "LUFFE DODGE"
- 게임 설명 및 조작법 안내
- 최고 점수 표시
- 게임 시작 버튼

### 게임 화면
- 실시간 점수, 시간, 레벨 표시
- 루피 캐릭터 (마우스/터치로 이동)
- 떨어지는 아카이누 장애물
- 일시정지/재개 기능

### 게임 오버 화면
- 최종 점수, 플레이 시간, 달성 레벨 표시
- 해적 등급 정보
- 다시 시작하기 버튼

## 🔧 주요 기능

### 시선 시스템
- 캐릭터 이동 방향에 따라 자연스러운 시선 변경
- 왼쪽 이동 시 오른쪽 시선, 오른쪽 이동 시 왼쪽 시선
- 부드러운 애니메이션 전환

### 난이도 시스템
- 시간 기반 레벨업 (10초, 30초, 60초, 120초)
- 지수적 난이도 증가 (2배씩)
- 최소 생성 간격 보장 (200ms)

### 반응형 디자인
- 데스크톱과 모바일 모두 지원
- 터치 이벤트 최적화
- 마우스 포인터 숨김 처리

## 🎯 게임 팁

1. **안정적인 조작**: 작은 움직임보다는 명확한 방향 변경을 하세요
2. **예측 이동**: 장애물의 떨어지는 패턴을 파악하고 미리 이동하세요
3. **중앙 집중**: 게임 영역 중앙에서 시작하여 양쪽으로 이동하는 것이 유리합니다
4. **집중력**: 레벨이 올라갈수록 집중력이 중요합니다

## 📱 지원 플랫폼

- **데스크톱**: Chrome, Firefox, Safari, Edge
- **모바일**: iOS Safari, Android Chrome
- **태블릿**: iPad, Android 태블릿

## 🏆 최고 점수 도전

게임을 플레이하며 최고 점수를 달성해보세요! 최고 점수는 브라우저 로컬 스토리지에 자동 저장됩니다.


## 💻 싱글톤 프롬프트

이 프로젝트는 싱글톤 프롬프트를 작성하여 바이브 코딩으로 개발되었습니다.

```
루피 도지 게임 개발 (Next.js + TypeScript + 아키텍처)

1. 프로젝트 초기 설정

- Next.js 14 + TypeScript + React 18 프로젝트 생성
- App Router 사용 (src/app 구조)
- ESLint + Prettier 설정
- Tailwind CSS 또는 CSS-in-JS 스타일링

2. 폴더 구조 (레이어드 아키텍처)

src/
├── app/
│ ├── page.tsx (메인 페이지)
│ ├── game/page.tsx (게임 페이지)
│ ├── layout.tsx
│ └── globals.css
├── components/ (Presentation Layer)
│ ├── Character.tsx
│ ├── Obstacle.tsx
│ ├── GameArea.tsx
│ ├── GameUI.tsx
│ ├── GameControls.tsx
│ └── GamePage.tsx
├── models/ (Domain Layer)
│ ├── Character.ts
│ ├── Obstacle.ts
│ ├── CollisionDetector.ts
│ └── LevelingService.ts
├── services/ (Application Layer)
│ ├── GameService.ts (Singleton)
│ ├── ScoreManager.ts
│ ├── TimerManager.ts
│ └── InputHandler.ts (Strategy)
├── utils/ (Infrastructure Layer)
│ ├── constants.ts
│ ├── utils.ts
│ └── AssetLoader.ts (Factory)
└── types/
└── game.ts

3. 디자인 패턴 적용

- Singleton: GameService (게임 상태 중앙 관리)
- Observer: 게임 상태 변경 알림 시스템
- Factory: ObstacleModel 생성
- Strategy: InputHandler (마우스/터치 입력 처리)

4. SOLID 원칙 적용

- SRP: 각 클래스는 단일 책임
- OCP: 확장에는 열려있고 수정에는 닫혀있음
- LSP: 인터페이스 구현체는 대체 가능
- ISP: 인터페이스 분리 원칙
- DIP: 의존성 역전 원칙

5. TypeScript 타입 정의

types/game.ts
export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface GameObject {
  id: string;
  position: Position;
  size: Size;
}

export interface Character extends GameObject {
  speed: number;
  isMoving: boolean;
  direction: 'left' | 'right';
}

export interface Obstacle extends GameObject {
  speed: number;
  isActive: boolean;
}

export interface GameData {
  score: number;
  time: number;
  level: number;
  isGameOver: boolean;
  isPaused: boolean;
}

6. 핵심 요구사항

- 안정적인 시선 시스템: 캐릭터 이동 방향에 따라 일관되고 안정적인 시선 변경
- 마우스 포인터 숨김: 게임 화면에서 마우스 포인터 완전 제거
- 레벨 표시 개선: 게임 오버 시 "숫자(계급)" 형태로 레벨 표시
- 지수적 난이도 증가: 레벨업 시마다 속도와 생성 간격이 2배씩 증가
- 높은 기본 난이도: 레벨 1부터 기본 속도의 2배로 시작

7. 시선 시스템 요구사항

- 정확한 방향 감지: 마우스 위치와 캐릭터 중심점 비교로 정확한 방향 판단
- 일관된 시선 변경: 이동할 때마다 항상 올바른 방향으로 시선 변경
- 부드러운 애니메이션: 시선 변경 시 자연스러운 전환 효과
- 임계값 설정: 작은 움직임은 무시하고 명확한 방향 변경만 반영
- 시선 방향: 왼쪽으로 이동하면 오른쪽을 보고, 오른쪽으로 이동하면 왼쪽을 봄

8. 마우스 포인터 처리

- 게임 영역에서 숨김: 게임 진행 중 마우스 포인터 완전 제거
- CSS 처리: cursor: none 적용
- 게임 오버 시 복원: 게임 오버 화면에서는 마우스 포인터 표시

9. 레벨 시스템 개선

- 레벨 1: 기본 속도 × 2, 기본 간격 ÷ 2
- 레벨 2: 기본 속도 × 4, 기본 간격 ÷ 4
- 레벨 3: 기본 속도 × 8, 기본 간격 ÷ 8
- 레벨 4: 기본 속도 × 16, 기본 간격 ÷ 16
- 레벨 5: 기본 속도 × 32, 기본 간격 ÷ 32

10. 게임 오버 화면 개선

- 레벨 표시: "5(해적왕)" 형태로 표시
- 계급 정보: 레벨 번호와 함께 해당 계급명 표시
- 시각적 개선: 레벨 정보를 더 명확하게 표시

11. 기술적 구현

11.1. 시선 시스템 수정

models/Character.ts
export class CharacterModel implements Character {
  public direction: 'left' | 'right' = 'right';

  public moveTo(targetX: number): void {
    const clampedX = clamp(targetX, this.size.width / 2, GAME_WIDTH - this.size.width / 2);

    const previousX = this.position.x;
    const directionThreshold = 5;

    if (Math.abs(clampedX - previousX) > directionThreshold) {
      this.direction = clampedX < previousX ? 'right' : 'left';
    }

    this.position.x = clampedX;
    this.isMoving = true;
  }
}

11.2. 마우스 포인터 숨김

.game-area {
  cursor: none;
}

.game-over-screen {
  cursor: default;
}

11.3. 지수적 난이도 시스템

models/LevelingService.ts
export class LevelingService {
  public getLevelInfo(level: number): { speed: number; spawnInterval: number; description: string } {
    const baseSpeed = 4;
    const baseInterval = 1500;
    const multiplier = Math.pow(2, level - 1);

    return {
      speed: baseSpeed * multiplier,
      spawnInterval: Math.max(200, baseInterval / multiplier),
      description: this.getLevelDescription(level)
    };
  }
}

11.4. Singleton 패턴 적용

services/GameService.ts
export class GameService {
  private static instance: GameService;

  public static getInstance(): GameService {
    if (!GameService.instance) {
      GameService.instance = new GameService();
    }
    return GameService.instance;
  }
}

12. 필수 검증 사항

- 캐릭터가 왼쪽으로 이동할 때 항상 오른쪽을 바라봄
- 캐릭터가 오른쪽으로 이동할 때 항상 왼쪽을 바라봄
- 게임 화면에서 마우스 포인터가 보이지 않음
- 게임 오버 시 레벨이 "숫자(계급)" 형태로 표시됨
- 레벨업 시마다 속도와 생성 간격이 정확히 2배씩 증가
- 레벨 1부터 기본 속도의 2배로 시작

13. 구현 우선순위

1. 1단계: Next.js 프로젝트 생성 및 기본 설정
2. 2단계: 폴더 구조 및 타입 정의
3. 3단계: 기본 컴포넌트 구조 생성
4. 4단계: 게임 로직 및 서비스 구현
5. 5단계: 시선 시스템 및 난이도 시스템 구현
6. 6단계: UI/UX 개선 및 최종 테스트
```

**원피스의 세계에서 루피와 함께 해적왕의 꿈을 향해 도전하세요!** 🏴‍☠️
