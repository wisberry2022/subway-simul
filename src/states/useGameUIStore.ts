import { create } from "zustand";
import type { NavModeType, NavPositionType, NavSize } from "../types/ui";

type GameUIState = {
  position?: NavPositionType;
  mode?: NavModeType;
  size?: NavSize;
};

export type GameUIStore = {
  state: GameUIState;
  onOpen: (state: GameUIState) => void;
  onClose: () => void;
};

export const useGameUIStore = create<GameUIStore>((set) => ({
  state: {
    position: null,
    mode: null,
    size: "sm",
  },
  onOpen: (state: GameUIState) => set({ state }),
  onClose: () => {
    set((prev) => ({
      state: { position: null, mode: null, size: prev.state.size },
    }));
  },
}));
