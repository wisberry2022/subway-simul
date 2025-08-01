import type { FC } from "react";
import { useGameStore, type GameState } from "../../hooks/useGameStore";
import "./styles/SidebarTool.css";
import { MapPinIcon, PathIcon, TrainSimpleIcon } from "@phosphor-icons/react";

export const SidebarTools: FC = () => {
  const {
    selectedTool,
    setTool,
    clearTool,
    selectedStationIdsForLine,
    confirmLineCreation,
    clearLineSelection,
  } = useGameStore();

  const onToggleTool = (tool: GameState["selectedTool"]) => {
    if (selectedTool === tool) {
      clearTool();
      return;
    }
    setTool(tool);
  };

  return (
    <div className="leftBar">
      <MapPinIcon alt="역 생성" onClick={() => onToggleTool("station")} />
      <PathIcon alt="노선 생성" onClick={() => onToggleTool("line")} />
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
      <TrainSimpleIcon alt="열차 배치" onClick={() => onToggleTool("train")} />
    </div>
  );
};
