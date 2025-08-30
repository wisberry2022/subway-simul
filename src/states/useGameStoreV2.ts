import { create } from "zustand";
import type { Line } from "../types/game";
import type { SetStateAction } from "react";

export type GameState = {
  lines: Line[];
  setLines: (prev: SetStateAction<Line[]>) => void;
  setGameState: (prev: SetStateAction<GameState>) => void;
};

export const useGameStoreV2 = create<GameState>((set) => ({
  lines: [],
  setLines: (prev: SetStateAction<Line[]>) => {
    return prev instanceof Function
      ? set((state) => ({
          ...state,
          lines: prev(state.lines),
        }))
      : set({ lines: prev });
  },
  setGameState: (prev: SetStateAction<GameState>) => {
    return prev instanceof Function ? set((state) => prev(state)) : set(prev);
  },
}));
