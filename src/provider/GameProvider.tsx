import { useEffect, useRef, type FC } from "react";
import { useGameStore } from "../hooks/useGameStore";

export const GameProvider: FC = () => {
  const { trains, lines, stations, updateTrainTarget, moveTrains } =
    useGameStore();

  const lastTimeRef = useRef(performance.now());

  useEffect(() => {
    let animationId: number;

    const loop = (time: number) => {
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

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
      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationId);
  }, [trains, lines, stations, updateTrainTarget, moveTrains]);

  return null;
};
