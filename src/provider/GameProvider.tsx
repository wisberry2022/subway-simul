import { useEffect, useRef, type FC } from "react";
import { useGameStore } from "../hooks/useGameStore";
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
    advanceGameTime,
  } = useGameStore();

  const lastTimeRef = useRef(performance.now());
  const passengerTimerRef = useRef(0);
  const timeAccumulatorRef = useRef(0);

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

      moveTrains(delta);

      // 이동 중이 아닌 열차는 다음 목표 설정
      trains.forEach((train) => {
        if (train.targetPosition) return;

        const line = lines.find((l) => l.id === train.lineId);
        if (!line) return;

        const max = line.stationOrder.length - 1;
        let nextIndex =
          train.direction === "forward"
            ? train.currentStationIndex + 1
            : train.currentStationIndex - 1;

        let newDir = train.direction;

        if (nextIndex > max) {
          nextIndex = max - 1;
          newDir = "backward";
        } else if (nextIndex < 0) {
          nextIndex = 1;
          newDir = "forward";
        }

        const targetStationId = line.stationOrder[nextIndex];
        const targetStation = stations.find((s) => s.id === targetStationId);

        if (!targetStation) return;

        updateTrainTarget(train.id, targetStation.position, nextIndex, newDir);
      });

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
    return () => cancelAnimationFrame(animationId);
  }, [
    trains,
    lines,
    stations,
    updateTrainTarget,
    moveTrains,
    addPassengerToStation,
  ]);

  return null;
};
