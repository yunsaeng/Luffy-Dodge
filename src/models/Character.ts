// 캐릭터 모델 클래스
import { Character as CharacterType } from '../utils/constants';
import { GAME_CONFIG } from '../utils/constants';
import { clamp, generateId } from '../utils/utils';

export class CharacterModel implements CharacterType {
  public readonly id: string;
  public position: { x: number; y: number };
  public size: { width: number; height: number };
  public speed: number;
  public isMoving: boolean;
  public direction: 'left' | 'right';

  constructor() {
    this.id = generateId();
    this.position = {
      x: GAME_CONFIG.CHARACTER.INITIAL_X,
      y: GAME_CONFIG.CHARACTER.INITIAL_Y,
    };
    this.size = {
      width: GAME_CONFIG.CHARACTER.WIDTH,
      height: GAME_CONFIG.CHARACTER.HEIGHT,
    };
    this.speed = GAME_CONFIG.CHARACTER.SPEED;
    this.isMoving = false;
    this.direction = 'right';
  }

  /**
   * 캐릭터를 지정된 위치로 이동시킵니다
   * @param targetX 목표 X 좌표
   */
  public moveTo(targetX: number): void {
    const clampedX = clamp(
      targetX,
      this.size.width / 2,
      GAME_CONFIG.GAME_WIDTH - this.size.width / 2
    );
    
    // 정확한 방향 감지 (임계값 설정) - 시선 방향 반대로 설정
    const previousX = this.position.x;
    const directionThreshold = 5; // 최소 이동 거리
    
    if (Math.abs(clampedX - previousX) > directionThreshold) {
      // 왼쪽으로 이동하면 오른쪽을 보고, 오른쪽으로 이동하면 왼쪽을 봄
      this.direction = clampedX < previousX ? 'right' : 'left';
    }
    
    this.position.x = clampedX;
    this.isMoving = true;
  }

  /**
   * 캐릭터를 초기 위치로 리셋합니다
   */
  public reset(): void {
    this.position.x = GAME_CONFIG.CHARACTER.INITIAL_X;
    this.position.y = GAME_CONFIG.CHARACTER.INITIAL_Y;
    this.isMoving = false;
    this.direction = 'right';
  }

  /**
   * 캐릭터의 바운딩 박스를 반환합니다
   * @returns 바운딩 박스 정보
   */
  public getBoundingBox(): { position: { x: number; y: number }; size: { width: number; height: number } } {
    return {
      position: { ...this.position },
      size: { ...this.size },
    };
  }
}
