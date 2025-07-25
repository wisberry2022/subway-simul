import type { CSSProperties, FC } from "react";
import type { Station } from "../types/basic";

type StationMarkerProps = {
  station: Station;
};

export const StationMarker: FC<StationMarkerProps> = (props) => {
  const { station } = props;

  const style: CSSProperties = {
    position: "absolute",
    top: station.position.y - 6,
    left: station.position.x - 6,
    width: 12,
    height: 12,
    backgroundColor: "#5ac8fa",
    borderRadius: "50%",
  };

  return <div style={style} title={station.name} />;
};
