import redKing from '@/assets/images/pieces/red/king.png';
import redAdvisor from '@/assets/images/pieces/red/advisor.png';
import redElephant from '@/assets/images/pieces/red/elephant.png';
import redHorse from '@/assets/images/pieces/red/horse.png';
import redChariot from '@/assets/images/pieces/red/chariot.png';
import redCannon from '@/assets/images/pieces/red/cannon.png';
import redPawn from '@/assets/images/pieces/red/pawn.png';
import blackKing from '@/assets/images/pieces/black/king.png';
import blackAdvisor from '@/assets/images/pieces/black/advisor.png';
import blackElephant from '@/assets/images/pieces/black/elephant.png';
import blackHorse from '@/assets/images/pieces/black/horse.png';
import blackChariot from '@/assets/images/pieces/black/chariot.png';
import blackPawn from '@/assets/images/pieces/black/pawn.png';
import blackCannon from '@/assets/images/pieces/black/cannon.png';

export enum PieceType {
  KING,
  ADVISOR,
  ELEPHANT,
  HORSE,
  CHARIOT,
  CANNON,
  PAWN,
}

export enum Side {
  RED,
  BLACK,
}

export const PieceToImg: Record<
  PieceType,
  { [Side.RED]: string; [Side.BLACK]: string }
> = {
  [PieceType.KING]: {
    [Side.RED]: redKing,
    [Side.BLACK]: blackKing,
  },
  [PieceType.ADVISOR]: {
    [Side.RED]: redAdvisor,
    [Side.BLACK]: blackAdvisor,
  },
  [PieceType.ELEPHANT]: {
    [Side.RED]: redElephant,
    [Side.BLACK]: blackElephant,
  },
  [PieceType.CHARIOT]: {
    [Side.RED]: redChariot,
    [Side.BLACK]: blackChariot,
  },
  [PieceType.PAWN]: {
    [Side.RED]: redPawn,
    [Side.BLACK]: blackPawn,
  },
  [PieceType.CANNON]: {
    [Side.RED]: redCannon,
    [Side.BLACK]: blackCannon,
  },
  [PieceType.HORSE]: {
    [Side.RED]: redHorse,
    [Side.BLACK]: blackHorse,
  },
};

export const PieceM: Record<
  PieceType,
  { [Side.RED]: string; [Side.BLACK]: string }
> = {
  [PieceType.KING]: {
    [Side.RED]: redKing,
    [Side.BLACK]: blackKing,
  },
  [PieceType.ADVISOR]: {
    [Side.RED]: redAdvisor,
    [Side.BLACK]: blackAdvisor,
  },
  [PieceType.ELEPHANT]: {
    [Side.RED]: redElephant,
    [Side.BLACK]: blackElephant,
  },
  [PieceType.CHARIOT]: {
    [Side.RED]: redChariot,
    [Side.BLACK]: blackChariot,
  },
  [PieceType.PAWN]: {
    [Side.RED]: redPawn,
    [Side.BLACK]: blackPawn,
  },
  [PieceType.CANNON]: {
    [Side.RED]: redCannon,
    [Side.BLACK]: blackCannon,
  },
  [PieceType.HORSE]: {
    [Side.RED]: redHorse,
    [Side.BLACK]: blackHorse,
  },
};
