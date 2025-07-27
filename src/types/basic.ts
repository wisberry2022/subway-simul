export type Position = {
  x: number;
  y: number;
};

export type Station = {
  id: string;
  name: string;
  position: Position;
  passengerQueue: Passenger[];
};

export type Line = {
  id: string;
  name: string;
  color: string;
  stationOrder: string[];
};

export type Train = {
  id: string;
  lineId: string;
  currentStationIndex: number;
  direction: "forward" | "backward";
  position: Position;
  speed: number;
  capacity: number;
  passengers: Passenger[];
  targetPosition?: Position; // 이동 목표
};

export type Passenger = {
  id: string;
  fromStationId: string;
  destinationStationId: string;
  status: "waiting" | "onBoard" | "arrived";
};
