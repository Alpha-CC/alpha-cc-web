import React, { useEffect, useMemo, useState } from 'react';
import cx from 'classnames';
import { Position, Board, MoveHistory } from '@/types/board';
import { boardReducer, initBoard } from '@/utils/board';
import { Side } from '@/constants/piece';
import BoardItem from '@/components/board-item';
import { isEqualPosition } from '@/utils/position';
import { Size } from '@/constants/board';
import { getValidMoves } from '@/utils/move';
import { checkmate, win } from '@/utils/game';

import './index.less';

interface Props {
  activePiece: Position | null;
  setActivePiece: React.Dispatch<React.SetStateAction<Position | null>>;
}

const initialBoard = initBoard();

const CCBoard: React.FC<Props> = props => {
  const { activePiece, setActivePiece } = props;

  const [board, setBoard] = useState<Board>(initialBoard);
  const [activeSide, setActiveSide] = useState<Side>(Side.RED);
  const [moveHistory, setMoveHistroy] = useState<MoveHistory>([]);
  const [isCheckmate, setIsCheckmate] = useState<boolean>(false);

  const removeActivePiece = () => {
    if (activePiece) {
      setActivePiece(null);
    }
  };

  const validMoves = useMemo(
    () =>
      activePiece
        ? getValidMoves(
            board,
            activePiece,
            board[activePiece[0]][activePiece[1]],
          )
        : [],
    [JSON.stringify(activePiece)],
  );

  const isValidMove = (rowIdx: number, colIdx: number) =>
    validMoves.some(
      validMove => validMove[0] === rowIdx && validMove[1] === colIdx,
    );

  const handleMove = (rowIdx: number, colIdx: number) => {
    if (activePiece) {
      const to: Position = [rowIdx, colIdx];
      const newBoard = boardReducer(board, { from: activePiece, to });
      if (checkmate(newBoard, activeSide)) {
        alert('不能送将');
        return;
      }
      setBoard(newBoard);
      setMoveHistroy([
        ...moveHistory,
        {
          side: activeSide,
          from: activePiece,
          to,
        },
      ]);
      removeActivePiece();
      setActiveSide(side => (side === Side.BLACK ? Side.RED : Side.BLACK));
    }
  };

  const reset = () => {
    setBoard(initialBoard);
    setActivePiece(null);
    setActiveSide(Side.RED);
    setMoveHistroy([]);
    setIsCheckmate(false);
  };

  useEffect(() => {
    if (win(board, activeSide)) {
      alert(`${activeSide === Side.RED ? 'black' : 'red'} win`);
      reset();
    } else if (checkmate(board, activeSide)) {
      setIsCheckmate(true);
      setTimeout(() => {
        setIsCheckmate(false);
      }, 1000);
    }
  }, [board]);

  return (
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
                !!activePiece && isEqualPosition(activePiece, [rowIdx, colIdx])
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
                  if (
                    !(
                      activePiece &&
                      isEqualPosition(activePiece, [rowIdx, colIdx])
                    )
                  ) {
                    setActivePiece([rowIdx, colIdx]);
                  }
                } else {
                  removeActivePiece();
                }
              }}
            />
          )),
        )}
      </div>
      <div
        className={cx('board__checkmate', {
          'board__checkmate--active': isCheckmate,
        })}
      />
    </div>
  );
};

export default CCBoard;
