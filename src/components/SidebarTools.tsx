import type { FC } from "react";
import { useGameStore } from "../hooks/useGameStore";

export const SidebarTools: FC = () => {
  const {
    selectedTool,
    setTool,
    selectedStationIdsForLine,
    confirmLineCreation,
    clearLineSelection,
  } = useGameStore();

  return (
    <div>
      <button onClick={() => setTool("station")}>역 생성</button>
      <button onClick={() => setTool("line")}>노선 생성</button>
      {selectedTool === "line" && (
        <>
          <div>선택된 역 수: {selectedStationIdsForLine.length}</div>
          <button
            onClick={confirmLineCreation}
            disabled={selectedStationIdsForLine.length < 2}
          >
            노선 제작 완료
          </button>
          <button onClick={clearLineSelection}>초기화</button>
        </>
      )}
    </div>
  );
};
