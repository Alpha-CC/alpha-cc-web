import { PieceType } from '@/constants/piece';
import { Position } from '@/types/board';

export const Size = {
  ROW: 10,
  COL: 9,
};

export const initBlackPosition = [
  {
    type: PieceType.CHARIOT,
    pos: [
      [0, 0],
      [0, 8],
    ],
  },
  {
    type: PieceType.HORSE,
    pos: [
      [0, 1],
      [0, 7],
    ],
  },
  {
    type: PieceType.ELEPHANT,
    pos: [
      [0, 2],
      [0, 6],
    ],
  },
  {
    type: PieceType.ADVISOR,
    pos: [
      [0, 3],
      [0, 5],
    ],
  },
  { type: PieceType.KING, pos: [[0, 4]] },
  {
    type: PieceType.CANNON,
    pos: [
      [2, 1],
      [2, 7],
    ],
  },
  {
    type: PieceType.PAWN,
    pos: [
      [3, 0],
      [3, 2],
      [3, 4],
      [3, 6],
      [3, 8],
    ],
  },
];

export const Bound: Record<string, [Position, Position]> = {
  BOARD: [
    [0, 0],
    [Size.ROW - 1, Size.COL - 1],
  ],
  BLACK: [
    [0, 0],
    [4, 8],
  ],
  BLACK_KING: [
    [0, 3],
    [2, 5],
  ],
  RED: [
    [5, 0],
    [Size.ROW - 1, Size.COL - 1],
  ],
  RED_KING: [
    [7, 3],
    [Size.ROW - 1, 5],
  ],
};
