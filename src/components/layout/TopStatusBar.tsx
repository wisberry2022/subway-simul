import type { FC } from "react";
import { useGameStore } from "../../hooks/useGameStore";
import { formatGameTime } from "../../utils/formatGameTime";
import "./TopStatusBar.css";

export const TopStatusBar: FC = () => {
  const gameTimeMinutes = useGameStore((s) => s.gameTimeMinutes);

  return (
    <div className="sideBar">
      <div className="title">
        <h1>SubwaySimulator</h1>
      </div>
      <div className="rightBar">
        <div className="time">
          ⏱ 현재 시각: {formatGameTime(gameTimeMinutes)}
        </div>
      </div>

      {/* 향후 수익, 승객 수, 만족도 등도 여기 배치 가능 */}
    </div>
  );
};
