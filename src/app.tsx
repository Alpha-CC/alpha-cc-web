import React, { useState } from 'react';
import type { Position } from '@/types/board';
import CCBoard from './components/board';

import './app.less';

const App: React.FC<Record<string, never>> = () => {
  console.log('rerender');
  // const [board, updateBoard] = useReducer<BoardReducer>(
  //   boardReducer,
  //   initialBoard,
  // );
  const [activePiece, setActivePiece] = useState<Position | null>(null);

  const removeActivePiece = () => {
    if (activePiece) {
      setActivePiece(null);
    }
  };

  return (
    <div className="app" onClick={removeActivePiece}>
      <CCBoard activePiece={activePiece} setActivePiece={setActivePiece} />{' '}
    </div>
  );
};

export default App;
