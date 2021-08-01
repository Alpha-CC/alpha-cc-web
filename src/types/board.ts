import type { Reducer } from 'react';
import { Side } from '@/constants/piece';
import type { Piece } from '@/types/piece';

export type Board = (Piece | null)[][];

export type Position = [number, number];

export type MoveHistory = Array<{ side: Side; from: Position; to: Position }>;

export type BoardReducer = Reducer<Board, { from: Position; to: Position }>;
