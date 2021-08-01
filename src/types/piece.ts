import { PieceType, Side } from '@/constants/piece';

export type Piece = {
  readonly side: Side;
  readonly type: PieceType;
  readonly id: number;
};
