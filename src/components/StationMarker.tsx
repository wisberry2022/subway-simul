import type { CSSProperties, FC } from "react";
import type { Station } from "../types/basic";
import { useGameStore } from "../states/useGameStore";
import { MapPinIcon } from "@phosphor-icons/react";

type StationMarkerProps = {
  station: Station;
};

export const StationMarker: FC<StationMarkerProps> = (props) => {
  const { station } = props;
  const { selectedTool, selectStationForLine, selectedStationIdsForLine } =
    useGameStore();
  const isSelected = selectedStationIdsForLine.includes(station.id);
  const passengerCount = station.passengerQueue?.length || 0;

  const style: CSSProperties = {
    position: "absolute",
    top: station.position.y - 13,
    left: station.position.x - 6,
    width: "1.5rem",
    height: "1.5rem",
    color: isSelected ? "yellow" : "#5ac8fa",
    cursor: selectedTool === "line" ? "pointer" : "default",
  };

  const handleClick = () => {
    if (selectedTool === "line") {
      selectStationForLine(station.id);
    }
  };

  return (
    <>
      <MapPinIcon style={style} alt={station.name} onClick={handleClick} />
      <div
        style={{
          position: "absolute",
          top: station.position.y - 20,
          left: station.position.x + 8,
          fontSize: 10,
          color: "#fff",
        }}
      >
        {passengerCount > 0 ? `🧍‍♂️${passengerCount}` : ""}
      </div>
    </>
  );
};
