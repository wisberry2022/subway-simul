import type { FC } from "react";
import { useGameStore } from "../hooks/useGameStore";
import { formatGameTime } from "../utils/formatGameTime";

export const TopStatusBar: FC = () => {
  const gameTimeMinutes = useGameStore((s) => s.gameTimeMinutes);

  return (
    <div>
      <div>⏱ 현재 시각: {formatGameTime(gameTimeMinutes)}</div>
      {/* 향후 수익, 승객 수, 만족도 등도 여기 배치 가능 */}
    </div>
  );
};
