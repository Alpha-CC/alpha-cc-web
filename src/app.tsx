import React, { useReducer, useState } from 'react';
import BoardItem from '@/components/board-item';
import { Size } from '@/constants/board';
import { boardReducer, initBoard } from '@/utils/board';
import { getValidMoves } from '@/utils/move';
import { isEqualPosition } from '@/utils/position';
import type { BoardReducer, MoveHistory, Position } from '@/types/board';

import './app.less';
import { Side } from './constants/piece';

const initialBoard = initBoard();
const App: React.FC<Record<string, never>> = () => {
  const [board, updateBoard] = useReducer<BoardReducer>(
    boardReducer,
    initialBoard,
  );
  const [activePiece, setActivePiece] = useState<Position | null>(null);
  const [activeSide, setActiveSide] = useState<Side>(Side.RED);
  const [moveHistory, setMoveHistroy] = useState<MoveHistory>([]);

  const removeActivePiece = () => {
    setActivePiece(null);
  };

  const validMoves = activePiece
    ? getValidMoves(board, activePiece, board[activePiece[0]][activePiece[1]])
    : [];

  const isValidMove = (rowIdx: number, colIdx: number) =>
    validMoves.some(
      validMove => validMove[0] === rowIdx && validMove[1] === colIdx,
    );

  const handleMove = (rowIdx: number, colIdx: number) => {
    if (activePiece) {
      updateBoard({ from: activePiece, to: [rowIdx, colIdx] });
      setMoveHistroy([
        ...moveHistory,
        {
          side: activeSide,
          from: activePiece,
          to: [rowIdx, colIdx],
        },
      ]);
      removeActivePiece();
      setActiveSide(side => (side === Side.BLACK ? Side.RED : Side.BLACK));
    }
  };

  return (
    <div className="app" onClick={removeActivePiece}>
      <div className="board">
        <div className="board__background" />
        <div className="board__grid">
          {board.map((row, rowIdx) =>
            row.map((item, colIdx) => (
              <BoardItem
                // eslint-disable-next-line react/no-array-index-key
                key={rowIdx * Size.ROW + colIdx}
                pieceInfo={item}
                active={
                  !!activePiece &&
                  isEqualPosition(activePiece, [rowIdx, colIdx])
                }
                validMove={isValidMove(rowIdx, colIdx)}
                highlight={
                  moveHistory.length > 0 &&
                  (isEqualPosition(moveHistory[moveHistory.length - 1].from, [
                    rowIdx,
                    colIdx,
                  ]) ||
                    isEqualPosition(moveHistory[moveHistory.length - 1].to, [
                      rowIdx,
                      colIdx,
                    ]))
                    ? moveHistory[moveHistory.length - 1].side
                    : null
                }
                onClick={() => {
                  if (isValidMove(rowIdx, colIdx)) {
                    handleMove(rowIdx, colIdx);
                  } else if (item?.side === activeSide) {
                    setActivePiece([rowIdx, colIdx]);
                  } else {
                    removeActivePiece();
                  }
                }}
              />
            )),
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
