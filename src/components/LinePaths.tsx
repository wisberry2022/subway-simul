import type { FC } from "react";
import { useGameStore } from "../states/useGameStore";
import type { Line } from "../types/basic";

type LinePathsProps = {
  lines: Line[];
};

export const LinePaths: FC<LinePathsProps> = (props) => {
  const { lines = [] } = props;
  const { stations } = useGameStore();

  return (
    <svg style={{ position: "absolute", width: "100%", height: "100%" }}>
      {lines.map((line) => {
        const points = line.stationOrder
          .map((id) => stations.find((s) => s.id === id))
          .filter(Boolean)
          .map((s) => `${s!.position.x},${s!.position.y}`)
          .join(" ");

        return (
          <polyline
            key={line.id}
            points={points}
            stroke={line.color}
            strokeWidth={2}
            fill="none"
          />
        );
      })}
    </svg>
  );
};
