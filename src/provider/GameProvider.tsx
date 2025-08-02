import { useEffect, useRef, type FC } from "react";
import { MOVE_STEP_PX, useGameStore } from "../hooks/useGameStore";
import type { Passenger } from "../types/basic";
import { v4 as uuid } from "uuid";

export const GameProvider: FC = () => {
  const {
    trains,
    lines,
    stations,

    updateTrainTarget,
    moveTrains,
    addPassengerToStation,
    processBoardingAndUnloading,
    advanceGameTime,
  } = useGameStore();

  const lastTimeRef = useRef(performance.now());
  const passengerTimerRef = useRef(0);
  const timeAccumulatorRef = useRef(0);

  // 게임 시뮬레이션
  useEffect(() => {
    let animationId: number;
    const loop = (time: number) => {
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;
      passengerTimerRef.current += delta;
      timeAccumulatorRef.current += delta;

      // 1초마다 게임 시간 +1분
      if (timeAccumulatorRef.current >= 1000) {
        advanceGameTime(1);
        timeAccumulatorRef.current = 0;
      }

      // 승객 생성: 10초 간격
      if (passengerTimerRef.current > 10000) {
        stations.forEach((fromStation) => {
          const otherStations = stations.filter((s) => s.id !== fromStation.id);
          if (otherStations.length === 0) return;

          const randomDest =
            otherStations[Math.floor(Math.random() * otherStations.length)];

          const newPassenger: Passenger = {
            id: uuid(),
            fromStationId: fromStation.id,
            destinationStationId: randomDest.id,
            status: "waiting",
          };

          addPassengerToStation(fromStation.id, newPassenger);
        });
        passengerTimerRef.current = 0;
      }
      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [
    trains,
    lines,
    stations,
    updateTrainTarget,
    moveTrains,
    addPassengerToStation,
    processBoardingAndUnloading,
    advanceGameTime,
  ]);

  useEffect(() => {
    // 열차 움직임
    const interval = setInterval(() => {
      useGameStore.setState((state) => {
        const updatedTrains = state.trains.map((train) => {
          const line = state.lines.find((l) => l.id === train.lineId);
          if (!line) return train;

          const currentStationId = line.stationOrder[train.currentStationIndex];
          const currentStation = state.stations.find(
            (s) => s.id === currentStationId
          );

          if (!currentStation) return train;

          //1. 정차 중
          if (!train.isMoving) {
            const wait = train.waitTimer ?? 0;
            if (wait > 0) {
              return { ...train, waitTimer: wait - 300 };
            }

            // 정차 시간 종료 -> 이동 시작
            let nextIndex =
              train.direction === "forward"
                ? train.currentStationIndex + 1
                : train.currentStationIndex - 1;

            let newDirection = train.direction;
            if (nextIndex >= line.stationOrder.length) {
              nextIndex = line.stationOrder.length - 2;
              newDirection = "backward";
            } else if (nextIndex < 0) {
              nextIndex = 1;
              newDirection = "forward";
            }

            const nextStation = state.stations.find(
              (s) => s.id === line.stationOrder[nextIndex]
            );
            if (!nextStation) return train;

            return {
              ...train,
              isMoving: true,
              direction: newDirection,
              targetPosition: { ...nextStation.position },
              toStationIndex: nextIndex,
            };
          }

          // 2. 이동 중
          if (train.isMoving && train.targetPosition) {
            const dx = train.targetPosition.x - train.position.x;
            const dy = train.targetPosition.y - train.position.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist <= MOVE_STEP_PX) {
              // 도착 처리
              const { passengers, money, stations } =
                processBoardingAndUnloading(train);
              useGameStore.setState({ money, stations });
              return {
                ...train,
                isMoving: false,
                position: { ...train.targetPosition },
                currentStationIndex:
                  train.toStationIndex ?? train.currentStationIndex,
                targetPosition: undefined,
                toStationIndex: undefined,
                waitTimer: 2000,
                passengers,
              };
            }

            const ratio = MOVE_STEP_PX / dist;
            return {
              ...train,
              position: {
                x: train.position.x + dx * ratio,
                y: train.position.y + dy * ratio,
              },
            };
          }

          return train;
        });

        return { trains: updatedTrains };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return null;
};
