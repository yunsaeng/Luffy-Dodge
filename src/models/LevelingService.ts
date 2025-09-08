// 레벨링 서비스 클래스
import { GAME_CONFIG } from '../utils/constants';

export class LevelingService {
  /**
   * 게임 시간에 따른 현재 레벨을 계산합니다
   * @param gameTime 게임 진행 시간 (밀리초)
   * @returns 현재 레벨
   */
  public getCurrentLevel(gameTime: number): number {
    const seconds = Math.floor(gameTime / 1000);
    
    if (seconds < 10) return 1; // 일반인
    if (seconds < 30) return 2; // 견습 해적
    if (seconds < 60) return 3; // 초신성
    if (seconds < 120) return 4; // 사황
    return 5; // 해적왕
  }

  /**
   * 특정 레벨의 정보를 반환합니다 (지수적 난이도 증가)
   * @param level 레벨 번호
   * @returns 레벨 정보
   */
  public getLevelInfo(level: number): { speed: number; spawnInterval: number; description: string } {
    const baseSpeed = 4;
    const baseInterval = 1500;
    const multiplier = Math.pow(2, level - 1); // 레벨 1부터 2배씩 증가
    
    return {
      speed: baseSpeed * multiplier,
      spawnInterval: Math.max(200, baseInterval / multiplier), // 최소 200ms 간격 보장
      description: this.getLevelDescription(level)
    };
  }

  /**
   * 레벨업이 발생했는지 확인합니다
   * @param previousTime 이전 게임 시간
   * @param currentTime 현재 게임 시간
   * @returns 레벨업 여부
   */
  public hasLeveledUp(previousTime: number, currentTime: number): boolean {
    const previousLevel = this.getCurrentLevel(previousTime);
    const currentLevel = this.getCurrentLevel(currentTime);
    
    return currentLevel > previousLevel;
  }

  /**
   * 레벨에 따른 설명을 반환합니다
   * @param level 레벨 번호
   * @returns 레벨 설명
   */
  public getLevelDescription(level: number): string {
    const levelIndex = Math.max(0, Math.min(level - 1, GAME_CONFIG.LEVELS.length - 1));
    return GAME_CONFIG.LEVELS[levelIndex].description;
  }
}
