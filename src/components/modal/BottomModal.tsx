import type { FC } from "react";
import { useGameUIStore } from "../../states/useGameUIStore";
import "./BottomModal.css";
import type { NavSize } from "../../types/ui";

export const BottomModal: FC = () => {
  const { state } = useGameUIStore();

  const sizeMapper: Record<NavSize, number> = {
    sm: 30,
    md: 50,
    lg: 98,
  };

  return (
    <div
      style={{ width: `${sizeMapper[state.size as NavSize]}%` }}
      className={`bottomModal ${state.position ? "open" : ""}`}
    >
      모달2
    </div>
  );
};
