import { create } from "zustand";
import type { GameNotification } from "../components/NotificationPanel";
import type { SetStateAction } from "react";

// 게임 상태 인터페이스
export interface MetaDataState {
  revenue: number;
  satisfaction: number;
  passengerCount: number;
  gameTime: string;
  isPaused: boolean;
  gameSpeed: number;
  notifications: GameNotification[];
  isDarkMode: boolean;
  selectedLine: any | null;
  setMetaDataState: (prev: SetStateAction<MetaDataState>) => void;
}

export const useMetaDataStore = create<MetaDataState>((set) => ({
  revenue: 1250000,
  satisfaction: 85,
  passengerCount: 15423,
  gameTime: "09:15",
  isPaused: false,
  gameSpeed: 1,
  isDarkMode: true,
  selectedLine: null,
  notifications: [
    {
      id: "1",
      type: "info",
      title: "게임 시작",
      message: "지하철 시뮬레이션이 시작되었습니다!",
      timestamp: "09:00",
      isRead: false,
    },
    {
      id: "2",
      type: "warning",
      title: "지연 발생",
      message: "1호선에서 신호 장애로 인한 지연이 발생했습니다.",
      timestamp: "09:10",
      isRead: false,
    },
  ],
  setMetaDataState: (prev: SetStateAction<MetaDataState>) => {
    return prev instanceof Function ? set((state) => prev(state)) : set(prev);
  },
}));
