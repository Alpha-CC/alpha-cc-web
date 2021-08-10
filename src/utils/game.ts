import { PieceType, Side } from '@/constants/piece';
import { Board, Position } from '@/types/board';
import { boardReducer } from './board';
import { getValidMoves } from './move';
import { isEqualPosition } from './position';

export const checkmate = (board: Board, side: Side): boolean => {
  // side: side being checkmated
  let king: Position = [-1, -1];
  board.forEach((row, rowIdx) => {
    row.forEach((piece, colIdx) => {
      if (piece?.side === side && piece?.type === PieceType.KING) {
        king = [rowIdx, colIdx];
      }
    });
  });
  return board.some((row, rowIdx) =>
    row.some((piece, colIdx) => {
      if (piece?.side !== side) {
        const validMoves = getValidMoves(board, [rowIdx, colIdx], piece);
        return validMoves.some(move => isEqualPosition(king, move));
      }
      return false;
    }),
  );
};

export const win = (board: Board, side: Side): boolean =>
  // side: side being checkmated
  !board.some((row, rowIdx) =>
    row.some((piece, colIdx) => {
      if (piece?.side === side) {
        const validMoves = getValidMoves(board, [rowIdx, colIdx], piece);
        return validMoves.some(move => {
          const newBoard = boardReducer(board, {
            from: [rowIdx, colIdx],
            to: move,
          });
          return !checkmate(newBoard, side);
        });
      }
      return false;
    }),
  );
