import type { FC } from "react";
import { useGameStore } from "../hooks/useGameStore";

export const SidebarTools: FC = () => {
  const { setTool } = useGameStore();

  return (
    <div>
      <button onClick={() => setTool("station")}>역 생성</button>
    </div>
  );
};
