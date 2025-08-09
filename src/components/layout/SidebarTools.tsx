import type { FC } from "react";
import { useGameStore, type GameState } from "../../states/useGameStore";
import "./styles/SidebarTool.css";
import {
  CheckCircleIcon,
  MapPinIcon,
  PathIcon,
  TrainSimpleIcon,
  XCircleIcon,
} from "@phosphor-icons/react";
import { useGameUIStore } from "../../states/useGameUIStore";
import { LineAssignModal } from "../modal/LineAssignModal";

export const SidebarTools: FC = () => {
  const {
    selectedTool,
    setTool,
    clearTool,
    selectedStationIdsForLine,
    confirmLineCreation,
    clearLineSelection,
  } = useGameStore();

  const { state, onOpen, onClose } = useGameUIStore();

  const onToggleTool = (tool: GameState["selectedTool"]) => {
    // 모달 켜져 있을 경우 종료
    onClose();
    if (selectedTool === tool) {
      clearTool();
      return;
    }
    setTool(tool);
  };

  const onOpenTrainConfigModal = () => {
    if (state.mode) {
      clearTool();
      onClose();
    } else {
      setTool("train");
      onOpen({ mode: "TRAIN", position: "BOTTOM", size: "sm" });
    }
  };

  const onConfirmLineCreation = () => {
    if (selectedStationIdsForLine.length < 2) {
      return;
    }
    confirmLineCreation();
  };

  return (
    <>
      <div className="leftBar">
        <MapPinIcon
          alt="역 생성"
          style={{ color: selectedTool === "station" ? "#5ac8fa" : "" }}
          onClick={() => onToggleTool("station")}
        />
        <PathIcon
          style={{ color: selectedTool === "line" ? "#5ac8fa" : "" }}
          alt="노선 생성"
          onClick={() => onToggleTool("line")}
        />
        <TrainSimpleIcon
          alt="열차 배치"
          style={{ color: selectedTool === "train" ? "#5ac8fa" : "" }}
          onClick={onOpenTrainConfigModal}
        />
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
      </div>
      {/* 열차 배치 모달 */}
      <LineAssignModal />
    </>
  );
};
