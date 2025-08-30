import { create } from "zustand";
import type { Line, Passenger, Position, Station, Train } from "../types/basic";
import { v4 as uuid } from "uuid";

export const MOVE_STEP_PX = 50;

export type GameState = {
  // 역 관련 변수들
  stations: Station[];
  selectedTool: "station" | "line" | "train" | "train-delete" | null;
  selectedStationIdsForLine: string[];
  setTool: (tool: GameState["selectedTool"]) => void;
  clearTool: () => void;
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
  addTrainToLines: (lineIds: string[]) => void;
  updateTrainTarget: (
    trainId: string,
    newPosition: Position,
    newIndex: number,
    newDirection: "forward" | "backward"
  ) => void;
  deleteTrain: (trainIds: string[]) => void;
  // 승객 관련 변수들
  addPassengerToStation: (stationId: string, passenger: Passenger) => void;
  processBoardingAndUnloading: (train: Train) => {
    passengers: Passenger[];
    stations: Station[];
    money: number;
  };
  // 시간 관련 변수들
  gameTimeMinutes: number;
  advanceGameTime: (minutes: number) => void;
  // 요금 관련 변수
  fee: number;
  money: number;
  addMoney: (profit: number) => void;
};

export const useGameStore = create<GameState>((set, get) => ({
  // 역 관련 변수들
  stations: [],
  selectedTool: null,
  selectedStationIdsForLine: [],
  setTool: (tool) => set({ selectedTool: tool, selectedStationIdsForLine: [] }),
  clearTool: () => {
    set({ selectedTool: null });
  },
  addStation: (x, y) =>
    set((state) => ({
      stations: [
        ...state.stations,
        {
          id: uuid(),
          name: `테스트 역사 ${state.stations.length + 1}`,
          position: { x, y },
          passengerQueue: [],
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
  addTrainToLines: (lineIds: string[]) => {
    const lines = get().lines.filter((ln) => lineIds.includes(ln.id));
    const stations = get().stations;

    if (!lines || lines.length === 0) return;

    const trains = lines.map((line) => {
      const lineId = line.id;
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

      return newTrain;
    });

    set((state) => ({ trains: [...state.trains, ...(trains as Train[])] }));
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
  deleteTrain: (trainIds: string[]) => {
    set((state) => ({
      trains: state.trains.filter((train) => !trainIds.includes(train.id)),
    }));
  },
  // 승객 관련 state
  addPassengerToStation: (stationId: string, passenger: Passenger) =>
    set((state) => ({
      stations: state.stations.map((s) =>
        s.id === stationId
          ? { ...s, passengerQueue: [...(s.passengerQueue || []), passenger] }
          : s
      ),
    })),
  processBoardingAndUnloading: (
    train: Train
  ): { passengers: Passenger[]; stations: Station[]; money: number } => {
    const state = get();
    let moneyGained = 0;
    const line = state.lines.find((l) => l.id === train.lineId);
    if (!line) return { passengers: [], stations: [], money: 0 };

    const currentStationId =
      line.stationOrder[train.toStationIndex ?? train.currentStationIndex];
    const currentStation = state.stations.find(
      (s) => s.id === currentStationId
    );
    if (!currentStation) return { passengers: [], stations: [], money: 0 };

    // 하차 처리
    const remainingPassengers = train.passengers.filter(
      (p) => p.destinationStationId !== currentStationId
    );
    const arrivePassengers = train.passengers.filter(
      (p) => p.destinationStationId === currentStationId
    );

    moneyGained += arrivePassengers.length * state.fee;

    // 탑승 처리
    const availableSpace = train.capacity - remainingPassengers.length;
    const candidates = currentStation.passengerQueue.filter((p) =>
      line.stationOrder.includes(p.destinationStationId)
    );

    const boarding = candidates.slice(0, availableSpace);

    // 현재 역에서 탑승한 승객을 제외한 나머지 대기열
    const updatedStations = state.stations.map((s) =>
      s.id === currentStationId
        ? {
            ...s,
            passengerQueue: s.passengerQueue.filter(
              (p) => !boarding.some((b) => b.id === p.id)
            ),
          }
        : s
    );

    return {
      stations: updatedStations,
      passengers: [
        ...remainingPassengers,
        ...boarding.map((p) => ({
          ...p,
          status: "onBoard" as Passenger["status"],
        })),
      ],
      money: state.money + moneyGained,
    };
  },
  // 시간 관련 변수들
  gameTimeMinutes: 360,
  advanceGameTime: (minutes: number) =>
    set((state) => ({
      gameTimeMinutes: state.gameTimeMinutes + minutes,
    })),
  fee: 1000,
  money: 0,
  addMoney: (profit: number) => {
    set((state) => ({ money: state.money + profit }));
  },
}));
