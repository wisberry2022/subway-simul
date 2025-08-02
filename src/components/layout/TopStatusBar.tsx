import type { FC } from "react";
import { useGameStore } from "../../states/useGameStore";
import { formatGameTime } from "../../utils/formatGameTime";
import "./styles/TopStatusBar.css";

export const TopStatusBar: FC = () => {
  const gameTimeMinutes = useGameStore((s) => s.gameTimeMinutes);
  const money = useGameStore((s) => s.money);

  return (
    <div className="sideBar">
      <div className="title">
        <h1>SubwaySimulator</h1>
      </div>
      <div className="rightBar">
        <div className="profit">💰 총 수익: {money.toLocaleString()}원</div>
        <div className="time">
          ⏱ 현재 시각: {formatGameTime(gameTimeMinutes)}
        </div>
      </div>

      {/* 향후 수익, 승객 수, 만족도 등도 여기 배치 가능 */}
    </div>
  );
};
