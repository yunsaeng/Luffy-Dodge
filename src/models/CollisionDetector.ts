// 충돌 감지기 클래스
import { CharacterModel } from './Character';
import { ObstacleModel } from './Obstacle';
import { isRectanglesOverlapping } from '../utils/utils';

export class CollisionDetector {
  /**
   * 캐릭터와 장애물들 간의 충돌을 감지합니다
   * @param character 캐릭터 모델
   * @param obstacles 장애물 모델 배열
   * @returns 충돌 여부
   */
  public checkCollision(character: CharacterModel, obstacles: ObstacleModel[]): boolean {
    const characterBox = character.getBoundingBox();
    
    for (const obstacle of obstacles) {
      if (!obstacle.isActive) continue;
      
      const obstacleBox = obstacle.getBoundingBox();
      
      if (isRectanglesOverlapping(characterBox, obstacleBox)) {
        return true;
      }
    }
    
    return false;
  }
}
