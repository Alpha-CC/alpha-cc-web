import { initBlackPosition, Size } from '@/constants/board';
import { Side } from '@/constants/piece';
import { Board, BoardReducer } from '@/types/board';
import { Piece } from '@/types/piece';

export const initBoard = (): Board => {
  const board: Board = Array.from<undefined, Array<Piece | null>>(
    { length: Size.ROW },
    () => Array.from<undefined, Piece | null>({ length: Size.COL }, () => null),
  );
  const opposite = (pos: number[]) => [
    Size.ROW - 1 - pos[0],
    Size.COL - 1 - pos[1],
  ];
  let id = 0;
  initBlackPosition.forEach(piece => {
    piece.pos.forEach(pos => {
      const [r, c] = pos;
      board[r][c] = { id, side: Side.BLACK, type: piece.type };
      const [opR, opC] = opposite(pos);
      board[opR][opC] = { id: 31 - id, side: Side.RED, type: piece.type };
      id += 1;
    });
  });
  return board;
};

export const boardReducer: BoardReducer = (board, pos) => {
  const { from, to } = pos;
  return board.map((row, rowIdx) =>
    row.map((item, colIdx) => {
      if (rowIdx === from[0] && colIdx === from[1]) {
        return null;
      }
      if (rowIdx === to[0] && colIdx === to[1]) {
        return board[from[0]][from[1]];
      }
      return item;
    }),
  );
};
