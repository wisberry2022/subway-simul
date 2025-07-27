import type { FC } from "react";
import { useGameStore } from "../hooks/useGameStore";

type LinePathProps = {
  stationIds: string[];
  color: string;
  lineId?: string;
};

export const LinePath: FC<LinePathProps> = (props) => {
  const { stationIds, color, lineId = "" } = props;
  const { stations, selectedTool, setTool, addTrainToLine } = useGameStore();

  const points = stationIds
    .map((id) => stations.find((s) => s.id === id))
    .filter(Boolean)
    .map((s) => `${s!.position.x},${s!.position.y}`)
    .join(" ");

  const handleClick = () => {
    if (selectedTool === "train") {
      if (lineId) {
        // 기생성된 노선에 대해서만 열차를 배치할 수 있도록 한다
        addTrainToLine(lineId);
      }
      setTool(null);
    }
  };

  return (
    <svg
      style={{ position: "absolute", width: "100%", height: "100%" }}
      onClick={handleClick}
    >
      <polyline points={points} stroke={color} strokeWidth={4} fill="none" />
    </svg>
  );
};
