import { create } from "zustand";
import type { Line, Station } from "../types/basic";
import { v4 as uuid } from "uuid";

type GameState = {
  // 역 관련 변수들
  stations: Station[];
  selectedTool: "station" | "line" | "train" | null;
  selectedStationIdsForLine: string[];
  setTool: (tool: GameState["selectedTool"]) => void;
  addStation: (x: number, y: number) => void;
  deleteStation: () => void;
  // 노선 관련 변수들
  lines: Line[];
  selectStationForLine: (stationId: string) => void;
  clearLineSelection: () => void;
  confirmLineCreation: () => void;

};

export const useGameStore = create<GameState>((set, get) => ({
  stations: [],
  selectedTool: null,
  selectedStationIdsForLine: [],
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
  lines: [],
  selectStationForLine: (stationId: string) => {
    const selected = get().selectedStationIdsForLine;
    if(!selected.includes(stationId)) {
      set({selectedStationIdsForLine: [...selected, stationId]})
    }
  },
  clearLineSelection: () => {
    set({selectedStationIdsForLine: []})
  },
  confirmLineCreation: () => set(state => {
    if(state.selectedStationIdsForLine.length < 2) return {}
    return {
      lines: [
        ...state.lines,
        {
          id: uuid(),
          name: `${state.lines.length + 1}호선`,
          color: "#1e90ff",
          stationOrder: state.selectedStationIdsForLine 
        }
      ],
      selectedStationIdsForLine: []
    }
  })
  
}));
