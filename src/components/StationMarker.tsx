import type { CSSProperties, FC } from "react";
import type { Station } from "../types/basic";
import { useGameStore } from "../hooks/useGameStore";

type StationMarkerProps = {
  station: Station;
};

export const StationMarker: FC<StationMarkerProps> = (props) => {
  const { station } = props;
  const { selectedTool, selectStationForLine, selectedStationIdsForLine } =
    useGameStore();
  const isSelected = selectedStationIdsForLine.includes(station.id);

  const style: CSSProperties = {
    position: "absolute",
    top: station.position.y - 6,
    left: station.position.x - 6,
    width: 12,
    height: 12,
    backgroundColor: isSelected ? "blue" : "#5ac8fa",
    borderRadius: "50%",
    cursor: selectedTool === "line" ? "pointer" : "default",
  };

  const handleClick = () => {
    if (selectedTool === "line") {
      selectStationForLine(station.id);
    }
  };

  return <div style={style} title={station.name} onClick={handleClick} />;
};
