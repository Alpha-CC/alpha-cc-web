import React from 'react';
import cx from 'classnames';
import validMoveDot from '@/assets/images/overlay/valid-move-dot.png';
import { Piece } from '@/types/piece';
import { PieceToImg, Side } from '@/constants/piece';

import './index.less';

interface Props {
  pieceInfo: Piece | null;
  active: boolean;
  validMove: boolean;
  highlight: Side | null;
  onClick: () => void;
}

const BoardItem: React.FC<Props> = ({
  pieceInfo,
  active,
  validMove,
  highlight,
  onClick,
}) => {
  const { side, type } = pieceInfo ?? {};

  return (
    <div
      className={cx(
        'piece',
        { 'piece--active': active },
        { 'piece--red': highlight === Side.RED },
        { 'piece--black': highlight === Side.BLACK },
      )}
      onClick={e => {
        e.stopPropagation();
        onClick();
      }}
    >
      {type !== undefined && side !== undefined && (
        <img
          draggable="false"
          alt="chinese chess piece"
          src={PieceToImg[type][side]}
        />
      )}
      {validMove && (
        <img className="valid-move" alt="valid move" src={validMoveDot} />
      )}
    </div>
  );
};

export default BoardItem;
