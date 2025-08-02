import { create } from "zustand";
import type { NavModeType, NavPositionType } from "../types/ui";

type GameUIState = {
  position?: NavPositionType;
  mode?: NavModeType;
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
  },
  onOpen: (state: GameUIState) => set({ state }),
  onClose: () => {
    set({ state: { position: null, mode: null } });
  },
}));
