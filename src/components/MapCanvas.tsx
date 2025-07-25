import type { FC, MouseEventHandler } from "react";
import { useGameStore } from "../hooks/useGameStore";
import { StationMarker } from "./StationMarker";

export const MapCanvas: FC = () => {
  const { stations, selectedTool, addStation, deleteStation } = useGameStore();

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
      {stations.map((station) => (
        <StationMarker key={station.id} station={station} />
      ))}
    </div>
  );
};
