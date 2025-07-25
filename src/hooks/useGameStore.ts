import { create } from "zustand";
import type { Station } from "../types/basic";
import { v4 as uuid } from "uuid";

type GameState = {
  stations: Station[];
  selectedTool: "station" | "line" | "train" | null;
  setTool: (tool: GameState["selectedTool"]) => void;
  addStation: (x: number, y: number) => void;
  deleteStation: () => void;
};

export const useGameStore = create<GameState>((set) => ({
  stations: [],
  selectedTool: null,
  setTool: (tool) => set({ selectedTool: tool }),
  addStation: (x, y) =>
    set((state) => ({
      stations: [
        ...state.stations,
        {
          id: uuid(),
          name: `테스트 역사 ${state.stations.length + 1}`,
          position: { x, y },
        },
      ],
    })),
  deleteStation: () =>
    set((state) => {
      state.stations.pop();
      return {
        ...state,
        stations: state.stations,
      };
    }),
}));
