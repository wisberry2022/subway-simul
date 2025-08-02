import type { FC, MouseEventHandler } from "react";
import { useGameStore } from "../hooks/useGameStore";
import { StationMarker } from "./StationMarker";
import { LinePath } from "./LinePath";
import { TrainIcon } from "./TrainIcon";
import { LinePaths } from "./LinePaths";

export const MapCanvas: FC = () => {
  const {
    selectedTool,
    stations,
    addStation,
    cancelLastStation,
    lines,
    selectedStationIdsForLine,
    cancelLastLine,
    trains,
  } = useGameStore();

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (selectedTool === "station") {
      addStation(x, y);
    }
  };

  const handleRightClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    switch (selectedTool) {
      case "station":
        cancelLastStation();
        break;
      case "line":
        cancelLastLine();
        break;
    }
  };

  // console.log("lines", lines);

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#1c1c1e",
        border: "1px solid #2c2c2e",
        borderLeft: "none",
        position: "relative",
        cursor: selectedTool === "station" ? "crosshair" : "default",
      }}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      {/* 기존 노선 */}
      <LinePaths lines={lines} />
      {/* 생성 중인 노선 */}
      {selectedTool === "line" && selectedStationIdsForLine.length >= 2 && (
        <LinePath stationIds={selectedStationIdsForLine} color="#aaa" />
      )}

      {/* 열차 */}
      {trains.map((train) => (
        <TrainIcon key={train.id} train={train} />
      ))}

      {stations.map((station) => (
        <StationMarker key={station.id} station={station} />
      ))}
    </div>
  );
};
