import type { FC } from "react";
import { useGameStore, type GameState } from "../../hooks/useGameStore";
import "./styles/SidebarTool.css";
import {
  CheckCircleIcon,
  MapPinIcon,
  PathIcon,
  TrainSimpleIcon,
  XCircleIcon,
} from "@phosphor-icons/react";

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

  const onConfirmLineCreation = () => {
    if (selectedStationIdsForLine.length < 2) {
      return;
    }
    confirmLineCreation();
  };

  return (
    <div className="leftBar">
      <MapPinIcon alt="역 생성" onClick={() => onToggleTool("station")} />
      <PathIcon alt="노선 생성" onClick={() => onToggleTool("line")} />
      {selectedTool === "line" && (
        <div className="subBar">
          <p>선택된 역 수: {selectedStationIdsForLine.length}</p>
          <div className="svgBox">
            <CheckCircleIcon
              alt="노선 제작 완료하기"
              onClick={onConfirmLineCreation}
            />
            <XCircleIcon onClick={clearLineSelection} alt="초기화" />
          </div>
        </div>
      )}
      <TrainSimpleIcon alt="열차 배치" onClick={() => onToggleTool("train")} />
    </div>
  );
};
