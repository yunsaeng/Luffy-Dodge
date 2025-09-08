// 장애물 모델 클래스
import { Obstacle as ObstacleType } from '../utils/constants';
import { GAME_CONFIG } from '../utils/constants';
import { randomIntBetween, generateId } from '../utils/utils';

export class ObstacleModel implements ObstacleType {
  public readonly id: string;
  public position: { x: number; y: number };
  public size: { width: number; height: number };
  public speed: number;
  public isActive: boolean;

  constructor(speed?: number) {
    this.id = generateId();
    this.size = {
      width: GAME_CONFIG.OBSTACLE.WIDTH,
      height: GAME_CONFIG.OBSTACLE.HEIGHT,
    };
    this.position = {
      x: randomIntBetween(
        this.size.width / 2,
        GAME_CONFIG.GAME_WIDTH - this.size.width / 2
      ),
      y: GAME_CONFIG.OBSTACLE.SPAWN_Y,
    };
    this.speed = speed || GAME_CONFIG.OBSTACLE.SPEED;
    this.isActive = true;
  }

  /**
   * 장애물을 아래로 이동시킵니다
   */
  public moveDown(): void {
    if (this.isActive) {
      this.position.y += this.speed;
    }
  }

  /**
   * 장애물이 화면을 벗어났는지 확인합니다
   * @returns 화면을 벗어났는지 여부
   */
  public isOutOfBounds(): boolean {
    return this.position.y > GAME_CONFIG.GAME_HEIGHT + this.size.height;
  }

  /**
   * 장애물을 비활성화합니다
   */
  public deactivate(): void {
    this.isActive = false;
  }

  /**
   * 장애물의 바운딩 박스를 반환합니다
   * @returns 바운딩 박스 정보
   */
  public getBoundingBox(): { position: { x: number; y: number }; size: { width: number; height: number } } {
    return {
      position: { ...this.position },
      size: { ...this.size },
    };
  }

  /**
   * 새로운 장애물을 생성하는 팩토리 메서드
   * @param speed 장애물 속도
   * @returns 새로운 장애물 인스턴스
   */
  public static create(speed?: number): ObstacleModel {
    return new ObstacleModel(speed);
  }
}
