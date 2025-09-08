// 게임 서비스 클래스
import { CharacterModel } from '../models/Character';
import { ObstacleModel } from '../models/Obstacle';
import { CollisionDetector } from '../models/CollisionDetector';
import { LevelingService } from '../models/LevelingService';
import { GameData, GameState } from '../utils/constants';
import { GAME_CONFIG } from '../utils/constants';

export class GameService {
  private character: CharacterModel;
  private obstacles: ObstacleModel[] = [];
  private collisionDetector: CollisionDetector;
  private levelingService: LevelingService;
  private gameLoop: number | null = null;
  private isRunning: boolean = false;
  private isPaused: boolean = false;
  private lastSpawnTime: number = 0;
  private gameData: GameData;
  private onGameDataChange: ((data: GameData) => void) | null = null;
  private startTime: number = 0;
  private pausedTime: number = 0;

  constructor() {
    this.character = new CharacterModel();
    this.collisionDetector = new CollisionDetector();
    this.levelingService = new LevelingService();
    
    this.gameData = {
      score: 0,
      time: 0,
      level: 1,
      isGameOver: false,
      isPaused: false,
    };
  }

  /**
   * 게임 데이터 변경 콜백을 설정합니다
   * @param callback 콜백 함수
   */
  public setOnGameDataChange(callback: (data: GameData) => void): void {
    this.onGameDataChange = callback;
  }

  /**
   * 게임을 시작합니다
   */
  public startGame(): void {
    if (this.isRunning) return;
    
    this.resetGame();
    this.isRunning = true;
    this.isPaused = false;
    this.startTime = Date.now();
    this.pausedTime = 0;
    this.lastSpawnTime = Date.now();
    this.gameData.isGameOver = false;
    this.gameData.isPaused = false;
    
    this.notifyGameDataChange();
    this.startGameLoop();
  }

  /**
   * 게임을 일시정지합니다
   */
  public pauseGame(): void {
    if (!this.isRunning || this.gameData.isGameOver) return;
    
    this.isPaused = true;
    this.pausedTime = this.getElapsedTime();
    this.gameData.isPaused = true;
    this.notifyGameDataChange();
  }

  /**
   * 게임을 재개합니다
   */
  public resumeGame(): void {
    if (!this.isRunning || this.gameData.isGameOver) return;
    
    this.isPaused = false;
    this.startTime = Date.now();
    this.gameData.isPaused = false;
    this.notifyGameDataChange();
  }

  /**
   * 게임을 종료합니다
   */
  public endGame(): void {
    this.isRunning = false;
    this.isPaused = false;
    this.gameData.isGameOver = true;
    this.gameData.isPaused = false;
    
    if (this.gameLoop) {
      cancelAnimationFrame(this.gameLoop);
      this.gameLoop = null;
    }
    
    this.notifyGameDataChange();
  }

  /**
   * 게임을 리셋합니다
   */
  public resetGame(): void {
    this.character.reset();
    this.obstacles = [];
    this.lastSpawnTime = 0;
    this.startTime = 0;
    this.pausedTime = 0;
    this.gameData = {
      score: 0,
      time: 0,
      level: 1,
      isGameOver: false,
      isPaused: false,
    };
    this.notifyGameDataChange();
  }

  /**
   * 경과 시간을 계산합니다
   */
  private getElapsedTime(): number {
    if (this.isPaused) return this.pausedTime;
    return Date.now() - this.startTime;
  }

  /**
   * 캐릭터를 이동시킵니다 (즉시 반응)
   * @param x X 좌표
   */
  public moveCharacter(x: number): void {
    if (!this.isRunning || this.isPaused || this.gameData.isGameOver) return;
    this.character.moveTo(x);
    // 즉시 UI 업데이트를 위해 게임 데이터 변경 알림
    this.notifyGameDataChange();
  }

  /**
   * 게임 루프를 시작합니다
   */
  private startGameLoop(): void {
    const gameLoop = () => {
      if (!this.isRunning) return;
      
      if (this.isPaused) {
        this.gameLoop = requestAnimationFrame(gameLoop);
        return;
      }

      this.updateGame();
      this.gameLoop = requestAnimationFrame(gameLoop);
    };
    
    this.gameLoop = requestAnimationFrame(gameLoop);
  }

  /**
   * 게임 상태를 업데이트합니다
   */
  private updateGame(): void {
    const currentTime = Date.now();
    this.gameData.time = this.getElapsedTime();
    this.gameData.level = this.levelingService.getCurrentLevel(this.gameData.time);

    // 장애물 업데이트
    this.updateObstacles();
    
    // 새로운 장애물 생성
    this.spawnObstacles();
    
    // 충돌 감지
    this.checkCollisions();
    
    // 화면을 벗어난 장애물 제거
    this.cleanupObstacles();

    this.notifyGameDataChange();
  }

  /**
   * 장애물들을 업데이트합니다
   */
  private updateObstacles(): void {
    this.obstacles.forEach(obstacle => {
      obstacle.moveDown();
    });
  }

  /**
   * 새로운 장애물을 생성합니다
   */
  private spawnObstacles(): void {
    const currentTime = Date.now();
    const timeSinceLastSpawn = currentTime - this.lastSpawnTime;
    const levelInfo = this.levelingService.getLevelInfo(this.gameData.level);
    
    if (timeSinceLastSpawn >= levelInfo.spawnInterval) {
      const obstacle = ObstacleModel.create(levelInfo.speed);
      this.obstacles.push(obstacle);
      this.lastSpawnTime = currentTime;
    }
  }

  /**
   * 충돌을 감지합니다
   */
  private checkCollisions(): void {
    if (this.collisionDetector.checkCollision(this.character, this.obstacles)) {
      this.endGame();
    }
  }

  /**
   * 화면을 벗어난 장애물들을 제거합니다
   */
  private cleanupObstacles(): void {
    this.obstacles = this.obstacles.filter(obstacle => {
      if (obstacle.isOutOfBounds()) {
        this.gameData.score += GAME_CONFIG.GAME.SCORE_INCREMENT;
        return false;
      }
      return true;
    });
  }

  /**
   * 게임 데이터 변경을 알립니다
   */
  private notifyGameDataChange(): void {
    if (this.onGameDataChange) {
      this.onGameDataChange({ ...this.gameData });
    }
  }

  /**
   * 현재 게임 데이터를 반환합니다
   * @returns 게임 데이터
   */
  public getGameData(): GameData {
    return { ...this.gameData };
  }

  /**
   * 캐릭터를 반환합니다
   * @returns 캐릭터 인스턴스
   */
  public getCharacter(): CharacterModel {
    return this.character;
  }

  /**
   * 장애물들을 반환합니다
   * @returns 장애물 배열
   */
  public getObstacles(): ObstacleModel[] {
    return [...this.obstacles];
  }

  /**
   * 리소스를 정리합니다
   */
  public destroy(): void {
    if (this.gameLoop) {
      cancelAnimationFrame(this.gameLoop);
      this.gameLoop = null;
    }
    this.isRunning = false;
  }
}
