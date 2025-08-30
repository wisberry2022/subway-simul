export type Station = {
  id: string;
  name: string;
  x: number;
  y: number;
  lineColor: string;
  passengerCount?: number;
};

export type Line = {
  id: string;
  name: string;
  color: string;
  stations: Station[];
};
