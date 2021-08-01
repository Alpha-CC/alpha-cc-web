import { Position } from '@/types/board';

export const isEqualPosition = (p1: Position, p2: Position): boolean =>
  p1[0] === p2[0] && p1[1] === p2[1];
