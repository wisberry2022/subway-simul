import type { FC } from "react";
import { useGameStore } from "../hooks/useGameStore";

type LinePathProps = {
  stationIds: string[];
  color: string;
};

export const LinePath: FC<LinePathProps> = (props) => {
  const { stationIds, color } = props;
  const { stations } = useGameStore();

  const points = stationIds
    .map((id) => stations.find((s) => s.id === id))
    .filter(Boolean)
    .map((s) => `${s!.position.x},${s!.position.y}`)
    .join(" ");

  return (
    <svg style={{ position: "absolute", width: "100%", height: "100%" }}>
      <polyline points={points} stroke={color} strokeWidth={4} fill="none" />
    </svg>
  );
};
