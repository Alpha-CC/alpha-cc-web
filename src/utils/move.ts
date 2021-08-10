import { Bound } from '@/constants/board';
import { Direction } from '@/constants/move';
import { PieceType, Side } from '@/constants/piece';
import { Board, Position } from '@/types/board';
import { Piece } from '@/types/piece';

export const filterOutOfBonud = (
  positions: Array<Position>,
  bound: [Position, Position],
): Array<Position> =>
  positions.filter(
    pos =>
      pos[0] >= bound[0][0] &&
      pos[0] <= bound[1][0] &&
      pos[1] >= bound[0][1] &&
      pos[1] <= bound[1][1],
  );

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const configureGetPos = (board: Board, side: Side, from: Position) => {
  const { F, B, L, R, LF, LB, RF, RB } = Direction;
  const common = (
    bound: [Position, Position],
    ...tos: string[]
  ): Array<Position> => {
    const res: Array<Position> = [];
    tos.forEach(to => {
      const move = to.match(/.{2}/g)?.flatMap(step => {
        const temp = [];
        const direction = parseInt(step[0], 10) as Direction;
        const steps = parseInt(step[1], 10);
        for (let i = 0; i < steps; i += 1) {
          temp.push({ direction, steps: 1 });
        }
        return temp;
      });
      if (!move) {
        return;
      }
      let curPos: Position = [from[0], from[1]];
      let valid = true;
      for (let i = 0; i < move.length; i += 1) {
        const { direction, steps } = move[i];
        let pos: Position = [0, 0];
        if (direction === F || direction === B) {
          const cond1 = direction === F;
          const cond2 = side === Side.RED;
          pos = [curPos[0] + (cond1 !== cond2 ? steps : -steps), curPos[1]];
        } else if (direction === L || direction === R) {
          const cond1 = direction === L;
          const cond2 = side === Side.RED;
          pos = [curPos[0], curPos[1] + (cond1 !== cond2 ? steps : -steps)];
        } else if (direction === LF || direction === RB) {
          const cond1 = direction === LF;
          const cond2 = side === Side.RED;
          pos = [
            curPos[0] + (cond1 !== cond2 ? steps : -steps),
            curPos[1] + (cond1 !== cond2 ? steps : -steps),
          ];
        } else if (direction === LB || direction === RF) {
          const cond1 = direction === LB;
          const cond2 = side === Side.RED;
          pos = [
            curPos[0] + (cond1 !== cond2 ? -steps : steps),
            curPos[1] + (cond1 !== cond2 ? steps : -steps),
          ];
        }
        const boardPiece = board[pos[0]] ? board[pos[0]][pos[1]] : null;
        if (i === move.length - 1) {
          if (boardPiece && boardPiece.side === side) {
            valid = false;
            break;
          }
        } else if (boardPiece) {
          valid = false;
          break;
        }

        curPos = pos;
      }
      if (valid) res.push(curPos);
    });
    return filterOutOfBonud(res, bound).filter(pos => {
      const piece = board[pos[0]][pos[1]];
      return !piece || piece.side !== side;
    });
  };
  const special = (type: PieceType.CANNON | PieceType.CHARIOT) => {
    const res: Array<Position> = [];
    [F, B, L, R].forEach(direction => {
      let curPos: Position = [from[0], from[1]];
      let operation: [number, number] = [0, 0];
      if (direction === F) {
        operation = [side === Side.RED ? -1 : 1, 0];
      } else if (direction === B) {
        operation = [side === Side.RED ? 1 : -1, 0];
      } else if (direction === L) {
        operation = [0, side === Side.RED ? -1 : 1];
      } else if (direction === R) {
        operation = [0, side === Side.RED ? 1 : -1];
      }
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const pos: Position = [
          curPos[0] + operation[0],
          curPos[1] + operation[1],
        ];
        curPos = pos;
        if (filterOutOfBonud([pos], Bound.BOARD).length > 0) {
          const piece = board[pos[0]][pos[1]];
          if (piece) {
            if (type === PieceType.CHARIOT) {
              if (side !== piece.side) res.push(pos);
            } else if (type === PieceType.CANNON) {
              // eslint-disable-next-line no-constant-condition
              while (true) {
                const newPos: Position = [
                  curPos[0] + operation[0],
                  curPos[1] + operation[1],
                ];
                curPos = newPos;
                if (filterOutOfBonud([newPos], Bound.BOARD).length > 0) {
                  const newPiece = board[newPos[0]][newPos[1]];
                  if (newPiece) {
                    if (side !== newPiece.side) res.push(newPos);
                    break;
                  }
                } else {
                  break;
                }
              }
            }
            break;
          }
          res.push(pos);
        } else {
          break;
        }
      }
    });
    return res;
  };
  const kingKill = (): Array<Position> => {
    const column: Array<Piece | null> = [];
    board.forEach(row =>
      row.forEach((item, colIdx) => {
        if (colIdx === from[1]) {
          column.push(item);
        }
      }),
    );
    const kingIdx = column.findIndex(
      item => item && item.type === PieceType.KING && item.side !== side,
    );
    if (kingIdx >= 0) {
      for (
        let i = Math.min(from[0], kingIdx) + 1;
        i < Math.max(from[0], kingIdx);
        i += 1
      ) {
        if (column[i]) {
          return [];
        }
      }
      return [[kingIdx, from[1]]];
    }
    return [];
  };
  return { common, special, kingKill };
};

export const getValidMoves = (
  board: Board,
  position: Position,
  piece: Piece | null,
): Array<Position> => {
  if (!piece) {
    return [];
  }
  const getPos = configureGetPos(board, piece.side, position);
  const result: Array<Position> = [];
  const { F, B, L, R, LF, LB, RF, RB } = Direction;
  switch (piece.type) {
    case PieceType.PAWN:
      if (
        (piece.side === Side.RED && position[0] > 4) ||
        (piece.side === Side.BLACK && position[0] <= 4)
      ) {
        // not crossed river
        return getPos.common(Bound.BOARD, `${F}1`);
      }
      // crossed river
      return getPos.common(Bound.BOARD, `${F}1`, `${L}1`, `${R}1`);

    case PieceType.ELEPHANT:
      return getPos.common(
        piece.side === Side.RED ? Bound.RED : Bound.BLACK,
        `${LF}2`,
        `${LB}2`,
        `${RF}2`,
        `${RB}2`,
      );

    case PieceType.ADVISOR:
      return getPos.common(
        piece.side === Side.RED ? Bound.RED_KING : Bound.BLACK_KING,
        `${LF}1`,
        `${LB}1`,
        `${RF}1`,
        `${RB}1`,
      );

    case PieceType.KING:
      return [
        ...getPos.common(
          piece.side === Side.RED ? Bound.RED_KING : Bound.BLACK_KING,
          `${F}1`,
          `${B}1`,
          `${L}1`,
          `${R}1`,
        ),
        ...getPos.kingKill(),
      ];
    case PieceType.HORSE:
      return getPos.common(
        Bound.BOARD,
        `${F}1${LF}1`,
        `${F}1${RF}1`,
        `${L}1${LF}1`,
        `${L}1${LB}1`,
        `${B}1${LB}1`,
        `${B}1${RB}1`,
        `${R}1${RF}1`,
        `${R}1${RB}1`,
      );
    case PieceType.CHARIOT:
      return getPos.special(piece.type);
    case PieceType.CANNON:
      return getPos.special(piece.type);
    default:
      break;
  }
  return result;
};
