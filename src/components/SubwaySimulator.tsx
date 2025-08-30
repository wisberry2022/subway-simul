import { useState, useEffect, useCallback } from "react";
import { TopHeader } from "./TopHeader";
import { BottomHeader } from "./BottomHeader";
import { MapView } from "./MapView";
import { NotificationPanel } from "./NotificationPanel";
import type { GameNotification } from "./NotificationPanel";
import { useMetaDataStore } from "../states/useMetaDataStore";
import { useGameStoreV2 } from "../states/useGameStoreV2";

export function SubwaySimulator() {
  // 샘플 노선 데이터 (다크 테마 색상 적용)
  // const [lines, setLines] = useState([
  //   {
  //     id: "line1",
  //     name: "1호선",
  //     color: "#ff2d55",
  //     stations: [
  //       {
  //         id: "s1",
  //         name: "중앙역",
  //         x: 200,
  //         y: 200,
  //         lineColor: "#ff2d55",
  //         passengerCount: 45,
  //       },
  //       {
  //         id: "s2",
  //         name: "시청역",
  //         x: 300,
  //         y: 200,
  //         lineColor: "#ff2d55",
  //         passengerCount: 23,
  //       },
  //       {
  //         id: "s3",
  //         name: "대학로역",
  //         x: 400,
  //         y: 200,
  //         lineColor: "#ff2d55",
  //         passengerCount: 67,
  //       },
  //       {
  //         id: "s4",
  //         name: "강변역",
  //         x: 500,
  //         y: 200,
  //         lineColor: "#ff2d55",
  //         passengerCount: 31,
  //       },
  //     ],
  //   },
  //   {
  //     id: "line2",
  //     name: "2호선",
  //     color: "#ffcc00",
  //     stations: [
  //       {
  //         id: "s5",
  //         name: "신촌역",
  //         x: 200,
  //         y: 150,
  //         lineColor: "#ffcc00",
  //         passengerCount: 89,
  //       },
  //       {
  //         id: "s6",
  //         name: "홍대입구역",
  //         x: 300,
  //         y: 150,
  //         lineColor: "#ffcc00",
  //         passengerCount: 156,
  //       },
  //       {
  //         id: "s7",
  //         name: "합정역",
  //         x: 400,
  //         y: 150,
  //         lineColor: "#ffcc00",
  //         passengerCount: 44,
  //       },
  //       {
  //         id: "s8",
  //         name: "당산역",
  //         x: 500,
  //         y: 150,
  //         lineColor: "#ffcc00",
  //         passengerCount: 72,
  //       },
  //     ],
  //   },
  //   {
  //     id: "line3",
  //     name: "3호선",
  //     color: "#5ac8fa",
  //     stations: [
  //       {
  //         id: "s9",
  //         name: "교대역",
  //         x: 300,
  //         y: 100,
  //         lineColor: "#5ac8fa",
  //         passengerCount: 28,
  //       },
  //       {
  //         id: "s10",
  //         name: "남부터미널역",
  //         x: 300,
  //         y: 200,
  //         lineColor: "#5ac8fa",
  //         passengerCount: 91,
  //       },
  //       {
  //         id: "s11",
  //         name: "양재역",
  //         x: 300,
  //         y: 300,
  //         lineColor: "#5ac8fa",
  //         passengerCount: 55,
  //       },
  //     ],
  //   },
  // ]);
  const { lines, setLines } = useGameStoreV2();
  const { setMetaDataState, ...metaData } = useMetaDataStore();

  // 게임 시간 업데이트
  useEffect(() => {
    if (metaData.isPaused) return;

    const interval = setInterval(() => {
      setMetaDataState((prev) => {
        const currentTime = prev.gameTime;
        const [hours, minutes] = currentTime.split(":").map(Number);
        let newMinutes = minutes + prev.gameSpeed;
        let newHours = hours;

        if (newMinutes >= 60) {
          newHours += Math.floor(newMinutes / 60);
          newMinutes = newMinutes % 60;
        }

        if (newHours >= 24) {
          newHours = 0;
        }

        return {
          ...prev,
          gameTime: `${newHours.toString().padStart(2, "0")}:${newMinutes
            .toString()
            .padStart(2, "0")}`,
          // 시간에 따른 승객 수 변동 시뮬레이션
          passengerCount:
            prev.passengerCount + Math.floor(Math.random() * 100 - 50),
          revenue: prev.revenue + Math.floor(Math.random() * 10000),
          satisfaction: Math.max(
            60,
            Math.min(100, prev.satisfaction + Math.floor(Math.random() * 6 - 3))
          ),
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [metaData.isPaused, metaData.gameSpeed]);

  // 랜덤 이벤트 생성
  useEffect(() => {
    if (metaData.isPaused) return;

    const eventInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        // 10% 확률로 이벤트 발생
        const events = [
          {
            type: "warning" as const,
            title: "차량 고장",
            message: "2호선 열차에서 고장이 발생했습니다.",
          },
          {
            type: "info" as const,
            title: "승객 증가",
            message: "출근 시간으로 인해 승객이 증가하고 있습니다.",
          },
          {
            type: "success" as const,
            title: "정시 운행",
            message: "모든 노선이 정시 운행 중입니다.",
          },
          {
            type: "error" as const,
            title: "비상 상황",
            message: "3호선에서 비상 상황이 발생했습니다.",
          },
        ];

        const randomEvent = events[Math.floor(Math.random() * events.length)];
        const newNotification: GameNotification = {
          id: Date.now().toString(),
          type: randomEvent.type,
          title: randomEvent.title,
          message: randomEvent.message,
          timestamp: metaData.gameTime,
          isRead: false,
        };

        setMetaDataState((prev) => ({
          ...prev,
          notifications: [newNotification, ...prev.notifications].slice(0, 10), // 최대 10개 유지
        }));
      }
    }, 5000); // 5초마다 체크

    return () => clearInterval(eventInterval);
  }, [metaData.isPaused, metaData.gameTime]);

  const handlePauseToggle = useCallback(() => {
    setMetaDataState((prev) => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  const handleSpeedChange = useCallback((speed: number) => {
    setMetaDataState((prev) => ({ ...prev, gameSpeed: speed }));
  }, []);

  const handleStationClick = useCallback(
    (station: any) => {
      const newNotification: GameNotification = {
        id: Date.now().toString(),
        type: "info",
        title: `${station.name} 선택`,
        message: `${station.name}역을 선택했습니다. 현재 승객 수: ${station.passengerCount}명`,
        timestamp: metaData.gameTime,
        isRead: false,
      };

      setMetaDataState((prev) => ({
        ...prev,
        notifications: [newNotification, ...prev.notifications],
      }));
    },
    [metaData.gameTime]
  );

  const handleNotificationRead = useCallback((id: string) => {
    setMetaDataState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      ),
    }));
  }, []);

  const handleNotificationRemove = useCallback((id: string) => {
    setMetaDataState((prev) => ({
      ...prev,
      notifications: prev.notifications.filter((n) => n.id !== id),
    }));
  }, []);

  const handleClearAllNotifications = useCallback(() => {
    setMetaDataState((prev) => ({
      ...prev,
      notifications: [],
    }));
  }, []);

  const handleThemeToggle = useCallback(() => {
    setMetaDataState((prev) => ({
      ...prev,
      isDarkMode: !prev.isDarkMode,
    }));

    // DOM 클래스 토글
    if (metaData.isDarkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [metaData.isDarkMode]);

  // 노선 관리 핸들러들
  const handleLineSelect = useCallback((line: any) => {
    setMetaDataState((prev) => ({ ...prev, selectedLine: line }));
  }, []);

  const handleLineCreate = useCallback(() => {
    const newLine = {
      id: `line${Date.now()}`,
      name: `${lines.length + 1}호선`,
      color: "#5856d6",
      stations: [],
    };

    setLines((prev) => [...prev, newLine]);
    setMetaDataState((prev) => ({ ...prev, selectedLine: newLine }));
  }, [lines.length]);

  const handleLineDelete = useCallback((lineId: string) => {
    setLines((prev) => prev.filter((line) => line.id !== lineId));
    setMetaDataState((prev) => ({
      ...prev,
      selectedLine: prev.selectedLine?.id === lineId ? null : prev.selectedLine,
    }));
  }, []);

  const handleLineUpdate = useCallback((lineId: string, updates: any) => {
    setLines((prev) =>
      prev.map((line) => (line.id === lineId ? { ...line, ...updates } : line))
    );
    setMetaDataState((prev) => ({
      ...prev,
      selectedLine:
        prev.selectedLine?.id === lineId
          ? { ...prev.selectedLine, ...updates }
          : prev.selectedLine,
    }));
  }, []);

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* 상단 헤더 */}
      <TopHeader
        stats={{
          revenue: metaData.revenue,
          satisfaction: metaData.satisfaction,
          passengerCount: metaData.passengerCount,
          gameTime: metaData.gameTime,
        }}
        isPaused={metaData.isPaused}
        gameSpeed={metaData.gameSpeed}
        isDarkMode={metaData.isDarkMode}
        onPauseToggle={handlePauseToggle}
        onSpeedChange={handleSpeedChange}
        onThemeToggle={handleThemeToggle}
      />

      {/* 하단 헤더 */}
      <BottomHeader
        lines={lines}
        selectedLine={metaData.selectedLine}
        onLineSelect={handleLineSelect}
        onLineCreate={handleLineCreate}
        onLineDelete={handleLineDelete}
        onLineUpdate={handleLineUpdate}
      />

      {/* 지도 화면 */}
      <MapView lines={lines} onStationClick={handleStationClick} />

      {/* 하단 알림 패널 */}
      <NotificationPanel
        notifications={metaData.notifications}
        onNotificationRead={handleNotificationRead}
        onNotificationRemove={handleNotificationRemove}
        onClearAll={handleClearAllNotifications}
      />
    </div>
  );
}
