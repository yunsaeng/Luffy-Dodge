// 게임 유틸리티 함수들
import { Position, Size } from './constants';

/**
 * 랜덤한 숫자를 생성합니다
 * @param min 최소값
 * @param max 최대값
 * @returns 랜덤한 숫자
 */
export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * 랜덤한 정수를 생성합니다
 * @param min 최소값
 * @param max 최대값
 * @returns 랜덤한 정수
 */
export function randomIntBetween(min: number, max: number): number {
  return Math.floor(randomBetween(min, max));
}

/**
 * 두 사각형이 겹치는지 확인합니다
 * @param rect1 첫 번째 사각형
 * @param rect2 두 번째 사각형
 * @returns 겹침 여부
 */
export function isRectanglesOverlapping(
  rect1: { position: Position; size: Size },
  rect2: { position: Position; size: Size }
): boolean {
  return (
    rect1.position.x < rect2.position.x + rect2.size.width &&
    rect1.position.x + rect1.size.width > rect2.position.x &&
    rect1.position.y < rect2.position.y + rect2.size.height &&
    rect1.position.y + rect1.size.height > rect2.position.y
  );
}

/**
 * 값을 특정 범위로 제한합니다
 * @param value 제한할 값
 * @param min 최소값
 * @param max 최대값
 * @returns 제한된 값
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * 고유한 ID를 생성합니다
 * @returns 고유한 ID 문자열
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}
