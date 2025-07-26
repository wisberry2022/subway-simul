import type { FC, MouseEventHandler } from "react";
import { useGameStore } from "../hooks/useGameStore";
import { StationMarker } from "./StationMarker";
import { LinePath } from "./LinePath";

export const MapCanvas: FC = () => {
  const {
    stations,
    lines,
    selectedTool,
    addStation,
    selectedStationIdsForLine,
    deleteStation,
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
    deleteStation();
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#1c1c1e",
        border: "1px solid #2c2c2e",
        position: "relative",
        cursor: selectedTool === "station" ? "crosshair" : "default",
      }}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      {/* 기존 노선 */}
      {lines.map((line) => (
        <LinePath
          key={line.id}
          stationIds={line.stationOrder}
          color={line.color}
        />
      ))}
      {/* 생성 중인 노선 */}
      {selectedTool === "line" && selectedStationIdsForLine.length >= 2 && (
        <LinePath stationIds={selectedStationIdsForLine} color="#aaa" />
      )}

      {stations.map((station) => (
        <StationMarker key={station.id} station={station} />
      ))}
    </div>
  );
};
