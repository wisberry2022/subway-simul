import { create } from "zustand";
import type { Line, Position, Station, Train } from "../types/basic";
import { v4 as uuid } from "uuid";

type GameState = {
  // 역 관련 변수들
  stations: Station[];
  selectedTool: "station" | "line" | "train" | null;
  selectedStationIdsForLine: string[];
  setTool: (tool: GameState["selectedTool"]) => void;
  addStation: (x: number, y: number) => void;
  cancelLastStation: () => void;
  // 노선 관련 변수들
  lines: Line[];
  selectStationForLine: (stationId: string) => void;
  clearLineSelection: () => void;
  confirmLineCreation: () => void;
  deleteLine: (id: string) => void;
  cancelLastLine: () => void;
  // 열차 관련 변수들
  trains: Train[];
  addTrainToLine: (lineId: string) => void;

  updateTrainTarget: (
    trainId: string,
    newPosition: Position,
    newIndex: number,
    newDirection: "forward" | "backward"
  ) => void;
  moveTrains: (deltaTime: number) => void;
};

export const useGameStore = create<GameState>((set, get) => ({
  // 역 관련 변수들
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
  cancelLastStation: () =>
    set((state) => {
      state.stations.pop();
      return {
        ...state,
        stations: state.stations,
      };
    }),
  // 노선 관련 state
  lines: [],
  selectStationForLine: (stationId: string) => {
    const selected = get().selectedStationIdsForLine;
    if (!selected.includes(stationId)) {
      set({ selectedStationIdsForLine: [...selected, stationId] });
    }
  },
  clearLineSelection: () => {
    set({ selectedStationIdsForLine: [] });
  },
  confirmLineCreation: () =>
    set((state) => {
      if (state.selectedStationIdsForLine.length < 2) return {};
      return {
        lines: [
          ...state.lines,
          {
            id: uuid(),
            name: `${state.lines.length + 1}호선`,
            color: "#1e90ff",
            stationOrder: state.selectedStationIdsForLine,
          },
        ],
        selectedStationIdsForLine: [],
      };
    }),
  deleteLine: (id: string) => {
    set((state) => ({
      ...state,
      selectedStationIdsForLine: state.selectedStationIdsForLine.filter(
        (stationId) => stationId !== id
      ),
    }));
  },
  cancelLastLine: () => {
    set((state) => {
      state.selectedStationIdsForLine.pop();
      return {
        ...state,
        selectedStationIdsForLine: state.selectedStationIdsForLine,
      };
    });
  },
  // 열차 관련 state
  trains: [],
  addTrainToLine: (lineId: string) => {
    const line = get().lines.find((ln) => ln.id === lineId);
    const stations = get().stations;

    if (!line || line.stationOrder.length === 0) return;

    const startStation = stations.find((s) => s.id === line.stationOrder[0]);
    if (!startStation) return;

    const newTrain: Train = {
      id: uuid(),
      lineId,
      currentStationIndex: 0,
      direction: "forward",
      // speed: 1.0,
      speed: 100,
      capacity: 100,
      passengers: [],
      position: { ...startStation.position },
    };

    set((state) => ({
      trains: [...state.trains, newTrain],
    }));
  },
  updateTrainTarget: (
    trainId: string,
    target: Position,
    nextIndex: number,
    dir: "forward" | "backward"
  ) =>
    set((state) => ({
      trains: state.trains.map((t) =>
        t.id === trainId
          ? {
              ...t,
              targetPosition: target,
              currentStationIndex: nextIndex,
              direction: dir,
            }
          : t
      ),
    })),
  moveTrains: (deltaTime: number) =>
    set((state) => {
      const updated = state.trains.map((t) => {
        if (!t.targetPosition) return t;

        const dx = t.targetPosition.x - t.position.x;
        const dy = t.targetPosition.y - t.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 1) {
          return {
            ...t,
            position: { ...t.targetPosition },
            targetPosition: undefined,
          };
        }

        const moveDist = t.speed * (deltaTime / 1000);
        const ratio = moveDist / dist;
        const moveX = dx * ratio;
        const moveY = dy * ratio;

        return {
          ...t,
          position: {
            x: t.position.x + moveX,
            y: t.position.y + moveY,
          },
        };
      });

      return { trains: updated };
    }),
}));
