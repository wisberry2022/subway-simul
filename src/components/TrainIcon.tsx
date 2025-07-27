import type { CSSProperties, FC } from "react";
import type { Train } from "../types/basic";

type TrainProps = {
  train: Train;
};

export const TrainIcon: FC<TrainProps> = (props) => {
  const { train } = props;

  const style: CSSProperties = {
    position: "absolute",
    top: train.position.y - 5,
    left: train.position.x - 5,
    width: 20,
    height: 14,
    backgroundColor: "red",
    border: "2px solid white",
  };

  return (
    <div key={train.id} style={style} title={`Train: ${train.id}`}>
      <span style={{ position: "absolute", top: -12, left: 16, fontSize: 10 }}>
        👤{train.passengers.length}
      </span>
    </div>
  );
};
